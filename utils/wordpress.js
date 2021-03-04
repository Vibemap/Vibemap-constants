import Axios from "axios"

const GATSBY_WP_BASEURL = 'https://cms.vibemap.com'
const REST_PATH = '/wp-json/wp/v2/'
const WPGRAPHQL_URL = 'https://cms.vibemap.com/graphql'

// TODO: Sort by location
// TODO: SOrt by vibe match 
export const fetchNeighborhoods = async (filters = {}) => {

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

export async function getPosts() {
  const endpoint = `${GATSBY_WP_BASEURL}${REST_PATH}posts`

  // Sticky posts to be shown first
  let top_posts = await Axios.get(endpoint, {
    params: { 
      per_page: 20, 
      sticky: true 
    }
  }).catch(error => console.error(error))

  // All other recent posts
  let recent_posts = await Axios.get(endpoint, {
    params: {
      per_page: 20,
      sticky: false
    }
  }).catch(error => console.error(error))

  // Put stick posts on top
  recent_posts.data = top_posts.data.concat(recent_posts.data)
  
  return recent_posts
}
