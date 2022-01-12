'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var d3Scale = require('d3-scale');
var turf = require('@turf/helpers');
var turf_distance = require('@turf/distance');
var turf_boolean = require('@turf/boolean-point-in-polygon');
var Axios = require('axios');
var fetch = require('isomorphic-fetch');
var escapeRegExp = require('lodash.escaperegexp');
var filter = require('lodash.filter');
var Fuse = require('fuse.js');
var isBetween = require('dayjs/plugin/isBetween');
var truncate = require('truncate');
var dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc');
var url = require('url');
var querystring = require('querystring');
var constants = require('./constants.js');
var map = require('./map.js');
var vibes = require('./vibes.js');
require('@mapbox/geo-viewport');
require('@turf/meta');
require('@turf/clusters');
require('@turf/bbox-polygon');
require('@turf/center');
require('@turf/truncate');
require('@turf/clusters-dbscan');
require('@turf/points-within-polygon');
require('@turf/rhumb-bearing');
require('@turf/rhumb-distance');
require('@turf/rhumb-destination');
require('chroma-js');

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
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var turf__namespace = /*#__PURE__*/_interopNamespace(turf);
var turf_distance__default = /*#__PURE__*/_interopDefaultLegacy(turf_distance);
var turf_boolean__default = /*#__PURE__*/_interopDefaultLegacy(turf_boolean);
var Axios__default = /*#__PURE__*/_interopDefaultLegacy(Axios);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
var escapeRegExp__default = /*#__PURE__*/_interopDefaultLegacy(escapeRegExp);
var filter__default = /*#__PURE__*/_interopDefaultLegacy(filter);
var Fuse__default = /*#__PURE__*/_interopDefaultLegacy(Fuse);
var isBetween__default = /*#__PURE__*/_interopDefaultLegacy(isBetween);
var truncate__default = /*#__PURE__*/_interopDefaultLegacy(truncate);
var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);
var utc__default = /*#__PURE__*/_interopDefaultLegacy(utc);
var url__default = /*#__PURE__*/_interopDefaultLegacy(url);
var querystring__default = /*#__PURE__*/_interopDefaultLegacy(querystring);

var categories = [
	{
		art: null,
		name: "Art",
		icon: "artLogo",
		vibe: "art"
	},
	{
		activism: null,
		name: "Activism",
		icon: "activistLogo",
		vibe: "Activist"
	},
	{
		comedy: null,
		name: "Comedy",
		icon: "comedyLogo",
		vibe: "funny"
	},
	{
		community: null,
		name: "Community",
		icon: "artLogo",
		vibe: "community"
	},
	{
		culture: null,
		name: "Culture",
		icon: "cultureLogo",
		vibe: "cultural"
	},
	{
		drinking: null,
		name: "Drinking",
		icon: "drinkingLogo",
		vibe: "drinking"
	},
	{
		entertainment: null,
		name: "Entertainment",
		icon: "entertainmentLogo",
		vibe: "fun"
	},
	{
		family: null,
		name: "Family",
		icon: "familyLogo",
		vibe: "family"
	},
	{
		food: null,
		name: "Food",
		icon: "foodLogo",
		vibe: "foodie"
	},
	{
		fitness: null,
		name: "Fitness",
		icon: "fitnessLogo",
		vibe: "fit"
	},
	{
		health: null,
		name: "Health",
		icon: "healthLogo",
		vibe: "healthy"
	},
	{
		learning: null,
		name: "Learning",
		icon: "learningLogo",
		vibe: "curious"
	},
	{
		music: null,
		name: "Music",
		icon: "musicLogo",
		vibe: "musical"
	},
	{
		nightlife: null,
		name: "Nightlife",
		icon: "nightlifeLogo",
		vibe: "nightlife"
	},
	{
		outdoors: null,
		name: "Outdoors",
		icon: "outdoorsLogo",
		vibe: "outdoors"
	},
	{
		shopping: null,
		name: "Shopping",
		icon: "shoppingLogo",
		vibe: "shopping"
	},
	{
		hotels: null,
		name: "Stay",
		icon: "stayLogo",
		vibe: "hotel"
	},
	{
		style: null,
		name: "Lifestyle",
		icon: "lifestyleLogo",
		vibe: "fashion"
	},
	{
		visit: null,
		name: "Visit",
		icon: "visitLogo",
		vibe: "popular"
	}
];
var allCategories = {
	categories: categories
};

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
		id: 44901,
		slug: "puerto-vallarta",
		type: "early",
		link: "https://cms.vibemap.com/cities/puerto-vallarta/",
		title: {
			rendered: "Puerto Vallarta"
		},
		location: {
			latitude: 20.615046993637947,
			longitude: -105.231817181398
		},
		mailchimp_id: "",
		database_id: "",
		name: "Puerto Vallarta"
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

