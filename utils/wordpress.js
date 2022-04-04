import Axios from "axios"
import axiosRetry from 'axios-retry'

axiosRetry(Axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay
})

const jsonpack = require('jsonpack')

const GATSBY_WP_BASEURL = 'https://cms.vibemap.com'
const REST_PATH = '/wp-json/wp/v2/'

const helpers = require('./helpers.js')

// Cached Wordpress taxonomies for reference
// Note: this data is stored everytime this library is versioned.
const postCategories = require('../dist/postCategories')

let vibeTaxonomy = []

try {
  const vibeTaxonomyPacked = require('../dist/vibesFromCMSTaxonomy.zip.json')
  vibeTaxonomy = jsonpack.unpack(vibeTaxonomyPacked)
} catch (error) {
  console.log('Error with packed vibes ', error)
}

import { activityCategories } from '../dist/activityCategories.json'

import cities from '../dist/cities.json'

const defaultFilters = {
  categories: [],
  cities: [],
  vibesets: [],
  vibes: []
}

// Get a list of Wordpress taxonomy or category ids by slug
// If empty, i.e. the slug isn't use, returns an empty array,
// which will search for everything.
export const getTaxonomyIds = (type, filter = ['chill']) => {
  switch (type) {
    case 'category':
      return filter.map(slug => {
        // Find taxonomy that match slug
        const matches = helpers.filterList(activityCategories, slug, 'slug');
        return matches.length > 0
          ? matches.map(match => match.id)
          : []
      })

    case 'vibe':
      return filter.map(slug => {
        // Find taxonomy that match slug
        const matches = helpers.filterList(vibeTaxonomy, slug, 'slug')
        return matches.length > 0
          ? matches.map(match => match.id)
          : []
      })
      break;

    case 'cities':
      return filter.map(slug => {
        // Find taxonomy that match slug
        const matches = helpers.filterList(cities, slug, 'slug')

        return matches.length > 0
          ? matches.map(match => match.id)
          : []

      })
      break;

    default:
      break;
  }
  return []
}

export const fetchBadges = async () => {
  // const cityFilters = '?_fields=id, link, name, slug, title, acf'

  const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}badges`
  const response = await Axios.get(endpoint)
    .catch(error => console.error(error))

  return response
}

export const fetchCities = async (per_page = 50) => {
  const cityFilters = `?_fields=id, link, name, slug, title, acf, type
    &per_page=${per_page}`

  const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}city${cityFilters}`
  const response = await Axios.get(endpoint)
      .catch(error => console.error(error))

  return response
}

// TODO: Sort by location
// TODO: SOrt by vibe match
export const fetchNeighborhoods = async (filters = defaultFilters, page = 1, postsPerPage = 100) => {
    //console.log('fetchNeighborhoods: ', filters)
    // TODO: Filter by vibe or other attributes
    const source = Axios.CancelToken.source()
    //console.log('Filtering neighborhoods by: ', filters)

    // TODO: Use the ACF endpoint instead:
    // https://cms.vibemap.com/wp-json/acf/v3/neighborhoods
    const apiFilters = '?_fields=id, slug, type, link, _links, title, categories, vibe, acf, content, featured_media, featured_media_src_url'
    const url = `${GATSBY_WP_BASEURL}/wp-json/wp/v2/neighborhoods${apiFilters}`
    console.log('Wordpress URL ', url)
    let response = await Axios.get(url, {
        cancelToken: source.token,
        params: {
          _embed: true,
          per_page: postsPerPage,
          page: page >= 1 ? page : 1,
          //before: buildTime, // Let's make sure posts that have a page built are the only ones being pulled in.
          categories: filters.category,
          vibesets: filters.vibesets.toString(),
          //vibe: 1073, //TODO: Filter by vibe taxonomy
          //cities: getTaxonomyIds('cities', filters.cities).toString(),
          //cities: filters.cities.toString(),
        },
      })
      .catch(error => {
        console.error(error)
      })

    response.numPages = parseInt(response.headers["x-wp-totalpages"])

    return response
}

