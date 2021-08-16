'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Axios = require('axios');
var filter = require('lodash.filter');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Axios__default = /*#__PURE__*/_interopDefaultLegacy(Axios);
var filter__default = /*#__PURE__*/_interopDefaultLegacy(filter);

var vibeTaxonomy = [
	{
		id: 3033,
		link: "https://cms.vibemap.com/features/vibe/accessible/",
		name: "accessible",
		slug: "accessible"
	},
	{
		id: 4111,
		link: "https://cms.vibemap.com/features/vibe/aquatic/",
		name: "aquatic",
		slug: "aquatic"
	},
	{
		id: 3008,
		link: "https://cms.vibemap.com/features/vibe/art/",
		name: "art",
		slug: "art"
	},
	{
		id: 2224,
		link: "https://cms.vibemap.com/features/vibe/artistic/",
		name: "artistic",
		slug: "artistic"
	},
	{
		id: 3021,
		link: "https://cms.vibemap.com/features/vibe/artsy/",
		name: "artsy",
		slug: "artsy"
	},
	{
		id: 3024,
		link: "https://cms.vibemap.com/features/vibe/beautiful/",
		name: "beautiful",
		slug: "beautiful"
	},
	{
		id: 1953,
		link: "https://cms.vibemap.com/features/vibe/botanical/",
		name: "botanical",
		slug: "botanical"
	},
	{
		id: 1100,
		link: "https://cms.vibemap.com/features/vibe/buzzing/",
		name: "buzzing",
		slug: "buzzing"
	},
	{
		id: 1060,
		link: "https://cms.vibemap.com/features/vibe/chill/",
		name: "Chill",
		slug: "chill"
	},
	{
		id: 3673,
		link: "https://cms.vibemap.com/features/vibe/city-life/",
		name: "City Life",
		slug: "city-life"
	}
];

var cities = [
	{
		id: 38387,
		slug: "austin",
		type: "early",
		link: "https://cms.vibemap.com/cities/austin/",
		title: {
			rendered: "Austin"
		},
		location: {
			latitude: 41.8781136,
			longitude: -87.6297982
		},
		mailchimp_id: "1d933c234f",
		database_id: "31c71dc4-b861-42a3-b722-03d52894fc24",
		name: "Austin"
	},
	{
		id: 38380,
		slug: "denver",
		type: "early",
		link: "https://cms.vibemap.com/cities/denver/",
		title: {
			rendered: "Denver"
		},
		location: {
			latitude: 39.7392358,
			longitude: -104.990251
		},
		mailchimp_id: "b576abf895",
		database_id: "56a56e10-460e-40d0-a72f-58b04bd051b4",
		name: "Denver"
	},
	{
		id: 38148,
		slug: "chicago",
		type: "early",
		link: "https://cms.vibemap.com/cities/chicago/",
		title: {
			rendered: "Chicago"
		},
		location: {
			latitude: 41.8781136,
			longitude: -87.6297982
		},
		mailchimp_id: "b865b3ef72",
		database_id: "56a56e10-460e-40d0-a72f-58b04bd051b4",
		name: "Chicago"
	},
	{
		id: 38143,
		slug: "new-york",
		type: "early",
		link: "https://cms.vibemap.com/cities/new-york/",
		title: {
			rendered: "New York"
		},
		location: {
			latitude: 40.7127610684055,
			longitude: -74.0060103509262
		},
		mailchimp_id: "56ebd9923f",
		database_id: "4505fd97-4768-47bf-b653-e8da5e381d4c",
		name: "New York"
	},
	{
		id: 38137,
		slug: "san-diego",
		type: "early",
		link: "https://cms.vibemap.com/cities/san-diego/",
		title: {
			rendered: "San Diego"
		},
		location: {
			latitude: 32.715738,
			longitude: -117.1610838
		},
		mailchimp_id: "7fb6e2a465",
		database_id: "2f86fd6b-3cdc-41f3-92ae-b41dc2101662",
		name: "San Diego"
	},
	{
		id: 38119,
		slug: "los-angeles",
		type: "early",
		link: "https://cms.vibemap.com/cities/los-angeles/",
		title: {
			rendered: "Los Angeles"
		},
		location: {
			latitude: 34.04734503476973,
			longitude: -118.25308336038819
		},
		mailchimp_id: "7fb6e2a465",
		database_id: "c9a66e10-a1c4-482b-b47f-03d33c87495a",
		name: "Los Angeles"
	},
	{
		id: 1450,
		slug: "guadalajara",
		type: "official",
		link: "https://cms.vibemap.com/cities/guadalajara/",
		title: {
			rendered: "Guadalajara"
		},
		location: {
			latitude: 20.65969879999999,
			longitude: -103.3496092
		},
		mailchimp_id: "0154de5655",
		database_id: "6e31a0eb-e654-4405-80b3-c7aa01c68191",
		name: "Guadalajara"
	},
	{
		id: 1447,
		slug: "oakland",
		type: "official",
		link: "https://cms.vibemap.com/cities/oakland/",
		title: {
			rendered: "Oakland"
		},
		location: {
			latitude: 37.8043514,
			longitude: -122.2711639
		},
		mailchimp_id: "da0894a0e6",
		database_id: "6bfe09a3-34c3-489a-8693-c6da18d5a528",
		name: "Oakland"
	},
	{
		id: 1444,
		slug: "san-francisco",
		type: "official",
		link: "https://cms.vibemap.com/cities/san-francisco/",
		title: {
			rendered: "San Francisco"
		},
		location: {
			latitude: 37.7749295,
			longitude: -122.4194155
		},
		mailchimp_id: "f30df08e52",
		database_id: "2b22ebd8-d96d-4396-9033-3f296293a968",
		name: "San Francisco"
	},
	{
		id: 1441,
		slug: "portland",
		type: "official",
		link: "https://cms.vibemap.com/cities/portland/",
		title: {
			rendered: "Portland"
		},
		location: {
			latitude: 45.5051064,
			longitude: -122.6750261
		},
		mailchimp_id: "27c0467a17",
		database_id: "1fc95260-6940-4757-bb26-39b03686fb88",
		name: "Portland"
	},
	{
		id: 1438,
		slug: "seattle",
		type: "official",
		link: "https://cms.vibemap.com/cities/seattle/",
		title: {
			rendered: "Seattle"
		},
		location: {
			latitude: 47.6062095,
			longitude: -122.3320708
		},
		mailchimp_id: "baadb78d87",
		database_id: "142ed33f-d405-489e-9d14-bd71486a08e5",
		name: "Seattle"
	},
	{
		id: 1435,
		slug: "vancouver",
		type: "official",
		link: "https://cms.vibemap.com/cities/vancouver/",
		title: {
			rendered: "Vancouver"
		},
		location: {
			latitude: 49.2827291,
			longitude: -123.1207375
		},
		mailchimp_id: "da30e0d7dc",
		database_id: "bf753c41-259b-4f7b-bf43-44ab0fe4be57",
		name: "Vancouver"
	}
];

