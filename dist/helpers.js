'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var geoViewport = require('@mapbox/geo-viewport');
var d3Scale = require('d3-scale');
var turf = require('@turf/turf');
var chroma = require('chroma-js');
var dayjs = require('dayjs');
var escapeRegExp = require('lodash.escaperegexp');
var filter = require('lodash.filter');
var Fuse = require('fuse.js');
var isBetween = require('dayjs/plugin/isBetween');
var url = require('url');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var geoViewport__default = /*#__PURE__*/_interopDefaultLegacy(geoViewport);
var chroma__default = /*#__PURE__*/_interopDefaultLegacy(chroma);
var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);
var escapeRegExp__default = /*#__PURE__*/_interopDefaultLegacy(escapeRegExp);
var filter__default = /*#__PURE__*/_interopDefaultLegacy(filter);
var Fuse__default = /*#__PURE__*/_interopDefaultLegacy(Fuse);
var isBetween__default = /*#__PURE__*/_interopDefaultLegacy(isBetween);
var url__default = /*#__PURE__*/_interopDefaultLegacy(url);

var asset = {
	font: {
		icon: {
			name: "Nantes",
			woff: "https://etldev.blob.core.windows.net/fonts/Nantes-Regular.woff"
		}
	}
};
var color = {
	base: {
		white: "#ffffff",
		black: "#000000",
		gray: {
			"50": "#f9f7fc",
			"100": "#efeff4",
			"200": "#e2e2ed",
			"300": "#e4e4ea",
			"400": "#d1d0d8",
			"500": "#b2b1bc",
			"600": "#9999a3",
			"700": "#7d7c84",
			"800": "#535156",
			"900": "#3c3b3f",
			"1000": "#242326"
		},
		yellow: {
			bright: "#fdff00",
			deep: "#ef9b0d",
			light: "#fdff00",
			pastel: "#f1ffcf",
			primary: "#fded35"
		},
		lime: {
			bright: "#64ff00",
			deep: "#58e86b",
			light: "#a8f36a",
			pastel: "#d4ffdc",
			primary: "#78ec6c"
		},
		green: {
			bright: "#54ff95",
			deep: "#006e59",
			light: "#61ecb2",
			pastel: "#cef4d1",
			primary: "#00b459"
		},
		teal: {
			bright: "#00ffe4",
			deep: "#205273",
			light: "#00cec8",
			pastel: "#c4f7f4",
			primary: "#57b5b1"
		},
		blue: {
			bright: "#0000ff",
			deep: "#000045",
			light: "#3cd8ff",
			pastel: "#a0e5f7",
			primary: "#2d76cc"
		},
		violet: {
			bright: "#6b00d7",
			deep: "#190087",
			light: "#0f358e",
			pastel: "#5172bf",
			primary: "#0f358e"
		},
		purple: {
			bright: "#9100ff",
			deep: "#3e00b3",
			light: "#d391fa",
			pastel: "#e5d0ff",
			primary: "#3e00b3"
		},
		magenta: {
			bright: "#ff00ff",
			deep: "#7e1a65",
			light: "#e779b8",
			pastel: "#f4e4db",
			primary: "#7e1a65"
		},
		red: {
			bright: "#ff0000",
			deep: "#a30000",
			light: "#ff6434",
			pastel: "#ffccbc",
			primary: "#dd2c00"
		},
		orange: {
			bright: "#ef7200",
			deep: "#e55929",
			light: "#d99566",
			pastel: "#fff3e0",
			primary: "#ff5722"
		},
		golden: {
			bright: "#f7941d",
			deep: "#c66900",
			light: "#ffc947",
			pastel: "#ffffe4",
			primary: "#ff9800"
		}
	},
	heatmap: {
		first: "rgba(255, 200, 71, 0.8)",
		second: "rgba(255, 0, 255, 0.8)",
		third: "rgba(178, 77, 255, 0.8)",
		fourth: "rgba(161, 230, 247, 0.6)",
		fifth: "rgba(205, 244, 208, 0.4)",
		sixth: "#f9f7fc"
	},
	vibes: {
		active: {
			primary: "#64ff00",
			secondary: "#c4f7f4"
		},
		adventurous: {
			primary: "#00b459",
			secondary: "#c4f7f4"
		},
		airy: {
			primary: "#fff3e0",
			secondary: "#f1ffcf"
		},
		architectural: {
			primary: "#7e1a65",
			secondary: "#fff3e0"
		},
		aquatic: {
			primary: "#0000ff",
			secondary: "#00cec8"
		},
		art: {
			primary: "#d391fa",
			secondary: "#00cec8"
		},
		authentic: {
			primary: "#ffccbc",
			secondary: "#ffffe4"
		},
		aware: {
			primary: "#9100ff",
			secondary: "#00ffe4",
			tertiary: "#fff3e0"
		},
		beautiful: {
			primary: "#2d76cc",
			secondary: "#d391fa"
		},
		belonging: {
			primary: "#f7941d",
			secondary: "#ffccbc"
		},
		blissful: {
			primary: "#e779b8",
			secondary: "#f1ffcf"
		},
		bold: {
			primary: "#ef7200",
			secondary: "#f4e4db"
		},
		bright: {
			primary: "#fdff00",
			secondary: "#d4ffdc"
		},
		busy: {
			primary: "#e55929",
			secondary: "#ff9800"
		},
		buzzing: {
			primary: "#ff9800",
			secondary: "#fded35",
			tertiary: "#c66900"
		},
		calm: {
			primary: "#d4ffdc",
			secondary: "#3cd8ff"
		},
		celebration: {
			primary: "#ff9800",
			secondary: "#f1ffcf"
		},
		celebratory: {
			primary: "#ff9800",
			secondary: "#f1ffcf"
		},
		charming: {
			primary: "#5172bf",
			secondary: "#e5d0ff"
		},
		cheerful: {
			primary: "#f4e4db",
			secondary: "#fff3e0"
		},
		chill: {
			primary: "#00ffe4",
			secondary: "#d4ffdc",
			tertiary: "#ffffe4"
		},
		civic: {
			primary: "#ff5722",
			secondary: "#2d76cc"
		},
		classic: {
			primary: "#f7941d",
			secondary: "#c4f7f4"
		},
		colorful: {
			primary: "#d391fa",
			secondary: "#61ecb2"
		},
		community: {
			primary: "#ffccbc",
			secondary: "#e5d0ff"
		},
		contemplative: {
			primary: "#a0e5f7",
			secondary: "#c4f7f4"
		},
		cool: {
			primary: "#57b5b1",
			secondary: "#3cd8ff"
		},
		courageous: {
			primary: "#d391fa",
			secondary: "#fff3e0"
		},
		collective: {
			primary: "#f1ffcf",
			secondary: "#000045"
		},
		cozy: {
			primary: "#ffc947",
			secondary: "#ef9b0d"
		},
		curious: {
			primary: "#54ff95",
			secondary: "#ef9b0d"
		},
		creative: {
			primary: "#a0e5f7",
			secondary: "#9100ff"
		},
		crowded: {
			primary: "#000045",
			secondary: "#ffccbc"
		},
		diverse: {
			primary: "#00ffe4",
			secondary: "#e5d0ff"
		},
		dreamy: {
			primary: "#d391fa",
			secondary: "#f1ffcf",
			tertiary: "#a0e5f7"
		},
		ecletic: {
			primary: "#00ffe4",
			secondary: "#e5d0ff"
		},
		edgy: {
			primary: "#0f358e",
			secondary: "#fff3e0"
		},
		energetic: {
			primary: "#ff9800",
			secondary: "#fded35",
			tertiary: "#ef9b0d"
		},
		energy: {
			primary: "#ff5722",
			secondary: "#ff9800"
		},
		exciting: {
			primary: "#fded35",
			secondary: "#ff00ff"
		},
		family: {
			primary: "#54ff95",
			secondary: "#a0e5f7"
		},
		festive: {
			primary: "#190087",
			secondary: "#ffffe4"
		},
		fierce: {
			primary: "#a30000",
			secondary: "#ffccbc"
		},
		fragrant: {
			primary: "#cef4d1",
			secondary: "#d4ffdc"
		},
		friendly: {
			primary: "#3cd8ff",
			secondary: "#d391fa"
		},
		fun: {
			primary: "#fded35",
			secondary: "#d391fa"
		},
		generous: {
			primary: "#a8f36a",
			secondary: "#ffc947"
		},
		happy: {
			primary: "#ef9b0d",
			secondary: "#d4ffdc"
		},
		historic: {
			primary: "#c66900",
			secondary: "#fff3e0"
		},
		hopeful: {
			primary: "#f7941d",
			secondary: "#d4ffdc"
		},
		iconic: {
			primary: "#7e1a65",
			secondary: "#f4e4db"
		},
		inspired: {
			primary: "#57b5b1",
			secondary: "#58e86b",
			gradient: "#000000"
		},
		joyful: {
			primary: "#fdff00",
			secondary: "#ffc947"
		},
		legacy: {
			primary: "#d391fa",
			secondary: "#a0e5f7"
		},
		lively: {
			primary: "#ff5722",
			secondary: "#a0e5f7"
		},
		local: {
			primary: "#ff00ff",
			secondary: "#a8f36a"
		},
		love: {
			primary: "#ff0000",
			secondary: "#e5d0ff"
		},
		magical: {
			primary: "#fdff00",
			secondary: "#e779b8"
		},
		mindful: {
			primary: "#57b5b1",
			secondary: "#2d76cc"
		},
		music: {
			primary: "#d391fa",
			secondary: "#fded35"
		},
		"new": {
			primary: "#64ff00",
			secondary: "#e5d0ff"
		},
		nostalgic: {
			primary: "#000045",
			secondary: "#d99566"
		},
		old: {
			primary: "#57b5b1",
			secondary: "#ffccbc"
		},
		oldschool: {
			primary: "#2d76cc",
			secondary: "#ef7200",
			tertiary: "#ffccbc"
		},
		outdoors: {
			primary: "#00b459",
			secondary: "#a8f36a"
		},
		party: {
			primary: "#9100ff",
			secondary: "#ffccbc"
		},
		patio: {
			primary: "#fded35",
			secondary: "#a8f36a"
		},
		passionate: {
			primary: "#ff6434",
			secondary: "#ff5722"
		},
		peaceful: {
			primary: "#54ff95",
			secondary: "#57b5b1"
		},
		playful: {
			primary: "#00cec8",
			secondary: "#a8f36a",
			tertiary: "#00cec8"
		},
		playtime: {
			primary: "#00cec8",
			secondary: "#a8f36a",
			tertiary: "#00cec8"
		},
		popular: {
			primary: "#e779b8",
			secondary: "#ffc947"
		},
		proud: {
			primary: "#e779b8",
			secondary: "#ffc947"
		},
		positive: {
			primary: "#fdff00",
			secondary: "#ffc947"
		},
		quiet: {
			primary: "#e5d0ff",
			secondary: "#e2e2ed"
		},
		quiet_energy: {
			primary: "#3cd8ff",
			secondary: "#cef4d1",
			tertiary: "#ffffe4"
		},
		relaxing: {
			primary: "#2d76cc",
			secondary: "#c4f7f4"
		},
		retro: {
			primary: "#d391fa",
			secondary: "#ffccbc"
		},
		romantic: {
			primary: "#ff0000",
			secondary: "#e5d0ff"
		},
		rousing: {
			primary: "#c4f7f4",
			secondary: "#f1ffcf"
		},
		scenic: {
			primary: "#58e86b",
			secondary: "#c4f7f4"
		},
		serene: {
			primary: "#d4ffdc",
			secondary: "#fded35"
		},
		shimmy: {
			primary: "#e5d0ff",
			secondary: "#fded35"
		},
		sleepy: {
			primary: "#57b5b1",
			secondary: "#5172bf"
		},
		social: {
			primary: "#9100ff",
			secondary: "#f1ffcf",
			tertiary: "#ffccbc"
		},
		solidarity: {
			primary: "#9100ff",
			secondary: "#00ffe4",
			tertiary: "#fff3e0"
		},
		spiritual: {
			primary: "#3e00b3",
			secondary: "#f4e4db"
		},
		spontaneous: {
			primary: "#e5d0ff",
			secondary: "#f4e4db"
		},
		together: {
			primary: "#ff0000",
			secondary: "#ffccbc",
			tertiary: "#f1ffcf"
		},
		trending: {
			primary: "#ffc947",
			secondary: "#ffc947"
		},
		tropical: {
			primary: "#61ecb2",
			secondary: "#fdff00"
		},
		trust: {
			primary: "#ffc947",
			secondary: "#e779b8"
		},
		unique: {
			primary: "#0000ff",
			secondary: "#e5d0ff"
		},
		vibrant: {
			primary: "#9100ff",
			secondary: "#ffccbc"
		},
		whimsical: {
			primary: "#00cec8",
			secondary: "#fff3e0"
		},
		wild: {
			primary: "#dd2c00",
			secondary: "#f1ffcf"
		},
		wistful: {
			primary: "#ffc947",
			secondary: "#f4e4db"
		},
		witty: {
			primary: "#205273",
			secondary: "#a0e5f7"
		},
		zen: {
			primary: "#57b5b1",
			secondary: "#2d76cc"
		}
	},
	gradients: {
		quiet_energy: "#57b5b1 #d391fa"
	},
	text: {
		dark: "#3c3b3f",
		muted: "#535156",
		light: "#d1d0d8"
	},
	ui: {
		button: {
			active: "#3c3b3f",
			disabled: "#9999a3"
		},
		tab: {
			active: "#3c3b3f",
			disabled: "#b2b1bc"
		}
	}
};
var transitions = {
	base: {
		"default": "0.35s ease !default"
	}
};
var variables = {
	asset: asset,
	color: color,
	transitions: transitions
};