// Get post categories
export const fetchActivityCategories = async (
  filters = defaultFilters,
  page = 1,
  per_page = 100,
  postsPerPage = 500
) => {
  // Fetch all activity categories and subcategories
  const source = Axios.CancelToken.source()
  const rest_slug = 'activity-category'
  const rest_url = `${GATSBY_WP_BASEURL}/wp-json/wp/v2/${rest_slug}?per_page=${per_page}`
  let response = await Axios.get(rest_url, {
    cancelToken: source.token,
  })
  .catch(error => {
    console.error(error)
  })

  //console.log('Got response: ', response)
  response.numPages = parseInt(response.headers["x-wp-totalpages"])

  return response
}

// Get post categories
export const fetchCategories = async (filters = defaultFilters, page = 1, postsPerPage = 100) => {
  //console.log('fetchNeighborhoods: ', filters)

  // TODO: Filter by vibe or other attributes
  const source = Axios.CancelToken.source()

  let response = await Axios.get(`${GATSBY_WP_BASEURL}/wp-json/wp/v2/categories/`, {
      cancelToken: source.token,
    })
    .catch(error => {
      console.error(error)
    })

  response.numPages = parseInt(response.headers["x-wp-totalpages"])

  return response
}

export const getCityInfo = (name = 'San Francisco', slug = null) => {
  let city = null
  if (slug) {
      // Handle both string and array
      slug = slug.toString()
      // Filter cities in wordpress
      const findCitySlug = cities.filter(result => result.slug === slug.toString())
      city = findCitySlug.length > 0 ? findCitySlug[0] : null
  } {
      const findCityName = cities.filter(result => result.name === name)
      city = findCityName.length > 0 ? findCityName[0] : null
  }

  return city
}

export const filterNeighborhoods = (neighborhoods, city = 'San Francisco', slug = null) => {
  // Look up city by slug
  if (slug) {
    // Handle both string and array
    slug = slug.toString()
    // Filter cities in wordpress
    const findCitySlug = cities.filter(result => result.slug === slug.toString())
    city = findCitySlug.length > 0 ? findCitySlug[0].title.rendered : null
  }

  // Template of the array objects
  // return {
  //   id: neighborhood.id,
  //   title: neighborhood.title.rendered,
  //   subtitle: 'Neighborhood',
  //   imageUrl: image,
  //   url: neighborhood.link.replace(/^(?:\/\/|[^/]+)*/, ''),
  //   slug: neighborhood.slug,
  //   city: neighborhood.acf.map.city,
  // };
  const filterPredicate = (neighborhood) => neighborhood.city === city || neighborhood.title.includes(city)

  // Return all, if there's not city filter
  if (city || slug) {
    return filter(neighborhoods, filterPredicate)
  } else {
    return neighborhoods
  }
}

export const fetchVibeTaxonomy = async (
  page = 1,
  per_page = 100,
  fields = ['acf', 'id', 'link', 'name', 'slug', 'description']
) => {

  const fetchData = async (page = 1, per_page = 100) => {
    const taxonomyFilters = `?_fields=${fields.join(',')}&per_page=${per_page}&page=${page}`;
    const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}vibe${taxonomyFilters}`;
    //console.log('fetchVibeTaxonomy ', endpoint)
    const response = await Axios.get(endpoint)
      .catch(error => console.error(error))

    return response.data
  }

  let combinedData = await fetchData(page, per_page)

  let hasNext = true
  let nextData = []
  let next_page = page
  // Check for next page, else return combined
  while (hasNext) {
    //console.log('Really has next? ', combinedData.length, (next_page * per_page))
    if (combinedData.length >= (next_page * per_page)) {
      next_page = next_page + 1
      nextData = await fetchData(next_page)
        .catch(error => console.error(error))

      combinedData = combinedData.concat(nextData)
      //console.log('Updated combinedData ', combinedData.length, nextData.length)
    } else {
      hasNext = false
    }
  }
  //console.log('return combinedData ', combinedData)
  return combinedData
}

export const getGroups = async ({
  eventsOnly = false,
  city = null,
  per_page=100,
  search = '',
} = {}) => {

  /* TODO: GraphQL is too slow
  const query = {
    "operationName": "GroupEvents",
    "query": `query GroupEvents($search: String!) {
      groups(where: {
        search: $search
      }) {
        edges {
          node {
            id: databaseId
            slug
            title
            groupDetails {
              city {
                ...on City {
                  slug
                }
              }
              day
              description
              image: icon {
                mediaItemUrl
              }
              isActive
              hasEvents
              hasLocation
              link
              numMembers
              recurring
              recurrence
              which
              startTime
              endTime
              price
              rewards
              vibes {
                slug
              }
              name
              map {
                latitude
                longitude
                streetAddress
              }
            }
          }
        }
      }
    }
    `,
    "variables": {
      search: search
    }
  }

  const response = await Axios({
    url: 'https://cms.vibemap.com/graphql',
    method: 'post',
    data: query
  }).catch((error) => {
    console.log(`Error fetching events `, error.response)
    return {
      error: true,
      data: {
        data: []
      },
      message: error
    }
  })

  const data = response.data
    && response.data.data
    && response.data.data.groups
    && response.data.data.groups.edges
  */
  const filters = `?_fields=id,date,slug,title,acf&per_page=${per_page}`

  const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}group${filters}`
  const response = await Axios.get(endpoint)
    .catch(error => {
      console.error(error.res.statusMessage)
      return {
        error: true,
        data: {
          data: []
        },
        message: error
      }
    })

  const data = response.data

  const dataByCity = data
    ? data.filter(group => {
      if (group.acf.map && city) {
        return (city === group.acf.map.city)
      } else {
        // Return everyting if there's no cit
        group.title = group.title.rendered;
        return true
      }
    })
    : []

  if (dataByCity) {
    return {
      error: false,
      data: dataByCity,
      message: `Got ${dataByCity.length} groups`
    }
  } else {
    return {
      error: true,
      data: [],
      message: `No data for groups`
    }
  }
}

