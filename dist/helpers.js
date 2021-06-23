'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var d3Scale = require('d3-scale');
var turf = require('@turf/helpers');
var Axios = require('axios');
var dayjs = require('dayjs');
var escapeRegExp = require('lodash.escaperegexp');
var filter = require('lodash.filter');
var Fuse = require('fuse.js');
var isBetween = require('dayjs/plugin/isBetween');
var truncate = require('truncate');
var url = require('url');
var querystring = require('querystring');
var vibes = require('./vibes.js');
var map = require('./map.js');
require('chroma-js');
require('@mapbox/geo-viewport');
require('@turf/points-within-polygon');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var turf__namespace = /*#__PURE__*/_interopNamespace(turf);
var Axios__default = /*#__PURE__*/_interopDefaultLegacy(Axios);
var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);
var escapeRegExp__default = /*#__PURE__*/_interopDefaultLegacy(escapeRegExp);
var filter__default = /*#__PURE__*/_interopDefaultLegacy(filter);
var Fuse__default = /*#__PURE__*/_interopDefaultLegacy(Fuse);
var isBetween__default = /*#__PURE__*/_interopDefaultLegacy(isBetween);
var truncate__default = /*#__PURE__*/_interopDefaultLegacy(truncate);
var url__default = /*#__PURE__*/_interopDefaultLegacy(url);
var querystring__default = /*#__PURE__*/_interopDefaultLegacy(querystring);

const turf_distance = require('@turf/distance').default;

const constants = require('../dist/constants.js');
const allCategories = require('../dist/categories.json');
const getArea = map.getArea;
const getBounds = map.getBounds;
const getDistance = map.getDistance;
const getDistanceToPixels = map.getDistanceToPixels;
const getFeaturesInBounds = map.getFeaturesInBounds;
const getHeatmap = map.getHeatmap;
const getPosition = map.getPosition;
const getRadius = map.getRadius;
const zoomToRadius = map.zoomToRadius;
const getVibeStyle = vibes.getVibeStyle;

dayjs__default['default'].extend(isBetween__default['default']);

const ApiUrl = 'https://api.vibemap.com/v0.3/';

// Filters a list of objects
// Similar to .filter method of array
// TODO: argument for attribute to filter on.
const filterList = (list, searchTerm, key = 'value') => {
  // Generalize the Semantic UI search implementation
  const re = new RegExp(escapeRegExp__default['default'](searchTerm), 'i');

  const isMatch = (result) => re.test(result[key]);

  const results = filter__default['default'](list, isMatch);

  return results
};

const findPlaceCategories = (categories) => {
  let combined = [];

  constants.place_categories.map(function (category) {
    let isMatch = function (name) {
      var found = categories.indexOf(name);
      if (found > -1) {
        return true
      }
    };

    // Matches the search?
    let top_match = isMatch(category.name);
    if (top_match) {
      combined.push(category.name);
    }

    if (category.hasOwnProperty('categories')) {
      category.categories.map(function (sub_category) {
        let child_match = isMatch(sub_category.name);

        if (top_match || child_match) {
          combined.push(sub_category.name);
        }

        return null
      });
    }

    return true
  });

  return combined
};

const getRandomItem = (list) => {
  // Get random index value
  const randomIndex = Math.floor(Math.random() * list.length);

  // Get random item
  const item = list[randomIndex];

  return item
};

// TODO: Option to encode / decode
const encodeCardIndex = (row, column) => {
  // Encode row / column into a decimal for sorting.
  const index = row + column / 10;

  return index
};

// Fuzzy matching of strings
const fuzzyMatch = (list, searchTerm, key) => {
  let options = {
    includeScore: true,
    keys: ['value', 'name'],
  };

  if (key) options.keys.push(key);

  const fuse = new Fuse__default['default'](list, options);
  const results = fuse.search(searchTerm);

  const filter_results = results.filter((result) => {
    if (result.score < 0.3) return true
    return false
  }, []);

  const top_results = filter_results.map((result) => result.item);

  return top_results
};

// Counts the number of matches between the two lists and return and integer
const matchLists = (listA, listB) => {
  let matches = 0;

  if (listA.length > 0 && listB.length > 0) {
    matches = listA.filter((word) => {
      return listB.includes(word)
    }).length;
  }

  return matches
};

