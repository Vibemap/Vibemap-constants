'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Axios = require('axios');
var filter = require('lodash.filter');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Axios__default = /*#__PURE__*/_interopDefaultLegacy(Axios);
var filter__default = /*#__PURE__*/_interopDefaultLegacy(filter);

var activityCategories = [
	{
		id: 6295,
		description: "Things to do",
		name: "All",
		slug: "all",
		parent: 0,
		details: {
			verb: "Do",
			noun: "Things to do",
			vibeset: [
				399
			],
			sub_categories: [
				{
					name: "Food",
					description: "",
					parent: 6295,
					slug: "food",
					id: 6331
				},
				{
					name: "Visit",
					description: "",
					parent: 0,
					slug: "visit",
					id: 6298
				},
				{
					name: "Drink",
					description: "Drinking to enjoy including beer, wine, cocktails and sober options including coffee, tea, and more.",
					parent: 6295,
					slug: "drinking",
					id: 6328
				},
				{
					name: "Art",
					description: "",
					parent: 6295,
					slug: "art",
					id: 6291
				},
				{
					name: "Outdoors",
					description: "",
					parent: 6295,
					slug: "outdoors",
					id: 6340
				},
				{
					name: "Community",
					description: "",
					parent: 6295,
					slug: "community",
					id: 6293
				},
				{
					id: 6292,
					description: "",
					name: "Comedy",
					slug: "comedy",
					parent: 6295,
					term_id: 6292
				},
				{
					id: 6334,
					description: "",
					name: "Entertainment",
					slug: "entertainment",
					parent: 6295,
					term_id: 6334
				},
				{
					id: 6337,
					description: "",
					name: "Fitness",
					slug: "games",
					parent: 6295,
					term_id: 6337
				}
			],
			msv: "1830",
			icon: "allLogo",
			vibes: [
				{
					name: "Dreamy",
					slug: "dreamy"
				},
				{
					name: "Creative",
					slug: "creative"
				},
				{
					name: "Fun",
					slug: "fun"
				},
				{
					name: "Local",
					slug: "local"
				},
				{
					name: "New",
					slug: "new"
				},
				{
					name: "Amazing",
					slug: "amazing"
				},
				{
					name: "Family",
					slug: "family"
				},
				{
					name: "Trending",
					slug: "trending"
				},
				{
					name: "Classic",
					slug: "classic"
				},
				{
					name: "Adventurous",
					slug: "adventurous"
				}
			]
		}
	},
	{
		id: 6291,
		description: "",
		name: "Art",
		slug: "art",
		parent: 6295,
		details: {
			verb: "Art",
			noun: "Art",
			msv: "8",
			sub_categories: [
				{
					name: "Gallery",
					description: "",
					parent: 6291,
					slug: "gallery",
					id: 6307
				}
			],
			vibeset: [
				262
			],
			vibes: [
				{
					name: "Artsy",
					slug: "artsy"
				},
				{
					name: "Creative",
					slug: "creative"
				},
				{
					name: "Inspired",
					slug: "inspired"
				}
			],
			icon: "art"
		}
	},
	{
		id: 6292,
		description: "",
		name: "Comedy",
		slug: "comedy",
		parent: 6295,
		term_id: 6292
	},
	{
		id: 6293,
		description: "",
		name: "Community",
		slug: "community",
		parent: 6295,
		details: {
			verb: "community",
			noun: "community",
			vibeset: [
				396,
				399
			],
			sub_categories: [
			],
			msv: "2",
			icon: "community",
			vibes: [
				{
					name: "Community",
					slug: "community"
				},
				{
					name: "Local",
					slug: "local"
				},
				{
					name: "Cultural",
					slug: "cultural"
				},
				{
					name: "Multicultural",
					slug: "multicultural"
				},
				{
					name: "Social",
					slug: "social"
				}
			],
			search_term: ""
		}
	},
	{
		id: 6328,
		description: "Drinking to enjoy including beer, wine, cocktails and sober options including coffee, tea, and more.",
		name: "Drink",
		slug: "drinking",
		parent: 6295,
		details: {
			verb: "Drink",
			noun: "Drinking",
			sub_categories: [
			],
			vibeset: [
				390
			],
			vibes: [
				{
					name: "Fun",
					slug: "fun"
				},
				{
					name: "Boozy",
					slug: "boozy"
				},
				{
					name: "Happy",
					slug: "happy"
				},
				{
					name: "Cheap",
					slug: "cheap"
				},
				{
					name: "Friendly",
					slug: "friendly"
				}
			],
			msv: "90",
			icon: "drink"
		}
	},
	{
		id: 6334,
		description: "",
		name: "Entertainment",
		slug: "entertainment",
		parent: 6295,
		term_id: 6334
	},
	{
		id: 6323,
		description: "",
		name: "Events",
		slug: "events",
		parent: 0,
		details: {
			verb: "Events",
			noun: "Events",
			sub_categories: [
			],
			vibeset: false,
			vibes: [
				{
					name: "Local",
					slug: "local"
				},
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Fun",
					slug: "fun"
				},
				{
					name: "Unique",
					slug: "unique"
				}
			],
			msv: "246",
			icon: "events"
		}
	},
	{
		id: 6337,
		description: "",
		name: "Fitness",
		slug: "games",
		parent: 6295,
		term_id: 6337
	},
	{
		id: 6331,
		description: "",
		name: "Food",
		slug: "food",
		parent: 6295,
		details: {
			verb: "Eat",
			noun: "Food",
			sub_categories: [
			],
			vibeset: [
				387
			],
			vibes: [
				{
					name: "Local",
					slug: "local"
				},
				{
					name: "Foodie",
					slug: "foodie"
				},
				{
					name: "Authentic",
					slug: "authentic"
				},
				{
					name: "New",
					slug: "new"
				},
				{
					name: "Spicy",
					slug: "spicy"
				},
				{
					name: "Sweet",
					slug: "sweet"
				},
				{
					name: "Popup",
					slug: "popup"
				}
			],
			msv: "1500",
			icon: "food",
			search_term: ""
		}
	},
	{
		id: 6307,
		description: "",
		name: "Gallery",
		slug: "gallery",
		parent: 6291,
		details: {
			vibes: [
				{
					name: "Small",
					slug: "small"
				},
				{
					name: "Local",
					slug: "local"
				},
				{
					name: "Community",
					slug: "community"
				}
			],
			sub_categories: [
			]
		}
	}
];

