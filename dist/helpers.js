"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var LinearScale=require("linear-scale"),turf=require("@turf/helpers"),turf_distance=require("@turf/distance"),turf_boolean=require("@turf/boolean-point-in-polygon"),map=require("./map.js"),vibes=require("./vibes.js"),Axios=require("axios"),axiosRetry=require("axios-retry"),isBetween=require("dayjs/plugin/isBetween"),truncate=require("truncate"),dayjs=require("dayjs"),utc=require("dayjs/plugin/utc"),dayjsRecur=require("dayjs-recur"),querystring=require("querystring"),constants=require("./constants.js");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function _interopNamespace(t){if(t&&t.__esModule)return t;var i=Object.create(null);return t&&Object.keys(t).forEach(function(e){var a;"default"!==e&&(a=Object.getOwnPropertyDescriptor(t,e),Object.defineProperty(i,e,a.get?a:{enumerable:!0,get:function(){return t[e]}}))}),i.default=t,Object.freeze(i)}require("@mapbox/geo-viewport"),require("@turf/meta"),require("@turf/clusters"),require("@turf/bbox-polygon"),require("@turf/center"),require("@turf/truncate"),require("@turf/clusters-dbscan"),require("@turf/points-within-polygon"),require("@turf/rhumb-bearing"),require("@turf/rhumb-distance"),require("@turf/rhumb-destination");var LinearScale__default=_interopDefaultLegacy(LinearScale),turf__namespace=_interopNamespace(turf),turf_distance__default=_interopDefaultLegacy(turf_distance),turf_boolean__default=_interopDefaultLegacy(turf_boolean),Axios__default=_interopDefaultLegacy(Axios),axiosRetry__default=_interopDefaultLegacy(axiosRetry),isBetween__default=_interopDefaultLegacy(isBetween),truncate__default=_interopDefaultLegacy(truncate),dayjs__default=_interopDefaultLegacy(dayjs),utc__default=_interopDefaultLegacy(utc),dayjsRecur__default=_interopDefaultLegacy(dayjsRecur),querystring__default=_interopDefaultLegacy(querystring),cities=[{id:51835,slug:"toronto",type:"official",location:{latitude:43.653226,longitude:-79.3831843},mailchimp_id:"95135b1969",radius:20,name:"Toronto"},{id:45678,slug:"houston",type:"official",location:{latitude:29.760314934412516,longitude:-95.36962040978698},mailchimp_id:"ea2fe099f2",radius:30,name:"Houston"},{id:44901,slug:"puerto-vallarta",type:"early",location:{latitude:20.615046993637947,longitude:-105.231817181398},mailchimp_id:"57c905a1df",radius:4,name:"Puerto Vallarta"},{id:38387,slug:"austin",type:"early",location:{latitude:30.267153,longitude:-97.7430608},mailchimp_id:"1d933c234f",radius:20,name:"Austin"},{id:38380,slug:"denver",type:"official",location:{latitude:39.7392358,longitude:-104.990251},mailchimp_id:"b576abf895",radius:20,name:"Denver"},{id:38148,slug:"chicago",type:"official",location:{latitude:41.8781136,longitude:-87.6297982},mailchimp_id:"b865b3ef72",radius:20,name:"Chicago"},{id:38143,slug:"new-york",type:"official",location:{latitude:40.7127610684055,longitude:-74.0060103509262},mailchimp_id:"56ebd9923f",radius:20,name:"New York"},{id:38137,slug:"san-diego",type:"official",location:{latitude:32.715738,longitude:-117.1610838},mailchimp_id:"7fb6e2a465",radius:20,name:"San Diego"},{id:38119,slug:"los-angeles",type:"official",location:{latitude:34.04734503476973,longitude:-118.25308336038819},mailchimp_id:"7fb6e2a465",radius:30,name:"Los Angeles"},{id:1450,slug:"guadalajara",type:"official",location:{latitude:20.65969879999999,longitude:-103.3496092},mailchimp_id:"0154de5655",radius:10,name:"Guadalajara"},{id:1447,slug:"oakland",type:"official",location:{latitude:37.79831556913852,longitude:-122.25940509567872},mailchimp_id:"da0894a0e6",radius:6,name:"Oakland"},{id:1444,slug:"san-francisco",type:"official",location:{latitude:37.7749295,longitude:-122.4194155},mailchimp_id:"f30df08e52",radius:5,name:"San Francisco"},{id:1441,slug:"portland",type:"official",location:{latitude:45.53316863144605,longitude:-122.6352310180664},mailchimp_id:"27c0467a17",radius:9,name:"Portland"},{id:1438,slug:"seattle",type:"official",location:{latitude:47.6062095,longitude:-122.3320708},mailchimp_id:"baadb78d87",radius:8,name:"Seattle"},{id:1435,slug:"vancouver",type:"official",location:{latitude:49.2827291,longitude:-123.1207375},mailchimp_id:"da30e0d7dc",radius:7,name:"Vancouver"}],neighborhoods=[{id:49989,slug:"the-east-cut",vibe:[3021,2037,3027,1687,6552],map:{lat:37.789218,lng:-122.3951488,zoom:17},radius:"0.3",name:"The East Cut"},{id:49785,slug:"49785",vibe:[2464,1073,5690,2230,7343,6552],map:{lat:34.0900091,lng:-118.3617443,zoom:14},radius:"0.4",name:""},{id:47894,slug:"chinatown-oakland",vibe:[1073,2230,1067,1906],map:{lat:37.797883489755385,lng:-122.26782583942565,zoom:16},radius:"0.1",name:"Chinatown"},{id:45781,slug:"city-park",vibe:[],map:{lat:39.7437803,lng:-104.9500844,zoom:14},radius:"0.3",name:"City Park"},{id:45776,slug:"lodo",vibe:[1064,1076,1906],map:{lat:39.7526509,lng:-105.001685,zoom:14},radius:"0.3",name:"LoDo"},{id:44986,slug:"nuevo-vallarta",vibe:[],map:{lat:20.6986205,lng:-105.2964898,zoom:14},radius:"0.3",name:"Nuevo Vallarta"},{id:44981,slug:"5-de-diciembre",vibe:[1103,2230,1067,1785],map:{lat:20.6167287,lng:-105.2297199,zoom:14},radius:"0.2",name:"5 de Diciembre"},{id:44973,slug:"versalles-la-vena",vibe:[3024,1060,2162],map:{lat:20.6350676,lng:-105.2275257,zoom:17},radius:"0.4",name:"Versalles &#038; La Vena"},{id:44968,slug:"centro",vibe:[1100,1073,1067],map:{lat:20.6098697,lng:-105.2333768,zoom:16},radius:"0.4",name:"Centro"},{id:44963,slug:"zona-romantica",vibe:[1073,1903,1701,6549,1956],map:{lat:20.6027765,lng:-105.2337149,zoom:14},radius:"0.3",name:"Zona Romantica"},{id:38520,slug:"soma",vibe:[3021,1100,2034,6558],map:{lat:37.7785189,lng:-122.4056395,zoom:17},radius:"0.3",name:"SoMa"},{id:37522,slug:"downtown-oakland",vibe:[1100,1903,1906],map:{lat:37.8032973,lng:-122.2710602,zoom:15},radius:"0.3",name:"Downtown Oakland"},{id:37497,slug:"castro-san-francisco",vibe:[1103,1106,1070,6549,2119],map:{lat:37.7609082,lng:-122.4350043,zoom:16},radius:"0.3",name:"Castro"},{id:37181,slug:"lafayette-obrera-guadalajara",vibe:[1100,1076,1701],map:{lat:20.669874401713777,lng:-103.37240438465577,zoom:16},radius:"0.3",name:"Lafayette / Obrera"},{id:37079,slug:"fillmore-san-francisco",vibe:[5039,1073,2119],map:{lat:37.786566,lng:-122.4333927,zoom:15},radius:"0.3",name:"Fillmore District"},{id:36347,slug:"downtown-vancouver",vibe:[1100,2116,1956,2119],map:{lat:49.281954,lng:-123.1170744,zoom:15},radius:"0.3",name:"Downtown"},{id:36165,slug:"jack-london-oakland",vibe:[1060,1109,1073,1687],map:{lat:37.79506910000001,lng:-122.2777955,zoom:14},radius:"0.3",name:"Jack London"},{id:36160,slug:"monraz-guadalajara",vibe:[1106,2162,2119],map:{lat:20.6838829,lng:-103.3948334,zoom:15},radius:"0.3",name:"Monráz"},{id:36157,slug:"tlaquepaque-guadalajara",vibe:[3021,2230,6561,4828],map:{lat:20.628807203160175,lng:-103.31384336079101,zoom:14},radius:"0.3",name:"Tlaquepaque"},{id:36154,slug:"moderna-guadalajara",vibe:[1070,1067],map:{lat:20.663603891205657,lng:-103.3612885989502,zoom:15},radius:"0.3",name:"Moderna"},{id:36151,slug:"chapalita-guadalajara",vibe:[1100,1106],map:{lat:20.663216991873846,lng:-103.39528387829588,zoom:17},radius:"0.3",name:"Chapalita"},{id:36148,slug:"providencia-guadalajara",vibe:[1106,1076],map:{lat:20.7019816,lng:-103.378224,zoom:14},radius:"0.3",name:"Providencia"},{id:36145,slug:"zapopan-centro-guadalajara",vibe:[1100,1067,1076],map:{lat:20.6719563,lng:-103.416501,zoom:14},radius:"0.3",name:"Zapopan Centro"},{id:36143,slug:"centro-guadalajara",vibe:[1100,1067],map:{lat:20.6866131,lng:-103.3507872,zoom:14},radius:"0.3",name:"Centro"},{id:36140,slug:"mexicaltzingo-guadalajara",vibe:[1100,2230,1067],map:{lat:20.6676254,lng:-103.3505188,zoom:14},radius:"0.3",name:"Mexicaltzingo"},{id:36137,slug:"santa-tere-guadalajara",vibe:[1100,2230,2119],map:{lat:20.683636195948008,lng:-103.36814401852416,zoom:15},name:"Santa Tere"},{id:36134,slug:"americana-guadalajara",vibe:[1701],map:{lat:20.6717775,lng:-103.3630608,zoom:15},radius:"0.3",name:"Americana"},{id:36131,slug:"yaletown-vancouver",vibe:[],map:{lat:49.27570189999999,lng:-123.1199065,zoom:14},radius:"0.3",name:"Yaletown"},{id:36128,slug:"west-end-vancouver",vibe:[1106,1067],map:{lat:49.2900541,lng:-123.1376044,zoom:14},radius:"0.3",name:"West End"},{id:36122,slug:"north-vancouver",vibe:[1100,1106],map:{lat:49.3199816,lng:-123.0724139,zoom:14},radius:"0.3",name:"North Vancouver"},{id:36117,slug:"gastown-vancouver",vibe:[1100,5039,1067,1687,2119],map:{lat:49.2828082,lng:-123.1066875,zoom:14},radius:"0.3",name:"Gastown"},{id:36114,slug:"east-vancouver-vancouver",vibe:[1100,3005,1824,1073,1067],map:{lat:49.2530487,lng:-123.0663828,zoom:14},radius:"0.3",name:"East Vancouver"},{id:36111,slug:"davie-village-vancouver",vibe:[1100,1106],map:{lat:49.2804157,lng:-123.1311982,zoom:14},radius:"0.3",name:"Davie Village"},{id:36108,slug:"mississippi-avenue",vibe:[2464,3018,2119,2467],map:{lat:45.5467446,lng:-122.6755671,zoom:14},radius:"0.3",name:"Mississippi Avenue"},{id:36105,slug:"st-johns-portland",vibe:[],map:{lat:45.5901167,lng:-122.7545431,zoom:14},radius:"0.3",name:"St Johns"},{id:36103,slug:"jade-district",vibe:[1100,2119],map:{lat:45.50243139999999,lng:-122.5785098,zoom:12},radius:"0.3",name:"Jade District"},{id:36100,slug:"hawthorne-portland",vibe:[3021,1100,2034,1067,2159],map:{lat:45.51206579999999,lng:-122.6305462,zoom:14},radius:"0.3",name:"Hawthorne"},{id:36097,slug:"division-clinton-portland",vibe:[1100,2034,1166,5581,2119],map:{lat:45.5032867,lng:-122.6399541,zoom:17},radius:"0.3",name:"Division/Clinton"},{id:36094,slug:"central-eastside-portland",vibe:[1073,1067,2119],map:{lat:45.523777,lng:-122.6598737,zoom:15},radius:"0.3",name:"Central Eastside"},{id:36074,slug:"chinatown-old-town-portland",vibe:[1106,1073,2119,1906],map:{lat:45.5246175,lng:-122.6740295,zoom:14},radius:"0.3",name:"Old Town / Chinatown"},{id:36071,slug:"pioneer-square-seattle",vibe:[1073,1070,1067],map:{lat:47.6015184,lng:-122.3342975,zoom:14},radius:"0.3",name:"Pioneer Square"},{id:36068,slug:"ballard-seattle",vibe:[1106,2162],map:{lat:47.6792172,lng:-122.3860312,zoom:15},radius:"0.3",name:"Ballard"},{id:36065,slug:"mission-sanfrancisco",vibe:[1100,1103,1067,2119],map:{lat:37.7598648,lng:-122.4147977,zoom:15},radius:"0.3",name:"Mission District"},{id:36058,slug:"green-lake-seattle",vibe:[1106,1076],map:{lat:47.6798338,lng:-122.3257826,zoom:15},radius:"0.3",name:"Green Lake"},{id:36047,slug:"georgetown-seattle",vibe:[1106,1067],map:{lat:47.5475104,lng:-122.3214521,zoom:15},radius:"0.3",name:"Georgetown"},{id:36054,slug:"queen-anne-seattle",vibe:[],map:{lat:47.6323268,lng:-122.3568641,zoom:15},radius:"0.3",name:"Queen Anne"},{id:36050,slug:"capitol-hill-seattle",vibe:[1100,1073,6549,2119,5559],map:{lat:47.625305,lng:-122.3221835,zoom:15},radius:"0.3",name:"Capitol Hill"},{id:36044,slug:"chinatown-seattle",vibe:[],map:{lat:47.5987122,lng:-122.3239762,zoom:15},radius:"0.3",name:"Chinatown-International District"},{id:36040,slug:"fruitvale-oakland",vibe:[1070,1903,1906],map:{lat:37.7776559,lng:-122.2258763,zoom:15},radius:"0.3",name:"Fruitvale"},{id:36037,slug:"west-oakland-oakland",vibe:[2464,1067],map:{lat:37.8155761,lng:-122.2839963,zoom:14},radius:"0.3",name:"West Oakland"},{id:36034,slug:"temescal-oakland",vibe:[1067,2119],map:{lat:37.8333513,lng:-122.260109,zoom:15},radius:"0.3",name:"Temescal"},{id:36029,slug:"inner-sunset-san-francisco",vibe:[1106,2119],map:{lat:37.764133875773645,lng:-122.46626644229737,zoom:15},name:"Inner Sunset"},{id:36024,slug:"hayes-valley-san-francisco",vibe:[1106,2119],map:{lat:37.7759073,lng:-122.4245247,zoom:15},radius:"0.3",name:"Hayes Valley"},{id:36016,slug:"marina-san-francisco",vibe:[1782,1701,1687],map:{lat:37.8036667,lng:-122.4368151,zoom:15},radius:"0.3",name:"Marina"},{id:36011,slug:"bay-view",vibe:[1070,1067,1076],map:{lat:37.73465859016705,lng:-122.3908183862915,zoom:15},radius:"0.3",name:"Bayview"},{id:35418,slug:"japantown",vibe:[1060,1103,1106,1109,1064],map:{lat:37.7854135,lng:-122.429383,zoom:14},radius:"0.3",name:"Japantown"},{id:35411,slug:"north-beach",vibe:[],map:{lat:37.80035660509935,lng:-122.41009506560668,zoom:15},radius:"0.3",name:"North Beach"},{id:35399,slug:"haight-ashbury-san-francisco",vibe:[1103,1106],map:{lat:37.7692204,lng:-122.4481393,zoom:15},radius:"0.3",name:"Haight-Ashbury"},{id:34032,slug:"chinatown-vancouver",vibe:[1073,1070,1067],map:{lat:49.2801149,lng:-123.1058197,zoom:13},radius:"0.3",name:"Chinatown"},{id:34017,slug:"chinatown",vibe:[1100,2116,1067],map:{lat:37.7941378,lng:-122.4077914,zoom:16},radius:"0.3",name:"Chinatown"},{id:44075,slug:"koreatown-northgate",vibe:[3008,1064,5690,3018,1906],map:{lat:37.809589965684175,lng:-122.26953311691895,zoom:16},radius:"0.4",name:"Koreatown Northgate"}],badges=[{id:51399,slug:"hidden-gem",status:"publish",type:"catch a vibe",categories:[],vibe:[],badge_family:[10815,10808,10807,10810,10811,10809,10806],key:"hidden-gem",description:"<p>Take the road less traveled. Save, check in and add a tip to tucked away spots to earn your Hidden Gems Badge.</p>\n<p>&nbsp;</p>\n",has_location:!1,icon:{id:51402,url:"https://cms.vibemap.com/wp-content/uploads/2022/06/Hidden-Gem-Badge.jpg",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"Hidden Gem"},{id:51396,slug:"togetherness",status:"publish",type:"catch a vibe",categories:[],vibe:[],badge_family:[],key:"togetherness",description:"<p>Belonging through intimacy and love. Save, check in and add a tip to these spaces of love &amp; belonging to earn your Togetherness Badge.</p>\n",has_location:!1,icon:{id:51250,url:"https://cms.vibemap.com/wp-content/uploads/2022/05/Togetherness-Badge.jpg",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"Togetherness "},{id:51393,slug:"quiet-energy",status:"publish",type:"catch a vibe",categories:[],vibe:[],badge_family:[],key:"quiet-energy",description:"<p>Happiness comes from within. Save, check in and add a tip to these mellow-making environments to earn your Quiet Energy Badge.</p>\n",has_location:!1,icon:{id:51248,url:"https://cms.vibemap.com/wp-content/uploads/2022/05/Quiet-Energy-Badge.jpg",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"Quiet Energy"},{id:51389,slug:"playtime",status:"publish",type:"catch a vibe",categories:[],vibe:[],badge_family:[],key:"playtime",description:"<p>Energetic, buzzing, vibrant. Save, check in and add a tip to these fun time spots to earn your Playtime Badge.</p>\n",has_location:!1,icon:{id:51254,url:"https://cms.vibemap.com/wp-content/uploads/2022/05/Playtime-Badge.jpg",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"Playtime"},{id:51383,slug:"old-school",status:"publish",type:"catch a vibe",categories:[],vibe:[],badge_family:[],key:"old-school",description:"<p>Listening to the past. Save, check in and add a tip to classic, tried-and-true spots to earn your Old School Badge.</p>\n<p>&nbsp;</p>\n",has_location:!1,icon:{id:51262,url:"https://cms.vibemap.com/wp-content/uploads/2022/05/Old-School-Badge.jpg",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"Old School"},{id:51380,slug:"solidarity",status:"publish",type:"catch a vibe",categories:[],vibe:[],badge_family:[],key:"solidarity",description:"<p>Everyone’s dreams come true. Save, check in and add a tip to these community-oriented spots to earn your Solidarity Badge.</p>\n<p>&nbsp;</p>\n",has_location:!1,icon:{id:51258,url:"https://cms.vibemap.com/wp-content/uploads/2022/05/Solidarity-Badge.jpg",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"Solidarity"},{id:51375,slug:"bff-mockup",status:"publish",type:"general",categories:[],vibe:[],badge_family:[],key:"bff-mockup",description:"<p>Check-in, save, add vibes &amp; add tips about these historical music landmarks in San Francisco to earn your SF Music Badge.</p>\n",has_location:!0,locations:[{ID:1444,post_author:"1",post_date:"2020-06-10 17:37:39",post_date_gmt:"2020-06-10 17:37:39",post_content:"",post_title:"San Francisco",post_excerpt:"",post_status:"publish",comment_status:"closed",ping_status:"closed",post_password:"",post_name:"san-francisco",to_ping:"",pinged:"",post_modified:"2022-06-13 09:59:46",post_modified_gmt:"2022-06-13 16:59:46",post_content_filtered:"",post_parent:0,guid:"https://52.148.191.161/?post_type=city&#038;p=1444",menu_order:0,post_type:"city",post_mime_type:"",comment_count:"0",filter:"raw"}],icon:{id:14425,url:"https://cms.vibemap.com/wp-content/uploads/2020/08/no_image_placeholder.png",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"BFF.fm Mockup",location:{ID:1444,post_title:"San Francisco",post_name:"san-francisco"}},{id:51360,slug:"51360",status:"publish",type:"local expert",categories:[],vibe:[],badge_family:[],key:"51360",description:"",icon:!1,name:"The Regular"},{id:51338,slug:"51338",status:"publish",type:"catch a vibe",categories:[],vibe:[],badge_family:[],key:"51338",description:"",has_location:!0,locations:[{ID:1438,post_author:"1",post_date:"2020-06-10 17:37:22",post_date_gmt:"2020-06-10 17:37:22",post_content:"",post_title:"Seattle",post_excerpt:"",post_status:"publish",comment_status:"closed",ping_status:"closed",post_password:"",post_name:"seattle",to_ping:"",pinged:"",post_modified:"2022-06-29 07:33:23",post_modified_gmt:"2022-06-29 14:33:23",post_content_filtered:"",post_parent:0,guid:"https://52.148.191.161/?post_type=city&#038;p=1438",menu_order:0,post_type:"city",post_mime_type:"",comment_count:"0",filter:"raw"}],map:{address:"Capitol Hill, Seattle, WA, USA",lat:47.625305,lng:-122.3221835,city:"Seattle",name:"Capitol Hill",zoom:14},icon:{id:51339,url:"https://cms.vibemap.com/wp-content/uploads/2022/06/capitol-hill-seattle-3.jpg",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"Colorful Vibes of Capitol Hill",location:{ID:1438,post_title:"Seattle",post_name:"seattle"}},{id:51042,slug:"reviewer",status:"publish",type:"vibemapper",categories:[],vibe:[],badge_family:[],key:"reviewer",description:'<p><span style="font-weight: 400;">Lifehacks are hard, but not for you! Offer tips to others and unlock all the Reviewer levels.</span></p>\n',has_location:!1,icon:{id:51244,url:"https://cms.vibemap.com/wp-content/uploads/2022/05/Reviewer-Badge.jpg",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"Reviewer"}],badges$1={badges:badges};axiosRetry__default.default(Axios__default.default,{retries:3,retryDelay:axiosRetry__default.default.exponentialDelay}),dayjs__default.default.extend(isBetween__default.default),dayjs__default.default.extend(utc__default.default),dayjs__default.default.extend(dayjsRecur__default.default);const wordpress=require("../dist/wordpress.js"),activityCategories=require("../dist/activityCategories.json"),ApiUrl="https://api.vibemap.com/v0.3/",filterList=(e=[{test:"test",value:"foo"},{test:"test",value:"bar"}],a="food",t="value")=>{const i=new RegExp(a.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g,"\\$&"),"i");return e.filter(e=>(e=>i.test(e[t]))(e))},getRandomItem=e=>{return e[Math.floor(Math.random()*e.length)]},encodeCardIndex=(e,a)=>{return e+a/10},matchLists=(e,a)=>{let t=0;return t=0<e.length&&0<a.length?e.filter(e=>a.includes(e)).length:t},rankVibes=(e,t)=>{let a=[];return(a=e.map(e=>{let a=0;return a=t.includes(e)?t.length-t.indexOf(e):a})).reduce((e,a)=>e+a,0)/t.length},sortByKey=(e,a)=>(console.log("sortByKey (a, b)",e,a),e),isClosedToday=e=>"00:00:00"===e.opens&&"00:00:00"===e.closes,displayHours=(t,i="dd")=>{var a=isOpen(t),s=t.find(({day_of_week:e})=>8===e);if(a.openEveryday){let e=[];a=dayjs__default.default(a.opens).format("ha")+"-"+dayjs__default.default(a.closes).format("ha"),a=(e.push(a),t.find(e=>"POPULAR"==e.name));return console.log("Popular at: ",a),e}let o=0,r=[];for(;o<7;){let e=t.find(e=>e.day_of_week==o),a=(t.find(e=>e.day_of_week==o&&"POPULAR"==e.name),!1);if(void 0!==e&&(a=isClosedToday(e)),void 0===e||a)if(a||void 0===s)r.push({day_of_week:o,closed:!0});else{let e=Object.assign({},s);e.day_of_week=o,r.push(e)}else e.closed=!1,r.push(e);o++}return r.map(e=>{var a,t=(e.day_of_week+1)%7;return!0===e.closed?dayjs__default.default().day(t).format(i)+" Closed":(a=e.opens.split(":"),e=e.closes.split(":"),dayjs__default.default().day(t).format(i)+": "+dayjs__default.default().hour(a[0]).minute(a[1]).format("ha")+"-"+dayjs__default.default().hour(e[0]).minute(e[1]).format("ha"))})},isOpen=(e,a=dayjs__default.default())=>{const t=a.day();var i=a.format("YYYY-MM-DD");if(a.hour(),!e)return{openNow:!1,openToday:!1,isPopular:!1};let s=e.find(({day_of_week:e})=>e===t);var o=e.find(({day_of_week:e})=>8===e),e=e.filter(e=>isClosedToday(e)),e=void 0!==o&&0==e.length;if(s=void 0===s?o:s){const r=dayjs__default.default(i+" "+s.opens),n=dayjs__default.default(i+" "+s.closes);o=a.isBetween(r,n),i=o&&"POPULAR"===s.name;return r.format("ha"),n.format("ha"),{openNow:o,openToday:!0,openEveryday:e,opens:r,closes:n,isPopular:i}}return{openNow:!1,openToday:!1,openEveryday:!1,isPopular:!1}},getCardOptions=a=>{let{categoryQuery:e,distanceQuery:t,geoQuery:i,searchQuery:s,vibeQuery:o}=a.singCards.posts[0];a.overrideQuery&&a.overrideQuery.vibe&&(o=a.overrideQuery.vibe),a.overrideQuery&&a.overrideQuery.cities&&0<a.overrideQuery.cities.length&&(r=cities.filter(e=>e.slug===a.overrideQuery.cities[0]),i=i||r[0].location,t=t||7),a.overrideQuery&&a.overrideQuery.location&&(i=a.overrideQuery.location,t=a.overrideQuery.distance||t),i||(r=cities.filter(e=>"oakland"===e.slug),i=r[0].location);var r=(o="string"==typeof o?o.replace(/\s/g,"").split(","):o)?o.map(e=>"string"==typeof e?e:e.slug):[];return{category:e,distance:t,point:i.longitude+","+i.latitude,ordering:"vibe",search:s,vibes:r}},getAPIParams=(e,a=50)=>{var{activity:t,distance:i}=e;let s=Object.assign({},e),o=1;return 0<i&&(o=Math.round(i*constants.METERS_PER_MILE)),s.ordering="-aggregate_rating",s.per_page=a,"all"!==t&&null!==t&&(s.category=t),s.dist=o,delete s.activity,delete s.distance,delete s.bounds,s},getCategoryMatch=(e=["all"])=>{const a=activityCategories.activityCategories.map(e=>e.slug);let t=[];return e.map(e=>(a.includes(e)&&t.push(e),!0)),t},getFullLink=(e,a="instagram")=>{if(null===e||""===e)return null;const t=i.parse(e);let i=new URL(e);e=t.path.replace("/","");return{instagram:"https://instagram.com/",twitter:"https://twitter.com/",facebook:"https://facebook.com/"}[a]+e},getMax=(e,a)=>{let t=0;return e.forEach(e=>{e=e.properties[a];e>t&&(t=e)}),t},getMin=(e,a)=>{let t=100;return e.forEach(e=>{e=e.properties[a];e<t&&(t=e)}),t},getTimeOfDay=e=>{if(e&&e.isValid())return e=parseFloat(e.format("HH")),12<=e&&e<=17?"afternoon":17<=e?"evening":"morning"},getTopVibes=e=>{let a={};e.map(e=>(e.properties.vibes.map(e=>(a.hasOwnProperty(e)?a[e]+=1:a[e]=1,null)),null));var t,i=[];for(t in a)i.push([t,a[t]]);return i.sort(function(e,a){return a[1]-e[1]})},getTopCategories=(e,a="categories")=>{let t={};e.map(e=>(e.properties[a].map(e=>(t.hasOwnProperty(e)?t[e]+=1:t[e]=1,null)),null));var i,s=[];for(i in t)s.push([i,t[i]]);return s.sort(function(e,a){return a[1]-e[1]})},getWaveFromVibe=e=>"buzzing"!==e?"medium":"high",graphToEvents=(e=[])=>{return e.map(e=>{e=e.node;const a=e.groupDetails;var t=a.name,i=a.link,e=e.slug,s=a.description,o=a.image?a.image.url:null,o=[{url:o,original:o}],r=a.map,n=a.price||"free",l=a.vibes?a.vibes.map(e=>e.slug):[],d=(a.recurring,a.recurrence),c=a.which,u=a.day.value,p=a.startTime||"00:00",g=a.startTime?a.endTime:"00:00";const m=nextDateFromRecurring(d,u,c);d=dayjs__default.default(m.next(1).toLocaleString().replace("00:00:00",p)),u=dayjs__default.default(m.next(1).toLocaleString().replace("00:00:00",g));return{id:e,title:t,geometry:{type:"Point",coordinates:[-122.26747099999956,37.81396520000001]},dateTime:d,image:o,type:"event",properties:{name:t,title:t,url:i,address:r&&r.streetAddress,categories:[],city:a.cities&&a.cities[0].slug,description:s,is_online:!1,images:[],hotspots_place:r,location:r,start_date:d,end_date:u,vibemap_images:o,likes:10,price:n,recurs:!0,vibes:l}}})},groupsToEvents=(e=[])=>{return e.map(e=>{const a=e.acf;var t=a.name,i=a.link,e=e.slug,s=a.description,o=a.image&&a.image.url,o=o?[{url:o,original:o}]:[],r=a.map,n=a.price||"free",l=a.vibes?a.vibes.map(e=>e.slug):[],d=(a.recurring,a.recurrence),c=a.which,u=a.day&&a.day.label?a.day.label:"sunday",p=a.start_time||"00:00",g=a.end_time||"00:00";const m=nextDateFromRecurring(d,u,c);d=dayjs__default.default(m.next(1).toLocaleString().replace("00:00:00",p)),u=dayjs__default.default(m.next(1).toLocaleString().replace("00:00:00",g));return{id:e,title:t,geometry:{type:"Point",coordinates:[-122.26747099999956,37.81396520000001]},dateTime:d,image:o,type:"event",properties:{name:t,title:t,url:i,address:r&&r.streetAddress,categories:[],city:a.cities&&a.cities[0].slug,description:s,is_online:!1,images:o,hotspots_place:r,location:r,start_date:d,end_date:u,vibemap_images:o,likes:10,price:n,recurs:!0,vibes:l}}})},normalize=(e,a,t)=>(e-a)/(t-a)*10,normalize_all=(e=500,a=1,t=100,i=1,s=10)=>{const o=LinearScale__default.default().domain([a,t]).range([i,s]);return o(e)},scaleIconSize=(e=5,a=1,t=100)=>{const i=LinearScale__default.default().domain([a,t]).range([1,5]);return i(e)},scaleMarker=(e=50,a,t=100,i=14)=>{isNaN(e)&&(e=3.5);const s=LinearScale__default.default().domain([8,20]).range([10,30]);var i=s(i),o=3*i;let r=LinearScale__default.default().domain([0,t]).range([i,o]);return Math.round(r(e))},scaleDensityArea=(e=10,a)=>{let t=LinearScale__default.default().domain([1,60,1e3]).range([0,.8,1]);return t(e)},scaleDensityBonus=e=>{let a=LinearScale__default.default().domain([0,1]).range([2*constants.HEATMAP_INTENSITY,constants.HEATMAP_INTENSITY]);return a(e)},scaleScore=(e=2)=>{let a=LinearScale__default.default().domain([0,5]).range([60,100]);return Math.round(a(e))},scaleSelectedMarker=e=>{let a=LinearScale__default.default().domain([8,12,20]).range([.1,1.2,4]);return Math.round(a(e))},getEventOptions=(a="oakland",e="month",t=10,i=null,s=[],o)=>{var r=cities.filter(e=>e.slug===a),r=r?r[0].location:cities[0];const n=dayjs__default.default();var l=n.day()+1;n.startOf("day");let d=0,c=0;switch(e){case"day":c=1;break;case"weekend":c=7-l;break;case"next_week":d=8-l,c=7;break;case"month":const g=dayjs__default.default().endOf("month");c=g.diff(n,"day");case"quarter":c=90}let u=n.add(d,"days").startOf("day"),p=n.add(c,"days").endOf("day");return{category:i,distance:t,point:r.longitude+","+r.latitude,ordering:"vibe",start_date:u.format("YYYY-MM-DD HH:MM"),end_date:p.format("YYYY-MM-DD HH:MM"),search:o,vibes:s}},fetchEvents=async(e={distance:20,point:"-122.269994,37.806507"},a=!1)=>{let{category:t,days:i,point:s,search:o}=e;var r=s.split(",").map(e=>parseFloat(e)),r=map.getLocationFromPoint(r),a=(dayjs__default.default().startOf("day").format("YYYY-MM-DD HH:MM"),dayjs__default.default().add(i,"days").format("YYYY-MM-DD HH:MM"),a&&t&&(e.search=`${t||""} `+(o||"")),map.sortLocations(cities,r)),r=a&&0<a.length?a[0].name:null,a=module.exports.getAPIParams(e),e=querystring__default.default.stringify(a),a=ApiUrl+"events/",n=Axios__default.default.CancelToken.source();let l=await Axios__default.default.get(a+"?"+e,{cancelToken:n.token}).catch(function(e){return console.log("Axios error ",e.response.statusText),{data:[],count:0,top_vibes:null,loading:!1,timedOut:!1}});a=await wordpress.getGroups({city:r||""});const d=groupsToEvents(a.data);return l.data.results.features=d.concat(l.data.results.features),l},nextDateFromRecurring=(...[e,a,t])=>{const i=dayjs__default.default();t=["first","second","third","fourth","fifth"].indexOf(t),t=0<t?t:0;return"monthly"==e?i.recur().every(a).daysOfWeek().every([t]).weeksOfMonthByDay():i.recur().every(a).daysOfWeek()},fetchPlacesDetails=async(e,a="place")=>{var t=Axios__default.default.CancelToken.source();let i;if("event"==a&&(i=ApiUrl+"events/"),i="place"==a?ApiUrl+"places/":i)return await Axios__default.default.get(""+i+e,{cancelToken:t.token}).catch(function(e){return console.log("Axios error ",e.statusText),null})},fetchPlacePicks=async(a={distance:5,point:"-123.1058197,49.2801149",ordering:"vibe",vibes:["chill"],preferredVibes:[],relatedVibes:[]})=>{let{activity:e,ordering:t,per_page:i,point:s,vibes:o,preferredVibes:r,relatedVibes:n}=a;const l=i||500;var d=o&&0<o.length,c=s.split(",").map(e=>parseFloat(e));const u=ApiUrl+"places/",p=Axios__default.default.CancelToken.source();let g={};var m=async e=>{e=getAPIParams(e,l),e=querystring__default.default.stringify(e);return g=await Axios__default.default.get(u+"?"+e,{cancelToken:p.token}).catch(function(e){return console.log("Axios error ",e.response.statusText),{data:[],count:0,top_vibes:null,loading:!1,timedOut:!1}})},_=(g=await m(a)).data.count;if(0==_&&d){let e=Object.assign({},a);e.search=o[0],e.vibes=[],g=await m(e)}d=formatPlaces(g.data.results.features);const f=o||[];m=f.concat(r||[]),a={...a,relatedVibes:n};return{data:scorePlaces(d,c,m,["aggregate_rating","vibes","distance","offers","hours"],t,void 0,a),count:_,top_vibes:getTopVibes(d),loading:!1,timedOut:!1}},decodePlaces=e=>{return e.map(e=>(e.properties.vibes=JSON.parse(e.properties.vibes),e.properties.subcategories=JSON.parse(e.properties.subcategories),e.properties.categories=JSON.parse(e.properties.categories),e.properties.vibemap_images=[],e.properties.images=[e.properties.thumbnail_url],null!=e.properties.opening_hours&&(e.properties.opening_hours=JSON.parse(e.properties.opening_hours)),delete e.properties.tips,delete e.properties.facebook,delete e.properties.telephone,delete e.properties.website,e))},formatPlaces=(e=[])=>{const i=activityCategories.activityCategories.map(e=>e.slug);return e.map(e=>{let a=e.properties;a.place_type="places",a.short_name=truncate__default.default(a.name,constants.TRUCATE_LENGTH),a.aggregate_rating=parseFloat(a.aggregate_rating),a.sub_categories=a.sub_categories,a.top_vibe=null;var t=a.categories.map(e=>e.toLowerCase()).filter(e=>i.includes(e.toLowerCase()));return void 0!==a.categories&&0!==a.categories.length&&0!==t.length||(a.categories=["missing"]),a.icon=t[0],a.cluster=null,e.properties=a,e})},vibesFromPlaces=e=>{return[]},getRecommendedVibes=e=>{return[]},scorePlaces=(e,d,c=[],u=["vibes","distance"],a,t=12,p={})=>{let g={};let m={};u.map(e=>g[e]=1e-5),u.map(e=>m[e]=1/0);t=t<=10?10:t,t=normalize_all(t,10,20,0,10);let o={category:0,vibe:10,distance:8/(1+7*Math.exp(1)**(-.7*t)),rating:0,hours:0,offers:0};"relevance"!==a&&(o[a]+=3);const i=e.map(e=>{let t=e.properties;if(t.stats={},u.includes("vibes")){let[e,a]=[0,0];void(t.vibes_score=0)===t.vibes&&(t.vibes=["chill"]);var s=0<t.vibes.length?2*Math.log10(t.vibes.length):0;0<t.vibes.length&&(t.vibes_score=s),t.images&&0<t.images.length&&(a+=0<t.images.length?2*Math.log10(t.images.length):0),c&&0<c.length&&t.vibes&&(s=10*(e=matchLists(c,t.vibes))+2*(p.relatedVibes?matchLists(p.relatedVibes,t.vibes):0),i=+rankVibes(c,t.vibes),a+=s+i,t.vibes_score+=a,t.stats.num_vibes=t.vibes.length,t.stats.num_matching_vibes=e,t.stats.vibe_match_score=s,t.stats.vibe_order_score=i),t.vibes_score>g.vibes&&(g.vibes=t.vibes_score),t.vibes_score<m.vibes&&(m.vibes=t.vibes_score),t.stats.total_vibe_score=t.vibes_score}if(u.includes("categories")){s=[0][0];t.categories_score=0;const n=t.categories.concat(t.subcategories),l=n.filter((e,a)=>n.indexOf(e)==a);if(0<t.categories.length&&(t.categories_score=t.categories.length),0<c.length){let i=[];l.forEach(a=>{var e=constants.place_sub_categories.filter(e=>e.main_category.includes(a)),t=constants.place_sub_categories.filter(e=>e.name.includes(a));0<e.length&&(i=i.concat(e[0].vibes)),0<t.length&&(i=i.concat(t[0].vibes))});s=matchLists(c,i);t.categories_score+=10*s}t.categories_score>g.categories&&(g.categories=t.categories_score),t.categories_score<m.categories&&(m.categories=t.categories_score)}var i,a,o,r;return u.includes("likes")&&(t.likes>g.likes&&(g.likes=t.likes),t.likes<m.likes&&(m.likes=t.likes)),u.includes("distance")&&(i=turf__namespace.point(e.geometry?e.geometry.coordinates:[0,0]),t.distance=turf_distance__default.default(d,i),t.distance>g.distance&&(g.distance=t.distance),t.distance<m.distance&&(m.distance=t.distance)),u.includes("aggregate_rating")&&(t.aggregate_rating>g.aggregate_rating&&(g.aggregate_rating=t.aggregate_rating),t.aggregate_rating<m.aggregate_rating&&(m.aggregate_rating=t.aggregate_rating)),t.offers_score=0,t.hours_score=0,u.includes("offers")&&(t.offers&&0<t.offers.length&&(t.offers_score=2),{openNow:s,openToday:i,opens:a,closes:o,isPopular:r}=isOpen(t.opening_hours),t.open_now=s,t.popular_now=r,t.opens=a,t.closes=o,i&&(t.hours_score+=.5),s&&(t.hours_score+=.5),r&&(t.hours_score+=5)),t.stats.hours_bonus=t.hours_score,e.properties=t,e});let r=0,n=1/0,s=i.map(e=>{let a=e.properties;u.includes("vibes")&&(a.vibes_score=normalize_all(a.vibes_score,m.vibes,g.vibes,0,1),a.vibes_score=a.vibes_score*o.vibe),u.includes("categories")&&(a.categories_score=normalize_all(a.categories_score,m.categories,g.categories,0,1),a.categories_score=a.categories_score*o.category),u.includes("likes")&&(a.likes_score=normalize_all(a.likes,m.likes,g.likes,0,1)),u.includes("aggregate_rating")&&(a.aggregate_rating_score=normalize_all(a.aggregate_rating,m.aggregate_rating,g.aggregate_rating,0,1),a.aggregate_rating_score*=o.rating,a.stats.aggregate_rating_score=a.aggregate_rating),u.includes("distance")&&(t=g.distance,a.distance_score=1-normalize_all(a.distance,m.distance,t,0,.95),a.distance_score*=o.distance,a.stats.distance_score=a.distance_score),u.includes("hours")&&(a.hours_score*=o.hours);var t=u;const i=u.map(e=>a[e+"_score"]);var s=i.indexOf(Math.max.apply(null,i));return i.indexOf(Math.min.apply(null,i)),a.average_score=i.reduce((e,a)=>e+a,0)/i.length,a.average_score>r&&(r=a.average_score),a.average_score<n&&(n=a.average_score),a.reason=t[s],e.properties=a,e});const l=s.sort((e,a)=>a.properties.average_score-e.properties.average_score);return l.map(e=>{let a=e.properties;return a.average_score=normalize_all(a.average_score,n,r,.65,1),a.icon_size=scaleIconSize(a.average_score,.65,1),a.stats.final_score_normalized=a.average_score,e})},reducePlaceProperties=(e,t=["name","url","address","categories","subcategories","neighborhood","price","short_description","vibemap_images","vibes"])=>{return e.map(a=>(a.properties=Object.fromEntries(t.map(e=>[e,a.properties[e]])),a))},toTitleCase=e=>{if("string"!=typeof e)return e;e=e.toLowerCase().split(" ");for(var a=0;a<e.length;a++)e[a]=e[a].charAt(0).toUpperCase()+e[a].slice(1);return e.join(" ")},nearest_places=(e,i,s=5)=>{var o=[],e=(e.map(e=>{let a=e.properties;var t=turf__namespace.point(e.geometry.coordinates);a.distance=turf_distance__default.default(i,t),a.distance<s&&o.push(e)}),o.slice(0));return e.sort(function(e,a){return e.properties.distance-a.properties.distance}),e},validate_check_in=(e,a,t=.5)=>{e=turf__namespace.point(e.geometry.coordinates);return turf_distance__default.default(a,e)<t},in_jls=e=>{var a=turf__namespace.polygon([[[-122.282617,37.802862],[-122.2643,37.795721],[-122.265502,37.787005],[-122.288139,37.796077],[-122.282617,37.802862]]]);return turf_boolean__default.default(e,a)},in_neighborhood=t=>{const i=[],s=[],o=turf__namespace.point(t.geometry.coordinates);return neighborhoods.map(e=>{var a=turf_distance__default.default([e.map.lng,e.map.lat],o);a<5&&in_bbox_helper(t.geometry.coordinates,e.boundary)?(i.push(e.id),s.push(e.slug)):1e-5<e.radius&&a<e.radius?(console.log("radius checked"),i.push(e.id),s.push(e.slug)):a<.8&&(console.log("dist checked"),i.push(e.id),s.push(e.slug))}),i},in_bbox_helper=(e,a)=>{return""!==a&&void 0!==a&&(a=JSON.parse(a),a=turf__namespace.polygon([a]),turf_boolean__default.default(e,a))},nearest_neighborhood=a=>{const e=neighborhoods.map(e=>({name:e.name,neigh_dist:turf_distance__default.default([e.map.lng,e.map.lat],a)}));return e.sort(function(e,a){return e.neigh_dist-a.neigh_dist}),e.slice(0,10)},challenge_badges_lookup=()=>{const a=[];return badges$1.badges.map(e=>{"neighborhood"==e.type&&a.push(e)}),a},associate_badge=t=>{const e=challenge_badges_lookup(),i=[];return e.map(a=>{console.log(a);for(let e=0;e<t.length;e++)a.location.ID==t[e]&&i.push(a)}),i},sortNeighborhoodsByVibes=(e,a)=>{if(0===a.length)return e;var t=vibes.getRelatedVibes(a);const s=[...new Set([...a,...t])],i=e.map(e=>{const a=e.vibes||e.acf.vibes,t=a.map(({slug:e})=>e);var i=s.filter(e=>t.includes(e)).length;return{...e,vibeIntersection:i}}),o=i.sort((e,a)=>a.vibeIntersection-e.vibeIntersection);return o.map(e=>{const{vibeIntersection:a,...t}=e;return t})};exports.associate_badge=associate_badge,exports.challenge_badges_lookup=challenge_badges_lookup,exports.decodePlaces=decodePlaces,exports.displayHours=displayHours,exports.encodeCardIndex=encodeCardIndex,exports.fetchEvents=fetchEvents,exports.fetchPlacePicks=fetchPlacePicks,exports.fetchPlacesDetails=fetchPlacesDetails,exports.filterList=filterList,exports.formatPlaces=formatPlaces,exports.getAPIParams=getAPIParams,exports.getCardOptions=getCardOptions,exports.getCategoryMatch=getCategoryMatch,exports.getEventOptions=getEventOptions,exports.getFullLink=getFullLink,exports.getMax=getMax,exports.getMin=getMin,exports.getRandomItem=getRandomItem,exports.getRecommendedVibes=getRecommendedVibes,exports.getTimeOfDay=getTimeOfDay,exports.getTopCategories=getTopCategories,exports.getTopVibes=getTopVibes,exports.getWaveFromVibe=getWaveFromVibe,exports.graphToEvents=graphToEvents,exports.groupsToEvents=groupsToEvents,exports.in_bbox_helper=in_bbox_helper,exports.in_jls=in_jls,exports.in_neighborhood=in_neighborhood,exports.isClosedToday=isClosedToday,exports.isOpen=isOpen,exports.matchLists=matchLists,exports.nearest_neighborhood=nearest_neighborhood,exports.nearest_places=nearest_places,exports.normalize=normalize,exports.normalize_all=normalize_all,exports.rankVibes=rankVibes,exports.reducePlaceProperties=reducePlaceProperties,exports.scaleDensityArea=scaleDensityArea,exports.scaleDensityBonus=scaleDensityBonus,exports.scaleIconSize=scaleIconSize,exports.scaleMarker=scaleMarker,exports.scaleScore=scaleScore,exports.scaleSelectedMarker=scaleSelectedMarker,exports.scorePlaces=scorePlaces,exports.sortByKey=sortByKey,exports.sortNeighborhoodsByVibes=sortNeighborhoodsByVibes,exports.toTitleCase=toTitleCase,exports.validate_check_in=validate_check_in,exports.vibesFromPlaces=vibesFromPlaces;
