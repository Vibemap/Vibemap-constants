'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var geoViewport = require('@mapbox/geo-viewport');
var turf = require('@turf/turf');
var querystring = require('querystring');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var geoViewport__default = /*#__PURE__*/_interopDefaultLegacy(geoViewport);
var turf__namespace = /*#__PURE__*/_interopNamespace(turf);
var querystring__default = /*#__PURE__*/_interopDefaultLegacy(querystring);

// Returns area for a boundary in miles
const getArea = (bounds) => {
        
  //let bounds = geoViewport.bounds([location.longitude, location.latitude], zoom, [window.width, window.height])
  let height = turf__namespace.distance(
      [bounds[0], bounds[1]], // Southwest
      [bounds[0], bounds[3]], // Northwest
      { units: 'miles' }
  );

  let width = turf__namespace.distance(
      [bounds[0], bounds[1]], // Southwest
      [bounds[2], bounds[1]], // Southeast
      { units: 'miles' }
  );

  let area = height * width;

  return area
};

// Give the boundaries for a centerpoint and zoom level
const getBounds = (location, zoom, size) => {

    let bounds = geoViewport__default['default'].bounds([location.longitude, location.latitude], zoom, [size.width, size.height], 512);
  
    return bounds
};

const getDistance = (point_a, point_b) => {

    let new_distance = turf__namespace.distance(
        [point_a[0], point_a[1]],
        [point_b[0], point_b[1]],
        { units: 'miles' }
    );

    return new_distance
};

// Get pixel distance of bounds
// TODO: This should be named better
const getDistanceToPixels = (bounds, window) => {
    const left = bounds[0];
    const bottom = bounds[1];
    const right = bounds[2];
  
    const options = { unit: 'miles' };
    
    const latitudinal_distance = turf__namespace.distance([left, bottom],[right, bottom], options);
  
    let pixel_ratio = latitudinal_distance / window.width;
  
    return pixel_ratio
  
};
  
const getFeaturesInBounds = (features, bounds) => {
  
    const collection = turf__namespace.featureCollection(features);
  
    //const box = bbox(lineString(bounds))
  
    const polygon = turf__namespace.bboxPolygon(bounds.flat());
  
    const pointsInBounds = turf__namespace.pointsWithinPolygon(collection, polygon);
  
    // TODO: Will it be faster to keep features in a collection and use the turf each method? 
    return pointsInBounds.features;
};

// Return heatmap colors by vibe
/* TODO: Only use primary vibe set colors on the second half of the heatmap */
/* TODO: Get colors from vibemap-constants */
const getHeatmap = (colors, vibe) => {
    
    //let colors = color.map((color, i) => choroma(color).alpha(0.2))
    let heatmap = [];
    
    let blue = '#008ae5';
    let yellow = '#F8EE32';
    let white = '#FFFFFF';
    
    let light_blue = '#54CAF2';
    let light_green = '#9DE862';
    let light_teal = '#7DCAA5';     
    let light_pink = '#E479B0';
    let light_purple = '#BC94C4';
    let light_yellow = '#FFFCC5';
    let orange = '#F09C1F';
  
    /*
    let classic = ['blue', 'teal', 'yellow', 'orange']
    let blue_scale = ['gray', 'white', 'yellow', 'blue']
    let orange_scale = ['#B1E2E5',  'yellow', 'orange']
    let purple_scale = ['#B1E2E5', '#EDE70D', '#F27BA5', '#D76CE3']
    let spectral = chroma.scale('Spectral').colors(6).reverse()
    */
  
    let green_purple = "PiYG";
    
    const vibe_to_scale = {
        'calm': [white, light_blue, light_green, light_yellow],
        'buzzing': [white, light_pink, orange, light_yellow],
        'dreamy': [white, light_purple, orange, light_yellow],
        'oldschool': [blue, yellow,  orange],
        'playful': [white, light_teal, light_green, yellow],
        'solidarity': [white, light_yellow, yellow, orange],
        'together': [white, light_teal, light_yellow],
        'wild': green_purple
    };
  
    let scale = [white, light_purple, yellow, orange];
  
    if (vibe) scale = vibe_to_scale[vibe];
  
    //console.log('getHeatmap(colors, vibes): ', colors, vibe, scale)
  
    if (colors) {            
        chroma('#fafa6e');
        chroma('#fafa6e');
        scale = chroma.scale([colors]);
    }
  
    heatmap = chroma.scale(scale)
        .mode('lch') // lab
        //.domain([0, .1, 0.9, 1])
        .colors(6);
  
    
    heatmap = heatmap
        //.reverse()
        .map((color, i) => {
            let alpha = i * 0.2;
            let rgb = chroma(color)
                .alpha(alpha)
                //.brighten(i * 0.05)
                .saturate(i * 0.05)
                .css();
            console.log('heat layer ', i, rgb);
            return rgb
        });
  
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
};

