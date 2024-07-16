import Axios from "axios"
import axiosRetry from 'axios-retry'

axiosRetry(Axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay
})

const jsonpack = require('jsonpack')

const GATSBY_WP_BASEURL = 'https://cms.vibemap.com'
const REST_PATH = '/wp-json/wp/v2/'

//import cities from '../dist/cities.json'
const helpers = require('./helpers.js')
const cities = helpers.cities

// Cached Wordpress taxonomies for reference
// Note: this data is stored everytime this library is versioned.
const postCategories = require('../dist/postCategories')

let vibeTaxonomy = []
let activityCategories = []

try {
  const vibeTaxonomyPacked = require('../dist/vibesFromCMSTaxonomy.zip.json')
  vibeTaxonomy = jsonpack.unpack(vibeTaxonomyPacked)
} catch (error) {
  console.log('Error with packed vibes ', error)
}

try {
  const activityCategoriesPacked = require('../dist/activityCategories.zip.json')
  activityCategories = jsonpack.unpack(activityCategoriesPacked)
} catch (error) {
  console.log('Error with packed activityCategories ', error)
}

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
        const matches = helpers.filterList(helpers.cities, slug, 'slug', true)

        const found_id = matches.map(match => match && match.id_wordpress ? match.id_wordpress : match.id)
        return matches.length > 0
          ? found_id
          : []

      })
      break;

    default:
      break;
  }
  return []
}

export const fetchBadges = async (per_page = 100) => {
  // const cityFilters = '?_fields=id, link, name, slug, title, acf'

  const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}badges?per_page=${per_page}`
  const response = await Axios.get(endpoint)
    .catch(error => console.error(error))

  return response
}

export const fetchCities = async (per_page = 100) => {
  const cityFilters = `?_fields=id, link, name, radius, slug, title, acf, type
      &per_page=${per_page}`

  const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}city${cityFilters}`
  const response = await Axios.get(endpoint)
    .catch(error => console.error(error))

  return response
}

// TODO: Sort by location
// TODO: SOrt by vibe match
export const fetchNeighborhoods = async (filters = defaultFilters, page = 1, postsPerPage = 10) => {
  //console.log('fetchNeighborhoods: ', filters)
  // TODO: Filter by vibe or other attributes

  const fetchData = async (page = 1) => {
    // https://cms.vibemap.com/wp-json/acf/v3/neighborhoods
    const fields = ['id', 'slug', 'type', 'link', 'title', 'categories', 'vibe', 'acf', 'featured_media', 'featured_media_src_url']
    const apiFilters = `?_fields=${fields.join(',')}`
    const path = `wp-json/wp/v2/neighborhoods`
    const random = Math.random()
    const url = `${GATSBY_WP_BASEURL}/${path}${apiFilters}&refresh=${random}`

    let response = await Axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': 'PHPSESSID=fc445d3668b82ce450818bff8f864d1d'
      },
      maxBodyLength: Infinity,
      params: {
        _embed: false,
        fields: fields.join(','),
        per_page: postsPerPage,
        page: page >= 1 ? page : 1,
        //before: buildTime, // Let's make sure posts that have a page built are the only ones being pulled in.
        categories: filters.category,
        vibesets: filters.vibesets.toString(),
        //vibe: 1073, //TODO: Filter by vibe taxonomy
        //cities: getTaxonomyIds('cities', filters.cities).toString(),
        //cities: filters.cities.toString(),
      },
    }).catch(error => {
      console.error(error)
    })

    response.numPages = parseInt(response.headers["x-wp-totalpages"])

    return response.data
  }

  let combinedData = await fetchData(page, postsPerPage);

  let hasNext = true;
  let nextData = [];
  let next_page = page;
  // Handle pagination
  console.log(`Has more?  `, combinedData.length, next_page * postsPerPage);
  while (hasNext) {
    if (combinedData.length >= (next_page * postsPerPage)) {
      next_page = next_page + 1;
      nextData = await fetchData(next_page)
        .catch(error => console.error(error));

      combinedData = combinedData.concat(nextData);
      //console.log('Updated combinedData ', combinedData.length, nextData.length)
    } else {
      hasNext = false;
    }
  }

  /* Get with Graphql?
  const url_graphql = `https://vibemap.wpengine.com/graphql`
  console.log('Wordpress URL ', url_graphql)
  const data = await Axios.post(url_graphql, {
    query: `
      query NewQuery {
        neighborhoods {
          edges {
            node {
              databaseId
              id
              link
              slug
              neighborhood {
                boundary
                description
                name
                radius
                zoom
                vibes {
                  name
                  slug
                }
                map {
                  latitude
                  longitude
                  zoom
                }
              }
            }
          }
        }
      }
    `
  }).catch(error => console.error(error)) */

  return combinedData
}