export const getPosts = async (
  //args
  filters = defaultFilters,
  stickyOnly = false,
  per_page = 20,
  fields = [
    'id',
    'date',
    'slug',
    'status',
    'type',
    'link',
    'title',
    'content',
    'excerpt',
    'author',
    'categories',
    'vibe',
    'blocks',
    'acf',
    'featured_media',
    'featured_media_src_url',
  ],
  embed = false,
) => {
  const embedParameter = embed ? '&_embed' : ''
  const apiFilters = `?_fields=${fields.join(',')}`
  const endpoint = `${GATSBY_WP_BASEURL}${REST_PATH}posts${apiFilters}${embedParameter}`

  // Sticky posts to be shown first
  // TODO: Filter by the vibe or just score by it?
  const paramsOverride = {
    per_page: per_page,
    cities: getTaxonomyIds('cities', filters.cities).toString(),
    sticky: true
  }

  if (filters.category && filters.category.length > 0) {
    paramsOverride.category = getTaxonomyIds('category', filters.category).toString()
  }

  if (filters.vibes && filters.vibes.length > 0) {
    // TODO: User a more strict vibe search in some cases
    // paramsOverride.vibe = getTaxonomyIds('vibe', filters.vibes).toString()
    paramsOverride.search = filters.vibes.join(', ')
  }

  let top_posts = await Axios.get(endpoint, {
    params: paramsOverride,
  }).catch((error) => {
    console.error(`Wordpress error`, error)
  })

  paramsOverride.sticky = false

  let recent_posts = await Axios.get(endpoint, {
    params: paramsOverride,
  }).catch((error) => console.error(error))

	// TODO: Sort by vibe match
  const excludeHiddenPosts = recent_posts.data
    .filter((post) => post.acf.hide_post !== true)
    .map((post) => {
      // Look up display category in cached taxonomy
      const findCategory = postCategories.filter(
        (category) => category.id === post.categories[0]
      );
      post.category = findCategory ? findCategory[0].name : 'Guide'

      return post
    })

  // Only sticky posts
  if (stickyOnly === true) {
    return top_posts
  }

  // Put stick posts on top
  recent_posts.data = recent_posts
    ? top_posts.data.concat(excludeHiddenPosts)
    : top_posts

  return recent_posts
}

export const getPost = async (id) => {
  const query = {
    "operationName": "PostDetails",
    "query": `query PostDetails($id: String!) {
      posts {
        nodes {
          id
          slug
        }
      }
    }
    `,
    "variables": { id: id }
  }
  Axios({
    url: 'https://cms.vibemap.com/graphql',
    method: 'post',
    data: query
  }).then((result) => {
    console.log(result.data)
  });
}