const constants = require('../dist/constants.js');

dayjs__default['default'].extend(isBetween__default['default']);

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
  
  constants.place_categories.map(function(category){

      let isMatch = function(name) {
          var found = categories.indexOf(name);
          if (found > -1) {                    
              return true;
          }
      };

      // Matches the search?
      let top_match = isMatch(category.name);
      if (top_match){ combined.push(category.name); }

      if (category.hasOwnProperty('categories')) {
          category.categories.map(function(sub_category){
              
              let child_match = isMatch(sub_category.name);

              if (top_match || child_match ) {
                  combined.push(sub_category.name);
              }
              
              return null
          });
      }

      return true
  });

  return combined;
};

// Fuzzy matching of strings
const fuzzyMatch = (list, searchTerm, key) => {
  let options = {
      includeScore: true,
      keys: ['value', 'name']
  };

  if (key) options.keys.push(key);
  
  const fuse = new Fuse__default['default'](list, options);
  const results = fuse.search(searchTerm);

  const filter_results = results.filter(result => { 
      if (result.score < 0.3) return true
      return false
  }, []);

  const top_results = filter_results.map(result => result.item);

  return top_results
};



// Counts the number of matches between the two lists and return and integer
const matchLists = (listA, listB) => {
    let matches = 0;
  
    if (listA.length > 0 && listB.length > 0) {
      matches = listA.filter((word) => { return listB.includes(word) }).length;
    }
  
    return matches;
};

