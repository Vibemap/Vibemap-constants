import {scalePow} from 'd3-scale'

import * as turf from '@turf/helpers'
const turf_distance = require('@turf/distance').default

import Axios from "axios"
import dayjs from 'dayjs'
import escapeRegExp from 'lodash.escaperegexp'
import filter from 'lodash.filter'
import Fuse from 'fuse.js'
import isBetween from 'dayjs/plugin/isBetween'
import truncate from 'truncate'

import url from 'url'
import querystring from 'querystring'

const constants = require('../dist/constants.js')
const allCategories = require('../dist/categories.json')


// Move these to their own pattern,
// Imported here for backwards compatibility
import * as map from './map.js'
export const getArea = map.getArea
export const getBounds = map.getBounds
export const getDistance = map.getDistance
export const getDistanceToPixels = map.getDistanceToPixels
export const getFeaturesInBounds = map.getFeaturesInBounds
export const getHeatmap = map.getHeatmap
export const getPosition = map.getPosition
export const getRadius = map.getRadius
export const zoomToRadius = map.zoomToRadius

// Same for these vibe utils
import * as vibes from './vibes.js'
export const getVibeStyle = vibes.getVibeStyle

dayjs.extend(isBetween)

const ApiUrl = 'https://api.vibemap.com/v0.3/'

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

  constants.place_categories.map(function (category) {
    let isMatch = function (name) {
      var found = categories.indexOf(name)
      if (found > -1) {
        return true
      }
    }

    // Matches the search?
    let top_match = isMatch(category.name)
    if (top_match) {
      combined.push(category.name)
    }

    if (category.hasOwnProperty('categories')) {
      category.categories.map(function (sub_category) {
        let child_match = isMatch(sub_category.name)

        if (top_match || child_match) {
          combined.push(sub_category.name)
        }

        return null
      })
    }

    return true
  })

  return combined
}

export const getRandomItem = (list) => {
  // Get random index value
  const randomIndex = Math.floor(Math.random() * list.length)

  // Get random item
  const item = list[randomIndex]

  return item
}

// TODO: Option to encode / decode
export const encodeCardIndex = (row, column) => {
  // Encode row / column into a decimal for sorting.
  const index = row + column / 10

  return index
}

// Fuzzy matching of strings
export const fuzzyMatch = (list, searchTerm, key) => {
  let options = {
    includeScore: true,
    keys: ['value', 'name'],
  }

  if (key) options.keys.push(key)

  const fuse = new Fuse(list, options)
  const results = fuse.search(searchTerm)

  const filter_results = results.filter((result) => {
    if (result.score < 0.3) return true
    return false
  }, [])

  const top_results = filter_results.map((result) => result.item)

  return top_results
}

// Counts the number of matches between the two lists and return and integer
export const matchLists = (listA, listB) => {
  let matches = 0

  if (listA.length > 0 && listB.length > 0) {
    matches = listA.filter((word) => {
      return listB.includes(word)
    }).length
  }

  return matches
}

export const rankVibes = (listA, listB) => {
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
}

export const sortByKey = (a, b) => {
  console.log('sortByKey (a, b)', a, b)
  return a
}

export const isClosedToday = (dailyHours) => {
  return dailyHours.opens === '00:00:00' && dailyHours.closes === '00:00:00'
}

