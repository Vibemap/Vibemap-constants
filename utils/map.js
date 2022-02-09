import geoViewport from '@mapbox/geo-viewport'
import axios from "axios"

import { featureCollection } from '@turf/helpers'
import { featureEach } from '@turf/meta'
import { clusterEach } from '@turf/clusters'
import bboxPolygon from '@turf/bbox-polygon'
import turf_center from '@turf/center'
import turf_distance from '@turf/distance'
import turf_truncate from '@turf/truncate'
import clustersDbscan from '@turf/clusters-dbscan'
import pointsWithinPolygon from '@turf/points-within-polygon'
import rhumbBearing from '@turf/rhumb-bearing'
import rhumbDistance from '@turf/rhumb-distance'
import rhumbDestination from '@turf/rhumb-destination'


import chroma from 'chroma-js'
import querystring from 'querystring'

import { getMax } from './math'

export const geocodeAddress = async (
    key = null,
    address = `1600 Amphitheatre Parkway Mountain+View`) => {
    const params = new URLSearchParams({
        address: address,
        key: key
    })

    if (key == null) return {
        error: true,
        data: null,
        message: `No API key provided.`
    }

    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`

    const response = await axios.get(endpoint).catch(error => {
        console.log(`error `, error)
        return {
            error : true,
            data: null
        }
    })

    // Handle CORS and other issues if the response is null
    const results = response && response.data.results
        ? response.data.results
        : null

    // Look up the place, if there's a Google Place ID
    if (results && results[0].place_id) {
        const placeResults = await getPlaceDetails(key, results[0].place_id)
        console.log(`Got place id, look it up: `, placeResults);

        // Return just the results
        return {
            error: false,
            data: {
                place: placeResults.data,
                results: results
            }
        }
    } else {
        // Return just the resuls
        return {
            error: false,
            data: {
                place: null,
                results: response.data
            }
        }
    }
}

export const getPlaceDetails = async (
    key = null,
    place_id = 'ChIJAQDsXLeAj4ARx-92_aeMjX4'
) => {

    if (key == null) return {
        error: true,
        data: null,
        message: `No API key provided.`
    }

    const params = new URLSearchParams({
        key: key,
        place_id: place_id
    })

    const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`

    const response = await axios.get(endpoint).catch(error => {
        console.log(`error `, error)
        return {
            error: true,
            data: null
        }
    })

    const googlePlace = response.data.result
    const place = {
        ...googlePlace,
        address: googlePlace.formatted_address,
        url: googlePlace.website,
    }

    return {
        error: false,
        data: place
    }
}

export const getPlaceSocial = async (key, query = 'Vibemap', cse_id = '08cefff08b1db59b1') => {
    if (key == null || key == undefined) return {
        error: true,
        data: null,
        message: `No API key provided.`
    }

    const params = new URLSearchParams({
        key: key,
        'q': query,
        'cx': cse_id
    })

    console.log(`Params to strng `, params.toString());

    const endpoint = `GET https://customsearch.googleapis.com/customsearch/v1
        ?${params.toString()} HTTP/1.1`

    const response = await axios.get(endpoint).catch(error => {
        console.log(`error `, error)
        return {
            error: true,
            data: error
        }
    })

    console.log(`Response `, response);



}

// Returns area for a boundary in miles
export const getArea = (bounds) => {

  //let bounds = geoViewport.bounds([location.longitude, location.latitude], zoom, [window.width, window.height])
  let height = turf_distance(
      [bounds[0], bounds[1]], // Southwest
      [bounds[0], bounds[3]], // Northwest
      { units: 'miles' }
  )

  let width = turf_distance(
      [bounds[0], bounds[1]], // Southwest
      [bounds[2], bounds[1]], // Southeast
      { units: 'miles' }
  )

  let area = height * width

  return area
}

// Give the boundaries for a centerpoint and zoom level
export const getBounds = (location, zoom, size) => {

    let bounds = geoViewport.bounds([location.longitude, location.latitude], zoom, [size.width, size.height], 512)

    return bounds
}

