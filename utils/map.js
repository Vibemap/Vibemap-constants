import geoViewport from '@mapbox/geo-viewport'
import axios from "axios"

import * as turf from '@turf/helpers'
import { featureCollection } from '@turf/helpers'
import { featureEach } from '@turf/meta'
import { clusterEach } from '@turf/clusters'
import bboxPolygon from '@turf/bbox-polygon'
import booleanPointInPolygon from "@turf/boolean-point-in-polygon"
import turf_center from '@turf/center'
import turf_distance from '@turf/distance'
import turf_truncate from '@turf/truncate'
import clustersDbscan from '@turf/clusters-dbscan'
import pointsWithinPolygon from '@turf/points-within-polygon'
import rhumbBearing from '@turf/rhumb-bearing'
import rhumbDistance from '@turf/rhumb-distance'
import rhumbDestination from '@turf/rhumb-destination'

import querystring from 'querystring'
import { getMax } from './math'

export const geocodeAddress = async (
    key = 'AIzaSyAJfpSSx6pudnbjILmdUPBG7O4Diu2RHgE',
    address = `Red Bay Coffee Roasers`,
    city = null
) => {
    // Args to query params
    const params = new URLSearchParams({
        address: address,
        key: key
    })

    if (key == null) return {
        error: true,
        data: null,
        message: `No API key provided.`
    }

    const endpoint = `https://vibemap.com/googleGeocoder?${params.toString()}${city ? '&components=locality=' + city : ''}`

    const response = await axios.get(endpoint).catch(error => {
        console.log(`error `, error)
        return {
            error: true,
            data: error
        }
    })

    // Handle CORS and other issues if the response is null
    const results = response && response.data && response.data.results
        ? response.data.results
        : null


    // Look up the place, if there's a Google Place ID
    if (results && results.length > 0 && results[0].place_id) {
        const id = results[0].place_id
        const placeResults = await getPlaceDetails(key, id)

        const place = placeResults.data

        if (placeResults.error !== true) {
            // Give it an ID to be consistent with Vibemap schema
            place.id = id
            place.source = 'google'

            // TODO: Make a place to geoJSON method
            const location = place.geometry.location
            place.geometry.coordinates = [location.lng, location.lat]

            place.properties = {
                name: place.name,
                aggregate_rating: place.rating,
                address: place.address,
                telephone: place.formatted_phone_number,
                tips: place.reviews
                    ? place.reviews.map(review => review.text)
                    : [],
                url: place.url
            }
        }

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

    const endpoint = `https://vibemap.com/googlePlaces?${params.toString()}`

    const response = await axios.get(endpoint).catch(error => {
        console.log(`error `, error)
        return {
            error: true,
            data: null
        }
    })

    if (response.error || response.data == null || !response.data.result) {
        return {
            error: true,
            data: response.data
        }
    }

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

// Point is a [lng, lat] coordinate array
// Bounds is a [sw, ne] coordinate array
export const isPointInBounds = (point, bounds) => {

    const pointToCheck = turf.point(point)
    const shape = getPolygon(bounds)

    const isInside = booleanPointInPolygon(pointToCheck, shape)

    
    return isInside
}

export const getPolygon = (bounds) => {
    var polygon = bboxPolygon(bounds);

    return polygon
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

                if (fields.average_score >= max_score) {
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

    const latitudinal_distance = turf_distance([left, bottom], [right, bottom], options)

    let pixel_ratio = latitudinal_distance / window.width

    return pixel_ratio

}

export const getFeaturesInBounds = (features, bounds) => {
    // TODO: Will it be faster to keep features in a collection and use the turf each method?
    const collection = featureCollection(features.map(feature => {
        // Temp fix for any features that are style type event/places
        feature.type = 'Feature'
        return feature
    }))

    //const box = bbox(lineString(bounds))
    const parsedBounds = bounds && bounds.flat
        ? bounds.flat()
        : bounds

    try {
        const polygon = bboxPolygon(parsedBounds);
        const pointsInBounds = pointsWithinPolygon(collection, polygon)
        return pointsInBounds.features;
    } catch (error) {
        console.log('Problem with bounds ', bounds, error);
        console.error('Problem with bounds ', bounds, error);
        return features
    }
}

export const getFeaturesFromSource = (e, loaded, zoom = 12) => {
    // Is the source and tile loaded
    const isSourceLoaded = e ? e.isSourceLoaded : false
    const sourceId = e ? e.sourceId : null

    let bounds = null
    const clusterSize = (zoom / 2) * 20

    if (mapRef.current) {
        const map = mapRef.current.getMap()
        bounds = map.getBounds().toArray()

        // Map is loaded or places layer changed
        if (loaded ||
            isSourceLoaded && sourceId === 'public.places_vt' ||
            isSourceLoaded && sourceId === 'places_data' ||
            isSourceLoaded && sourceId === 'composite') {
            // Loads date to json that is filtered by the client based on nav state
            const source_features = map.querySourceFeatures('public.places_vt', { sourceLayer: 'public.places_vt' })
            const center_point = [viewport.longitude, viewport.latitude]

            /* TODO: probably best to do clustering and sorting outside */
            const places = placesFromTile(source_features, 'places', bounds, center_point, viewport.zoom)
            return places
        } else {
            return null
        }
    }
}

export const getDirections = async (waypoints, token, mode = 'walking') => {
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

/* There are a few different location and geometric objects in our system:
    - City: object with center point and location, sourced from Wordpress CMS
    - Location: an object with a latitude, longitude, and centerpoint
    - Center Point: A point array of [lng, lat]
    - Point String: Stringified center point
 */

export const getLocationFromPoint = (point = [-122.269994, 37.806507]) => {
    const location = {
        centerpoint: point,
        longitude: point[0],
        latitude: point[1]
    }

    return location
}

export const getPointFromLocation = (location = {
    latitude: 37.806507,
    longitude: -122.269994
}) => {
    const point = [location.longitude, location.latitude]
    return point
}

export const getMapStyles = () => {
    return {
        categories: {
            going_out: '#e31a1c'
        },

        lens: {
            'fill-color': '#007AFF',
            'fill-opacity': 0.4,
            'fill-outline-color': '#007AFF'
        },

        geolocateStyle: {
            position: 'absolute',
            right: 3,
            top: 100,
            width: 30
        },

        navigateStyle: {
            top: 3,
            right: 3
        },

        top_marker: {
            // Icon Style
            "icon-size": [
                "interpolate",
                ["linear"], ["zoom"],
                8, 0.4,
                16, 1,
                22, 32
            ],
        },

        marker_layout: {
            // Icon Style
            "icon-image": ["to-string", ["get", "icon"]],
            "icon-allow-overlap": false,
            "icon-ignore-placement": false,
            "icon-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                10,
                ["+", ["*", ["get", "average_score"], 0.4], 0.2],
                20,
                ["+", ["*", ["get", "average_score"], 0.8], 0.2]
            ],
            "symbol-sort-key": ["get", "vibe_score"],
            "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                8, 4,
                14, 8,
                20, 12
            ],
            //"text-offset": [0, -1.0],
            //"text-padding": 1,
            // Text
            "text-field": ["to-string", ["get", "short_name"]],
            "text-anchor": "top",
            "text-allow-overlap": false,
            "text-ignore-placement": false,
            "text-line-height": 1.0,
            'text-justify': 'auto',
            'text-variable-anchor': ['top', 'bottom', 'right'],
            "text-font": [
                "Public Sans Regular",
                "Arial Unicode MS Regular"
            ],
            "text-max-width": 10,
            "text-radial-offset": 1.4,
            'visibility': 'visible'
        },

        marker_paint: {
            'text-color': '#7D7C84',
            'icon-color': '#3475BA',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 1.2
        },

        route_layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },

        route_paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
        },

        top_pick_layout: {
            // TODO: Make sure important sorting variable is working
            //"icon-image": "",
            "icon-image": ["to-string", ["get", "icon"]],
            "icon-size": [
                "interpolate",
                ["linear"], ["zoom"],
                8, 0.4,
                22, 1.6
                // 22, ["get", "icon_size"]
            ],
            "symbol-sort-key": ["get", "vibe_score"],
            // Text
            "text-field": [
                "match",
                ["get", "top_in_cluster"],
                ["false"],
                "",
                ["to-string", ["get", "short_name"]]
            ],
            "text-allow-overlap": false,
            "icon-allow-overlap": false,
            "icon-ignore-placement": false,
            "text-ignore-placement": false,
            "text-radial-offset": [
                "interpolate",
                ["linear"], ["zoom"],
                8, 0.6,
                12, ["-", ["get", "icon_size"], 0],
                14, ["+", ["get", "icon_size"], 0.0],
                20, ["+", ["get", "icon_size"], 0.2]
            ],
            "text-font": [
                "Public Sans Bold",
                "Arial Unicode MS Regular"
            ],
            "text-line-height": 1.0,
            "text-letter-spacing": 0,
            "text-anchor": "top",
            'text-variable-anchor': ['top', 'bottom', 'right'],
            "text-justify": "auto",
            "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                8, 8,
                22, 14
            ],
            "text-max-width": 10,
            'visibility': 'visible'
        },

        neighborhood_layout: {
            "text-size": {
                "base": 1,
                "stops": [[10, 8], [18, 12]]
            },
            "text-transform": "uppercase",
            "text-padding": 1,
            "text-field": [
                "to-string",
                ["get", "neighborhood"]
            ],
            "text-font": ["Public Sans Bold"],
            "text-letter-spacing": 0.1,
            "text-allow-overlap": true,
            "text-ignore-placement": true,
            "text-max-width": 8,
            "visibility": "visible"
        },

        neighborhood_paint: {
            "text-halo-color": "hsla(295, 100%, 100%, 0.8)",
            "text-halo-width": 1,
            "text-color": "hsl(253, 50%, 47%)",
            //"text-halo-blur": 0.6,
            //"text-opacity": 0.33
        },

        top_pick_paint: {
            'text-color': '#666666',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 1.4
        },

        top_vibe_layout: {
            // Text
            "text-field": [
                // Dont show labels for clustered markers
                //["match", ["get", "top_in_cluster"], [true], null],
                "to-string", ["get", "top_vibe"]
            ],
            "text-font": ["Roboto Condensed Italic"],
            "text-justify": "auto",
            "text-anchor": "top",
            "text-allow-overlap": false,
            "icon-allow-overlap": false,
            "icon-ignore-placement": true,
            "text-ignore-placement": true,
            "symbol-sort-key": ["get", "vibe_score"],
            "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                8, 6,
                22, 20
            ],
            "text-radial-offset": [
                "interpolate",
                ["linear"], ["zoom"],
                8, 0.4,
                12, ["-", ["get", "icon_size"], 1.3],
                15, ["-", ["get", "icon_size"], 1.0],
                18, ["-", ["get", "icon_size"], 1.6]
            ],
            "text-max-width": 12
        },

        places_heatmap: {
            'heatmap-radius': [
                "interpolate",
                ["linear"],
                ["zoom"],
                8, 1,
                10, 16,
                12, 32,
                13, 40,
                14, 60,
                20, 200
            ],
            'heatmap-opacity': [
                "interpolate",
                ["linear"],
                ["zoom"],
                8, 0.4,
                11, 0.2,
                20, 0.3
            ],
            // This number is adjusted by React based on the relative density of the map area
            'heatmap-intensity': 0.2,
            /*
            'heatmap-intensity': [
                "interpolate",
                ["linear"],
                ["zoom"],
                8, 0.8,
                10, 0.3,
                12, 0.1,
                14, 0.3,
                20, 0.5
            ],
            */

            // TODO: this should be average_score from backend vibe score
            "heatmap-weight": [
                "interpolate",
                ["linear"],
                ["get", "vibes_score"],
                1, 0.1,
                2, 0.6,
                10, 2
            ],

            "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0.1,
                "hsla(240, 80%, 94%, 0.2)",
                // Replaced by heatmap.fifth
                0.2,
                "hsla(125, 63%, 88%, 0.4)",
                // Replaced by heatmap.fourth
                0.4,
                "hsla(192, 84%, 80%, 0.4)",
                // Replaced by heatmap.third
                0.6,
                "hsla(274, 100%, 65%, 0.5)",
                // Replaced by heatmap.second
                0.95,
                "hsla(300, 100%, 50%, 0.6)",
                // Replaced by heatmap.first
                1.1,
                "hsla(42, 100%, 64%, 0.6)",
                /* The pink is too much?
                1.2,
                "hsla(42, 88%, 65%, 0.9)"
                */
            ]
        },

        /*
        tile_layer_layout: {
            'line-cap': 'round',
            'line-join': 'round'
        },

        tile_layer_paint: {
            'line-opacity': 0.6,
            'line-color': 'rgb(53, 175, 109)',
            'line-width': 2
        },
        */

        places_cluster: {
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1"
            ],
            'circle-opacity': 0.2,
            'circle-stroke-color': '#FFFFFF',
            'circle-stroke-width': 2.4,
            'circle-radius': {
                property: 'point_count',
                type: 'interval',
                stops: [
                    [0, 60],
                    [100, 80],
                    [750, 160]
                ]
            }
        },

        events_circle: {
            // increase the radius of the circle as the zoom level and dbh value increases
            'circle-radius': {
                'base': 8,
                'stops': [[8, 4], [18, 20]]
            },
            'circle-color': '#C650CC',
            'circle-stroke-color': '#CC9423',
            'circle-stroke-width': 0.4,
            'circle-opacity': {
                'stops': [[8, 0.01], [20, 0.6]]
            },
            'circle-translate': [-2, -2]
        },

        hidden_circles: {
            //'visibility': 'none'
            'circle-opacity': 0
        },

        places_circle: {
            // increase the radius of the circle as the zoom level and dbh value increases
            'circle-radius': [
                "interpolate",
                ["linear"],
                ["get", "aggregate_rating"],
                1, 0.1,
                2, 2,
                10, 4
            ],
            'circle-color': "#765382",
            'circle-stroke-color': '#FFFFFF',
            'circle-stroke-width': 0.4,
            'circle-stroke-opacity': 0.8,
            'circle-opacity': {
                'stops': [[8, 0.4], [20, 0.6]]
            },
            //'circle-translate': [-2, -2]
        }
    }
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
        { units: 'miles' }
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

