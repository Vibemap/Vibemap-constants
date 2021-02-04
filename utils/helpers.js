import geoViewport from '@mapbox/geo-viewport'
import { scalePow } from 'd3-scale';
import * as turf from '@turf/turf';

import chroma from 'chroma-js'

import dayjs from 'dayjs';
import escapeRegExp from 'lodash.escaperegexp'
import filter from 'lodash.filter'
import Fuse from 'fuse.js'
import isBetween from 'dayjs/plugin/isBetween';
import url from 'url';

import * as style_variables from '../design-system/build/json/variables.json';

const constants = require('../dist/constants.js');

dayjs.extend(isBetween);

// Filters a list of objects
// Similar to .filter method of array
// TODO: argument for attribute to filter on.
export const filterList = (list, searchTerm, key = 'value') => {
  // Generalize the Semantic UI search implementation 
  const re = new RegExp(escapeRegExp(searchTerm), 'i')

  const isMatch = (result) => re.test(result[key])

  const results = filter(list, isMatch)

  return results
}

export const findPlaceCategories = (categories) => {
        
  let combined = []
  
  constants.place_categories.map(function(category){

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
}

// Fuzzy matching of strings
export const fuzzyMatch = (list, searchTerm, key) => {
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
}



// Counts the number of matches between the two lists and return and integer
export const matchLists = (listA, listB) => {
    let matches = 0;
  
    if (listA.length > 0 && listB.length > 0) {
      matches = listA.filter((word) => { return listB.includes(word) }).length;
    }
  
    return matches;
};

export const rankVibes = (listA, listB) => {
    let rankings = [];
  
    rankings = listA.map((word) => {
      let score = 0;
  
      if (listB.includes(word)) {
        score = listB.length - listB.indexOf(word);
      }
  
      return score;
    });
  
    const average = rankings.reduce((a, b) => a + b, 0) / rankings.length;
  
    return average;
}

export const isClosedToday = (dailyHours) => {
    return (dailyHours.opens === "00:00:00" && dailyHours.closes === "00:00:00")
}

export const displayHours = (hours, dayFormat='dd') => {

    let openHours = isOpen(hours)
    let hasHours = false

    const weeklyHours = hours.find(({ day_of_week }) => day_of_week === 8)

    if (openHours.openEveryday) {
        let times = []
        const time = dayjs(openHours.opens).format('ha') + 
            '-' + 
            dayjs(openHours.closes).format('ha')
        times.push(time)
        
        let popularFound = hours.find(day => (day.name == 'POPULAR'))
        console.log('Popular at: ', popularFound)

        return times
    }

    let i = 0
    let orderedHours = []

    // Check every day of the week. 
    while (i < 7) {
        // Get Label

        let dayFound = hours.find(day => day.day_of_week == i)
        let popularFound = hours.find(day => (day.day_of_week == i && day.name == 'POPULAR'))
        
        // TODO: Handle popular vs normal
        console.log('Found day and popular times: ', dayFound, popularFound)

        let isClosed = false

        if (dayFound !== undefined) {
            isClosed =isClosedToday(dayFound)

            // We have some hours for the place
            if (!isClosed) hasHours = true
            //console.log('Day has hours: ', i, dayFound, popularFound, hasHours)

        }

        // If found and not closed
        if (dayFound === undefined || isClosed) {
            //const displayHours = helpers.displayHours(dayFound)
            // Will with daily hours if available
            if (!isClosed && weeklyHours !== undefined) {
                // Set for current day
                let time = Object.assign({}, weeklyHours)
                time.day_of_week = i
                orderedHours.push(time)
            // Include closed days as closed
            } else {
                orderedHours.push({ day_of_week: i, closed: true})
            }
        } else {        
            dayFound.closed = false
            orderedHours.push(dayFound)            
        }
        i++
    }

    // TODO: Add patterns for nicer formating.
    // TODO: Handle localization and React templates
    let formattedHours = orderedHours.map(dailyHours => {
        //console.log('formattedHours for: ', dailyHours)
        // Shift days by 1; Monday = 1; Sunday = 0
        const day = (dailyHours.day_of_week + 1) % 7

        if (dailyHours.closed === true) {        
            return dayjs().day(day).format(dayFormat) + ' ' + 'Closed'
        } else {
            const opens = dailyHours.opens.split(":")
            const closes = dailyHours.closes.split(":")
    
            const time = dayjs().day(day).format(dayFormat) + 
                ': ' + 
                dayjs().hour(opens[0]).minute(opens[1]).format('ha') + 
                '-' + 
                dayjs().hour(closes[0]).minute(closes[1]).format('ha')
        
            return time 
        }

    })

    return formattedHours
}

export const isOpen = (hours, time = dayjs()) => {
    const day = time.day();
    const date = time.format('YYYY-MM-DD');
    const hour = time.hour();
  
    if (!hours) return { openNow: false, openToday: false, isPopular: false };
  
    let dayFound = hours.find(({ day_of_week }) => day_of_week === day);

    // TODO: not true if it's closed one day
    const hasDailyHours = hours.find(({ day_of_week }) => day_of_week === 8)

    const daysClosed = hours.filter(day => isClosedToday(day))

    const openEveryday = (hasDailyHours !== undefined && daysClosed.length == 0);
    
    // If open everyday and no specific hours for current day
    if (openEveryday !== undefined && dayFound === undefined) {
        dayFound = hasDailyHours;
    }
  
    if (dayFound) {
  
      const opens = dayjs(date + ' ' + dayFound.opens);
      const closes = dayjs(date + ' ' + dayFound.closes);
  
      // Return if open and if it's a popular time
      const openNow = time.isBetween(opens, closes);
      const isPopular = (openNow && dayFound.name === 'POPULAR');
      const hoursToday = opens.format('ha') + ' - ' + closes.format('ha');
  
      return { openNow: openNow, openToday: true, openEveryday: openEveryday, opens: opens, closes: closes, isPopular: isPopular };
  
    } else {
      return { openNow: false, openToday: false, openEveryday: false, isPopular: false };
    }
}

// Returns area for a boundary in miles
export const getArea = (bounds) => {
        
  //let bounds = geoViewport.bounds([location.longitude, location.latitude], zoom, [window.width, window.height])
  let height = turf.distance(
      [bounds[0], bounds[1]], // Southwest
      [bounds[0], bounds[3]], // Northwest
      { units: 'miles' }
  )

  let width = turf.distance(
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

// Return all matching Vibemap categories
export const getCategoryMatch = (categories) => {
  const all_categories = constants.place_categories.map(category => category.key)

  let matches = []
  /* TODO: use a combination of filter & map */
  categories.map(category => {
      if (all_categories.includes(category)) {
          matches.push(category)
      }
      return true
  })

  return matches
}

export const getDistance = (point_a, point_b) => {

  let new_distance = turf.distance(
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
  
  const latitudinal_distance = turf.distance([left, bottom],[right, bottom], options)

  let pixel_ratio = latitudinal_distance / window.width

  return pixel_ratio

}

export const getFeaturesInBounds = (features, bounds) => {

  const collection = turf.featureCollection(features)

  //const box = bbox(lineString(bounds))

  const polygon = turf.bboxPolygon(bounds.flat());

  const pointsInBounds = turf.pointsWithinPolygon(collection, polygon)

  // TODO: Will it be faster to keep features in a collection and use the turf each method? 
  return pointsInBounds.features;

}

// Parse all variety of social links and return a consistent, valid url
export const getFullLink = (link, type='instagram') => {

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
}


// Return heatmap colors by vibe
/* TODO: Only use primary vibe set colors on the second half of the heatmap */
/* TODO: Get colors from vibemap-constants */
export const getHeatmap = (colors, vibe) => {
    
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
  
  let diameter = turf.distance(
      [bounds[0], bounds[1]],
      [bounds[2], bounds[3]],
      { units: 'miles'}
  )

  let new_distance = diameter / 2

  return new_distance

}

export const getMax = (items, attribute) => {
  let max = 0;
  items.forEach(item => {
      let value = item['properties'][attribute]
      if (value > max) { 
          max = value 
      }
  })

  return max
}

export const getMin = (items, attribute) => {
  let min = 100
  items.forEach(item => {
      let value = item['properties'][attribute]
      if (value < min) {
          min = value
      }
  })

  return min
}

// Adapted from https://gist.github.com/James1x0/8443042
export const getTimeOfDay = (time) => {
  var time_of_day = null; //return g

  //if we can't find a valid or filled moment, we return.
  if(!time || !time.isValid()) { return; } 

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
}

export const getVibeStyle = (vibe) => {

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
}

export const normalize = (val, min, max) => {
    return (val - min) / (max - min) * 10;
};

export const scaleIconSize = (score, max) => {

    const scale = scalePow(1)
      .domain([0, max])
      .range([1, 5]);
  
    return scale(score);
}

export const scaleMarker = (score, min = 0, max = 100, zoom) => {
  // TODO: Hack to catch empty/nan scores
  if (isNaN(score)) score = 3.5

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
}

// Maps the relative density of place to a known range for Vibemap's cities
export const scaleDensityArea = (density, area) => {
  // TODO: Make these contants? 
  let density_scale = scalePow(2)
      .domain([1, 60, 1000])
      .range([0, 0.8, 1])

  let relative_density = density_scale(density)

  return relative_density
}

export const scaleDensityBonus = (relative_density) => {
  let inverted_scale = scalePow(1)
      .domain([0, 1])
      .range([constants.HEATMAP_INTENSITY * 2, constants.HEATMAP_INTENSITY])

  return inverted_scale(relative_density)

}

export const scaleScore = (score) => {
  let scale = scalePow(1)
      .domain([0, 5])
      .range([60, 100])
  
  let percentage = Math.round(scale(score))

  return percentage
}

export const scaleSelectedMarker = (zoom) => {
  
  // Scale em size of svg marker to zoom level
  let scale = scalePow(1)
      .domain([8, 12, 20]) // Zoom size
      .range([0.1, 1.2, 4]) // Scale of marker size

  let scaled_size = Math.round(scale(zoom))

  return scaled_size
}

export const scorePlaces = (places, centerPoint, vibes, scoreBy = ['vibes', 'distance'], ordering) => {
    
  // Default max values; These will get set by the max in each field
  let maxScores = {}
  scoreBy.map((field) => maxScores[field] = 1)

  // Bonuses between 1 and 10
  const vibeMatchBonus = 10
  const vibeRankBonus = 5
  const offerBonus = 5
  const openBonus = 2.5
  const popularBonus = 5
  const categoryBonus = 5

  // Weight distance & rating different than other fields
  let weights = { 
      category: 0.6,
      vibe: 0.8, 
      distance: 0.2, 
      rating: 0.6, 
      hours: 0.4, 
      offers: 0.6 
  }

  // If there are vibes, weight that the strongest by 3x
  //if (vibes.length > 0 && ordering === 'relevance') weights.vibe = 2 
  // Do the same for other sorting preferences
  if (ordering !== 'relevance') weights[ordering] = 3

  // Get scores and max in each category
  const placesScored = places.map((place) => {

      let fields = place.properties

      if (scoreBy.includes('vibes')) {
          // Give place a vibe score
          let [vibeMatches, averageRank, vibeBonus] = [0, 0, 0]

          fields.vibes_score = 0
          // TODO: TEMP until events return vibes
          if (fields.vibes === undefined) fields.vibes = ['chill']
          if (fields.vibes.length > 0) fields.vibes_score = fields.vibes.length

          // Don't show markers without photos; this will analyze the vibe and quality of the image
          if (fields.images && fields.images.length > 0) vibeBonus += vibeMatchBonus
          
          // Give direct vibe matches bonus points
          if (vibes.length > 0 && fields.vibes) {
              vibeMatches = matchLists(vibes, fields.vibes)
              averageRank = rankVibes(vibes, fields.vibes)

              vibeBonus = vibeMatches * vibeMatchBonus + averageRank * vibeRankBonus
              fields.vibes_score += vibeBonus
          }

          // Set max vibe score
          if (fields.vibes_score > maxScores.vibes) {
              maxScores.vibes = fields.vibes_score
          } 
      }

      if (scoreBy.includes('categories')) {
          let [categoryMatches, averageRank, vibeBonus] = [0, 0, 0]
          
          fields.categories_score = 0

          // Merge and remove duplicates
          const concatCategories = fields.categories.concat(fields.subcategories)
          const allCategories = concatCategories.filter((item, index) => concatCategories.indexOf(item) == index)

          if (fields.categories.length > 0) fields.categories_score = fields.categories.length                
          //console.log('Base category score: ', fields.categories_score, allCategories)
          
          // Give matching categories for the vibe a bonus
          if (vibes.length > 0) {            
              // Get vibes for the place category
              let categoryVibes = []
              allCategories.forEach(category => {
                  //console.log('Category: ', fields.name, category)
                  // TODO: There probably a cleaner way to search for both categories and subcategories
                  const foundCategories = constants.place_sub_categories.filter(o => o.main_category.includes(category))
                  const foundSubcategories = constants.place_sub_categories.filter(o => o.name.includes(category))

                  if (foundCategories.length > 0) {
                      categoryVibes = categoryVibes.concat(foundCategories[0].vibes)
                  }

                  if (foundSubcategories.length > 0) {
                      categoryVibes = categoryVibes.concat(foundSubcategories[0].vibes)
                  }
                                  
              })

              categoryMatches = matchLists(vibes, categoryVibes)
              const bonus = categoryMatches * vibeMatchBonus
              fields.categories_score += bonus                    
          }

          if (fields.categories_score > maxScores['categories']) {
              maxScores['categories'] = fields.categories_score
          }
      }

      if (scoreBy.includes('likes')) {
          // Set max aggregate score
          if (fields.likes > maxScores['likes']) {
              maxScores['likes'] = fields.likes
          }
      }

      if (scoreBy.includes('distance')) {
          const placePoint = turf.point(place.geometry.coordinates)
          fields['distance'] = turf.distance(centerPoint, placePoint)
          // Set max distance
          if (fields['distance'] > maxScores['distance']) {
              maxScores['distance'] = fields['distance']
          }
      }

      if (scoreBy.includes('aggregate_rating')) {
          // Set max aggregate score
          if (fields.aggregate_rating > maxScores['aggregate_rating']) {
              maxScores['aggregate_rating'] = fields.aggregate_rating
          }
      }

      /* TODO: WIP concept for popular times and hours */
      //console.log('Score place on these fields: ', fields.offers, fields.opening_hours)
      fields.offers_score = 0
      fields.hours_score = 0

      if (scoreBy.includes('offers')) {
          if (fields.offers && fields.offers.length > 0) {

              fields.offers_score = offerBonus

              //let currentTime = dayjs()
              /* TODO: Add or subract and hour from popular times and compare */
              // console.log('score with currentTime (day, hour): ', currentTime.day(), currentTime.hour())
          }

          let { openNow, openToday, opens, closes, isPopular} = isOpen(fields.opening_hours)

          // Store in place details
          fields.open_now = openNow
          fields.popular_now = isPopular
          fields.opens = opens
          fields.closes = closes

          // Give bonus if open now
          if (openToday) fields.hours_score += openBonus
          if (openNow) fields.hours_score += openBonus
          if (isPopular) fields.hours_score += popularBonus
          
      }

      place.properties = fields
      return place
  })

  let maxAverageScore = 0

  // Normalize each place by the top scores across all results
  let placesScoredAveraged = placesScored.map((place) => {
      let fields = place.properties

      // TODO: This could be more steamlined automatically for each key in scoreBy
      if (scoreBy.includes('vibes')) {
          fields.vibes_score = normalize(fields.vibes_score, 0, maxScores['vibes'])
          fields.vibes_score = fields.vibes_score * weights['vibe']
          //console.log('fields.vibes_score: ', fields.name, fields.vibes_score)
      }
      
      if (scoreBy.includes('categories')) {
          fields.categories_score = normalize(fields.categories_score, 0, maxScores['categories'])
          fields.categories_score = fields.categories_score * weights['category']
          //console.log('fields.categories_score: ', fields.name, fields.categories_score)
      }

      if (scoreBy.includes('likes')) fields.likes_score = normalize(fields.likes, 0, maxScores['likes'])

      // Get average rating and scale it by a factor
      if (scoreBy.includes('aggregate_rating')) {
          fields.aggregate_rating_score = normalize(fields.aggregate_rating, 2, maxScores['aggregate_rating'])
          fields.aggregate_rating_score *= weights.rating
      } 
      
      // Distance is inverted from max and then normalize 1-10
      if (scoreBy.includes('distance')) {
          let maxDistance = maxScores['distance']
          fields.distance_score = normalize(maxDistance - fields.distance, 0, maxDistance)

          fields.distance_score *= weights.distance
      }

      if (scoreBy.includes('hours')) {
          fields.hours_score *= weights.hours
      }

      const reasons = scoreBy        
      const scores = scoreBy.map((field) => fields[field + '_score'])            
      
      const largestIndex = scores.indexOf(Math.max.apply(null, scores))
      
      // Take an average of each of the scores
      fields.average_score = scores.reduce((a, b) => a + b, 0) / scores.length

      // Update the top average score
      if (fields.average_score > maxAverageScore) maxAverageScore = fields.average_score
      // Add a reason code
      fields.reason = reasons[largestIndex]
    
      place.properties = fields
      return place
  })

  // Re-sort by average score 
  const placesScoredAndSorted = placesScoredAveraged.sort((a, b) => b.properties.average_score - a.properties.average_score)

  // Normalize the scores between 1 & 5
  const placesSortedAndNormalized = placesScoredAndSorted.map((place) => {
      let fields = place.properties

      // Create a scaled icon
      fields.average_score = normalize(fields.average_score, 0, maxAverageScore) / 2

      // Scale the icon size based on score
      fields.icon_size = scaleIconSize(fields.average_score, 10)

      return place
  })

  /* TODO: for debugging only 
  placesScoredAndSorted.map((place) => {
      console.log(place.properties.name)
      console.log(' - vibes_score: ', place.properties.vibes_score)
      console.log(' - aggregate rating: ', place.properties.aggregate_rating_score)
      console.log(' - distance: ', place.properties.distance_score)
      console.log(' - reason: ', place.properties.reason)
  })
  */

  return placesSortedAndNormalized
}

export const sortLocations = (locations, currentLocation) => {

  let current = turf.point([currentLocation.longitude, currentLocation.latitude])
  
  // Sort the list of places based on closness to the users
  let sorted_locations = locations.sort((a, b) => {
      let point_a = turf.point(a.centerpoint)
      let point_b = turf.point(b.centerpoint)
      a.distance = turf.distance(current, point_a)
      b.distance = turf.distance(current, point_b)
      
      if (a.distance > b.distance) {
          return 1
      } else {
          return -1
      }
  
  })

  return sorted_locations
}

export const toTitleCase = (str) => {
    
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

export const zoomToRadius = (zoom) => {
        
  // Scale and interpolate radius to zoom siz
  let zoom_to_radius_scale = scalePow(1)
    .domain([8,  12, 13, 14, 16, 18]) // Zoom size
    .range([ 40, 7,  3,  3.5, 1.5,  0.8]) // Scale of search radius

  let new_zoom = zoom_to_radius_scale(zoom)
  
  return new_zoom
}