export const getClusters = (places, cluster_size) => {
    let collection = featureCollection(places)
    let results = []

    let clustered = clustersDbscan(collection, cluster_size / 1000, { mutate: true, minPoints: 2 })

    clusterEach(clustered, 'cluster', function (cluster, clusterValue) {
        // Only adjust clusters
        if (clusterValue !== 'null') {
            let center = turf_center(cluster)

            let max_score = getMax(cluster.features, 'average_score')
            let size = cluster.features.length

            /* For testing purposes:
            console.log('--- Max score for cluster: ', max_score)
            console.log('--- Center of cluster: ', center)
            console.log('--- Size of cluster: ', size)
            */

            // TODO: Handle sorting & sizing based on score and distance.
            featureEach(cluster, function (currentFeature, featureIndex) {

                let fields = currentFeature.properties
                let vibes_score = fields.vibes_score
                let score_diff = max_score - vibes_score

                let rhumb_distance = rhumbDistance(center, currentFeature)
                let bearing = rhumbBearing(center, currentFeature)
                let destination = rhumbDestination(center, rhumb_distance * 2, bearing)

                // Move the point based on the rhumb distance and bearing from the cluster center.
                fields.offset = destination.geometry

                // Give point more cluster attributes
                fields.in_cluster = true
                fields.top_in_cluster = false

                if (fields.average_score  >= max_score) {
                    fields.top_in_cluster = true
                } else {
                    fields.icon_size = fields.icon_size / 2
                }

                //currentFeature.properties.vibe_score = (vibe_score - score_diff) * bonus

                currentFeature.properties = fields
                results.push(currentFeature)
                //=currentFeature
                //=featureIndex
                //console.log("Cluster: ", currentFeature.properties.dbscan)
            })
        } else {
            featureEach(cluster, function (currentFeature, featureIndex) {
                currentFeature.properties.in_cluster = false
                currentFeature.properties.top_in_cluster = true

                results.push(currentFeature)
            })
        }
    })

    // Put larger markers on top
    // TODO: Also set the details for the cluster
    // TODO: Define sorting one place so it dones't get messed up
    results = results.sort((a, b) => {
        return b.properties.average_score - a.properties.average_score
    })

    return results
}

export const getDistance = (point_a, point_b) => {

    let new_distance = turf_distance(
        [point_a[0], point_a[1]],
        [point_b[0], point_b[1]],
        { units: 'miles' }
    )

    return new_distance
}

// Get pixel distance of bounds
// TODO: This should be named better
export const getDistanceToPixels = (bounds, window) => {
    const left = bounds[0]
    const bottom = bounds[1]
    const right = bounds[2]

    const options = { unit: 'miles' }

    const latitudinal_distance = turf_distance([left, bottom],[right, bottom], options)

    let pixel_ratio = latitudinal_distance / window.width

    return pixel_ratio

}

export const getFeaturesInBounds = (features, bounds) => {

    const collection = featureCollection(features)

    //const box = bbox(lineString(bounds))

    const polygon = bboxPolygon(bounds.flat());

    const pointsInBounds = pointsWithinPolygon(collection, polygon)

    // TODO: Will it be faster to keep features in a collection and use the turf each method?
    return pointsInBounds.features;
}

