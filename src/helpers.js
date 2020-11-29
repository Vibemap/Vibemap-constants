import * as Constants from './constants.js'

import { scalePow } from 'd3-scale'
import chroma from 'chroma-js'

import dayjs from 'dayjs'

import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

import { featureCollection, point, lineString } from '@turf/helpers'
import { coordReduce } from '@turf/meta'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


import escapeRegExp from 'lodash.escaperegexp'
import filter from 'lodash.filter'
import Fuse from 'fuse.js'

import bbox from '@turf/bbox'
import bboxPolygon from '@turf/bbox-polygon'
import distance from '@turf/distance'

import pointsWithinPolygon from '@turf/points-within-polygon'

import url from 'url'

import geoViewport from '@mapbox/geo-viewport'

import * as style_variables from 'vibemap-constants/design-system/build/json/variables.json';

const helpers = {

    // Get HTML Position
    getPosition: function(options) {
        return new Promise(function (resolve, reject) {

            const options = { enableHighAccuracy: true }

            //console.log('Getting position: ', navigator.geolocation, navigator.geolocation.getCurrentPosition)

            if (!navigator.geolocation || !navigator.geolocation.getCurrentPosition) resolve(false)

            function success(position) {
                resolve(position)                
            }

            function error(err) {
                console.log('Error with location: ', err)
                reject(false)
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }

            navigator.geolocation.getCurrentPosition(success, error, options);

        })
    },

    getBounds: function(location, zoom, size) {
        let bounds = geoViewport.bounds([location.longitude, location.latitude], zoom, [size.width, size.height], 512)
        //console.log("Got bounds for: ", location, zoom, size, bounds)
        return bounds
    },

    getDistance: function (point_a, point_b) {
        let new_distance = distance(
            [point_a[0], point_a[1]],
            [point_b[0], point_b[1]],
            { units: 'miles' }
        )

        return new_distance
    },              
    getRadius: function (bounds) {        
        //let bounds = geoViewport.bounds([location.longitude, location.latitude], zoom, [window.width, window.height])
        let diameter = distance(
            [bounds[0], bounds[1]],
            [bounds[2], bounds[3]],
            { units: 'miles'}
        )

        let new_distance = diameter / 2

        return new_distance
    },

    getArea: function (bounds) {
        
        //let bounds = geoViewport.bounds([location.longitude, location.latitude], zoom, [window.width, window.height])
        let height = distance(
            [bounds[0], bounds[1]], // Southwest
            [bounds[0], bounds[3]], // Northwest
            { units: 'miles' }
        )

        let width = distance(
            [bounds[0], bounds[1]], // Southwest
            [bounds[2], bounds[1]], // Southeast
            { units: 'miles' }
        )
  
        let area = height * width

        return area
    },

    getDistanceToPixels(bounds, window) {
        const left = bounds[0]
        const bottom = bounds[1]
        const right = bounds[2]
        //const top = bounds[3]

        const options = { unit: 'miles' }
        
        const latitudinal_distance = distance([left, bottom],[right, bottom], options)
        //const longitudinal_distance = distance([left, bottom], [left, top], options)

        let pixel_ratio = latitudinal_distance / window.width

        return pixel_ratio

    },

    getFeaturesInBounds(features, bounds) {

        const collection = featureCollection(features)

        //const box = bbox(lineString(bounds))

        const polygon = bboxPolygon(bounds.flat());

        const pointsInBounds = pointsWithinPolygon(collection, polygon)

        // TODO: Will it be faster to keep features in a collection and use the turf each method? 
        return pointsInBounds.features;

    },

    // Parse all variety of social links and return a consistent, valid url
    getFullLink(link, type='instagram') {

        const domains = {
            'instagram': 'https://instagram.com/',
            'twitter': 'https://twitter.com/'
        }

        // Handle things that aren't valid string handles
        // TODO: add unit tests for link = null; link = '' and other cases
        if (link === null || link === "") return null        

        const parse_url = url.parse(link)
        // Only the path handle
        const path = parse_url.path.replace('/', '')
        
        // Combine domain and handle
        const full_link = domains[type] + path
        
        return full_link
    },

    getVibeStyle(vibe) {
        let vibe_styles = style_variables['default']['color']['vibes']

        let dark_gray = style_variables['default']['color']['base']['gray']['1000']
        let light_gray = style_variables['default']['color']['base']['gray']['200']

        let css = { color: dark_gray, background: light_gray }

        if (vibe in vibe_styles) {
            let primary = vibe_styles[vibe]['primary']

            let luminance = chroma(primary).luminance()
            let brightness = 1.2
            if (luminance < 0.1) brightness += 2
            if (luminance < 0.3) brightness += 1

            let gradient = 'linear-gradient(45deg, ' + chroma(primary).brighten(brightness).hex() + ' 0%, ' + light_gray + ' 75%)'

            css['background'] = gradient

        }

        return css
    },

    zoomToRadius : function(zoom) {
        
        // Scale and interpolate radius to zoom siz
        let zoom_to_radius_scale = scalePow(1)
          .domain([8,  12, 13, 14, 16, 18]) // Zoom size
          .range([ 40, 7,  3,  3.5, 1.5,  0.8]) // Scale of search radius

        let new_zoom = zoom_to_radius_scale(zoom)
        
        return new_zoom
    },

    scaleIconSize: function(score, max) {
        let scale = scalePow(1)
            .domain([0, max])
            .range([2, 4])
        
        return scale(score)
    },

    getCategoryMatch(categories) {
        const all_categories = Constants.place_categories.map(category => category.key)

        let matches = []
        /* TODO: use a combination of filter & map */
        categories.map(category => {
            if (all_categories.includes(category)) {
                matches.push(category)
            }
            return true
        })

        return matches
    },

    /* TODO: Only use primary vibe set colors on the second half of the heatmap */
    /* TODO: Get colors from vibemap-constants */
    getHeatmap(colors, vibe) {
        
        //let colors = color.map((color, i) => choroma(color).alpha(0.2))
        let heatmap = []
        
        let blue = '#008ae5'
        let gray = '#B1E2E5'
        let yellow = '#F8EE32'
        let pink = '#ED0A87'
        let teal = '#32BFBF'
        let white = '#FFFFFF'
        
        let light_blue = '#54CAF2'
        let light_green = '#9DE862'
        let light_teal = '#7DCAA5'     
        let light_pink = '#E479B0'
        let light_purple = '#BC94C4'
        let light_yellow = '#FFFCC5'
        let light_orange = '#FBCBBD'
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
            let color1 = chroma('#fafa6e')
            let color2 = chroma('#fafa6e')
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
    },

    normalize : function(val, min, max) {         
        return (val - min) / (max - min) * 10
    },

    // Adapted from https://gist.github.com/James1x0/8443042
    getTimeOfDay : function(time) {
	    var time_of_day = null; //return g
	
	    if(!time || !time.isValid()) { return; } //if we can't find a valid or filled moment, we return.
	
	    var split_afternoon = 12 // 24hr time to split the afternoon
	    var split_evening = 17 // 24hr time to split the evening
	    var currentHour = parseFloat(time.format("HH"));
	
        if(currentHour >= split_afternoon && currentHour <= split_evening) {
            time_of_day = "afternoon";
        } else if(currentHour >= split_evening) {
            time_of_day = "evening";
        } else {
            time_of_day = "morning";
        }
        
        return time_of_day;
    },

    // See if a time (default now) is with a places open hours
    isOpen: function(hours, time = dayjs()) {
        //console.log('isOpen (hours, day, time): ', hours, time.day(), time.hour())

        const day = time.day()
        const date = time.format('YYYY-MM-DD')
        const hour = time.hour()

        let dayFound = false
        let openEveryday = false

        if (hours) {
            dayFound = hours.find(({ day_of_week }) => day_of_week === day)
            openEveryday = hours.find(({ day_of_week }) => day_of_week === 8)
        }

        // If open everyday and no specific hours for current day
        if (openEveryday !== undefined && dayFound === undefined) dayFound = openEveryday

        if ( dayFound ) {            
           
            let opens = dayjs(date + ' ' + dayFound.opens)
            let closes = dayjs(date + ' ' + dayFound.closes)

            // Return if open and if it's a popular time
            const openNow = time.isBetween(opens, closes)
            const isPopular = (openNow && dayFound.name === "POPULAR")
            const hoursToday = opens.format('ha') + ' - ' + closes.format('ha')

            return { 'openNow': openNow, 'openToday': true, 'opens': opens, 'closes': closes,  'isPopular': isPopular }

        } else {
            return { 'openNow': false, 'openToday': false, 'isPopular': false }
        }
    },

    // Counts the number of matches between the two lists and return and integer
    matchLists: function(listA, listB ) {
        let matches = 0;
        
        if (listA.length > 0 && listB.length > 0) {
            matches = listA.filter((word) => { return listB.includes(word) }).length
        }

        return matches;
    },

    // Filters a list of objects
    // Similar to .filter method of array
    // TODO: argument for attribute to filter on.
    filterList: function(list, searchTerm, key = 'value') {
        // Generalize the Semantic UI search implementation 
        const re = new RegExp(escapeRegExp(searchTerm), 'i')

        const isMatch = (result) => re.test(result[key])

        const results = filter(list, isMatch)

        return results
    },

    // Fuzzy matching of strings
    fuzzyMatch: function(list, searchTerm, key) {
        let options = {
            includeScore: true,
            keys: ['value', 'name']
        }

        if (key) options.keys.push(key)
        
        const fuse = new Fuse(list, options)
        const results = fuse.search(searchTerm)

        const filter_results = results.filter(result => { 
            if (result.score < 0.3) return true
            return false
        }, [])

        const top_results = filter_results.map(result => result.item)

        return top_results
    },

    geocode: (address, location) => {
        return new Promise((resolve, reject) => {
            geocodeByAddress(address)
                .then(results => {
                    console.log('Geocoding results: ', results)

                    // TODO: This is probably not the right way to do this
                    let new_locations = results.map(address => {
                        if (address.formatted_address) {

                            return { key: address.place_id, id: address.place_id, text: address.formatted_address, centerpoint: [address.geometry.location.lat(), address.geometry.location.lng()], value: address.formatted_address }
                        } else {
                            return []
                        }
                    })

                    resolve(new_locations)
                })
        })

    },

    rankVibes: function(listA, listB) {
        let rankings = []

        rankings = listA.map((word) => {
            let score = 0
            
            if (listB.includes(word)) {
                score = listB.length - listB.indexOf(word)

            }
            
            return score
        })

        const average = rankings.reduce((a, b) => a + b, 0) / rankings.length

        return average
    },

    sortLocations: function(locations, currentLocation) {

        let current = point([currentLocation.longitude, currentLocation.latitude])
        // Sort the list of places based on closness to the users
        let sorted_locations = locations.sort((a, b) => {
            let point_a = point(a.centerpoint)
            let point_b = point(b.centerpoint)
            a.distance = distance(current, point_a)
            b.distance = distance(current, point_b)
            
            if (a.distance > b.distance) {
                return 1
            } else {
                return -1
            }
        
        })

        return sorted_locations
    },

    findPlaceCategoriess: function(categories) {
        
        let combined = []
        Constants.place_categories.map(function(category){

            let isMatch = function(name) {
                var found = categories.indexOf(name)
                if (found > -1) {                    
                    return true;
                }
            }

            // Matches the search?
            let top_match = isMatch(category.name)
            if (top_match){ combined.push(category.name) }

            if (category.hasOwnProperty('categories')) {
                category.categories.map(function(sub_category){
                    
                    let child_match = isMatch(sub_category.name)

                    if (top_match || child_match ) {
                        combined.push(sub_category.name)
                    }
                    
                    return null
                })
            }

            return true
        })

        return combined;
    },

    scaleMarker: function(score, min, max, zoom) {
        // TODO: Hack to catch empty/nan scores
        if (isNaN(score)) score = 3.5

        if (!min) { min = 0 }
        if (!max) { max = 100 }

        // Scale min and max marker size to zoom level
        let marker_scale = scalePow(1)
            .domain([8, 20]) // Zoom size
            .range([10, 30]) // Scale of marker size
        
        let base_marker = marker_scale(zoom)
        let max_marker = base_marker * 3

        let scale = scalePow(1)
            .domain([0, max])
            .range([base_marker, max_marker])
                
        let scaled_size = Math.round(scale(score))        

        return scaled_size
    },

    scaleDensityBonus: function(relative_density) {
        let inverted_scale = scalePow(1)
            .domain([0, 1])
            .range([Constants.HEATMAP_INTENSITY * 2, Constants.HEATMAP_INTENSITY])

        //console.log('heatmap: relative density, intensity: ', relative_density, inverted_scale(relative_density))

        return inverted_scale(relative_density)

    },

    scaleDensityArea: function(density, area) {
        let density_scale = scalePow(2)
            .domain([1, 60, 1000])
            .range([0, 0.8, 1])
        let relative_density = density_scale(density)


        return relative_density
    },

    scaleScore: function (score) {
        let scale = scalePow(1)
            .domain([0, 5])
            .range([60, 100])
        
        let percentage = Math.round(scale(score))

        return percentage
    },

    scaleSelectedMarker: function (zoom) {
        // TODO: Is this max right?         

        // Scale em size of svg marker to zoom level
        let scale = scalePow(1)
            .domain([8, 12, 20]) // Zoom size
            .range([0.1, 1.2, 4]) // Scale of marker size
    
        let scaled_size = Math.round(scale(zoom))

        return scaled_size
    },
    getMax: function(items, attribute) {
        let max = 0;
        items.forEach(item => {
            let value = item['properties'][attribute]
            if (value > max) { 
                max = value 
            }
        })

        return max
    },

    getMin: function (items, attribute) {
        let min = 100
        items.forEach(item => {
            let value = item['properties'][attribute]
            if (value < min) {
                min = value
            }
        })

        return min
    },

    /* global setTimeout, clearTimeout */
    /* eslint-disable consistent-this, func-names */
    debounce: function(func, delay) {
        let _this;
        let _arguments;
        let timeout;
        const executeNow = () => {
            timeout = null;
            return func.apply(_this, _arguments);

        };

        return function () {
            _this = this;
            _arguments = arguments;

            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(executeNow, delay);
        };
    },

    itemExists: function (name) {

        return new Promise((resolve, reject) => {
            Event.find({ name: name }).limit(1)
                .then((result) => {
                    if (result.length > 0) {
                        resolve(true);
                    } else {
                        resolve(false)
                    }
                })
        })

    },

    fireEvent: function(id, event) {
        
        if(document.getElementById(id) !== null) {
            let new_event = new Event(event, { bubbles: true, cancelable: false });

            document.getElementById(id).dispatchEvent(new_event);

            if (document.getElementById(id).fireEvent) {

                
                document.getElementById(id).fireEvent(event);
            } else {
                
                /*
                var evObj = document.createEvent('Events');
                evObj.initEvent(event, true, false);
                */
                let new_event = new Event(event, { bubbles: true, cancelable: false });
                
                document.getElementById(id).dispatchEvent(new_event);
            }
        }
    },

    toTitleCase: function(str) {
        if (typeof(str) == "string") {
            str = str.toLowerCase().split(' ');
            for (var i = 0; i < str.length; i++) {
                str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(' ');
        } else {
            return str
        }
        
    }
}

export default helpers;