'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const SET_ACTIVE_OPTION = 'SET_ACTIVE_OPTION';

const APP_STORE_URL = 'https://apps.apple.com/us/app/vibemap/id1496385897#?platform=iphone';

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.vibemap.hotspots';

const GOOGLE_ANALYTICS_ID = 'UA-144205697-1';

const MAPBOX_STYLE = 'mapbox://styles/stevepepple/cka8kdq0i1dvv1it9nj0l70xn/draft?optimize=true';

const MAPBOX_STYLE_LIGHT = 'mapbox://styles/stevepepple/ck8unzpvf0z5j1itdntgz3lxp';

const DATABASE = 'mongodb://stevepepple:Hotspot1@ds019101.mlab.com:19101/hotspots';

const TIMEOUT = 8000;

const METERS_PER_MILE = 1609.34;

const PURPLE = '#811897';

const TRUCATE_LENGTH = 18;

const HEATMAP_INTENSITY = 0.1;

const ZOOM_ON_DETAILS = 2.0;

const RECOMMENDATION_REASONS = {
    'events': 'This place is happening',
    'rating' : 'People like this spot',
    'vibe': 'Totally your vibe',
    'distance': 'Good bet near you',
};

const zoom_levels = {
    0: 'World ~ 1:500 M',
    1: 'Continent ~ 1:250 M',
    2: 'Subcontinental ~ 1:150 M',
    3: 'Largest country ~ 1:70 M',
    4: 'Large country ~ 1:35 M',
    5: 'African country ~ 1:15 M',
    6: 'Large European country ~ 1:10 M',
    7: 'Large US state ~ 1:4 M',
    8: 'Small US state ~ 1:2 M',
    9: 'Large metro ~ 1:1 M',
    10: 'Small metro ~ 1:500 K',
    11: 'City ~ 1:250 K',
    12: 'Town ~ 1:150 K',
    13: 'Village ~ 1:70 K',
    14: 'Neighborhood ~ 1:35 K',
    15: 'Small road ~ 1:15 K',
    16: 'Street ~ 1:8 K',
    17: 'Block ~ 1:4 K',
    18: 'Buildings & trees ~ 1:2 K',
    19: 'Street detail ~ 1:1 K',
    20: 'Rooftop ~ 1:1 K'
};

const days = [
    {
        key: 0,
        abbr: "Mo",
        name: "Monday"
    },
    {
        key: 1,
        abbr: "Tu",
        name: "Tuesday"
    },
    {
        key: 2,
        abbr: "We",
        name: "Wednesday"
    },
    {
        key: 3,
        abbr: "Th",
        name: "Thursday"
    },
    {
        key: 4,
        abbr: "Fr",
        name: "Friday"
    },
    {
        key: 5,
        abbr: "Sa",
        name: "Saturday"
    },
    {
        key: 6,
        abbr: "Su",
        name: "Sunday"
    },
    {
        key: 7,
        name: "Public"
    },
    {
        key: 8,
        name: "Non Specific"
    }
];

// TODO: Get this from Wordpress taxonomy
const place_sub_categories = [
    {
        name: 'Art Gallery',
        main_category: 'art',
        vibes: ['dreamy']
    },
    {
        name: 'Bakery',
        main_category: 'food',
        vibes: ['together']
    },
    {
        name: 'Bar',
        main_category: 'drinking',
        vibes: ['buzzing']
    },
    {
        name: 'Bookstore',
        main_category: 'shopping',
        vibes: ['solidarity']
    },
    {
        name: 'Beach',
        main_category: 'outdoors',
        vibes: ['chill']
    },
    {
        name: 'Coffee Shop',
        main_category: 'cafe',
        vibes: ['buzzing']
    },
    {
        name: 'Café',
        main_category: 'community',
        vibes: ['solidarity']
    },
    {
        name: 'Café',
        main_category: 'cafe',
        vibes: ['chill']
    },
    {
        name: 'Diner',
        main_category: 'food',
        vibes: ['oldschool']
    },
    {
        name: 'Farmer\'s Market',
        main_category: 'shopping',
        vibes: ['together']
    },
    {
        name: 'Garden',
        main_category: 'outdoors',
        vibes: ['dreamy']
    },
    {
        name: 'Gift Shop',
        main_category: 'shopping',
        vibes: ['dreamy']
    },
    {
        name: 'Ice Cream',
        main_category: 'food',
        vibes: ['together']
    },
    {
        name: 'Landmark',
        main_category: 'visit',
        vibes: ['oldschool']
    },
    {
        main_category: 'museum',
        name: 'Museum',
        vibes: ['together']
    },
    {
        main_category: 'music',
        name: 'Music Venue',
        vibes: ['together', 'solidarity']
    },
    {
        main_category: 'art',
        name: 'Public Art',
        vibes: ['together']
    },
    {
        main_category: 'outdoors',
        name: 'Park',
        vibes: ['together']
    },
    {
        main_category: 'games',
        name: 'Playground',
        vibes: ['playful']
    },
    {
        main_category: 'outdoors',
        name: 'Plaza',
        vibes: ['together', 'solidarity']
    },
    {
        main_category: 'art',
        name: 'Street Art',
        vibes: ['solidarity']
    },
    {
        main_category: 'health',
        name: 'Studio',
        vibes: ['together']
    },
    {
        main_category: 'cafe',
        name: 'Tea Room',
        vibes: ['chill']
    }

    // art, Art Gallery - Dreamy
    // Community - Solidarity
];

exports.APP_STORE_URL = APP_STORE_URL;
exports.DATABASE = DATABASE;
exports.GOOGLE_ANALYTICS_ID = GOOGLE_ANALYTICS_ID;
exports.GOOGLE_PLAY_URL = GOOGLE_PLAY_URL;
exports.HEATMAP_INTENSITY = HEATMAP_INTENSITY;
exports.MAPBOX_STYLE = MAPBOX_STYLE;
exports.MAPBOX_STYLE_LIGHT = MAPBOX_STYLE_LIGHT;
exports.METERS_PER_MILE = METERS_PER_MILE;
exports.PURPLE = PURPLE;
exports.RECOMMENDATION_REASONS = RECOMMENDATION_REASONS;
exports.SET_ACTIVE_OPTION = SET_ACTIVE_OPTION;
exports.TIMEOUT = TIMEOUT;
exports.TRUCATE_LENGTH = TRUCATE_LENGTH;
exports.ZOOM_ON_DETAILS = ZOOM_ON_DETAILS;
exports.days = days;
exports.place_sub_categories = place_sub_categories;
exports.zoom_levels = zoom_levels;