const GATSBY_WP_BASEURL = 'https://cms.vibemap.com';
const REST_PATH = '/wp-json/wp/v2/';

//import * as helpers from '../dist/helpers.js';

const helpers = require('./helpers.js');

// Cached Wordpress taxonomies for reference
// Note: this data is stored everytime this library is versioned.
const postCategories = require('../dist/postCategories');

const defaultFilters = {
  categories: [],
  cities: [],
  vibesets: [],
  vibe: []
};

// Get a list of Wordpress taxonomy or category ids by slug
// If empty, i.e. the slug isn't use, returns an empty array,
// which will search for everything.
const getTaxonomyIds = (type, filter) => {
  switch (type) {
    case 'vibe':
      return filter.map(slug => {
        // Find taxonomy that match slug
        const matches = helpers.filterList(vibeTaxonomy, slug, 'slug');
        return matches.length > 0
          ? matches.map(match => match.id)
          : []
      })

    case 'cities':
      return filter.map(slug => {
        // Find taxonomy that match slug
        const matches = helpers.filterList(cities, slug, 'slug');

        return matches.length > 0
          ? matches.map(match => match.id)
          : []

      })
  }
  return []
};

const fetchBadges = async () => {
  // const cityFilters = '?_fields=id, link, name, slug, title, acf'

  const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}badges`;
  const response = await Axios__default['default'].get(endpoint)
    .catch(error => console.error(error));

  return response
};

const fetchCities = async (per_page = 50) => {
  const cityFilters = `?_fields=id, link, name, slug, title, acf, type
    &per_page=${per_page}`;

  const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}city${cityFilters}`;
  const response = await Axios__default['default'].get(endpoint)
      .catch(error => console.error(error));

  return response
};

// TODO: Sort by location
// TODO: SOrt by vibe match
const fetchNeighborhoods = async (filters = defaultFilters, page = 1, postsPerPage = 100) => {
    //console.log('fetchNeighborhoods: ', filters)
    // TODO: Filter by vibe or other attributes
    const source = Axios__default['default'].CancelToken.source();
    console.log('Filtering neighborhoods by: ', filters);

    // TODO: Use the ACF endpoint instead:
    // https://cms.vibemap.com/wp-json/acf/v3/neighborhoods
    const apiFilters = '?_fields=id, slug, type, link, _links, title, categories, vibe, acf, content, featured_media, featured_media_src_url';
    const url = `${GATSBY_WP_BASEURL}/wp-json/wp/v2/neighborhoods${apiFilters}`;
    console.log('Wordpress URL ', url);
    let response = await Axios__default['default'].get(url, {
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
        console.error(error);
      });

    response.numPages = parseInt(response.headers["x-wp-totalpages"]);

    return response
};

