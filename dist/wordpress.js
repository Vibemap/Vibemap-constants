'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Axios = require('axios');
var filter = require('lodash.filter');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Axios__default = /*#__PURE__*/_interopDefaultLegacy(Axios);
var filter__default = /*#__PURE__*/_interopDefaultLegacy(filter);

var vibeTaxonomy = [
	{
		id: 2224,
		link: "https://cms.vibemap.com/features/vibe/artistic/",
		name: "artistic",
		slug: "artistic"
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
		id: 1103,
		link: "https://cms.vibemap.com/features/vibe/colorful/",
		name: "colorful",
		slug: "colorful"
	},
	{
		id: 2464,
		link: "https://cms.vibemap.com/features/vibe/community/",
		name: "community",
		slug: "community"
	},
	{
		id: 1948,
		link: "https://cms.vibemap.com/features/vibe/creative/",
		name: "creative",
		slug: "creative"
	},
	{
		id: 1824,
		link: "https://cms.vibemap.com/features/vibe/diverse/",
		name: "diverse",
		slug: "diverse"
	},
	{
		id: 1106,
		link: "https://cms.vibemap.com/features/vibe/dreamy/",
		name: "dreamy",
		slug: "dreamy"
	},
	{
		id: 2034,
		link: "https://cms.vibemap.com/features/vibe/eclectic/",
		name: "eclectic",
		slug: "eclectic"
	}
];

var cities = [
	{
		id: 1450,
		slug: "guadalajara",
		link: "https://cms.vibemap.com/cities/guadalajara/",
		title: {
			rendered: "Guadalajara"
		},
		location: {
			latitude: 20.65969879999999,
			longitude: -103.3496092
		},
		name: "Guadalajara"
	},
	{
		id: 1447,
		slug: "oakland",
		link: "https://cms.vibemap.com/cities/oakland/",
		title: {
			rendered: "Oakland"
		},
		location: {
			latitude: 37.8043514,
			longitude: -122.2711639
		},
		name: "Oakland"
	},
	{
		id: 1444,
		slug: "san-francisco",
		link: "https://cms.vibemap.com/cities/san-francisco/",
		title: {
			rendered: "San Francisco"
		},
		location: {
			latitude: 37.7749295,
			longitude: -122.4194155
		},
		name: "San Francisco"
	},
	{
		id: 1441,
		slug: "portland",
		link: "https://cms.vibemap.com/cities/portland/",
		title: {
			rendered: "Portland"
		},
		location: {
			latitude: 45.5051064,
			longitude: -122.6750261
		},
		name: "Portland"
	},
	{
		id: 1438,
		slug: "seattle",
		link: "https://cms.vibemap.com/cities/seattle/",
		title: {
			rendered: "Seattle"
		},
		location: {
			latitude: 47.6062095,
			longitude: -122.3320708
		},
		name: "Seattle"
	},
	{
		id: 1435,
		slug: "vancouver",
		link: "https://cms.vibemap.com/cities/vancouver/",
		title: {
			rendered: "Vancouver"
		},
		location: {
			latitude: 49.2827291,
			longitude: -123.1207375
		},
		name: "Vancouver"
	}
];

const GATSBY_WP_BASEURL = 'https://cms.vibemap.com';
const REST_PATH = '/wp-json/wp/v2/';

//import * as helpers from '../dist/helpers.js';

const helpers = require('./helpers.js');

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

const fetchCities = async () => {
  const cityFilters = '?_fields=id, link, name, slug, title, acf';

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
  console.log('Filtering neighborhoods by: ', filters);

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

  const apiFilters = '?per_page=20&sticky=true&vibe=1060, 10&_fields=id, date, slug, status, type, link, title, content, excerpt, author, categories, vibe, blocks, acf, _links, featured_media, featured_media_src_url';
  const endpoint = `${GATSBY_WP_BASEURL}${REST_PATH}posts${apiFilters}`;

  // Sticky posts to be shown first
  // TODO: Filter by the vibe or just score by it?
  let top_posts = await Axios__default['default'].get(endpoint, {
    params: {
      per_page: per_page,
      vibe: getTaxonomyIds('vibe', filters.vibe).toString(),
      cities: getTaxonomyIds('cities', filters.cities).toString(),
      sticky: true
    }
  }).catch(error => console.error(error));

  // All other recent posts
  let recent_posts = await Axios__default['default'].get(endpoint, {
    params: {
      per_page: per_page,
      vibe: getTaxonomyIds('vibe', filters.vibe).toString(),
      sticky: false
    }
  }).catch(error => console.error(error));

  // Only sticky posts
  if (stickyOnly === true) {
    return top_posts
  }

  console.log('Get recent posts: ', endpoint, recent_posts);

  //console.log('recent posts ', recent_posts)

  // Put stick posts on top
  recent_posts.data = recent_posts
    ? top_posts.data.concat(recent_posts.data)
    : top_posts;

  console.log('recent_posts.data length: ', recent_posts.data.length);

  return recent_posts
}

exports.fetchCategories = fetchCategories;
exports.fetchCities = fetchCities;
exports.fetchNeighborhoods = fetchNeighborhoods;
exports.fetchVibeTaxonomy = fetchVibeTaxonomy;
exports.filterNeighborhoods = filterNeighborhoods;
exports.getCityInfo = getCityInfo;
exports.getPosts = getPosts;
exports.getTaxonomyIds = getTaxonomyIds;
