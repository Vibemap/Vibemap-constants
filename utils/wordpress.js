import Axios from "axios"
import filter from 'lodash.filter'

const GATSBY_WP_BASEURL = 'https://cms.vibemap.com'
const REST_PATH = '/wp-json/wp/v2/'

//import * as helpers from '../dist/helpers.js';

const helpers = require('./helpers.js')

// Cached Wordpress taxonomies for reference
// Note: this data is stored everytime this library is versioned.
const postCategories = require('../dist/postCategories')
import vibeTaxonomy from '../dist/vibeTaxonomy.json'
import cities from '../dist/cities.json'

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
    console.log('Filtering neighborhoods by: ', filters)

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

  //console.log('Got response: ', response)

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

export const fetchVibeTaxonomy = async () => {
    const taxonomyFilters = '?_fields=id, link, name, slug'
    const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}vibe${taxonomyFilters}`;

    const response = await Axios.get(endpoint)
        .catch(error => console.error(error))

    return response
}

export async function getPosts(filters = defaultFilters, stickyOnly = false, per_page = 20) {

  const apiFilters = '?per_page=20&_fields=id, date, slug, status, type, link, title, content, excerpt, author, categories, vibe, blocks, acf, _links, featured_media, featured_media_src_url'
  const endpoint = `${GATSBY_WP_BASEURL}${REST_PATH}posts${apiFilters}`

  // Sticky posts to be shown first
  // TODO: Filter by the vibe or just score by it?
  const paramsOverride = {
    per_page: per_page,
    cities: getTaxonomyIds('cities', filters.cities).toString(),
    sticky: true
  }

  if (filters.vibe && filters.vibe.length > 0) {
    paramsOverride.vibe = getTaxonomyIds('vibe', filters.vibe).toString()
  }

  let top_posts = await Axios.get(endpoint, {
    params: paramsOverride
  }).catch(error => console.error(error))

  // All other recent posts

  paramsOverride.sticky = false

  let recent_posts = await Axios.get(endpoint, {
    params: paramsOverride
  }).catch(error => console.error(error))

  const excludeHiddenPosts = recent_posts.data
    .filter(post => post.acf.hide_post !== true)
    .map(post => {
      // Look up display category in cached taxonomy
      const findCategory = postCategories.filter(category => category.id === post.categories[0])
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
