'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var LinearScale = require('linear-scale');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var LinearScale__default = /*#__PURE__*/_interopDefaultLegacy(LinearScale);

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
			light: "#fef483",
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
			pastel: "#b4ffd9",
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
			light: "#5172bf",
			pastel: "#cad8f9",
			primary: "#1d54d7"
		},
		purple: {
			bright: "#9100ff",
			deep: "#4e0089",
			light: "#d391fa",
			pastel: "#e5d0ff",
			primary: "#b34eff"
		},
		magenta: {
			bright: "#ff00ff",
			deep: "#7e1a65",
			light: "#e779b8",
			pastel: "#ffc4ff",
			primary: "#c400c4"
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
		absurd: {
			primary: "#a8f36a",
			secondary: "#00ffe4"
		},
		active: {
			primary: "#64ff00",
			secondary: "#c4f7f4"
		},
		activist: {
			primary: "#e779b8",
			secondary: "#ef9b0d"
		},
		adventurous: {
			primary: "#64ff00",
			secondary: "#00cec8",
			tertiary: "#c4f7f4"
		},
		alternative: {
			primary: "#f7941d",
			secondary: "#ffc947"
		},
		airy: {
			primary: "#fff3e0",
			secondary: "#f1ffcf"
		},
		analog: {
			primary: "#205273",
			secondary: "#ef7200"
		},
		antique: {
			primary: "#d99566",
			secondary: "#57b5b1"
		},
		artisanal: {
			primary: "#ffccbc",
			secondary: "#b4ffd9"
		},
		architectural: {
			primary: "#c400c4",
			secondary: "#fff3e0"
		},
		artsy: {
			primary: "#d391fa",
			secondary: "#006e59"
		},
		aquatic: {
			primary: "#0000ff",
			secondary: "#00ffe4"
		},
		art: {
			primary: "#d391fa",
			secondary: "#00cec8"
		},
		authentic: {
			primary: "#f7941d",
			secondary: "#b34eff"
		},
		aware: {
			primary: "#9100ff",
			secondary: "#00ffe4",
			tertiary: "#fff3e0"
		},
		beautiful: {
			primary: "#e5d0ff",
			secondary: "#e779b8"
		},
		belonging: {
			primary: "#f7941d",
			secondary: "#fdff00"
		},
		blissful: {
			primary: "#e779b8",
			secondary: "#f1ffcf"
		},
		boho: {
			primary: "#fff3e0",
			secondary: "#c66900"
		},
		bold: {
			primary: "#ef7200",
			secondary: "#ffc4ff"
		},
		boozy: {
			primary: "#ff5722",
			secondary: "#dd2c00"
		},
		botanical: {
			primary: "#b4ffd9",
			secondary: "#006e59"
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
			primary: "#c66900",
			secondary: "#fded35",
			tertiary: "#ffc947"
		},
		calm: {
			primary: "#ffffe4",
			secondary: "#d4ffdc",
			tertiary: "#3cd8ff"
		},
		celebration: {
			primary: "#ff9800",
			secondary: "#f1ffcf"
		},
		celebratory: {
			primary: "#ff9800",
			secondary: "#d391fa"
		},
		charming: {
			primary: "#cad8f9",
			secondary: "#e5d0ff"
		},
		cheerful: {
			primary: "#ffc4ff",
			secondary: "#fff3e0"
		},
		chill: {
			primary: "#a0e5f7",
			secondary: "#ffccbc",
			tertiary: "#f1ffcf"
		},
		cinematic: {
			primary: "#205273",
			secondary: "#d391fa"
		},
		civic: {
			primary: "#00cec8",
			secondary: "#205273"
		},
		classic: {
			primary: "#e55929",
			secondary: "#c400c4"
		},
		colorful: {
			primary: "#ff00ff",
			secondary: "#00cec8"
		},
		community: {
			primary: "#ffccbc",
			secondary: "#c400c4"
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
		collectable: {
			primary: "#d391fa",
			secondary: "#f1ffcf"
		},
		cozy: {
			primary: "#ffffe4",
			secondary: "#cad8f9"
		},
		cultural: {
			primary: "#b34eff",
			secondary: "#ff00ff"
		},
		curious: {
			primary: "#00cec8",
			secondary: "#ef9b0d"
		},
		cute: {
			primary: "#e779b8",
			secondary: "#fded35"
		},
		creative: {
			primary: "#a0e5f7",
			secondary: "#9100ff"
		},
		crowded: {
			primary: "#000045",
			secondary: "#ffccbc"
		},
		datespot: {
			primary: "#ff00ff",
			secondary: "#ff0000"
		},
		drip: {
			primary: "#e55929",
			secondary: "#4e0089"
		},
		diverse: {
			primary: "#e5d0ff",
			secondary: "#00ffe4"
		},
		diy: {
			primary: "#5172bf",
			secondary: "#d391fa"
		},
		dreamy: {
			primary: "#d391fa",
			secondary: "#a0e5f7",
			tertiary: "#f1ffcf"
		},
		drinking: {
			primary: "#ff5722",
			secondary: "#dd2c00"
		},
		dynamic: {
			primary: "#9100ff",
			secondary: "#78ec6c"
		},
		eclectic: {
			primary: "#ffffe4",
			secondary: "#64ff00"
		},
		edgy: {
			primary: "#1d54d7",
			secondary: "#fff3e0"
		},
		energetic: {
			primary: "#ffc947",
			secondary: "#fded35",
			tertiary: "#c66900"
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
			primary: "#f1ffcf",
			secondary: "#9100ff"
		},
		festive: {
			primary: "#ffc947",
			secondary: "#ff00ff"
		},
		fierce: {
			primary: "#a30000",
			secondary: "#ffccbc"
		},
		folk: {
			primary: "#a30000",
			secondary: "#fded35"
		},
		fragrant: {
			primary: "#b4ffd9",
			secondary: "#d4ffdc"
		},
		friendly: {
			primary: "#3cd8ff",
			secondary: "#d391fa"
		},
		fun: {
			primary: "#ffffe4",
			secondary: "#00ffe4"
		},
		funny: {
			primary: "#00cec8",
			secondary: "#fded35"
		},
		generous: {
			primary: "#2d76cc",
			secondary: "#a8f36a"
		},
		happy: {
			primary: "#ef9b0d",
			secondary: "#d4ffdc"
		},
		healthy: {
			primary: "#c4f7f4",
			secondary: "#58e86b"
		},
		hippie: {
			primary: "#ffc4ff",
			secondary: "#ff9800"
		},
		historic: {
			primary: "#c66900",
			secondary: "#fff3e0"
		},
		hopeful: {
			primary: "#f7941d",
			secondary: "#d4ffdc"
		},
		inclusive: {
			primary: "#6b00d7",
			secondary: "#61ecb2"
		},
		iconic: {
			primary: "#7e1a65",
			secondary: "#ffc4ff"
		},
		inspired: {
			primary: "#b4ffd9",
			secondary: "#58e86b"
		},
		intimate: {
			primary: "#dd2c00",
			secondary: "#ffccbc"
		},
		joyful: {
			primary: "#3cd8ff",
			secondary: "#ffc4ff"
		},
		kitschy: {
			primary: "#ffccbc",
			secondary: "#006e59"
		},
		legacy: {
			primary: "#d391fa",
			secondary: "#e5d0ff"
		},
		lit: {
			primary: "#fded35",
			secondary: "#ff0000"
		},
		lively: {
			primary: "#ff5722",
			secondary: "#61ecb2"
		},
		local: {
			primary: "#ff00ff",
			secondary: "#a8f36a"
		},
		loud: {
			primary: "#ff5722",
			secondary: "#64ff00"
		},
		love: {
			primary: "#c400c4",
			secondary: "#b34eff"
		},
		magical: {
			primary: "#ef9b0d",
			secondary: "#c400c4"
		},
		mindful: {
			primary: "#fef483",
			secondary: "#d99566"
		},
		minimalist: {
			primary: "#e2e2ed",
			secondary: "#c4f7f4"
		},
		moody: {
			primary: "#ffccbc",
			secondary: "#190087"
		},
		musical: {
			primary: "#00ffe4",
			secondary: "#9100ff"
		},
		mystic: {
			primary: "#f1ffcf",
			secondary: "#c400c4"
		},
		natural: {
			primary: "#61ecb2",
			secondary: "#ffccbc"
		},
		neon: {
			primary: "#fdff00",
			secondary: "#64ff00"
		},
		"new": {
			primary: "#64ff00",
			secondary: "#e5d0ff"
		},
		nostalgic: {
			primary: "#fff3e0",
			secondary: "#190087",
			tertiary: "#d99566"
		},
		old: {
			primary: "#57b5b1",
			secondary: "#ffccbc"
		},
		"old-school": {
			primary: "#190087",
			secondary: "#d99566",
			tertiary: "#fff3e0"
		},
		outdoors: {
			primary: "#78ec6c",
			secondary: "#3cd8ff"
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
			secondary: "#ffc947"
		},
		peaceful: {
			primary: "#3cd8ff",
			secondary: "#fff3e0"
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
			primary: "#0000ff",
			secondary: "#3cd8ff"
		},
		positive: {
			primary: "#ffc4ff",
			secondary: "#fded35"
		},
		quiet: {
			primary: "#cad8f9",
			secondary: "#57b5b1"
		},
		quiet_energy: {
			primary: "#3cd8ff",
			secondary: "#b4ffd9",
			tertiary: "#ffffe4"
		},
		radical: {
			primary: "#c400c4",
			secondary: "#00ffe4"
		},
		rebel: {
			primary: "#205273",
			secondary: "#ffccbc"
		},
		relaxing: {
			primary: "#2d76cc",
			secondary: "#c4f7f4"
		},
		retro: {
			primary: "#2d76cc",
			secondary: "#ef9b0d"
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
		sensual: {
			primary: "#7e1a65",
			secondary: "#ffccbc"
		},
		serene: {
			primary: "#d4ffdc",
			secondary: "#fded35"
		},
		shimmy: {
			primary: "#d391fa",
			secondary: "#2d76cc"
		},
		sleepy: {
			primary: "#57b5b1",
			secondary: "#cad8f9"
		},
		social: {
			primary: "#ff0000",
			secondary: "#ffccbc",
			tertiary: "#f1ffcf"
		},
		solidarity: {
			primary: "#9100ff",
			secondary: "#00ffe4",
			tertiary: "#fff3e0"
		},
		spiritual: {
			primary: "#4e0089",
			secondary: "#ffc4ff"
		},
		spontaneous: {
			primary: "#e5d0ff",
			secondary: "#ffc4ff"
		},
		throwback: {
			primary: "#7e1a65",
			secondary: "#9100ff"
		},
		together: {
			primary: "#ff0000",
			secondary: "#ffccbc",
			tertiary: "#f1ffcf"
		},
		trendy: {
			primary: "#fef483",
			secondary: "#ff00ff"
		},
		trending: {
			primary: "#ffc947",
			secondary: "#d391fa"
		},
		tropical: {
			primary: "#54ff95",
			secondary: "#ff00ff"
		},
		trust: {
			primary: "#ffc947",
			secondary: "#e779b8"
		},
		underground: {
			primary: "#1d54d7",
			secondary: "#d391fa"
		},
		unique: {
			primary: "#0000ff",
			secondary: "#e5d0ff"
		},
		vibrant: {
			primary: "#9100ff",
			secondary: "#ffccbc"
		},
		views: {
			primary: "#3cd8ff",
			secondary: "#a0e5f7"
		},
		vintage: {
			primary: "#d99566",
			secondary: "#dd2c00"
		},
		volunteer: {
			primary: "#ff9800",
			secondary: "#a8f36a"
		},
		whimsical: {
			primary: "#3cd8ff",
			secondary: "#54ff95"
		},
		wild: {
			primary: "#00b459",
			secondary: "#006e59"
		},
		wistful: {
			primary: "#ffc947",
			secondary: "#ffc4ff"
		},
		witchy: {
			primary: "#e779b8",
			secondary: "#a30000"
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
var column = {
	gap: {
		desktop: "1.5rem",
		mobile: "0.5rem",
		list: "1.75rem"
	}
};
var margin = {
	center: "0 auto"
};
var padding = {
	item: "2.5rem",
	section: "3.5rem"
};
var post = {
	text: {
		block: {
			heading: 30,
			subheading: 18
		},
		card: {
			title: 20,
			description: 14,
			category: 16
		},
		caption: 16,
		category: 18,
		cite: 16,
		heading: {
			title: 36,
			subheading: 30,
			heading1: 36,
			heading2: 34,
			heading3: 30,
			heading4: 26,
			heading5: 20,
			heading6: 18
		},
		list: 18,
		info: 16,
		paragraph: 18,
		pullquote: 32
	}
};
var transitions = {
	base: {
		"default": "0.35s ease !default"
	}
};
var font = {
	family: {
		sans: "Public Sans",
		serif: "Nantes"
	},
	height: {
		base: 1.2,
		large: 1.6,
		small: 1,
		tall: 1.8,
		none: 0
	},
	size: {
		base: 16,
		normal: 16,
		small: 14,
		tiny: 12,
		micro: 10,
		large: 18
	},
	weight: {
		base: 300,
		light: 200,
		normal: 300,
		link: 400,
		medium: 500,
		bold: 700
	}
};
var units = {
	base: {
		base: 4,
		huge: 12,
		large: 8,
		nano: 0.4,
		small: 2,
		tiny: 1
	}
};
var variables = {
	asset: asset,
	color: color,
	column: column,
	"line-height": {
	tall: 1.8,
	large: 1.6,
	base: 1.2,
	small: 1,
	none: 0
},
	margin: margin,
	padding: padding,
	post: post,
	transitions: transitions,
	font: font,
	units: units
};

const jsonpack = require('jsonpack');

let allVibes = [];
let vibeRelations = [];

try {
    // Unpack compressed vibes data
    const vibeTaxonomyPacked = require('../dist/vibesFromCMSTaxonomy.zip.json');
    allVibes = jsonpack.unpack(vibeTaxonomyPacked);

    const vibeRelationsPacked = require('../dist/vibeRelations.zip.json');
    vibeRelations = jsonpack.unpack(vibeRelationsPacked);

} catch (error) {
    console.log('Error upacking vibes ', error);
}

// Get vibe attributes
const getVibeInfo = (vibe = 'chill') => {

    const vibeInfo = allVibes.find((item) => item.slug === vibe);

    if (vibeInfo) {
        return vibeInfo
    } else {
        return null
    }
};

const getVibeGradient = (vibe = 'chill') => {
    let color1 = '#DDDDDD';
    let color2 = '#AAAAAA';

    const vibe_styles = variables['color']['vibes'];
    allVibes.filter(item => vibe === item.key);

    const vibeColors = vibe_styles[vibe];

    if (vibe_styles[vibe]) {
        color1 = vibeColors['primary'];
        color2 = vibeColors['secondary'];
    }

    const colorInfo = {
      color1: color1,
      color2: color2,
      gradient: `linear-gradient(44deg, ${color1} 20%, ${color2} 100% )`,
    };

    return colorInfo
};

// Print all vibes
const getVibes = (format = 'keys') => {

    let all = [];

    switch (format) {
        case 'keys':
            all = allVibes.map(vibe => vibe.slug);
            break;

        case 'all':
            all = allVibes;
            break;

        // Else return all object
        default:
            all = allVibes;
            break;
    }

    //console.log('getVibes ', all)
    return all
};


/**
 * getVibePreferences
 * Gets a matrix or list (see returnFormat param) * of preferred vibes for the
 * user's profile
 *
 * @typedef {Object} VibeCheck
 * @property {String[]} vibes
 *
 * @typedef {Object} VibePointEvent
 * @property {'search vibes'|'vibe check'|'vibe'|'check-in'} reason
 * @property {String?} searchVibes
 * @property {String[][]?} vibeCheckVibe
 *
 * @typedef {Object} ExtraData
 * @property {Object<String, Object>} favorites
 * @property {String[]} myVibes
 * @property {VibePointEvent[]} vibePoints
 * @property {Object<String, Object>} upvotedVibes
 * @property {VibeCheck[]} vibeCheckHistory
 *
 * @typedef {Object} Profile
 * @property {ExtraData} extra_data
 *
 * @param {'matrix'|'array'} returnFormat
 * @param {Profile} data
 * @param {Number} threshold  sorts out vibes with a score <= threshold
 * @param {Boolean} normalize bind values between 0 and 1?
 */
const getVibePreferences = (
    // Default to test profile
    returnFormat = 'matrix',
    data = null,
    threshold = 0,
    normalize = true,
) => {
    if (!data || !data.extra_data) {
        throw new Error('getVibePreferences: the data parameter must have a `extra_data` property')
    }
    // this should be imported instead. For testing, hard-coded here
    const allVibes = getVibes('keys');

    //console.log(allVibes.length)
    let matrix = allVibes.map(x => 0.0);

    // weights are currently arbitrarily defined. No hard science, editable
    const weights = {
        "favorites": 1.0,
        "myvibes": 1.0,
        "vibepoints": { "search": 0.1, "vibecheck": 0.4, "save": 0.5 },
        "upvotedvibes": { "vibenames": 0.4, "meta": 0.2 },
        "vibecheckhistory": 0.7,
    };

    const extra_data = data.extra_data;

    if (extra_data.favorites) {
        // favorite place's vibes
        Object.values(extra_data.favorites).forEach((place) => {
            if (!(place && place.properties && place.properties.vibes)) {
                return;
            }

            place.properties.vibes.forEach((vibe) => {
                if (allVibes.includes(vibe)) {
                    const index = allVibes.indexOf(vibe);
                    matrix[index] = matrix[index] + weights.favorites;
                }
            });
        });
    }


    if (extra_data.myVibes) {
        // user's "my vibes"
        extra_data.myVibes.map(function (x) {
            if (allVibes.includes(x)) {
                let index = allVibes.indexOf(x);
                matrix[index] = matrix[index] + weights.myvibes;
            }
        });
    }

    if (extra_data.vibePoints) {
        // should result in 5 absurds
        // any action resulting in vibepoints, use associated vibes of actions
        // in future should include "vibe" and "check-in" as actions, include their vibes as well
        extra_data.vibePoints.forEach((vibePointEvent) => {
            switch (vibePointEvent.reason) {
            case 'search vibes':
                vibePointEvent.searchVibes.forEach((searchedVibe) => {
                    const index = allVibes.indexOf(searchedVibe);
                    matrix[index] = matrix[index] + weights.vibepoints.search;
                });
                break
            case 'vibe check':
                if (!vibePointEvent.vibeCheckVibe[0]) return;
                vibePointEvent.vibeCheckVibe[0].forEach((vibe) => {
                    const index = allVibes.indexOf(vibe);
                    matrix[index] = matrix[index] + weights.vibepoints.vibecheck;
                });
                break
            }
        });
    }

    if (extra_data.upvotedVibes) {
        // tally both meta-data of the place where a vibe was upvoted (place's vibes)
        // as well as the vibes added (upvoted)
        Object.values(extra_data.upvotedVibes).forEach((upvoted) => {
            if (!(upvoted && upvoted.place && upvoted.place.properties && upvoted.place.properties.vibes)) {
                return;
            }

            const upvotedPlaceVibes = upvoted.place.properties.vibes;
            upvotedPlaceVibes.forEach((vibe) => {
                if (allVibes.includes(vibe)) {
                    const index = allVibes.indexOf(vibe);
                    matrix[index] = matrix[index] + weights.upvotedvibes.meta;
                }
            });
            if (!(upvoted && upvoted.vibeNames)) {
                return;
            }
            upvoted.vibeNames.forEach((vibeName) => {
                if (allVibes.includes(vibeName)) {
                    const index = allVibes.indexOf(vibeName);
                    matrix[index] = matrix[index] + weights.upvotedvibes.vibenames;
                }
            });
        });
    }

    if (extra_data.vibeCheckHistory) {
        // vibecheck vibes are tallied as well
        extra_data.vibeCheckHistory.forEach((vibeCheck) => {
            if (!(vibeCheck && vibeCheck.vibes)) {
                return;
            }

            vibeCheck.vibes.forEach((vibes) => {
                vibes.forEach((vibe) => {
                    if (allVibes.includes(vibe)) {
                        const index = allVibes.indexOf(vibe);
                        matrix[index] = matrix[index] + weights.vibecheckhistory;
                    }
                });
            });
        });
    }

    // used for normalization
    const maxScore = matrix.reduce((previousValue, score) => {
        if (score > previousValue) return score;
        return previousValue;
    }, 0);

    // normalize and return matrix
    if (returnFormat === 'matrix') {
        return normalize && maxScore !== 0
            ? matrix.map((score) => score / maxScore)
            : matrix
    }

    // Join the matrix with vibes
    const vibesScored = matrix.map((score, i) => {
        const vibe = allVibes[i];

        return {
            key: vibe,
            score: normalize && maxScore !== 0
                ? score / maxScore
                : score
        }
    });

    // Sort by score in decending order
    const vibesSorted = vibesScored.sort((a,b) => {
        return b.score - a.score
    });

    // Create an object of only vibes with scores
    const onlyPreferredVibes = vibesSorted.filter(vibe => vibe.score > threshold);
    return onlyPreferredVibes.map(({ key }) => key)
};

// Get and sort vibe times
const getVibesFromVibeTimes = (vibeTimes) => {
    const vibes = (vibeTimes && vibeTimes.length > 0)
        ? vibeTimes
            .sort((a,b) => b.score - a.score)
            .map(vibe => vibe.name)
        : [];

    console.log('Handle these vibe times: ', vibeTimes, vibes);

    return vibes
};

const getRelatedVibes = (vibes = ['chill'], similarity = 0.4) => {
	let relatedVibes = [];

    const vibesWithRelated = vibes.flatMap(vibe => {
		const vibeInfo = getVibeInfo(vibe);
		let allRelated = [];

		if (vibeInfo && vibeInfo.related) {
			relatedVibes = relatedVibes.concat(vibeInfo.related);
		}

		if (vibeInfo && vibeInfo.alias) {
			allRelated = relatedVibes.concat([vibeInfo.alias]);
		}

		const similarVibes = vibeRelations[vibe];
		const mostSimilar = [];
		for (vibe in similarVibes) {
			//console.log('Check most similar ', similarVibes[vibe], vibe)
			if (similarVibes[vibe] >= similarity) mostSimilar.push(vibe);
		}

		allRelated = relatedVibes.concat(mostSimilar);
		return allRelated
	});

	// Make it a unqiue set
	const relatedVibesUnique = [...new Set(vibesWithRelated)];

    return relatedVibesUnique
};

// Function derived from hand selecting point values for scaling then modeling exponential function for best fit
const yourvibe_scale_v1 = (x) => {
    let y = 1.061645 * (x**0.289052);

    // Return only values such that 0<=y<=1
    if (y>1) {
        y = 1;
        //console.log("y rounded down to 1")
    } else if (y<0) {
        y = 0;
        //console.log("y rounded up to 0")
    }
    return y
};

const normalize_all = (
  val = 500,
  min = 1,
  max = 100,
  scale_low = 1,
  scale_high = 10
) => {
  var lin_scale = LinearScale__default["default"]()
    .domain([min, max])
    .range([scale_low, scale_high]);

    const normalized = lin_scale(val);

    return normalized
};

/* Function responsible for returning "% Your Vibe" on place page using user inputted vibes (myvibes)
and a place's vibes (placevibes) as input. vibeRelations is a pre-calculated json of lexical relations between
vibe words, generated using Google's pre-trained Word2Vec model
*/
const percent_yourvibe = (myvibes, placevibes) => {
    let my_vibes_fraction = 1/myvibes.length;

    // Running score of your vibe, default to 0
    let yourvibe = 0;

    // Running list of vibes that have relation, but not perfect matches
    var related_vibes = [];

    // fraction_counter tracks total perfect matches between myvibes and placevibes. Subtract from place vibes for remaining vibes to match
    let fraction_counter = 0;
    myvibes.map(vibe_m => {

        // If there's a direct match, add fraction of total number of user vibes as score
        if(placevibes.includes(vibe_m)) {
            yourvibe += my_vibes_fraction;
            fraction_counter += 1;
            //console.log([vibe_m], my_vibes_fraction, fraction_counter)
        }

        // So long as vibes exist in matrix (prevent undefined errors), map place vibes and look for match
        if (vibe_m in vibeRelations) {
          //console.log([vibe_m])

          placevibes.map((vibe_p) => {
            // If match, add corresponding cosine similarity score
            if (vibe_p in vibeRelations[vibe_m]) {
              related_vibes.push(vibeRelations[vibe_m][vibe_p]);
            }
          });
        }
    });

    // Count number of vibes remaining in place that are not direct matches
    let remaining_place_vibes = placevibes.length - fraction_counter;

    // If related vibes are found and not-direct matches are more than 1, combine all scores and take log_matches(related_vibes_score)
    if (related_vibes.length>=1 && (remaining_place_vibes)>1){
        // Change of Base, new variable that will be score normalized for remaining gap
        var remaining_score = Math.log10(10)/Math.log10(20);

    // Avoid Log_1 division by zero/infinite error. Edge Casing
    } else if (related_vibes.length>=1 && (remaining_place_vibes)==1){
        var remaining_score = related_vibes[0];

    // No related matches found, score is zero
    } else {
        var remaining_score = 0;
    }

    // Scaled remaining portion of potential vibe score, for related not direct vibes
    let remaining_score_normalized = normalize_all(remaining_score, 0, 1, 0, (my_vibes_fraction*(myvibes.length-fraction_counter)));

    yourvibe += remaining_score_normalized;
    // Round using vibe scaling function. Default all 0 scores (no relation whatsoever) to 0.5 (50%)
    let yourvibe_rounded = yourvibe_scale_v1(yourvibe);
    if (yourvibe_rounded <= 0){
        yourvibe_rounded = 0.5;
    }

    // Round after multiplying by 100 so not everything is just 1 (0.95 roudns to 1)
    return Math.round(yourvibe_rounded*100)
};

exports.getRelatedVibes = getRelatedVibes;
exports.getVibeGradient = getVibeGradient;
exports.getVibeInfo = getVibeInfo;
exports.getVibePreferences = getVibePreferences;
exports.getVibes = getVibes;
exports.getVibesFromVibeTimes = getVibesFromVibeTimes;
exports.normalize_all = normalize_all;
exports.percent_yourvibe = percent_yourvibe;
exports.yourvibe_scale_v1 = yourvibe_scale_v1;