var cities = [
	{
		id: 45678,
		slug: "houston",
		type: "official",
		location: {
			latitude: 29.760314934412516,
			longitude: -95.36962040978698
		},
		mailchimp_id: "",
		name: "Houston"
	},
	{
		id: 44901,
		slug: "puerto-vallarta",
		type: "early",
		location: {
			latitude: 20.615046993637947,
			longitude: -105.231817181398
		},
		mailchimp_id: "57c905a1df",
		name: "Puerto Vallarta"
	},
	{
		id: 38387,
		slug: "austin",
		type: "early",
		location: {
			latitude: 30.267153,
			longitude: -97.7430608
		},
		mailchimp_id: "1d933c234f",
		name: "Austin"
	},
	{
		id: 38380,
		slug: "denver",
		type: "early",
		location: {
			latitude: 39.7392358,
			longitude: -104.990251
		},
		mailchimp_id: "b576abf895",
		name: "Denver"
	},
	{
		id: 38148,
		slug: "chicago",
		type: "early",
		location: {
			latitude: 41.8781136,
			longitude: -87.6297982
		},
		mailchimp_id: "b865b3ef72",
		name: "Chicago"
	},
	{
		id: 38143,
		slug: "new-york",
		type: "early",
		location: {
			latitude: 40.7127610684055,
			longitude: -74.0060103509262
		},
		mailchimp_id: "56ebd9923f",
		name: "New York"
	},
	{
		id: 38137,
		slug: "san-diego",
		type: "early",
		location: {
			latitude: 32.715738,
			longitude: -117.1610838
		},
		mailchimp_id: "7fb6e2a465",
		name: "San Diego"
	},
	{
		id: 38119,
		slug: "los-angeles",
		type: "official",
		location: {
			latitude: 34.04734503476973,
			longitude: -118.25308336038819
		},
		mailchimp_id: "7fb6e2a465",
		name: "Los Angeles"
	},
	{
		id: 1450,
		slug: "guadalajara",
		type: "official",
		location: {
			latitude: 20.65969879999999,
			longitude: -103.3496092
		},
		mailchimp_id: "0154de5655",
		name: "Guadalajara"
	},
	{
		id: 1447,
		slug: "oakland",
		type: "official",
		location: {
			latitude: 37.8043514,
			longitude: -122.2711639
		},
		mailchimp_id: "da0894a0e6",
		name: "Oakland"
	},
	{
		id: 1444,
		slug: "san-francisco",
		type: "official",
		location: {
			latitude: 37.7749295,
			longitude: -122.4194155
		},
		mailchimp_id: "f30df08e52",
		name: "San Francisco"
	},
	{
		id: 1441,
		slug: "portland",
		type: "official",
		location: {
			latitude: 45.5051064,
			longitude: -122.6750261
		},
		mailchimp_id: "27c0467a17",
		name: "Portland"
	},
	{
		id: 1438,
		slug: "seattle",
		type: "official",
		location: {
			latitude: 47.6062095,
			longitude: -122.3320708
		},
		mailchimp_id: "baadb78d87",
		name: "Seattle"
	},
	{
		id: 1435,
		slug: "vancouver",
		type: "official",
		location: {
			latitude: 49.2827291,
			longitude: -123.1207375
		},
		mailchimp_id: "da30e0d7dc",
		name: "Vancouver"
	}
];

