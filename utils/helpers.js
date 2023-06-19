import Axios from "axios"
import axiosRetry from 'axios-retry'

import querystring from 'querystring'

axiosRetry(Axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  onRetry: (count, err, config) => {
    console.log('Axios retrying: ', count, err, config)
  }
})

// same object, but with updated typings.
// TODO: roll back caching until CORS is fixed everywhere.
//import { setupCache } from 'axios-cache-interceptor'
//const axios = setupCache(Axios);
const axios = Axios

import dayjs from 'dayjs'
dayjs.extend(isBetween)
import dayjsRecur from 'dayjs-recur'
dayjs.extend(dayjsRecur)
import isBetween from 'dayjs/plugin/isBetween'

import LinearScale from 'linear-scale'
import truncate from 'truncate'

import * as turf from '@turf/helpers'
import turf_distance from '@turf/distance'
import turf_boolean from '@turf/boolean-point-in-polygon'

import * as constants from '../constants/constants.js'
import cities from '../constants/cities.json'
import neighborhoods from '../dist/neighborhoods.json'
import badges from '../dist/badges.json'

import { getLocationFromPoint, sortLocations, distanceBetweenLocations } from './map'
import { getRelatedVibes, getCategoriesByLevel } from './vibes'
import { getGroups } from './wordpress'

const jsonpack = require('jsonpack')
let activityCategories = {}
let categories_flat = []

// Keep track of which API endpoint domain we are using
export const getAPIDomain = (mode = null) => {
  // Use the mode passed in, or the NODE_ENV
  const env_mode = process.env.API_ENV
  const current_mode = mode
    ? mode
    : env_mode
      ? env_mode
      : 'production'

  const url_production = 'https://api.vibemap.com'
  const url_staging = 'https://staging.api.vibemap.com'
  const url_dev = 'http://localhost:9000'

  const domain = current_mode === 'production'
    ? url_production
    : current_mode === 'staging'
      ? url_staging
      : url_dev

  return domain
}

const api_domain = getAPIDomain()
const api_version = 'v0.3'
const useSearchAPI = true

const ApiUrl = `${api_domain}/${api_version}/`

// Filters a list of objects
// Similar to .filter method of array
export const filterList = (
  list = [{ test: 'test', value: 'foo' }, { test: 'test', value: 'bar' }],
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

  const average = rankings.reduce((a, b) => a + b, 0) / listB.length

  return average
}

export const sortByKey = (a, b) => {
  console.log('sortByKey (a, b)', a, b)
  return a
}

export const sortByPopularity = (a, b) => {
  // Sorted by Monthly Search Volumne (MSV)
  // Handle null or empty msv
  const aPop = parseInt(a.details.msv ? a.details.msv : 2)
  const bPop = parseInt(b.details.msv ? b.details.msv : 2)

  return bPop - aPop
}

try {
  const activityCategoriesPacked = require('../dist/activityCategories.zip.json')
  activityCategories = {
    activityCategories: jsonpack.unpack(activityCategoriesPacked)
  }

  categories_flat = activityCategories.activityCategories
    .sort(sortByPopularity)
    .map(category => category.name.toLowerCase())

} catch (error) {
  console.log('Error with packed activityCategories ', error)
}

export const sortByArray = (sortedList, sortingArr) => {
  return sortedList.sort((a, b) => {
    return sortingArr.indexOf(a) - sortingArr.indexOf(b)
  })
}

export const isClosedToday = (dailyHours) => {
  return dailyHours.opens === '00:00:00' && dailyHours.closes === '00:00:00'
}