// Get post categories
export const fetchActivityCategories = async (
  filters = defaultFilters,
  page = 1,
  per_page = 100,
  postsPerPage = 500
) => {
  const fetchData = async (page = 1, per_page = 100) => {
    // Fetch all activity categories and subcategories
    const source = Axios.CancelToken.source()
    const rest_slug = 'activity-category'
    const random = Math.random()
    const rest_url = `${GATSBY_WP_BASEURL}/wp-json/wp/v2/${rest_slug}?per_page=${per_page}&page=${page}&refresh=${random}`
    console.log(`Fetching ${rest_slug} from ${rest_url}`)
    let response = await Axios.get(rest_url, { cancelToken: source.token })
      .catch(error => { console.error(error) })

    return response.data
  }

  let combinedData = await fetchData(page, per_page);

  let hasNext = true;
  let nextData = [];
  let next_page = page;
  // Handle pagination
  console.log(`Has more?  `, combinedData.length, next_page * per_page);
  while (hasNext) {
    if (combinedData.length >= (next_page * per_page)) {
      next_page = next_page + 1;
      nextData = await fetchData(next_page)
        .catch(error => console.error(error));

      combinedData = combinedData.concat(nextData);
      //console.log('Updated combinedData ', combinedData.length, nextData.length)
    } else {
      hasNext = false;
    }
  }

  console.log('Got this many activities: ', combinedData.length)
  return combinedData
}

// Get post categories
export const fetchCategories = async (
  filters = defaultFilters,
  page = 1,
  postsPerPage = 100
) => {
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
  fields = ['acf', 'id', 'link', 'name', 'slug', 'description'],
  clearCache = true
) => {

  const fetchData = async (page = 1, per_page = 100) => {
    const date = new Date()
    const taxonomyFilters = `?_fields=${fields.join(',')}&per_page=${per_page}&page=${page}`;
    const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}vibe${taxonomyFilters}${clearCache ? '&' + date.toISOString() : ''}`;
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
  per_page = 100,
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
      console.error(error.response.statusText)
      return {
        error: true,
        data: {
          data: []
        },
        message: error
      }
    })

  const data = response.data

  const dataByCity = data && typeof (data) === 'object'
    ? data.filter(group => {
      if (group.acf.map && city) {
        const isMatch = city == group.acf.map.city
        return isMatch
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
  clearCache = false
) => {
  const embedParameter = embed ? '&_embed' : ''
  const apiFilters = `?_fields=${fields.join(',')}`
  const date = new Date()
  const endpoint = `${GATSBY_WP_BASEURL}${REST_PATH}posts${apiFilters}${embedParameter}${clearCache ? '&' + date.toISOString() : ''}`

  console.log("GET POSTS FILTERS", filters)
  // Sticky posts to be shown first
  // TODO: Filter by the vibe or just score by it?\
  const cityId = filters.wordpress_id ?? getTaxonomyIds('cities', filters.cities).toString()
  const paramsOverride = {
    per_page: per_page,
    // returns a city ID and converts to string
    // TODO: Issue is, getTaxonomyIds uses filters.cities which is a name of a city. Then calls on helpers.filterList which regexes that name, compares against static cities.json in vibemap-constants, to return ID
    // this does the wrong thing for cities like Portland, ME vs Portland, OR
    cities: cityId,
    sticky: true
  }

  if (filters.category && filters.category.length > 0) {
    paramsOverride.category = getTaxonomyIds('category', filters.category).toString()
  }


  let top_posts = await Axios.get(endpoint, {
    params: paramsOverride,
  }).catch((error) => {
    console.error(`Wordpress error`, error)
  })

  paramsOverride.sticky = false

  console.log('getPosts endpoint', endpoint, paramsOverride)

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
