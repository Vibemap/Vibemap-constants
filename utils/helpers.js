import LinearScale from 'linear-scale'

import * as turf from '@turf/helpers'
import turf_distance from '@turf/distance'
import turf_boolean from '@turf/boolean-point-in-polygon'

// TODO: Use only axios or fetch, not both
import Axios from "axios"
import axiosRetry from 'axios-retry'

axiosRetry(Axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay
})

import isBetween from 'dayjs/plugin/isBetween'
import truncate from 'truncate'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(isBetween)
dayjs.extend(utc)

import querystring from 'querystring'

import * as constants from '../constants/constants.js'
import allCategories from '../dist/categories.json'

const activityCategories = require('../dist/activityCategories.json')
import cities from '../constants/cities.json'
import neighborhoods from '../dist/neighborhoods.json'
import badges from '../dist/badges.json'

const ApiUrl = 'https://api.vibemap.com/v0.3/'

// Filters a list of objects
// Similar to .filter method of array
export const filterList = (
  list = [{ test: 'test', value: 'foo' }, { test: 'test', value: 'bar'}],
  searchTerm = 'food', key = 'value'
) => {
  // Generalize the Semantic UI search implementation
  const re = new RegExp(searchTerm.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&'), 'i')

  const isMatch = (result) => re.test(result[key])

  const results = list.filter(item => isMatch(item))

  return results
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

// Give a score based on the vibes position in the list.
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

export const getCardOptions = (block) => {
  let postData = block.singCards.posts

  let {
    categoryQuery,
    distanceQuery,
    geoQuery,
    placeType,
    searchQuery,
    vibeQuery } = postData[0]

  // If a vibe override query is present
  if (block.overrideQuery && block.overrideQuery.vibe) vibeQuery = block.overrideQuery.vibe

  // Use city as a back up
  if (block.overrideQuery && block.overrideQuery.cities && block.overrideQuery.cities.length > 0) {
    const selectedCity = cities.filter(result => result.slug === block.overrideQuery.cities[0])

    // TODO: Update this programatically from Wordpress
    const cityRadius = 7
    geoQuery = geoQuery ? geoQuery : selectedCity[0].location
    distanceQuery = distanceQuery ? distanceQuery : cityRadius
  }

  if (block.overrideQuery && block.overrideQuery.location) {
    geoQuery = block.overrideQuery.location

    distanceQuery = block.overrideQuery.distance ? block.overrideQuery.distance : distanceQuery
  }

  // If no city or override are passed, make Oakland default
  if (!geoQuery) {
    const firstCity = cities.filter(result => result.slug === 'oakland')
    geoQuery = firstCity[0].location
  }

  if (typeof vibeQuery === 'string') vibeQuery = vibeQuery.replace(/\s/g, '').split(",") // Cast comma-separated list to array

  // Map all the vibe slug to a list that includes related vibes.
  const vibesFromCategories = vibeQuery ? vibeQuery.map(vibe => typeof(vibe) === 'string' ? vibe : vibe.slug) : []

  // TODO: Move get relateed vibes to the backend or front end, not here.
  //const allVibes = vibes.getRelatedVibes(vibesFromCategories)

  let cardOptions = {
    category: categoryQuery,
    distance: distanceQuery,
    point: geoQuery.longitude + ',' + geoQuery.latitude,
    ordering: 'vibe',
    search: searchQuery,
    vibes: vibesFromCategories
  }

  console.log('cardOptions, ', cardOptions)

  return cardOptions

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
export const getCategoryMatch = (categories = ['all']) => {
  const all_categories = activityCategories.activityCategories.map(
    (category) => category.slug
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

  // TODO: Just use the native URL methods:
  let url = new URL(link)
  //const path = url.pathname


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

export const getTopCategories = (places, attribute = 'categories') => {
  let top_categories = {};

  places.map((place) => {
    place.properties[attribute].map((item) => {
      if (top_categories.hasOwnProperty(item)) {
        top_categories[item] += 1;
      } else {
        top_categories[item] = 1;
      }
      return null
    });
    return null
  });

  var sortable = [];
  for (var item in top_categories) {
    sortable.push([item, top_categories[item]]);
  }

  let top_categories_sorted = sortable.sort(function (a, b) {
    return b[1] - a[1]
  });

  return top_categories_sorted
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

// This function is no longer utilized. Linear scale from 0 to 10
export const normalize = (val, min, max) => {
  return ((val - min) / (max - min)) * 10
}

/* New flexible linear scaling function. Using d3.scaleLinear, a value (val) between
min and max is scaled appropriately to value between scale_low and scale_high
*/
export const normalize_all = (val = 500, min = 1, max = 100, scale_low = 1, scale_high = 10) => {

  const scale = LinearScale().domain([min, max]).range([scale_low, scale_high])
  //console.log(`linear-scale result `, scale(val))

  return scale(val)
}

// TODO Function for scaling icon. Currently bug (likely in clustering) where certain icon's become very small
export const scaleIconSize = (score = 5, min = 1, max = 100) => {
  const minSize = 1
  const maxSize = 5

  // TODO: Test and replace
  //const d3_scale = scaleLinear().domain([min, max]).range([1, 5])

  const scale = LinearScale()
    .domain([min, max])
    .range([minSize, maxSize])

  const iconSize = scale(score)

  return iconSize
}

export const scaleMarker = (score = 50, min = 0, max = 100, zoom = 14) => {
  // TODO: Hack to catch empty/nan scores
  if (isNaN(score)) score = 3.5

  const marker_scale = LinearScale()
    .domain([8, 20])
    .range([10, 30])


  let base_marker = marker_scale(zoom)
  let max_marker = base_marker * 3

  let scale = LinearScale()
    .domain([0, max])
    .range([base_marker, max_marker])

  let scaled_size = Math.round(scale(score))

  return scaled_size
}

// Maps the relative density of place to a known range for Vibemap's cities
export const scaleDensityArea = (density = 10, area = 100) => {
  // TODO: Make these contants?
  let density_scale = LinearScale()
    .domain([1, 60, 1000])
    .range([0, 0.8, 1])

  let relative_density = density_scale(density)

  return relative_density
}

export const scaleDensityBonus = (relative_density) => {
  let inverted_scale = LinearScale()
    .domain([0, 1])
    .range([constants.HEATMAP_INTENSITY * 2, constants.HEATMAP_INTENSITY])

  const withBonus = inverted_scale(relative_density)
  return withBonus
}

export const scaleScore = (score = 2) => {
  let scale = LinearScale()
    .domain([0, 5])
    .range([60, 100])

  let percentage = Math.round(scale(score))

  return percentage
}

export const scaleSelectedMarker = (zoom) => {
  // Scale em size of svg marker to zoom level
  let scale = LinearScale()
    .domain([8, 12, 20]) // Zoom size
    .range([0.1, 1.2, 4]) // Scale of marker size

  let scaled_size = Math.round(scale(zoom))

  return scaled_size
}

export const getEventOptions =  (
  city = 'oakland',
  date_range = 'month',
  distance = 10,
  category = null,
  vibes = [],
  search
  ) => {
    const selectedCity = cities.filter(result => result.slug === city)
    const location = selectedCity[0].location

    const today = dayjs()
    const dayOfWeek = today.day() + 1

    let day_start = today.startOf('day')

    let startOffset = 0
    let endOffset = 0

    switch (date_range) {
      case 'day':
        endOffset = 1
        break;

      case 'weekend':
        endOffset = 7 - dayOfWeek
        break;

      case 'next_week':
        startOffset = 8 - dayOfWeek
        endOffset = 7
        break;

      case 'month':
        const monthEnd = dayjs().endOf('month')
        endOffset = monthEnd.diff(today, 'day')

      case 'quarter':
        endOffset = 90
        break;
    }

    let date_range_start = today.add(startOffset, 'days').startOf('day')
    let date_range_end = today.add(endOffset , 'days').endOf('day') //  TODO Plus range

    const options = {
      category: category,
      distance: distance,
      point: location.longitude + ',' + location.latitude,
      ordering: 'vibe',
      start_date: date_range_start.format("YYYY-MM-DD HH:MM"),
      end_date: date_range_end.format("YYYY-MM-DD HH:MM"),
      search: search,
      vibes: vibes
    }

    return options
}

export const fetchEvents = async (options, activitySearch = false) => {
  let {
    activity,
    bounds,
    category,
    days,
    distance,
    ordering,
    point,
    search,
    time,
    vibes,
  } = options

  let centerPoint = point.split(',').map((value) => parseFloat(value))
  let distanceInMeters = distance * constants.METERS_PER_MILE

  let day_start = dayjs().startOf('day').format('YYYY-MM-DD HH:MM')
  let day_end = dayjs().add(days, 'days').format('YYYY-MM-DD HH:MM')

  if (activitySearch && category) {
    options.search = `${category ? category : ''} ${search ? search : ''}`
  }

  const params = module.exports.getAPIParams(options)
  let query = querystring.stringify(params)

  const apiEndpoint = `${ApiUrl}events/`
  const source = Axios.CancelToken.source()

  const response = await Axios.get(`${apiEndpoint}?${query}`, {
    cancelToken: source.token,
  }).catch(function (error) {
    // handle error
    console.log('Axios error ', error.response)

    return {
      data: [],
      count: 0,
      top_vibes: null,
      loading: false,
      timedOut: false
    }
  })

  return response
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

export const fetchPlacePicks = async (
  options = {
    distance: 5,
    point: '-123.1058197,49.2801149',
    ordering: 'vibe',
    vibes: ['chill'],
    preferredVibes: [],
    relatedVibes: [] // TODO: Separate query by * score by
  }
) => {
  let {
    activity,
    bounds,
    category,
    days,
    distance,
    ordering,
    per_page,
    point,
    search,
    time,
    vibes,
    preferredVibes,
    relatedVibes,
  } = options

  let distanceInMeters = 1
  if (distance > 0) distanceInMeters = distance * constants.METERS_PER_MILE
  if (activity === 'all') activity = null
  const scoreBy = ['aggregate_rating', 'vibes', 'distance', 'offers', 'hours']
  const numOfPlaces = per_page ? per_page : 350

  const params = getAPIParams(options, numOfPlaces)

  let centerPoint = point.split(',').map((value) => parseFloat(value))
  let query = querystring.stringify(params)

  const apiEndpoint = ApiUrl + 'places/'
  const source = Axios.CancelToken.source()

  const response = await Axios.get(`${apiEndpoint}?${query}`, {
    cancelToken: source.token,
  }).catch(function (error) {
    // handle error
    console.log('Axios error ', error.response)

    return {
      data: [],
      count: 0,
      top_vibes: null,
      loading: false,
      timedOut: false,
    }
  })

  let places = formatPlaces(response.data.results.features)
  const count = response.data.count
  //console.log('Got reponse ', response.data)
  const vibesQuery = vibes ? vibes : []

  // TODO: Consider scoring related vibe differently
  const vibesCombined = vibesQuery
    .concat(relatedVibes ? relatedVibes : [])
    .concat(preferredVibes ? preferredVibes: [])

  // TODO: Incorporate personalized vibe score for user
  let placesScoredAndSorted = scorePlaces(
    places,
    centerPoint,
    vibesCombined,
    scoreBy,
    ordering,
    undefined,
    options // Pass any overrides
  )

  let top_vibes = getTopVibes(places)

  return {
    data: placesScoredAndSorted,
    count: count,
    top_vibes: top_vibes,
    loading: false,
    timedOut: false,
  }
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
  ordering,
  zoom = 12,
  options = null
) => {
  //console.log('scorePlaces: ', places, ordering, scoreBy)

  // Default max values; These will get set by the max in each field
  let maxScores = {}

  // Bonuses between 1 and 10
  // TODO reconfigure bonus scores in a way that is more mathematically sound
  // to use zoom-weight scaling

  const vibeMatchBonus = 10
  const vibeOrderBonus = 2
  const vibeAmountBonus = 2
  const offerBonus = 2
  const imageBonus = 2
  const openBonus = 0.5
  const popularBonus = 5

  // TODO: If ordered by vibe, rank matches very high
  const vibeRankBonus = ordering == 'vibe' ? 30 : 20

  // ⚡ 	First, initialize the scoring fields
  //		Defaults should be on extreme ends to prevent logical errors
  let minScores = {};

  scoreBy.map((field) => (maxScores[field] = 0.00001))
  // Default min values; These will get set by the min in each field
  scoreBy.map((field) => (minScores[field] = Infinity))

  // Default any zoom level less than ten to be ten, not useful to weigh distance at that point
  let zoom_to_use = zoom <= 10 ? 10 : zoom;
  let zoom_norm = normalize_all(zoom_to_use, 10, 20, 0, 10)

  // Logistic growth equation. Max weight is 8, minimum of 1. Weight grows exponentially in the middle range
  // TODO: pull this out into own function, allows us to weigh distance differently depending on zoom
  let zoom_weight = 8 / (1 + (7 * (Math.exp(1) ** (-0.7 * zoom_norm))))

  // Weight distance & rating different than other fields
  // TODO: Make everything a consitent 1-10 scale
  let weights = {
    category: 0,
    vibe: 10,
    distance: zoom_weight,
    rating: 0,
    hours: 0,
    offers: 0,
  }

  // If there are vibes, weigh the strongest by 3x
  // if (vibes.length > 0 && ordering === 'relevance') weights.vibe = 2
  // Do the same for other sorting preferences
  if (ordering !== 'relevance') weights[ordering] += 3

  // Get scores and max in each category
  const placesScored = places.map((place) => {
    let fields = place.properties
    fields.stats = {}

    // Give place a vibe score
    // TODO: Calculate `vibe_score` on backend with stored procedure.
    // TODO: Make a separate, modular method
    if (scoreBy.includes('vibes')) {

      // IGNORE all this, just for future implementation on scoring vibes
      /*
      let vibes_to_use = null

      // If no vibes are inputted, default to these vibes. Ideally this would be stored user vibes at some point
      if (vibes.length === 1) {
        vibes_to_use = ["chill", "fun"]
      } else if(vibes.length === 2){
        vibes_to_use = vibes.slice(0,1)
      } else {
        vibes_to_use = vibes.slice(0,-1)
      }

      fields.vibe_score = percent_yourvibe(vibes_to_use, fields.vibes)
      */

      // Give place a vibe score

      let [vibeMatches, averageRank, vibeBonus] = [0, 0, 0]

      fields.vibes_score = 0
      // TODO: TEMP until events return vibes
      if (fields.vibes === undefined) fields.vibes = ['chill']

      // Based off logrithmic scale, a place with 20 vibes isn't that much (twice) better than one with 10
      const scoreVibeLength = fields.vibes.length > 0
        ? vibeAmountBonus * Math.log10(fields.vibes.length)
        : 0

      if (fields.vibes.length > 0) fields.vibes_score = scoreVibeLength

      // Don't show markers without photos; this will analyze the vibe and quality of the image
      //Reward photos logrithmically as well. Log indicates scaling behavior, coefficient the weight
      if (fields.images && fields.images.length > 0) vibeBonus += fields.images.length > 0
        ? imageBonus * Math.log10(fields.images.length)
        : 0

      // Give direct vibe matches bonus points
      if (vibes && vibes.length > 0 && fields.vibes) {
        vibeMatches = matchLists(vibes, fields.vibes)

        // The average rank scores by the order of the array
        // That is the first vibe gets ranks higher than the last one
        averageRank = rankVibes(vibes, fields.vibes)

        // Bonus for exact matches + all place vibes
        const vibeMatchScore = vibeAmountBonus * vibeMatches * vibeMatchBonus
        const vibeOrderScore = averageRank * vibeOrderBonus
        vibeBonus += vibeMatchScore + vibeOrderScore
        fields.vibes_score += vibeBonus

        // For debugging purposes
        fields.stats['num_vibes'] = fields.vibes.length
        fields.stats['num_matching_vibes'] = vibeMatches
        fields.stats['vibe_match_score'] = vibeMatchScore
        fields.stats['vibe_order_score'] = vibeOrderScore
      }

      // Set max vibe score
      if (fields.vibes_score > maxScores.vibes) {
        maxScores.vibes = fields.vibes_score
      }

      if (fields.vibes_score < minScores.vibes) {
        minScores.vibes = fields.vibes_score
      }

      //console.log('Scoring weights: ', weights, ordering, vibeRankBonus)
      //console.log('For these vibes: ', fields.vibes)
      //console.log('Vibe score bonus: ', fields.vibes_score, vibeBonus)
      //console.log('Vibe order bonus: ', fields.vibes_score, vibeBonus)
      //console.log('Vibe score: ', vibeMatches, averageRank, vibeBonus)
      fields.stats['total_vibe_score'] = fields.vibes_score
    }

    // Get scores and max in each category
    // TODO: Make a separate, modular method
    if (scoreBy.includes('categories')) {
      let [categoryMatches, averageRank, vibeBonus] = [0, 0, 0]

      fields.categories_score = 0

      // Merge and remove duplicates
      const concatCategories = fields.categories.concat(fields.subcategories);
      const allCategories = concatCategories.filter(
        (item, index) => concatCategories.indexOf(item) == index
      );

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
          );
          const foundSubcategories = constants.place_sub_categories.filter(
            (o) => o.name.includes(category)
          );

          if (foundCategories.length > 0) {
            categoryVibes = categoryVibes.concat(foundCategories[0].vibes);
          }

          if (foundSubcategories.length > 0) {
            categoryVibes = categoryVibes.concat(foundSubcategories[0].vibes);
          }
        });

        categoryMatches = matchLists(vibes, categoryVibes)
        const bonus = categoryMatches * vibeMatchBonus
        fields.categories_score += bonus
      }

      if (fields.categories_score > maxScores['categories']) {
        maxScores['categories'] = fields.categories_score;
      }
      if (fields.categories_score < minScores['categories']) {
        minScores['categories'] = fields.categories_score;
      }
    }

    // Get the min and max scores for normalization
    // Add score for the number of likes or RSVPs for events
    if (scoreBy.includes('likes')) {
      // Set max aggregate score
      if (fields.likes > maxScores['likes']) {
        maxScores['likes'] = fields.likes
      }

      if (fields.likes < minScores['likes']) {
        minScores['likes'] = fields.likes
      }
    }

    // Add score for distance from user
    if (scoreBy.includes('distance')) {
      // TODO: Make a util in map.js
      const placePoint = turf.point(place.geometry ? place.geometry.coordinates : [0, 0])

      // Does this return in kilometers? Miles?
      fields['distance'] = turf_distance(centerPoint, placePoint)
      // Set max distance
      if (fields['distance'] > maxScores['distance']) {
        maxScores['distance'] = fields['distance']
      }
      if (fields['distance'] < minScores['distance']) {
        minScores['distance'] = fields['distance']
      }
    }

    if (scoreBy.includes('aggregate_rating')) {
      // Set max aggregate score
      if (fields.aggregate_rating > maxScores['aggregate_rating']) {
        maxScores['aggregate_rating'] = fields.aggregate_rating
      }
      if (fields.aggregate_rating < minScores['aggregate_rating']) {
        minScores['aggregate_rating'] = fields.aggregate_rating
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

      let { openNow, openToday, opens, closes, isPopular } = isOpen(
        fields.opening_hours
      );

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

    fields.stats['hours_bonus'] = fields.hours_score

    place.properties = fields
    return place
  });

  // Now normalize all the scores
  let maxAverageScore = 0
  let minAverageScore = Infinity

  // Normalize each place by the top scores across all results
  let placesScoredAveraged = placesScored.map((place) => {
    let fields = place.properties

    // TODO: This could be more steamlined automatically for each key in scoreBy
    if (scoreBy.includes('vibes')) {
      fields.vibes_score = normalize_all(fields.vibes_score, minScores['vibes'], maxScores['vibes'], 0, 1)
      fields.vibes_score = fields.vibes_score * weights['vibe']
      //console.log('fields.vibes_score: ', fields.name, fields.vibes_score)
    }

    if (scoreBy.includes('categories')) {
      fields.categories_score = normalize_all(
        fields.categories_score, minScores['categories'], maxScores['categories'], 0, 1);
      fields.categories_score = fields.categories_score * weights['category']
      //console.log('fields.categories_score: ', fields.name, fields.categories_score)
    }

    if (scoreBy.includes('likes')) {
      fields.likes_score = normalize_all(fields.likes, minScores['likes'], maxScores['likes'], 0, 1)
    }

    // Get average rating and scale it by a factor
    if (scoreBy.includes('aggregate_rating')) {
      fields.aggregate_rating_score = normalize_all(
        fields.aggregate_rating, minScores['aggregate_rating'], maxScores['aggregate_rating'], 0, 1)
      fields.aggregate_rating_score *= weights.rating
      fields.stats['aggregate_rating_score'] = fields.aggregate_rating
    }

    // Smallest distance gets largest score
    if (scoreBy.includes('distance')) {
      let maxDistance = maxScores['distance']

      /* all distance values are normalized between 0 and 0.95. Since we take the difference of 1 and the score,
        the lowest possible distance_score is 0.05, and the highest is 1. We do this such that lower distances
        (closer places) get a higher distacne score.
      */
      fields.distance_score = 1 - normalize_all(fields.distance, minScores['distance'], maxDistance, 0, 0.95)

      //console.log(fields.distance, minScores['distance'], maxDistance, maxDistance - fields.distance, fields.distance_score)
      fields.distance_score *= weights.distance
      fields.stats['distance_score'] = fields.distance_score
    }


    if (scoreBy.includes('hours')) {
      fields.hours_score *= weights.hours
    }

    const reasons = scoreBy;
    const scores = scoreBy.map((field) => fields[field + '_score'])

    // Find the larged score
    const largestIndex = scores.indexOf(Math.max.apply(null, scores))

    // Find the smallest score

    scores.indexOf(Math.min.apply(null, scores))

    // Take an average of each of the scores
    fields.average_score = scores.reduce((a, b) => a + b, 0) / scores.length
    // Update the top average score
    if (fields.average_score > maxAverageScore)
      maxAverageScore = fields.average_score;

    if (fields.average_score < minAverageScore)
      minAverageScore = fields.average_score
    // Add the update the reason code
    fields.reason = reasons[largestIndex]

    place.properties = fields
    return place
  })

  // Re-sort by average score
  const placesScoredAndSorted = placesScoredAveraged.sort(
    (a, b) => b.properties.average_score - a.properties.average_score
  )

  // Normalize the scores between 0.65 and 1
  const placesSortedAndNormalized = placesScoredAndSorted.map((place) => {
    let fields = place.properties
    //console.log(place.properties.name, minAverageScore, fields.average_score, maxAverageScore)

    // ⚡⚡ final score returned to user is normalized between 0.65 and 1
    fields.average_score = normalize_all(fields.average_score, minAverageScore, maxAverageScore, 0.65, 1)
    fields.icon_size = scaleIconSize(fields.average_score, 0.65, 1)

    // All average_scores should be between 0.65 and 1, and icon_size between 1 and 5. Should also print in descending order
    //If so, then all is working well
    //console.log(place.properties.name, place.properties.address, fields.average_score, fields.distance_score, weights.distance)//, fields.icon_size)
    // Scale the icon size based on score
    fields.stats['final_score_normalized'] = fields.average_score

    return place
  })

  // TODO: for debugging only
  /*placesSortedAndNormalized.map((place) => {
    console.log(place.properties.name)
    console.log(' - score: ', place.properties.average_score)
    console.log(' - vibes_score: ', place.properties.vibes_score)
    console.log(' - aggregate rating: ', place.properties.aggregate_rating_score)
    console.log(' - distance: ', place.properties.distance_score, "weight: ", weights.distance)
    console.log(' - reason: ', place.properties.reason)
  })
  */
  return placesSortedAndNormalized
}
// Only return the requested fields and remove all others from GeoJSON properies
export const reducePlaceProperties = (
  places,
  fields = [
    'name',
    'url',
    'address',
    'categories',
    'subcategories',
    'neighborhood',
    'price',
    'short_description',
    'vibemap_images',
    'vibes'
  ]) => {

  const places_reduced = places.map(place => {
    place.properties = Object.fromEntries(
      fields.map(key => [key, place.properties[key]])
    )
    return place
    //console.log('reduced this place ', place.properties)
  })

  return places_reduced
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


// TODO: add neighborhood as top place of the list. Will need some neighborhood cards
//Function that returns every place within a certain specified radius
export const nearest_places = (places, currentLocation, radius = 5) => {
  //console.log("current Location: ", currentLocation)
  //console.log("Full list of Places: ", places)

  // Push any place whose distance is under radius (0.1) to places_temp
  var places_temp = []
  const distance_calculated = places.map((place) => {
    let fields = place.properties
    const placePoint = turf.point(place.geometry.coordinates)
    fields['distance'] = turf_distance(currentLocation, placePoint)
    if (fields['distance'] < radius) {
      places_temp.push(place)
      //console.log("Place within bound: ", fields["distance"])
    }
  })

  // Sort on a copy not a reference
  var places_to_return = places_temp.slice(0)

  // Do sorting after .map(), should be faster performance
  places_to_return.sort(function(a,b){
    return a.properties.distance - b.properties.distance
  })

  /* For debugging, make sure every place is sorted in ascending order
  places_to_return.map((x) => {
    console.log("sorted: ", x.properties.distance)
  })
  */
  return places_to_return
}

//Function that checks if a place is within a certain distance of user, for check ins
export const validate_check_in = (place, currentLocation, threshold = 0.5) => {
  const placePoint = turf.point(place.geometry.coordinates)
  const within_distance = turf_distance(currentLocation, placePoint) < threshold ? true:false
  return within_distance
}
// Function determines if a point falls into the specific boundaries of Jack London District
export const in_jls = (currentLocation) => {

  // Hand drawn locations. Roughly everything beneath 7th St, between Market St. and Fallon St.
  const bounds_jls = turf.polygon([[
    [-122.282617, 37.802862],
    [-122.264300, 37.795721],
    [-122.265502, 37.787005],
    [-122.288139, 37.796077],
    [-122.282617, 37.802862]
  ]])
  return turf_boolean(currentLocation, bounds_jls)
}

// Primary function that returns a list of neighborhoods the location is in.
// The input is the place's properties, returns array of neighborhood id's
// Vectorizes our wordpress neighborhoods data (neighborhoods.json) and flexibly utilizes available information as bounds
// If no bounds (bbox) is given, use radius, if no radius, then a hard radius of 0.8 km is set
export const in_neighborhood = (place) => {

  // Name array is not returned but could be if desired, more for debugging
  const valid_neighborhoods_id = []
  const valid_neighborhoods_name = []
  const turf_point = turf.point(place.geometry.coordinates)

  neighborhoods.map((neighborhood) => {
    const neigh_dist = turf_distance([neighborhood.map.lng, neighborhood.map.lat], turf_point)

    /* Use helper function since can't assign turf.boolean() to non valid polygons which in turn can't be handled within
     the conditional statement*/
    if (neigh_dist < 5 && in_bbox_helper(place.geometry.coordinates, neighborhood.boundary)){
      valid_neighborhoods_id.push(neighborhood.id)
      valid_neighborhoods_name.push(neighborhood.slug)
    } else if (neighborhood.radius>0.00001 && neigh_dist < neighborhood.radius) {
      console.log("radius checked")
      valid_neighborhoods_id.push(neighborhood.id)
      valid_neighborhoods_name.push(neighborhood.slug)
    } else if (neigh_dist < 0.8){
      console.log("dist checked")
      valid_neighborhoods_id.push(neighborhood.id)
      valid_neighborhoods_name.push(neighborhood.slug)
    } else {

    }
  })
  return valid_neighborhoods_id
}

// Helper function to determine if a location is within certain bounds
export const in_bbox_helper = (point, bbox) => {
  if (bbox !== "" && bbox !== undefined) {
    const parsed_bbox = JSON.parse(bbox)
    const bounds = turf.polygon([parsed_bbox])
    //console.log("bbox", parsed_bbox)
    return turf_boolean(point, bounds)
  } else {
    //console.log("no bbox")
    return false
  }
}

// General function to find nearest neighborhood of a locations. Returns top ten options
// Input must be [longitude, lattitude] coordinates
export const nearest_neighborhood = (placePoint) => {
  const neighborhoods_ordered = neighborhoods.map((neighborhood) => {
    return {name: neighborhood.title.rendered, neigh_dist: turf_distance([neighborhood.map.lng, neighborhood.map.lat], placePoint)}
  })
  neighborhoods_ordered.sort(function(a,b){
    return a.neigh_dist - b.neigh_dist
  })
  return neighborhoods_ordered.slice(0,10)
}

// Helper function for associate_badge. Returns every neighborhood challenge badge
// TODO modify such that inputs can be multiple badge types, for example lookup general badges or neighborhood or place etc.
export const challenge_badges_lookup = () => {
  const challenge_badges = []
  badges.badges.map((badge) => {
    if (badge.type == "neighborhood") {
      challenge_badges.push(badge)
    }
  })
  return challenge_badges
}

// Returns array of valid badges (and properties) that a place is associated with. Give points towards that badge
export const associate_badge = (locations) => {
  const badges_to_check = challenge_badges_lookup()
  const win_badges = []
  badges_to_check.map((badge) => {
    console.log(badge)
    for (let i = 0; i < locations.length; i++) {
      if (badge.location.ID == locations[i]) {
        win_badges.push(badge)
      }
    }
  })
  return win_badges
}