// Give a score based on the vibes position in the list.
const rankVibes = (listA, listB) => {
  let rankings = [];

  rankings = listA.map((word) => {
    let score = 0;

    if (listB.includes(word)) {
      score = listB.length - listB.indexOf(word);
    }

    return score
  });

  const average = rankings.reduce((a, b) => a + b, 0) / rankings.length;

  return average
};

const sortByKey = (a, b) => {
  console.log('sortByKey (a, b)', a, b);
  return a
};

const isClosedToday = (dailyHours) => {
  return dailyHours.opens === '00:00:00' && dailyHours.closes === '00:00:00'
};

const displayHours = (hours, dayFormat = 'dd') => {
  let openHours = isOpen(hours);

  const weeklyHours = hours.find(({day_of_week}) => day_of_week === 8);

  if (openHours.openEveryday) {
    let times = [];
    const time =
      dayjs__default['default'](openHours.opens).format('ha') +
      '-' +
      dayjs__default['default'](openHours.closes).format('ha');
    times.push(time);

    let popularFound = hours.find((day) => day.name == 'POPULAR');
    console.log('Popular at: ', popularFound);

    return times
  }

  let i = 0;
  let orderedHours = [];

  // Check every day of the week.
  while (i < 7) {
    // Get Label

    let dayFound = hours.find((day) => day.day_of_week == i);
    hours.find(
      (day) => day.day_of_week == i && day.name == 'POPULAR'
    );

    // TODO: Handle popular vs normal
    //console.log('Found day and popular times: ', dayFound, popularFound)

    let isClosed = false;

    if (dayFound !== undefined) {
      isClosed = isClosedToday(dayFound);
      //console.log('Day has hours: ', i, dayFound, popularFound, hasHours)
    }

    // If found and not closed
    if (dayFound === undefined || isClosed) {
      //const displayHours = helpers.displayHours(dayFound)
      // Will with daily hours if available
      if (!isClosed && weeklyHours !== undefined) {
        // Set for current day
        let time = Object.assign({}, weeklyHours);
        time.day_of_week = i;
        orderedHours.push(time);
        // Include closed days as closed
      } else {
        orderedHours.push({day_of_week: i, closed: true});
      }
    } else {
      dayFound.closed = false;
      orderedHours.push(dayFound);
    }
    i++;
  }

  // TODO: Add patterns for nicer formating.
  // TODO: Handle localization and React templates
  let formattedHours = orderedHours.map((dailyHours) => {
    //console.log('formattedHours for: ', dailyHours)
    // Shift days by 1; Monday = 1; Sunday = 0
    const day = (dailyHours.day_of_week + 1) % 7;

    if (dailyHours.closed === true) {
      return dayjs__default['default']().day(day).format(dayFormat) + ' ' + 'Closed'
    } else {
      const opens = dailyHours.opens.split(':');
      const closes = dailyHours.closes.split(':');

      const time =
        dayjs__default['default']().day(day).format(dayFormat) +
        ': ' +
        dayjs__default['default']().hour(opens[0]).minute(opens[1]).format('ha') +
        '-' +
        dayjs__default['default']().hour(closes[0]).minute(closes[1]).format('ha');

      return time
    }
  });

  return formattedHours
};