var neighborhoods = [
	{
		id: 44986,
		slug: "nuevo-vallarta",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/nuevo-vallarta/",
		title: {
			rendered: "Nuevo Vallarta"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
		],
		vibe: [
		],
		map: {
			address: "Nuevo Vallarta, Nayarit, Mexico",
			lat: 20.6986205,
			lng: -105.2964898,
			zoom: 14,
			place_id: "ChIJx1CMEKNGIYQRPWRRqm8GtUw",
			name: "Nuevo Vallarta",
			city: "Nuevo Vallarta",
			state: "Nayarit",
			state_short: "Nay.",
			country: "Mexico",
			country_short: "MX"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 44981,
		slug: "5-de-diciembre",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/5-de-diciembre/",
		title: {
			rendered: "5 de Diciembre"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1103,
			2230,
			1067,
			1785
		],
		map: {
			address: "5 de Diciembre, Puerto Vallarta, Jalisco, Mexico",
			lat: 20.6167287,
			lng: -105.2297199,
			zoom: 14,
			place_id: "ChIJN8Mqn1tFIYQR-EtARl5OyN0",
			name: "5 de Diciembre",
			city: "Puerto Vallarta",
			state: "Jalisco",
			state_short: "Jal.",
			country: "Mexico",
			country_short: "MX"
		},
		radius: "0.2",
		boundary: ""
	},
	{
		id: 44973,
		slug: "versalles-la-vena",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/versalles-la-vena/",
		title: {
			rendered: "Versalles &#038; La Vena"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
		],
		vibe: [
			3024,
			1060,
			2162
		],
		map: {
			address: "Versalles, Puerto Vallarta, Jalisco, Mexico",
			lat: 20.6350676,
			lng: -105.2275257,
			zoom: 17,
			place_id: "ChIJJwolzmRFIYQRi3nqx3bnY3c",
			name: "Versalles",
			city: "Puerto Vallarta",
			state: "Jalisco",
			state_short: "Jal.",
			country: "Mexico",
			country_short: "MX"
		},
		radius: "0.4",
		boundary: ""
	},
	{
		id: 44968,
		slug: "centro",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/centro/",
		title: {
			rendered: "Centro"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			1073,
			1067
		],
		map: {
			address: "Centro, Puerto Vallarta, Jalisco, Mexico",
			lat: 20.6098697,
			lng: -105.2333768,
			zoom: 16,
			place_id: "ChIJi3XZC09FIYQRwnuggO7BZwg",
			name: "Centro",
			city: "Puerto Vallarta",
			state: "Jalisco",
			state_short: "Jal.",
			country: "Mexico",
			country_short: "MX"
		},
		radius: "0.4",
		boundary: ""
	},
	{
		id: 44963,
		slug: "zona-romantica",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/zona-romantica/",
		title: {
			rendered: "Zona Romantica"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1073,
			1903,
			1701,
			6549,
			1956
		],
		map: {
			address: "Zona Romántica, Emiliano Zapata, Puerto Vallarta, Jalisco, Mexico",
			lat: 20.6027765,
			lng: -105.2337149,
			zoom: 14,
			place_id: "ChIJ5YNYqU1FIYQRxN8em4Wifm0",
			name: "Zona Romántica",
			city: "Puerto Vallarta",
			state: "Jalisco",
			state_short: "Jal.",
			country: "Mexico",
			country_short: "MX"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 38520,
		slug: "soma",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/soma/",
		title: {
			rendered: "SoMa"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			3021,
			1100,
			2034,
			6558
		],
		map: {
			address: "SoMa, San Francisco, CA, USA",
			lat: 37.7785189,
			lng: -122.4056395,
			zoom: 17,
			place_id: "ChIJezBipoOAhYARUPnBLQwBmf0",
			name: "SoMa",
			city: "San Francisco",
			city_short: "SF",
			state: "California",
			state_short: "CA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 37522,
		slug: "downtown-oakland",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/downtown-oakland/",
		title: {
			rendered: "Downtown Oakland"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			1903,
			1906
		],
		map: {
			address: "Downtown Oakland, Oakland, CA, USA",
			lat: 37.8032973,
			lng: -122.2710602,
			zoom: 15,
			place_id: "ChIJjdkGSrSAj4ARiM-oRcnpmCE",
			name: "Downtown Oakland",
			city: "Oakland",
			state: "California",
			state_short: "CA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 37497,
		slug: "castro-san-francisco",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/castro-san-francisco/",
		title: {
			rendered: "Castro"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 34531,
		categories: [
			985
		],
		vibe: [
			1103,
			1106,
			1070,
			6549,
			2119
		],
		map: {
			address: "Castro, San Francisco, CA, USA",
			lat: 37.7609082,
			lng: -122.4350043,
			zoom: 16,
			place_id: "ChIJndQGNht-j4ARiXwy1QZmpsk",
			name: "The Castro",
			city: "San Francisco",
			city_short: "SF",
			state: "California",
			state_short: "CA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 37181,
		slug: "lafayette-obrera-guadalajara",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/lafayette-obrera-guadalajara/",
		title: {
			rendered: "Lafayette / Obrera"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			1076,
			1701
		],
		map: {
			address: "Calle Simón Bolívar 339, Col Americana, Obrera, 44140 Guadalajara, Jal., Mexico",
			lat: 20.669874401713777,
			lng: -103.37240438465577,
			zoom: 16,
			place_id: "ChIJ9dHsMQ-uKIQR34quWhz8u_k",
			street_number: "339",
			street_name: "Calle Simón Bolívar",
			city: "Guadalajara",
			state: "Jalisco",
			state_short: "Jal.",
			post_code: "44140",
			country: "Mexico",
			country_short: "MX"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 37079,
		slug: "fillmore-san-francisco",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/fillmore-san-francisco/",
		title: {
			rendered: "Fillmore District"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			5039,
			1073,
			2119
		],
		map: {
			address: "Fillmore Street, San Francisco, CA, USA",
			lat: 37.786566,
			lng: -122.4333927,
			zoom: 15,
			place_id: "EiNGaWxsbW9yZSBTdCwgU2FuIEZyYW5jaXNjbywgQ0EsIFVTQSIuKiwKFAoSCS_hjJXHgIWAEWxdn6ue_hlkEhQKEgkhAGkAbZqFgBH_rXbwZxNQSg",
			name: "Fillmore Street",
			street_name: "Fillmore Street",
			street_name_short: "Fillmore St",
			city: "San Francisco",
			city_short: "SF",
			state: "California",
			state_short: "CA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36347,
		slug: "downtown-vancouver",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/downtown-vancouver/",
		title: {
			rendered: "Downtown"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			2116,
			1956,
			2119
		],
		map: {
			address: "Downtown Vancouver, Vancouver, BC, Canada",
			lat: 49.281954,
			lng: -123.1170744,
			zoom: 15,
			place_id: "ChIJsS-6QX9xhlQRqkQKVpQnlcY",
			name: "Downtown Vancouver",
			city: "Vancouver",
			state: "British Columbia",
			state_short: "BC",
			country: "Canada",
			country_short: "CA"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36165,
		slug: "jack-london-oakland",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/jack-london-oakland/",
		title: {
			rendered: "Jack London"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1060,
			1109,
			1073,
			1687
		],
		map: {
			address: "Jack London Square, Water Street, Oakland, CA, USA",
			lat: 37.79506910000001,
			lng: -122.2777955,
			zoom: 14,
			place_id: "ChIJh4bticiAj4ARWq51mwQd95E",
			name: "Jack London Square",
			street_number: "472",
			street_name: "Water Street",
			street_name_short: "Water St",
			city: "Oakland",
			state: "California",
			state_short: "CA",
			post_code: "94607",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: "[\r\n[-122.282617, 37.802862], \r\n[-122.264300, 37.795721],\r\n[-122.265502, 37.787005],\r\n[-122.288139, 37.796077],\r\n[-122.282617, 37.802862]\r\n]"
	},
	{
		id: 36160,
		slug: "monraz-guadalajara",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/monraz-guadalajara/",
		title: {
			rendered: "Monráz"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1106,
			2162,
			2119
		],
		map: {
			address: "Monraz, Guadalajara, Jalisco, Mexico",
			lat: 20.6838829,
			lng: -103.3948334,
			zoom: 15,
			place_id: "ChIJ3zGiY2euKIQRTG2-6m4D-p0",
			name: "Monraz",
			city: "Guadalajara",
			state: "Jalisco",
			state_short: "Jal.",
			post_code: "44670",
			country: "Mexico",
			country_short: "MX"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36157,
		slug: "tlaquepaque-guadalajara",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/tlaquepaque-guadalajara/",
		title: {
			rendered: "Tlaquepaque"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			3021,
			2230,
			6561,
			4828
		],
		map: {
			address: "Calle Matamoros 524H, Hacienda de Tlaquepaque, 45579 San Pedro Tlaquepaque, Jal., Mexico",
			lat: 20.628807203160175,
			lng: -103.31384336079101,
			zoom: 14,
			place_id: "ChIJaVt4OFOyKIQR9LCKejkMx5I",
			street_number: "524H",
			street_name: "Calle Matamoros",
			city: "San Pedro Tlaquepaque",
			state: "Jalisco",
			state_short: "Jal.",
			post_code: "45579",
			country: "Mexico",
			country_short: "MX"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36154,
		slug: "moderna-guadalajara",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/moderna-guadalajara/",
		title: {
			rendered: "Moderna"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1070,
			1067
		],
		map: {
			address: "Polonia 93, Moderna, 44190 Guadalajara, Jal., Mexico",
			lat: 20.663603891205657,
			lng: -103.3612885989502,
			zoom: 15,
			place_id: "ChIJX7JsM0itKIQRD7vQdO99ptA",
			street_number: "93",
			street_name: "Polonia",
			city: "Guadalajara",
			state: "Jalisco",
			state_short: "Jal.",
			post_code: "44190",
			country: "Mexico",
			country_short: "MX"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36151,
		slug: "chapalita-guadalajara",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/chapalita-guadalajara/",
		title: {
			rendered: "Chapalita"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			1106
		],
		map: {
			address: "Av. Adolfo López Mateos Sur 1460, Chapalita, Guadalajara, Jal., Mexico",
			lat: 20.663216991873846,
			lng: -103.39528387829588,
			zoom: 17,
			place_id: "ChIJdWowaniuKIQR9SF1b-SUNcI",
			street_number: "1460",
			street_name: "Avenida Adolfo López Mateos Sur",
			street_name_short: "Avenida A. López Mateos",
			city: "Guadalajara",
			state: "Jalisco",
			state_short: "Jal.",
			country: "Mexico",
			country_short: "MX"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36148,
		slug: "providencia-guadalajara",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/providencia-guadalajara/",
		title: {
			rendered: "Providencia"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1106,
			1076
		],
		map: {
			address: "Providencia, Guadalajara, Jalisco, Mexico",
			lat: 20.7019816,
			lng: -103.378224,
			zoom: 14,
			place_id: "ChIJG6ZO4TauKIQRtu20HkKYyaQ",
			name: "Providencia",
			city: "Guadalajara",
			state: "Jalisco",
			state_short: "Jal.",
			post_code: "44630",
			country: "Mexico",
			country_short: "MX"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36145,
		slug: "zapopan-centro-guadalajara",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/zapopan-centro-guadalajara/",
		title: {
			rendered: "Zapopan Centro"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			1067,
			1076
		],
		map: {
			address: "Zapopan, Jalisco, Mexico",
			lat: 20.6719563,
			lng: -103.416501,
			zoom: 14,
			place_id: "ChIJE0xwqWGuKIQRrALQftSl2K8",
			name: "Zapopan",
			city: "Zapopan",
			state: "Jalisco",
			state_short: "Jal.",
			country: "Mexico",
			country_short: "MX"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36143,
		slug: "centro-guadalajara",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/centro-guadalajara/",
		title: {
			rendered: "Centro"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			1067
		],
		map: {
			address: "Centro, Guadalajara, Jalisco, Mexico",
			lat: 20.6866131,
			lng: -103.3507872,
			zoom: 14,
			place_id: "ChIJRVIRDOexKIQRD5KP_bz3CkU",
			name: "Centro",
			city: "Guadalajara",
			state: "Jalisco",
			state_short: "Jal.",
			post_code: "44100",
			country: "Mexico",
			country_short: "MX"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36140,
		slug: "mexicaltzingo-guadalajara",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/mexicaltzingo-guadalajara/",
		title: {
			rendered: "Mexicaltzingo"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			2230,
			1067
		],
		map: {
			address: "Mexicaltzingo, Guadalajara, Jalisco, Mexico",
			lat: 20.6676254,
			lng: -103.3505188,
			zoom: 14,
			place_id: "ChIJrbiNlfixKIQR84mf2aIdEWM",
			name: "Mexicaltzingo",
			city: "Guadalajara",
			state: "Jalisco",
			state_short: "Jal.",
			country: "Mexico",
			country_short: "MX"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36137,
		slug: "santa-tere-guadalajara",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/santa-tere-guadalajara/",
		title: {
			rendered: "Santa Tere"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			2230,
			2119
		],
		map: {
			address: "Calle Andrés Terán 484, Santa Teresita, 44600 Guadalajara, Jal., Mexico",
			lat: 20.683636195948008,
			lng: -103.36814401852416,
			zoom: 15,
			place_id: "ChIJr3hqCoevKIQRFQmQJ_Y7l2o",
			street_number: "484",
			street_name: "Calle Andrés Terán",
			city: "Guadalajara",
			state: "Jalisco",
			state_short: "Jal.",
			post_code: "44600",
			country: "Mexico",
			country_short: "MX"
		}
	},
	{
		id: 36134,
		slug: "americana-guadalajara",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/americana-guadalajara/",
		title: {
			rendered: "Americana"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			2224,
			1701
		],
		map: {
			address: "Americana, Guadalajara, Jalisco, Mexico",
			lat: 20.6717775,
			lng: -103.3630608,
			zoom: 15,
			place_id: "ChIJ97zDIQSuKIQRqpaW1Xg7REE",
			name: "Americana",
			city: "Guadalajara",
			state: "Jalisco",
			state_short: "Jal.",
			country: "Mexico",
			country_short: "MX"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36131,
		slug: "yaletown-vancouver",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/yaletown-vancouver/",
		title: {
			rendered: "Yaletown"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
		],
		map: {
			address: "Yaletown, Vancouver, BC, Canada",
			lat: 49.27570189999999,
			lng: -123.1199065,
			zoom: 14,
			place_id: "ChIJhfiZDdFzhlQRPykovzScbUU",
			name: "Yaletown",
			city: "Vancouver",
			state: "British Columbia",
			state_short: "BC",
			country: "Canada",
			country_short: "CA"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36128,
		slug: "west-end-vancouver",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/west-end-vancouver/",
		title: {
			rendered: "West End"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1106,
			1067
		],
		map: {
			address: "West End, Vancouver, BC, Canada",
			lat: 49.2900541,
			lng: -123.1376044,
			zoom: 14,
			place_id: "ChIJYz_9gylyhlQR2qzYMyrukxc",
			name: "West End",
			city: "Vancouver",
			state: "British Columbia",
			state_short: "BC",
			country: "Canada",
			country_short: "CA"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36122,
		slug: "north-vancouver",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/north-vancouver/",
		title: {
			rendered: "North Vancouver"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			1106
		],
		map: {
			address: "North Vancouver, BC, Canada",
			lat: 49.3199816,
			lng: -123.0724139,
			zoom: 14,
			place_id: "ChIJQSsj-UZwhlQRWuz71EvLhW8",
			name: "North Vancouver",
			city: "North Vancouver",
			state: "British Columbia",
			state_short: "BC",
			country: "Canada",
			country_short: "CA"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36117,
		slug: "gastown-vancouver",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/gastown-vancouver/",
		title: {
			rendered: "Gastown"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			5039,
			1067,
			1687,
			2119
		],
		map: {
			address: "Gastown, Vancouver, BC, Canada",
			lat: 49.2828082,
			lng: -123.1066875,
			zoom: 14,
			place_id: "ChIJe_ROYXdxhlQRYYQ3bU2m_tE",
			name: "Gastown",
			city: "Vancouver",
			state: "British Columbia",
			state_short: "BC",
			country: "Canada",
			country_short: "CA"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36114,
		slug: "east-vancouver-vancouver",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/east-vancouver-vancouver/",
		title: {
			rendered: "East Vancouver"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			3005,
			1824,
			1073,
			1067
		],
		map: {
			address: "East Vancouver, Vancouver, BC, Canada",
			lat: 49.2530487,
			lng: -123.0663828,
			zoom: 14,
			place_id: "ChIJYfR5TV9xhlQRrFUa5caFrbg",
			name: "East Vancouver",
			city: "Vancouver",
			state: "British Columbia",
			state_short: "BC",
			country: "Canada",
			country_short: "CA"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36111,
		slug: "davie-village-vancouver",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/davie-village-vancouver/",
		title: {
			rendered: "Davie Village"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			1106
		],
		map: {
			address: "Davie Village, Vancouver, BC, Canada",
			lat: 49.2804157,
			lng: -123.1311982,
			zoom: 14,
			place_id: "ChIJcemsNdNzhlQRbL9Mw62J0_4",
			name: "Davie Village",
			city: "Vancouver",
			state: "British Columbia",
			state_short: "BC",
			country: "Canada",
			country_short: "CA"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36108,
		slug: "mississippi-avenue",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/mississippi-avenue/",
		title: {
			rendered: "Mississippi Avenue"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			2464,
			3018,
			2119,
			2467
		],
		map: {
			address: "North Mississippi Avenue, Portland, OR, USA",
			lat: 45.5467446,
			lng: -122.6755671,
			zoom: 14,
			place_id: "EiROIE1pc3Npc3NpcHBpIEF2ZSwgUG9ydGxhbmQsIE9SLCBVU0EiLiosChQKEgn72gKwQ6eVVBFru9KXaieTRxIUChIJJ3SpfQsLlVQRkYXR9ua5Nhw",
			name: "North Mississippi Avenue",
			street_name: "North Mississippi Avenue",
			street_name_short: "N Mississippi Ave",
			city: "Portland",
			state: "Oregon",
			state_short: "OR",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36105,
		slug: "st-johns-portland",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/st-johns-portland/",
		title: {
			rendered: "St Johns"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
		],
		map: {
			address: "St Johns, Portland, OR, USA",
			lat: 45.5901167,
			lng: -122.7545431,
			zoom: 14,
			place_id: "ChIJfzyszwGolVQRDABWw2vPDYs",
			name: "Saint Johns",
			city: "Portland",
			state: "Oregon",
			state_short: "OR",
			post_code: "97203",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36103,
		slug: "jade-district",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/jade-district/",
		title: {
			rendered: "Jade District"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			2119
		],
		map: {
			address: "Jade District, Southeast 82nd Avenue, Portland, OR, USA",
			lat: 45.50243139999999,
			lng: -122.5785098,
			zoom: 12,
			place_id: "ChIJc4QQPkyglVQR-OcJ7DOcPC4",
			name: "Jade District",
			street_number: "2738",
			street_name: "Southeast 82nd Avenue",
			street_name_short: "SE 82nd Ave",
			city: "Portland",
			state: "Oregon",
			state_short: "OR",
			post_code: "97266",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36100,
		slug: "hawthorne-portland",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/hawthorne-portland/",
		title: {
			rendered: "Hawthorne"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			3021,
			1100,
			2034,
			1067,
			2159
		],
		map: {
			address: "Hawthorne, Portland, OR, USA",
			lat: 45.51206579999999,
			lng: -122.6305462,
			zoom: 14,
			place_id: "ChIJ52Jmx5GglVQRiQxmM6jDkbA",
			name: "Hawthorne",
			city: "Portland",
			state: "Oregon",
			state_short: "OR",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36097,
		slug: "division-clinton-portland",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/division-clinton-portland/",
		title: {
			rendered: "Division/Clinton"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			2034,
			1166,
			5581,
			2119
		],
		map: {
			address: "Southeast Clinton Street, Portland, OR, USA",
			lat: 45.5026103,
			lng: -122.5672642,
			zoom: 14,
			place_id: "EiBTRSBDbGludG9uIFN0LCBQb3J0bGFuZCwgT1IsIFVTQSIuKiwKFAoSCZ08TNi1oZVUERHP_Qy-CpIyEhQKEgkndKl9CwuVVBGRhdH25rk2HA",
			name: "Southeast Clinton Street",
			street_name: "Southeast Clinton Street",
			street_name_short: "SE Clinton St",
			city: "Portland",
			state: "Oregon",
			state_short: "OR",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36094,
		slug: "central-eastside-portland",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/central-eastside-portland/",
		title: {
			rendered: "Central Eastside"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1073,
			1067,
			2119
		],
		map: {
			address: "Central Eastside Lofts, Northeast 6th Avenue, Portland, OR, USA",
			lat: 45.523777,
			lng: -122.6598737,
			zoom: 15,
			place_id: "ChIJU7BbP6-glVQRnsq-yq-NKc8",
			name: "Central Eastside Lofts",
			street_number: "111",
			street_name: "Northeast 6th Avenue",
			street_name_short: "NE 6th Ave",
			city: "Portland",
			state: "Oregon",
			state_short: "OR",
			post_code: "97232",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36074,
		slug: "chinatown-old-town-portland",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/chinatown-old-town-portland/",
		title: {
			rendered: "Old Town / Chinatown"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1106,
			1073,
			2119,
			1906
		],
		map: {
			address: "Old Town, Portland, OR, USA",
			lat: 45.5246175,
			lng: -122.6740295,
			zoom: 14,
			place_id: "ChIJVU8NdqqglVQRTKSkbw6TKoM",
			name: "Old Town Chinatown",
			city: "Portland",
			state: "Oregon",
			state_short: "OR",
			country: "United States",
			country_short: "US"
		}
	},
	{
		id: 36071,
		slug: "pioneer-square-seattle",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/pioneer-square-seattle/",
		title: {
			rendered: "Pioneer Square"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1073,
			1070,
			1067
		],
		map: {
			address: "Pioneer Square, Seattle, WA, USA",
			lat: 47.6015184,
			lng: -122.3342975,
			zoom: 14,
			place_id: "ChIJc4rF66RqkFQRnDhOyz3vhwM",
			name: "Pioneer Square",
			city: "Seattle",
			state: "Washington",
			state_short: "WA",
			post_code: "98104",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36068,
		slug: "ballard-seattle",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/ballard-seattle/",
		title: {
			rendered: "Ballard"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1106,
			2162
		],
		map: {
			address: "Ballard, Seattle, WA, USA",
			lat: 47.6792172,
			lng: -122.3860312,
			zoom: 15,
			place_id: "ChIJgahdetUVkFQRnPTTCqyAdtA",
			name: "Ballard",
			city: "Seattle",
			state: "Washington",
			state_short: "WA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36065,
		slug: "mission-sanfrancisco",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/mission-sanfrancisco/",
		title: {
			rendered: "Mission District"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			1103,
			1067,
			2119
		],
		map: {
			address: "Mission District, San Francisco, CA, USA",
			lat: 37.7598648,
			lng: -122.4147977,
			zoom: 15,
			place_id: "ChIJIzOAXzx-j4ARiVHkPQcAWAM",
			name: "Mission District",
			city: "San Francisco",
			city_short: "SF",
			state: "California",
			state_short: "CA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36058,
		slug: "green-lake-seattle",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/green-lake-seattle/",
		title: {
			rendered: "Green Lake"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1106,
			1076
		],
		map: {
			address: "Green Lake, Seattle, WA, USA",
			lat: 47.6798338,
			lng: -122.3257826,
			zoom: 15,
			place_id: "ChIJ_WLV2hQUkFQRfCYBj_yqQsk",
			name: "Green Lake",
			city: "Seattle",
			state: "Washington",
			state_short: "WA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36047,
		slug: "georgetown-seattle",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/georgetown-seattle/",
		title: {
			rendered: "Georgetown"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1106,
			1067
		],
		map: {
			address: "Georgetown, Seattle, WA, USA",
			lat: 47.5475104,
			lng: -122.3214521,
			zoom: 15,
			place_id: "ChIJl6hjBY1BkFQRUFkxFnWBQK4",
			name: "Georgetown",
			city: "Seattle",
			state: "Washington",
			state_short: "WA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36054,
		slug: "queen-anne-seattle",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/queen-anne-seattle/",
		title: {
			rendered: "Queen Anne"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
		],
		map: {
			address: "Queen Anne, Seattle, WA, USA",
			lat: 47.6323268,
			lng: -122.3568641,
			zoom: 15,
			place_id: "ChIJS04boGsVkFQR9Z2OSenfW94",
			name: "Queen Anne",
			city: "Seattle",
			state: "Washington",
			state_short: "WA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36050,
		slug: "capitol-hill-seattle",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/capitol-hill-seattle/",
		title: {
			rendered: "Capitol Hill"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1100,
			1073,
			6549,
			2119,
			5559
		],
		map: {
			address: "Capitol Hill, Seattle, WA, USA",
			lat: 47.625305,
			lng: -122.3221835,
			zoom: 15,
			place_id: "ChIJYWHIVygVkFQRhVHCu8Z9SO8",
			name: "Capitol Hill",
			city: "Seattle",
			state: "Washington",
			state_short: "WA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36044,
		slug: "chinatown-seattle",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/chinatown-seattle/",
		title: {
			rendered: "Chinatown-International District"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
		],
		map: {
			address: "Chinatown/International District, Seattle, WA, USA",
			lat: 47.5987122,
			lng: -122.3239762,
			zoom: 15,
			place_id: "ChIJ88Uoib5qkFQRfBFxBZqWZ4A",
			name: "Seattle Chinatown-International District",
			city: "Seattle",
			state: "Washington",
			state_short: "WA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36040,
		slug: "fruitvale-oakland",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/fruitvale-oakland/",
		title: {
			rendered: "Fruitvale"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1070,
			1903,
			1906
		],
		map: {
			address: "Fruitvale, Oakland, CA, USA",
			lat: 37.7776559,
			lng: -122.2258763,
			zoom: 15,
			place_id: "ChIJ8eEhQPSGj4ARfO1Et4EmrZk",
			name: "Fruitvale",
			city: "Oakland",
			state: "California",
			state_short: "CA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36037,
		slug: "west-oakland-oakland",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/west-oakland-oakland/",
		title: {
			rendered: "West Oakland"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			2464,
			1067
		],
		map: {
			address: "West Oakland, Oakland, CA, USA",
			lat: 37.8155761,
			lng: -122.2839963,
			zoom: 14,
			place_id: "ChIJvXDm7CB-hYAR0N2jK4mm6Kg",
			name: "West Oakland",
			city: "Oakland",
			state: "California",
			state_short: "CA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36034,
		slug: "temescal-oakland",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/temescal-oakland/",
		title: {
			rendered: "Temescal"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1067,
			2119
		],
		map: {
			address: "Temescal, Oakland, CA, USA",
			lat: 37.8333513,
			lng: -122.260109,
			zoom: 15,
			place_id: "ChIJ3bOBl-N9hYARtkg4D6RFqBs",
			name: "Temescal",
			city: "Oakland",
			state: "California",
			state_short: "CA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36029,
		slug: "inner-sunset-san-francisco",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/inner-sunset-san-francisco/",
		title: {
			rendered: "Inner Sunset"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1106,
			2119
		],
		map: {
			address: "756 Irving St, San Francisco, CA 94122, USA",
			lat: 37.764133875773645,
			lng: -122.46626644229737,
			zoom: 15,
			place_id: "ChIJ81rmTVyHhYARMWMnPjAEtJ8",
			street_number: "756",
			street_name: "Irving Street",
			street_name_short: "Irving St",
			city: "San Francisco",
			city_short: "SF",
			state: "California",
			state_short: "CA",
			post_code: "94122",
			country: "United States",
			country_short: "US"
		}
	},
	{
		id: 36024,
		slug: "hayes-valley-san-francisco",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/hayes-valley-san-francisco/",
		title: {
			rendered: "Hayes Valley"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1106,
			2119
		],
		map: {
			address: "hayes valley",
			lat: 37.7759073,
			lng: -122.4245247,
			zoom: 15,
			place_id: "ChIJGeftlqGAhYARLx8zNHZgtS8",
			city: "San Francisco",
			city_short: "SF",
			state: "California",
			state_short: "CA",
			post_code: "94102",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36016,
		slug: "marina-san-francisco",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/marina-san-francisco/",
		title: {
			rendered: "Marina"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 34531,
		categories: [
			985
		],
		vibe: [
			1782,
			1701,
			1687
		],
		map: {
			address: "Marina, San Francisco, CA, USA",
			lat: 37.8036667,
			lng: -122.4368151,
			zoom: 15,
			place_id: "ChIJG6XlmteAhYARMgiT8-gPxQM",
			name: "Marina District",
			city: "San Francisco",
			city_short: "SF",
			state: "California",
			state_short: "CA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 36011,
		slug: "bay-view",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/bay-view/",
		title: {
			rendered: "Bayview"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1070,
			1067,
			1076
		],
		map: {
			address: "3rd St & Oakdale Ave, San Francisco, CA 94124, USA",
			lat: 37.73465859016705,
			lng: -122.3908183862915,
			zoom: 15,
			place_id: "ChIJFfjoZQV_j4ARxqaDXFS7SS0",
			city: "San Francisco",
			city_short: "SF",
			state: "California",
			state_short: "CA",
			post_code: "94124",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 35418,
		slug: "japantown",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/japantown/",
		title: {
			rendered: "Japantown"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1060,
			1103,
			1106,
			1109,
			1064
		],
		map: {
			address: "Japantown, San Francisco, CA, USA",
			lat: 37.7854135,
			lng: -122.429383,
			zoom: 14,
			place_id: "ChIJdWS3Kr-AhYARwstzJFP-ghw",
			name: "Japantown",
			city: "San Francisco",
			city_short: "SF",
			state: "California",
			state_short: "CA",
			post_code: "94115",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 35411,
		slug: "north-beach",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/north-beach/",
		title: {
			rendered: "North Beach"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
		],
		map: {
			address: "650 Union St, San Francisco, CA 94133, USA",
			lat: 37.80035660509935,
			lng: -122.41009506560668,
			zoom: 15,
			place_id: "ChIJxfhUpvGAhYAR1oCzLvGjG2Q",
			street_number: "650",
			street_name: "Union Street",
			street_name_short: "Union St",
			city: "San Francisco",
			city_short: "SF",
			state: "California",
			state_short: "CA",
			post_code: "94133",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 35399,
		slug: "haight-ashbury-san-francisco",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/haight-ashbury-san-francisco/",
		title: {
			rendered: "Haight-Ashbury"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
			985
		],
		vibe: [
			1103,
			1106
		],
		map: {
			address: "Haight-Ashbury, San Francisco, CA, USA",
			lat: 37.7692204,
			lng: -122.4481393,
			zoom: 15,
			place_id: "ChIJX_Qyn6yAhYARSAqN56vATTI",
			name: "Haight-Ashbury",
			city: "San Francisco",
			city_short: "SF",
			state: "California",
			state_short: "CA",
			post_code: "94117",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 34032,
		slug: "chinatown-vancouver",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/chinatown-vancouver/",
		title: {
			rendered: "Chinatown"
		},
		content: {
			rendered: "<p>Chinatown is a historic neighborhood on the east side of Downtown Vancouver.</p>\n",
			"protected": false
		},
		featured_media: 34528,
		categories: [
			985
		],
		vibe: [
			1073,
			1070,
			1067
		],
		map: {
			address: "Chinatown, Vancouver, BC, Canada",
			lat: 49.2801149,
			lng: -123.1058197,
			zoom: 13,
			place_id: "ChIJh6EaSXpxhlQRuqzbrMHY00w",
			name: "Chinatown",
			city: "Vancouver",
			state: "British Columbia",
			state_short: "BC",
			country: "Canada",
			country_short: "CA"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 34017,
		slug: "chinatown",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/chinatown/",
		title: {
			rendered: "Chinatown"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 34531,
		categories: [
			985
		],
		vibe: [
			1100,
			2116,
			1067
		],
		map: {
			address: "Chinatown, San Francisco, CA, USA",
			lat: 37.7941378,
			lng: -122.4077914,
			zoom: 16,
			place_id: "ChIJHYqlWIuAhYARrIAPZpIwnyg",
			name: "Chinatown",
			city: "San Francisco",
			city_short: "SF",
			state: "California",
			state_short: "CA",
			country: "United States",
			country_short: "US"
		},
		radius: "0.3",
		boundary: ""
	},
	{
		id: 44075,
		slug: "koreantown-northgate",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/neighborhood/koreantown-northgate/",
		title: {
			rendered: "Koreantown Northgate"
		},
		content: {
			rendered: "",
			"protected": false
		},
		featured_media: 0,
		categories: [
		],
		vibe: [
			3008,
			1064,
			5690,
			3018,
			1906
		],
		map: {
			address: "526 Thomas L Berkley Way, Oakland, CA 94612, USA",
			lat: 37.809589965684175,
			lng: -122.26953311691895,
			zoom: 16,
			place_id: "ChIJm-GubZOHj4ARB8G_gXuphBA",
			street_number: "526",
			street_name: "Thomas L Berkley Way",
			city: "Oakland",
			state: "California",
			state_short: "CA",
			post_code: "94612",
			country: "United States",
			country_short: "US"
		},
		radius: "0.4",
		boundary: ""
	}
];

var badges = [
	{
		id: 43587,
		date: "2021-10-19T10:32:39",
		date_gmt: "2021-10-19T17:32:39",
		modified: "2021-11-08T08:33:22",
		modified_gmt: "2021-11-08T16:33:22",
		slug: "first-fridays",
		status: "publish",
		type: "general",
		link: "https://cms.vibemap.com/features/badge/first-fridays/",
		author: 8,
		featured_media: 0,
		menu_order: 0,
		template: "",
		format: "standard",
		meta: [
		],
		categories: [
		],
		tags: [
		],
		vibe: [
		],
		yoast_head_json: {
			robots: {
				index: "noindex",
				follow: "follow",
				"max-snippet": "max-snippet:-1",
				"max-image-preview": "max-image-preview:large",
				"max-video-preview": "max-video-preview:-1"
			},
			og_locale: "en_US",
			og_type: "article",
			og_title: "first-fridays - Vibemap",
			og_url: "https://cms.vibemap.com/features/badge/first-fridays/",
			og_site_name: "Vibemap",
			article_modified_time: "2021-11-08T16:33:22+00:00",
			twitter_card: "summary_large_image",
			schema: {
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "Organization",
						"@id": "https://cms.vibemap.com/#organization",
						name: "Vibemap",
						url: "https://cms.vibemap.com/",
						sameAs: [
						],
						logo: {
							"@type": "ImageObject",
							"@id": "https://cms.vibemap.com/#logo",
							inLanguage: "en-US",
							url: "https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png",
							contentUrl: "https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png",
							width: 3784,
							height: 876,
							caption: "Vibemap"
						},
						image: {
							"@id": "https://cms.vibemap.com/#logo"
						}
					},
					{
						"@type": "WebSite",
						"@id": "https://cms.vibemap.com/#website",
						url: "https://cms.vibemap.com/",
						name: "Vibemap",
						description: "Find your vibe",
						publisher: {
							"@id": "https://cms.vibemap.com/#organization"
						},
						potentialAction: [
							{
								"@type": "SearchAction",
								target: {
									"@type": "EntryPoint",
									urlTemplate: "https://cms.vibemap.com/?s={search_term_string}"
								},
								"query-input": "required name=search_term_string"
							}
						],
						inLanguage: "en-US"
					},
					{
						"@type": "WebPage",
						"@id": "https://cms.vibemap.com/features/badge/first-fridays/#webpage",
						url: "https://cms.vibemap.com/features/badge/first-fridays/",
						name: "first-fridays - Vibemap",
						isPartOf: {
							"@id": "https://cms.vibemap.com/#website"
						},
						datePublished: "2021-10-19T17:32:39+00:00",
						dateModified: "2021-11-08T16:33:22+00:00",
						breadcrumb: {
							"@id": "https://cms.vibemap.com/features/badge/first-fridays/#breadcrumb"
						},
						inLanguage: "en-US",
						potentialAction: [
							{
								"@type": "ReadAction",
								target: [
									"https://cms.vibemap.com/features/badge/first-fridays/"
								]
							}
						]
					},
					{
						"@type": "BreadcrumbList",
						"@id": "https://cms.vibemap.com/features/badge/first-fridays/#breadcrumb",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Home",
								item: "https://cms.vibemap.com/"
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "first-fridays"
							}
						]
					}
				]
			}
		},
		key: "first-fridays",
		count: 1,
		description: "<p>Earn your First Friday’s After Dark Badge by checking in to select places downtown Oakland after First Friday is over and win a chance for a free night stay at The Moxy!</p>\n<p>How does this work?</p>\n<p>Earn Challenge Points by using Vibemap to check in to select places after Oakland’s First Friday. This badge can only be achieved between the hours of 9pm and 2am on November 5th. Rack up more points by visiting and checking in at more places. The more you check-in, the better chance you have of winning prizes.</p>\n<p>Where to go?</p>\n<p>We encourage you to follow your instincts, but if you need a little help, we got you covered. Are you you ready to turn things up or calm it down? Keepin’ it contemporary or going old school? Check in with yourself and find places that match your vibe with our First Friday, After Dark Guide.</p>\n",
		has_location: true,
		location: {
			ID: 44075,
			post_author: "6",
			post_date: "2020-11-03 11:05:00",
			post_date_gmt: "2020-11-03 19:05:00",
			post_content: "",
			post_title: "Koreantown Northgate",
			post_excerpt: "",
			post_status: "publish",
			comment_status: "closed",
			ping_status: "closed",
			post_password: "",
			post_name: "koreantown-northgate",
			to_ping: "",
			pinged: "",
			post_modified: "2021-12-02 17:51:15",
			post_modified_gmt: "2021-12-03 01:51:15",
			post_content_filtered: "",
			post_parent: 0,
			guid: "https://cms.vibemap.com/?post_type=neighborhood&#038;p=44075",
			menu_order: 0,
			post_type: "neighborhood",
			post_mime_type: "",
			comment_count: "0",
			filter: "raw"
		},
		map: {
			address: "2040 Telegraph Ave, Oakland, CA 94612, USA",
			lat: 37.81033588008649,
			lng: -122.26938291321412,
			zoom: 16,
			place_id: "ChIJIyjnu62Aj4ARS6B2J2U-6y8",
			street_number: "2040",
			street_name: "Telegraph Avenue",
			street_name_short: "Telegraph Ave",
			city: "Oakland",
			state: "California",
			state_short: "CA",
			post_code: "94612",
			country: "United States",
			country_short: "US"
		},
		event: [
			"check_in"
		],
		icon: {
			ID: 44120,
			id: 44120,
			title: "Vibemap_Oakland-First-Friday-Badge-21-e1636037610434-3",
			filename: "Vibemap_Oakland-First-Friday-Badge-21-e1636037610434-3.jpg",
			filesize: 55741,
			url: "https://cms.vibemap.com/wp-content/uploads/2021/10/Vibemap_Oakland-First-Friday-Badge-21-e1636037610434-3.jpg",
			link: "https://cms.vibemap.com/features/badge/first-fridays/attachment/vibemap_oakland-first-friday-badge-21-e1636037610434-3/",
			alt: "",
			author: "6",
			description: "",
			caption: "",
			name: "vibemap_oakland-first-friday-badge-21-e1636037610434-3",
			status: "inherit",
			uploaded_to: 43587,
			date: "2021-11-05 00:38:21",
			modified: "2021-11-05 00:38:21",
			menu_order: 0,
			mime_type: "image/jpeg",
			type: "image",
			subtype: "jpeg",
			icon: "https://cms.vibemap.com/wp-includes/images/media/default.png",
			width: 499,
			height: 434,
			sizes: {
				thumbnail: "https://cms.vibemap.com/wp-content/uploads/2021/10/Vibemap_Oakland-First-Friday-Badge-21-e1636037610434-3.jpg",
				"thumbnail-width": 499,
				"thumbnail-height": 434,
				medium: "https://cms.vibemap.com/wp-content/uploads/2021/10/Vibemap_Oakland-First-Friday-Badge-21-e1636037610434-3.jpg",
				"medium-width": 499,
				"medium-height": 434,
				medium_large: "https://cms.vibemap.com/wp-content/uploads/2021/10/Vibemap_Oakland-First-Friday-Badge-21-e1636037610434-3.jpg",
				"medium_large-width": 499,
				"medium_large-height": 434,
				large: "https://cms.vibemap.com/wp-content/uploads/2021/10/Vibemap_Oakland-First-Friday-Badge-21-e1636037610434-3.jpg",
				"large-width": 499,
				"large-height": 434,
				"1536x1536": "https://cms.vibemap.com/wp-content/uploads/2021/10/Vibemap_Oakland-First-Friday-Badge-21-e1636037610434-3.jpg",
				"1536x1536-width": 499,
				"1536x1536-height": 434,
				"2048x2048": "https://cms.vibemap.com/wp-content/uploads/2021/10/Vibemap_Oakland-First-Friday-Badge-21-e1636037610434-3.jpg",
				"2048x2048-width": 499,
				"2048x2048-height": 434,
				"4K": "https://cms.vibemap.com/wp-content/uploads/2021/10/Vibemap_Oakland-First-Friday-Badge-21-e1636037610434-3.jpg",
				"4K-width": 499,
				"4K-height": 434,
				"1440p": "https://cms.vibemap.com/wp-content/uploads/2021/10/Vibemap_Oakland-First-Friday-Badge-21-e1636037610434-3.jpg",
				"1440p-width": 499,
				"1440p-height": 434,
				"1080p": "https://cms.vibemap.com/wp-content/uploads/2021/10/Vibemap_Oakland-First-Friday-Badge-21-e1636037610434-3.jpg",
				"1080p-width": 499,
				"1080p-height": 434,
				"720p": "https://cms.vibemap.com/wp-content/uploads/2021/10/Vibemap_Oakland-First-Friday-Badge-21-e1636037610434-3.jpg",
				"720p-width": 499,
				"720p-height": 434,
				"480p": "https://cms.vibemap.com/wp-content/uploads/2021/10/Vibemap_Oakland-First-Friday-Badge-21-e1636037610434-3.jpg",
				"480p-width": 499,
				"480p-height": 434
			}
		},
		name: "Oakland First Fridays"
	},
	{
		id: 40768,
		date: "2021-08-10T13:43:24",
		date_gmt: "2021-08-10T20:43:24",
		modified: "2021-09-23T16:25:13",
		modified_gmt: "2021-09-23T23:25:13",
		slug: "social",
		status: "publish",
		type: "general",
		link: "https://cms.vibemap.com/features/badge/social/",
		author: 6,
		featured_media: 0,
		menu_order: 0,
		template: "",
		format: "standard",
		meta: [
		],
		categories: [
		],
		tags: [
		],
		vibe: [
		],
		yoast_head_json: {
			robots: {
				index: "noindex",
				follow: "follow",
				"max-snippet": "max-snippet:-1",
				"max-image-preview": "max-image-preview:large",
				"max-video-preview": "max-video-preview:-1"
			},
			og_locale: "en_US",
			og_type: "article",
			og_title: "social - Vibemap",
			og_url: "https://cms.vibemap.com/features/badge/social/",
			og_site_name: "Vibemap",
			article_modified_time: "2021-09-23T23:25:13+00:00",
			twitter_card: "summary_large_image",
			schema: {
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "Organization",
						"@id": "https://cms.vibemap.com/#organization",
						name: "Vibemap",
						url: "https://cms.vibemap.com/",
						sameAs: [
						],
						logo: {
							"@type": "ImageObject",
							"@id": "https://cms.vibemap.com/#logo",
							inLanguage: "en-US",
							url: "https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png",
							contentUrl: "https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png",
							width: 3784,
							height: 876,
							caption: "Vibemap"
						},
						image: {
							"@id": "https://cms.vibemap.com/#logo"
						}
					},
					{
						"@type": "WebSite",
						"@id": "https://cms.vibemap.com/#website",
						url: "https://cms.vibemap.com/",
						name: "Vibemap",
						description: "Find your vibe",
						publisher: {
							"@id": "https://cms.vibemap.com/#organization"
						},
						potentialAction: [
							{
								"@type": "SearchAction",
								target: {
									"@type": "EntryPoint",
									urlTemplate: "https://cms.vibemap.com/?s={search_term_string}"
								},
								"query-input": "required name=search_term_string"
							}
						],
						inLanguage: "en-US"
					},
					{
						"@type": "WebPage",
						"@id": "https://cms.vibemap.com/features/badge/social/#webpage",
						url: "https://cms.vibemap.com/features/badge/social/",
						name: "social - Vibemap",
						isPartOf: {
							"@id": "https://cms.vibemap.com/#website"
						},
						datePublished: "2021-08-10T20:43:24+00:00",
						dateModified: "2021-09-23T23:25:13+00:00",
						breadcrumb: {
							"@id": "https://cms.vibemap.com/features/badge/social/#breadcrumb"
						},
						inLanguage: "en-US",
						potentialAction: [
							{
								"@type": "ReadAction",
								target: [
									"https://cms.vibemap.com/features/badge/social/"
								]
							}
						]
					},
					{
						"@type": "BreadcrumbList",
						"@id": "https://cms.vibemap.com/features/badge/social/#breadcrumb",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Home",
								item: "https://cms.vibemap.com/"
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "social"
							}
						]
					}
				]
			}
		},
		key: "social",
		count: 3,
		description: "<div>\n<div>Share interesting events or places with friends</div>\n</div>\n",
		has_location: false,
		location: false,
		event: [
			"share"
		],
		icon: {
			ID: 42800,
			id: 42800,
			title: "social",
			filename: "social.png",
			filesize: 77770,
			url: "https://cms.vibemap.com/wp-content/uploads/2021/08/social.png",
			link: "https://cms.vibemap.com/features/badge/social/attachment/social-2/",
			alt: "",
			author: "6",
			description: "",
			caption: "",
			name: "social-2",
			status: "inherit",
			uploaded_to: 40768,
			date: "2021-09-23 23:25:05",
			modified: "2021-09-23 23:25:05",
			menu_order: 0,
			mime_type: "image/png",
			type: "image",
			subtype: "png",
			icon: "https://cms.vibemap.com/wp-includes/images/media/default.png",
			width: 600,
			height: 600,
			sizes: {
				thumbnail: "https://cms.vibemap.com/wp-content/uploads/2021/08/social.png",
				"thumbnail-width": 500,
				"thumbnail-height": 500,
				medium: "https://cms.vibemap.com/wp-content/uploads/2021/08/social.png",
				"medium-width": 600,
				"medium-height": 600,
				medium_large: "https://cms.vibemap.com/wp-content/uploads/2021/08/social.png",
				"medium_large-width": 600,
				"medium_large-height": 600,
				large: "https://cms.vibemap.com/wp-content/uploads/2021/08/social.png",
				"large-width": 600,
				"large-height": 600,
				"1536x1536": "https://cms.vibemap.com/wp-content/uploads/2021/08/social.png",
				"1536x1536-width": 600,
				"1536x1536-height": 600,
				"2048x2048": "https://cms.vibemap.com/wp-content/uploads/2021/08/social.png",
				"2048x2048-width": 600,
				"2048x2048-height": 600,
				"4K": "https://cms.vibemap.com/wp-content/uploads/2021/08/social.png",
				"4K-width": 600,
				"4K-height": 600,
				"1440p": "https://cms.vibemap.com/wp-content/uploads/2021/08/social.png",
				"1440p-width": 600,
				"1440p-height": 600,
				"1080p": "https://cms.vibemap.com/wp-content/uploads/2021/08/social.png",
				"1080p-width": 600,
				"1080p-height": 600,
				"720p": "https://cms.vibemap.com/wp-content/uploads/2021/08/social.png",
				"720p-width": 600,
				"720p-height": 600,
				"480p": "https://cms.vibemap.com/wp-content/uploads/2021/08/social.png",
				"480p-width": 480,
				"480p-height": 480
			}
		},
		name: "Cool Friend"
	},
	{
		id: 40766,
		date: "2021-08-10T13:39:13",
		date_gmt: "2021-08-10T20:39:13",
		modified: "2021-09-23T16:25:40",
		modified_gmt: "2021-09-23T23:25:40",
		slug: "good-vibes",
		status: "publish",
		type: "general",
		link: "https://cms.vibemap.com/features/badge/good-vibes/",
		author: 6,
		featured_media: 0,
		menu_order: 0,
		template: "",
		format: "standard",
		meta: [
		],
		categories: [
		],
		tags: [
		],
		vibe: [
		],
		yoast_head_json: {
			robots: {
				index: "noindex",
				follow: "follow",
				"max-snippet": "max-snippet:-1",
				"max-image-preview": "max-image-preview:large",
				"max-video-preview": "max-video-preview:-1"
			},
			og_locale: "en_US",
			og_type: "article",
			og_title: "good-vibes - Vibemap",
			og_url: "https://cms.vibemap.com/features/badge/good-vibes/",
			og_site_name: "Vibemap",
			article_modified_time: "2021-09-23T23:25:40+00:00",
			twitter_card: "summary_large_image",
			schema: {
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "Organization",
						"@id": "https://cms.vibemap.com/#organization",
						name: "Vibemap",
						url: "https://cms.vibemap.com/",
						sameAs: [
						],
						logo: {
							"@type": "ImageObject",
							"@id": "https://cms.vibemap.com/#logo",
							inLanguage: "en-US",
							url: "https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png",
							contentUrl: "https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png",
							width: 3784,
							height: 876,
							caption: "Vibemap"
						},
						image: {
							"@id": "https://cms.vibemap.com/#logo"
						}
					},
					{
						"@type": "WebSite",
						"@id": "https://cms.vibemap.com/#website",
						url: "https://cms.vibemap.com/",
						name: "Vibemap",
						description: "Find your vibe",
						publisher: {
							"@id": "https://cms.vibemap.com/#organization"
						},
						potentialAction: [
							{
								"@type": "SearchAction",
								target: {
									"@type": "EntryPoint",
									urlTemplate: "https://cms.vibemap.com/?s={search_term_string}"
								},
								"query-input": "required name=search_term_string"
							}
						],
						inLanguage: "en-US"
					},
					{
						"@type": "WebPage",
						"@id": "https://cms.vibemap.com/features/badge/good-vibes/#webpage",
						url: "https://cms.vibemap.com/features/badge/good-vibes/",
						name: "good-vibes - Vibemap",
						isPartOf: {
							"@id": "https://cms.vibemap.com/#website"
						},
						datePublished: "2021-08-10T20:39:13+00:00",
						dateModified: "2021-09-23T23:25:40+00:00",
						breadcrumb: {
							"@id": "https://cms.vibemap.com/features/badge/good-vibes/#breadcrumb"
						},
						inLanguage: "en-US",
						potentialAction: [
							{
								"@type": "ReadAction",
								target: [
									"https://cms.vibemap.com/features/badge/good-vibes/"
								]
							}
						]
					},
					{
						"@type": "BreadcrumbList",
						"@id": "https://cms.vibemap.com/features/badge/good-vibes/#breadcrumb",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Home",
								item: "https://cms.vibemap.com/"
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "good-vibes"
							}
						]
					}
				]
			}
		},
		key: "good-vibes",
		count: 7,
		description: "<div>\n<div>Do seven vibe checks.</div>\n</div>\n",
		has_location: false,
		location: false,
		event: [
			"vibe_check"
		],
		icon: {
			ID: 42803,
			id: 42803,
			title: "good-vibes",
			filename: "good-vibes.jpg",
			filesize: 27001,
			url: "https://cms.vibemap.com/wp-content/uploads/2021/08/good-vibes.jpg",
			link: "https://cms.vibemap.com/features/badge/good-vibes/attachment/good-vibes-2/",
			alt: "",
			author: "6",
			description: "",
			caption: "",
			name: "good-vibes-2",
			status: "inherit",
			uploaded_to: 40766,
			date: "2021-09-23 23:25:33",
			modified: "2021-09-23 23:25:33",
			menu_order: 0,
			mime_type: "image/jpeg",
			type: "image",
			subtype: "jpeg",
			icon: "https://cms.vibemap.com/wp-includes/images/media/default.png",
			width: 800,
			height: 800,
			sizes: {
				thumbnail: "https://cms.vibemap.com/wp-content/uploads/2021/08/good-vibes.jpg",
				"thumbnail-width": 500,
				"thumbnail-height": 500,
				medium: "https://cms.vibemap.com/wp-content/uploads/2021/08/good-vibes.jpg",
				"medium-width": 720,
				"medium-height": 720,
				medium_large: "https://cms.vibemap.com/wp-content/uploads/2021/08/good-vibes.jpg",
				"medium_large-width": 768,
				"medium_large-height": 768,
				large: "https://cms.vibemap.com/wp-content/uploads/2021/08/good-vibes.jpg",
				"large-width": 800,
				"large-height": 800,
				"1536x1536": "https://cms.vibemap.com/wp-content/uploads/2021/08/good-vibes.jpg",
				"1536x1536-width": 800,
				"1536x1536-height": 800,
				"2048x2048": "https://cms.vibemap.com/wp-content/uploads/2021/08/good-vibes.jpg",
				"2048x2048-width": 800,
				"2048x2048-height": 800,
				"4K": "https://cms.vibemap.com/wp-content/uploads/2021/08/good-vibes.jpg",
				"4K-width": 800,
				"4K-height": 800,
				"1440p": "https://cms.vibemap.com/wp-content/uploads/2021/08/good-vibes.jpg",
				"1440p-width": 800,
				"1440p-height": 800,
				"1080p": "https://cms.vibemap.com/wp-content/uploads/2021/08/good-vibes.jpg",
				"1080p-width": 800,
				"1080p-height": 800,
				"720p": "https://cms.vibemap.com/wp-content/uploads/2021/08/good-vibes.jpg",
				"720p-width": 720,
				"720p-height": 720,
				"480p": "https://cms.vibemap.com/wp-content/uploads/2021/08/good-vibes.jpg",
				"480p-width": 480,
				"480p-height": 480
			}
		},
		name: "Good Vibes"
	},
	{
		id: 40763,
		date: "2021-08-10T13:38:31",
		date_gmt: "2021-08-10T20:38:31",
		modified: "2021-09-23T16:26:05",
		modified_gmt: "2021-09-23T23:26:05",
		slug: "explorer",
		status: "publish",
		type: "general",
		link: "https://cms.vibemap.com/features/badge/explorer/",
		author: 6,
		featured_media: 0,
		menu_order: 0,
		template: "",
		format: "standard",
		meta: [
		],
		categories: [
		],
		tags: [
		],
		vibe: [
		],
		yoast_head_json: {
			robots: {
				index: "noindex",
				follow: "follow",
				"max-snippet": "max-snippet:-1",
				"max-image-preview": "max-image-preview:large",
				"max-video-preview": "max-video-preview:-1"
			},
			og_locale: "en_US",
			og_type: "article",
			og_title: "explorer - Vibemap",
			og_url: "https://cms.vibemap.com/features/badge/explorer/",
			og_site_name: "Vibemap",
			article_modified_time: "2021-09-23T23:26:05+00:00",
			twitter_card: "summary_large_image",
			schema: {
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "Organization",
						"@id": "https://cms.vibemap.com/#organization",
						name: "Vibemap",
						url: "https://cms.vibemap.com/",
						sameAs: [
						],
						logo: {
							"@type": "ImageObject",
							"@id": "https://cms.vibemap.com/#logo",
							inLanguage: "en-US",
							url: "https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png",
							contentUrl: "https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png",
							width: 3784,
							height: 876,
							caption: "Vibemap"
						},
						image: {
							"@id": "https://cms.vibemap.com/#logo"
						}
					},
					{
						"@type": "WebSite",
						"@id": "https://cms.vibemap.com/#website",
						url: "https://cms.vibemap.com/",
						name: "Vibemap",
						description: "Find your vibe",
						publisher: {
							"@id": "https://cms.vibemap.com/#organization"
						},
						potentialAction: [
							{
								"@type": "SearchAction",
								target: {
									"@type": "EntryPoint",
									urlTemplate: "https://cms.vibemap.com/?s={search_term_string}"
								},
								"query-input": "required name=search_term_string"
							}
						],
						inLanguage: "en-US"
					},
					{
						"@type": "WebPage",
						"@id": "https://cms.vibemap.com/features/badge/explorer/#webpage",
						url: "https://cms.vibemap.com/features/badge/explorer/",
						name: "explorer - Vibemap",
						isPartOf: {
							"@id": "https://cms.vibemap.com/#website"
						},
						datePublished: "2021-08-10T20:38:31+00:00",
						dateModified: "2021-09-23T23:26:05+00:00",
						breadcrumb: {
							"@id": "https://cms.vibemap.com/features/badge/explorer/#breadcrumb"
						},
						inLanguage: "en-US",
						potentialAction: [
							{
								"@type": "ReadAction",
								target: [
									"https://cms.vibemap.com/features/badge/explorer/"
								]
							}
						]
					},
					{
						"@type": "BreadcrumbList",
						"@id": "https://cms.vibemap.com/features/badge/explorer/#breadcrumb",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Home",
								item: "https://cms.vibemap.com/"
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "explorer"
							}
						]
					}
				]
			}
		},
		key: "explorer",
		count: 5,
		description: "<div>\n<div>Search for seven different vibes, at least once</div>\n</div>\n",
		has_location: false,
		location: false,
		event: [
			"search_vibes"
		],
		icon: {
			ID: 42806,
			id: 42806,
			title: "explorer",
			filename: "explorer.jpg",
			filesize: 17835,
			url: "https://cms.vibemap.com/wp-content/uploads/2021/08/explorer.jpg",
			link: "https://cms.vibemap.com/features/badge/explorer/attachment/explorer-2/",
			alt: "",
			author: "6",
			description: "",
			caption: "",
			name: "explorer-2",
			status: "inherit",
			uploaded_to: 40763,
			date: "2021-09-23 23:25:57",
			modified: "2021-09-23 23:25:57",
			menu_order: 0,
			mime_type: "image/jpeg",
			type: "image",
			subtype: "jpeg",
			icon: "https://cms.vibemap.com/wp-includes/images/media/default.png",
			width: 600,
			height: 600,
			sizes: {
				thumbnail: "https://cms.vibemap.com/wp-content/uploads/2021/08/explorer.jpg",
				"thumbnail-width": 500,
				"thumbnail-height": 500,
				medium: "https://cms.vibemap.com/wp-content/uploads/2021/08/explorer.jpg",
				"medium-width": 600,
				"medium-height": 600,
				medium_large: "https://cms.vibemap.com/wp-content/uploads/2021/08/explorer.jpg",
				"medium_large-width": 600,
				"medium_large-height": 600,
				large: "https://cms.vibemap.com/wp-content/uploads/2021/08/explorer.jpg",
				"large-width": 600,
				"large-height": 600,
				"1536x1536": "https://cms.vibemap.com/wp-content/uploads/2021/08/explorer.jpg",
				"1536x1536-width": 600,
				"1536x1536-height": 600,
				"2048x2048": "https://cms.vibemap.com/wp-content/uploads/2021/08/explorer.jpg",
				"2048x2048-width": 600,
				"2048x2048-height": 600,
				"4K": "https://cms.vibemap.com/wp-content/uploads/2021/08/explorer.jpg",
				"4K-width": 600,
				"4K-height": 600,
				"1440p": "https://cms.vibemap.com/wp-content/uploads/2021/08/explorer.jpg",
				"1440p-width": 600,
				"1440p-height": 600,
				"1080p": "https://cms.vibemap.com/wp-content/uploads/2021/08/explorer.jpg",
				"1080p-width": 600,
				"1080p-height": 600,
				"720p": "https://cms.vibemap.com/wp-content/uploads/2021/08/explorer.jpg",
				"720p-width": 600,
				"720p-height": 600,
				"480p": "https://cms.vibemap.com/wp-content/uploads/2021/08/explorer.jpg",
				"480p-width": 480,
				"480p-height": 480
			}
		},
		name: "Explorer"
	},
	{
		id: 40742,
		date: "2021-08-10T13:20:46",
		date_gmt: "2021-08-10T20:20:46",
		modified: "2021-09-23T16:26:48",
		modified_gmt: "2021-09-23T23:26:48",
		slug: "collector",
		status: "publish",
		type: "general",
		link: "https://cms.vibemap.com/features/badge/collector/",
		author: 6,
		featured_media: 0,
		menu_order: 0,
		template: "",
		format: "standard",
		meta: [
		],
		categories: [
		],
		tags: [
		],
		vibe: [
		],
		yoast_head_json: {
			robots: {
				index: "noindex",
				follow: "follow",
				"max-snippet": "max-snippet:-1",
				"max-image-preview": "max-image-preview:large",
				"max-video-preview": "max-video-preview:-1"
			},
			og_locale: "en_US",
			og_type: "article",
			og_title: "collector - Vibemap",
			og_description: "Save ten or more places to your list.",
			og_url: "https://cms.vibemap.com/features/badge/collector/",
			og_site_name: "Vibemap",
			article_modified_time: "2021-09-23T23:26:48+00:00",
			twitter_card: "summary_large_image",
			schema: {
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "Organization",
						"@id": "https://cms.vibemap.com/#organization",
						name: "Vibemap",
						url: "https://cms.vibemap.com/",
						sameAs: [
						],
						logo: {
							"@type": "ImageObject",
							"@id": "https://cms.vibemap.com/#logo",
							inLanguage: "en-US",
							url: "https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png",
							contentUrl: "https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png",
							width: 3784,
							height: 876,
							caption: "Vibemap"
						},
						image: {
							"@id": "https://cms.vibemap.com/#logo"
						}
					},
					{
						"@type": "WebSite",
						"@id": "https://cms.vibemap.com/#website",
						url: "https://cms.vibemap.com/",
						name: "Vibemap",
						description: "Find your vibe",
						publisher: {
							"@id": "https://cms.vibemap.com/#organization"
						},
						potentialAction: [
							{
								"@type": "SearchAction",
								target: {
									"@type": "EntryPoint",
									urlTemplate: "https://cms.vibemap.com/?s={search_term_string}"
								},
								"query-input": "required name=search_term_string"
							}
						],
						inLanguage: "en-US"
					},
					{
						"@type": "WebPage",
						"@id": "https://cms.vibemap.com/features/badge/collector/#webpage",
						url: "https://cms.vibemap.com/features/badge/collector/",
						name: "collector - Vibemap",
						isPartOf: {
							"@id": "https://cms.vibemap.com/#website"
						},
						datePublished: "2021-08-10T20:20:46+00:00",
						dateModified: "2021-09-23T23:26:48+00:00",
						breadcrumb: {
							"@id": "https://cms.vibemap.com/features/badge/collector/#breadcrumb"
						},
						inLanguage: "en-US",
						potentialAction: [
							{
								"@type": "ReadAction",
								target: [
									"https://cms.vibemap.com/features/badge/collector/"
								]
							}
						]
					},
					{
						"@type": "BreadcrumbList",
						"@id": "https://cms.vibemap.com/features/badge/collector/#breadcrumb",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Home",
								item: "https://cms.vibemap.com/"
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "collector"
							}
						]
					}
				]
			}
		},
		key: "collector",
		count: 10,
		description: "<div>\n<div>Save ten or more places to your list.</div>\n</div>\n",
		has_location: false,
		location: false,
		map: false,
		event: [
			"save_place"
		],
		icon: {
			ID: 42809,
			id: 42809,
			title: "collector",
			filename: "collector.png",
			filesize: 76366,
			url: "https://cms.vibemap.com/wp-content/uploads/2021/08/collector.png",
			link: "https://cms.vibemap.com/features/badge/collector/attachment/collector-2/",
			alt: "",
			author: "6",
			description: "",
			caption: "",
			name: "collector-2",
			status: "inherit",
			uploaded_to: 40742,
			date: "2021-09-23 23:26:41",
			modified: "2021-09-23 23:26:41",
			menu_order: 0,
			mime_type: "image/png",
			type: "image",
			subtype: "png",
			icon: "https://cms.vibemap.com/wp-includes/images/media/default.png",
			width: 600,
			height: 600,
			sizes: {
				thumbnail: "https://cms.vibemap.com/wp-content/uploads/2021/08/collector.png",
				"thumbnail-width": 500,
				"thumbnail-height": 500,
				medium: "https://cms.vibemap.com/wp-content/uploads/2021/08/collector.png",
				"medium-width": 600,
				"medium-height": 600,
				medium_large: "https://cms.vibemap.com/wp-content/uploads/2021/08/collector.png",
				"medium_large-width": 600,
				"medium_large-height": 600,
				large: "https://cms.vibemap.com/wp-content/uploads/2021/08/collector.png",
				"large-width": 600,
				"large-height": 600,
				"1536x1536": "https://cms.vibemap.com/wp-content/uploads/2021/08/collector.png",
				"1536x1536-width": 600,
				"1536x1536-height": 600,
				"2048x2048": "https://cms.vibemap.com/wp-content/uploads/2021/08/collector.png",
				"2048x2048-width": 600,
				"2048x2048-height": 600,
				"4K": "https://cms.vibemap.com/wp-content/uploads/2021/08/collector.png",
				"4K-width": 600,
				"4K-height": 600,
				"1440p": "https://cms.vibemap.com/wp-content/uploads/2021/08/collector.png",
				"1440p-width": 600,
				"1440p-height": 600,
				"1080p": "https://cms.vibemap.com/wp-content/uploads/2021/08/collector.png",
				"1080p-width": 600,
				"1080p-height": 600,
				"720p": "https://cms.vibemap.com/wp-content/uploads/2021/08/collector.png",
				"720p-width": 600,
				"720p-height": 600,
				"480p": "https://cms.vibemap.com/wp-content/uploads/2021/08/collector.png",
				"480p-width": 480,
				"480p-height": 480
			}
		},
		name: "Collector"
	},
	{
		id: 40175,
		date: "2021-08-01T09:58:48",
		date_gmt: "2021-08-01T16:58:48",
		modified: "2021-12-01T13:41:25",
		modified_gmt: "2021-12-01T21:41:25",
		slug: "jack-london-challenge",
		status: "publish",
		type: "neighborhood",
		link: "https://cms.vibemap.com/features/badge/jack-london-challenge/",
		author: 6,
		featured_media: 0,
		menu_order: 0,
		template: "",
		format: "standard",
		meta: [
		],
		categories: [
		],
		tags: [
		],
		vibe: [
		],
		yoast_head_json: {
			robots: {
				index: "noindex",
				follow: "follow",
				"max-snippet": "max-snippet:-1",
				"max-image-preview": "max-image-preview:large",
				"max-video-preview": "max-video-preview:-1"
			},
			og_locale: "en_US",
			og_type: "article",
			og_title: "jack-london - Vibemap",
			og_description: "Welcome to the Jack London Neighborhood Challenge. We’ve partnered with the Jack London Business Improvement District to get you out and about in Jack London",
			og_url: "https://cms.vibemap.com/features/badge/jack-london-challenge/",
			og_site_name: "Vibemap",
			article_modified_time: "2021-12-01T21:41:25+00:00",
			twitter_card: "summary_large_image",
			schema: {
				"@context": "https://schema.org",
				"@graph": [
					{
						"@type": "Organization",
						"@id": "https://cms.vibemap.com/#organization",
						name: "Vibemap",
						url: "https://cms.vibemap.com/",
						sameAs: [
						],
						logo: {
							"@type": "ImageObject",
							"@id": "https://cms.vibemap.com/#logo",
							inLanguage: "en-US",
							url: "https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png",
							contentUrl: "https://cms.vibemap.com/wp-content/uploads/2020/08/Vibemap_logo_black.png",
							width: 3784,
							height: 876,
							caption: "Vibemap"
						},
						image: {
							"@id": "https://cms.vibemap.com/#logo"
						}
					},
					{
						"@type": "WebSite",
						"@id": "https://cms.vibemap.com/#website",
						url: "https://cms.vibemap.com/",
						name: "Vibemap",
						description: "Find your vibe",
						publisher: {
							"@id": "https://cms.vibemap.com/#organization"
						},
						potentialAction: [
							{
								"@type": "SearchAction",
								target: {
									"@type": "EntryPoint",
									urlTemplate: "https://cms.vibemap.com/?s={search_term_string}"
								},
								"query-input": "required name=search_term_string"
							}
						],
						inLanguage: "en-US"
					},
					{
						"@type": "WebPage",
						"@id": "https://cms.vibemap.com/features/badge/jack-london-challenge/#webpage",
						url: "https://cms.vibemap.com/features/badge/jack-london-challenge/",
						name: "jack-london - Vibemap",
						isPartOf: {
							"@id": "https://cms.vibemap.com/#website"
						},
						datePublished: "2021-08-01T16:58:48+00:00",
						dateModified: "2021-12-01T21:41:25+00:00",
						breadcrumb: {
							"@id": "https://cms.vibemap.com/features/badge/jack-london-challenge/#breadcrumb"
						},
						inLanguage: "en-US",
						potentialAction: [
							{
								"@type": "ReadAction",
								target: [
									"https://cms.vibemap.com/features/badge/jack-london-challenge/"
								]
							}
						]
					},
					{
						"@type": "BreadcrumbList",
						"@id": "https://cms.vibemap.com/features/badge/jack-london-challenge/#breadcrumb",
						itemListElement: [
							{
								"@type": "ListItem",
								position: 1,
								name: "Home",
								item: "https://cms.vibemap.com/"
							},
							{
								"@type": "ListItem",
								position: 2,
								name: "jack-london"
							}
						]
					}
				]
			}
		},
		key: "jack-london-challenge",
		count: 1,
		description: "<p><strong>Unlock specials and win prizes by joining the Jack London Neighborhood Challenge!</strong></p>\n<h3>How does this work?</h3>\n<p>Earn Challenge Points by using Vibemap to <strong>add vibes, save places, and share tips about your favorite Jack London places.</strong> Rack up more points while you’re out and about by <strong>checking in and redeeming discount codes</strong> at some of the neighborhood’s most popular spots.</p>\n",
		has_location: true,
		location: {
			ID: 36165,
			post_author: "6",
			post_date: "2021-03-18 06:41:38",
			post_date_gmt: "2021-03-18 13:41:38",
			post_content: "",
			post_title: "Jack London",
			post_excerpt: "",
			post_status: "publish",
			comment_status: "closed",
			ping_status: "closed",
			post_password: "",
			post_name: "jack-london-oakland",
			to_ping: "",
			pinged: "",
			post_modified: "2021-10-15 15:53:26",
			post_modified_gmt: "2021-10-15 22:53:26",
			post_content_filtered: "",
			post_parent: 0,
			guid: "https://cms.vibemap.com/?post_type=neighborhood&#038;p=36165",
			menu_order: 0,
			post_type: "neighborhood",
			post_mime_type: "",
			comment_count: "0",
			filter: "raw"
		},
		map: {
			address: "Jack London District, Oakland, CA, USA",
			lat: 37.7947392,
			lng: -122.2771389,
			zoom: 14,
			place_id: "ChIJV8yaYciAj4ARIrNA3q4IRxo",
			name: "Jack London District",
			city: "Oakland",
			state: "California",
			state_short: "CA",
			post_code: "94607",
			country: "United States",
			country_short: "US"
		},
		event: [
			"add_vibe",
			"save_place",
			"add_tip",
			"check_in",
			"promo",
			"share"
		],
		icon: {
			ID: 41465,
			id: 41465,
			title: "Badge_Oak-01",
			filename: "Badge_Oak-01-5.jpg",
			filesize: 195426,
			url: "https://cms.vibemap.com/wp-content/uploads/2021/08/Badge_Oak-01-5.jpg",
			link: "https://cms.vibemap.com/features/badge/jack-london-challenge/attachment/badge_oak-01-6/",
			alt: "",
			author: "12",
			description: "",
			caption: "",
			name: "badge_oak-01-6",
			status: "inherit",
			uploaded_to: 40175,
			date: "2021-08-25 01:20:49",
			modified: "2021-08-25 01:20:49",
			menu_order: 0,
			mime_type: "image/jpeg",
			type: "image",
			subtype: "jpeg",
			icon: "https://cms.vibemap.com/wp-includes/images/media/default.png",
			width: 600,
			height: 600,
			sizes: {
				thumbnail: "https://cms.vibemap.com/wp-content/uploads/2021/08/Badge_Oak-01-5.jpg",
				"thumbnail-width": 500,
				"thumbnail-height": 500,
				medium: "https://cms.vibemap.com/wp-content/uploads/2021/08/Badge_Oak-01-5.jpg",
				"medium-width": 600,
				"medium-height": 600,
				medium_large: "https://cms.vibemap.com/wp-content/uploads/2021/08/Badge_Oak-01-5.jpg",
				"medium_large-width": 600,
				"medium_large-height": 600,
				large: "https://cms.vibemap.com/wp-content/uploads/2021/08/Badge_Oak-01-5.jpg",
				"large-width": 600,
				"large-height": 600,
				"1536x1536": "https://cms.vibemap.com/wp-content/uploads/2021/08/Badge_Oak-01-5.jpg",
				"1536x1536-width": 600,
				"1536x1536-height": 600,
				"2048x2048": "https://cms.vibemap.com/wp-content/uploads/2021/08/Badge_Oak-01-5.jpg",
				"2048x2048-width": 600,
				"2048x2048-height": 600,
				"4K": "https://cms.vibemap.com/wp-content/uploads/2021/08/Badge_Oak-01-5.jpg",
				"4K-width": 600,
				"4K-height": 600,
				"1440p": "https://cms.vibemap.com/wp-content/uploads/2021/08/Badge_Oak-01-5.jpg",
				"1440p-width": 600,
				"1440p-height": 600,
				"1080p": "https://cms.vibemap.com/wp-content/uploads/2021/08/Badge_Oak-01-5.jpg",
				"1080p-width": 600,
				"1080p-height": 600,
				"720p": "https://cms.vibemap.com/wp-content/uploads/2021/08/Badge_Oak-01-5.jpg",
				"720p-width": 600,
				"720p-height": 600,
				"480p": "https://cms.vibemap.com/wp-content/uploads/2021/08/Badge_Oak-01-5.jpg",
				"480p-width": 480,
				"480p-height": 480
			}
		},
		name: "Jack London Neighborhood Challenge"
	}
];
var badges$1 = {
	badges: badges
};

dayjs__default["default"].extend(isBetween__default["default"]);
dayjs__default["default"].extend(utc__default["default"]);
const getVibeStyle = vibes.getVibeStyle;

const ApiUrl = 'https://api.vibemap.com/v0.3/';

// Filters a list of objects
// Similar to .filter method of array
// TODO: argument for attribute to filter on.
const filterList = (list, searchTerm, key = 'value') => {
  // Generalize the Semantic UI search implementation
  const re = new RegExp(escapeRegExp__default["default"](searchTerm), 'i');

  const isMatch = (result) => re.test(result[key]);

  const results = filter__default["default"](list, isMatch);

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

  const fuse = new Fuse__default["default"](list, options);
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
      dayjs__default["default"](openHours.opens).format('ha') +
      '-' +
      dayjs__default["default"](openHours.closes).format('ha');
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
      return dayjs__default["default"]().day(day).format(dayFormat) + ' ' + 'Closed'
    } else {
      const opens = dailyHours.opens.split(':');
      const closes = dailyHours.closes.split(':');

      const time =
        dayjs__default["default"]().day(day).format(dayFormat) +
        ': ' +
        dayjs__default["default"]().hour(opens[0]).minute(opens[1]).format('ha') +
        '-' +
        dayjs__default["default"]().hour(closes[0]).minute(closes[1]).format('ha');

      return time
    }
  });

  return formattedHours
};

const isOpen = (hours, time = dayjs__default["default"]()) => {
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
    const opens = dayjs__default["default"](date + ' ' + dayFound.opens);
    const closes = dayjs__default["default"](date + ' ' + dayFound.closes);

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

const getCardOptions = (block) => {
  let postData = block.singCards.posts;

  let {
    categoryQuery,
    distanceQuery,
    geoQuery,
    placeType,
    searchQuery,
    vibeQuery } = postData[0];

  // If a vibe override query is present
  if (block.overrideQuery && block.overrideQuery.vibe) vibeQuery = block.overrideQuery.vibe;

  // Use city as a back up
  if (block.overrideQuery && block.overrideQuery.cities && block.overrideQuery.cities.length > 0) {
    const selectedCity = cities.filter(result => result.slug === block.overrideQuery.cities[0]);

    // TODO: Update this programatically from Wordpress
    const cityRadius = 7;
    geoQuery = geoQuery ? geoQuery : selectedCity[0].location;
    distanceQuery = distanceQuery ? distanceQuery : cityRadius;
  }

  if (block.overrideQuery && block.overrideQuery.location) {
    geoQuery = block.overrideQuery.location;

    distanceQuery = block.overrideQuery.distance ? block.overrideQuery.distance : distanceQuery;
  }

  // If no city or override are passed, make Oakland default
  if (!geoQuery) {
    const firstCity = cities.filter(result => result.slug === 'oakland');
    geoQuery = firstCity[0].location;
  }

  if (typeof vibeQuery === 'string') vibeQuery = vibeQuery.replace(/\s/g, '').split(","); // Cast comma-separated list to array

  // Map all the vibe slug to a list that includes related vibes.
  const vibesFromCategories = vibeQuery ? vibeQuery.map(vibe => typeof(vibe) === 'string' ? vibe : vibe.slug) : [];
  const allVibes = vibes.getRelatedVibes(vibesFromCategories);

  let cardOptions = {
    category: categoryQuery,
    distance: distanceQuery,
    point: geoQuery.longitude + ',' + geoQuery.latitude,
    ordering: 'vibe',
    search: searchQuery,
    vibes: allVibes
  };

  console.log('cardOptions, ', cardOptions);

  return cardOptions

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

  const parse_url = url__default["default"].parse(link);
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

const getTopCategories = (places, attribute = 'categories') => {
  let top_categories = {};

  places.map((place) => {
    place.properties[attribute].map((item) => {
      if (top_categories.hasOwnProperty(item)) {
        top_categories[item] += 1;
      } else {
        top_categories[item] = 1;
      }
      return null
    });
    return null
  });

  var sortable = [];
  for (var item in top_categories) {
    sortable.push([item, top_categories[item]]);
  }

  let top_categories_sorted = sortable.sort(function (a, b) {
    return b[1] - a[1]
  });

  return top_categories_sorted
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

// TODO Function for scaling icon. Currently bug (likely in clustering) where certain icon's become very small
const scaleIconSize = (score, min, max) => {
  const scale = d3Scale.scaleLinear().domain([min, max]).range([1, 5]);

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

const getEventOptions =  (
  city = 'oakland',
  date_range = 'month',
  distance = 10,
  category = null,
  vibes = [],
  search
  ) => {
    const selectedCity = cities.filter(result => result.slug === city);
    const location = selectedCity[0].location;

    const today = dayjs__default["default"]();
    const dayOfWeek = today.day() + 1;

    today.startOf('day');

    let startOffset = 0;
    let endOffset = 0;

    switch (date_range) {
      case 'day':
        endOffset = 1;
        break;

      case 'weekend':
        endOffset = 7 - dayOfWeek;
        break;

      case 'next_week':
        startOffset = 8 - dayOfWeek;
        endOffset = 7;
        break;

      case 'month':
        const monthEnd = dayjs__default["default"]().endOf('month');
        endOffset = monthEnd.diff(today, 'day');

      case 'quarter':
        endOffset = 90;
        break;
    }

    let date_range_start = today.add(startOffset, 'days').startOf('day');
    let date_range_end = today.add(endOffset , 'days').endOf('day'); //  TODO Plus range

    const options = {
      category: category,
      distance: distance,
      point: location.longitude + ',' + location.latitude,
      ordering: 'vibe',
      start_date: date_range_start.format("YYYY-MM-DD HH:MM"),
      end_date: date_range_end.format("YYYY-MM-DD HH:MM"),
      search: search,
      vibes: vibes
    };

    return options
};

const fetchEvents = async (options, activitySearch = false) => {
  let {
    activity,
    bounds,
    category,
    days,
    distance,
    ordering,
    point,
    search,
    time,
    vibes,
  } = options;
  point.split(',').map((value) => parseFloat(value));

  dayjs__default["default"]().startOf('day').format('YYYY-MM-DD HH:MM');
  dayjs__default["default"]().add(days, 'days').format('YYYY-MM-DD HH:MM');

  if (activitySearch && category) {
    options.search = `${category ? category : ''} ${search ? search : ''}`;
  }

  const params = module.exports.getAPIParams(options);
  let query = querystring__default["default"].stringify(params);

  const apiEndpoint = `${ApiUrl}events/`;
  const source = Axios__default["default"].CancelToken.source();

  const response = await Axios__default["default"].get(`${apiEndpoint}?${query}`, {
    cancelToken: source.token,
  }).catch(function (error) {
    // handle error
    console.log('Axios error ', error);
    return null
  });

  return response
};

const fetchPlacesDetails = async (id, type = 'place') => {
  const source = Axios__default["default"].CancelToken.source();
  let apiEndpoint;

  if (type == "event") {
    apiEndpoint = `${ApiUrl}events/`;
  }

  if (type == "place") {
    apiEndpoint = `${ApiUrl}places/`;
  }

  if (apiEndpoint) {
    const response = await Axios__default["default"].get(`${apiEndpoint}${id}`, {
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
    category,
    days,
    distance,
    ordering,
    per_page,
    point,
    search,
    time,
    vibes,
  } = options;
  if (activity === 'all') activity = null;
  const scoreBy = ['aggregate_rating', 'vibes', 'distance', 'offers', 'hours'];
  const numOfPlaces = per_page ? per_page : 350;

  return new Promise(function (resolve, reject) {
    const params = getAPIParams(options, numOfPlaces);

    let centerPoint = point.split(',').map((value) => parseFloat(value));
    let query = querystring__default["default"].stringify(params);

    fetch__default["default"](ApiUrl + 'places/?' + query)
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
          console.log('Error with places endpoint: ', error);
          resolve({
            data: [],
            count: 0,
            top_vibes: null,
            loading: false,
            timedOut: false,
          });
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
    fields.short_name = truncate__default["default"](fields.name, constants.TRUCATE_LENGTH);
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

  // Default any zoom level less than ten to be ten, not useful to weigh distance at that point
  let zoom_to_use = zoom <= 10 ? 10: zoom;

  let zoom_norm = normalize_all(zoom_to_use,10, 20, 0, 10);

  // Logistic growth equation. Max weight is 8, minimum of 1. Weight grows exponentially in the middle range
  // TODO: pull this out into own function, allows us to weigh distance differently depending on zoom
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

  // If there are vibes, weigh the strongest by 3x
  // if (vibes.length > 0 && ordering === 'relevance') weights.vibe = 2
  // Do the same for other sorting preferences
  if (ordering !== 'relevance') weights[ordering] += 3;


  // Get scores and max in each category
  const placesScored = places.map((place) => {
    let fields = place.properties;

    // Give place a vibe score
    // TODO: Calculate `vibe_score` on backend with stored procedure.
    // TODO: Make a separate, modular method
    if (scoreBy.includes('vibes')) {

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
      fields['distance'] = turf_distance__default["default"](centerPoint, placePoint);
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

      /* all distance values are normalized between 0 and 0.95. Since we take the difference of 1 and the score,
        the lowest possible distance_score is 0.05, and the highest is 1. We do this such that lower distances
        (closer places) get a higher distacne score.
      */
      fields.distance_score = 1 - normalize_all(fields.distance, minScores['distance'], maxDistance, 0, 0.95);

      //console.log(fields.distance, minScores['distance'], maxDistance, maxDistance - fields.distance, fields.distance_score)
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
    //console.log(place.properties.name, minAverageScore, fields.average_score, maxAverageScore)
    fields.average_score =

      //final score returned to user is normalized between 0.65 and 1
      normalize_all(fields.average_score, minAverageScore, maxAverageScore, 0.65, 1);
    // Scale the icon size based on score
    fields.icon_size = scaleIconSize(fields.average_score, 0.65, 1);

    // All average_scores should be between 0.65 and 1, and icon_size between 1 and 5. Should also print in descending order
    //If so, then all is working well
    //console.log(place.properties.name, place.properties.address, fields.average_score, fields.distance_score, weights.distance)//, fields.icon_size)
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

    a.distance = turf_distance__default["default"](current, point_a);
    b.distance = turf_distance__default["default"](current, point_b);

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


// TODO: add neighborhood as top place of the list. Will need some neighborhood cards
//Function that returns every place within a certain specified radius
const nearest_places = (places, currentLocation, radius = 5) => {
  //console.log("current Location: ", currentLocation)
  //console.log("Full list of Places: ", places)

  // Push any place whose distance is under radius (0.1) to places_temp
  var places_temp = [];
  places.map((place) => {
    let fields = place.properties;
    const placePoint = turf__namespace.point(place.geometry.coordinates);
    fields['distance'] = turf_distance__default["default"](currentLocation, placePoint);
    if (fields['distance'] < radius) {
      places_temp.push(place);
      //console.log("Place within bound: ", fields["distance"])
    }
  });

  // Sort on a copy not a reference
  var places_to_return = places_temp.slice(0);

  // Do sorting after .map(), should be faster performance
  places_to_return.sort(function(a,b){
    return a.properties.distance - b.properties.distance
  });

  /* For debugging, make sure every place is sorted in ascending order
  places_to_return.map((x) => {
    console.log("sorted: ", x.properties.distance)
  })
  */
  return places_to_return
};

//Function that checks if a place is within a certain distance of user, for check ins
const validate_check_in = (place, currentLocation, threshold = 0.5) => {
  const placePoint = turf__namespace.point(place.geometry.coordinates);
  const within_distance = turf_distance__default["default"](currentLocation, placePoint) < threshold ? true:false;
  return within_distance
};
// Function determines if a point falls into the specific boundaries of Jack London District
const in_jls = (currentLocation) => {

  // Hand drawn locations. Roughly everything beneath 7th St, between Market St. and Fallon St.
  const bounds_jls = turf__namespace.polygon([[
    [-122.282617, 37.802862],
    [-122.264300, 37.795721],
    [-122.265502, 37.787005],
    [-122.288139, 37.796077],
    [-122.282617, 37.802862]
  ]]);
  return turf_boolean__default["default"](currentLocation, bounds_jls)
};

// Primary function that returns a list of neighborhoods the location is in.
// The input is the place's properties, returns array of neighborhood id's
// Vectorizes our wordpress neighborhoods data (neighborhoods.json) and flexibly utilizes available information as bounds
// If no bounds (bbox) is given, use radius, if no radius, then a hard radius of 0.8 km is set
const in_neighborhood = (place) => {

  // Name array is not returned but could be if desired, more for debugging
  const valid_neighborhoods_id = [];
  const valid_neighborhoods_name = [];
  const turf_point = turf__namespace.point(place.geometry.coordinates);

  neighborhoods.map((neighborhood) => {
    const neigh_dist = turf_distance__default["default"]([neighborhood.map.lng, neighborhood.map.lat], turf_point);

    /* Use helper function since can't assign turf.boolean() to non valid polygons which in turn can't be handled within
     the conditional statement*/
    if (neigh_dist < 5 && in_bbox_helper(place.geometry.coordinates, neighborhood.boundary)){
      valid_neighborhoods_id.push(neighborhood.id);
      valid_neighborhoods_name.push(neighborhood.slug);
    } else if (neighborhood.radius>0.00001 && neigh_dist < neighborhood.radius) {
      console.log("radius checked");
      valid_neighborhoods_id.push(neighborhood.id);
      valid_neighborhoods_name.push(neighborhood.slug);
    } else if (neigh_dist < 0.8){
      console.log("dist checked");
      valid_neighborhoods_id.push(neighborhood.id);
      valid_neighborhoods_name.push(neighborhood.slug);
    } else ;
  });
  return valid_neighborhoods_id
};

// Helper function to determine if a location is within certain bounds
const in_bbox_helper = (point, bbox) => {
  if (bbox !== "" && bbox !== undefined) {
    const parsed_bbox = JSON.parse(bbox);
    const bounds = turf__namespace.polygon([parsed_bbox]);
    //console.log("bbox", parsed_bbox)
    return turf_boolean__default["default"](point, bounds)
  } else {
    //console.log("no bbox")
    return false
  }
};

// General function to find nearest neighborhood of a locations. Returns top ten options
// Input must be [longitude, lattitude] coordinates
const nearest_neighborhood = (placePoint) => {
  const neighborhoods_ordered = neighborhoods.map((neighborhood) => {
    return {name: neighborhood.title.rendered, neigh_dist: turf_distance__default["default"]([neighborhood.map.lng, neighborhood.map.lat], placePoint)}
  });
  neighborhoods_ordered.sort(function(a,b){
    return a.neigh_dist - b.neigh_dist
  });
  return neighborhoods_ordered.slice(0,10)
};

// Helper function for associate_badge. Returns every neighborhood challenge badge
// TODO modify such that inputs can be multiple badge types, for example lookup general badges or neighborhood or place etc.
const challenge_badges_lookup = () => {
  const challenge_badges = [];
  badges$1.badges.map((badge) => {
    if (badge.type == "neighborhood") {
      challenge_badges.push(badge);
    }
  });
  return challenge_badges
};

// Returns array of valid badges (and properties) that a place is associated with. Give points towards that badge
const associate_badge = (locations) => {
  const badges_to_check = challenge_badges_lookup();
  const win_badges = [];
  badges_to_check.map((badge) => {
    console.log(badge);
    for (let i = 0; i < locations.length; i++) {
      if (badge.location.ID == locations[i]) {
        win_badges.push(badge);
      }
    }
  });
  return win_badges
};

exports.getArea = map.getArea;
exports.getBounds = map.getBounds;
exports.getDistance = map.getDistance;
exports.getDistanceToPixels = map.getDistanceToPixels;
exports.getFeaturesInBounds = map.getFeaturesInBounds;
exports.getHeatmap = map.getHeatmap;
exports.getPosition = map.getPosition;
exports.getRadius = map.getRadius;
exports.zoomToRadius = map.zoomToRadius;
exports.associate_badge = associate_badge;
exports.challenge_badges_lookup = challenge_badges_lookup;
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
exports.getCardOptions = getCardOptions;
exports.getCategoryMatch = getCategoryMatch;
exports.getEventOptions = getEventOptions;
exports.getFullLink = getFullLink;
exports.getMax = getMax;
exports.getMin = getMin;
exports.getRandomItem = getRandomItem;
exports.getRecommendedVibes = getRecommendedVibes;
exports.getTimeOfDay = getTimeOfDay;
exports.getTopCategories = getTopCategories;
exports.getTopVibes = getTopVibes;
exports.getVibeStyle = getVibeStyle;
exports.getWaveFromVibe = getWaveFromVibe;
exports.in_bbox_helper = in_bbox_helper;
exports.in_jls = in_jls;
exports.in_neighborhood = in_neighborhood;
exports.isClosedToday = isClosedToday;
exports.isOpen = isOpen;
exports.matchLists = matchLists;
exports.nearest_neighborhood = nearest_neighborhood;
exports.nearest_places = nearest_places;
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
exports.validate_check_in = validate_check_in;
exports.vibesFromPlaces = vibesFromPlaces;
