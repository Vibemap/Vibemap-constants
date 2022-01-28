'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Axios = require('axios');
var filter = require('lodash.filter');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Axios__default = /*#__PURE__*/_interopDefaultLegacy(Axios);
var filter__default = /*#__PURE__*/_interopDefaultLegacy(filter);

var vibeTaxonomy = [
	{
		id: 6768,
		description: "Arousing amusement in the silly and illogical",
		name: "Absurd",
		slug: "absurd",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Crazy",
					slug: "crazy"
				},
				{
					name: "Unexpected",
					slug: "unexpected"
				}
			],
			search_term: "",
			msv: 10
		}
	},
	{
		id: 4566,
		description: "",
		name: "Academic",
		slug: "academic",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Nerdy",
					slug: "nerdy"
				},
				{
					name: "Bookish",
					slug: "bookish"
				},
				{
					name: "Literary",
					slug: "literary"
				}
			],
			search_term: "",
			msv: 10
		}
	},
	{
		id: 3033,
		description: "",
		name: "Accessible",
		slug: "accessible",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Inclusive",
					slug: "inclusive"
				}
			],
			search_term: "",
			msv: 10
		}
	},
	{
		id: 6750,
		description: "Engaging and energetic pursuits",
		name: "Active",
		slug: "active",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Outdoors",
					slug: "outdoors"
				},
				{
					name: "Adventurous",
					slug: "adventurous"
				},
				{
					name: "Healthy",
					slug: "healthy"
				}
			],
			search_term: "",
			msv: 260
		}
	},
	{
		id: 6774,
		description: "Bringing about positive change",
		name: "Activist",
		slug: "activist",
		details: {
			categories: [
				{
					term_id: 6293,
					name: "Community",
					slug: "community",
					term_group: 0,
					term_taxonomy_id: 6293,
					taxonomy: "activity",
					description: "",
					parent: 6295,
					count: 12,
					filter: "raw"
				}
			],
			vibeset: false,
			vibes: [
				{
					name: "Civic",
					slug: "civic"
				},
				{
					name: "Vegan",
					slug: "vegan"
				},
				{
					name: "In-solidarity",
					slug: "solidarity"
				},
				{
					name: "Community",
					slug: "community"
				},
				{
					name: "Radical",
					slug: "radical"
				},
				{
					name: "Inclusive",
					slug: "inclusive"
				}
			],
			search_term: "",
			msv: 10
		}
	},
	{
		id: 6158,
		description: "Willingness to try new things",
		name: "Adventurous",
		slug: "adventurous",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Scenic",
					slug: "scenic"
				},
				{
					name: "Aquatic",
					slug: "aquatic"
				},
				{
					name: "Rebel",
					slug: "rebel"
				},
				{
					name: "Hiking",
					slug: "hiking"
				},
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Outdoorsy",
					slug: "outdoorsy"
				},
				{
					name: "Courageous",
					slug: "courageous"
				},
				{
					name: "Bold",
					slug: "bold"
				},
				{
					name: "Carefree",
					slug: "carefree"
				}
			],
			search_term: "",
			msv: 2000
		}
	},
	{
		id: 6720,
		description: "",
		name: "Aesthetic",
		slug: "aesthetic",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Fancy",
					slug: "fancy"
				},
				{
					name: "Bright",
					slug: "bright"
				}
			],
			search_term: "",
			msv: 390
		}
	},
	{
		id: 5649,
		description: "",
		name: "Affordable",
		slug: "affordable",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Cheap",
					slug: "cheap"
				}
			],
			search_term: "",
			msv: 10
		}
	},
	{
		id: 7756,
		description: "",
		name: "After Party",
		slug: "after-party",
		details: {
			vibes: [
				{
					name: "Dark",
					slug: "dark"
				},
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Party",
					slug: "party"
				},
				{
					name: "Buzzing",
					slug: "buzzing"
				}
			],
			categories: false,
			search_term: "party",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 6789,
		description: "",
		name: "Afternoon",
		slug: "afternoon",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Lazy",
					slug: "lazy"
				},
				{
					name: "Sunny",
					slug: "sunny"
				},
				{
					name: "Relaxing",
					slug: "relaxing"
				}
			],
			search_term: "",
			msv: 10
		}
	},
	{
		id: 6792,
		description: "Spacious, light-filled bliss",
		name: "Airy",
		slug: "airy",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Bright",
					slug: "bright"
				}
			],
			search_term: "",
			msv: 10
		}
	},
	{
		id: 6846,
		description: "",
		name: "All Vibes",
		slug: "vibe",
		details: {
			categories: false,
			vibeset: false,
			vibes: {
				"0": {
					term_id: 6849,
					name: "Cinematic",
					slug: "cinematic",
					term_group: 0,
					term_taxonomy_id: 6849,
					taxonomy: "vibe",
					description: "Dramatic and moving",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"1": {
					term_id: 6852,
					name: "Cottagecore",
					slug: "cottagecore",
					term_group: 0,
					term_taxonomy_id: 6852,
					taxonomy: "vibe",
					description: "Calm, collected, and always in style",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"2": {
					term_id: 6855,
					name: "Courageous",
					slug: "courageous",
					term_group: 0,
					term_taxonomy_id: 6855,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"3": {
					term_id: 6858,
					name: "Costume",
					slug: "costume",
					term_group: 0,
					term_taxonomy_id: 6858,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"4": {
					term_id: 6861,
					name: "Crazy",
					slug: "crazy",
					term_group: 0,
					term_taxonomy_id: 6861,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"5": {
					term_id: 6864,
					name: "Crisp",
					slug: "crisp",
					term_group: 0,
					term_taxonomy_id: 6864,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"6": {
					term_id: 6867,
					name: "Classy",
					slug: "classy",
					term_group: 0,
					term_taxonomy_id: 6867,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"7": {
					term_id: 6870,
					name: "Coastal",
					slug: "coastal",
					term_group: 0,
					term_taxonomy_id: 6870,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"8": {
					term_id: 6873,
					name: "Cold",
					slug: "cold",
					term_group: 0,
					term_taxonomy_id: 6873,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"9": {
					term_id: 6876,
					name: "Comfy",
					slug: "comfy",
					term_group: 0,
					term_taxonomy_id: 6876,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"10": {
					term_id: 6879,
					name: "Conversational",
					slug: "conversational",
					term_group: 0,
					term_taxonomy_id: 6879,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"11": {
					term_id: 6882,
					name: "Crowded",
					slug: "crowded",
					term_group: 0,
					term_taxonomy_id: 6882,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"12": {
					term_id: 6885,
					name: "Crunchy",
					slug: "crunchy",
					term_group: 0,
					term_taxonomy_id: 6885,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"13": {
					term_id: 6888,
					name: "Cutty",
					slug: "cutty",
					term_group: 0,
					term_taxonomy_id: 6888,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"14": {
					term_id: 6891,
					name: "Dark",
					slug: "dark",
					term_group: 0,
					term_taxonomy_id: 6891,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"15": {
					term_id: 6894,
					name: "Date Spot",
					slug: "datespot",
					term_group: 0,
					term_taxonomy_id: 6894,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"16": {
					term_id: 6897,
					name: "Dating",
					slug: "dating",
					term_group: 0,
					term_taxonomy_id: 6897,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"17": {
					term_id: 6900,
					name: "Decorative",
					slug: "decorative",
					term_group: 0,
					term_taxonomy_id: 6900,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"18": {
					term_id: 6903,
					name: "Deep Cut",
					slug: "deepcut",
					term_group: 0,
					term_taxonomy_id: 6903,
					taxonomy: "vibe",
					description: "If you know, you know",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"19": {
					term_id: 6906,
					name: "Delightful",
					slug: "delightful",
					term_group: 0,
					term_taxonomy_id: 6906,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"20": {
					term_id: 6909,
					name: "Design",
					slug: "design",
					term_group: 0,
					term_taxonomy_id: 6909,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"21": {
					term_id: 6912,
					name: "Dive",
					slug: "dive",
					term_group: 0,
					term_taxonomy_id: 6912,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"22": {
					term_id: 6915,
					name: "Drinking",
					slug: "drinking",
					term_group: 0,
					term_taxonomy_id: 6915,
					taxonomy: "vibe",
					description: "Tasty beverages with friends",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"23": {
					term_id: 6918,
					name: "Drip",
					slug: "drip",
					term_group: 0,
					term_taxonomy_id: 6918,
					taxonomy: "vibe",
					description: "All the swagger",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"24": {
					term_id: 6921,
					name: "Earthy",
					slug: "earthy",
					term_group: 0,
					term_taxonomy_id: 6921,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"25": {
					term_id: 6924,
					name: "Elegant",
					slug: "elegant",
					term_group: 0,
					term_taxonomy_id: 6924,
					taxonomy: "vibe",
					description: "Refined style and taste",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"26": {
					term_id: 6927,
					name: "Elevated",
					slug: "elevated",
					term_group: 0,
					term_taxonomy_id: 6927,
					taxonomy: "vibe",
					description: "Positivity and respect",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"27": {
					term_id: 6930,
					name: "Energetic",
					slug: "energetic",
					term_group: 0,
					term_taxonomy_id: 6930,
					taxonomy: "vibe",
					description: "Full of vitality and possibility",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"28": {
					term_id: 6933,
					name: "Exciting",
					slug: "exciting",
					term_group: 0,
					term_taxonomy_id: 6933,
					taxonomy: "vibe",
					description: "Beyond stoked",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"29": {
					term_id: 6938,
					name: "Explore",
					slug: "explore",
					term_group: 0,
					term_taxonomy_id: 6938,
					taxonomy: "vibe",
					description: "Take a new path",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"30": {
					term_id: 6941,
					name: "Fashionista",
					slug: "fashionista",
					term_group: 0,
					term_taxonomy_id: 6941,
					taxonomy: "vibe",
					description: "All about the glam",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"31": {
					term_id: 6944,
					name: "Garden",
					slug: "garden",
					term_group: 0,
					term_taxonomy_id: 6944,
					taxonomy: "vibe",
					description: "Growth of fruits and flowers",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"32": {
					term_id: 6947,
					name: "Geeky",
					slug: "geeky",
					term_group: 0,
					term_taxonomy_id: 6947,
					taxonomy: "vibe",
					description: "Profound Enthusiasm",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"33": {
					term_id: 6950,
					name: "Generous",
					slug: "generous",
					term_group: 0,
					term_taxonomy_id: 6950,
					taxonomy: "vibe",
					description: "Abundance of giving",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"34": {
					term_id: 6953,
					name: "Glam",
					slug: "glam",
					term_group: 0,
					term_taxonomy_id: 6953,
					taxonomy: "vibe",
					description: "Beautiful beyond compare",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"35": {
					term_id: 6956,
					name: "Harmonious",
					slug: "harmonious",
					term_group: 0,
					term_taxonomy_id: 6956,
					taxonomy: "vibe",
					description: "Positive balance",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"36": {
					term_id: 6959,
					name: "Hi Fi",
					slug: "hifi",
					term_group: 0,
					term_taxonomy_id: 6959,
					taxonomy: "vibe",
					description: "All about that high quality",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"37": {
					term_id: 6962,
					name: "Hippie",
					slug: "hippie",
					term_group: 0,
					term_taxonomy_id: 6962,
					taxonomy: "vibe",
					description: "Chill out",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"38": {
					term_id: 6965,
					name: "Hygge",
					slug: "hygge",
					term_group: 0,
					term_taxonomy_id: 6965,
					taxonomy: "vibe",
					description: " Cozy &amp; Comfortable",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"39": {
					term_id: 6968,
					name: "Hipster",
					slug: "hipster",
					term_group: 0,
					term_taxonomy_id: 6968,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"40": {
					term_id: 6971,
					name: "Holiday",
					slug: "holiday",
					term_group: 0,
					term_taxonomy_id: 6971,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"41": {
					term_id: 6974,
					name: "Holistic",
					slug: "holistic",
					term_group: 0,
					term_taxonomy_id: 6974,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"42": {
					term_id: 6977,
					name: "Hollywood",
					slug: "hollywood",
					term_group: 0,
					term_taxonomy_id: 6977,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"43": {
					term_id: 6980,
					name: "Homemade",
					slug: "homemade",
					term_group: 0,
					term_taxonomy_id: 6980,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"44": {
					term_id: 6983,
					name: "Hot",
					slug: "hot",
					term_group: 0,
					term_taxonomy_id: 6983,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"45": {
					term_id: 6986,
					name: "Hangover",
					slug: "hangover",
					term_group: 0,
					term_taxonomy_id: 6986,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"46": {
					term_id: 6989,
					name: "Hustle",
					slug: "hustle",
					term_group: 0,
					term_taxonomy_id: 6989,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"47": {
					term_id: 6992,
					name: "Influencial",
					slug: "influencial",
					term_group: 0,
					term_taxonomy_id: 6992,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"48": {
					term_id: 6995,
					name: "Innovative",
					slug: "innovative",
					term_group: 0,
					term_taxonomy_id: 6995,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"49": {
					term_id: 6998,
					name: "Inventive",
					slug: "inventive",
					term_group: 0,
					term_taxonomy_id: 6998,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"50": {
					term_id: 7001,
					name: "Inspired",
					slug: "inspired",
					term_group: 0,
					term_taxonomy_id: 7001,
					taxonomy: "vibe",
					description: "Brilliant and life affirming",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"51": {
					term_id: 7004,
					name: "Intense",
					slug: "intense",
					term_group: 0,
					term_taxonomy_id: 7004,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"52": {
					term_id: 7007,
					name: "Intergenerational",
					slug: "intergenerational",
					term_group: 0,
					term_taxonomy_id: 7007,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"53": {
					term_id: 7010,
					name: "International",
					slug: "international",
					term_group: 0,
					term_taxonomy_id: 7010,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"54": {
					term_id: 7013,
					name: "Interesting",
					slug: "interesting",
					term_group: 0,
					term_taxonomy_id: 7013,
					taxonomy: "vibe",
					description: "Arousing curiosity and feeling",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"55": {
					term_id: 7016,
					name: "Intimate",
					slug: "intimate",
					term_group: 0,
					term_taxonomy_id: 7016,
					taxonomy: "vibe",
					description: "Warmth of closeness",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"56": {
					term_id: 7019,
					name: "Jazzy",
					slug: "jazzy",
					term_group: 0,
					term_taxonomy_id: 7019,
					taxonomy: "vibe",
					description: "Eye catching style",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"57": {
					term_id: 7022,
					name: "Juicy",
					slug: "juicy",
					term_group: 0,
					term_taxonomy_id: 7022,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"58": {
					term_id: 7025,
					name: "Justice",
					slug: "justice",
					term_group: 0,
					term_taxonomy_id: 7025,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"59": {
					term_id: 7028,
					name: "Joyful",
					slug: "joyful",
					term_group: 0,
					term_taxonomy_id: 7028,
					taxonomy: "vibe",
					description: "Feeling great pleasure and happiness",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"60": {
					term_id: 7031,
					name: "Kidcore",
					slug: "kidcore",
					term_group: 0,
					term_taxonomy_id: 7031,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"61": {
					term_id: 7034,
					name: "Kitschy",
					slug: "kitschy",
					term_group: 0,
					term_taxonomy_id: 7034,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"62": {
					term_id: 7037,
					name: "Kindness",
					slug: "kindness",
					term_group: 0,
					term_taxonomy_id: 7037,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"63": {
					term_id: 7040,
					name: "Kinky",
					slug: "kinky",
					term_group: 0,
					term_taxonomy_id: 7040,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"64": {
					term_id: 7043,
					name: "Laid-back",
					slug: "laidback",
					term_group: 0,
					term_taxonomy_id: 7043,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"65": {
					term_id: 7046,
					name: "Late Night",
					slug: "latenight",
					term_group: 0,
					term_taxonomy_id: 7046,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"66": {
					term_id: 7049,
					name: "Lax",
					slug: "lax",
					term_group: 0,
					term_taxonomy_id: 7049,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"67": {
					term_id: 7052,
					name: "Laugh",
					slug: "laugh",
					term_group: 0,
					term_taxonomy_id: 7052,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"68": {
					term_id: 7055,
					name: "Legacy",
					slug: "legacy",
					term_group: 0,
					term_taxonomy_id: 7055,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"69": {
					term_id: 7058,
					name: "Legit",
					slug: "legit",
					term_group: 0,
					term_taxonomy_id: 7058,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"70": {
					term_id: 7061,
					name: "Liberating",
					slug: "liberating",
					term_group: 0,
					term_taxonomy_id: 7061,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"71": {
					term_id: 7064,
					name: "Literary",
					slug: "literary",
					term_group: 0,
					term_taxonomy_id: 7064,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"72": {
					term_id: 7067,
					name: "Loud",
					slug: "loud",
					term_group: 0,
					term_taxonomy_id: 7067,
					taxonomy: "vibe",
					description: "It's turned up",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"73": {
					term_id: 7070,
					name: "Lunch",
					slug: "lunch",
					term_group: 0,
					term_taxonomy_id: 7070,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"74": {
					term_id: 7073,
					name: "Lumberjack",
					slug: "lumberjack",
					term_group: 0,
					term_taxonomy_id: 7073,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"75": {
					term_id: 7076,
					name: "Luxe",
					slug: "luxe",
					term_group: 0,
					term_taxonomy_id: 7076,
					taxonomy: "vibe",
					description: "Oh so fancy",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"76": {
					term_id: 7079,
					name: "Love",
					slug: "love",
					term_group: 0,
					term_taxonomy_id: 7079,
					taxonomy: "vibe",
					description: "Profound affection for yourself and others",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"77": {
					term_id: 7082,
					name: "Messy",
					slug: "messy",
					term_group: 0,
					term_taxonomy_id: 7082,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"78": {
					term_id: 7085,
					name: "Mellow",
					slug: "mellow",
					term_group: 0,
					term_taxonomy_id: 7085,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"79": {
					term_id: 7088,
					name: "Mermaid",
					slug: "mermaid",
					term_group: 0,
					term_taxonomy_id: 7088,
					taxonomy: "vibe",
					description: "From the land to the sea",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"80": {
					term_id: 7091,
					name: "Minimalist",
					slug: "minimalist",
					term_group: 0,
					term_taxonomy_id: 7091,
					taxonomy: "vibe",
					description: "Simple and good use of effort",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"81": {
					term_id: 7094,
					name: "Moody",
					slug: "moody",
					term_group: 0,
					term_taxonomy_id: 7094,
					taxonomy: "vibe",
					description: "A sudden burst of a mood",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"82": {
					term_id: 7097,
					name: "Morning",
					slug: "morning",
					term_group: 0,
					term_taxonomy_id: 7097,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"83": {
					term_id: 7100,
					name: "Musical",
					slug: "musical",
					term_group: 0,
					term_taxonomy_id: 7100,
					taxonomy: "vibe",
					description: "Sounds of feeling and harmony",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"84": {
					term_id: 7103,
					name: "Mingle",
					slug: "mingle",
					term_group: 0,
					term_taxonomy_id: 7103,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"85": {
					term_id: 7106,
					name: "Modern",
					slug: "modern",
					term_group: 0,
					term_taxonomy_id: 7106,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"86": {
					term_id: 7109,
					name: "Mid-century",
					slug: "mid-century",
					term_group: 0,
					term_taxonomy_id: 7109,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"87": {
					term_id: 7112,
					name: "Namaste",
					slug: "namaste",
					term_group: 0,
					term_taxonomy_id: 7112,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"88": {
					term_id: 7115,
					name: "Natural",
					slug: "natural",
					term_group: 0,
					term_taxonomy_id: 7115,
					taxonomy: "vibe",
					description: "Of the earth",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"89": {
					term_id: 7118,
					name: "Neighborhood",
					slug: "neighborhood",
					term_group: 0,
					term_taxonomy_id: 7118,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"90": {
					term_id: 7121,
					name: "Nightlife",
					slug: "nightlife",
					term_group: 0,
					term_taxonomy_id: 7121,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"91": {
					term_id: 7124,
					name: "Oasis",
					slug: "oasis",
					term_group: 0,
					term_taxonomy_id: 7124,
					taxonomy: "vibe",
					description: "Like finding water in the desert",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"92": {
					term_id: 7127,
					name: "Ocean",
					slug: "ocean",
					term_group: 0,
					term_taxonomy_id: 7127,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"93": {
					term_id: 7130,
					name: "Old",
					slug: "old",
					term_group: 0,
					term_taxonomy_id: 7130,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"94": {
					term_id: 7133,
					name: "Old World",
					slug: "old-world",
					term_group: 0,
					term_taxonomy_id: 7133,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"95": {
					term_id: 7136,
					name: "Open",
					slug: "open",
					term_group: 0,
					term_taxonomy_id: 7136,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"96": {
					term_id: 7139,
					name: "Oregon",
					slug: "oregon",
					term_group: 0,
					term_taxonomy_id: 7139,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"97": {
					term_id: 7142,
					name: "Optimistic",
					slug: "optimistic",
					term_group: 0,
					term_taxonomy_id: 7142,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"98": {
					term_id: 7145,
					name: "Opulent",
					slug: "opulent",
					term_group: 0,
					term_taxonomy_id: 7145,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"99": {
					term_id: 7148,
					name: "Outdoorsy",
					slug: "outdoorsy",
					term_group: 0,
					term_taxonomy_id: 7148,
					taxonomy: "vibe",
					description: "Beinging one with the land",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"100": {
					term_id: 7151,
					name: "Outrageous",
					slug: "outrageous",
					term_group: 0,
					term_taxonomy_id: 7151,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"101": {
					term_id: 7154,
					name: "Paranormal",
					slug: "paranormal",
					term_group: 0,
					term_taxonomy_id: 7154,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"102": {
					term_id: 7157,
					name: "Participatory",
					slug: "participatory",
					term_group: 0,
					term_taxonomy_id: 7157,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"103": {
					term_id: 7160,
					name: "Panoramic",
					slug: "panoramic",
					term_group: 0,
					term_taxonomy_id: 7160,
					taxonomy: "vibe",
					description: "A wide beautiful view",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"104": {
					term_id: 7163,
					name: "Paradise",
					slug: "paradise",
					term_group: 0,
					term_taxonomy_id: 7163,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"105": {
					term_id: 7166,
					name: "Parisian",
					slug: "parisian",
					term_group: 0,
					term_taxonomy_id: 7166,
					taxonomy: "vibe",
					description: "Everyday, effortless chic",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"106": {
					term_id: 7169,
					name: "Park",
					slug: "park",
					term_group: 0,
					term_taxonomy_id: 7169,
					taxonomy: "vibe",
					description: "The outdoor spaces we all share",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"107": {
					term_id: 7172,
					name: "Party",
					slug: "party",
					term_group: 0,
					term_taxonomy_id: 7172,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"108": {
					term_id: 7175,
					name: "Pastel",
					slug: "pastel",
					term_group: 0,
					term_taxonomy_id: 7175,
					taxonomy: "vibe",
					description: " Dreamy and calm",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"109": {
					term_id: 7178,
					name: "Perspective",
					slug: "perspective",
					term_group: 0,
					term_taxonomy_id: 7178,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"110": {
					term_id: 7181,
					name: "Photo",
					slug: "photo",
					term_group: 0,
					term_taxonomy_id: 7181,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"111": {
					term_id: 7184,
					name: "Plant",
					slug: "plant",
					term_group: 0,
					term_taxonomy_id: 7184,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"112": {
					term_id: 7187,
					name: "Playful",
					slug: "playful",
					term_group: 0,
					term_taxonomy_id: 7187,
					taxonomy: "vibe",
					description: "Fun and games",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"113": {
					term_id: 7190,
					name: "Poppin'",
					slug: "popping",
					term_group: 0,
					term_taxonomy_id: 7190,
					taxonomy: "vibe",
					description: "It's on fire",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"114": {
					term_id: 7193,
					name: "Pretty",
					slug: "pretty",
					term_group: 0,
					term_taxonomy_id: 7193,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"115": {
					term_id: 7196,
					name: "Posh",
					slug: "posh",
					term_group: 0,
					term_taxonomy_id: 7196,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"116": {
					term_id: 7199,
					name: "Pumpkin",
					slug: "pumpkin",
					term_group: 0,
					term_taxonomy_id: 7199,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"117": {
					term_id: 7202,
					name: "Queer",
					slug: "queer",
					term_group: 0,
					term_taxonomy_id: 7202,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"118": {
					term_id: 7205,
					name: "Quiet",
					slug: "quiet",
					term_group: 0,
					term_taxonomy_id: 7205,
					taxonomy: "vibe",
					description: "A space with little distraction",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"119": {
					term_id: 7208,
					name: "Rainbow",
					slug: "rainbow",
					term_group: 0,
					term_taxonomy_id: 7208,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"120": {
					term_id: 7211,
					name: "Raunchy",
					slug: "raunchy",
					term_group: 0,
					term_taxonomy_id: 7211,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"121": {
					term_id: 7214,
					name: "Recyled",
					slug: "recyled",
					term_group: 0,
					term_taxonomy_id: 7214,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"122": {
					term_id: 7217,
					name: "Refined",
					slug: "refined",
					term_group: 0,
					term_taxonomy_id: 7217,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"123": {
					term_id: 7220,
					name: "Refreshing",
					slug: "refreshing",
					term_group: 0,
					term_taxonomy_id: 7220,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"124": {
					term_id: 7223,
					name: "Rejuvenating",
					slug: "rejuvenating",
					term_group: 0,
					term_taxonomy_id: 7223,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"125": {
					term_id: 7226,
					name: "Renowned",
					slug: "renowned",
					term_group: 0,
					term_taxonomy_id: 7226,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"126": {
					term_id: 7229,
					name: "Restorative",
					slug: "restorative",
					term_group: 0,
					term_taxonomy_id: 7229,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"127": {
					term_id: 7232,
					name: "Reuse",
					slug: "reuse",
					term_group: 0,
					term_taxonomy_id: 7232,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"129": {
					term_id: 7238,
					name: "Revolutionary",
					slug: "revolutionary",
					term_group: 0,
					term_taxonomy_id: 7238,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"130": {
					term_id: 7241,
					name: "Roadhouse",
					slug: "roadhouse",
					term_group: 0,
					term_taxonomy_id: 7241,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"131": {
					term_id: 7244,
					name: "Rugged",
					slug: "rugged",
					term_group: 0,
					term_taxonomy_id: 7244,
					taxonomy: "vibe",
					description: "Wild &amp; rough",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"132": {
					term_id: 7247,
					name: "Rustic",
					slug: "rustic",
					term_group: 0,
					term_taxonomy_id: 7247,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"133": {
					term_id: 7250,
					name: "Safe",
					slug: "safe",
					term_group: 0,
					term_taxonomy_id: 7250,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"134": {
					term_id: 7253,
					name: "Sassy",
					slug: "sassy",
					term_group: 0,
					term_taxonomy_id: 7253,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"135": {
					term_id: 7256,
					name: "Savory",
					slug: "savory",
					term_group: 0,
					term_taxonomy_id: 7256,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"136": {
					term_id: 7259,
					name: "Scuba",
					slug: "scuba",
					term_group: 0,
					term_taxonomy_id: 7259,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"137": {
					term_id: 7262,
					name: "Shopaholic",
					slug: "shopaholic",
					term_group: 0,
					term_taxonomy_id: 7262,
					taxonomy: "vibe",
					description: "Shop till you drop",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"138": {
					term_id: 7265,
					name: "Seasonal",
					slug: "seasonal",
					term_group: 0,
					term_taxonomy_id: 7265,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"139": {
					term_id: 7268,
					name: "Self Care",
					slug: "selfcare",
					term_group: 0,
					term_taxonomy_id: 7268,
					taxonomy: "vibe",
					description: "Take care of yourself",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"140": {
					term_id: 7271,
					name: "Serene",
					slug: "serene",
					term_group: 0,
					term_taxonomy_id: 7271,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"141": {
					term_id: 7274,
					name: "Sensual",
					slug: "sensual",
					term_group: 0,
					term_taxonomy_id: 7274,
					taxonomy: "vibe",
					description: "Invoking the senses",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"142": {
					term_id: 7277,
					name: "Shimmy",
					slug: "shimmy",
					term_group: 0,
					term_taxonomy_id: 7277,
					taxonomy: "vibe",
					description: "Shakin' &amp; swayin'",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"143": {
					term_id: 7280,
					name: "Silly",
					slug: "silly",
					term_group: 0,
					term_taxonomy_id: 7280,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"144": {
					term_id: 7283,
					name: "Simple",
					slug: "simple",
					term_group: 0,
					term_taxonomy_id: 7283,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"145": {
					term_id: 7286,
					name: "Singing",
					slug: "singing",
					term_group: 0,
					term_taxonomy_id: 7286,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"146": {
					term_id: 7289,
					name: "Skate",
					slug: "skate",
					term_group: 0,
					term_taxonomy_id: 7289,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"147": {
					term_id: 7292,
					name: "Slurpy",
					slug: "slurpy",
					term_group: 0,
					term_taxonomy_id: 7292,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"148": {
					term_id: 7295,
					name: "Small",
					slug: "small",
					term_group: 0,
					term_taxonomy_id: 7295,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"149": {
					term_id: 7298,
					name: "Smokey",
					slug: "smokey",
					term_group: 0,
					term_taxonomy_id: 7298,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"150": {
					term_id: 7301,
					name: "Social",
					slug: "social-2",
					term_group: 0,
					term_taxonomy_id: 7301,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"151": {
					term_id: 7304,
					name: "Snacky",
					slug: "snacky",
					term_group: 0,
					term_taxonomy_id: 7304,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"152": {
					term_id: 7307,
					name: "Snowy",
					slug: "snowy",
					term_group: 0,
					term_taxonomy_id: 7307,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"153": {
					term_id: 7310,
					name: "Sober",
					slug: "sober",
					term_group: 0,
					term_taxonomy_id: 7310,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"154": {
					term_id: 7313,
					name: "Soothing",
					slug: "soothing",
					term_group: 0,
					term_taxonomy_id: 7313,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"155": {
					term_id: 7316,
					name: "Sophisticated",
					slug: "sophisticated",
					term_group: 0,
					term_taxonomy_id: 7316,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"156": {
					term_id: 7319,
					name: "Sparkly",
					slug: "sparkly",
					term_group: 0,
					term_taxonomy_id: 7319,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"157": {
					term_id: 7322,
					name: "Special",
					slug: "special",
					term_group: 0,
					term_taxonomy_id: 7322,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"158": {
					term_id: 7325,
					name: "Spontaneous",
					slug: "spontaneous",
					term_group: 0,
					term_taxonomy_id: 7325,
					taxonomy: "vibe",
					description: "Go with the flow",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"159": {
					term_id: 7328,
					name: "Strange",
					slug: "strange",
					term_group: 0,
					term_taxonomy_id: 7328,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"160": {
					term_id: 7331,
					name: "Sublime",
					slug: "sublime",
					term_group: 0,
					term_taxonomy_id: 7331,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"161": {
					term_id: 7334,
					name: "Subversive",
					slug: "subversive",
					term_group: 0,
					term_taxonomy_id: 7334,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"162": {
					term_id: 7337,
					name: "Sugary",
					slug: "sugary",
					term_group: 0,
					term_taxonomy_id: 7337,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"163": {
					term_id: 7340,
					name: "Summer",
					slug: "summer",
					term_group: 0,
					term_taxonomy_id: 7340,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"164": {
					term_id: 7343,
					name: "Sunset",
					slug: "sunset",
					term_group: 0,
					term_taxonomy_id: 7343,
					taxonomy: "vibe",
					description: "Amazing end to the day",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"165": {
					term_id: 7346,
					name: "Surf",
					slug: "surf",
					term_group: 0,
					term_taxonomy_id: 7346,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"166": {
					term_id: 7349,
					name: "Supportive",
					slug: "supportive",
					term_group: 0,
					term_taxonomy_id: 7349,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"167": {
					term_id: 7352,
					name: "Thrift",
					slug: "thrift",
					term_group: 0,
					term_taxonomy_id: 7352,
					taxonomy: "vibe",
					description: "Good for a second time",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"168": {
					term_id: 7355,
					name: "Turned Up",
					slug: "turnedup",
					term_group: 0,
					term_taxonomy_id: 7355,
					taxonomy: "vibe",
					description: "Volume to 11",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"169": {
					term_id: 7358,
					name: "Treat Yourself",
					slug: "treatyourself",
					term_group: 0,
					term_taxonomy_id: 7358,
					taxonomy: "vibe",
					description: "You deserve it",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"170": {
					term_id: 7361,
					name: "Transformative",
					slug: "transformative",
					term_group: 0,
					term_taxonomy_id: 7361,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"171": {
					term_id: 7364,
					name: "Transit",
					slug: "transit",
					term_group: 0,
					term_taxonomy_id: 7364,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"172": {
					term_id: 7367,
					name: "Tranquil",
					slug: "tranquil",
					term_group: 0,
					term_taxonomy_id: 7367,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"173": {
					term_id: 7370,
					name: "Trippy",
					slug: "trippy",
					term_group: 0,
					term_taxonomy_id: 7370,
					taxonomy: "vibe",
					description: "Unexpectedly different",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"174": {
					term_id: 7373,
					name: "Trust",
					slug: "trust",
					term_group: 0,
					term_taxonomy_id: 7373,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"175": {
					term_id: 7376,
					name: "Utopian",
					slug: "utopian",
					term_group: 0,
					term_taxonomy_id: 7376,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"176": {
					term_id: 7379,
					name: "Ugly",
					slug: "ugly",
					term_group: 0,
					term_taxonomy_id: 7379,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"177": {
					term_id: 7382,
					name: "Unexpected",
					slug: "unexpected",
					term_group: 0,
					term_taxonomy_id: 7382,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"178": {
					term_id: 7385,
					name: "Aloha",
					slug: "aloha",
					term_group: 0,
					term_taxonomy_id: 7385,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"179": {
					term_id: 7388,
					name: "Angelic",
					slug: "angelic",
					term_group: 0,
					term_taxonomy_id: 7388,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"180": {
					term_id: 7391,
					name: "Arctic",
					slug: "arctic",
					term_group: 0,
					term_taxonomy_id: 7391,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"181": {
					term_id: 7394,
					name: "Art-Deco",
					slug: "art-deco",
					term_group: 0,
					term_taxonomy_id: 7394,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"182": {
					term_id: 7397,
					name: "Badass",
					slug: "badass",
					term_group: 0,
					term_taxonomy_id: 7397,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"183": {
					term_id: 7400,
					name: "Bagel",
					slug: "bagel",
					term_group: 0,
					term_taxonomy_id: 7400,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"184": {
					term_id: 7403,
					name: "Blessed",
					slug: "blessed",
					term_group: 0,
					term_taxonomy_id: 7403,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"185": {
					term_id: 7406,
					name: "Boujee",
					slug: "boujee",
					term_group: 0,
					term_taxonomy_id: 7406,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"186": {
					term_id: 7409,
					name: "Breezy",
					slug: "breezy",
					term_group: 0,
					term_taxonomy_id: 7409,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"187": {
					term_id: 7412,
					name: "California",
					slug: "california",
					term_group: 0,
					term_taxonomy_id: 7412,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"188": {
					term_id: 7415,
					name: "Caribbean",
					slug: "caribbean",
					term_group: 0,
					term_taxonomy_id: 7415,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"189": {
					term_id: 7418,
					name: "DIY",
					slug: "diy",
					term_group: 0,
					term_taxonomy_id: 7418,
					taxonomy: "vibe",
					description: "Do-It-Yourself",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"190": {
					term_id: 7421,
					name: "Dope",
					slug: "dope",
					term_group: 0,
					term_taxonomy_id: 7421,
					taxonomy: "vibe",
					description: "Anything good",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"191": {
					term_id: 7424,
					name: "Dramatic",
					slug: "dramatic",
					term_group: 0,
					term_taxonomy_id: 7424,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"192": {
					term_id: 7427,
					name: "Dress-up",
					slug: "dress-up",
					term_group: 0,
					term_taxonomy_id: 7427,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"193": {
					term_id: 7430,
					name: "Drinks",
					slug: "drinks",
					term_group: 0,
					term_taxonomy_id: 7430,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"194": {
					term_id: 7433,
					name: "Eccentric",
					slug: "eccentric",
					term_group: 0,
					term_taxonomy_id: 7433,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"195": {
					term_id: 7436,
					name: "Eco",
					slug: "eco",
					term_group: 0,
					term_taxonomy_id: 7436,
					taxonomy: "vibe",
					description: "From earth and good for earth",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"196": {
					term_id: 7439,
					name: "Educational",
					slug: "educational",
					term_group: 0,
					term_taxonomy_id: 7439,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"197": {
					term_id: 7442,
					name: "Eerie",
					slug: "eerie",
					term_group: 0,
					term_taxonomy_id: 7442,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"198": {
					term_id: 7445,
					name: "Emo",
					slug: "emo",
					term_group: 0,
					term_taxonomy_id: 7445,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"199": {
					term_id: 7448,
					name: "Emotional",
					slug: "emotional",
					term_group: 0,
					term_taxonomy_id: 7448,
					taxonomy: "vibe",
					description: "All the feelings",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"200": {
					term_id: 7451,
					name: "Enchanted",
					slug: "enchanted",
					term_group: 0,
					term_taxonomy_id: 7451,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"201": {
					term_id: 7454,
					name: "Entertaining",
					slug: "entertaining",
					term_group: 0,
					term_taxonomy_id: 7454,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"202": {
					term_id: 7457,
					name: "Enthusiastic",
					slug: "enthusiastic",
					term_group: 0,
					term_taxonomy_id: 7457,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"203": {
					term_id: 7460,
					name: "Entrepreneurial",
					slug: "entrepreneurial",
					term_group: 0,
					term_taxonomy_id: 7460,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"204": {
					term_id: 7463,
					name: "Euro",
					slug: "euro",
					term_group: 0,
					term_taxonomy_id: 7463,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"205": {
					term_id: 7466,
					name: "Evergreen",
					slug: "evergreen",
					term_group: 0,
					term_taxonomy_id: 7466,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"206": {
					term_id: 7469,
					name: "Exclusive",
					slug: "exclusive",
					term_group: 0,
					term_taxonomy_id: 7469,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"207": {
					term_id: 7472,
					name: "Experiential",
					slug: "experiential",
					term_group: 0,
					term_taxonomy_id: 7472,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"208": {
					term_id: 7475,
					name: "Experimental",
					slug: "experimental",
					term_group: 0,
					term_taxonomy_id: 7475,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"209": {
					term_id: 7478,
					name: "Fancy",
					slug: "fancy",
					term_group: 0,
					term_taxonomy_id: 7478,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"210": {
					term_id: 7481,
					name: "Fantastic",
					slug: "fantastic",
					term_group: 0,
					term_taxonomy_id: 7481,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"211": {
					term_id: 7484,
					name: "Farout",
					slug: "farout",
					term_group: 0,
					term_taxonomy_id: 7484,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"212": {
					term_id: 7487,
					name: "Fashion",
					slug: "fashion",
					term_group: 0,
					term_taxonomy_id: 7487,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"213": {
					term_id: 7490,
					name: "Favorite",
					slug: "favorite",
					term_group: 0,
					term_taxonomy_id: 7490,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"214": {
					term_id: 7493,
					name: "Feminist",
					slug: "feminist",
					term_group: 0,
					term_taxonomy_id: 7493,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"215": {
					term_id: 7496,
					name: "Femme",
					slug: "femme",
					term_group: 0,
					term_taxonomy_id: 7496,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"216": {
					term_id: 7499,
					name: "Fierce",
					slug: "fierce",
					term_group: 0,
					term_taxonomy_id: 7499,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"217": {
					term_id: 7502,
					name: "Film",
					slug: "film",
					term_group: 0,
					term_taxonomy_id: 7502,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"218": {
					term_id: 7505,
					name: "Frosty",
					slug: "frosty",
					term_group: 0,
					term_taxonomy_id: 7505,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"219": {
					term_id: 7508,
					name: "Fusion",
					slug: "fusion",
					term_group: 0,
					term_taxonomy_id: 7508,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"220": {
					term_id: 7511,
					name: "Futuristic",
					slug: "futuristic",
					term_group: 0,
					term_taxonomy_id: 7511,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"221": {
					term_id: 7514,
					name: "Games",
					slug: "games",
					term_group: 0,
					term_taxonomy_id: 7514,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"222": {
					term_id: 7517,
					name: "Gentle",
					slug: "gentle",
					term_group: 0,
					term_taxonomy_id: 7517,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"223": {
					term_id: 7520,
					name: "Granola",
					slug: "granola",
					term_group: 0,
					term_taxonomy_id: 7520,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"224": {
					term_id: 7523,
					name: "Grateful",
					slug: "grateful",
					term_group: 0,
					term_taxonomy_id: 7523,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"225": {
					term_id: 7526,
					name: "Glitter",
					slug: "glitter",
					term_group: 0,
					term_taxonomy_id: 7526,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"226": {
					term_id: 7529,
					name: "Grimy",
					slug: "grimy",
					term_group: 0,
					term_taxonomy_id: 7529,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"227": {
					term_id: 7532,
					name: "Grunge",
					slug: "grunge",
					term_group: 0,
					term_taxonomy_id: 7532,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"228": {
					term_id: 7535,
					name: "Gothic",
					slug: "gothic",
					term_group: 0,
					term_taxonomy_id: 7535,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"229": {
					term_id: 7538,
					name: "Halloween",
					slug: "halloween",
					term_group: 0,
					term_taxonomy_id: 7538,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"230": {
					term_id: 7541,
					name: "Hanukkah",
					slug: "hanukkah",
					term_group: 0,
					term_taxonomy_id: 7541,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"231": {
					term_id: 7544,
					name: "Hearty",
					slug: "hearty",
					term_group: 0,
					term_taxonomy_id: 7544,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"232": {
					term_id: 7547,
					name: "Helpful",
					slug: "helpful",
					term_group: 0,
					term_taxonomy_id: 7547,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"233": {
					term_id: 7550,
					name: "Heritage",
					slug: "heritage",
					term_group: 0,
					term_taxonomy_id: 7550,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"234": {
					term_id: 7552,
					name: "Highbrow",
					slug: "highbrow",
					term_group: 0,
					term_taxonomy_id: 7552,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"235": {
					term_id: 7555,
					name: "Hip",
					slug: "hip",
					term_group: 0,
					term_taxonomy_id: 7555,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"237": {
					term_id: 7561,
					name: "New Wave",
					slug: "new-wave",
					term_group: 0,
					term_taxonomy_id: 7561,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"238": {
					term_id: 7564,
					name: "Nosh",
					slug: "nosh",
					term_group: 0,
					term_taxonomy_id: 7564,
					taxonomy: "vibe",
					description: "Snack on",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"239": {
					term_id: 7567,
					name: "Novel",
					slug: "novel",
					term_group: 0,
					term_taxonomy_id: 7567,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"240": {
					term_id: 7570,
					name: "Passionate",
					slug: "passionate",
					term_group: 0,
					term_taxonomy_id: 7570,
					taxonomy: "vibe",
					description: "Deeply caring for something",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"241": {
					term_id: 7573,
					name: "Taco",
					slug: "taco",
					term_group: 0,
					term_taxonomy_id: 7573,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"242": {
					term_id: 7576,
					name: "Tokyo",
					slug: "tokyo",
					term_group: 0,
					term_taxonomy_id: 7576,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"243": {
					term_id: 7579,
					name: "Tourist",
					slug: "tourist",
					term_group: 0,
					term_taxonomy_id: 7579,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"244": {
					term_id: 7582,
					name: "Vacation",
					slug: "vacation",
					term_group: 0,
					term_taxonomy_id: 7582,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"245": {
					term_id: 7585,
					name: "Vast",
					slug: "vast",
					term_group: 0,
					term_taxonomy_id: 7585,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"246": {
					term_id: 7588,
					name: "Vegetarian",
					slug: "vegetarian",
					term_group: 0,
					term_taxonomy_id: 7588,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"247": {
					term_id: 7591,
					name: "VIP",
					slug: "vip",
					term_group: 0,
					term_taxonomy_id: 7591,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"248": {
					term_id: 7594,
					name: "Visionary",
					slug: "visionary",
					term_group: 0,
					term_taxonomy_id: 7594,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"249": {
					term_id: 7597,
					name: "Views",
					slug: "views",
					term_group: 0,
					term_taxonomy_id: 7597,
					taxonomy: "vibe",
					description: "Pleasing landscapes or environments",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"250": {
					term_id: 7600,
					name: "Volunteer",
					slug: "volunteer",
					term_group: 0,
					term_taxonomy_id: 7600,
					taxonomy: "vibe",
					description: "Helping other and giving back",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"251": {
					term_id: 7603,
					name: "Whimsical",
					slug: "whimsical",
					term_group: 0,
					term_taxonomy_id: 7603,
					taxonomy: "vibe",
					description: "Carefree and playful amusement",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"252": {
					term_id: 7606,
					name: "Witchy",
					slug: "witchy",
					term_group: 0,
					term_taxonomy_id: 7606,
					taxonomy: "vibe",
					description: "In possession of the supernatural",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"253": {
					term_id: 7609,
					name: "Woodsy",
					slug: "woodsy",
					term_group: 0,
					term_taxonomy_id: 7609,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"254": {
					term_id: 7612,
					name: "Wintry",
					slug: "wintry",
					term_group: 0,
					term_taxonomy_id: 7612,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"255": {
					term_id: 7615,
					name: "Yoga",
					slug: "yoga",
					term_group: 0,
					term_taxonomy_id: 7615,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"256": {
					term_id: 7618,
					name: "Young",
					slug: "young",
					term_group: 0,
					term_taxonomy_id: 7618,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"257": {
					term_id: 7621,
					name: "Yuletide",
					slug: "yuletide",
					term_group: 0,
					term_taxonomy_id: 7621,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"258": {
					term_id: 7624,
					name: "Rowdy",
					slug: "rowdy",
					term_group: 0,
					term_taxonomy_id: 7624,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"259": {
					term_id: 7627,
					name: "Tiki",
					slug: "tiki",
					term_group: 0,
					term_taxonomy_id: 7627,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"260": {
					term_id: 7630,
					name: "Walk",
					slug: "walk",
					term_group: 0,
					term_taxonomy_id: 7630,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"261": {
					term_id: 7633,
					name: "Wander",
					slug: "wander",
					term_group: 0,
					term_taxonomy_id: 7633,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"262": {
					term_id: 7636,
					name: "Western",
					slug: "western",
					term_group: 0,
					term_taxonomy_id: 7636,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"263": {
					term_id: 7639,
					name: "Wholesome",
					slug: "wholesome",
					term_group: 0,
					term_taxonomy_id: 7639,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				}
			},
			search_term: "",
			msv: 10
		}
	},
	{
		id: 7385,
		description: "",
		name: "Aloha",
		slug: "aloha",
		details: {
			vibes: [
				{
					name: "Happy",
					slug: "happy"
				},
				{
					name: "Welcoming",
					slug: "welcoming"
				}
			],
			msv: null
		}
	},
	{
		id: 5584,
		description: "Open to other possibilities",
		name: "Alternative",
		slug: "alternative",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Indie",
					slug: "indie"
				},
				{
					name: "Rebel",
					slug: "rebel"
				},
				{
					name: "Boho",
					slug: "boho"
				}
			],
			search_term: "",
			msv: 100
		}
	},
	{
		id: 5666,
		description: "Unexpected wonder\n",
		name: "Amazing",
		slug: "amazing",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Cool",
					slug: "cool"
				}
			],
			search_term: "",
			msv: 400
		}
	},
	{
		id: 7684,
		description: "",
		name: "Americana",
		slug: "americana",
		details: {
			vibes: [
				{
					name: "Traditional",
					slug: "traditional"
				},
				{
					name: "Classic",
					slug: "classic"
				},
				{
					name: "Kitschy",
					slug: "kitschy"
				},
				{
					name: "Retro",
					slug: "retro"
				},
				{
					name: "Nostalgic",
					slug: "nostalgic"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 6753,
		description: "Throw it back to the old school ways",
		name: "Analog",
		slug: "analog",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Handmade",
					slug: "handmade"
				},
				{
					name: "Retro",
					slug: "retro"
				},
				{
					name: "Throwback",
					slug: "throwback"
				},
				{
					name: "Deep Cut",
					slug: "deepcut"
				}
			],
			search_term: "",
			msv: 40
		}
	},
	{
		id: 7388,
		description: "",
		name: "Angelic",
		slug: "angelic",
		details: {
			vibes: [
				{
					name: "Sweet",
					slug: "sweet"
				},
				{
					name: "Blissful",
					slug: "blissful"
				}
			],
			msv: null
		}
	},
	{
		id: 6664,
		description: "",
		name: "Animals",
		slug: "animals",
		details: {
			categories: [
				{
					term_id: 6340,
					name: "Outdoors",
					slug: "outdoors",
					term_group: 0,
					term_taxonomy_id: 6340,
					taxonomy: "activity",
					description: "",
					parent: 6295,
					count: 12,
					filter: "raw"
				}
			],
			vibeset: false,
			vibes: [
				{
					name: "Cute",
					slug: "cute"
				}
			],
			search_term: "",
			msv: 40
		}
	},
	{
		id: 5632,
		description: "Nostalgic collectables",
		name: "Antique",
		slug: "antique",
		details: {
			categories: [
				{
					term_id: 6304,
					name: "Shopping",
					slug: "shopping",
					term_group: 0,
					term_taxonomy_id: 6304,
					taxonomy: "activity",
					description: "",
					parent: 6295,
					count: 12,
					filter: "raw"
				}
			],
			vibeset: false,
			vibes: [
				{
					name: "Vintage",
					slug: "vintage"
				},
				{
					name: "Old School",
					slug: "oldschool"
				},
				{
					name: "collectable",
					slug: "collectable"
				},
				{
					name: "cottage",
					slug: "cottage"
				},
				{
					name: "Nostalgic",
					slug: "nostalgic"
				}
			],
			search_term: "",
			msv: 390
		}
	},
	{
		id: 4111,
		description: "Under the sea",
		name: "Aquatic",
		slug: "aquatic",
		details: {
			categories: [
				{
					term_id: 6340,
					name: "Outdoors",
					slug: "outdoors",
					term_group: 0,
					term_taxonomy_id: 6340,
					taxonomy: "activity",
					description: "",
					parent: 6295,
					count: 12,
					filter: "raw"
				}
			],
			vibeset: false,
			vibes: [
				{
					name: "Colorful",
					slug: "colorful"
				},
				{
					name: "Adventurous",
					slug: "adventurous"
				},
				{
					name: "Nautical",
					slug: "nautical"
				},
				{
					name: "Mermaid",
					slug: "mermaid"
				}
			],
			search_term: "",
			msv: 40
		}
	},
	{
		id: 7391,
		description: "",
		name: "Arctic",
		slug: "arctic",
		details: {
			vibes: [
				{
					name: "Cold",
					slug: "cold"
				},
				{
					name: "Wintry",
					slug: "wintry"
				},
				{
					name: "Snowy",
					slug: "snowy"
				},
				{
					name: "Frosty",
					slug: "frosty"
				}
			],
			msv: null
		}
	},
	{
		id: 3008,
		description: "Human creativity",
		name: "Art",
		slug: "art",
		details: {
			categories: [
				{
					term_id: 6291,
					name: "Art",
					slug: "art",
					term_group: 0,
					term_taxonomy_id: 6291,
					taxonomy: "activity",
					description: "",
					parent: 6295,
					count: 7,
					filter: "raw"
				}
			],
			vibeset: false,
			vibes: [
				{
					name: "Creative",
					slug: "creative"
				},
				{
					name: "Artsy",
					slug: "artsy"
				},
				{
					name: "Street Art",
					slug: "street-art"
				},
				{
					name: "Interactive",
					slug: "interactive"
				}
			],
			search_term: "",
			msv: 100
		}
	},
	{
		id: 7394,
		description: "",
		name: "Art-Deco",
		slug: "art-deco",
		details: {
			vibes: [
				{
					name: "Retro",
					slug: "retro"
				},
				{
					name: "Aesthetic",
					slug: "aesthetic"
				}
			],
			msv: null
		}
	},
	{
		id: 6786,
		description: "Handmade and traditional crafts",
		name: "Artisanal",
		slug: "artisanal",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Craft",
					slug: "craft"
				},
				{
					name: "Handmade",
					slug: "handmade"
				}
			],
			search_term: "",
			msv: 20
		}
	},
	{
		id: 3021,
		description: "Surrounded and made from art",
		name: "Artsy",
		slug: "artsy",
		details: {
			categories: [
				{
					term_id: 6291,
					name: "Art",
					slug: "art",
					term_group: 0,
					term_taxonomy_id: 6291,
					taxonomy: "activity",
					description: "",
					parent: 6295,
					count: 7,
					filter: "raw"
				}
			],
			vibeset: false,
			vibes: [
				{
					name: "Creative",
					slug: "creative"
				},
				{
					name: "Interactive",
					slug: "interactive"
				},
				{
					name: "Aesthetic",
					slug: "aesthetic"
				}
			],
			search_term: "",
			msv: 400
		}
	},
	{
		id: 7732,
		description: "",
		name: "Atmosphere",
		slug: "atmosphere",
		details: {
			vibes: [
				{
					name: "Aesthetic",
					slug: "aesthetic"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 6756,
		description: "Original, genuine, and true",
		name: "Authentic",
		slug: "authentic",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Traditional",
					slug: "traditional"
				},
				{
					name: "Handmade",
					slug: "handmade"
				},
				{
					name: "Artsy",
					slug: "artsy"
				},
				{
					name: "Family",
					slug: "family"
				},
				{
					name: "Eclectic",
					slug: "eclectic"
				},
				{
					name: "Unique",
					slug: "unique"
				}
			],
			search_term: "",
			msv: 200
		}
	},
	{
		id: 6798,
		description: "An open understanding",
		name: "Aware",
		slug: "aware",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Open",
					slug: "open"
				}
			],
			search_term: "",
			msv: 20
		}
	},
	{
		id: 7397,
		description: "",
		name: "Badass",
		slug: "badass",
		details: {
			vibes: [
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Adventurous",
					slug: "adventurous"
				},
				{
					name: "Fun",
					slug: "fun"
				}
			],
			msv: null
		}
	},
	{
		id: 7400,
		description: "",
		name: "Bagel",
		slug: "bagel",
		details: [
		]
	},
	{
		id: 3024,
		description: "Pleasing to the senses",
		name: "Beautiful",
		slug: "beautiful",
		details: {
			msv: 400,
			vibes: [
				{
					name: "Dreamy",
					slug: "dreamy"
				},
				{
					name: "Art",
					slug: "art"
				},
				{
					name: "Classy",
					slug: "classy"
				},
				{
					name: "Glam",
					slug: "glam"
				},
				{
					name: "Bright",
					slug: "bright"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 6801,
		description: "A place that invites and feels right",
		name: "Belonging",
		slug: "belonging",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Inclusive",
					slug: "inclusive"
				},
				{
					name: "Friendly",
					slug: "friendly"
				},
				{
					name: "Community",
					slug: "community"
				}
			],
			search_term: "",
			msv: 10
		}
	},
	{
		id: 6804,
		description: "Of great size or intensity",
		name: "Big",
		slug: "big",
		details: {
			categories: false,
			vibeset: false,
			vibes: false,
			search_term: "",
			msv: 10
		}
	},
	{
		id: 6759,
		description: "Human-powered movement",
		name: "Biking",
		slug: "biking",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Active",
					slug: "active"
				},
				{
					name: "Urban",
					slug: "urban"
				},
				{
					name: "Healthy",
					slug: "healthy"
				},
				{
					name: "Fun",
					slug: "fun"
				}
			],
			search_term: "",
			msv: 700
		}
	},
	{
		id: 7403,
		description: "",
		name: "Blessed",
		slug: "blessed",
		details: [
		]
	},
	{
		id: 6807,
		description: "Complete joy",
		name: "Blissful",
		slug: "blissful",
		details: {
			categories: false,
			vibeset: false,
			vibes: false,
			search_term: "",
			msv: 10
		}
	},
	{
		id: 6762,
		description: "Lacking the need to confirm to society",
		name: "Boho",
		slug: "boho",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Hipster",
					slug: "hipster"
				},
				{
					name: "Hippie",
					slug: "hippie"
				},
				{
					name: "Alternative",
					slug: "alternative"
				},
				{
					name: "Cool",
					slug: "cool"
				},
				{
					name: "Eclectic",
					slug: "eclectic"
				}
			],
			search_term: "",
			msv: 90
		}
	},
	{
		id: 6765,
		description: "Strong and vivid",
		name: "Bold",
		slug: "bold",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Vibrant",
					slug: "vibrant"
				},
				{
					name: "Courageous",
					slug: "courageous"
				}
			],
			search_term: "",
			msv: 90
		}
	},
	{
		id: 4563,
		description: "Enjoyment of stories and learning",
		name: "Bookish",
		slug: "bookish",
		details: {
			vibes: [
				{
					name: "Nerdy",
					slug: "nerdy"
				},
				{
					name: "Academic",
					slug: "academic"
				},
				{
					name: "Literary",
					slug: "literary"
				}
			],
			msv: null
		}
	},
	{
		id: 5053,
		description: "Intoxicating experiences",
		name: "Boozy",
		slug: "boozy",
		details: {
			vibes: [
				{
					name: "Hangover",
					slug: "hangover"
				},
				{
					name: "Drinks",
					slug: "drinks"
				},
				{
					name: "Party",
					slug: "party"
				},
				{
					name: "After Party",
					slug: "after-party"
				},
				{
					name: "Social",
					slug: "social-2"
				},
				{
					name: "Social",
					slug: "social"
				},
				{
					name: "Buzzing",
					slug: "buzzing"
				}
			],
			msv: null
		}
	},
	{
		id: 1953,
		description: "Natural green and goodness",
		name: "Botanical",
		slug: "botanical",
		details: {
			msv: 110,
			vibes: [
				{
					name: "Outdoors",
					slug: "outdoors"
				},
				{
					name: "Beautiful",
					slug: "beautiful"
				},
				{
					name: "Fresh",
					slug: "fresh"
				},
				{
					name: "Natural",
					slug: "natural"
				},
				{
					name: "Plant",
					slug: "plant"
				},
				{
					name: "Floral",
					slug: "floral"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7406,
		description: "",
		name: "Boujee",
		slug: "boujee",
		details: {
			vibes: [
				{
					name: "Fancy",
					slug: "fancy"
				},
				{
					name: "Upscale",
					slug: "upscale"
				}
			],
			msv: null
		}
	},
	{
		id: 5635,
		description: "",
		name: "Boutique",
		slug: "boutique",
		details: {
			msv: 200,
			vibes: [
				{
					name: "Artsy",
					slug: "artsy"
				},
				{
					name: "Beautiful",
					slug: "beautiful"
				}
			]
		}
	},
	{
		id: 7409,
		description: "",
		name: "Breezy",
		slug: "breezy",
		details: {
			vibes: [
				{
					name: "Airy",
					slug: "airy"
				}
			],
			msv: null
		}
	},
	{
		id: 7651,
		description: "",
		name: "Bright",
		slug: "bright",
		details: {
			vibes: [
				{
					name: "Colorful",
					slug: "colorful"
				},
				{
					name: "Vibrant",
					slug: "vibrant"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 5542,
		description: "Bubbly late breakfast with friends",
		name: "Brunch",
		slug: "brunch",
		details: {
			msv: 8000,
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
					name: "Sunny",
					slug: "sunny"
				},
				{
					name: "Afternoon",
					slug: "afternoon"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 6810,
		description: "Full of activity",
		name: "Busy",
		slug: "busy",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Buzzing",
					slug: "buzzing"
				}
			],
			search_term: "",
			msv: 10
		}
	},
	{
		id: 1100,
		description: "Humming feelings or sounds",
		name: "Buzzing",
		slug: "buzzing",
		details: {
			vibes: [
				{
					name: "Energetic",
					slug: "energetic"
				},
				{
					name: "Lively",
					slug: "lively"
				},
				{
					name: "Poppin'",
					slug: "popping"
				},
				{
					name: "Popular",
					slug: "popular"
				},
				{
					name: "Trending",
					slug: "trending"
				}
			],
			categories: false,
			search_term: "",
			msv: 20,
			vibeset: false
		}
	},
	{
		id: 7412,
		description: "",
		name: "California",
		slug: "california",
		details: [
		]
	},
	{
		id: 6813,
		description: "Undisturbed and unshakable",
		name: "Calm",
		slug: "calm-2",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Peaceful",
					slug: "peaceful"
				},
				{
					name: "Chill",
					slug: "chill"
				}
			],
			search_term: "",
			msv: 170
		}
	},
	{
		id: 6816,
		description: "Into the wild",
		name: "Camp",
		slug: "camp",
		details: {
			categories: [
				{
					term_id: 6340,
					name: "Outdoors",
					slug: "outdoors",
					term_group: 0,
					term_taxonomy_id: 6340,
					taxonomy: "activity",
					description: "",
					parent: 6295,
					count: 12,
					filter: "raw"
				}
			],
			vibeset: false,
			vibes: [
				{
					name: "Outdoorsy",
					slug: "outdoorsy"
				},
				{
					name: "Rugged",
					slug: "rugged"
				},
				{
					name: "Adventurous",
					slug: "adventurous"
				},
				{
					name: "Chill",
					slug: "chill"
				}
			],
			search_term: "",
			msv: 300
		}
	},
	{
		id: 6819,
		description: "Exaggerated and amusing humor",
		name: "Campy",
		slug: "campy",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Funny",
					slug: "funny"
				},
				{
					name: "Fun",
					slug: "fun"
				},
				{
					name: "Weird",
					slug: "weird"
				},
				{
					name: "Original",
					slug: "original"
				}
			],
			search_term: "",
			msv: 10
		}
	},
	{
		id: 6825,
		description: "",
		name: "Candlelit",
		slug: "candlelit",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Date Spot",
					slug: "datespot"
				},
				{
					name: "Romantic",
					slug: "romantic"
				},
				{
					name: "Dark",
					slug: "dark"
				},
				{
					name: "Moody",
					slug: "moody"
				},
				{
					name: "Intimate",
					slug: "intimate"
				}
			],
			search_term: "",
			msv: 10
		}
	},
	{
		id: 6822,
		description: "",
		name: "Cannabis",
		slug: "cannabis",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Healthy",
					slug: "healthy"
				}
			],
			search_term: "",
			msv: 10
		}
	},
	{
		id: 6828,
		description: "No worries",
		name: "Carefree",
		slug: "carefree",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Relaxing",
					slug: "relaxing"
				},
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Calm",
					slug: "calm-2"
				},
				{
					name: "Casual",
					slug: "casual"
				},
				{
					name: "Playful",
					slug: "playful"
				}
			],
			search_term: "",
			msv: 10
		}
	},
	{
		id: 7415,
		description: "",
		name: "Caribbean",
		slug: "caribbean",
		details: [
		]
	},
	{
		id: 6834,
		description: "Relaxed and easy",
		name: "Casual",
		slug: "casual",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Carefree",
					slug: "carefree"
				},
				{
					name: "Comfy",
					slug: "comfy"
				},
				{
					name: "Laid-back",
					slug: "laidback"
				},
				{
					name: "Relaxing",
					slug: "relaxing"
				}
			],
			search_term: "",
			msv: 200
		}
	},
	{
		id: 7669,
		description: "",
		name: "Cat",
		slug: "cat",
		details: {
			vibes: false,
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 6399,
		description: "Enjoying something special",
		name: "Celebratory",
		slug: "celebratory",
		details: {
			vibes: [
				{
					name: "Festive",
					slug: "festive"
				},
				{
					name: "Fun",
					slug: "fun"
				},
				{
					name: "Lively",
					slug: "lively"
				},
				{
					name: "Special",
					slug: "special"
				},
				{
					name: "Family",
					slug: "family"
				},
				{
					name: "Friendly",
					slug: "friendly"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7672,
		description: "",
		name: "Celebrity",
		slug: "celebrity",
		details: {
			vibes: [
				{
					name: "Upscale",
					slug: "upscale"
				},
				{
					name: "Fancy",
					slug: "fancy"
				},
				{
					name: "Popular",
					slug: "popular"
				},
				{
					name: "Exclusive",
					slug: "exclusive"
				},
				{
					name: "Trendy",
					slug: "trendy"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 5646,
		description: "Almost free",
		name: "Cheap",
		slug: "cheap",
		details: {
			msv: 2000,
			vibes: [
				{
					name: "Affordable",
					slug: "affordable"
				},
				{
					name: "Casual",
					slug: "casual"
				},
				{
					name: "Inclusive",
					slug: "inclusive"
				},
				{
					name: "Free",
					slug: "free"
				},
				{
					name: "Carefree",
					slug: "carefree"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 6837,
		description: "",
		name: "Chic",
		slug: "chic",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Upscale",
					slug: "upscale"
				},
				{
					name: "Inclusive",
					slug: "inclusive"
				},
				{
					name: "Fashion",
					slug: "fashion"
				},
				{
					name: "Elegant",
					slug: "elegant"
				},
				{
					name: "Stylish",
					slug: "stylish"
				}
			],
			search_term: "",
			msv: 260
		}
	},
	{
		id: 6840,
		description: "Young and innocent",
		name: "Children",
		slug: "children",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Young",
					slug: "young"
				},
				{
					name: "Kidcore",
					slug: "kidcore"
				},
				{
					name: "Family",
					slug: "family"
				}
			],
			search_term: "",
			msv: 10
		}
	},
	{
		id: 1060,
		description: "Relaxed in a way you want to be around",
		name: "Chill",
		slug: "chill",
		details: {
			msv: 600,
			vibes: [
				{
					name: "Casual",
					slug: "casual"
				},
				{
					name: "Soothing",
					slug: "soothing"
				},
				{
					name: "Blissful",
					slug: "blissful"
				},
				{
					name: "Laid-back",
					slug: "laidback"
				},
				{
					name: "Relaxing",
					slug: "relaxing"
				},
				{
					name: "Comfy",
					slug: "comfy"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 6843,
		description: "",
		name: "Christmas",
		slug: "christmas",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Festive",
					slug: "festive"
				},
				{
					name: "Celebratory",
					slug: "celebratory"
				},
				{
					name: "Snowy",
					slug: "snowy"
				},
				{
					name: "Wintry",
					slug: "wintry"
				},
				{
					name: "Yuletide",
					slug: "yuletide"
				},
				{
					name: "Frosty",
					slug: "frosty"
				}
			],
			search_term: "",
			msv: 40
		}
	},
	{
		id: 6849,
		description: "Dramatic and moving",
		name: "Cinematic",
		slug: "cinematic",
		details: {
			vibes: [
				{
					name: "Dramatic",
					slug: "dramatic"
				}
			],
			msv: null
		}
	},
	{
		id: 3673,
		description: "",
		name: "City Life",
		slug: "city-life",
		details: [
		]
	},
	{
		id: 4535,
		description: "Being a part of the city",
		name: "Civic",
		slug: "civic",
		details: {
			categories: false,
			vibeset: false,
			vibes: [
				{
					name: "Community",
					slug: "community"
				},
				{
					name: "In-solidarity",
					slug: "solidarity"
				},
				{
					name: "Activist",
					slug: "activist"
				},
				{
					name: "Local",
					slug: "local"
				},
				{
					name: "Positive",
					slug: "positive"
				},
				{
					name: "Cultural",
					slug: "cultural"
				},
				{
					name: "Volunteer",
					slug: "volunteer"
				},
				{
					name: "Vibrant",
					slug: "vibrant"
				}
			],
			search_term: "",
			msv: 40
		}
	},
	{
		id: 5575,
		description: "Outstanding over time",
		name: "Classic",
		slug: "classic",
		details: {
			msv: 5000,
			vibes: [
				{
					name: "Amazing",
					slug: "amazing"
				},
				{
					name: "Traditional",
					slug: "traditional"
				},
				{
					name: "Retro",
					slug: "retro"
				},
				{
					name: "Old School",
					slug: "oldschool"
				},
				{
					name: "Popular",
					slug: "popular"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 6867,
		description: "",
		name: "Classy",
		slug: "classy",
		details: {
			msv: 30,
			vibes: [
				{
					name: "Fancy",
					slug: "fancy"
				}
			]
		}
	},
	{
		id: 7750,
		description: "",
		name: "Clubhouse",
		slug: "clubhouse",
		details: {
			vibes: [
				{
					name: "Exclusive",
					slug: "exclusive"
				},
				{
					name: "Fun",
					slug: "fun"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 6870,
		description: "",
		name: "Coastal",
		slug: "coastal",
		details: {
			msv: 200,
			vibes: [
				{
					name: "Breezy",
					slug: "breezy"
				},
				{
					name: "Aquatic",
					slug: "aquatic"
				},
				{
					name: "Nautical",
					slug: "nautical"
				}
			]
		}
	},
	{
		id: 6873,
		description: "",
		name: "Cold",
		slug: "cold",
		details: {
			msv: 90,
			vibes: [
				{
					name: "Snowy",
					slug: "snowy"
				},
				{
					name: "Wintry",
					slug: "wintry"
				},
				{
					name: "Frosty",
					slug: "frosty"
				}
			]
		}
	},
	{
		id: 7759,
		description: "",
		name: "Collaborative",
		slug: "collaborative",
		details: {
			vibes: [
				{
					name: "Togetherness",
					slug: "together"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 6726,
		description: "",
		name: "collectable",
		slug: "collectable",
		details: [
		]
	},
	{
		id: 1103,
		description: "Lively, expressive, and bright",
		name: "Colorful",
		slug: "colorful",
		details: {
			msv: 100,
			vibes: [
				{
					name: "Bright",
					slug: "bright"
				},
				{
					name: "Vibrant",
					slug: "vibrant"
				},
				{
					name: "Bold",
					slug: "bold"
				},
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Neon",
					slug: "neon"
				},
				{
					name: "Mermaid",
					slug: "mermaid"
				}
			]
		}
	},
	{
		id: 7717,
		description: "",
		name: "Comforting",
		slug: "comforting",
		details: {
			vibes: [
				{
					name: "Relaxing",
					slug: "relaxing"
				},
				{
					name: "Peaceful",
					slug: "peaceful"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 6876,
		description: "",
		name: "Comfy",
		slug: "comfy",
		details: {
			msv: 40,
			vibes: [
				{
					name: "Cozy",
					slug: "cozy"
				},
				{
					name: "Comforting",
					slug: "comforting"
				}
			]
		}
	},
	{
		id: 2464,
		description: "Your people",
		name: "Community",
		slug: "community",
		details: {
			msv: 120,
			vibes: [
				{
					name: "Local",
					slug: "local"
				},
				{
					name: "Civic",
					slug: "civic"
				},
				{
					name: "Friendly",
					slug: "friendly"
				},
				{
					name: "Social",
					slug: "social"
				},
				{
					name: "Cultural",
					slug: "cultural"
				},
				{
					name: "In-solidarity",
					slug: "solidarity"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 6879,
		description: "",
		name: "Conversational",
		slug: "conversational",
		details: [
		]
	},
	{
		id: 6738,
		description: "",
		name: "Cool",
		slug: "cool",
		details: [
		]
	},
	{
		id: 6858,
		description: "",
		name: "Costume",
		slug: "costume",
		details: {
			vibes: [
				{
					name: "Dress-up",
					slug: "dress-up"
				}
			],
			msv: null
		}
	},
	{
		id: 6729,
		description: "",
		name: "cottage",
		slug: "cottage",
		details: [
		]
	},
	{
		id: 6852,
		description: "Calm, collected, and always in style",
		name: "Cottagecore",
		slug: "cottagecore",
		details: {
			msv: 90,
			vibes: [
				{
					name: "Nostalgic",
					slug: "nostalgic"
				},
				{
					name: "Traditional",
					slug: "traditional"
				},
				{
					name: "Simple",
					slug: "simple"
				},
				{
					name: "Natural",
					slug: "natural"
				},
				{
					name: "Old School",
					slug: "oldschool"
				}
			]
		}
	},
	{
		id: 7675,
		description: "",
		name: "Country Club",
		slug: "country-club",
		details: {
			vibes: [
				{
					name: "Upscale",
					slug: "upscale"
				},
				{
					name: "Fancy",
					slug: "fancy"
				},
				{
					name: "Exclusive",
					slug: "exclusive"
				},
				{
					name: "Traditional",
					slug: "traditional"
				},
				{
					name: "Classic",
					slug: "classic"
				},
				{
					name: "Old School",
					slug: "oldschool"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7690,
		description: "",
		name: "Couple",
		slug: "couple",
		details: {
			vibes: [
				{
					name: "Date Spot",
					slug: "datespot"
				},
				{
					name: "Romantic",
					slug: "romantic"
				},
				{
					name: "Love",
					slug: "love"
				},
				{
					name: "Intimate",
					slug: "intimate"
				},
				{
					name: "Togetherness",
					slug: "together"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 6855,
		description: "",
		name: "Courageous",
		slug: "courageous",
		details: {
			msv: 50,
			vibes: [
				{
					name: "Bold",
					slug: "bold"
				},
				{
					name: "Proud",
					slug: "proud"
				}
			]
		}
	},
	{
		id: 5039,
		description: "Warm, snug, and loved",
		name: "Cozy",
		slug: "cozy",
		details: {
			msv: 200,
			vibes: [
				{
					name: "Warm",
					slug: "warm"
				},
				{
					name: "Comfy",
					slug: "comfy"
				},
				{
					name: "Intimate",
					slug: "intimate"
				},
				{
					name: "Comforting",
					slug: "comforting"
				}
			]
		}
	},
	{
		id: 6783,
		description: "Made with care and skill",
		name: "Craft",
		slug: "craft",
		details: {
			msv: 320,
			vibes: [
				{
					name: "Design",
					slug: "design"
				},
				{
					name: "Handmade",
					slug: "handmade"
				},
				{
					name: "Artisanal",
					slug: "artisanal"
				},
				{
					name: "Artsy",
					slug: "artsy"
				}
			]
		}
	},
	{
		id: 6861,
		description: "",
		name: "Crazy",
		slug: "crazy",
		details: {
			msv: 60,
			vibes: [
				{
					name: "Absurd",
					slug: "absurd"
				}
			]
		}
	},
	{
		id: 1948,
		description: "",
		name: "Creative",
		slug: "creative",
		details: {
			msv: 200,
			vibes: [
				{
					name: "Artsy",
					slug: "artsy"
				},
				{
					name: "Rebel",
					slug: "rebel"
				},
				{
					name: "Aware",
					slug: "aware"
				},
				{
					name: "Inspired",
					slug: "inspired"
				},
				{
					name: "Design",
					slug: "design"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 6864,
		description: "",
		name: "Crisp",
		slug: "crisp",
		details: {
			msv: 20,
			vibes: [
				{
					name: "Fresh",
					slug: "fresh"
				}
			]
		}
	},
	{
		id: 6882,
		description: "",
		name: "Crowded",
		slug: "crowded",
		details: {
			vibes: [
				{
					name: "Busy",
					slug: "busy"
				},
				{
					name: "Buzzing",
					slug: "buzzing"
				}
			],
			msv: null
		}
	},
	{
		id: 6885,
		description: "",
		name: "Crunchy",
		slug: "crunchy",
		details: [
		]
	},
	{
		id: 3005,
		description: "Ideas and identities",
		name: "Cultural",
		slug: "cultural",
		details: {
			msv: 90,
			vibes: [
				{
					name: "Diverse",
					slug: "diverse"
				},
				{
					name: "Local",
					slug: "local"
				},
				{
					name: "Community",
					slug: "community"
				},
				{
					name: "Proud",
					slug: "proud"
				},
				{
					name: "Authentic",
					slug: "authentic"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 5567,
		description: "Eager to learn and explore",
		name: "Curious",
		slug: "curious",
		details: {
			vibes: [
				{
					name: "Eclectic",
					slug: "eclectic"
				},
				{
					name: "Interesting",
					slug: "interesting"
				},
				{
					name: "Entertaining",
					slug: "entertaining"
				},
				{
					name: "Aware",
					slug: "aware"
				},
				{
					name: "Playful",
					slug: "playful"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 6735,
		description: "Endearing and youthful",
		name: "Cute",
		slug: "cute",
		details: {
			msv: 210
		}
	},
	{
		id: 6888,
		description: "",
		name: "Cutty",
		slug: "cutty",
		details: {
			vibes: [
				{
					name: "Street Art",
					slug: "street-art"
				},
				{
					name: "Hidden Gem",
					slug: "hidden-gem"
				},
				{
					name: "Deep Cut",
					slug: "deepcut"
				}
			],
			msv: null
		}
	},
	{
		id: 5572,
		description: "Shakin' &amp; swayin",
		name: "Dance",
		slug: "dance",
		details: {
			msv: 600,
			vibes: [
				{
					name: "Shimmy",
					slug: "shimmy"
				},
				{
					name: "Musical",
					slug: "musical"
				},
				{
					name: "Poppin'",
					slug: "popping"
				},
				{
					name: "Lit",
					slug: "lit"
				},
				{
					name: "Jazzy",
					slug: "jazzy"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7678,
		description: "",
		name: "Deluxe",
		slug: "deluxe",
		details: {
			vibes: [
				{
					name: "Fancy",
					slug: "fancy"
				},
				{
					name: "Upscale",
					slug: "upscale"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 6909,
		description: "",
		name: "Design",
		slug: "design",
		details: {
			msv: 110,
			vibes: [
				{
					name: "Creative",
					slug: "creative"
				}
			]
		}
	},
	{
		id: 3670,
		description: "",
		name: "Discover",
		slug: "discover",
		details: [
		]
	},
	{
		id: 6912,
		description: "",
		name: "Dive",
		slug: "dive",
		details: {
			msv: 80
		}
	},
	{
		id: 1824,
		description: "A variety of it all",
		name: "Diverse",
		slug: "diverse",
		details: {
			msv: 160,
			vibes: [
				{
					name: "Multicultural",
					slug: "multicultural"
				},
				{
					name: "Inclusive",
					slug: "inclusive"
				},
				{
					name: "Community",
					slug: "community"
				},
				{
					name: "Local",
					slug: "local"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7418,
		description: "Do-It-Yourself",
		name: "DIY",
		slug: "diy",
		details: {
			msv: 100,
			vibes: [
				{
					name: "Craft",
					slug: "craft"
				},
				{
					name: "Homemade",
					slug: "homemade"
				},
				{
					name: "Artsy",
					slug: "artsy"
				},
				{
					name: "Creative",
					slug: "creative"
				},
				{
					name: "Eco",
					slug: "eco"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7421,
		description: "Anything good",
		name: "Dope",
		slug: "dope",
		details: [
		]
	},
	{
		id: 7424,
		description: "",
		name: "Dramatic",
		slug: "dramatic",
		details: [
		]
	},
	{
		id: 1106,
		description: "Magical or otherworldly",
		name: "Dreamy",
		slug: "dreamy",
		details: {
			vibes: [
				{
					name: "Creative",
					slug: "creative"
				},
				{
					name: "Artsy",
					slug: "artsy"
				},
				{
					name: "Inspired",
					slug: "inspired"
				},
				{
					name: "Curious",
					slug: "curious"
				},
				{
					name: "Colorful",
					slug: "colorful"
				}
			],
			categories: false,
			search_term: "",
			msv: 30,
			vibeset: false
		}
	},
	{
		id: 7427,
		description: "",
		name: "Dress-up",
		slug: "dress-up",
		details: [
		]
	},
	{
		id: 6915,
		description: "Tasty beverages with friends",
		name: "Drinking",
		slug: "drinking",
		details: {
			msv: 200,
			vibes: [
				{
					name: "Boozy",
					slug: "boozy"
				},
				{
					name: "Party",
					slug: "party"
				},
				{
					name: "Lively",
					slug: "lively"
				},
				{
					name: "Fun",
					slug: "fun"
				},
				{
					name: "Social",
					slug: "social"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7430,
		description: "",
		name: "Drinks",
		slug: "drinks",
		details: {
			msv: 20
		}
	},
	{
		id: 6918,
		description: "All the swagger",
		name: "Drip",
		slug: "drip",
		details: {
			vibes: [
				{
					name: "Luxe",
					slug: "luxe"
				},
				{
					name: "Glam",
					slug: "glam"
				},
				{
					name: "Popular",
					slug: "popular"
				},
				{
					name: "Trendy",
					slug: "trendy"
				},
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Lit",
					slug: "lit"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 6546,
		description: "Constantly changing and evolving",
		name: "Dynamic",
		slug: "dynamic",
		details: {
			msv: 20,
			vibes: [
				{
					name: "Cool",
					slug: "cool"
				},
				{
					name: "Popular",
					slug: "popular"
				},
				{
					name: "Unexpected",
					slug: "unexpected"
				},
				{
					name: "Unique",
					slug: "unique"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 6921,
		description: "",
		name: "Earthy",
		slug: "earthy",
		details: {
			vibes: [
				{
					name: "Sustainable",
					slug: "sustainable"
				},
				{
					name: "Organic",
					slug: "organic"
				},
				{
					name: "Green",
					slug: "green"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7433,
		description: "",
		name: "Eccentric",
		slug: "eccentric",
		details: [
		]
	},
	{
		id: 2034,
		description: "Diverse styles and tastes",
		name: "Eclectic",
		slug: "eclectic",
		details: {
			vibes: [
				{
					name: "Quirky",
					slug: "quirky"
				},
				{
					name: "Funky",
					slug: "funky"
				},
				{
					name: "Whimsical",
					slug: "whimsical"
				},
				{
					name: "Indie",
					slug: "indie"
				},
				{
					name: "Curious",
					slug: "curious"
				},
				{
					name: "Interesting",
					slug: "interesting"
				},
				{
					name: "Delightful",
					slug: "delightful"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7436,
		description: "From earth and good for earth",
		name: "Eco",
		slug: "eco",
		details: {
			msv: 60,
			vibes: [
				{
					name: "Sustainable",
					slug: "sustainable"
				},
				{
					name: "Recyled",
					slug: "recyled"
				},
				{
					name: "Earthy",
					slug: "earthy"
				},
				{
					name: "Thrift",
					slug: "thrift"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7439,
		description: "",
		name: "Educational",
		slug: "educational",
		details: [
		]
	},
	{
		id: 7442,
		description: "",
		name: "Eerie",
		slug: "eerie",
		details: [
		]
	},
	{
		id: 6924,
		description: "Refined style and taste",
		name: "Elegant",
		slug: "elegant",
		details: {
			msv: 20,
			vibes: [
				{
					name: "Beautiful",
					slug: "beautiful"
				},
				{
					name: "Exclusive",
					slug: "exclusive"
				},
				{
					name: "Elevated",
					slug: "elevated"
				},
				{
					name: "Classic",
					slug: "classic"
				},
				{
					name: "Glam",
					slug: "glam"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 6927,
		description: "Positivity and respect",
		name: "Elevated",
		slug: "elevated",
		details: {
			msv: 400
		}
	},
	{
		id: 7445,
		description: "",
		name: "Emo",
		slug: "emo",
		details: [
		]
	},
	{
		id: 7448,
		description: "All the feelings",
		name: "Emotional",
		slug: "emotional",
		details: [
		]
	},
	{
		id: 7451,
		description: "",
		name: "Enchanted",
		slug: "enchanted",
		details: [
		]
	},
	{
		id: 6930,
		description: "Full of vitality and possibility",
		name: "Energetic",
		slug: "energetic",
		details: {
			msv: 100,
			vibes: [
				{
					name: "Lively",
					slug: "lively"
				},
				{
					name: "Vibrant",
					slug: "vibrant"
				},
				{
					name: "Wild",
					slug: "wild"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7454,
		description: "",
		name: "Entertaining",
		slug: "entertaining",
		details: [
		]
	},
	{
		id: 7457,
		description: "",
		name: "Enthusiastic",
		slug: "enthusiastic",
		details: [
		]
	},
	{
		id: 7460,
		description: "",
		name: "Entrepreneurial",
		slug: "entrepreneurial",
		details: [
		]
	},
	{
		id: 7463,
		description: "",
		name: "Euro",
		slug: "euro",
		details: [
		]
	},
	{
		id: 7466,
		description: "",
		name: "Evergreen",
		slug: "evergreen",
		details: [
		]
	},
	{
		id: 6933,
		description: "Beyond stoked",
		name: "Exciting",
		slug: "exciting",
		details: {
			msv: 400,
			vibes: [
				{
					name: "Fun",
					slug: "fun"
				},
				{
					name: "Lively",
					slug: "lively"
				},
				{
					name: "Adventurous",
					slug: "adventurous"
				},
				{
					name: "Buzzing",
					slug: "buzzing"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7469,
		description: "",
		name: "Exclusive",
		slug: "exclusive",
		details: [
		]
	},
	{
		id: 7472,
		description: "",
		name: "Experiential",
		slug: "experiential",
		details: [
		]
	},
	{
		id: 7475,
		description: "",
		name: "Experimental",
		slug: "experimental",
		details: [
		]
	},
	{
		id: 6938,
		description: "Take a new path",
		name: "Explore",
		slug: "explore",
		details: {
			msv: 200
		}
	},
	{
		id: 7663,
		description: "",
		name: "Fairytale",
		slug: "fairytale",
		details: {
			vibes: [
				{
					name: "Magical",
					slug: "magical"
				},
				{
					name: "Fantastic",
					slug: "fantastic"
				},
				{
					name: "Dreamy",
					slug: "dreamy"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 1109,
		description: "Together with those you love",
		name: "Family",
		slug: "family",
		details: {
			msv: 1000,
			vibes: [
				{
					name: "Togetherness",
					slug: "together"
				},
				{
					name: "Love",
					slug: "love"
				},
				{
					name: "Social",
					slug: "social"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7478,
		description: "",
		name: "Fancy",
		slug: "fancy",
		details: {
			vibes: [
				{
					name: "Upscale",
					slug: "upscale"
				},
				{
					name: "Exclusive",
					slug: "exclusive"
				}
			],
			msv: null
		}
	},
	{
		id: 7481,
		description: "",
		name: "Fantastic",
		slug: "fantastic",
		details: [
		]
	},
	{
		id: 7484,
		description: "",
		name: "Farout",
		slug: "farout",
		details: [
		]
	},
	{
		id: 7487,
		description: "",
		name: "Fashion",
		slug: "fashion",
		details: [
		]
	},
	{
		id: 6941,
		description: "All about the glam",
		name: "Fashionista",
		slug: "fashionista",
		details: {
			vibes: [
				{
					name: "Stylish",
					slug: "stylish"
				},
				{
					name: "Treat Yourself",
					slug: "treatyourself"
				},
				{
					name: "Shopaholic",
					slug: "shopaholic"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7490,
		description: "",
		name: "Favorite",
		slug: "favorite",
		details: {
			vibes: [
				{
					name: "Popular",
					slug: "popular"
				},
				{
					name: "Love",
					slug: "love"
				},
				{
					name: "Local",
					slug: "local"
				}
			],
			msv: null
		}
	},
	{
		id: 7493,
		description: "",
		name: "Feminist",
		slug: "feminist",
		details: {
			msv: 40,
			vibes: [
				{
					name: "In-solidarity",
					slug: "solidarity"
				}
			]
		}
	},
	{
		id: 7496,
		description: "",
		name: "Femme",
		slug: "femme",
		details: [
		]
	},
	{
		id: 5684,
		description: "Cheerful and colorful gathering",
		name: "Festive",
		slug: "festive",
		details: {
			vibes: [
				{
					name: "Celebratory",
					slug: "celebratory"
				},
				{
					name: "Fun",
					slug: "fun"
				},
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Lively",
					slug: "lively"
				}
			],
			categories: false,
			search_term: "",
			msv: 40,
			vibeset: false
		}
	},
	{
		id: 7499,
		description: "",
		name: "Fierce",
		slug: "fierce",
		details: [
		]
	},
	{
		id: 7502,
		description: "",
		name: "Film",
		slug: "film",
		details: [
		]
	},
	{
		id: 2116,
		description: "",
		name: "Flavorful",
		slug: "flavorful",
		details: [
		]
	},
	{
		id: 3030,
		description: "",
		name: "Floral",
		slug: "floral",
		details: {
			vibes: [
				{
					name: "Botanical",
					slug: "botanical"
				},
				{
					name: "Fresh",
					slug: "fresh"
				},
				{
					name: "Beautiful",
					slug: "beautiful"
				}
			],
			msv: null
		}
	},
	{
		id: 5593,
		description: "Traditions of everyday people",
		name: "Folk",
		slug: "folk",
		details: {
			msv: 200,
			vibes: [
				{
					name: "Traditional",
					slug: "traditional"
				},
				{
					name: "Nostalgic",
					slug: "nostalgic"
				},
				{
					name: "Old School",
					slug: "oldschool"
				},
				{
					name: "Classic",
					slug: "classic"
				},
				{
					name: "Throwback",
					slug: "throwback"
				}
			],
			categories: [
				{
					term_id: 6291,
					name: "Art",
					slug: "art",
					term_group: 0,
					term_taxonomy_id: 6291,
					taxonomy: "activity",
					description: "",
					parent: 6295,
					count: 7,
					filter: "raw"
				},
				{
					term_id: 6343,
					name: "Music",
					slug: "music",
					term_group: 0,
					term_taxonomy_id: 6343,
					taxonomy: "activity",
					description: "",
					parent: 6295,
					count: 6,
					filter: "raw"
				}
			],
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 5536,
		description: "Food is life",
		name: "Foodie",
		slug: "foodie",
		details: {
			msv: 4000,
			vibes: [
				{
					name: "Nosh",
					slug: "nosh"
				},
				{
					name: "Elevated",
					slug: "elevated"
				},
				{
					name: "Tasty",
					slug: "tasty"
				},
				{
					name: "Hi Fi",
					slug: "hifi"
				}
			]
		}
	},
	{
		id: 5578,
		description: "At no cost",
		name: "Free",
		slug: "free",
		details: {
			msv: 2000,
			vibes: [
				{
					name: "Inclusive",
					slug: "inclusive"
				},
				{
					name: "Open",
					slug: "open"
				},
				{
					name: "Cheap",
					slug: "cheap"
				}
			]
		}
	},
	{
		id: 6780,
		description: "Nice, new, and refreshing",
		name: "Fresh",
		slug: "fresh",
		details: {
			msv: 200
		}
	},
	{
		id: 1166,
		description: "Kind and inviting",
		name: "Friendly",
		slug: "friendly",
		details: {
			msv: 60
		}
	},
	{
		id: 7505,
		description: "",
		name: "Frosty",
		slug: "frosty",
		details: [
		]
	},
	{
		id: 1064,
		description: "Enjoyment and laughter",
		name: "Fun",
		slug: "fun",
		details: {
			msv: 6000,
			vibes: [
				{
					name: "Joyful",
					slug: "joyful"
				},
				{
					name: "Entertaining",
					slug: "entertaining"
				},
				{
					name: "Exciting",
					slug: "exciting"
				},
				{
					name: "Happy",
					slug: "happy"
				}
			]
		}
	},
	{
		id: 5599,
		description: "",
		name: "Funky",
		slug: "funky",
		details: [
		]
	},
	{
		id: 5511,
		description: "Comedic relief",
		name: "Funny",
		slug: "funny",
		details: {
			msv: 1000,
			vibes: [
				{
					name: "Fun",
					slug: "fun"
				},
				{
					name: "Playful",
					slug: "playful"
				},
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Social",
					slug: "social"
				},
				{
					name: "Raunchy",
					slug: "raunchy"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7508,
		description: "",
		name: "Fusion",
		slug: "fusion",
		details: [
		]
	},
	{
		id: 7511,
		description: "",
		name: "Futuristic",
		slug: "futuristic",
		details: [
		]
	},
	{
		id: 7514,
		description: "",
		name: "Games",
		slug: "games",
		details: [
		]
	},
	{
		id: 6944,
		description: "Growth of fruits and flowers",
		name: "Garden",
		slug: "garden",
		details: {
			msv: 1000,
			vibes: [
				{
					name: "Botanical",
					slug: "botanical"
				},
				{
					name: "Floral",
					slug: "floral"
				},
				{
					name: "Green",
					slug: "green"
				}
			]
		}
	},
	{
		id: 5616,
		description: "",
		name: "Gay",
		slug: "gay",
		details: {
			msv: 90,
			vibes: [
				{
					name: "LGBTQ",
					slug: "lgbtq"
				}
			]
		}
	},
	{
		id: 6947,
		description: "Profound Enthusiasm",
		name: "Geeky",
		slug: "geeky",
		details: {
			vibes: [
				{
					name: "Nerdy",
					slug: "nerdy"
				},
				{
					name: "Interesting",
					slug: "interesting"
				},
				{
					name: "Passionate",
					slug: "passionate"
				}
			],
			categories: false,
			search_term: "",
			msv: 60,
			vibeset: false
		}
	},
	{
		id: 6950,
		description: "Abundance of giving",
		name: "Generous",
		slug: "generous",
		details: [
		]
	},
	{
		id: 7517,
		description: "",
		name: "Gentle",
		slug: "gentle",
		details: [
		]
	},
	{
		id: 6953,
		description: "Beautiful beyond compare",
		name: "Glam",
		slug: "glam",
		details: {
			vibes: [
				{
					name: "Beautiful",
					slug: "beautiful"
				},
				{
					name: "Fashion",
					slug: "fashion"
				},
				{
					name: "Fancy",
					slug: "fancy"
				},
				{
					name: "Drip",
					slug: "drip"
				},
				{
					name: "Exclusive",
					slug: "exclusive"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7526,
		description: "",
		name: "Glitter",
		slug: "glitter",
		details: [
		]
	},
	{
		id: 7535,
		description: "",
		name: "Gothic",
		slug: "gothic",
		details: {
			msv: 30
		}
	},
	{
		id: 7520,
		description: "",
		name: "Granola",
		slug: "granola",
		details: [
		]
	},
	{
		id: 7523,
		description: "",
		name: "Grateful",
		slug: "grateful",
		details: [
		]
	},
	{
		id: 7645,
		description: "",
		name: "Green",
		slug: "green",
		details: [
		]
	},
	{
		id: 7529,
		description: "",
		name: "Grimy",
		slug: "grimy",
		details: [
		]
	},
	{
		id: 7532,
		description: "",
		name: "Grunge",
		slug: "grunge",
		details: [
		]
	},
	{
		id: 7538,
		description: "",
		name: "Halloween",
		slug: "halloween",
		details: {
			msv: 50
		}
	},
	{
		id: 1512,
		description: "",
		name: "Handmade",
		slug: "handmade",
		details: {
			msv: 40
		}
	},
	{
		id: 6986,
		description: "",
		name: "Hangover",
		slug: "hangover",
		details: [
		]
	},
	{
		id: 7541,
		description: "",
		name: "Hanukkah",
		slug: "hanukkah",
		details: [
		]
	},
	{
		id: 5596,
		description: "",
		name: "Happy",
		slug: "happy",
		details: {
			msv: 260
		}
	},
	{
		id: 6956,
		description: "Positive balance",
		name: "Harmonious",
		slug: "harmonious",
		details: [
		]
	},
	{
		id: 1782,
		description: "All about what is good for you",
		name: "Healthy",
		slug: "healthy",
		details: {
			msv: 200,
			vibes: [
				{
					name: "Self Care",
					slug: "selfcare"
				},
				{
					name: "Natural",
					slug: "natural"
				},
				{
					name: "Positive",
					slug: "positive"
				},
				{
					name: "Wholesome",
					slug: "wholesome"
				},
				{
					name: "Organic",
					slug: "organic"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7544,
		description: "",
		name: "Hearty",
		slug: "hearty",
		details: [
		]
	},
	{
		id: 7547,
		description: "",
		name: "Helpful",
		slug: "helpful",
		details: {
			vibes: [
				{
					name: "Generous",
					slug: "generous"
				}
			],
			msv: null
		}
	},
	{
		id: 7550,
		description: "",
		name: "Heritage",
		slug: "heritage",
		details: [
		]
	},
	{
		id: 6959,
		description: "All about that high quality",
		name: "Hi Fi",
		slug: "hifi",
		details: {
			msv: 70,
			vibes: [
				{
					name: "Elevated",
					slug: "elevated"
				},
				{
					name: "Upscale",
					slug: "upscale"
				},
				{
					name: "Luxe",
					slug: "luxe"
				},
				{
					name: "Authentic",
					slug: "authentic"
				},
				{
					name: "Fancy",
					slug: "fancy"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 2037,
		description: "Amazing but not widely known",
		name: "Hidden Gem",
		slug: "hidden-gem",
		details: {
			msv: 180,
			vibes: [
				{
					name: "Unique",
					slug: "unique"
				},
				{
					name: "Secret",
					slug: "secret"
				},
				{
					name: "Classic",
					slug: "classic"
				},
				{
					name: "Deep Cut",
					slug: "deepcut"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7552,
		description: "",
		name: "Highbrow",
		slug: "highbrow",
		details: [
		]
	},
	{
		id: 6744,
		description: "Walking around in nature",
		name: "Hiking",
		slug: "hiking",
		details: {
			msv: 1600,
			vibes: [
				{
					name: "Adventurous",
					slug: "adventurous"
				},
				{
					name: "Walk",
					slug: "walk"
				},
				{
					name: "Healthy",
					slug: "healthy"
				},
				{
					name: "Outdoorsy",
					slug: "outdoorsy"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7555,
		description: "",
		name: "Hip",
		slug: "hip",
		details: [
		]
	},
	{
		id: 5587,
		description: "",
		name: "Hip Hop",
		slug: "hip-hop",
		details: {
			msv: 200
		}
	},
	{
		id: 6962,
		description: "Chill out",
		name: "Hippie",
		slug: "hippie",
		details: {
			msv: 90,
			vibes: [
				{
					name: "Natural",
					slug: "natural"
				},
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Radical",
					slug: "radical"
				},
				{
					name: "Rebel",
					slug: "rebel"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 6968,
		description: "",
		name: "Hipster",
		slug: "hipster",
		details: {
			msv: 20
		}
	},
	{
		id: 1073,
		description: "Places of importance",
		name: "Historic",
		slug: "historic",
		details: {
			msv: 800,
			vibes: [
				{
					name: "Old",
					slug: "old"
				},
				{
					name: "Interesting",
					slug: "interesting"
				},
				{
					name: "Special",
					slug: "special"
				}
			]
		}
	},
	{
		id: 6971,
		description: "",
		name: "Holiday",
		slug: "holiday",
		details: [
		]
	},
	{
		id: 6974,
		description: "",
		name: "Holistic",
		slug: "holistic",
		details: [
		]
	},
	{
		id: 6977,
		description: "",
		name: "Hollywood",
		slug: "hollywood",
		details: {
			msv: 20
		}
	},
	{
		id: 6980,
		description: "",
		name: "Homemade",
		slug: "homemade",
		details: [
		]
	},
	{
		id: 6983,
		description: "",
		name: "Hot",
		slug: "hot",
		details: {
			msv: 80
		}
	},
	{
		id: 2037,
		description: "Amazing but not widely known",
		name: "Hidden Gem",
		slug: "hidden-gem",
		details: {
			msv: 180,
			vibes: [
				{
					name: "Unique",
					slug: "unique"
				},
				{
					name: "Secret",
					slug: "secret"
				},
				{
					name: "Classic",
					slug: "classic"
				},
				{
					name: "Deep Cut",
					slug: "deepcut"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7552,
		description: "",
		name: "Highbrow",
		slug: "highbrow",
		details: {
			vibes: [
				{
					name: "Fancy",
					slug: "fancy"
				},
				{
					name: "Exclusive",
					slug: "exclusive"
				},
				{
					name: "Upscale",
					slug: "upscale"
				}
			],
			msv: null
		}
	},
	{
		id: 6744,
		description: "Walking around in nature",
		name: "Hiking",
		slug: "hiking",
		details: {
			msv: 1600,
			vibes: [
				{
					name: "Adventurous",
					slug: "adventurous"
				},
				{
					name: "Walk",
					slug: "walk"
				},
				{
					name: "Healthy",
					slug: "healthy"
				},
				{
					name: "Outdoorsy",
					slug: "outdoorsy"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7555,
		description: "",
		name: "Hip",
		slug: "hip",
		details: [
		]
	},
	{
		id: 5587,
		description: "",
		name: "Hip Hop",
		slug: "hip-hop",
		details: {
			msv: 200
		}
	},
	{
		id: 6962,
		description: "Chill out",
		name: "Hippie",
		slug: "hippie",
		details: {
			msv: 90,
			vibes: [
				{
					name: "Natural",
					slug: "natural"
				},
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Radical",
					slug: "radical"
				},
				{
					name: "Rebel",
					slug: "rebel"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 6968,
		description: "",
		name: "Hipster",
		slug: "hipster",
		details: {
			msv: 20
		}
	},
	{
		id: 1073,
		description: "Places of importance",
		name: "Historic",
		slug: "historic",
		details: {
			msv: 800,
			vibes: [
				{
					name: "Old",
					slug: "old"
				},
				{
					name: "Interesting",
					slug: "interesting"
				},
				{
					name: "Special",
					slug: "special"
				}
			]
		}
	},
	{
		id: 6971,
		description: "",
		name: "Holiday",
		slug: "holiday",
		details: {
			vibes: [
				{
					name: "Celebratory",
					slug: "celebratory"
				},
				{
					name: "Festive",
					slug: "festive"
				}
			],
			msv: null
		}
	},
	{
		id: 6974,
		description: "",
		name: "Holistic",
		slug: "holistic",
		details: {
			vibes: [
				{
					name: "Healthy",
					slug: "healthy"
				}
			],
			msv: null
		}
	},
	{
		id: 6977,
		description: "",
		name: "Hollywood",
		slug: "hollywood",
		details: {
			msv: 20,
			vibes: [
				{
					name: "Celebrity",
					slug: "celebrity"
				}
			]
		}
	},
	{
		id: 6980,
		description: "",
		name: "Homemade",
		slug: "homemade",
		details: {
			vibes: [
				{
					name: "Handmade",
					slug: "handmade"
				}
			],
			msv: null
		}
	},
	{
		id: 6983,
		description: "",
		name: "Hot",
		slug: "hot",
		details: {
			msv: 80,
			vibes: [
				{
					name: "Red-Hot",
					slug: "red-hot"
				},
				{
					name: "Spicy",
					slug: "spicy"
				}
			]
		}
	},
	{
		id: 6989,
		description: "",
		name: "Hustle",
		slug: "hustle",
		details: [
		]
	},
	{
		id: 6965,
		description: " Cozy &amp; Comfortable",
		name: "Hygge",
		slug: "hygge",
		details: {
			msv: 20,
			vibes: [
				{
					name: "Cozy",
					slug: "cozy"
				},
				{
					name: "Comfy",
					slug: "comfy"
				}
			]
		}
	},
	{
		id: 7768,
		description: "",
		name: "Imaginative",
		slug: "imaginative",
		details: {
			vibes: [
				{
					name: "Creative",
					slug: "creative"
				},
				{
					name: "Artsy",
					slug: "artsy"
				},
				{
					name: "Adventurous",
					slug: "adventurous"
				},
				{
					name: "Inventive",
					slug: "inventive"
				},
				{
					name: "Whimsical",
					slug: "whimsical"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 1070,
		description: "Common good",
		name: "In-solidarity",
		slug: "solidarity",
		details: {
			msv: 20,
			vibes: [
				{
					name: "Community",
					slug: "community"
				},
				{
					name: "Inclusive",
					slug: "inclusive"
				},
				{
					name: "Positive",
					slug: "positive"
				},
				{
					name: "Proud",
					slug: "proud"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 1903,
		description: "Open to everyone",
		name: "Inclusive",
		slug: "inclusive",
		details: {
			msv: 140,
			vibes: [
				{
					name: "Community",
					slug: "community"
				},
				{
					name: "Friendly",
					slug: "friendly"
				},
				{
					name: "Diverse",
					slug: "diverse"
				},
				{
					name: "In-solidarity",
					slug: "solidarity"
				},
				{
					name: "Proud",
					slug: "proud"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 5581,
		description: "Independent and original",
		name: "Indie",
		slug: "indie",
		details: {
			msv: 70,
			vibes: [
				{
					name: "Alternative",
					slug: "alternative"
				},
				{
					name: "Local",
					slug: "local"
				},
				{
					name: "Eclectic",
					slug: "eclectic"
				}
			]
		}
	},
	{
		id: 6558,
		description: "",
		name: "Industrial",
		slug: "industrial",
		details: {
			msv: null
		}
	},
	{
		id: 6992,
		description: "",
		name: "Influencial",
		slug: "influencial",
		details: [
		]
	},
	{
		id: 6995,
		description: "",
		name: "Innovative",
		slug: "innovative",
		details: {
			msv: 20,
			vibes: [
				{
					name: "Entrepreneurial",
					slug: "entrepreneurial"
				},
				{
					name: "Inventive",
					slug: "inventive"
				}
			]
		}
	},
	{
		id: 7001,
		description: "Brilliant and life affirming",
		name: "Inspired",
		slug: "inspired",
		details: {
			msv: 40,
			vibes: [
				{
					name: "Elevated",
					slug: "elevated"
				},
				{
					name: "Positive",
					slug: "positive"
				},
				{
					name: "Joyful",
					slug: "joyful"
				},
				{
					name: "Refreshing",
					slug: "refreshing"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7004,
		description: "",
		name: "Intense",
		slug: "intense",
		details: [
		]
	},
	{
		id: 6717,
		description: "",
		name: "Interactive",
		slug: "interactive",
		details: {
			vibes: [
				{
					name: "Participatory",
					slug: "participatory"
				}
			],
			msv: null
		}
	},
	{
		id: 7013,
		description: "Arousing curiosity and feeling",
		name: "Interesting",
		slug: "interesting",
		details: {
			msv: 400
		}
	},
	{
		id: 7007,
		description: "",
		name: "Intergenerational",
		slug: "intergenerational",
		details: [
		]
	},
	{
		id: 7010,
		description: "",
		name: "International",
		slug: "international",
		details: [
		]
	},
	{
		id: 7016,
		description: "Warmth of closeness",
		name: "Intimate",
		slug: "intimate",
		details: {
			msv: 40,
			vibes: [
				{
					name: "Sensual",
					slug: "sensual"
				},
				{
					name: "Quiet",
					slug: "quiet"
				},
				{
					name: "Date Spot",
					slug: "datespot"
				},
				{
					name: "Small",
					slug: "small"
				},
				{
					name: "Love",
					slug: "love"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 6998,
		description: "",
		name: "Inventive",
		slug: "inventive",
		details: {
			vibes: [
				{
					name: "Innovative",
					slug: "innovative"
				},
				{
					name: "Entrepreneurial",
					slug: "entrepreneurial"
				}
			],
			msv: null
		}
	},
	{
		id: 7735,
		description: "",
		name: "Inviting",
		slug: "inviting",
		details: {
			vibes: [
				{
					name: "Welcoming",
					slug: "welcoming"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7019,
		description: "Eye catching style",
		name: "Jazzy",
		slug: "jazzy",
		details: {
			vibes: [
				{
					name: "Shimmy",
					slug: "shimmy"
				},
				{
					name: "Dance",
					slug: "dance"
				},
				{
					name: "Musical",
					slug: "musical"
				},
				{
					name: "Stylish",
					slug: "stylish"
				},
				{
					name: "Lively",
					slug: "lively"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7028,
		description: "Feeling great pleasure and happiness",
		name: "Joyful",
		slug: "joyful",
		details: {
			msv: 60,
			vibes: [
				{
					name: "Happy",
					slug: "happy"
				},
				{
					name: "Fun",
					slug: "fun"
				},
				{
					name: "Positive",
					slug: "positive"
				}
			]
		}
	},
	{
		id: 7022,
		description: "",
		name: "Juicy",
		slug: "juicy",
		details: {
			vibes: [
				{
					name: "Tasty",
					slug: "tasty"
				},
				{
					name: "Spicy",
					slug: "spicy"
				},
				{
					name: "Fresh",
					slug: "fresh"
				},
				{
					name: "Sexy",
					slug: "sexy"
				},
				{
					name: "Lush",
					slug: "lush"
				},
				{
					name: "Red-Hot",
					slug: "red-hot"
				},
				{
					name: "Flavorful",
					slug: "flavorful"
				}
			],
			msv: null
		}
	},
	{
		id: 7723,
		description: "",
		name: "Jungle",
		slug: "jungle",
		details: {
			vibes: [
				{
					name: "Tropical",
					slug: "tropical"
				},
				{
					name: "Oasis",
					slug: "oasis"
				},
				{
					name: "Lush",
					slug: "lush"
				},
				{
					name: "Botanical",
					slug: "botanical"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7025,
		description: "",
		name: "Justice",
		slug: "justice",
		details: [
		]
	},
	{
		id: 7031,
		description: "",
		name: "Kidcore",
		slug: "kidcore",
		details: {
			vibes: [
				{
					name: "Young",
					slug: "young"
				},
				{
					name: "Children",
					slug: "children"
				},
				{
					name: "Fun",
					slug: "fun"
				},
				{
					name: "Nostalgic",
					slug: "nostalgic"
				}
			],
			msv: null
		}
	},
	{
		id: 7037,
		description: "",
		name: "Kindness",
		slug: "kindness",
		details: {
			msv: 30
		}
	},
	{
		id: 7040,
		description: "",
		name: "Kinky",
		slug: "kinky",
		details: {
			msv: 80
		}
	},
	{
		id: 7034,
		description: "",
		name: "Kitschy",
		slug: "kitschy",
		details: {
			vibes: [
				{
					name: "Silly",
					slug: "silly"
				},
				{
					name: "Traditional",
					slug: "traditional"
				}
			],
			msv: null
		}
	},
	{
		id: 5545,
		description: "",
		name: "Kosher",
		slug: "kosher",
		details: {
			msv: 30
		}
	},
	{
		id: 7043,
		description: "",
		name: "Laid-back",
		slug: "laidback",
		details: {
			vibes: [
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Calm",
					slug: "calm-2"
				},
				{
					name: "Quiet Energy",
					slug: "calm"
				}
			],
			msv: null
		}
	},
	{
		id: 7046,
		description: "",
		name: "Late Night",
		slug: "latenight",
		details: {
			msv: 60
		}
	},
	{
		id: 7052,
		description: "",
		name: "Laugh",
		slug: "laugh",
		details: {
			vibes: [
				{
					name: "Funny",
					slug: "funny"
				}
			],
			msv: null
		}
	},
	{
		id: 7049,
		description: "",
		name: "Lax",
		slug: "lax",
		details: {
			vibes: [
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Relaxing",
					slug: "relaxing"
				}
			],
			msv: null
		}
	},
	{
		id: 6777,
		description: "",
		name: "Lazy",
		slug: "lazy",
		details: [
		]
	},
	{
		id: 7055,
		description: "",
		name: "Legacy",
		slug: "legacy",
		details: [
		]
	},
	{
		id: 7058,
		description: "",
		name: "Legit",
		slug: "legit",
		details: {
			vibes: [
				{
					name: "Authentic",
					slug: "authentic"
				},
				{
					name: "Cool",
					slug: "cool"
				}
			],
			msv: null
		}
	},
	{
		id: 5619,
		description: "",
		name: "LGBTQ",
		slug: "lgbtq",
		details: {
			msv: 80
		}
	},
	{
		id: 7061,
		description: "",
		name: "Liberating",
		slug: "liberating",
		details: [
		]
	},
	{
		id: 4071,
		description: "It's happening",
		name: "Lit",
		slug: "lit",
		details: {
			msv: 20,
			vibes: [
				{
					name: "Lively",
					slug: "lively"
				},
				{
					name: "Loud",
					slug: "loud"
				},
				{
					name: "Vibrant",
					slug: "vibrant"
				},
				{
					name: "Wild",
					slug: "wild"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7064,
		description: "",
		name: "Literary",
		slug: "literary",
		details: {
			vibes: [
				{
					name: "Bookish",
					slug: "bookish"
				},
				{
					name: "Nerdy",
					slug: "nerdy"
				},
				{
					name: "Academic",
					slug: "academic"
				}
			],
			msv: null
		}
	},
	{
		id: 5690,
		description: "Full of energy and activity",
		name: "Lively",
		slug: "lively",
		details: {
			msv: 200,
			vibes: [
				{
					name: "Loud",
					slug: "loud"
				},
				{
					name: "Vibrant",
					slug: "vibrant"
				},
				{
					name: "Buzzing",
					slug: "buzzing"
				},
				{
					name: "Musical",
					slug: "musical"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 2230,
		description: "Belonging to a nearby area and community",
		name: "Local",
		slug: "local",
		details: {
			msv: 6000,
			vibes: [
				{
					name: "Community",
					slug: "community"
				},
				{
					name: "Cultural",
					slug: "cultural"
				},
				{
					name: "Inclusive",
					slug: "inclusive"
				},
				{
					name: "Proud",
					slug: "proud"
				},
				{
					name: "Neighborhood",
					slug: "neighborhood"
				},
				{
					name: "Civic",
					slug: "civic"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7067,
		description: "It's turned up",
		name: "Loud",
		slug: "loud",
		details: {
			vibes: [
				{
					name: "Lively",
					slug: "lively"
				},
				{
					name: "Lit",
					slug: "lit"
				},
				{
					name: "Outrageous",
					slug: "outrageous"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7079,
		description: "Profound affection for yourself and others",
		name: "Love",
		slug: "love",
		details: {
			msv: 40,
			vibes: [
				{
					name: "Intimate",
					slug: "intimate"
				},
				{
					name: "Positive",
					slug: "positive"
				},
				{
					name: "Romantic",
					slug: "romantic"
				},
				{
					name: "Family",
					slug: "family"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7696,
		description: "",
		name: "Low-Key",
		slug: "low-key",
		details: {
			vibes: [
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Calm",
					slug: "calm-2"
				},
				{
					name: "Laid-back",
					slug: "laidback"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7073,
		description: "",
		name: "Lumberjack",
		slug: "lumberjack",
		details: {
			vibes: [
				{
					name: "Woodsy",
					slug: "woodsy"
				},
				{
					name: "Outdoorsy",
					slug: "outdoorsy"
				},
				{
					name: "Rugged",
					slug: "rugged"
				}
			],
			msv: null
		}
	},
	{
		id: 7070,
		description: "",
		name: "Lunch",
		slug: "lunch",
		details: {
			msv: 200,
			vibes: [
				{
					name: "Casual",
					slug: "casual"
				},
				{
					name: "Nosh",
					slug: "nosh"
				},
				{
					name: "Snacky",
					slug: "snacky"
				},
				{
					name: "Tasty",
					slug: "tasty"
				}
			],
			categories: [
				{
					term_id: 6331,
					name: "Food",
					slug: "food",
					term_group: 0,
					term_taxonomy_id: 6331,
					taxonomy: "activity",
					description: "",
					parent: 6295,
					count: 27,
					filter: "raw"
				}
			],
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7720,
		description: "",
		name: "Lush",
		slug: "lush",
		details: {
			vibes: [
				{
					name: "Vibrant",
					slug: "vibrant"
				},
				{
					name: "Jungle",
					slug: "jungle"
				},
				{
					name: "Botanical",
					slug: "botanical"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7076,
		description: "Oh so fancy",
		name: "Luxe",
		slug: "luxe",
		details: {
			vibes: [
				{
					name: "Fancy",
					slug: "fancy"
				},
				{
					name: "Luxury",
					slug: "luxury"
				},
				{
					name: "Exclusive",
					slug: "exclusive"
				},
				{
					name: "Pretty",
					slug: "pretty"
				},
				{
					name: "Beautiful",
					slug: "beautiful"
				},
				{
					name: "Glam",
					slug: "glam"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 5652,
		description: "So glamourous",
		name: "Luxury",
		slug: "luxury",
		details: {
			msv: 80,
			vibes: [
				{
					name: "Luxe",
					slug: "luxe"
				},
				{
					name: "Upscale",
					slug: "upscale"
				},
				{
					name: "Elevated",
					slug: "elevated"
				}
			]
		}
	},
	{
		id: 5303,
		description: "Beyond the ordinary",
		name: "Magical",
		slug: "magical",
		details: {
			msv: 60,
			vibes: [
				{
					name: "Delightful",
					slug: "delightful"
				},
				{
					name: "Mystic",
					slug: "mystic"
				},
				{
					name: "Unexpected",
					slug: "unexpected"
				},
				{
					name: "Whimsical",
					slug: "whimsical"
				},
				{
					name: "Amazing",
					slug: "amazing"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7085,
		description: "",
		name: "Mellow",
		slug: "mellow",
		details: {
			vibes: [
				{
					name: "Relaxing",
					slug: "relaxing"
				},
				{
					name: "Calm",
					slug: "calm-2"
				},
				{
					name: "Chill",
					slug: "chill"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 1515,
		description: "",
		name: "Memorable",
		slug: "memorable",
		details: {
			vibes: [
				{
					name: "Nostalgic",
					slug: "nostalgic"
				}
			],
			msv: null
		}
	},
	{
		id: 7088,
		description: "From the land to the sea",
		name: "Mermaid",
		slug: "mermaid",
		details: {
			msv: 20,
			vibes: [
				{
					name: "Aquatic",
					slug: "aquatic"
				},
				{
					name: "Sexy",
					slug: "sexy"
				},
				{
					name: "Nautical",
					slug: "nautical"
				},
				{
					name: "Colorful",
					slug: "colorful"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7082,
		description: "",
		name: "Messy",
		slug: "messy",
		details: [
		]
	},
	{
		id: 7109,
		description: "",
		name: "Mid-century",
		slug: "mid-century",
		details: [
		]
	},
	{
		id: 1414,
		description: "Aware of the present",
		name: "Mindful",
		slug: "mindful",
		details: {
			msv: 30,
			vibes: [
				{
					name: "Calm",
					slug: "calm-2"
				},
				{
					name: "Peaceful",
					slug: "peaceful"
				},
				{
					name: "Inspired",
					slug: "inspired"
				},
				{
					name: "Zen",
					slug: "zen"
				},
				{
					name: "Relaxing",
					slug: "relaxing"
				},
				{
					name: "Aware",
					slug: "aware"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7103,
		description: "",
		name: "Mingle",
		slug: "mingle",
		details: {
			vibes: [
				{
					name: "Social",
					slug: "social-2"
				}
			],
			msv: null
		}
	},
	{
		id: 7091,
		description: "Simple and good use of effort",
		name: "Minimalist",
		slug: "minimalist",
		details: {
			vibes: [
				{
					name: "Modern",
					slug: "modern"
				},
				{
					name: "Open",
					slug: "open"
				},
				{
					name: "Luxe",
					slug: "luxe"
				},
				{
					name: "Airy",
					slug: "airy"
				},
				{
					name: "Design",
					slug: "design"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7106,
		description: "",
		name: "Modern",
		slug: "modern",
		details: {
			vibes: [
				{
					name: "Fashion",
					slug: "fashion"
				},
				{
					name: "Stylish",
					slug: "stylish"
				}
			],
			msv: null
		}
	},
	{
		id: 7094,
		description: "A sudden burst of a mood",
		name: "Moody",
		slug: "moody",
		details: {
			vibes: [
				{
					name: "Dark",
					slug: "dark"
				},
				{
					name: "Intense",
					slug: "intense"
				},
				{
					name: "Eclectic",
					slug: "eclectic"
				},
				{
					name: "Late Night",
					slug: "latenight"
				},
				{
					name: "Candlelit",
					slug: "candlelit"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7097,
		description: "",
		name: "Morning",
		slug: "morning",
		details: {
			msv: 40,
			vibes: [
				{
					name: "Sunny",
					slug: "sunny"
				},
				{
					name: "Fresh",
					slug: "fresh"
				},
				{
					name: "Aware",
					slug: "aware"
				},
				{
					name: "Bright",
					slug: "bright"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7657,
		description: "",
		name: "Multicultural",
		slug: "multicultural",
		details: {
			vibes: [
				{
					name: "Diverse",
					slug: "diverse"
				}
			],
			msv: null
		}
	},
	{
		id: 3018,
		description: "",
		name: "Music",
		slug: "music",
		details: [
		]
	},
	{
		id: 7100,
		description: "Sounds of feeling and harmony",
		name: "Musical",
		slug: "musical",
		details: {
			vibes: [
				{
					name: "Jazzy",
					slug: "jazzy"
				},
				{
					name: "Shimmy",
					slug: "shimmy"
				},
				{
					name: "Dance",
					slug: "dance"
				},
				{
					name: "Lively",
					slug: "lively"
				},
				{
					name: "Relaxing",
					slug: "relaxing"
				},
				{
					name: "Funky",
					slug: "funky"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 5306,
		description: "",
		name: "Mysterious",
		slug: "mysterious",
		details: {
			msv: 100,
			vibes: [
				{
					name: "Mystic",
					slug: "mystic"
				}
			]
		}
	},
	{
		id: 5309,
		description: "Holding onto that spiritual magic",
		name: "Mystic",
		slug: "mystic",
		details: {
			vibes: [
				{
					name: "Witchy",
					slug: "witchy"
				},
				{
					name: "Magical",
					slug: "magical"
				},
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Radical",
					slug: "radical"
				},
				{
					name: "Spiritual",
					slug: "spiritual"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7112,
		description: "",
		name: "Namaste",
		slug: "namaste",
		details: {
			vibes: [
				{
					name: "Zen",
					slug: "zen"
				},
				{
					name: "Yoga",
					slug: "yoga"
				},
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Quiet Energy",
					slug: "calm"
				},
				{
					name: "Calm",
					slug: "calm-2"
				}
			],
			msv: null
		}
	},
	{
		id: 7115,
		description: "Of the earth",
		name: "Natural",
		slug: "natural",
		details: {
			msv: 60,
			vibes: [
				{
					name: "Green",
					slug: "green"
				},
				{
					name: "Earthy",
					slug: "earthy"
				},
				{
					name: "Organic",
					slug: "organic"
				},
				{
					name: "Fresh",
					slug: "fresh"
				},
				{
					name: "Outdoors",
					slug: "outdoors"
				},
				{
					name: "Botanical",
					slug: "botanical"
				},
				{
					name: "Hiking",
					slug: "hiking"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 6723,
		description: "Of the sea",
		name: "Nautical",
		slug: "nautical",
		details: {
			vibes: [
				{
					name: "Aquatic",
					slug: "aquatic"
				},
				{
					name: "Historic",
					slug: "historic"
				},
				{
					name: "Mermaid",
					slug: "mermaid"
				},
				{
					name: "Old World",
					slug: "old-world"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7118,
		description: "",
		name: "Neighborhood",
		slug: "neighborhood",
		details: {
			msv: 130,
			vibes: [
				{
					name: "Local",
					slug: "local"
				},
				{
					name: "Community",
					slug: "community"
				},
				{
					name: "Friendly",
					slug: "friendly"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 5622,
		description: "All the bright lights",
		name: "Neon",
		slug: "neon",
		details: {
			msv: 70,
			vibes: [
				{
					name: "Colorful",
					slug: "colorful"
				},
				{
					name: "Nightlife",
					slug: "nightlife"
				},
				{
					name: "Retro",
					slug: "retro"
				}
			]
		}
	},
	{
		id: 4569,
		description: "",
		name: "Nerdy",
		slug: "nerdy",
		details: {
			vibes: [
				{
					name: "Geeky",
					slug: "geeky"
				},
				{
					name: "Curious",
					slug: "curious"
				},
				{
					name: "Interesting",
					slug: "interesting"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 6507,
		description: "",
		name: "New",
		slug: "new",
		details: {
			msv: 200
		}
	},
	{
		id: 7561,
		description: "",
		name: "New Wave",
		slug: "new-wave",
		details: [
		]
	},
	{
		id: 7121,
		description: "",
		name: "Nightlife",
		slug: "nightlife",
		details: {
			msv: 200,
			vibes: [
				{
					name: "Late Night",
					slug: "latenight"
				},
				{
					name: "Musical",
					slug: "musical"
				},
				{
					name: "Lively",
					slug: "lively"
				},
				{
					name: "Buzzing",
					slug: "buzzing"
				}
			],
			categories: [
				{
					term_id: 6570,
					name: "Nightlife",
					slug: "nightlife",
					term_group: 0,
					term_taxonomy_id: 6570,
					taxonomy: "activity",
					description: "",
					parent: 6295,
					count: 7,
					filter: "raw"
				}
			],
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7564,
		description: "Snack on",
		name: "Nosh",
		slug: "nosh",
		details: {
			vibes: [
				{
					name: "Tasty",
					slug: "tasty"
				},
				{
					name: "Snacky",
					slug: "snacky"
				},
				{
					name: "Foodie",
					slug: "foodie"
				}
			],
			msv: null
		}
	},
	{
		id: 6732,
		description: "Remembrance of the past",
		name: "Nostalgic",
		slug: "nostalgic",
		details: {
			vibes: [
				{
					name: "Classic",
					slug: "classic"
				},
				{
					name: "Memorable",
					slug: "memorable"
				},
				{
					name: "Historic",
					slug: "historic"
				},
				{
					name: "Deep Cut",
					slug: "deepcut"
				},
				{
					name: "Vintage",
					slug: "vintage"
				},
				{
					name: "Throwback",
					slug: "throwback"
				}
			],
			categories: false,
			search_term: "",
			msv: 20,
			vibeset: false
		}
	},
	{
		id: 7567,
		description: "",
		name: "Novel",
		slug: "novel",
		details: [
		]
	},
	{
		id: 7124,
		description: "Like finding water in the desert",
		name: "Oasis",
		slug: "oasis",
		details: {
			msv: 80,
			vibes: [
				{
					name: "Hidden Gem",
					slug: "hidden-gem"
				},
				{
					name: "Secret",
					slug: "secret"
				},
				{
					name: "Tropical",
					slug: "tropical"
				},
				{
					name: "Rejuvenating",
					slug: "rejuvenating"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7127,
		description: "",
		name: "Ocean",
		slug: "ocean",
		details: [
		]
	},
	{
		id: 7130,
		description: "",
		name: "Old",
		slug: "old",
		details: {
			vibes: {
				"0": {
					term_id: 1067,
					name: "Old School",
					slug: "oldschool",
					term_group: 0,
					term_taxonomy_id: 1067,
					taxonomy: "vibe",
					description: "Respect for the coolness of earlier eras",
					parent: 0,
					count: 28,
					filter: "raw"
				},
				"1": {
					term_id: 4828,
					name: "Traditional",
					slug: "traditional",
					term_group: 0,
					term_taxonomy_id: 4828,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 2,
					filter: "raw"
				},
				"2": {
					term_id: 7133,
					name: "Old World",
					slug: "old-world",
					term_group: 0,
					term_taxonomy_id: 7133,
					taxonomy: "vibe",
					description: "",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"4": {
					term_id: 5638,
					name: "Vintage",
					slug: "vintage",
					term_group: 0,
					term_taxonomy_id: 5638,
					taxonomy: "vibe",
					description: "In and of the past",
					parent: 0,
					count: 0,
					filter: "raw"
				},
				"5": {
					term_id: 5632,
					name: "Antique",
					slug: "antique",
					term_group: 0,
					term_taxonomy_id: 5632,
					taxonomy: "vibe",
					description: "Nostalgic collectables",
					parent: 0,
					count: 1,
					filter: "raw"
				}
			},
			categories: false,
			search_term: "",
			msv: 180,
			vibeset: false
		}
	},
	{
		id: 1067,
		description: "Respect for the coolness of earlier eras",
		name: "Old School",
		slug: "oldschool",
		details: {
			msv: 80,
			vibes: [
				{
					name: "Traditional",
					slug: "traditional"
				},
				{
					name: "Retro",
					slug: "retro"
				},
				{
					name: "Classic",
					slug: "classic"
				},
				{
					name: "Analog",
					slug: "analog"
				},
				{
					name: "Throwback",
					slug: "throwback"
				},
				{
					name: "Deep Cut",
					slug: "deepcut"
				},
				{
					name: "Vintage",
					slug: "vintage"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7133,
		description: "",
		name: "Old World",
		slug: "old-world",
		details: {
			vibes: [
				{
					name: "Old",
					slug: "old"
				},
				{
					name: "Old School",
					slug: "oldschool"
				},
				{
					name: "Traditional",
					slug: "traditional"
				},
				{
					name: "Classic",
					slug: "classic"
				}
			],
			msv: null
		}
	},
	{
		id: 7136,
		description: "",
		name: "Open",
		slug: "open",
		details: {
			vibes: [
				{
					name: "Welcoming",
					slug: "welcoming"
				}
			],
			msv: null
		}
	},
	{
		id: 7142,
		description: "",
		name: "Optimistic",
		slug: "optimistic",
		details: [
		]
	},
	{
		id: 7145,
		description: "",
		name: "Opulent",
		slug: "opulent",
		details: [
		]
	},
	{
		id: 7139,
		description: "",
		name: "Oregon",
		slug: "oregon",
		details: [
		]
	},
	{
		id: 5539,
		description: "",
		name: "Organic",
		slug: "organic",
		details: {
			msv: 180,
			vibes: [
				{
					name: "Healthy",
					slug: "healthy"
				},
				{
					name: "Sustainable",
					slug: "sustainable"
				},
				{
					name: "Eco",
					slug: "eco"
				}
			],
			categories: [
				{
					term_id: 6331,
					name: "Food",
					slug: "food",
					term_group: 0,
					term_taxonomy_id: 6331,
					taxonomy: "activity",
					description: "",
					parent: 6295,
					count: 27,
					filter: "raw"
				}
			],
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7660,
		description: "",
		name: "Original",
		slug: "original",
		details: [
		]
	},
	{
		id: 3027,
		description: "Outside in open air",
		name: "Outdoors",
		slug: "outdoors",
		details: {
			msv: 100,
			vibes: [
				{
					name: "Natural",
					slug: "natural"
				},
				{
					name: "Relaxing",
					slug: "relaxing"
				},
				{
					name: "Garden",
					slug: "garden"
				},
				{
					name: "Rugged",
					slug: "rugged"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7148,
		description: "Beinging one with the land",
		name: "Outdoorsy",
		slug: "outdoorsy",
		details: {
			msv: 320,
			vibes: [
				{
					name: "Adventurous",
					slug: "adventurous"
				},
				{
					name: "Hiking",
					slug: "hiking"
				},
				{
					name: "Views",
					slug: "views"
				},
				{
					name: "Camp",
					slug: "camp"
				},
				{
					name: "Relaxing",
					slug: "relaxing"
				},
				{
					name: "Experiential",
					slug: "experiential"
				},
				{
					name: "Natural",
					slug: "natural"
				},
				{
					name: "Rugged",
					slug: "rugged"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7151,
		description: "",
		name: "Outrageous",
		slug: "outrageous",
		details: [
		]
	},
	{
		id: 7726,
		description: "",
		name: "Pampering",
		slug: "pampering",
		details: {
			vibes: [
				{
					name: "Treat Yourself",
					slug: "treatyourself"
				},
				{
					name: "Self Care",
					slug: "selfcare"
				},
				{
					name: "Wellness",
					slug: "wellness"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7160,
		description: "A wide beautiful view",
		name: "Panoramic",
		slug: "panoramic",
		details: {
			msv: 200,
			vibes: [
				{
					name: "Scenic",
					slug: "scenic"
				},
				{
					name: "Photo",
					slug: "photo"
				},
				{
					name: "Views",
					slug: "views"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7163,
		description: "",
		name: "Paradise",
		slug: "paradise",
		details: [
		]
	},
	{
		id: 7154,
		description: "",
		name: "Paranormal",
		slug: "paranormal",
		details: {
			vibes: [
				{
					name: "Magical",
					slug: "magical"
				},
				{
					name: "Mysterious",
					slug: "mysterious"
				},
				{
					name: "Mystic",
					slug: "mystic"
				},
				{
					name: "Fantastic",
					slug: "fantastic"
				},
				{
					name: "Witchy",
					slug: "witchy"
				},
				{
					name: "Supernatural",
					slug: "supernatural"
				},
				{
					name: "Spooky",
					slug: "spooky"
				}
			],
			msv: null
		}
	},
	{
		id: 7166,
		description: "Everyday, effortless chic",
		name: "Parisian",
		slug: "parisian",
		details: {
			vibes: [
				{
					name: "Classy",
					slug: "classy"
				},
				{
					name: "Modern",
					slug: "modern"
				},
				{
					name: "Minimalist",
					slug: "minimalist"
				},
				{
					name: "Stylish",
					slug: "stylish"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7169,
		description: "The outdoor spaces we all share",
		name: "Park",
		slug: "park",
		details: {
			msv: 170,
			vibes: [
				{
					name: "Airy",
					slug: "airy"
				},
				{
					name: "Outdoorsy",
					slug: "outdoorsy"
				},
				{
					name: "Comfy",
					slug: "comfy"
				},
				{
					name: "Sunny",
					slug: "sunny"
				},
				{
					name: "Positive",
					slug: "positive"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7157,
		description: "",
		name: "Participatory",
		slug: "participatory",
		details: {
			vibes: [
				{
					name: "Community",
					slug: "community"
				},
				{
					name: "Interactive",
					slug: "interactive"
				}
			],
			msv: null
		}
	},
	{
		id: 7172,
		description: "",
		name: "Party",
		slug: "party",
		details: {
			vibes: [
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "After Party",
					slug: "after-party"
				},
				{
					name: "Buzzing",
					slug: "buzzing"
				},
				{
					name: "Vibrant",
					slug: "vibrant"
				},
				{
					name: "Bright",
					slug: "bright"
				}
			],
			msv: null
		}
	},
	{
		id: 7570,
		description: "Deeply caring for something",
		name: "Passionate",
		slug: "passionate",
		details: [
		]
	},
	{
		id: 7175,
		description: " Dreamy and calm",
		name: "Pastel",
		slug: "pastel",
		details: [
		]
	},
	{
		id: 2165,
		description: "Relaxation shared outdoors",
		name: "Patio",
		slug: "patio",
		details: {
			msv: 480,
			vibes: [
				{
					name: "Outdoors",
					slug: "outdoors"
				},
				{
					name: "Cozy",
					slug: "cozy"
				},
				{
					name: "Airy",
					slug: "airy"
				},
				{
					name: "Garden",
					slug: "garden"
				},
				{
					name: "Open",
					slug: "open"
				}
			]
		}
	},
	{
		id: 5602,
		description: "Tranquil and undisturbed",
		name: "Peaceful",
		slug: "peaceful",
		details: {
			msv: 110,
			vibes: [
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Serene",
					slug: "serene"
				},
				{
					name: "Calm",
					slug: "calm-2"
				},
				{
					name: "Joyful",
					slug: "joyful"
				},
				{
					name: "Gentle",
					slug: "gentle"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7178,
		description: "",
		name: "Perspective",
		slug: "perspective",
		details: [
		]
	},
	{
		id: 7181,
		description: "",
		name: "Photo",
		slug: "photo",
		details: [
		]
	},
	{
		id: 5533,
		description: "Afternoon in the park",
		name: "Picnic",
		slug: "picnic",
		details: {
			vibes: [
				{
					name: "Sunny",
					slug: "sunny"
				},
				{
					name: "Outdoorsy",
					slug: "outdoorsy"
				},
				{
					name: "Public",
					slug: "public"
				},
				{
					name: "Views",
					slug: "views"
				},
				{
					name: "Chill",
					slug: "chill"
				}
			],
			categories: false,
			search_term: "",
			msv: 30,
			vibeset: false
		}
	},
	{
		id: 7184,
		description: "",
		name: "Plant",
		slug: "plant",
		details: {
			msv: 400,
			vibes: [
				{
					name: "Botanical",
					slug: "botanical"
				},
				{
					name: "Jungle",
					slug: "jungle"
				}
			]
		}
	},
	{
		id: 7187,
		description: "Fun and games",
		name: "Playful",
		slug: "playful",
		details: {
			vibes: [
				{
					name: "Playtime",
					slug: "playtime"
				},
				{
					name: "Fun",
					slug: "fun"
				}
			],
			msv: null
		}
	},
	{
		id: 1076,
		description: "",
		name: "Playtime",
		slug: "playtime",
		details: {
			vibes: [
				{
					name: "Playful",
					slug: "playful"
				}
			],
			msv: null
		}
	},
	{
		id: 7190,
		description: "It's on fire",
		name: "Poppin'",
		slug: "popping",
		details: {
			vibes: [
				{
					name: "Lit",
					slug: "lit"
				},
				{
					name: "Rowdy",
					slug: "rowdy"
				},
				{
					name: "Crowded",
					slug: "crowded"
				},
				{
					name: "Buzzing",
					slug: "buzzing"
				}
			],
			msv: null
		}
	},
	{
		id: 1701,
		description: "It's happening",
		name: "Popular",
		slug: "popular",
		details: {
			msv: 260,
			vibes: [
				{
					name: "Buzzing",
					slug: "buzzing"
				},
				{
					name: "Vibrant",
					slug: "vibrant"
				},
				{
					name: "Trending",
					slug: "trending"
				},
				{
					name: "Lively",
					slug: "lively"
				},
				{
					name: "Trendy",
					slug: "trendy"
				},
				{
					name: "Favorite",
					slug: "favorite"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 5517,
		description: "Ephemeral experiences",
		name: "Popup",
		slug: "popup",
		details: {
			msv: 40
		}
	},
	{
		id: 7196,
		description: "",
		name: "Posh",
		slug: "posh",
		details: [
		]
	},
	{
		id: 6555,
		description: "Good vibes only",
		name: "Positive",
		slug: "positive",
		details: {
			msv: 390,
			vibes: [
				{
					name: "Happy",
					slug: "happy"
				},
				{
					name: "Open",
					slug: "open"
				},
				{
					name: "Fun",
					slug: "fun"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7193,
		description: "",
		name: "Pretty",
		slug: "pretty",
		details: {
			vibes: [
				{
					name: "Beautiful",
					slug: "beautiful"
				}
			],
			msv: null
		}
	},
	{
		id: 6549,
		description: "Deserved power and pleasure",
		name: "Proud",
		slug: "proud",
		details: {
			msv: 40,
			vibes: [
				{
					name: "Community",
					slug: "community"
				},
				{
					name: "In-solidarity",
					slug: "solidarity"
				},
				{
					name: "Inspired",
					slug: "inspired"
				},
				{
					name: "Radical",
					slug: "radical"
				},
				{
					name: "Civic",
					slug: "civic"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 5693,
		description: "",
		name: "Public",
		slug: "public",
		details: [
		]
	},
	{
		id: 7199,
		description: "",
		name: "Pumpkin",
		slug: "pumpkin",
		details: {
			vibes: [
				{
					name: "Halloween",
					slug: "halloween"
				}
			],
			msv: null
		}
	},
	{
		id: 5611,
		description: "",
		name: "Punk",
		slug: "punk",
		details: {
			vibes: [
				{
					name: "Rebel",
					slug: "rebel"
				}
			],
			msv: null
		}
	},
	{
		id: 7202,
		description: "",
		name: "Queer",
		slug: "queer",
		details: [
		]
	},
	{
		id: 7205,
		description: "A space with little distraction",
		name: "Quiet",
		slug: "quiet",
		details: {
			msv: 30,
			vibes: [
				{
					name: "Calm",
					slug: "calm-2"
				},
				{
					name: "Peaceful",
					slug: "peaceful"
				},
				{
					name: "Safe",
					slug: "safe"
				},
				{
					name: "Chill",
					slug: "chill"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 2162,
		description: "",
		name: "Quiet Energy",
		slug: "calm",
		details: {
			vibes: [
				{
					name: "Calm",
					slug: "calm-2"
				},
				{
					name: "Peaceful",
					slug: "peaceful"
				},
				{
					name: "Chill",
					slug: "chill"
				}
			],
			msv: null
		}
	},
	{
		id: 2031,
		description: "",
		name: "Quirky",
		slug: "quirky",
		details: [
		]
	},
	{
		id: 6771,
		description: "On the edge of the common",
		name: "Radical",
		slug: "radical",
		details: {
			vibes: [
				{
					name: "Rebel",
					slug: "rebel"
				},
				{
					name: "Community",
					slug: "community"
				},
				{
					name: "Hippie",
					slug: "hippie"
				},
				{
					name: "Proud",
					slug: "proud"
				},
				{
					name: "In-solidarity",
					slug: "solidarity"
				}
			],
			categories: false,
			search_term: "",
			msv: 20,
			vibeset: false
		}
	},
	{
		id: 7208,
		description: "",
		name: "Rainbow",
		slug: "rainbow",
		details: {
			vibes: [
				{
					name: "Colorful",
					slug: "colorful"
				},
				{
					name: "Proud",
					slug: "proud"
				},
				{
					name: "Mermaid",
					slug: "mermaid"
				},
				{
					name: "Diverse",
					slug: "diverse"
				}
			],
			msv: null
		}
	},
	{
		id: 7211,
		description: "",
		name: "Raunchy",
		slug: "raunchy",
		details: [
		]
	},
	{
		id: 6741,
		description: "Original and outside the box",
		name: "Rebel",
		slug: "rebel",
		details: {
			msv: 40,
			vibes: [
				{
					name: "In-solidarity",
					slug: "solidarity"
				},
				{
					name: "Indie",
					slug: "indie"
				},
				{
					name: "Proud",
					slug: "proud"
				},
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Activist",
					slug: "activist"
				},
				{
					name: "Unexpected",
					slug: "unexpected"
				},
				{
					name: "Spirited",
					slug: "spirited"
				},
				{
					name: "Red-Hot",
					slug: "red-hot"
				},
				{
					name: "Alternative",
					slug: "alternative"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7214,
		description: "",
		name: "Recyled",
		slug: "recyled",
		details: {
			vibes: [
				{
					name: "Sustainable",
					slug: "sustainable"
				},
				{
					name: "Eco",
					slug: "eco"
				},
				{
					name: "Reuse",
					slug: "reuse"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7747,
		description: "",
		name: "Red-Hot",
		slug: "red-hot",
		details: {
			vibes: [
				{
					name: "Trendy",
					slug: "trendy"
				},
				{
					name: "Rebel",
					slug: "rebel"
				},
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Bold",
					slug: "bold"
				},
				{
					name: "Spirited",
					slug: "spirited"
				},
				{
					name: "Spicy",
					slug: "spicy"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7217,
		description: "",
		name: "Refined",
		slug: "refined",
		details: {
			vibes: [
				{
					name: "Fancy",
					slug: "fancy"
				},
				{
					name: "Upscale",
					slug: "upscale"
				}
			],
			msv: null
		}
	},
	{
		id: 7220,
		description: "",
		name: "Refreshing",
		slug: "refreshing",
		details: {
			vibes: [
				{
					name: "Fresh",
					slug: "fresh"
				}
			],
			msv: null
		}
	},
	{
		id: 7223,
		description: "",
		name: "Rejuvenating",
		slug: "rejuvenating",
		details: {
			vibes: [
				{
					name: "Comforting",
					slug: "comforting"
				},
				{
					name: "Restorative",
					slug: "restorative"
				}
			],
			msv: null
		}
	},
	{
		id: 5675,
		description: "A release of tension",
		name: "Relaxing",
		slug: "relaxing",
		details: {
			msv: 170,
			vibes: [
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Rejuvenating",
					slug: "rejuvenating"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7226,
		description: "",
		name: "Renowned",
		slug: "renowned",
		details: [
		]
	},
	{
		id: 7229,
		description: "",
		name: "Restorative",
		slug: "restorative",
		details: {
			vibes: [
				{
					name: "Serene",
					slug: "serene"
				},
				{
					name: "Comforting",
					slug: "comforting"
				},
				{
					name: "Chill",
					slug: "chill"
				}
			],
			msv: null
		}
	},
	{
		id: 2159,
		description: "Styles of the past",
		name: "Retro",
		slug: "retro",
		details: {
			msv: 240,
			vibes: [
				{
					name: "Classic",
					slug: "classic"
				},
				{
					name: "Analog",
					slug: "analog"
				},
				{
					name: "Eclectic",
					slug: "eclectic"
				},
				{
					name: "Nostalgic",
					slug: "nostalgic"
				},
				{
					name: "Traditional",
					slug: "traditional"
				},
				{
					name: "Funky",
					slug: "funky"
				},
				{
					name: "Deep Cut",
					slug: "deepcut"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7232,
		description: "",
		name: "Reuse",
		slug: "reuse",
		details: {
			vibes: [
				{
					name: "Sustainable",
					slug: "sustainable"
				},
				{
					name: "Recyled",
					slug: "recyled"
				},
				{
					name: "Eco",
					slug: "eco"
				}
			],
			msv: null
		}
	},
	{
		id: 7238,
		description: "",
		name: "Revolutionary",
		slug: "revolutionary",
		details: {
			vibes: [
				{
					name: "Rebel",
					slug: "rebel"
				},
				{
					name: "Authentic",
					slug: "authentic"
				},
				{
					name: "Courageous",
					slug: "courageous"
				}
			],
			msv: null
		}
	},
	{
		id: 7241,
		description: "",
		name: "Roadhouse",
		slug: "roadhouse",
		details: {
			vibes: [
				{
					name: "Lively",
					slug: "lively"
				},
				{
					name: "Old School",
					slug: "oldschool"
				},
				{
					name: "Cozy",
					slug: "cozy"
				},
				{
					name: "Rebel",
					slug: "rebel"
				}
			],
			categories: false,
			search_term: "",
			msv: 20,
			vibeset: false
		}
	},
	{
		id: 5608,
		description: "",
		name: "Rock",
		slug: "rock",
		details: {
			vibes: [
				{
					name: "Musical",
					slug: "musical"
				}
			],
			msv: null
		}
	},
	{
		id: 1956,
		description: "Grand feelings, especially love",
		name: "Romantic",
		slug: "romantic",
		details: {
			msv: 400,
			vibes: [
				{
					name: "Togetherness",
					slug: "together"
				},
				{
					name: "Intimate",
					slug: "intimate"
				},
				{
					name: "Love",
					slug: "love"
				},
				{
					name: "Sensual",
					slug: "sensual"
				},
				{
					name: "Candlelit",
					slug: "candlelit"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7702,
		description: "",
		name: "Rooftop",
		slug: "rooftop",
		details: {
			vibes: [
				{
					name: "Scenic",
					slug: "scenic"
				},
				{
					name: "Views",
					slug: "views"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7624,
		description: "",
		name: "Rowdy",
		slug: "rowdy",
		details: {
			msv: 30,
			vibes: [
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Party",
					slug: "party"
				},
				{
					name: "Buzzing",
					slug: "buzzing"
				}
			]
		}
	},
	{
		id: 7244,
		description: "Wild &amp; rough",
		name: "Rugged",
		slug: "rugged",
		details: {
			vibes: [
				{
					name: "Outdoorsy",
					slug: "outdoorsy"
				},
				{
					name: "Rugged",
					slug: "rugged"
				},
				{
					name: "Camp",
					slug: "camp"
				},
				{
					name: "Lumberjack",
					slug: "lumberjack"
				},
				{
					name: "Woodsy",
					slug: "woodsy"
				},
				{
					name: "Wild",
					slug: "wild"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7247,
		description: "",
		name: "Rustic",
		slug: "rustic",
		details: {
			vibes: [
				{
					name: "Woodsy",
					slug: "woodsy"
				},
				{
					name: "Lumberjack",
					slug: "lumberjack"
				},
				{
					name: "Old School",
					slug: "oldschool"
				},
				{
					name: "Old World",
					slug: "old-world"
				},
				{
					name: "Old",
					slug: "old"
				},
				{
					name: "Nostalgic",
					slug: "nostalgic"
				}
			],
			msv: null
		}
	},
	{
		id: 7250,
		description: "",
		name: "Safe",
		slug: "safe",
		details: {
			vibes: [
				{
					name: "Comforting",
					slug: "comforting"
				}
			],
			msv: null
		}
	},
	{
		id: 7253,
		description: "",
		name: "Sassy",
		slug: "sassy",
		details: [
		]
	},
	{
		id: 7256,
		description: "",
		name: "Savory",
		slug: "savory",
		details: {
			vibes: [
				{
					name: "Nosh",
					slug: "nosh"
				},
				{
					name: "Tasty",
					slug: "tasty"
				},
				{
					name: "Flavorful",
					slug: "flavorful"
				},
				{
					name: "Spicy",
					slug: "spicy"
				}
			],
			msv: null
		}
	},
	{
		id: 1687,
		description: "Impressive and beautiful views",
		name: "Scenic",
		slug: "scenic",
		details: {
			msv: 380,
			vibes: [
				{
					name: "Outdoorsy",
					slug: "outdoorsy"
				},
				{
					name: "Outdoors",
					slug: "outdoors"
				},
				{
					name: "Views",
					slug: "views"
				},
				{
					name: "Photo",
					slug: "photo"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7259,
		description: "",
		name: "Scuba",
		slug: "scuba",
		details: {
			vibes: [
				{
					name: "Aquatic",
					slug: "aquatic"
				},
				{
					name: "Nautical",
					slug: "nautical"
				}
			],
			msv: null
		}
	},
	{
		id: 7265,
		description: "",
		name: "Seasonal",
		slug: "seasonal",
		details: [
		]
	},
	{
		id: 3258,
		description: "",
		name: "Secret",
		slug: "secret",
		details: {
			vibes: [
				{
					name: "Hidden Gem",
					slug: "hidden-gem"
				}
			],
			msv: null
		}
	},
	{
		id: 7268,
		description: "Take care of yourself",
		name: "Self Care",
		slug: "selfcare",
		details: {
			msv: 400,
			vibes: [
				{
					name: "Healthy",
					slug: "healthy"
				},
				{
					name: "Positive",
					slug: "positive"
				},
				{
					name: "Rejuvenating",
					slug: "rejuvenating"
				},
				{
					name: "Relaxing",
					slug: "relaxing"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7274,
		description: "Invoking the senses",
		name: "Sensual",
		slug: "sensual",
		details: {
			vibes: [
				{
					name: "Love",
					slug: "love"
				},
				{
					name: "Intimate",
					slug: "intimate"
				},
				{
					name: "Romantic",
					slug: "romantic"
				},
				{
					name: "Soulful",
					slug: "soulful"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7271,
		description: "",
		name: "Serene",
		slug: "serene",
		details: {
			vibes: [
				{
					name: "Peaceful",
					slug: "peaceful"
				},
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Calm",
					slug: "calm-2"
				},
				{
					name: "Quiet Energy",
					slug: "calm"
				}
			],
			msv: null
		}
	},
	{
		id: 7654,
		description: "",
		name: "Sexy",
		slug: "sexy",
		details: {
			vibes: [
				{
					name: "Lush",
					slug: "lush"
				},
				{
					name: "Red-Hot",
					slug: "red-hot"
				},
				{
					name: "Juicy",
					slug: "juicy"
				},
				{
					name: "Beautiful",
					slug: "beautiful"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7277,
		description: "Shakin' &amp; swayin'",
		name: "Shimmy",
		slug: "shimmy",
		details: {
			vibes: [
				{
					name: "Dance",
					slug: "dance"
				},
				{
					name: "Jazzy",
					slug: "jazzy"
				},
				{
					name: "Turned Up",
					slug: "turnedup"
				},
				{
					name: "Lit",
					slug: "lit"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7262,
		description: "Shop till you drop",
		name: "Shopaholic",
		slug: "shopaholic",
		details: {
			vibes: [
				{
					name: "Glam",
					slug: "glam"
				},
				{
					name: "Treat Yourself",
					slug: "treatyourself"
				},
				{
					name: "Stylish",
					slug: "stylish"
				}
			],
			msv: null
		}
	},
	{
		id: 7280,
		description: "",
		name: "Silly",
		slug: "silly",
		details: {
			msv: 140,
			vibes: [
				{
					name: "Fun",
					slug: "fun"
				},
				{
					name: "Funny",
					slug: "funny"
				}
			]
		}
	},
	{
		id: 7283,
		description: "",
		name: "Simple",
		slug: "simple",
		details: {
			msv: 70
		}
	},
	{
		id: 7286,
		description: "",
		name: "Singing",
		slug: "singing",
		details: [
		]
	},
	{
		id: 7289,
		description: "",
		name: "Skate",
		slug: "skate",
		details: [
		]
	},
	{
		id: 7292,
		description: "",
		name: "Slurpy",
		slug: "slurpy",
		details: {
			vibes: [
				{
					name: "Juicy",
					slug: "juicy"
				},
				{
					name: "Warm",
					slug: "warm"
				}
			],
			msv: null
		}
	},
	{
		id: 7295,
		description: "",
		name: "Small",
		slug: "small",
		details: {
			msv: 20
		}
	},
	{
		id: 7298,
		description: "",
		name: "Smokey",
		slug: "smokey",
		details: {
			vibes: [
				{
					name: "Outdoorsy",
					slug: "outdoorsy"
				},
				{
					name: "Woodsy",
					slug: "woodsy"
				},
				{
					name: "Forest",
					slug: "forest"
				},
				{
					name: "Old School",
					slug: "oldschool"
				},
				{
					name: "Old World",
					slug: "old-world"
				},
				{
					name: "Nostalgic",
					slug: "nostalgic"
				}
			],
			msv: null
		}
	},
	{
		id: 7304,
		description: "",
		name: "Snacky",
		slug: "snacky",
		details: {
			vibes: [
				{
					name: "Nosh",
					slug: "nosh"
				},
				{
					name: "Tasty",
					slug: "tasty"
				},
				{
					name: "Casual",
					slug: "casual"
				}
			],
			msv: null
		}
	},
	{
		id: 7307,
		description: "",
		name: "Snowy",
		slug: "snowy",
		details: {
			vibes: [
				{
					name: "Wintry",
					slug: "wintry"
				},
				{
					name: "Frosty",
					slug: "frosty"
				},
				{
					name: "Cold",
					slug: "cold"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7310,
		description: "",
		name: "Sober",
		slug: "sober",
		details: [
		]
	},
	{
		id: 5514,
		description: "Get together with good energy",
		name: "Social",
		slug: "social",
		details: {
			vibes: [
				{
					name: "Togetherness",
					slug: "together"
				},
				{
					name: "Friendly",
					slug: "friendly"
				}
			],
			msv: null
		}
	},
	{
		id: 7301,
		description: "",
		name: "Social",
		slug: "social-2",
		details: {
			vibes: [
				{
					name: "Popular",
					slug: "popular"
				}
			],
			msv: null
		}
	},
	{
		id: 7313,
		description: "",
		name: "Soothing",
		slug: "soothing",
		details: [
		]
	},
	{
		id: 7316,
		description: "",
		name: "Sophisticated",
		slug: "sophisticated",
		details: [
		]
	},
	{
		id: 5590,
		description: "",
		name: "Soulful",
		slug: "soulful",
		details: {
			msv: 40,
			vibes: [
				{
					name: "Moody",
					slug: "moody"
				}
			]
		}
	},
	{
		id: 7319,
		description: "",
		name: "Sparkly",
		slug: "sparkly",
		details: {
			vibes: [
				{
					name: "Colorful",
					slug: "colorful"
				},
				{
					name: "Glitter",
					slug: "glitter"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7322,
		description: "",
		name: "Special",
		slug: "special",
		details: {
			msv: 90
		}
	},
	{
		id: 4026,
		description: "",
		name: "Spicy",
		slug: "spicy",
		details: {
			msv: 80,
			vibes: [
				{
					name: "Authentic",
					slug: "authentic"
				},
				{
					name: "Red-Hot",
					slug: "red-hot"
				},
				{
					name: "Sexy",
					slug: "sexy"
				}
			]
		}
	},
	{
		id: 7744,
		description: "",
		name: "Spirited",
		slug: "spirited",
		details: {
			vibes: [
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Adventurous",
					slug: "adventurous"
				},
				{
					name: "Bold",
					slug: "bold"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7642,
		description: "",
		name: "Spiritual",
		slug: "spiritual",
		details: {
			vibes: [
				{
					name: "Supernatural",
					slug: "supernatural"
				}
			],
			msv: null
		}
	},
	{
		id: 7325,
		description: "Go with the flow",
		name: "Spontaneous",
		slug: "spontaneous",
		details: {
			msv: 800,
			vibes: [
				{
					name: "Exciting",
					slug: "exciting"
				},
				{
					name: "Unexpected",
					slug: "unexpected"
				},
				{
					name: "Explore",
					slug: "explore"
				}
			]
		}
	},
	{
		id: 5312,
		description: "",
		name: "Spooky",
		slug: "spooky",
		details: {
			msv: 140,
			vibes: [
				{
					name: "Witchy",
					slug: "witchy"
				},
				{
					name: "Paranormal",
					slug: "paranormal"
				},
				{
					name: "Supernatural",
					slug: "supernatural"
				},
				{
					name: "Halloween",
					slug: "halloween"
				}
			]
		}
	},
	{
		id: 5687,
		description: "",
		name: "Sporty",
		slug: "sporty",
		details: {
			vibes: [
				{
					name: "Healthy",
					slug: "healthy"
				}
			],
			msv: null
		}
	},
	{
		id: 7738,
		description: "",
		name: "Staycation",
		slug: "staycation",
		details: {
			vibes: false,
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7328,
		description: "",
		name: "Strange",
		slug: "strange",
		details: {
			msv: 40,
			vibes: [
				{
					name: "Unique",
					slug: "unique"
				}
			]
		}
	},
	{
		id: 3676,
		description: "",
		name: "Street Art",
		slug: "street-art",
		details: [
		]
	},
	{
		id: 7648,
		description: "",
		name: "Stylish",
		slug: "stylish",
		details: {
			vibes: [
				{
					name: "Fashionista",
					slug: "fashionista"
				},
				{
					name: "Fashion",
					slug: "fashion"
				},
				{
					name: "Trendy",
					slug: "trendy"
				}
			],
			msv: null
		}
	},
	{
		id: 7331,
		description: "",
		name: "Sublime",
		slug: "sublime",
		details: {
			msv: 40,
			vibes: [
				{
					name: "Fantastic",
					slug: "fantastic"
				}
			]
		}
	},
	{
		id: 6552,
		description: "Currents of taste",
		name: "Trendy",
		slug: "trendy",
		details: {
			msv: null
		}
	},
	{
		id: 7370,
		description: "Unexpectedly different",
		name: "Trippy",
		slug: "trippy",
		details: {
			vibes: [
				{
					name: "Farout",
					slug: "farout"
				},
				{
					name: "Colorful",
					slug: "colorful"
				},
				{
					name: "Unexpected",
					slug: "unexpected"
				},
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Radical",
					slug: "radical"
				}
			],
			categories: false,
			search_term: "",
			msv: 20,
			vibeset: false
		}
	},
	{
		id: 5658,
		description: "Warm and lush",
		name: "Tropical",
		slug: "tropical",
		details: {
			vibes: [
				{
					name: "Warm",
					slug: "warm"
				},
				{
					name: "Colorful",
					slug: "colorful"
				},
				{
					name: "Tiki",
					slug: "tiki"
				},
				{
					name: "Natural",
					slug: "natural"
				},
				{
					name: "Aquatic",
					slug: "aquatic"
				},
				{
					name: "Outdoorsy",
					slug: "outdoorsy"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7373,
		description: "",
		name: "Trust",
		slug: "trust",
		details: [
		]
	},
	{
		id: 7355,
		description: "Volume to 11",
		name: "Turned Up",
		slug: "turnedup",
		details: {
			vibes: [
				{
					name: "Lively",
					slug: "lively"
				},
				{
					name: "Lit",
					slug: "lit"
				},
				{
					name: "Drip",
					slug: "drip"
				},
				{
					name: "Dance",
					slug: "dance"
				},
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Hi Fi",
					slug: "hifi"
				},
				{
					name: "Loud",
					slug: "loud"
				}
			],
			categories: false,
			search_term: "",
			msv: 20,
			vibeset: false
		}
	},
	{
		id: 7379,
		description: "",
		name: "Ugly",
		slug: "ugly",
		details: [
		]
	},
	{
		id: 5605,
		description: "If you know, you know",
		name: "Underground",
		slug: "underground",
		details: {
			msv: 400,
			vibes: [
				{
					name: "Hidden Gem",
					slug: "hidden-gem"
				},
				{
					name: "Secret",
					slug: "secret"
				},
				{
					name: "Cool",
					slug: "cool"
				},
				{
					name: "Deep Cut",
					slug: "deepcut"
				},
				{
					name: "Punk",
					slug: "punk"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7382,
		description: "",
		name: "Unexpected",
		slug: "unexpected",
		details: [
		]
	},
	{
		id: 5553,
		description: "",
		name: "Unique",
		slug: "unique",
		details: {
			msv: 400,
			vibes: [
				{
					name: "Unexpected",
					slug: "unexpected"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 5625,
		description: "",
		name: "Upscale",
		slug: "upscale",
		details: [
		]
	},
	{
		id: 5559,
		description: "",
		name: "Urban",
		slug: "urban",
		details: {
			msv: 40
		}
	},
	{
		id: 7376,
		description: "",
		name: "Utopian",
		slug: "utopian",
		details: [
		]
	},
	{
		id: 7582,
		description: "",
		name: "Vacation",
		slug: "vacation",
		details: {
			msv: 140,
			vibes: [
				{
					name: "Tourist",
					slug: "tourist"
				},
				{
					name: "Fun",
					slug: "fun"
				},
				{
					name: "Family",
					slug: "family"
				},
				{
					name: "Relaxing",
					slug: "relaxing"
				},
				{
					name: "Warm",
					slug: "warm"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7666,
		description: "Be mine &lt;3",
		name: "Valentine",
		slug: "valentine",
		details: {
			vibes: [
				{
					name: "Love",
					slug: "love"
				},
				{
					name: "Romantic",
					slug: "romantic"
				},
				{
					name: "Date Spot",
					slug: "datespot"
				},
				{
					name: "Intimate",
					slug: "intimate"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: [
				399
			]
		}
	},
	{
		id: 7585,
		description: "",
		name: "Vast",
		slug: "vast",
		details: [
		]
	},
	{
		id: 1785,
		description: "Conscious eating and good greens",
		name: "Vegan",
		slug: "vegan",
		details: {
			msv: 700,
			vibes: [
				{
					name: "Vegetarian",
					slug: "vegetarian"
				},
				{
					name: "In-solidarity",
					slug: "solidarity"
				},
				{
					name: "Healthy",
					slug: "healthy"
				},
				{
					name: "Organic",
					slug: "organic"
				}
			],
			categories: [
				{
					term_id: 6331,
					name: "Food",
					slug: "food",
					term_group: 0,
					term_taxonomy_id: 6331,
					taxonomy: "activity",
					description: "",
					parent: 6295,
					count: 27,
					filter: "raw"
				}
			],
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7588,
		description: "",
		name: "Vegetarian",
		slug: "vegetarian",
		details: {
			msv: 200,
			vibes: [
				{
					name: "Vegan",
					slug: "vegan"
				},
				{
					name: "Organic",
					slug: "organic"
				},
				{
					name: "Healthy",
					slug: "healthy"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 1906,
		description: "Full of energy and life",
		name: "Vibrant",
		slug: "vibrant",
		details: [
		]
	},
	{
		id: 7597,
		description: "Pleasing landscapes or environments",
		name: "Views",
		slug: "views",
		details: {
			msv: 1400,
			vibes: [
				{
					name: "Scenic",
					slug: "scenic"
				},
				{
					name: "Tourist",
					slug: "tourist"
				},
				{
					name: "Beautiful",
					slug: "beautiful"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 5638,
		description: "In and of the past",
		name: "Vintage",
		slug: "vintage",
		details: {
			msv: 1300,
			vibes: [
				{
					name: "Nostalgic",
					slug: "nostalgic"
				},
				{
					name: "Thrift",
					slug: "thrift"
				},
				{
					name: "Retro",
					slug: "retro"
				},
				{
					name: "Analog",
					slug: "analog"
				},
				{
					name: "Old School",
					slug: "oldschool"
				},
				{
					name: "Traditional",
					slug: "traditional"
				},
				{
					name: "Authentic",
					slug: "authentic"
				},
				{
					name: "Throwback",
					slug: "throwback"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7591,
		description: "",
		name: "VIP",
		slug: "vip",
		details: {
			msv: 320
		}
	},
	{
		id: 7594,
		description: "",
		name: "Visionary",
		slug: "visionary",
		details: [
		]
	},
	{
		id: 7600,
		description: "Helping other and giving back",
		name: "Volunteer",
		slug: "volunteer",
		details: {
			msv: 400,
			vibes: [
				{
					name: "Civic",
					slug: "civic"
				},
				{
					name: "Community",
					slug: "community"
				},
				{
					name: "In-solidarity",
					slug: "solidarity"
				},
				{
					name: "Proud",
					slug: "proud"
				}
			],
			categories: [
				{
					term_id: 6293,
					name: "Community",
					slug: "community",
					term_group: 0,
					term_taxonomy_id: 6293,
					taxonomy: "activity",
					description: "",
					parent: 6295,
					count: 12,
					filter: "raw"
				}
			],
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7630,
		description: "",
		name: "Walk",
		slug: "walk",
		details: {
			vibes: [
				{
					name: "Urban",
					slug: "urban"
				},
				{
					name: "Active",
					slug: "active"
				},
				{
					name: "Healthy",
					slug: "healthy"
				},
				{
					name: "Outdoorsy",
					slug: "outdoorsy"
				},
				{
					name: "Hiking",
					slug: "hiking"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7633,
		description: "",
		name: "Wander",
		slug: "wander",
		details: [
		]
	},
	{
		id: 7681,
		description: "",
		name: "Wanderlust",
		slug: "wanderlust",
		details: {
			vibes: [
				{
					name: "Adventurous",
					slug: "adventurous"
				},
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Exciting",
					slug: "exciting"
				}
			],
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 5678,
		description: "",
		name: "Warm",
		slug: "warm",
		details: {
			msv: 260
		}
	},
	{
		id: 5661,
		description: "",
		name: "Waterfront",
		slug: "waterfront",
		details: {
			msv: 300,
			vibes: [
				{
					name: "Aquatic",
					slug: "aquatic"
				},
				{
					name: "Nautical",
					slug: "nautical"
				},
				{
					name: "Airy",
					slug: "airy"
				},
				{
					name: "Scenic",
					slug: "scenic"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 5681,
		description: "",
		name: "Weekend",
		slug: "weekend",
		details: {
			msv: 480,
			vibes: [
				{
					name: "Fun",
					slug: "fun"
				},
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Social",
					slug: "social"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 5672,
		description: "",
		name: "Weird",
		slug: "weird",
		details: {
			msv: 60
		}
	},
	{
		id: 7687,
		description: "",
		name: "Welcoming",
		slug: "welcoming",
		details: {
			vibes: false,
			categories: false,
			search_term: "",
			msv: 10,
			vibeset: false
		}
	},
	{
		id: 7636,
		description: "",
		name: "Western",
		slug: "western",
		details: [
		]
	},
	{
		id: 7603,
		description: "Carefree and playful amusement",
		name: "Whimsical",
		slug: "whimsical",
		details: {
			msv: 20
		}
	},
	{
		id: 7639,
		description: "",
		name: "Wholesome",
		slug: "wholesome",
		details: [
		]
	},
	{
		id: 6747,
		description: "Natural and uninhibited",
		name: "Wild",
		slug: "wild",
		details: {
			msv: 220,
			vibes: [
				{
					name: "Playful",
					slug: "playful"
				},
				{
					name: "Playtime",
					slug: "playtime"
				},
				{
					name: "Dreamy",
					slug: "dreamy"
				},
				{
					name: "Eclectic",
					slug: "eclectic"
				},
				{
					name: "Quirky",
					slug: "quirky"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7612,
		description: "",
		name: "Wintry",
		slug: "wintry",
		details: [
		]
	},
	{
		id: 7606,
		description: "In possession of the supernatural",
		name: "Witchy",
		slug: "witchy",
		details: {
			msv: 140,
			vibes: [
				{
					name: "Magical",
					slug: "magical"
				},
				{
					name: "Spiritual",
					slug: "spiritual"
				},
				{
					name: "Radical",
					slug: "radical"
				},
				{
					name: "Quirky",
					slug: "quirky"
				},
				{
					name: "Mysterious",
					slug: "mysterious"
				},
				{
					name: "Mystic",
					slug: "mystic"
				},
				{
					name: "Botanical",
					slug: "botanical"
				},
				{
					name: "Wild",
					slug: "wild"
				},
				{
					name: "Eclectic",
					slug: "eclectic"
				}
			],
			categories: false,
			search_term: "",
			vibeset: false
		}
	},
	{
		id: 7609,
		description: "",
		name: "Woodsy",
		slug: "woodsy",
		details: [
		]
	},
	{
		id: 7615,
		description: "",
		name: "Yoga",
		slug: "yoga",
		details: {
			msv: 260
		}
	},
	{
		id: 7618,
		description: "",
		name: "Young",
		slug: "young",
		details: [
		]
	},
	{
		id: 7621,
		description: "",
		name: "Yuletide",
		slug: "yuletide",
		details: [
		]
	},
	{
		id: 5655,
		description: "",
		name: "Zen",
		slug: "zen",
		details: {
			msv: 90,
			vibes: [
				{
					name: "Chill",
					slug: "chill"
				},
				{
					name: "Peaceful",
					slug: "peaceful"
				}
			]
		}
	}
];

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
				}
			],
			icon: "artLogo"
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
			icon: "communityLogo",
			vibes: [
				{
					name: "Community",
					slug: "community"
				}
			]
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
			],
			msv: "90",
			icon: "drinkingLogo"
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
			],
			msv: "246",
			icon: "eventsIcon"
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
			vibeset: false,
			vibes: [
			],
			msv: "1500",
			icon: "foodLogo"
		}
	},
	{
		id: 6307,
		description: "",
		name: "Gallery",
		slug: "gallery",
		parent: 6291,
		details: [
		]
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

const GATSBY_WP_BASEURL = 'https://cms.vibemap.com';
const REST_PATH = '/wp-json/wp/v2/';

const helpers = require('./helpers.js');

// Cached Wordpress taxonomies for reference
// Note: this data is stored everytime this library is versioned.
const postCategories = require('../dist/postCategories');

const defaultFilters = {
  categories: [],
  cities: [],
  vibesets: [],
  vibes: []
};

// Get a list of Wordpress taxonomy or category ids by slug
// If empty, i.e. the slug isn't use, returns an empty array,
// which will search for everything.
const getTaxonomyIds = (type, filter) => {
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
    console.log('Filtering neighborhoods by: ', filters);

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
    console.log('fetchVibeTaxonomy ', endpoint);
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
  ]
) => {
  const apiFilters = `?_fields=${fields.join(',')}`;
  const endpoint = `${GATSBY_WP_BASEURL}${REST_PATH}posts${apiFilters}`;

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
  }).catch((error) => console.error(error));

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

exports.fetchActivityCategories = fetchActivityCategories;
exports.fetchBadges = fetchBadges;
exports.fetchCategories = fetchCategories;
exports.fetchCities = fetchCities;
exports.fetchNeighborhoods = fetchNeighborhoods;
exports.fetchVibeTaxonomy = fetchVibeTaxonomy;
exports.filterNeighborhoods = filterNeighborhoods;
exports.getCityInfo = getCityInfo;
exports.getPosts = getPosts;
exports.getTaxonomyIds = getTaxonomyIds;