const rankVibes = (listA, listB) => {
    let rankings = [];
  
    rankings = listA.map((word) => {
      let score = 0;
  
      if (listB.includes(word)) {
        score = listB.length - listB.indexOf(word);
      }
  
      return score;
    });
  
    const average = rankings.reduce((a, b) => a + b, 0) / rankings.length;
  
    return average;
};

const isClosedToday = (dailyHours) => {
    return (dailyHours.opens === "00:00:00" && dailyHours.closes === "00:00:00")
};

const displayHours = (hours, dayFormat='dd') => {

    let openHours = isOpen(hours);

    const weeklyHours = hours.find(({ day_of_week }) => day_of_week === 8);

    if (openHours.openEveryday) {
        let times = [];
        const time = dayjs__default['default'](openHours.opens).format('ha') + 
            '-' + 
            dayjs__default['default'](openHours.closes).format('ha');
        times.push(time);
        
        let popularFound = hours.find(day => (day.name == 'POPULAR'));
        console.log('Popular at: ', popularFound);

        return times
    }

    let i = 0;
    let orderedHours = [];

    // Check every day of the week. 
    while (i < 7) {
        // Get Label

        let dayFound = hours.find(day => day.day_of_week == i);
        let popularFound = hours.find(day => (day.day_of_week == i && day.name == 'POPULAR'));
        
        // TODO: Handle popular vs normal
        console.log('Found day and popular times: ', dayFound, popularFound);

        let isClosed = false;

        if (dayFound !== undefined) {
            isClosed =isClosedToday(dayFound);
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
                orderedHours.push({ day_of_week: i, closed: true});
            }
        } else {        
            dayFound.closed = false;
            orderedHours.push(dayFound);            
        }
        i++;
    }

    // TODO: Add patterns for nicer formating.
    // TODO: Handle localization and React templates
    let formattedHours = orderedHours.map(dailyHours => {
        //console.log('formattedHours for: ', dailyHours)
        // Shift days by 1; Monday = 1; Sunday = 0
        const day = (dailyHours.day_of_week + 1) % 7;

        if (dailyHours.closed === true) {        
            return dayjs__default['default']().day(day).format(dayFormat) + ' ' + 'Closed'
        } else {
            const opens = dailyHours.opens.split(":");
            const closes = dailyHours.closes.split(":");
    
            const time = dayjs__default['default']().day(day).format(dayFormat) + 
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
    const hour = time.hour();
  
    if (!hours) return { openNow: false, openToday: false, isPopular: false };
  
    let dayFound = hours.find(({ day_of_week }) => day_of_week === day);

    // TODO: not true if it's closed one day
    const hasDailyHours = hours.find(({ day_of_week }) => day_of_week === 8);

    const daysClosed = hours.filter(day => isClosedToday(day));

    const openEveryday = (hasDailyHours !== undefined && daysClosed.length == 0);
    
    // If open everyday and no specific hours for current day
    if (openEveryday !== undefined && dayFound === undefined) {
        dayFound = hasDailyHours;
    }
  
    if (dayFound) {
  
      const opens = dayjs__default['default'](date + ' ' + dayFound.opens);
      const closes = dayjs__default['default'](date + ' ' + dayFound.closes);
  
      // Return if open and if it's a popular time
      const openNow = time.isBetween(opens, closes);
      const isPopular = (openNow && dayFound.name === 'POPULAR');
      const hoursToday = opens.format('ha') + ' - ' + closes.format('ha');
  
      return { openNow: openNow, openToday: true, openEveryday: openEveryday, opens: opens, closes: closes, isPopular: isPopular };
  
    } else {
      return { openNow: false, openToday: false, openEveryday: false, isPopular: false };
    }
};

// Returns area for a boundary in miles
const getArea = (bounds) => {
        
  //let bounds = geoViewport.bounds([location.longitude, location.latitude], zoom, [window.width, window.height])
  let height = turf.distance(
      [bounds[0], bounds[1]], // Southwest
      [bounds[0], bounds[3]], // Northwest
      { units: 'miles' }
  );

  let width = turf.distance(
      [bounds[0], bounds[1]], // Southwest
      [bounds[2], bounds[1]], // Southeast
      { units: 'miles' }
  );

  let area = height * width;

  return area

};

// Give the boundaries for a centerpoint and zoom level
const getBounds = (location, zoom, size) => {

  let bounds = geoViewport__default['default'].bounds([location.longitude, location.latitude], zoom, [size.width, size.height], 512);

  return bounds
};

// Return all matching Vibemap categories
const getCategoryMatch = (categories) => {
  const all_categories = constants.place_categories.map(category => category.key);

  let matches = [];
  /* TODO: use a combination of filter & map */
  categories.map(category => {
      if (all_categories.includes(category)) {
          matches.push(category);
      }
      return true
  });

  return matches
};

const getDistance = (point_a, point_b) => {

  let new_distance = turf.distance(
      [point_a[0], point_a[1]],
      [point_b[0], point_b[1]],
      { units: 'miles' }
  );

  return new_distance
};

// Get pixel distance of bounds
// TODO: This should be named better
const getDistanceToPixels = (bounds, window) => {
  const left = bounds[0];
  const bottom = bounds[1];
  const right = bounds[2];

  const options = { unit: 'miles' };
  
  const latitudinal_distance = turf.distance([left, bottom],[right, bottom], options);

  let pixel_ratio = latitudinal_distance / window.width;

  return pixel_ratio

};

const getFeaturesInBounds = (features, bounds) => {

  const collection = turf.featureCollection(features);

  //const box = bbox(lineString(bounds))

  const polygon = turf.bboxPolygon(bounds.flat());

  const pointsInBounds = turf.pointsWithinPolygon(collection, polygon);

  // TODO: Will it be faster to keep features in a collection and use the turf each method? 
  return pointsInBounds.features;

};

// Parse all variety of social links and return a consistent, valid url
const getFullLink = (link, type='instagram') => {

  const domains = {
    'instagram': 'https://instagram.com/',
    'twitter': 'https://twitter.com/'
  };

  // Handle things that aren't valid string handles
  // TODO: add unit tests for link = null; link = '' and other cases
  if (link === null || link === "") return null        

  const parse_url = url__default['default'].parse(link);
  // Only the path handle
  const path = parse_url.path.replace('/', '');
  
  // Combine domain and handle
  const full_link = domains[type] + path;
  
  return full_link
};


// Return heatmap colors by vibe
/* TODO: Only use primary vibe set colors on the second half of the heatmap */
/* TODO: Get colors from vibemap-constants */
const getHeatmap = (colors, vibe) => {
    
  //let colors = color.map((color, i) => choroma(color).alpha(0.2))
  let heatmap = [];
  
  let blue = '#008ae5';
  let yellow = '#F8EE32';
  let white = '#FFFFFF';
  
  let light_blue = '#54CAF2';
  let light_green = '#9DE862';
  let light_teal = '#7DCAA5';     
  let light_pink = '#E479B0';
  let light_purple = '#BC94C4';
  let light_yellow = '#FFFCC5';
  let orange = '#F09C1F';

  /*
  let classic = ['blue', 'teal', 'yellow', 'orange']
  let blue_scale = ['gray', 'white', 'yellow', 'blue']
  let orange_scale = ['#B1E2E5',  'yellow', 'orange']
  let purple_scale = ['#B1E2E5', '#EDE70D', '#F27BA5', '#D76CE3']
  let spectral = chroma.scale('Spectral').colors(6).reverse()
  */

  let green_purple = "PiYG";
  
  const vibe_to_scale = {
      'calm': [white, light_blue, light_green, light_yellow],
      'buzzing': [white, light_pink, orange, light_yellow],
      'dreamy': [white, light_purple, orange, light_yellow],
      'oldschool': [blue, yellow,  orange],
      'playful': [white, light_teal, light_green, yellow],
      'solidarity': [white, light_yellow, yellow, orange],
      'together': [white, light_teal, light_yellow],
      'wild': green_purple
  };

  let scale = [white, light_purple, yellow, orange];

  if (vibe) scale = vibe_to_scale[vibe];

  //console.log('getHeatmap(colors, vibes): ', colors, vibe, scale)

  if (colors) {            
      let color1 = chroma__default['default']('#fafa6e');
      let color2 = chroma__default['default']('#fafa6e');
      scale = chroma__default['default'].scale([colors]);
  }

  heatmap = chroma__default['default'].scale(scale)
      .mode('lch') // lab
      //.domain([0, .1, 0.9, 1])
      .colors(6);

  
  heatmap = heatmap
      //.reverse()
      .map((color, i) => {
          let alpha = i * 0.2;
          let rgb = chroma__default['default'](color)
              .alpha(alpha)
              //.brighten(i * 0.05)
              .saturate(i * 0.05)
              .css();
          console.log('heat layer ', i, rgb);
          return rgb
      });

  /*
  heatmap = chroma.cubehelix()
      .lightness([0.3, 0.8])
      .scale() // convert to chroma.scale
      .correctLightness()
      .colors(6)

  heatmap = chroma.scale('Spectral')
      //.scale() // convert to chroma.scale
      .colors(6)
  */

  return heatmap
};

// Get HTML Position
const getPosition = (options) => {
  
  return new Promise(function (resolve, reject) {

      const options = { 
        enableHighAccuracy: true,
        timeout: 4000 
      };


      if (!navigator.geolocation || !navigator.geolocation.getCurrentPosition) resolve(false);

      function success(position) {
          //console.log('got position: ', position)
          resolve(position);                
      }

      function error(err) {
          //console.log('Error with location: ', err)
          reject(false);
          console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
      //console.log('Getting position: ', navigator.geolocation, navigator.geolocation.getCurrentPosition, position)

  })
};

// Return radius within bounds in miles
const getRadius = (bounds) => {
  
  let diameter = turf.distance(
      [bounds[0], bounds[1]],
      [bounds[2], bounds[3]],
      { units: 'miles'}
  );

  let new_distance = diameter / 2;

  return new_distance

};

const getMax = (items, attribute) => {
  let max = 0;
  items.forEach(item => {
      let value = item['properties'][attribute];
      if (value > max) { 
          max = value; 
      }
  });

  return max
};

const getMin = (items, attribute) => {
  let min = 100;
  items.forEach(item => {
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
  if(!time || !time.isValid()) { return; } 

  var split_afternoon = 12; // 24hr time to split the afternoon
  var split_evening = 17; // 24hr time to split the evening
  var currentHour = parseFloat(time.format("HH"));

    if(currentHour >= split_afternoon && currentHour <= split_evening) {
        time_of_day = "afternoon";
    } else if(currentHour >= split_evening) {
        time_of_day = "evening";
    } else {
        time_of_day = "morning";
    }
    
    return time_of_day;
};

const getVibeStyle = (vibe) => {

  let vibe_styles = variables['color']['vibes'];

  let dark_gray = variables['color']['base']['gray']['1000'];
  let light_gray = variables['color']['base']['gray']['200'];

  let css = { color: dark_gray, background: light_gray };

  if (vibe in vibe_styles) {
      let primary = vibe_styles[vibe]['primary'];

      let luminance = chroma__default['default'](primary).luminance();
      let brightness = 1.2;
      if (luminance < 0.1) brightness += 2;
      if (luminance < 0.3) brightness += 1;

      let gradient = 'linear-gradient(45deg, ' + chroma__default['default'](primary).brighten(brightness).hex() + ' 0%, ' + light_gray + ' 75%)';

      css['background'] = gradient;
  }

  return css
};

const getWaveFromVibe = (vibe) => {
    switch (vibe) {
      case 'buzzing':
        return 'high'        
      default:
        return 'medium'        
    }

  };


const normalize = (val, min, max) => {
    return (val - min) / (max - min) * 10;
};

const scaleIconSize = (score, max) => {

    const scale = d3Scale.scalePow(1)
      .domain([0, max])
      .range([1, 5]);
  
    return scale(score);
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

  let scale = d3Scale.scalePow(1)
      .domain([0, max])
      .range([base_marker, max_marker]);
          
  let scaled_size = Math.round(scale(score));        

  return scaled_size
};

// Maps the relative density of place to a known range for Vibemap's cities
const scaleDensityArea = (density, area) => {
  // TODO: Make these contants? 
  let density_scale = d3Scale.scalePow(2)
      .domain([1, 60, 1000])
      .range([0, 0.8, 1]);

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
  let scale = d3Scale.scalePow(1)
      .domain([0, 5])
      .range([60, 100]);
  
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

const scorePlaces = (places, centerPoint, vibes, scoreBy = ['vibes', 'distance'], ordering) => {
  console.log('scorePlaces: ', ordering, scoreBy);
  // Default max values; These will get set by the max in each field
  let maxScores = {};
  scoreBy.map((field) => maxScores[field] = 1);

  // Bonuses between 1 and 10
  const vibeMatchBonus = 5;

  // TODO: If ordered by vibe, rank matches very high

  const vibeRankBonus = ordering == 'vibe' ? 20 : 10;
  const offerBonus = 5;
  const openBonus = 2.5;
  const popularBonus = 5;

  // Weight distance & rating different than other fields
  let weights = { 
      category: 0.6,
      vibe: 0.8, 
      distance: 0.2, 
      rating: 0.6, 
      hours: 0.4, 
      offers: 0.6 
  };

  // If there are vibes, weight that the strongest by 3x
  //if (vibes.length > 0 && ordering === 'relevance') weights.vibe = 2 
  // Do the same for other sorting preferences
  if (ordering !== 'relevance') weights[ordering] = 3;

  // Get scores and max in each category
  const placesScored = places.map((place) => {

      let fields = place.properties;

      if (scoreBy.includes('vibes')) {
          // Give place a vibe score
          let [vibeMatches, averageRank, vibeBonus] = [0, 0, 0];

          fields.vibes_score = 0;
          // TODO: TEMP until events return vibes
          if (fields.vibes === undefined) fields.vibes = ['chill'];
          if (fields.vibes.length > 0) fields.vibes_score = fields.vibes.length;

          // Don't show markers without photos; this will analyze the vibe and quality of the image
          if (fields.images && fields.images.length > 0) vibeBonus += vibeMatchBonus;
          
          // Give direct vibe matches bonus points
          if (vibes.length > 0 && fields.vibes) {
              vibeMatches = matchLists(vibes, fields.vibes);
              averageRank = rankVibes(vibes, fields.vibes);

              vibeBonus = vibeMatches * vibeMatchBonus + averageRank * vibeRankBonus;
              fields.vibes_score += vibeBonus;
          }

          // Set max vibe score
          if (fields.vibes_score > maxScores.vibes) {
              maxScores.vibes = fields.vibes_score;
          } 

          /*
          console.log('Scoring weights: ', weights, ordering, vibeRankBonus)
          console.log('For these vibes: ', fields.vibes)
          console.log('Vibe score, bonus: ', fields.vibes_score, vibeBonus)
          console.log('Vibe score: ', vibeMatches, averageRank, vibeBonus)
          */
      }

      if (scoreBy.includes('categories')) {
          let [categoryMatches, averageRank, vibeBonus] = [0, 0, 0];
          
          fields.categories_score = 0;

          // Merge and remove duplicates
          const concatCategories = fields.categories.concat(fields.subcategories);
          const allCategories = concatCategories.filter((item, index) => concatCategories.indexOf(item) == index);

          if (fields.categories.length > 0) fields.categories_score = fields.categories.length;                
          //console.log('Base category score: ', fields.categories_score, allCategories)
          
          // Give matching categories for the vibe a bonus
          if (vibes.length > 0) {            
              // Get vibes for the place category
              let categoryVibes = [];
              allCategories.forEach(category => {
                  //console.log('Category: ', fields.name, category)
                  // TODO: There probably a cleaner way to search for both categories and subcategories
                  const foundCategories = constants.place_sub_categories.filter(o => o.main_category.includes(category));
                  const foundSubcategories = constants.place_sub_categories.filter(o => o.name.includes(category));

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
      }

      if (scoreBy.includes('likes')) {
          // Set max aggregate score
          if (fields.likes > maxScores['likes']) {
              maxScores['likes'] = fields.likes;
          }
      }

      if (scoreBy.includes('distance')) {
          const placePoint = turf.point(place.geometry.coordinates);
          fields['distance'] = turf.distance(centerPoint, placePoint);
          // Set max distance
          if (fields['distance'] > maxScores['distance']) {
              maxScores['distance'] = fields['distance'];
          }
      }

      if (scoreBy.includes('aggregate_rating')) {
          // Set max aggregate score
          if (fields.aggregate_rating > maxScores['aggregate_rating']) {
              maxScores['aggregate_rating'] = fields.aggregate_rating;
          }
      }

      /* TODO: WIP concept for popular times and hours */
      //console.log('Score place on these fields: ', fields.offers, fields.opening_hours)
      fields.offers_score = 0;
      fields.hours_score = 0;

      if (scoreBy.includes('offers')) {
          if (fields.offers && fields.offers.length > 0) {

              fields.offers_score = offerBonus;

              //let currentTime = dayjs()
              /* TODO: Add or subract and hour from popular times and compare */
              // console.log('score with currentTime (day, hour): ', currentTime.day(), currentTime.hour())
          }

          let { openNow, openToday, opens, closes, isPopular} = isOpen(fields.opening_hours);

          // Store in place details
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

  let maxAverageScore = 0;

  // Normalize each place by the top scores across all results
  let placesScoredAveraged = placesScored.map((place) => {
      let fields = place.properties;

      // TODO: This could be more steamlined automatically for each key in scoreBy
      if (scoreBy.includes('vibes')) {
          fields.vibes_score = normalize(fields.vibes_score, 0, maxScores['vibes']);
          fields.vibes_score = fields.vibes_score * weights['vibe'];
          //console.log('fields.vibes_score: ', fields.name, fields.vibes_score)
      }
      
      if (scoreBy.includes('categories')) {
          fields.categories_score = normalize(fields.categories_score, 0, maxScores['categories']);
          fields.categories_score = fields.categories_score * weights['category'];
          //console.log('fields.categories_score: ', fields.name, fields.categories_score)
      }

      if (scoreBy.includes('likes')) fields.likes_score = normalize(fields.likes, 0, maxScores['likes']);

      // Get average rating and scale it by a factor
      if (scoreBy.includes('aggregate_rating')) {
          fields.aggregate_rating_score = normalize(fields.aggregate_rating, 2, maxScores['aggregate_rating']);
          fields.aggregate_rating_score *= weights.rating;
      } 
      
      // Distance is inverted from max and then normalize 1-10
      if (scoreBy.includes('distance')) {
          let maxDistance = maxScores['distance'];
          fields.distance_score = normalize(maxDistance - fields.distance, 0, maxDistance);

          fields.distance_score *= weights.distance;
      }

      if (scoreBy.includes('hours')) {
          fields.hours_score *= weights.hours;
      }

      const reasons = scoreBy;        
      const scores = scoreBy.map((field) => fields[field + '_score']);            
      
      const largestIndex = scores.indexOf(Math.max.apply(null, scores));
      
      // Take an average of each of the scores
      fields.average_score = scores.reduce((a, b) => a + b, 0) / scores.length;

      // Update the top average score
      if (fields.average_score > maxAverageScore) maxAverageScore = fields.average_score;
      // Add a reason code
      fields.reason = reasons[largestIndex];
    
      place.properties = fields;
      return place
  });

  // Re-sort by average score 
  const placesScoredAndSorted = placesScoredAveraged.sort((a, b) => b.properties.average_score - a.properties.average_score);

  // Normalize the scores between 1 & 5
  const placesSortedAndNormalized = placesScoredAndSorted.map((place) => {
      let fields = place.properties;

      // Create a scaled icon
      fields.average_score = normalize(fields.average_score, 0, maxAverageScore) / 2;

      // Scale the icon size based on score
      fields.icon_size = scaleIconSize(fields.average_score, 10);

      return place
  });

  /* TODO: for debugging only 
  placesScoredAndSorted.map((place) => {
      console.log(place.properties.name)
      console.log(' - vibes_score: ', place.properties.vibes_score)
      console.log(' - aggregate rating: ', place.properties.aggregate_rating_score)
      console.log(' - distance: ', place.properties.distance_score)
      console.log(' - reason: ', place.properties.reason)
  })
  */

  return placesSortedAndNormalized
};

const sortLocations = (locations, currentLocation) => {

  let current = turf.point([currentLocation.longitude, currentLocation.latitude]);
  
  // Sort the list of places based on closness to the users
  let sorted_locations = locations.sort((a, b) => {
      let point_a = turf.point(a.centerpoint);
      let point_b = turf.point(b.centerpoint);
      a.distance = turf.distance(current, point_a);
      b.distance = turf.distance(current, point_b);
      
      if (a.distance > b.distance) {
          return 1
      } else {
          return -1
      }
  
  });

  return sorted_locations
};

const toTitleCase = (str) => {
    
  if (typeof(str) == "string") {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    } else {
        return str
    }  
};

const zoomToRadius = (zoom) => {
        
  // Scale and interpolate radius to zoom siz
  let zoom_to_radius_scale = d3Scale.scalePow(1)
    .domain([8,  12, 13, 14, 16, 18]) // Zoom size
    .range([ 40, 7,  3,  3.5, 1.5,  0.8]); // Scale of search radius

  let new_zoom = zoom_to_radius_scale(zoom);
  
  return new_zoom
};

exports.displayHours = displayHours;
exports.filterList = filterList;
exports.findPlaceCategories = findPlaceCategories;
exports.fuzzyMatch = fuzzyMatch;
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
exports.getTimeOfDay = getTimeOfDay;
exports.getVibeStyle = getVibeStyle;
exports.getWaveFromVibe = getWaveFromVibe;
exports.isClosedToday = isClosedToday;
exports.isOpen = isOpen;
exports.matchLists = matchLists;
exports.normalize = normalize;
exports.rankVibes = rankVibes;
exports.scaleDensityArea = scaleDensityArea;
exports.scaleDensityBonus = scaleDensityBonus;
exports.scaleIconSize = scaleIconSize;
exports.scaleMarker = scaleMarker;
exports.scaleScore = scaleScore;
exports.scaleSelectedMarker = scaleSelectedMarker;
exports.scorePlaces = scorePlaces;
exports.sortLocations = sortLocations;
exports.toTitleCase = toTitleCase;
exports.zoomToRadius = zoomToRadius;