const isOpen = (hours, time = dayjs__default['default']()) => {
  const day = time.day();
  const date = time.format('YYYY-MM-DD');
  time.hour();

  if (!hours) return {openNow: false, openToday: false, isPopular: false}

  let dayFound = hours.find(({day_of_week}) => day_of_week === day);

  // TODO: not true if it's closed one day
  const hasDailyHours = hours.find(({day_of_week}) => day_of_week === 8);

  const daysClosed = hours.filter((day) => isClosedToday(day));

  const openEveryday = hasDailyHours !== undefined && daysClosed.length == 0;

  // If open everyday and no specific hours for current day
  if (openEveryday !== undefined && dayFound === undefined) {
    dayFound = hasDailyHours;
  }

  if (dayFound) {
    const opens = dayjs__default['default'](date + ' ' + dayFound.opens);
    const closes = dayjs__default['default'](date + ' ' + dayFound.closes);

    // Return if open and if it's a popular time
    const openNow = time.isBetween(opens, closes);
    const isPopular = openNow && dayFound.name === 'POPULAR';
    opens.format('ha') + ' - ' + closes.format('ha');

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
};

const getAPIParams = (options, per_page = 50) => {
  let {activity, distance} = options;
  let params = Object.assign({}, options);

  let distanceInMeters = 1;
  if (distance > 0)
    distanceInMeters = Math.round(distance * constants.METERS_PER_MILE);

  // API currently doesn't support other options
  // However, the sorting algorithm, will use them
  params['ordering'] = '-aggregate_rating';

  // TODO: Load more points at greater distances?
  params['per_page'] = per_page;

  // Rename args
  if (activity !== 'all' && activity !== null) params['category'] = activity;
  params['dist'] = distanceInMeters;
  delete params['activity'];
  delete params['distance'];
  delete params['bounds'];
  //console.log('distanceInMeters', distanceInMeters, params['dist'])

  return params
};

// Return all matching Vibemap categories
const getCategoryMatch = (categories) => {
  const all_categories = constants.place_categories.map(
    (category) => category.key
  );

  let matches = [];
  /* TODO: use a combination of filter & map */
  categories.map((category) => {
    if (all_categories.includes(category)) {
      matches.push(category);
    }
    return true
  });

  return matches
};

// Parse all variety of social links and return a consistent, valid url
const getFullLink = (link, type = 'instagram') => {
  const domains = {
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
    facebook: 'https://facebook.com/',
  };

  // Handle things that aren't valid string handles
  // TODO: add unit tests for link = null; link = '' and other cases
  if (link === null || link === '') return null

  const parse_url = url__default['default'].parse(link);
  // Only the path handle
  const path = parse_url.path.replace('/', '');

  // Combine domain and handle
  const full_link = domains[type] + path;

  return full_link
};

const getMax = (items, attribute) => {
  let max = 0;
  items.forEach((item) => {
    let value = item['properties'][attribute];
    if (value > max) {
      max = value;
    }
  });

  return max
};

const getMin = (items, attribute) => {
  let min = 100;
  items.forEach((item) => {
    let value = item['properties'][attribute];
    if (value < min) {
      min = value;
    }
  });

  return min
};

// Adapted from https://gist.github.com/James1x0/8443042
const getTimeOfDay = (time) => {
  var time_of_day = null; //return g

  //if we can't find a valid or filled moment, we return.
  if (!time || !time.isValid()) {
    return
  }

  var split_afternoon = 12; // 24hr time to split the afternoon
  var split_evening = 17; // 24hr time to split the evening
  var currentHour = parseFloat(time.format('HH'));

  if (currentHour >= split_afternoon && currentHour <= split_evening) {
    time_of_day = 'afternoon';
  } else if (currentHour >= split_evening) {
    time_of_day = 'evening';
  } else {
    time_of_day = 'morning';
  }

  return time_of_day
};

const getTopVibes = (places) => {
  let top_vibes = {};

  places.map((place) => {
    place.properties.vibes.map((vibe) => {
      if (top_vibes.hasOwnProperty(vibe)) {
        top_vibes[vibe] += 1;
      } else {
        top_vibes[vibe] = 1;
      }
      return null
    });
    return null
  });

  var sortable = [];
  for (var vibe in top_vibes) {
    sortable.push([vibe, top_vibes[vibe]]);
  }

  let top_vibes_sorted = sortable.sort(function (a, b) {
    return b[1] - a[1]
  });

  return top_vibes_sorted
};

const getWaveFromVibe = (vibe) => {
  switch (vibe) {
    case 'buzzing':
      return 'high'
    default:
      return 'medium'
  }
};

// This function is no longer utilized. Linear scale from 0 to 10
const normalize = (val, min, max) => {
  return ((val - min) / (max - min)) * 10
};

/* New flexible linear scaling function. Using d3.scaleLinear, a value (val) between 
min and max is scaled appropriately to value between scale_low and scale_high
*/
const normalize_all = (val, min, max, scale_low, scale_high) => {
  const lin_scale = d3Scale.scaleLinear().domain([min, max]).range([scale_low, scale_high]);
  return lin_scale(val)
};
const scaleIconSize = (score, max) => {
  const scale = d3Scale.scalePow(1).domain([0, max]).range([1, 5]);

  return scale(score)
};

const scaleMarker = (score, min = 0, max = 100, zoom) => {
  // TODO: Hack to catch empty/nan scores
  if (isNaN(score)) score = 3.5;

  // Scale min and max marker size to zoom level
  let marker_scale = d3Scale.scalePow(1)
    .domain([8, 20]) // Zoom size
    .range([10, 30]); // Scale of marker size

  let base_marker = marker_scale(zoom);
  let max_marker = base_marker * 3;

  let scale = d3Scale.scalePow(1).domain([0, max]).range([base_marker, max_marker]);

  let scaled_size = Math.round(scale(score));

  return scaled_size
};

// Maps the relative density of place to a known range for Vibemap's cities
const scaleDensityArea = (density, area) => {
  // TODO: Make these contants?
  let density_scale = d3Scale.scalePow(2).domain([1, 60, 1000]).range([0, 0.8, 1]);

  let relative_density = density_scale(density);

  return relative_density
};

const scaleDensityBonus = (relative_density) => {
  let inverted_scale = d3Scale.scalePow(1)
    .domain([0, 1])
    .range([constants.HEATMAP_INTENSITY * 2, constants.HEATMAP_INTENSITY]);

  return inverted_scale(relative_density)
};

const scaleScore = (score) => {
  let scale = d3Scale.scalePow(1).domain([0, 5]).range([60, 100]);

  let percentage = Math.round(scale(score));

  return percentage
};

const scaleSelectedMarker = (zoom) => {
  // Scale em size of svg marker to zoom level
  let scale = d3Scale.scalePow(1)
    .domain([8, 12, 20]) // Zoom size
    .range([0.1, 1.2, 4]); // Scale of marker size

  let scaled_size = Math.round(scale(zoom));

  return scaled_size
};

const fetchEvents = async (options) => {
  let { activity, bounds, days, distance, ordering, point, search, time, vibes } = options;
  point.split(',').map(value => parseFloat(value));
  distance * constants.METERS_PER_MILE;

  dayjs__default['default']().startOf('day').format('YYYY-MM-DD HH:MM');
  dayjs__default['default']().add(days, 'days').format('YYYY-MM-DD HH:MM');

  const params = module.exports.getAPIParams(options);
  let query = querystring__default['default'].stringify(params);

  const apiEndpoint = `${ApiUrl}events/`;
  const source = Axios__default['default'].CancelToken.source();

  const response = await Axios__default['default'].get(`${apiEndpoint}?${query}`, {
    cancelToken: source.token,
  }).catch(function (error) {
    // handle error
    console.log('Axios error ', error);
    return null
  });

  return response
};

const fetchPlacesDetails = async (id, type = 'place') => {
  const source = Axios__default['default'].CancelToken.source();
  let apiEndpoint;

  if (type == "event") {
    apiEndpoint = `${ApiUrl}events/`;
  }

  if (type == "place") {
    apiEndpoint = `${ApiUrl}places/`;
  }

  if (apiEndpoint) {
    const response = await Axios__default['default'].get(`${apiEndpoint}${id}`, {
      cancelToken: source.token,
    }).catch(function (error) {
      // handle error
      console.log('Axios error ', error);
      return null
    });

    return response
  }
};

const fetchPlacePicks = (
  options = {
    distance: 5,
    point: '-123.1058197,49.2801149',
    ordering: 'vibe',
    vibes: ['chill'],
  }
) => {
  let {
    activity,
    bounds,
    days,
    distance,
    ordering,
    point,
    search,
    time,
    vibes,
  } = options;
  if (distance > 0) distance * constants.METERS_PER_MILE;
  if (activity === 'all') activity = null;
  const scoreBy = ['aggregate_rating', 'vibes', 'distance', 'offers', 'hours'];

  return new Promise(function (resolve, reject) {
    const params = getAPIParams(options, 250);

    let centerPoint = point.split(',').map((value) => parseFloat(value));
    let query = querystring__default['default'].stringify(params);

    fetch(ApiUrl + 'places/?' + query)
      .then((data) => data.json())
      .then(
        (res) => {
          //clearTimeout(timeout);
          const count = res.count;

          //console.log('getPicks got this many places: ', count)

          let places = formatPlaces(res.results.features);

          let placesScoredAndSorted = scorePlaces(
            places,
            centerPoint,
            vibes,
            scoreBy,
            ordering
          );
          // TODO: clustering could happen before and after identification of picks; for now just do it after
          //let clustered = module.exports.clusterPlaces(placesScoredAndSorted, 0.2)

          let top_vibes = getTopVibes(places);

          resolve({
            data: placesScoredAndSorted,
            count: count,
            top_vibes: top_vibes,
            loading: false,
            timedOut: false,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  })
};

// Handle fields from the tile server
const decodePlaces = (places) => {
  const decoded = places.map((feature) => {
    //console.log('feature: ', feature)
    feature.properties.vibes = JSON.parse(feature.properties.vibes);
    feature.properties.subcategories = JSON.parse(
      feature.properties.subcategories
    );
    feature.properties.categories = JSON.parse(feature.properties.categories);
    feature.properties.vibemap_images = [];
    feature.properties.images = [feature.properties.thumbnail_url];
    if (feature.properties.opening_hours != undefined)
      feature.properties.opening_hours = JSON.parse(
        feature.properties.opening_hours
      );
    delete feature.properties.tips;
    //delete feature.properties.subcategories
    delete feature.properties.facebook;
    delete feature.properties.telephone;
    delete feature.properties.website;

    return feature
  });

  return decoded
};

// Do some post-parsing clean up to the data
// TODO: API Update for Places
const formatPlaces = (places) => {
  const categories = allCategories.categories.map(category => Object.keys(category)[0]);

  const formatted = places.map((place) => {
    let fields = place.properties;

    // Add fields for presentation
    fields.place_type = 'places';
    fields.short_name = truncate__default['default'](fields.name, constants.TRUCATE_LENGTH);
    fields.aggregate_rating = parseFloat(fields.aggregate_rating);

    fields.sub_categories = fields.sub_categories;
    fields.top_vibe = null;

    const matchingCategories = fields.categories.filter(category => categories.includes(category.toLowerCase()));

    if (fields.categories === undefined ||
        fields.categories.length === 0 ||
        matchingCategories.length === 0) {
          fields.categories = ['missing'];
    }

    fields.icon = matchingCategories[0];
    fields.cluster = null;

    place.properties = fields;
    return place
  });
  return formatted
};

const vibesFromPlaces = (places) => {
  const vibes = [];
  // TODO: get frequency of vibes from a set of places
  return vibes
};

const getRecommendedVibes = (vibes) => {
  const recommended = [];
  // Find related and recommended vibes for the given set.
  return recommended
};

const scorePlaces = (
  places,
  centerPoint,
  vibes = [],
  scoreBy = ['vibes', 'distance'],
  ordering,
  zoom = 12,
) => {
  //console.log('scorePlaces: ', places, ordering, scoreBy)

  // Default max values; These will get set by the max in each field
  let maxScores = {};

  //defaults should be on extreme ends to prevent logical errors
  scoreBy.map((field) => (maxScores[field] = 0.00001));

  // Default min values; These will get set by the min in each field
  let minScores = {};
  scoreBy.map((field) => (minScores[field] = Infinity));

  // Bonuses between 1 and 10
  // TODO reconfigure bonus scores in a way that is more mathematically sound
  const vibeMatchBonus = 20;

  // TODO: If ordered by vibe, rank matches very high
  const vibeRankBonus = ordering == 'vibe' ? 30 : 20;

  const offerBonus = 5;
  const openBonus = 2.5;
  const popularBonus = 5;


  // to use zoom-weight scaling

  // Just need way to get zoom level (zoom)
  let zoom_to_use = null;
  if (zoom <= 10){
    zoom_to_use = 10;
  } else {
      zoom_to_use = zoom;
  }
  let zoom_norm = normalize_all(zoom_to_use,10, 20, 0, 10);

  // Logistic growth equation. Max weight is 8, minimum of 1. Weight grows exponentially in the middle range
  let zoom_weight = 8/(1 + (7*(Math.exp(1)**(-0.7 * zoom_norm))));

  // Weight distance & rating different than other fields
  let weights = {
    category: 0,
    vibe: 10,
    distance: zoom_weight,
    rating: 0,
    hours: 0,
    offers: 0,
  };
  
  // Testing for zoom and vibes
  console.log("heeeeeey", vibes, zoom, zoom_weight);
  // If there are vibes, weigh the strongest by 3x
  // if (vibes.length > 0 && ordering === 'relevance') weights.vibe = 2
  // Do the same for other sorting preferences
  if (ordering !== 'relevance') weights[ordering] = 3;

  // Get scores and max in each category
  const placesScored = places.map((place) => {
    let fields = place.properties;

    // Give place a vibe score
    // TODO: Calculate `vibe_score` on backend with stored procedure.
    // TODO: Make a separate, modular method
    if (scoreBy.includes('vibes')) {
      //console.log("whaaaaaat", vibes, vibes.length)

      // IGNORE all this, just for future implementation on scoring vibes
/*
      let vibes_to_use = null

      // If no vibes are inputted, default to these vibes. Ideally this would be stored user vibes at some point      
      if (vibes.length === 1) {
        vibes_to_use = ["chill", "fun"]
      } else if(vibes.length === 2){
        vibes_to_use = vibes.slice(0,1)
      } else {
        vibes_to_use = vibes.slice(0,-1)
      }

      fields.vibe_score = percent_yourvibe(vibes_to_use, fields.vibes)
      console.log("eyoooooo", vibes_to_use, fields.vibes, fields.vibe_score)
      */
      // Give place a vibe score
      
      let [vibeMatches, averageRank, vibeBonus] = [0, 0, 0];

      fields.vibes_score = 0;
      // TODO: TEMP until events return vibes
      if (fields.vibes === undefined) fields.vibes = ['chill'];

      // Based off logrithmic scale, a place with 20 vibes isn't that much (twice) better than one with 10
      if (fields.vibes.length > 0) fields.vibes_score = 10 * Math.log10(fields.vibes.length);

      // Don't show markers without photos; this will analyze the vibe and quality of the image
      //Reward photos logrithmically as well. Log indicates scaling behavior, coefficient the weight
      if (fields.images && fields.images.length > 0) vibeBonus += 5 * Math.log10(fields.images.length);
      // Give direct vibe matches bonus points
      if (vibes && vibes.length > 0 && fields.vibes) {
        vibeMatches = matchLists(vibes, fields.vibes);

        //still not exactly sure what rankVibes accomplishes
        averageRank = rankVibes(vibes, fields.vibes);

        // Bonus for exact matches + all place vibes
        vibeBonus += vibeMatches * vibeMatchBonus + averageRank * vibeRankBonus;
        fields.vibes_score += vibeBonus;
      }

      // Set max vibe score
      if (fields.vibes_score > maxScores.vibes) {
        maxScores.vibes = fields.vibes_score;
      }

      if (fields.vibes_score < minScores.vibes) {
        minScores.vibes = fields.vibes_score;
      }

      /*
        console.log('Scoring weights: ', weights, ordering, vibeRankBonus)
        console.log('For these vibes: ', fields.vibes)
        console.log('Vibe score, bonus: ', fields.vibes_score, vibeBonus)
        console.log('Vibe score: ', vibeMatches, averageRank, vibeBonus)
        */
    }

    // Get scores and max in each category
    // TODO: Make a separate, modular method
    if (scoreBy.includes('categories')) {
      let [categoryMatches, averageRank, vibeBonus] = [0, 0, 0];

      fields.categories_score = 0;

      // Merge and remove duplicates
      const concatCategories = fields.categories.concat(fields.subcategories);
      const allCategories = concatCategories.filter(
        (item, index) => concatCategories.indexOf(item) == index
      );

      if (fields.categories.length > 0)
        fields.categories_score = fields.categories.length;
      //console.log('Base category score: ', fields.categories_score, allCategories)

      // Give matching categories for the vibe a bonus
      if (vibes.length > 0) {
        // Get vibes for the place category
        let categoryVibes = [];
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

        categoryMatches = matchLists(vibes, categoryVibes);
        const bonus = categoryMatches * vibeMatchBonus;
        fields.categories_score += bonus;
      }

      if (fields.categories_score > maxScores['categories']) {
        maxScores['categories'] = fields.categories_score;
      }
        if (fields.categories_score < minScores['categories']) {
          minScores['categories'] = fields.categories_score;
      }
    }

    // Add score for the number of likes or RSVPs for events
    if (scoreBy.includes('likes')) {
      // Set max aggregate score
      if (fields.likes > maxScores['likes']) {
        maxScores['likes'] = fields.likes;
      }

      if (fields.likes < minScores['likes']) {
        minScores['likes'] = fields.likes;  
      }
    }

    // Add score for distance from user
    if (scoreBy.includes('distance')) {
      // TODO: Make a util in map.js
      const placePoint = turf__namespace.point(place.geometry.coordinates);

      // Does this return in kilometers? Miles?
      fields['distance'] = turf_distance(centerPoint, placePoint);
      // Set max distance
      if (fields['distance'] > maxScores['distance']) {
        maxScores['distance'] = fields['distance'];
      }
      if (fields['distance'] < minScores['distance']) {
        minScores['distance'] = fields['distance'];
      }
    }

    if (scoreBy.includes('aggregate_rating')) {
      // Set max aggregate score
      if (fields.aggregate_rating > maxScores['aggregate_rating']) {
        maxScores['aggregate_rating'] = fields.aggregate_rating;
      }
      if (fields.aggregate_rating < minScores['aggregate_rating']) {
        minScores['aggregate_rating'] = fields.aggregate_rating;
      }
    }

    // TODO: WIP concept for popular times and hours
    // TODO: Move to backend or make a separate, modular method
    //console.log('Score place on these fields: ', fields.offers, fields.opening_hours)
    fields.offers_score = 0;
    fields.hours_score = 0;

    // Give bonus if place has offers or is open
    if (scoreBy.includes('offers')) {
      if (fields.offers && fields.offers.length > 0) {
        fields.offers_score = offerBonus;
      }

      let {openNow, openToday, opens, closes, isPopular} = isOpen(
        fields.opening_hours
      );

      // Store in place details
      // TODO: Make sure these field name match the upgraded API
      fields.open_now = openNow;
      fields.popular_now = isPopular;
      fields.opens = opens;
      fields.closes = closes;

      // Give bonus if open now
      if (openToday) fields.hours_score += openBonus;
      if (openNow) fields.hours_score += openBonus;
      if (isPopular) fields.hours_score += popularBonus;
    }

    place.properties = fields;
    return place
  });

  // Now normalize all the scores
  let maxAverageScore = 0;
  let minAverageScore = Infinity;

  // Normalize each place by the top scores across all results
  let placesScoredAveraged = placesScored.map((place) => {
    let fields = place.properties;

    // TODO: This could be more steamlined automatically for each key in scoreBy
    if (scoreBy.includes('vibes')) {
      fields.vibes_score = normalize_all(fields.vibes_score, minScores['vibes'], maxScores['vibes'], 0, 1);
      fields.vibes_score = fields.vibes_score * weights['vibe'];
      //console.log('fields.vibes_score: ', fields.name, fields.vibes_score)
    }

    if (scoreBy.includes('categories')) {
      fields.categories_score = normalize_all(
        fields.categories_score, minScores['categories'], maxScores['categories'], 0, 1);
      fields.categories_score = fields.categories_score * weights['category'];
      //console.log('fields.categories_score: ', fields.name, fields.categories_score)
    }

    if (scoreBy.includes('likes')) {
      fields.likes_score = normalize_all(fields.likes, minScores['likes'], maxScores['likes'], 0, 1);
    }

    // Get average rating and scale it by a factor
    if (scoreBy.includes('aggregate_rating')) {
      fields.aggregate_rating_score = normalize_all(
        fields.aggregate_rating, minScores['aggregate_rating'], maxScores['aggregate_rating'], 0, 1);
      fields.aggregate_rating_score *= weights.rating;
    }

    // Smallest distance gets largest score
    if (scoreBy.includes('distance')) {
      let maxDistance = maxScores['distance'];

      /* currently distance scores are scored linearly. we want it such that depending on zoom level, we may or may not care
      about the distance score. Adjust weight depending on zoom level. With inverted logistic scale. So as you get closer,
      exponentially higher score
      */
      fields.distance_score = normalize_all(
        maxDistance - fields.distance, minScores['distance'], maxScores['distance'], 0, 1);
      fields.distance_score *= weights.distance;
    }

    if (scoreBy.includes('hours')) {
      fields.hours_score *= weights.hours;
    }

    const reasons = scoreBy;
    const scores = scoreBy.map((field) => fields[field + '_score']);

    // Find the larged score
    const largestIndex = scores.indexOf(Math.max.apply(null, scores));

    // Find the smallest score

    scores.indexOf(Math.min.apply(null, scores));

    // Take an average of each of the scores
    fields.average_score = scores.reduce((a, b) => a + b, 0) / scores.length;
    // Update the top average score
    if (fields.average_score > maxAverageScore)
      maxAverageScore = fields.average_score;

    if (fields.average_score < minAverageScore)
      minAverageScore = fields.average_score;
    // Add the update the reason code
    fields.reason = reasons[largestIndex];

    place.properties = fields;
    return place
  });

  // Re-sort by average score
  const placesScoredAndSorted = placesScoredAveraged.sort(
    (a, b) => b.properties.average_score - a.properties.average_score
  );

  // Normalize the scores between 0.65 and 1
  const placesSortedAndNormalized = placesScoredAndSorted.map((place) => {
    let fields = place.properties;

    fields.average_score =

      //final score returned to user is normalized between 0.65 and 1
      normalize_all(fields.average_score, minAverageScore, maxAverageScore, 0.65, 1); 
    // Scale the icon size based on score
    fields.icon_size = scaleIconSize(fields.average_score, 10);

    return place
  });

  // TODO: for debugging only
  /*placesSortedAndNormalized.map((place) => {
    console.log(place.properties.name)
    console.log(' - score: ', place.properties.average_score)
    console.log(' - vibes_score: ', place.properties.vibes_score)
    console.log(' - aggregate rating: ', place.properties.aggregate_rating_score)
    console.log(' - distance: ', place.properties.distance_score, "weight: ", weights.distance)
    console.log(' - reason: ', place.properties.reason)
  })
*/
  return placesSortedAndNormalized
};

const sortLocations = (locations, currentLocation) => {
  let current = turf__namespace.point([
    currentLocation.longitude,
    currentLocation.latitude,
  ]);

  // Sort the list of places based on closness to the users
  let sorted_locations = locations.sort((a, b) => {
    let point_a = turf__namespace.point(a.centerpoint);
    let point_b = turf__namespace.point(b.centerpoint);

    a.distance = turf_distance(current, point_a);
    b.distance = turf_distance(current, point_b);

    if (a.distance > b.distance) {
      return 1
    } else {
      return -1
    }
  });

  return sorted_locations
};

const toTitleCase = (str) => {
  if (typeof str == 'string') {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ')
  } else {
    return str
  }
};

exports.decodePlaces = decodePlaces;
exports.displayHours = displayHours;
exports.encodeCardIndex = encodeCardIndex;
exports.fetchEvents = fetchEvents;
exports.fetchPlacePicks = fetchPlacePicks;
exports.fetchPlacesDetails = fetchPlacesDetails;
exports.filterList = filterList;
exports.findPlaceCategories = findPlaceCategories;
exports.formatPlaces = formatPlaces;
exports.fuzzyMatch = fuzzyMatch;
exports.getAPIParams = getAPIParams;
exports.getArea = getArea;
exports.getBounds = getBounds;
exports.getCategoryMatch = getCategoryMatch;
exports.getDistance = getDistance;
exports.getDistanceToPixels = getDistanceToPixels;
exports.getFeaturesInBounds = getFeaturesInBounds;
exports.getFullLink = getFullLink;
exports.getHeatmap = getHeatmap;
exports.getMax = getMax;
exports.getMin = getMin;
exports.getPosition = getPosition;
exports.getRadius = getRadius;
exports.getRandomItem = getRandomItem;
exports.getRecommendedVibes = getRecommendedVibes;
exports.getTimeOfDay = getTimeOfDay;
exports.getTopVibes = getTopVibes;
exports.getVibeStyle = getVibeStyle;
exports.getWaveFromVibe = getWaveFromVibe;
exports.isClosedToday = isClosedToday;
exports.isOpen = isOpen;
exports.matchLists = matchLists;
exports.normalize = normalize;
exports.normalize_all = normalize_all;
exports.rankVibes = rankVibes;
exports.scaleDensityArea = scaleDensityArea;
exports.scaleDensityBonus = scaleDensityBonus;
exports.scaleIconSize = scaleIconSize;
exports.scaleMarker = scaleMarker;
exports.scaleScore = scaleScore;
exports.scaleSelectedMarker = scaleSelectedMarker;
exports.scorePlaces = scorePlaces;
exports.sortByKey = sortByKey;
exports.sortLocations = sortLocations;
exports.toTitleCase = toTitleCase;
exports.vibesFromPlaces = vibesFromPlaces;
exports.zoomToRadius = zoomToRadius;
