'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Axios__default = /*#__PURE__*/_interopDefaultLegacy(Axios);

const GATSBY_WP_BASEURL = 'https://cms.vibemap.com';
const REST_PATH = '/wp-json/wp/v2/';

const defaultFilters = {
  categories: [],
  cities: [],
  vibesets: []
};
const fetchCities = async () => {
  const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}city`;
  const response = await Axios__default['default'].get(endpoint)
      .catch(error => console.error(error));
  
  return response
};

// TODO: Sort by location
// TODO: SOrt by vibe match 
const fetchNeighborhoods = async (filters = defaultFilters) => {

    const postsPerPage = 20;

    //console.log('fetchNeighborhoods: ', filters)

    // TODO: Filter by vibe or other attributes
    const source = Axios__default['default'].CancelToken.source();

    let response = await Axios__default['default'].get(`${GATSBY_WP_BASEURL}/wp-json/wp/v2/neighborhoods`, {
        cancelToken: source.token,
        params: {
          _embed: true,
          per_page: postsPerPage,
          page:  1,
          //before: buildTime, // Let's make sure posts that have a page built are the only ones being pulled in.
          categories: filters.category,
          vibesets: filters.vibesets.toString(),
          //vibe: 1073, //TODO: Filter by vibe taxonomy
          cities: filters.cities.toString(),
        },
      })
      .catch(error => {
        console.error(error);
      });

    response.numPages = parseInt(response.headers["x-wp-totalpages"]);

    return response
};

const fetchVibeTaxonomy = async () => {
    const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}vibe`;
    const response = await Axios__default['default'].get(endpoint)
        .catch(error => console.error(error));
    
    return response
};

async function getPosts(stickyOnly=false) {
  const endpoint = `${GATSBY_WP_BASEURL}${REST_PATH}posts`;

  // Sticky posts to be shown first
  let top_posts = await Axios__default['default'].get(endpoint, {
    params: { 
      per_page: 20, 
      sticky: true 
    }
  }).catch(error => console.error(error));

  // All other recent posts
  let recent_posts = await Axios__default['default'].get(endpoint, {
    params: {
      per_page: 20,
      sticky: false
    }
  }).catch(error => console.error(error));

  // Only sticky posts
  if (stickyOnly === true) {
    return top_posts
  }

  // Put stick posts on top
  recent_posts.data = top_posts.data.concat(recent_posts.data);
  
  return recent_posts
}

exports.fetchCities = fetchCities;
exports.fetchNeighborhoods = fetchNeighborhoods;
exports.fetchVibeTaxonomy = fetchVibeTaxonomy;
exports.getPosts = getPosts;