// Get post categories
const fetchCategories = async (filters = defaultFilters, page = 1, postsPerPage = 100) => {
  //console.log('fetchNeighborhoods: ', filters)

  // TODO: Filter by vibe or other attributes
  const source = Axios__default['default'].CancelToken.source();

  let response = await Axios__default['default'].get(`${GATSBY_WP_BASEURL}/wp-json/wp/v2/categories/`, {
      cancelToken: source.token,
    })
    .catch(error => {
      console.error(error);
    });

  //console.log('Got response: ', response)

  response.numPages = parseInt(response.headers["x-wp-totalpages"]);

  return response
};

const getCityInfo = (name = 'San Francisco', slug = null) => {
  let city = null;
  if (slug) {
      // Handle both string and array
      slug = slug.toString();
      // Filter cities in wordpress
      const findCitySlug = cities.filter(result => result.slug === slug.toString());
      city = findCitySlug.length > 0 ? findCitySlug[0] : null;
  } {
      const findCityName = cities.filter(result => result.name === name);
      city = findCityName.length > 0 ? findCityName[0] : null;
  }

  return city
};

const filterNeighborhoods = (neighborhoods, city = 'San Francisco', slug = null) => {
  // Look up city by slug
  if (slug) {
    // Handle both string and array
    slug = slug.toString();
    // Filter cities in wordpress
    const findCitySlug = cities.filter(result => result.slug === slug.toString());
    city = findCitySlug.length > 0 ? findCitySlug[0].title.rendered : null;
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
  const filterPredicate = (neighborhood) => neighborhood.city === city || neighborhood.title.includes(city);

  // Return all, if there's not city filter
  if (city || slug) {
    return filter__default['default'](neighborhoods, filterPredicate)
  } else {
    return neighborhoods
  }
};

const fetchVibeTaxonomy = async () => {
    const taxonomyFilters = '?_fields=id, link, name, slug';
    const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}vibe${taxonomyFilters}`;

    const response = await Axios__default['default'].get(endpoint)
        .catch(error => console.error(error));

    return response
};

async function getPosts(filters = defaultFilters, stickyOnly = false, per_page = 20) {

  const apiFilters = '?per_page=20&_fields=id, date, slug, status, type, link, title, content, excerpt, author, categories, vibe, blocks, acf, _links, featured_media, featured_media_src_url';
  const endpoint = `${GATSBY_WP_BASEURL}${REST_PATH}posts${apiFilters}`;

  // Sticky posts to be shown first
  // TODO: Filter by the vibe or just score by it?
  const paramsOverride = {
    per_page: per_page,
    cities: getTaxonomyIds('cities', filters.cities).toString(),
    sticky: true
  };

  if (filters.vibe && filters.vibe.length > 0) {
    paramsOverride.vibe = getTaxonomyIds('vibe', filters.vibe).toString();
  }

  let top_posts = await Axios__default['default'].get(endpoint, {
    params: paramsOverride
  }).catch(error => console.error(error));

  // All other recent posts

  paramsOverride.sticky = false;

  let recent_posts = await Axios__default['default'].get(endpoint, {
    params: paramsOverride
  }).catch(error => console.error(error));

  const excludeHiddenPosts = recent_posts.data
    .filter(post => post.acf.hide_post !== true)
    .map(post => {
      // Look up display category in cached taxonomy
      const findCategory = postCategories.filter(category => category.id === post.categories[0]);
      post.category = findCategory ? findCategory[0].name : 'Guide';

      return post
    });

  // Only sticky posts
  if (stickyOnly === true) {
    return top_posts
  }

  // Put stick posts on top
  recent_posts.data = recent_posts
    ? top_posts.data.concat(excludeHiddenPosts)
    : top_posts;

  return recent_posts
}

exports.fetchBadges = fetchBadges;
exports.fetchCategories = fetchCategories;
exports.fetchCities = fetchCities;
exports.fetchNeighborhoods = fetchNeighborhoods;
exports.fetchVibeTaxonomy = fetchVibeTaxonomy;
exports.filterNeighborhoods = filterNeighborhoods;
exports.getCityInfo = getCityInfo;
exports.getPosts = getPosts;
exports.getTaxonomyIds = getTaxonomyIds;