export const sortLocations = (locations, currentLocation) => {
    //console.log('sortLocations ', locations, currentLocation);

    let current = turf.point([currentLocation.longitude, currentLocation.latitude])

    // Sort the list of places based on closness to the users
    let sorted_locations = locations.sort((a, b) => {
        const point_a = a.centerpoint
            ? turf.point(a.centerpoint)
            : turf.point([a.location.longitude, a.location.latitude])

        const point_b = b.centerpoint
            ? turf.point(b.centerpoint)
            : turf.point([b.location.longitude, b.location.latitude])

        a.distance = turf_distance(current, point_a)
        b.distance = turf_distance(current, point_b)

        if (a.distance > b.distance) {
            return 1
        } else {
            return -1
        }
    })

    return sorted_locations
}

export const distanceBetweenLocations = (locationFirst, locationSecond, units = 'miles') => {

    let first = turf.point([locationFirst.longitude, locationFirst.latitude])
    let second = turf.point([locationSecond.longitude, locationSecond.latitude])

    const distance = turf_distance(first, second)
    return distance
}

export const zoomToRadius = (zoom) => {

    // Scale and interpolate radius to zoom siz
    let zoom_to_radius_scale = scalePow(1)
        .domain([8, 12, 13, 14, 16, 18]) // Zoom size
        .range([40, 7, 3, 3.5, 1.5, 0.8]) // Scale of search radius

    let new_zoom = zoom_to_radius_scale(zoom)

    return new_zoom
}