// Return heatmap colors by vibe
/* TODO: Only use primary vibe set colors on the second half of the heatmap */
/* TODO: Get colors from vibemap-constants */
export const getHeatmap = (colors, vibe) => {

    //let colors = color.map((color, i) => choroma(color).alpha(0.2))
    let heatmap = []

    let blue = '#008ae5'
    // UNUSED: let gray = '#B1E2E5'
    let yellow = '#F8EE32'
    // UNUSED: let pink = '#ED0A87'
    // UNUSED: let teal = '#32BFBF'
    let white = '#FFFFFF'

    let light_blue = '#54CAF2'
    let light_green = '#9DE862'
    let light_teal = '#7DCAA5'
    let light_pink = '#E479B0'
    let light_purple = '#BC94C4'
    let light_yellow = '#FFFCC5'
    // UNUSED: let light_orange = '#FBCBBD'
    let orange = '#F09C1F'

    /*
    let classic = ['blue', 'teal', 'yellow', 'orange']
    let blue_scale = ['gray', 'white', 'yellow', 'blue']
    let orange_scale = ['#B1E2E5',  'yellow', 'orange']
    let purple_scale = ['#B1E2E5', '#EDE70D', '#F27BA5', '#D76CE3']
    let spectral = chroma.scale('Spectral').colors(6).reverse()
    */

    let green_purple = "PiYG"

    const vibe_to_scale = {
        'calm': [white, light_blue, light_green, light_yellow],
        'buzzing': [white, light_pink, orange, light_yellow],
        'dreamy': [white, light_purple, orange, light_yellow],
        'oldschool': [blue, yellow,  orange],
        'playful': [white, light_teal, light_green, yellow],
        'solidarity': [white, light_yellow, yellow, orange],
        'together': [white, light_teal, light_yellow],
        'wild': green_purple
    }

    let scale = [white, light_purple, yellow, orange]

    if (vibe) scale = vibe_to_scale[vibe]

    //console.log('getHeatmap(colors, vibes): ', colors, vibe, scale)

    if (colors) {
        scale = chroma.scale([colors])
    }

    heatmap = chroma.scale(scale)
        .mode('lch') // lab
        //.domain([0, .1, 0.9, 1])
        .colors(6)


    heatmap = heatmap
        //.reverse()
        .map((color, i) => {
            let alpha = i * 0.2
            let rgb = chroma(color)
                .alpha(alpha)
                //.brighten(i * 0.05)
                .saturate(i * 0.05)
                .css()
            console.log('heat layer ', i, rgb)
            return rgb
        })

    /*
    heatmap = chroma.cubehelix()
        .lightness([0.3, 0.8])
        .scale() // convert to chroma.scale
        .correctLightness()
        .colors(6)

    heatmap = chroma.scale('Spectral')
        //.scale() // convert to chroma.scale
        .colors(6)
    */

    return heatmap
}

export const getDirections = async(waypoints, token, mode = 'walking') => {
    return new Promise(function (resolve, reject) {
        const service = `https://api.mapbox.com/directions/v5/mapbox/${mode}/`
        let query = querystring.stringify({
            access_token: token,
            geometries: 'geojson',
            steps: true,
            waypoints: []
        })

        const start = waypoints[0]
        const end = waypoints[waypoints.length - 1]

        let start_end = String(start) + ';' + String(end)
        //if (waypoints !== undefined) query['waypoints'] = query += 'waypoints=' + waypoints.join(';')

        start_end = waypoints.join(';')
        //console.log('Getting directions for ', start_end, query)

        fetch(service + start_end + "?" + query)
            .then(data => data.json())
            .then(res => {
                //console.log('Got Directions: ', res)
                resolve({ data: res, loading: false, timedOut: false })

            }, (error) => {
                console.log(error)
            });
        })
}

export const getWaypoints = (features) => {
    const waypoints = features.map(feature => feature['geometry']['coordinates'])

    return waypoints
}

export const getBestRoute = (directions) => {

    let bestRoute = directions['data']['routes'][0]

    let geojson = {
        type: 'Feature',
        properties: {
            distance: bestRoute['distance']
        },
        geometry: {
            type: 'LineString',
            coordinates: bestRoute['geometry']['coordinates']
        }
    }

    return geojson

}

// Get HTML Position
export const getPosition = (options) => {

    return new Promise(function (resolve, reject) {

        const options = {
          enableHighAccuracy: true,
          timeout: 4000
        }


        if (!navigator.geolocation || !navigator.geolocation.getCurrentPosition) resolve(false)

        function success(position) {
            //console.log('got position: ', position)
            resolve(position)
        }

        function error(err) {
            //console.log('Error with location: ', err)
            reject(false)
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options)
        //console.log('Getting position: ', navigator.geolocation, navigator.geolocation.getCurrentPosition, position)

    })
}

// Return radius within bounds in miles
export const getRadius = (bounds) => {

    let diameter = turf_distance(
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
        { units: 'miles'}
    )

    let new_distance = diameter / 2

    return new_distance
}

export const getFeatureCollection = (geojson) => {
    return featureCollection(geojson)
}

export const getTruncatedFeatures = (features) => {
    return turf_truncate(features, { precision: 6, coordinates: 2 })
}

export const zoomToRadius = (zoom) => {

    // Scale and interpolate radius to zoom siz
    let zoom_to_radius_scale = scalePow(1)
      .domain([8,  12, 13, 14, 16, 18]) // Zoom size
      .range([ 40, 7,  3,  3.5, 1.5,  0.8]) // Scale of search radius

    let new_zoom = zoom_to_radius_scale(zoom)

    return new_zoom
}