export const displayHours = (hours, dayFormat = 'dd') => {
  let openHours = isOpen(hours)
  let hasHours = false

  const weeklyHours = hours.find(({day_of_week}) => day_of_week === 8)

  if (openHours.openEveryday) {
    let times = []
    const time =
      dayjs(openHours.opens).format('ha') +
      '-' +
      dayjs(openHours.closes).format('ha')
    times.push(time)

    let popularFound = hours.find((day) => day.name == 'POPULAR')
    console.log('Popular at: ', popularFound)

    return times
  }

  let i = 0
  let orderedHours = []

  // Check every day of the week.
  while (i < 7) {
    // Get Label

    let dayFound = hours.find((day) => day.day_of_week == i)
    let popularFound = hours.find(
      (day) => day.day_of_week == i && day.name == 'POPULAR'
    )

    // TODO: Handle popular vs normal
    //console.log('Found day and popular times: ', dayFound, popularFound)

    let isClosed = false

    if (dayFound !== undefined) {
      isClosed = isClosedToday(dayFound)

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
        orderedHours.push({day_of_week: i, closed: true})
      }
    } else {
      dayFound.closed = false
      orderedHours.push(dayFound)
    }
    i++
  }

  // TODO: Add patterns for nicer formating.
  // TODO: Handle localization and React templates
  let formattedHours = orderedHours.map((dailyHours) => {
    //console.log('formattedHours for: ', dailyHours)
    // Shift days by 1; Monday = 1; Sunday = 0
    const day = (dailyHours.day_of_week + 1) % 7

    if (dailyHours.closed === true) {
      return dayjs().day(day).format(dayFormat) + ' ' + 'Closed'
    } else {
      const opens = dailyHours.opens.split(':')
      const closes = dailyHours.closes.split(':')

      const time =
        dayjs().day(day).format(dayFormat) +
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
  const day = time.day()
  const date = time.format('YYYY-MM-DD')
  const hour = time.hour()

  if (!hours) return {openNow: false, openToday: false, isPopular: false}

  let dayFound = hours.find(({day_of_week}) => day_of_week === day)

  // TODO: not true if it's closed one day
  const hasDailyHours = hours.find(({day_of_week}) => day_of_week === 8)

  const daysClosed = hours.filter((day) => isClosedToday(day))

  const openEveryday = hasDailyHours !== undefined && daysClosed.length == 0

  // If open everyday and no specific hours for current day
  if (openEveryday !== undefined && dayFound === undefined) {
    dayFound = hasDailyHours
  }

  if (dayFound) {
    const opens = dayjs(date + ' ' + dayFound.opens)
    const closes = dayjs(date + ' ' + dayFound.closes)

    // Return if open and if it's a popular time
    const openNow = time.isBetween(opens, closes)
    const isPopular = openNow && dayFound.name === 'POPULAR'
    const hoursToday = opens.format('ha') + ' - ' + closes.format('ha')

    return {
      openNow: openNow,
      openToday: true,
      openEveryday: openEveryday,
      opens: opens,
      closes: closes,
      isPopular: isPopular,
    }
  } else {
    return {
      openNow: false,
      openToday: false,
      openEveryday: false,
      isPopular: false,
    }
  }
}

export const getAPIParams = (options, per_page = 50) => {
  let {activity, distance} = options
  let params = Object.assign({}, options)

  let distanceInMeters = 1
  if (distance > 0)
    distanceInMeters = Math.round(distance * constants.METERS_PER_MILE)

  // API currently doesn't support other options
  // However, the sorting algorithm, will use them
  params['ordering'] = '-aggregate_rating'

  // TODO: Load more points at greater distances?
  params['per_page'] = per_page

  // Rename args
  if (activity !== 'all' && activity !== null) params['category'] = activity
  params['dist'] = distanceInMeters
  delete params['activity']
  delete params['distance']
  delete params['bounds']
  //console.log('distanceInMeters', distanceInMeters, params['dist'])

  return params
}

// Return all matching Vibemap categories
export const getCategoryMatch = (categories) => {
  const all_categories = constants.place_categories.map(
    (category) => category.key
  )

  let matches = []
  /* TODO: use a combination of filter & map */
  categories.map((category) => {
    if (all_categories.includes(category)) {
      matches.push(category)
    }
    return true
  })

  return matches
}

// Parse all variety of social links and return a consistent, valid url
export const getFullLink = (link, type = 'instagram') => {
  const domains = {
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
    facebook: 'https://facebook.com/',
  }

  // Handle things that aren't valid string handles
  // TODO: add unit tests for link = null; link = '' and other cases
  if (link === null || link === '') return null

  const parse_url = url.parse(link)
  // Only the path handle
  const path = parse_url.path.replace('/', '')

  // Combine domain and handle
  const full_link = domains[type] + path

  return full_link
}

export const getMax = (items, attribute) => {
  let max = 0
  items.forEach((item) => {
    let value = item['properties'][attribute]
    if (value > max) {
      max = value
    }
  })

  return max
}

export const getMin = (items, attribute) => {
  let min = 100
  items.forEach((item) => {
    let value = item['properties'][attribute]
    if (value < min) {
      min = value
    }
  })

  return min
}

// Adapted from https://gist.github.com/James1x0/8443042
export const getTimeOfDay = (time) => {
  var time_of_day = null //return g

  //if we can't find a valid or filled moment, we return.
  if (!time || !time.isValid()) {
    return
  }

  var split_afternoon = 12 // 24hr time to split the afternoon
  var split_evening = 17 // 24hr time to split the evening
  var currentHour = parseFloat(time.format('HH'))

  if (currentHour >= split_afternoon && currentHour <= split_evening) {
    time_of_day = 'afternoon'
  } else if (currentHour >= split_evening) {
    time_of_day = 'evening'
  } else {
    time_of_day = 'morning'
  }

  return time_of_day
}

export const getTopVibes = (places) => {
  let top_vibes = {}

  places.map((place) => {
    place.properties.vibes.map((vibe) => {
      if (top_vibes.hasOwnProperty(vibe)) {
        top_vibes[vibe] += 1
      } else {
        top_vibes[vibe] = 1
      }
      return null
    })
    return null
  })

  var sortable = []
  for (var vibe in top_vibes) {
    sortable.push([vibe, top_vibes[vibe]])
  }

  let top_vibes_sorted = sortable.sort(function (a, b) {
    return b[1] - a[1]
  })

  return top_vibes_sorted
}

export const getWaveFromVibe = (vibe) => {
  switch (vibe) {
    case 'buzzing':
      return 'high'
    default:
      return 'medium'
  }

  //console.log('Get wave level for vibe: ', vibe, waveLevel)

  return waveLevel
}

export const normalize = (val, min, max) => {
  return ((val - min) / (max - min)) * 10
}

export const scaleIconSize = (score, max) => {
  const scale = scalePow(1).domain([0, max]).range([1, 5])

  return scale(score)
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

  let scale = scalePow(1).domain([0, max]).range([base_marker, max_marker])

  let scaled_size = Math.round(scale(score))

  return scaled_size
}

// Maps the relative density of place to a known range for Vibemap's cities
export const scaleDensityArea = (density, area) => {
  // TODO: Make these contants?
  let density_scale = scalePow(2).domain([1, 60, 1000]).range([0, 0.8, 1])

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
  let scale = scalePow(1).domain([0, 5]).range([60, 100])

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

export const fetchPlacesDetails = async (id, type = 'place') => {
  const source = Axios.CancelToken.source()
  let apiEndpoint
  let category = ""

  if (type == "event") {
    apiEndpoint = `${ApiUrl}events/`
    category = `Event`
  }

  if (type == "place") {
    apiEndpoint = `${ApiUrl}places/`
    category = `Place`
  }

  if (apiEndpoint) {
    const response = await Axios.get(`${apiEndpoint}${id}`, {
      cancelToken: source.token,
    }).catch(function (error) {
      // handle error
      console.log('Axios error ', error);
      return null
    })

    let subcategory = category

    return response
  }
}

export const fetchPlacePicks = (
  options = {
    distance: 5,
    point: '-123.1058197,49.2801149',
    ordering: 'vibe',
    vibes: ['chill'],
  }
) => {
  let {
    activity,
    bounds,
    days,
    distance,
    ordering,
    point,
    search,
    time,
    vibes,
  } = options

  let distanceInMeters = 1
  if (distance > 0) distanceInMeters = distance * constants.METERS_PER_MILE
  if (activity === 'all') activity = null
  const scoreBy = ['aggregate_rating', 'vibes', 'distance', 'offers', 'hours']

  return new Promise(function (resolve, reject) {
    const params = getAPIParams(options, 250)

    let centerPoint = point.split(',').map((value) => parseFloat(value))
    let query = querystring.stringify(params)

    fetch(ApiUrl + 'places/?' + query)
      .then((data) => data.json())
      .then(
        (res) => {
          //clearTimeout(timeout);
          const count = res.count

          //console.log('getPicks got this many places: ', count)

          let places = formatPlaces(res.results.features)

          let placesScoredAndSorted = scorePlaces(
            places,
            centerPoint,
            vibes,
            scoreBy,
            ordering
          )
          // TODO: clustering could happen before and after identification of picks; for now just do it after
          //let clustered = module.exports.clusterPlaces(placesScoredAndSorted, 0.2)

          let top_vibes = getTopVibes(places)

          resolve({
            data: placesScoredAndSorted,
            count: count,
            top_vibes: top_vibes,
            loading: false,
            timedOut: false,
          })
        },
        (error) => {
          console.log(error)
        }
      )
  })
}

// Handle fields from the tile server
export const decodePlaces = (places) => {
  const decoded = places.map((feature) => {
    //console.log('feature: ', feature)
    feature.properties.vibes = JSON.parse(feature.properties.vibes)
    feature.properties.subcategories = JSON.parse(
      feature.properties.subcategories
    )
    feature.properties.categories = JSON.parse(feature.properties.categories)
    feature.properties.vibemap_images = []
    feature.properties.images = [feature.properties.thumbnail_url]
    if (feature.properties.opening_hours != undefined)
      feature.properties.opening_hours = JSON.parse(
        feature.properties.opening_hours
      )
    delete feature.properties.tips
    //delete feature.properties.subcategories
    delete feature.properties.facebook
    delete feature.properties.telephone
    delete feature.properties.website

    return feature
  })

  return decoded
}

// Do some post-parsing clean up to the data
// TODO: API Update for Places
export const formatPlaces = (places) => {
  const categories = allCategories.categories.map(category => Object.keys(category)[0])

  const formatted = places.map((place) => {
    let fields = place.properties

    // Add fields for presentation
    fields.place_type = 'places'
    fields.short_name = truncate(fields.name, constants.TRUCATE_LENGTH)
    fields.aggregate_rating = parseFloat(fields.aggregate_rating)

    fields.sub_categories = fields.sub_categories
    fields.top_vibe = null

    const matchingCategories = fields.categories.filter(category => categories.includes(category.toLowerCase()))

    if (fields.categories === undefined ||
        fields.categories.length === 0 ||
        matchingCategories.length === 0) {
          fields.categories = ['missing']
    }

    fields.icon = matchingCategories[0]
    fields.cluster = null

    place.properties = fields
    return place
  })
  return formatted
}

export const vibesFromPlaces = (places) => {
  const vibes = []
  // TODO: get frequency of vibes from a set of places
  return vibes
}

export const getRecommendedVibes = (vibes) => {
  const recommended = []
  // Find related and recommended vibes for the given set.
  return recommended
}

export const scorePlaces = (
  places,
  centerPoint,
  vibes = [],
  scoreBy = ['vibes', 'distance'],
  ordering
) => {
  //console.log('scorePlaces: ', places, ordering, scoreBy)

  // Default max values; These will get set by the max in each field
  let maxScores = {}
  scoreBy.map((field) => (maxScores[field] = 1))

  // Bonuses between 1 and 10
  const vibeMatchBonus = 5

  // TODO: If ordered by vibe, rank matches very high
  const vibeRankBonus = ordering == 'vibe' ? 20 : 10

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
    offers: 0.6,
  }

  // If there are vibes, weigh the strongest by 3x
  // if (vibes.length > 0 && ordering === 'relevance') weights.vibe = 2
  // Do the same for other sorting preferences
  if (ordering !== 'relevance') weights[ordering] = 3

  // Get scores and max in each category
  const placesScored = places.map((place) => {
    let fields = place.properties

    // Give place a vibe score
    // TODO: Calculate `vibe_score` on backend with stored procedure.
    // TODO: Make a separate, modular method
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
      if (vibes && vibes.length > 0 && fields.vibes) {
        vibeMatches = matchLists(vibes, fields.vibes)
        averageRank = rankVibes(vibes, fields.vibes)

        // Bonus for exact matches + all place vibes
        vibeBonus = vibeMatches * vibeRankBonus + averageRank * vibeRankBonus
        fields.vibes_score += vibeBonus
      }

      // Set max vibe score
      if (fields.vibes_score > maxScores.vibes) {
        maxScores.vibes = fields.vibes_score
      }

      /*
          console.log('Scoring weights: ', weights, ordering, vibeRankBonus)
          console.log('For these vibes: ', fields.vibes)
          console.log('Vibe score, bonus: ', fields.vibes_score, vibeBonus)
          console.log('Vibe score: ', vibeMatches, averageRank, vibeBonus)
          */
    }

    // Get scores and max in each category
    // TODO: Make a separate, modular method
    if (scoreBy.includes('categories')) {
      let [categoryMatches, averageRank, vibeBonus] = [0, 0, 0]

      fields.categories_score = 0

      // Merge and remove duplicates
      const concatCategories = fields.categories.concat(fields.subcategories)
      const allCategories = concatCategories.filter(
        (item, index) => concatCategories.indexOf(item) == index
      )

      if (fields.categories.length > 0)
        fields.categories_score = fields.categories.length
      //console.log('Base category score: ', fields.categories_score, allCategories)

      // Give matching categories for the vibe a bonus
      if (vibes.length > 0) {
        // Get vibes for the place category
        let categoryVibes = []
        allCategories.forEach((category) => {
          //console.log('Category: ', fields.name, category)
          // TODO: There probably a cleaner way to search for both categories and subcategories
          const foundCategories = constants.place_sub_categories.filter((o) =>
            o.main_category.includes(category)
          )
          const foundSubcategories = constants.place_sub_categories.filter(
            (o) => o.name.includes(category)
          )

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

    // Add score for the number of likes or RSVPs for events
    if (scoreBy.includes('likes')) {
      // Set max aggregate score
      if (fields.likes > maxScores['likes']) {
        maxScores['likes'] = fields.likes
      }
    }

    // Add score for distance from user
    if (scoreBy.includes('distance')) {
      // TODO: Make a util in map.js
      const placePoint = turf.point(place.geometry.coordinates)
      fields['distance'] = turf_distance(centerPoint, placePoint)
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

    // TODO: WIP concept for popular times and hours
    // TODO: Move to backend or make a separate, modular method
    //console.log('Score place on these fields: ', fields.offers, fields.opening_hours)
    fields.offers_score = 0
    fields.hours_score = 0

    // Give bonus if place has offers or is open
    if (scoreBy.includes('offers')) {
      if (fields.offers && fields.offers.length > 0) {
        fields.offers_score = offerBonus
      }

      let {openNow, openToday, opens, closes, isPopular} = isOpen(
        fields.opening_hours
      )

      // Store in place details
      // TODO: Make sure these field name match the upgraded API
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

  // Now normalize all the scores
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
      fields.categories_score = normalize(
        fields.categories_score,
        0,
        maxScores['categories']
      )
      fields.categories_score = fields.categories_score * weights['category']
      //console.log('fields.categories_score: ', fields.name, fields.categories_score)
    }

    if (scoreBy.includes('likes')) {
      fields.likes_score = normalize(fields.likes, 0, maxScores['likes'])
    }

    // Get average rating and scale it by a factor
    if (scoreBy.includes('aggregate_rating')) {
      fields.aggregate_rating_score = normalize(
        fields.aggregate_rating,
        2,
        maxScores['aggregate_rating']
      )
      fields.aggregate_rating_score *= weights.rating
    }

    // Distance is inverted from max and then normalize 1-10
    if (scoreBy.includes('distance')) {
      let maxDistance = maxScores['distance']
      fields.distance_score = normalize(
        maxDistance - fields.distance,
        0,
        maxDistance
      )

      fields.distance_score *= weights.distance
    }

    if (scoreBy.includes('hours')) {
      fields.hours_score *= weights.hours
    }

    const reasons = scoreBy
    const scores = scoreBy.map((field) => fields[field + '_score'])

    // Find the larged score
    const largestIndex = scores.indexOf(Math.max.apply(null, scores))
    // Take an average of each of the scores
    fields.average_score = scores.reduce((a, b) => a + b, 0) / scores.length
    // Update the top average score
    if (fields.average_score > maxAverageScore)
      maxAverageScore = fields.average_score
    // Add the update the reason code
    fields.reason = reasons[largestIndex]

    place.properties = fields
    return place
  })

  // Re-sort by average score
  const placesScoredAndSorted = placesScoredAveraged.sort(
    (a, b) => b.properties.average_score - a.properties.average_score
  )

  // Normalize the scores between 1 & 5
  const placesSortedAndNormalized = placesScoredAndSorted.map((place) => {
    let fields = place.properties

    fields.average_score =
      normalize(fields.average_score, 0, maxAverageScore) / 2
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
  let current = turf.point([
    currentLocation.longitude,
    currentLocation.latitude,
  ])

  // Sort the list of places based on closness to the users
  let sorted_locations = locations.sort((a, b) => {
    let point_a = turf.point(a.centerpoint)
    let point_b = turf.point(b.centerpoint)

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

export const toTitleCase = (str) => {
  if (typeof str == 'string') {
    str = str.toLowerCase().split(' ')
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
    }
    return str.join(' ')
  } else {
    return str
  }
}