const jsonpack = require('jsonpack');

const GATSBY_WP_BASEURL = 'https://cms.vibemap.com';
const REST_PATH = '/wp-json/wp/v2/';

const helpers = require('./helpers.js');

// Cached Wordpress taxonomies for reference
// Note: this data is stored everytime this library is versioned.
const postCategories = require('../dist/postCategories');

let vibeTaxonomy = [];

try {
  const vibeTaxonomyPacked = require('../dist/vibesFromCMSTaxonomy.zip.json');
  vibeTaxonomy = jsonpack.unpack(vibeTaxonomyPacked);
} catch (error) {
  console.log('Error with packed vibes ', error);
}

const defaultFilters = {
  categories: [],
  cities: [],
  vibesets: [],
  vibes: []
};

// Get a list of Wordpress taxonomy or category ids by slug
// If empty, i.e. the slug isn't use, returns an empty array,
// which will search for everything.
const getTaxonomyIds = (type, filter = ['chill']) => {
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
  const response = await Axios__default["default"].get(endpoint)
    .catch(error => console.error(error));

  return response
};

const fetchCities = async (per_page = 50) => {
  const cityFilters = `?_fields=id, link, name, slug, title, acf, type
    &per_page=${per_page}`;

  const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}city${cityFilters}`;
  const response = await Axios__default["default"].get(endpoint)
      .catch(error => console.error(error));

  return response
};

// TODO: Sort by location
// TODO: SOrt by vibe match
const fetchNeighborhoods = async (filters = defaultFilters, page = 1, postsPerPage = 100) => {
    //console.log('fetchNeighborhoods: ', filters)
    // TODO: Filter by vibe or other attributes
    const source = Axios__default["default"].CancelToken.source();
    //console.log('Filtering neighborhoods by: ', filters)

    // TODO: Use the ACF endpoint instead:
    // https://cms.vibemap.com/wp-json/acf/v3/neighborhoods
    const apiFilters = '?_fields=id, slug, type, link, _links, title, categories, vibe, acf, content, featured_media, featured_media_src_url';
    const url = `${GATSBY_WP_BASEURL}/wp-json/wp/v2/neighborhoods${apiFilters}`;
    console.log('Wordpress URL ', url);
    let response = await Axios__default["default"].get(url, {
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
const fetchActivityCategories = async (
  filters = defaultFilters,
  page = 1,
  postsPerPage = 500
) => {
  // Fetch all activity categories and subcategories
  const source = Axios__default["default"].CancelToken.source();
  const rest_slug = 'activity-category';
  const rest_url = `${GATSBY_WP_BASEURL}/wp-json/wp/v2/${rest_slug}`;
  let response = await Axios__default["default"].get(rest_url, {
    cancelToken: source.token,
  })
  .catch(error => {
    console.error(error);
  });

  //console.log('Got response: ', response)
  response.numPages = parseInt(response.headers["x-wp-totalpages"]);

  return response
};

// Get post categories
const fetchCategories = async (filters = defaultFilters, page = 1, postsPerPage = 100) => {
  //console.log('fetchNeighborhoods: ', filters)

  // TODO: Filter by vibe or other attributes
  const source = Axios__default["default"].CancelToken.source();

  let response = await Axios__default["default"].get(`${GATSBY_WP_BASEURL}/wp-json/wp/v2/categories/`, {
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
    return filter__default["default"](neighborhoods, filterPredicate)
  } else {
    return neighborhoods
  }
};

const fetchVibeTaxonomy = async (
  page = 1,
  per_page = 100,
  fields = ['acf', 'id', 'link', 'name', 'slug', 'description']
) => {

  const fetchData = async (page = 1, per_page = 100) => {
    const taxonomyFilters = `?_fields=${fields.join(',')}&per_page=${per_page}&page=${page}`;
    const endpoint = `${GATSBY_WP_BASEURL + REST_PATH}vibe${taxonomyFilters}`;
    //console.log('fetchVibeTaxonomy ', endpoint)
    const response = await Axios__default["default"].get(endpoint)
      .catch(error => console.error(error));

    return response.data
  };

  let combinedData = await fetchData(page, per_page);

  let hasNext = true;
  let nextData = [];
  let next_page = page;
  // Check for next page, else return combined
  while (hasNext) {
    //console.log('Really has next? ', combinedData.length, (next_page * per_page))
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
  //console.log('return combinedData ', combinedData)
  return combinedData
};

const getPosts = async (
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
  const embedParameter = embed ? '&_embed' : '';
  const apiFilters = `?_fields=${fields.join(',')}`;
  const endpoint = `${GATSBY_WP_BASEURL}${REST_PATH}posts${apiFilters}${embedParameter}`;

  // Sticky posts to be shown first
  // TODO: Filter by the vibe or just score by it?
  const paramsOverride = {
    per_page: per_page,
    cities: getTaxonomyIds('cities', filters.cities).toString(),
    sticky: true
  };

  if (filters.category && filters.category.length > 0) {
    paramsOverride.category = getTaxonomyIds('category', filters.category).toString();
  }

  if (filters.vibes && filters.vibes.length > 0) {
    // TODO: User a more strict vibe search in some cases
    // paramsOverride.vibe = getTaxonomyIds('vibe', filters.vibes).toString()
    paramsOverride.search = filters.vibes.join(', ');
  }

  let top_posts = await Axios__default["default"].get(endpoint, {
    params: paramsOverride,
  }).catch((error) => {
    console.error(`Wordpress error`, error);
  });

  paramsOverride.sticky = false;

  let recent_posts = await Axios__default["default"].get(endpoint, {
    params: paramsOverride,
  }).catch((error) => console.error(error));

	// TODO: Sort by vibe match
  const excludeHiddenPosts = recent_posts.data
    .filter((post) => post.acf.hide_post !== true)
    .map((post) => {
      // Look up display category in cached taxonomy
      const findCategory = postCategories.filter(
        (category) => category.id === post.categories[0]
      );
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
};

const getPost = async (id) => {
  Axios__default["default"]({
    url: 'https://cms.vibemap.com/graphql',
    method: 'post',
    data: {
      query: `
        query PostDetails {
          posts {
            nodes {
              id
              slug
            }
          }
        }
      `
    }
  }).then((result) => {
    console.log(result.data);
  });
};

exports.fetchActivityCategories = fetchActivityCategories;
exports.fetchBadges = fetchBadges;
exports.fetchCategories = fetchCategories;
exports.fetchCities = fetchCities;
exports.fetchNeighborhoods = fetchNeighborhoods;
exports.fetchVibeTaxonomy = fetchVibeTaxonomy;
exports.filterNeighborhoods = filterNeighborhoods;
exports.getCityInfo = getCityInfo;
exports.getPost = getPost;
exports.getPosts = getPosts;
exports.getTaxonomyIds = getTaxonomyIds;