export const displayHours = (hours, dayFormat = 'dd') => {
  let openHours = isOpen(hours)
  let hasHours = false

  const weeklyHours = hours.find(({ day_of_week }) => day_of_week === 8)

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
        orderedHours.push({ day_of_week: i, closed: true })
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
      return dayjs().day(day).format(dayFormat) + ': ' + 'Closed'
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

  if (!hours) return { openNow: false, openToday: false, isPopular: false }

  let dayFound = hours.find(({ day_of_week }) => day_of_week === day)

  // TODO: not true if it's closed one day
  const hasDailyHours = hours.find(({ day_of_week }) => day_of_week === 8)

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

export const parseDateTime = (datetime) => {
  const date = datetime ? dayjs(datetime) : null
  return date
}

export const formatDateTime = (
  datetime,
  formatHtml = false,
  showDayOfWeek = false
) => {
  if (datetime) {
    if (typeof (datetime) == 'string') datetime = parseDateTime(datetime)

    const month = datetime.format('MMM')
    const day = datetime.format('D')
    const weekday = datetime.format('ddd')
    const hour = datetime.format('ha')
    const dateFormated = `${showDayOfWeek ? weekday : null} ${month} ${day} ${hour}`

    return dateFormated
  } else {
    return null
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
  const vibesFromCategories = vibeQuery ? vibeQuery.map(vibe => typeof (vibe) === 'string' ? vibe : vibe.slug) : []

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

  return cardOptions

}

export const getAPIParams = (options, per_page = 150, includeRelated = false) => {
  let { activity, distance, point, vibes } = options
  let params = Object.assign({}, options)

  let distanceInMeters = 1
  if (distance > 0)
    distanceInMeters = Math.round(distance * constants.METERS_PER_MILE)

  // API currently doesn't support other options
  // However, the sorting algorithm, will use them
  params['ordering'] = options.ordering
    ? options.ordering
    : '-aggregate_rating'

  // TODO: Load more points at greater distances?
  params['per_page'] = per_page


  const coords = point.split(',')
  const lat = coords[1]
  const lon = coords[0]

  if (useSearchAPI) {
    if (params.activity) {
      params['categories'] = activity
    }

    if (params.vibes) {
      params[':vibes.raw__in'] = vibes
      delete params['vibes']
    }

    if (params.category) {
      params['categories.raw__in'] = params.category.toLowerCase().split()
    }

    if (params.distance) {
      params['location__geo_distance'] = `${distanceInMeters}m__${lat}__${lon}`
      delete params['distance']
    }

    if (params.search && params.search.length > 0) {
      // FIXME: Make sure searchess ues the right ordering method in Elastic      
      // FIXME: Check if search term matches any tags or categories with a high thresdhold
      let example_tag = 'east bay open studios'
      if (example_tag.includes(params.search)) {
        params.editorial_category = "EastBayOpenStudios"
      }
      delete params['ordering']
      delete params[':vibes.raw__in']
    }

    if (params.editorial_category) {
      const term = params.editorial_category
      params['editorial_categories.raw__wildcard'] = `*${term}*`
      delete params['editorial_category']
    }

    params['is_chain'] = options.is_chain ? options.is_chain : false
    params['is_closed'] = options.is_closed ? options.is_closed : false
    params['is_destination'] = options.is_destination ? options.is_destination : false

    // TODO: there's probably an easier way to set these rules on the backend.
    if (params.city) {
      params['city.raw__contains'] = params.city
      delete params['city']
    }

    if (params.per_page) {
      params['page_size'] = params.per_page
      delete params['per_page']
    }
  }

  // Rename args
  if (activity !== 'all' && activity !== null) params['category'] = activity
  params['dist'] = distanceInMeters
  delete params['activity']
  delete params['distance']
  delete params['bounds']

  // Cleanup empty args
  if (params.city == null) delete params['city']
  if (params.category == null || params.category == 'all' || params.category.length == 0) delete params['category']
  if (params.editorial_category == null) delete params['editorial_category']
  if (params.search == null) delete params['search']
  if (params.vibes == null || params.vibes.length == 0) delete params['vibes']
  if (includeRelated == false) delete params['relatedVibes']
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

// Give a city object return it's center coordinates as an array
export const geLocationFromCity = (city) => {
  // Handles both the object form the CMS and vibemap-constants
  // TODO: Consolidate to just vibemap-constants
  const centerPoint = city.cityDetails
    ? city.cityDetails.placemarker
    : city.location
      ? city.location
      : null

  return centerPoint
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


const getTopLocations = (places, location_type = 'city', flat = false) => {
  let top_locations = {};

  places.map(place => {
    // Only use city name, not state or country
    const location = place.properties[location_type]

    if (location != null && location != 'null') {
      const name = location.split(',')[0]

      if (top_locations.hasOwnProperty(location)) {
        top_locations[name] += 1;
      } else {
        top_locations[name] = 1;
      }
    }

    return null
  });

  var sortable = [];
  for (var location in top_locations) {
    sortable.push([location, top_locations[location]]);
  }

  let top_locations_sorted = sortable.sort(function (a, b) {
    return b[1] - a[1]
  });

  const locations = flat
    ? top_locations_sorted.map((location) => location[0])
    : top_locations_sorted
  return locations
}

export const getTopVibes = (places, flat = false) => {
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

  const vibes = flat ? top_vibes_sorted.map((vibe) => vibe[0]) : top_vibes_sorted

  return vibes
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

export const graphToEvents = (edges = []) => {
  const events = edges.map(edge => {
    const groupEvent = edge.node
    const details = groupEvent.groupDetails

    const name = details.name
    const link = details.link
    const slug = groupEvent.slug
    const description = details.description
    // TODO: Handle multiple images
    const image = details.image
      ? details.image.url
      : null
    const images = [{
      url: image,
      original: image
    }]
    const location = details.map
    const price = details.price ?
      details.price :
      `free`

    const vibes = details.vibes ?
      details.vibes.map(vibe => vibe.slug) : []

    const recurring = details.recurring
    const recurrence = details.recurrence
    const which = details.which
    const day = details.day.value

    const startTime = details.startTime ?
      details.startTime :
      `00:00`
    const endTime = details.startTime ?
      details.endTime :
      `00:00`

    const recurRule = nextDateFromRecurring(recurrence, day, which)

    const nextStartTime = dayjs(recurRule.next(1).toLocaleString()
      .replace(`00:00:00`, startTime))

    const nextEndTime = dayjs(recurRule.next(1).toLocaleString()
      .replace(`00:00:00`, endTime))

    const event = {
      id: slug,
      title: name,
      geometry: {
        type: "Point",
        coordinates: [-122.26747099999956, 37.81396520000001]
      },
      dateTime: nextStartTime,
      image: images,
      card_type: 'event',
      properties: {
        name: name,
        title: name,
        url: link,
        address: location && location.streetAddress,
        categories: [],
        city: details.cities && details.cities[0].slug,
        description: description,
        is_online: false,
        images: [],
        hotspots_place: location,
        location: location,
        start_date: nextStartTime,
        end_date: nextEndTime,
        vibemap_images: images,
        likes: 10,
        price: price,
        recurs: true,
        vibes: vibes
      }
    }

    return event
  })

  return events
}

export const groupsToEvents = (groups = []) => {
  const events = groups.map(groupEvent => {
    //const groupEvent = edge.node
    const details = groupEvent.acf

    const name = details.name
    const link = details.link
    const slug = groupEvent.slug
    const description = details.description
    // TODO: Handle multiple images
    const image = details.image && details.image.url
    const images = image
      ? [{
        url: image,
        original: image
      }]
      : []

    const location = details.map
    const price = details.price ?
      details.price :
      `free`

    const vibes = details.vibes ?
      details.vibes.map(vibe => vibe.slug) : []

    const recurring = details.recurring
    const recurrence = details.recurrence
    const which = details.which
    const day = details.day && details.day.label
      ? details.day.label
      : `sunday`

    const startTime = details.start_time ?
      details.start_time :
      `00:00`
    const endTime = details.end_time ?
      details.end_time :
      `00:00`

    const recurRule = nextDateFromRecurring(recurrence, day, which)

    const nextStartTime = dayjs(recurRule.next(1).toLocaleString()
      .replace(`00:00:00`, startTime))

    const nextEndTime = dayjs(recurRule.next(1).toLocaleString()
      .replace(`00:00:00`, endTime))

    const event = {
      id: slug,
      title: name,
      geometry: {
        type: "Point",
        coordinates: [-122.26747099999956, 37.81396520000001]
      },
      dateTime: nextStartTime.toISOString(),
      image: images,
      card_type: 'event',
      properties: {
        name: name,
        title: name,
        url: link,
        address: location && location.streetAddress,
        categories: [],
        city: details.cities && details.cities[0].slug,
        description: description,
        is_online: false,
        images: images,
        hotspots_place: location,
        location: location,
        start_date: nextStartTime.toISOString(),
        end_date: nextEndTime.toISOString(),
        vibemap_images: images,
        likes: 10,
        price: price,
        recurs: true,
        vibes: vibes
      }
    }

    return event
  })

  return events
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

export const getEventOptions = (
  city = 'oakland',
  date_range = 'quarter',
  distance = 10,
  category = null,
  vibes = [],
  search
) => {
  const selectedCity = cities.filter(result => result.slug === city)
  // FIXME: Why is the location sometimes missing
  const location = selectedCity ? selectedCity[0].location : cities[0]

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
      const monthEnd = today.endOf('month')
      endOffset = monthEnd.diff(today, 'day')
      break;

    case 'quarter':
      endOffset = 90
      break;
  }

  let date_range_start = today.add(startOffset, 'day').startOf('day')
  let date_range_end = today.add(endOffset, 'day').endOf('day') //  TODO Plus range
  //console.log('DEBUG: date_range_start, date_range_end: ', date_range, date_range_start.toString(), date_range_end.format("YYYY-MM-DD HH:MM"));

  let options = {
    activity: category,
    category: category,
    distance: distance,
    point: location.longitude + ',' + location.latitude,
    ordering: '-score_combined',
    start_date_after: date_range_start.format("YYYY-MM-DD HH:MM"),
    end_date_before: date_range_end.format("YYYY-MM-DD HH:MM"),
    search: search,
    vibes: vibes
  }

  // Don't pass empty/null params
  if (options.category == null || options.category == 'all' || options.category.length == 0) delete options['category']
  if (options.search == null) delete options['search']
  if (options.vibes == null || options.vibes.length == 0) delete options['vibes']

  return options
}

export const fetchEvents = async (
  // Defaults for testing
  options = {
    distance: 20,
    point: `-122.269994,37.806507`
  },
  activitySearch = false,
  recurringSearch = false
) => {
  //console.log('fetchEvents: activitySearch, recurringSearch', activitySearch, recurringSearch);

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
  let currentLocation = getLocationFromPoint(centerPoint)
  let distanceInMeters = distance * constants.METERS_PER_MILE

  let day_start = dayjs().startOf('day').format('YYYY-MM-DD HH:MM')
  let day_end = dayjs().add(days, 'days').format('YYYY-MM-DD HH:MM')

  if (activitySearch && category) {
    options.search = `${category ? category : ''} ${search ? search : ''}`
  }

  const nearestCities = sortLocations(cities, currentLocation)
  const city = nearestCities && nearestCities.length > 0
    ? nearestCities[0].name
    : null

  const params = module.exports.getAPIParams(options)
  //const searchParams = new URLSearchParams(params)
  //let query = searchParams.toString()
  let query = querystring.stringify(params)

  const apiEndpoint = `${ApiUrl}events/`
  const source = axios.CancelToken.source()

  let response = await axios.get(`${apiEndpoint}?${query}`, {
    cancelToken: source.token,
  }).catch(function (error) {
    // handle error
    console.log('Axios error ', error.response && error.response.statusText)

    return {
      data: [],
      count: 0,
      top_vibes: null,
      loading: false,
      timedOut: false
    }
  })

  // TODO: How to filter by location and category / vibe
  if (recurringSearch) {
    const groups = await getGroups({ city: city ? city : '' })
    const recurringGroupEvents = groupsToEvents(groups.data)

    response.data.results.features = recurringGroupEvents.concat(response.data.results.features)
  }

  return response
}

const nextDateFromRecurring = (...[
  recurrence,
  day,
  which
]) => {
  const date = dayjs() // .startOf('month')
  const ordinals = ["first", "second", "third", "fourth", "fifth"]
  const whichDay = ordinals.indexOf(which)
  const weekOfMonth = whichDay > 0 ? whichDay : 0

  // TODO: Handle daily, quarterly, yearly
  // And pass this same util to the details page
  const recurRule = recurrence == `monthly` ?
    date.recur()
      .every(day).daysOfWeek() // By day name
      .every([weekOfMonth]).weeksOfMonthByDay() // By which week of the month
    :
    date.recur()
      .every(day).daysOfWeek() // Same day every week

  return recurRule
}

export const fetchPlacesDetails = async (id, type = 'place') => {
  const source = axios.CancelToken.source()
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
    const response = await axios.get(`${apiEndpoint}${id}`, {
      cancelToken: source.token,
    }).catch(function (error) {
      // handle error
      console.log('axios error ', error && error.statusText);
      return null
    })

    let subcategory = category

    return response
  }
}

// Fetch Places from API with query params including
// - categories
// - vibes
// - search
export const fetchPlacePicks = async (
  options = {
    distance: 5,
    point: '-123.1058197,49.2801149',
    ordering: '-score_combined',
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
    is_chain = false,
    is_closed = false,
    is_destination = false,
    ordering,
    per_page,
    point,
    search,
    time,
    vibes,
    preferredVibes,
    relatedVibes,
    useNearest = false,
    useBoundaries = false
  } = options

  let distanceInMeters = 1
  if (distance > 0) distanceInMeters = distance * constants.METERS_PER_MILE
  if (activity === 'all') activity = null

  const scoreBy = ['aggregate_rating', 'vibes', 'distance', 'offers', 'hours']
  const numOfPlaces = per_page ? per_page : 100
  const hasVibes = vibes && vibes.length > 0

  let centerPoint = point.split(',').map((value) => parseFloat(value))
  let currentLocation = getLocationFromPoint(centerPoint)
  const nearestCities = sortLocations(cities, currentLocation)
  const distanceFrom = distanceBetweenLocations(nearestCities[0].location, currentLocation)

  // Use city if nearby, for better caching
  if (useNearest && distanceFrom < 20) {
    const city = nearestCities[0]
    options.point = city.centerpoint.join(',')
  }

  const apiEndpoint = useSearchAPI
    ? ApiUrl + 'search/places'
    : ApiUrl + 'places/'
  const source = axios.CancelToken.source()

  let response = {}
  const getPlaces = async (options) => {
    const params = getAPIParams(options, numOfPlaces)
    let query = querystring.stringify(params)
    console.log(`Places search query is `, `${apiEndpoint}?${query}`);

    response = await axios.get(`${apiEndpoint}?${query}`, {
      cancelToken: source.token,
    }).catch(function (error) {
      // handle error
      console.log('axios error ', error.response && error.response.statusText);

      return {
        data: [],
        count: 0,
        query: '?' + query,
        top_vibes: null,
        loading: false,
        timedOut: false,
      }
    })

    return response
  }

  response = await getPlaces(options)

  const count = response.data.count

  // FIXME: Workaround to retry with search
  if (count == 0 && hasVibes) {
    let newOptions = Object.assign({}, options)
    newOptions.search = vibes[0]
    newOptions.vibes = []

    response = await getPlaces(newOptions)
    //response = await
  }

  const placeResults = response.data && response.data.results && response.data.results.features
    ? response.data.results.features
    : []

  let places = formatPlaces(placeResults)
  //console.log('Got reponse ', response.data)

  const vibesQuery = vibes ? vibes : []

  // TODO: Consider scoring related vibe differently
  const vibesCombined = vibesQuery
    .concat(preferredVibes ? preferredVibes : [])

  const newOptions = {
    ...options,
    relatedVibes: relatedVibes
  }

  // TODO: Incorporate personalized vibe score for user
  let placesScoredAndSorted = scorePlaces(
    places,
    centerPoint,
    vibesCombined,
    scoreBy,
    ordering,
    options && options.shouldShuffle
      ? options.shouldShuffle
      : false,
    newOptions // Pass any overrides
  )

  const top_categories = getTopCategories(places)
  const top_vibes = getTopVibes(places)
  const top_locations = getTopLocations(places)

  return {
    data: placesScoredAndSorted,
    count: count,
    top_categories: top_categories,
    top_locations: top_locations,
    top_vibes: top_vibes,
    loading: false,
    timedOut: false,
  }
}

export const fetchPlacesFromSearch = async (location) => {
  const endpoint = 'https://dev.vibemap.com/search_places'
  const query = ''
  const params = new URLSearchParams([
    ['query', query],
    ['latitude', location.latitude],
    ['longitude', location.longitude]
  ])

  const response = await axios.get(`${endpoint}?${params.toString()}`)
    .catch(function (error) {
      console.log('axios error ', error.response && error.response.statusText);

      return {
        data: [],
        count: 0,
        query: '?' + query,
        top_vibes: null,
        loading: false,
        timedOut: false,
      }
    })

  return response
}

export const fetchPlacesFromIds = async (
  ids = [
    '740b43a4-3925-4413-9414-fff9d8d16932',
    'c8262c66-1a83-4d4b-a3e6-8710864ffd1f'
  ]
) => {
  // Param pattern is like this ?ids={id1}__{id2}
  const endpoint = ApiUrl + '/search/places'

  params = new URLSearchParams([
    ['ids', ids.join('__')]
  ])

  const response = await axios.get(`${endpoint}?${params.toString()}`)
    .catch(function (error) {
      console.log('axios error ', error.response && error.response.statusText);
      return {
        data: [],
        error: error,
        count: 0,
        query: '?' + params,
        top_vibes: null,
        loading: false,
        timedOut: false,
      }
    })

  const count = response.data.count
  const placeResults = response.data && response.data.results && response.data.results.features
    ? response.data.results.features
    : []

  return {
    data: placeResults,
    count: count,
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
export const formatPlaces = (places = []) => {
  // TODO: Replace with activityCategories
  
  // FIXME: Make this flat level 1 categories
  const categories = categories_flat
  const categories_top_flat = getCategoriesByLevel(2).map(category => category.slug)

  const formatted = places.map((place) => {
    let fields = place.properties
    // Add fields for presentation
    fields.place_type = 'places'
    fields.short_name = truncate(fields.name, constants.TRUCATE_LENGTH)
    fields.aggregate_rating = parseFloat(fields.aggregate_rating)
    if (fields.aggregate_rating_count == null) {
      fields.aggregate_rating_count = 1
    }
    fields.num_vibes = fields.vibes.length

    fields.sub_categories = fields.sub_categories
    fields.top_vibe = null

    const matchingCategories = fields.categories
      .map(category => {
        if (category == 'Drink') category = 'Drinking'
        return category.toLowerCase()
      })
      .filter(category => categories_top_flat.includes(category.toLowerCase()))

    const sortedCategories = sortByArray(matchingCategories, categories)
    
    if (fields.categories === undefined ||
      fields.categories.length === 0) {
      fields.categories = ['place']
    }

    // TODO: Add proper theming
    const theme = 'light'
    fields.icon = `icon_${sortedCategories[0]}_${theme}`
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
  scoreBy = ['vibes', 'aggregate_rating', 'distance'],
  ordering,
  shuffle = true,
  zoom = 12,
  options = {}
) => {
  //console.log('scorePlaces: ', places, ordering, scoreBy)

  // Default max values; These will get set by the max in each field
  let maxScores = {}

  // Bonuses between 1 and 10
  // TODO reconfigure bonus scores in a way that is more mathematically sound
  // to use zoom-weight scaling

  const vibeMatchBonus = 10
  const vibeRelatedBonus = 2
  const vibeOrderBonus = 1
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
    rating: 4,
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
      let [vibeMatches, relatedVibeMatches, averageRank, vibeBonus] = [0, 0, 0, 0]

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

        relatedVibeMatches = options.relatedVibes ?
          matchLists(options.relatedVibes, fields.vibes)
          : 0
        // The average rank scores by the order of the array
        // That is the first vibe gets ranks higher than the last one
        averageRank = rankVibes(vibes, fields.vibes)

        // Bonus for exact matches + all place vibes
        const vibeMatchScore = vibeMatches * vibeMatchBonus + relatedVibeMatches * vibeRelatedBonus
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

      if (minScores['aggregate_rating_count'] == undefined) {
        minScores['aggregate_rating_count'] = 1
        maxScores['aggregate_rating_count'] = 1
      }
      // And the count of ratings that make the score
      if (fields.aggregate_rating_count > maxScores['aggregate_rating_count']) {
        maxScores['aggregate_rating_count'] = fields.aggregate_rating_count
      }
      if (fields.aggregate_rating_count < minScores['aggregate_rating_count']) {
        minScores['aggregate_rating_count'] = fields.aggregate_rating_count
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

    if (scoreBy.includes('venue')) {
      fields.venue_score = normalize_all(fields.place_vibe_count, minScores['likplace_vibe_countes'], maxScores['place_vibe_count'], 0, 1)
    }

    // Get average rating and scale it by a factor
    if (scoreBy.includes('aggregate_rating')) {
      const aggregate_score = normalize_all(
        fields.aggregate_rating,
        minScores['aggregate_rating'],
        maxScores['aggregate_rating'],
        0, 1)

      const aggregate_rating_count_score = normalize_all(
        fields.aggregate_rating_count,
        minScores['aggregate_rating_count'],
        maxScores['aggregate_rating_count'],
        0, 1)

      //console.log('DEBUG: Combine rating score ', aggregate_score, aggregate_rating_count_score)
      fields.aggregate_rating_score = (aggregate_score + aggregate_rating_count_score) / 2
      fields.aggregate_rating_score *= weights.rating
      fields.stats['aggregate_rating_score'] = fields.aggregate_rating_score
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
    //console.log(`Top reason `, fields.name, fields.reason)

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
    console.log(' - final_score_normalized: ', place.properties.average_score)
  })
  */

  const numPlaces = placesSortedAndNormalized.length
  const results = shuffle && numPlaces > 100
    ? module.exports.shuffleTopPicks(placesSortedAndNormalized)
    : placesSortedAndNormalized

  return results
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

export const shuffleTopPicks = (places, numTop = 20) => {
  // Slice and Shuffle
  const topPlaces = places.slice(0, numTop)
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  // Store remainder
  const remainingPlaces = places.slice(numTop)

  // Combine and return all
  const placesCombined = topPlaces.concat(remainingPlaces)
  return placesCombined
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
  places_to_return.sort(function (a, b) {
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
  const within_distance = turf_distance(currentLocation, placePoint) < threshold ? true : false
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
    if (neigh_dist < 5 && in_bbox_helper(place.geometry.coordinates, neighborhood.boundary)) {
      valid_neighborhoods_id.push(neighborhood.id)
      valid_neighborhoods_name.push(neighborhood.slug)
    } else if (neighborhood.radius > 0.00001 && neigh_dist < neighborhood.radius) {
      //console.log("radius checked")
      valid_neighborhoods_id.push(neighborhood.id)
      valid_neighborhoods_name.push(neighborhood.slug)
    } else if (neigh_dist < 0.8) {
      //console.log("dist checked")
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
    return {
      name: neighborhood.name,
      neigh_dist: turf_distance([neighborhood.map.lng, neighborhood.map.lat], placePoint)
    }
  })
  neighborhoods_ordered.sort(function (a, b) {
    return a.neigh_dist - b.neigh_dist
  })
  return neighborhoods_ordered.slice(0, 10)
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

/**
 * Cities from Mapbox by keyword or name
 *
 * @param {String} search
 *
 * @returns {Object[]}
 */
export const searchCities = async (search = '') => {
  const endpoint = `https://dev.vibemap.com/search_locations/?city=${search}`
  const distanceForMatch = 10
  const response = await axios.get(endpoint).catch(error => {
    console.log(`error `, error)
    return {
      error: true,
      data: error
    }
  })

  const results = response.data.map(newCity => {    

    const foundCity = cities.find(city => city.name.includes(newCity.name))
    if (foundCity) {
      const checkDistance = distanceBetweenLocations(newCity.location, foundCity.location)
      if (checkDistance < distanceForMatch) {
        return foundCity
      }
    }
    // TODO: Make this fuzzy search on a new service 
    let foundNeighborhood = neighborhoods.find(neighborhood => {
      return neighborhood.name.toLowerCase().includes(newCity.name.toLowerCase())
    })       
    
    return newCity
  })  

  return results
}

export const getAllBoundaries = async () => {
  const endpoint = `https://api.vibemap.com/v0.3/boundaries/?admin_level=both`
  const response = await axios.get(endpoint).catch(error => {
    console.log(`error `, error)
  })  

  return response.data
}

export const getBoundary = async (slug = 'chicago') => {
  const endpoint = `https://api.vibemap.com/v0.3/boundaries/?admin_level=both&slug=${slug}`
  const response = await axios.get(endpoint).catch(error => {
    console.log(`error `, error)
  })

  if (response && response.data) {
    try {
      const boundary = response.data.results[0] || null
      return boundary
    } catch (error) {
      console.log('Problem with boundary data ', error);
      return null
    }
          
  } else {
    return null
  }  
}

export const searchPlacesByName = async (options, apiURL) => {

  const centerPoint = options.point ? options.point.split(',').map(parseFloat) : ''
  let retries = 3

  let searchParams = {
    ordering: 'name',
    category: options.category || '',
    per_page: options.perPage || 50,
    dist: options.distance > 0 ? options.distance * constants.METERS_PER_MILE : '',
    point: centerPoint,
    search: options.search || '',
    vibes: options.vibes || '',
    zoom: options.zoom || '',
  }

  let apiResult

  const useElastic = true
  const apiPath = useElastic ? 'search/places' : 'places'

  do {
    const searchQuery = new URLSearchParams(searchParams).toString()
    apiResult = await axios.get(`${apiURL}/${apiPath}/?${searchQuery}`)
      .catch(function (error) {
        console.log('axios error ', error.response && error.response.statusText);

        return []
      })

    retries--
    searchParams.dist /= 2
  } while (retries > 0 && !apiResult.count)

  const results = apiResult.data
    ? apiResult.data.results.features
    : []
  return results
}


/**
 * Gets related vibes for a neighborhood and sorts neighborhoods
 * by vibe intersection count between related and neighborhood vibes.
 *
 * @param {Object[]} neighborhoods
 * @param {String[]} vibeSlugs
 *
 * @returns {Object[]}
 */
export const sortNeighborhoodsByVibes = (neighborhoods, vibeSlugs) => {
  if (vibeSlugs.length === 0) return neighborhoods

  const relatedVibeSlugs = getRelatedVibes(vibeSlugs)
  const vibeSlugsToIntersect = [...new Set([...vibeSlugs, ...relatedVibeSlugs])]

  // add vibeIntersection property
  const neighborhoodsWithVibeIntersection = neighborhoods.map(
    (neighborhood) => {
      const neighborhoodVibes = neighborhood.vibes || neighborhood.acf.vibes
      const neighborhoodVibeSlugs = neighborhoodVibes.map(({ slug }) => slug)

      const vibeIntersection = vibeSlugsToIntersect.filter((slug) =>
        neighborhoodVibeSlugs.includes(slug)
      ).length

      return {
        ...neighborhood,
        vibeIntersection
      }
    }
  )

  const sortedNeighborhoods = neighborhoodsWithVibeIntersection.sort((a, b) =>
    b.vibeIntersection - a.vibeIntersection
  )

  // remove vibeIntersection property (just to not alter previous structure)
  return sortedNeighborhoods.map((neighborhood) => {
    const { vibeIntersection, ...restOfNeighborhood } = neighborhood
    return restOfNeighborhood
  })
}