const getDirections = async(waypoints, token, mode = 'walking') => {
    return new Promise(function (resolve, reject) {
        const service = `https://api.mapbox.com/directions/v5/mapbox/${mode}/`;
        let query = querystring__default['default'].stringify({
            access_token: token,
            geometries: 'geojson',
            steps: true,
            waypoints: []
        });

        const start = waypoints[0];
        const end = waypoints[waypoints.length - 1];

        let start_end = String(start) + ';' + String(end);
        //if (waypoints !== undefined) query['waypoints'] = query += 'waypoints=' + waypoints.join(';')
        
        start_end = waypoints.join(';');
        //console.log('Getting directions for ', start_end, query)

        fetch(service + start_end + "?" + query)
            .then(data => data.json())
            .then(res => {
                //console.log('Got Directions: ', res)
                resolve({ data: res, loading: false, timedOut: false });

            }, (error) => {
                console.log(error);
            });
        })
};

const getWaypoints = (features) => {
    const waypoints = features.map(feature => feature['geometry']['coordinates']);
    
    return waypoints
};

const getBestRoute = (directions) => {
    
    let bestRoute = directions['data']['routes'][0];

    let geojson = {
        type: 'Feature',
        properties: {
            distance: bestRoute['distance']
        },
        geometry: {
            type: 'LineString',
            coordinates: bestRoute['geometry']['coordinates']
        }
    };
    
    return geojson

};

// Get HTML Position
const getPosition = (options) => {
  
    return new Promise(function (resolve, reject) {
  
        const options = { 
          enableHighAccuracy: true,
          timeout: 4000 
        };
  
  
        if (!navigator.geolocation || !navigator.geolocation.getCurrentPosition) resolve(false);
  
        function success(position) {
            //console.log('got position: ', position)
            resolve(position);                
        }
  
        function error(err) {
            //console.log('Error with location: ', err)
            reject(false);
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
  
        navigator.geolocation.getCurrentPosition(success, error, options);
        //console.log('Getting position: ', navigator.geolocation, navigator.geolocation.getCurrentPosition, position)
  
    })
};

// Return radius within bounds in miles
const getRadius = (bounds) => {
  
    let diameter = turf__namespace.distance(
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
        { units: 'miles'}
    );
  
    let new_distance = diameter / 2;
  
    return new_distance
  
};

const zoomToRadius = (zoom) => {
        
    // Scale and interpolate radius to zoom siz
    let zoom_to_radius_scale = scalePow(1)
      .domain([8,  12, 13, 14, 16, 18]) // Zoom size
      .range([ 40, 7,  3,  3.5, 1.5,  0.8]); // Scale of search radius
  
    let new_zoom = zoom_to_radius_scale(zoom);
    
    return new_zoom
  };

exports.getArea = getArea;
exports.getBestRoute = getBestRoute;
exports.getBounds = getBounds;
exports.getDirections = getDirections;
exports.getDistance = getDistance;
exports.getDistanceToPixels = getDistanceToPixels;
exports.getFeaturesInBounds = getFeaturesInBounds;
exports.getHeatmap = getHeatmap;
exports.getPosition = getPosition;
exports.getRadius = getRadius;
exports.getWaypoints = getWaypoints;
exports.zoomToRadius = zoomToRadius;
