import Axios from "axios"

const GATSBY_WP_BASEURL = 'https://cms.vibemap.com'
const REST_PATH = '/wp-json/wp/v2/'
const WPGRAPHQL_URL = 'https://cms.vibemap.com/graphql'

import * as helpers from '../dist/helpers.js';

// Cached Wordpress taxonomies for reference
// Note: this data is stored everytime this library is versioned.
import vibeTaxonomy from '../dist/vibeTaxonomy.json'

const defaultFilters = {
  categories: [],
  cities: [],
  vibesets: [],
  vibe: []
}

// Get a list of Wordpress taxonomy or category ids by slug
// If empty, i.e. the slug isn't use, returns an empty array, 
// which will search for everything. 
export const getTaxonomyIds = (type, filter) => {
  
  switch (type) {
    case 'vibe':
      return filter.map(slug => {
        // Find taxonomy that match slug
        const matches = helpers.filterList(vibeTaxonomy, slug, 'slug')
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

export const fetchCities = async () => {
  const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}city`
  const response = await Axios.get(endpoint)
      .catch(error => console.error(error))
  
  return response
}

// TODO: Sort by location
// TODO: SOrt by vibe match 
export const fetchNeighborhoods = async (filters = defaultFilters) => {

    const postsPerPage = 20
    const page = 1

    //console.log('fetchNeighborhoods: ', filters)

    // TODO: Filter by vibe or other attributes
    const source = Axios.CancelToken.source()

    let response = await Axios.get(`${GATSBY_WP_BASEURL}/wp-json/wp/v2/neighborhoods`, {
        cancelToken: source.token,
        params: {
          _embed: true,
          per_page: postsPerPage,
          page: page !== 1 ? page : 1,
          //before: buildTime, // Let's make sure posts that have a page built are the only ones being pulled in.
          categories: filters.category,
          vibesets: filters.vibesets.toString(),
          //vibe: 1073, //TODO: Filter by vibe taxonomy
          cities: filters.cities.toString(),
        },
      })
      .catch(error => {
        console.error(error)
      })

    response.numPages = parseInt(response.headers["x-wp-totalpages"])

    return response
}

export const fetchVibeTaxonomy = async () => {
    const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}vibe`
    const response = await Axios.get(endpoint)
        .catch(error => console.error(error))
    
    return response
}

export async function getPosts(filters = defaultFilters, stickyOnly = false) {
  
  const endpoint = `${GATSBY_WP_BASEURL}${REST_PATH}posts`

  // Sticky posts to be shown first
  // TODO: Filter by the vibe or just score by it?
  let top_posts = await Axios.get(endpoint, {
    params: { 
      per_page: 20,
      vibe: getTaxonomyIds('vibe', filters.vibe).toString(),
      sticky: true 
    }
  }).catch(error => console.error(error))

  // All other recent posts
  let recent_posts = await Axios.get(endpoint, {
    params: {
      per_page: 20,
      vibe: getTaxonomyIds('vibe', filters.vibe).toString(),
      sticky: false
    }
  }).catch(error => console.error(error))

  // Only sticky posts
  if (stickyOnly === true) {
    return top_posts
  }

  // Put stick posts on top
  recent_posts.data = top_posts.data.concat(recent_posts.data)  
  
  console.log('recent_posts.data length: ', recent_posts.data.length)

  return recent_posts
}
