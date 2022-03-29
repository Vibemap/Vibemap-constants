"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var LinearScale=require("linear-scale"),turf=require("@turf/helpers"),turf_distance=require("@turf/distance"),turf_boolean=require("@turf/boolean-point-in-polygon"),vibes=require("./vibes.js"),Axios=require("axios"),axiosRetry=require("axios-retry"),isBetween=require("dayjs/plugin/isBetween"),truncate=require("truncate"),dayjs=require("dayjs"),utc=require("dayjs/plugin/utc"),querystring=require("querystring"),constants=require("./constants.js");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function _interopNamespace(t){if(t&&t.__esModule)return t;var i=Object.create(null);return t&&Object.keys(t).forEach(function(e){var a;"default"!==e&&(a=Object.getOwnPropertyDescriptor(t,e),Object.defineProperty(i,e,a.get?a:{enumerable:!0,get:function(){return t[e]}}))}),i.default=t,Object.freeze(i)}var LinearScale__default=_interopDefaultLegacy(LinearScale),turf__namespace=_interopNamespace(turf),turf_distance__default=_interopDefaultLegacy(turf_distance),turf_boolean__default=_interopDefaultLegacy(turf_boolean),Axios__default=_interopDefaultLegacy(Axios),axiosRetry__default=_interopDefaultLegacy(axiosRetry),isBetween__default=_interopDefaultLegacy(isBetween),truncate__default=_interopDefaultLegacy(truncate),dayjs__default=_interopDefaultLegacy(dayjs),utc__default=_interopDefaultLegacy(utc),querystring__default=_interopDefaultLegacy(querystring),categories=[{art:null,name:"Art",icon:"artLogo",vibe:"art"},{activism:null,name:"Activism",icon:"activistLogo",vibe:"Activist"},{comedy:null,name:"Comedy",icon:"comedyLogo",vibe:"funny"},{community:null,name:"Community",icon:"artLogo",vibe:"community"},{culture:null,name:"Culture",icon:"cultureLogo",vibe:"cultural"},{drinking:null,name:"Drinking",icon:"drinkingLogo",vibe:"drinking"},{entertainment:null,name:"Entertainment",icon:"entertainmentLogo",vibe:"fun"},{family:null,name:"Family",icon:"familyLogo",vibe:"family"},{food:null,name:"Food",icon:"foodLogo",vibe:"foodie"},{fitness:null,name:"Fitness",icon:"fitnessLogo",vibe:"fit"},{health:null,name:"Health",icon:"healthLogo",vibe:"healthy"},{learning:null,name:"Learning",icon:"learningLogo",vibe:"curious"},{music:null,name:"Music",icon:"musicLogo",vibe:"musical"},{nightlife:null,name:"Nightlife",icon:"nightlifeLogo",vibe:"nightlife"},{outdoors:null,name:"Outdoors",icon:"outdoorsLogo",vibe:"outdoors"},{shopping:null,name:"Shopping",icon:"shoppingLogo",vibe:"shopping"},{hotels:null,name:"Stay",icon:"stayLogo",vibe:"hotel"},{style:null,name:"Lifestyle",icon:"lifestyleLogo",vibe:"fashion"},{visit:null,name:"Visit",icon:"visitLogo",vibe:"popular"}],allCategories={categories:categories},cities=[{id:45678,slug:"houston",type:"official",location:{latitude:29.760314934412516,longitude:-95.36962040978698},mailchimp_id:"ea2fe099f2",name:"Houston"},{id:44901,slug:"puerto-vallarta",type:"early",location:{latitude:20.615046993637947,longitude:-105.231817181398},mailchimp_id:"57c905a1df",name:"Puerto Vallarta"},{id:38387,slug:"austin",type:"early",location:{latitude:30.267153,longitude:-97.7430608},mailchimp_id:"1d933c234f",name:"Austin"},{id:38380,slug:"denver",type:"early",location:{latitude:39.7392358,longitude:-104.990251},mailchimp_id:"b576abf895",name:"Denver"},{id:38148,slug:"chicago",type:"early",location:{latitude:41.8781136,longitude:-87.6297982},mailchimp_id:"b865b3ef72",name:"Chicago"},{id:38143,slug:"new-york",type:"early",location:{latitude:40.7127610684055,longitude:-74.0060103509262},mailchimp_id:"56ebd9923f",name:"New York"},{id:38137,slug:"san-diego",type:"official",location:{latitude:32.715738,longitude:-117.1610838},mailchimp_id:"7fb6e2a465",name:"San Diego"},{id:38119,slug:"los-angeles",type:"official",location:{latitude:34.04734503476973,longitude:-118.25308336038819},mailchimp_id:"7fb6e2a465",name:"Los Angeles"},{id:1450,slug:"guadalajara",type:"official",location:{latitude:20.65969879999999,longitude:-103.3496092},mailchimp_id:"0154de5655",name:"Guadalajara"},{id:1447,slug:"oakland",type:"official",location:{latitude:37.8043514,longitude:-122.2711639},mailchimp_id:"da0894a0e6",name:"Oakland"},{id:1444,slug:"san-francisco",type:"official",location:{latitude:37.7749295,longitude:-122.4194155},mailchimp_id:"f30df08e52",name:"San Francisco"},{id:1441,slug:"portland",type:"official",location:{latitude:45.5051064,longitude:-122.6750261},mailchimp_id:"27c0467a17",name:"Portland"},{id:1438,slug:"seattle",type:"official",location:{latitude:47.6062095,longitude:-122.3320708},mailchimp_id:"baadb78d87",name:"Seattle"},{id:1435,slug:"vancouver",type:"official",location:{latitude:49.2827291,longitude:-123.1207375},mailchimp_id:"da30e0d7dc",name:"Vancouver"}],neighborhoods=[{id:49989,slug:"the-east-cut",vibe:[3021,2037,3027,1687,6552],map:{lat:37.789218,lng:-122.3951488,zoom:17},radius:"0.3",name:"The East Cut"},{id:49785,slug:"49785",vibe:[2464,1073,5690,2230,7343,6552],map:{lat:34.0900091,lng:-118.3617443,zoom:14},radius:"0.4",name:""},{id:47894,slug:"chinatown-oakland",vibe:[1073,2230,1067,1906],map:{lat:37.797883489755385,lng:-122.26782583942565,zoom:16},radius:"0.1",name:"Chinatown"},{id:45781,slug:"city-park",vibe:[],map:{lat:39.7437803,lng:-104.9500844,zoom:14},radius:"0.3",name:"City Park"},{id:45776,slug:"lodo",vibe:[1064,1076,1906],map:{lat:39.7526509,lng:-105.001685,zoom:14},radius:"0.3",name:"LoDo"},{id:44986,slug:"nuevo-vallarta",vibe:[],map:{lat:20.6986205,lng:-105.2964898,zoom:14},radius:"0.3",name:"Nuevo Vallarta"},{id:44981,slug:"5-de-diciembre",vibe:[1103,2230,1067,1785],map:{lat:20.6167287,lng:-105.2297199,zoom:14},radius:"0.2",name:"5 de Diciembre"},{id:44973,slug:"versalles-la-vena",vibe:[3024,1060,2162],map:{lat:20.6350676,lng:-105.2275257,zoom:17},radius:"0.4",name:"Versalles &#038; La Vena"},{id:44968,slug:"centro",vibe:[1100,1073,1067],map:{lat:20.6098697,lng:-105.2333768,zoom:16},radius:"0.4",name:"Centro"},{id:44963,slug:"zona-romantica",vibe:[1073,1903,1701,6549,1956],map:{lat:20.6027765,lng:-105.2337149,zoom:14},radius:"0.3",name:"Zona Romantica"},{id:38520,slug:"soma",vibe:[3021,1100,2034,6558],map:{lat:37.7785189,lng:-122.4056395,zoom:17},radius:"0.3",name:"SoMa"},{id:37522,slug:"downtown-oakland",vibe:[1100,1903,1906],map:{lat:37.8032973,lng:-122.2710602,zoom:15},radius:"0.3",name:"Downtown Oakland"},{id:37497,slug:"castro-san-francisco",vibe:[1103,1106,1070,6549,2119],map:{lat:37.7609082,lng:-122.4350043,zoom:16},radius:"0.3",name:"Castro"},{id:37181,slug:"lafayette-obrera-guadalajara",vibe:[1100,1076,1701],map:{lat:20.669874401713777,lng:-103.37240438465577,zoom:16},radius:"0.3",name:"Lafayette / Obrera"},{id:37079,slug:"fillmore-san-francisco",vibe:[5039,1073,2119],map:{lat:37.786566,lng:-122.4333927,zoom:15},radius:"0.3",name:"Fillmore District"},{id:36347,slug:"downtown-vancouver",vibe:[1100,2116,1956,2119],map:{lat:49.281954,lng:-123.1170744,zoom:15},radius:"0.3",name:"Downtown"},{id:36165,slug:"jack-london-oakland",vibe:[1060,1109,1073,1687],map:{lat:37.79506910000001,lng:-122.2777955,zoom:14},radius:"0.3",name:"Jack London"},{id:36160,slug:"monraz-guadalajara",vibe:[1106,2162,2119],map:{lat:20.6838829,lng:-103.3948334,zoom:15},radius:"0.3",name:"Monráz"},{id:36157,slug:"tlaquepaque-guadalajara",vibe:[3021,2230,6561,4828],map:{lat:20.628807203160175,lng:-103.31384336079101,zoom:14},radius:"0.3",name:"Tlaquepaque"},{id:36154,slug:"moderna-guadalajara",vibe:[1070,1067],map:{lat:20.663603891205657,lng:-103.3612885989502,zoom:15},radius:"0.3",name:"Moderna"},{id:36151,slug:"chapalita-guadalajara",vibe:[1100,1106],map:{lat:20.663216991873846,lng:-103.39528387829588,zoom:17},radius:"0.3",name:"Chapalita"},{id:36148,slug:"providencia-guadalajara",vibe:[1106,1076],map:{lat:20.7019816,lng:-103.378224,zoom:14},radius:"0.3",name:"Providencia"},{id:36145,slug:"zapopan-centro-guadalajara",vibe:[1100,1067,1076],map:{lat:20.6719563,lng:-103.416501,zoom:14},radius:"0.3",name:"Zapopan Centro"},{id:36143,slug:"centro-guadalajara",vibe:[1100,1067],map:{lat:20.6866131,lng:-103.3507872,zoom:14},radius:"0.3",name:"Centro"},{id:36140,slug:"mexicaltzingo-guadalajara",vibe:[1100,2230,1067],map:{lat:20.6676254,lng:-103.3505188,zoom:14},radius:"0.3",name:"Mexicaltzingo"},{id:36137,slug:"santa-tere-guadalajara",vibe:[1100,2230,2119],map:{lat:20.683636195948008,lng:-103.36814401852416,zoom:15},name:"Santa Tere"},{id:36134,slug:"americana-guadalajara",vibe:[1701],map:{lat:20.6717775,lng:-103.3630608,zoom:15},radius:"0.3",name:"Americana"},{id:36131,slug:"yaletown-vancouver",vibe:[],map:{lat:49.27570189999999,lng:-123.1199065,zoom:14},radius:"0.3",name:"Yaletown"},{id:36128,slug:"west-end-vancouver",vibe:[1106,1067],map:{lat:49.2900541,lng:-123.1376044,zoom:14},radius:"0.3",name:"West End"},{id:36122,slug:"north-vancouver",vibe:[1100,1106],map:{lat:49.3199816,lng:-123.0724139,zoom:14},radius:"0.3",name:"North Vancouver"},{id:36117,slug:"gastown-vancouver",vibe:[1100,5039,1067,1687,2119],map:{lat:49.2828082,lng:-123.1066875,zoom:14},radius:"0.3",name:"Gastown"},{id:36114,slug:"east-vancouver-vancouver",vibe:[1100,3005,1824,1073,1067],map:{lat:49.2530487,lng:-123.0663828,zoom:14},radius:"0.3",name:"East Vancouver"},{id:36111,slug:"davie-village-vancouver",vibe:[1100,1106],map:{lat:49.2804157,lng:-123.1311982,zoom:14},radius:"0.3",name:"Davie Village"},{id:36108,slug:"mississippi-avenue",vibe:[2464,3018,2119,2467],map:{lat:45.5467446,lng:-122.6755671,zoom:14},radius:"0.3",name:"Mississippi Avenue"},{id:36105,slug:"st-johns-portland",vibe:[],map:{lat:45.5901167,lng:-122.7545431,zoom:14},radius:"0.3",name:"St Johns"},{id:36103,slug:"jade-district",vibe:[1100,2119],map:{lat:45.50243139999999,lng:-122.5785098,zoom:12},radius:"0.3",name:"Jade District"},{id:36100,slug:"hawthorne-portland",vibe:[3021,1100,2034,1067,2159],map:{lat:45.51206579999999,lng:-122.6305462,zoom:14},radius:"0.3",name:"Hawthorne"},{id:36097,slug:"division-clinton-portland",vibe:[1100,2034,1166,5581,2119],map:{lat:45.5026103,lng:-122.5672642,zoom:14},radius:"0.3",name:"Division/Clinton"},{id:36094,slug:"central-eastside-portland",vibe:[1073,1067,2119],map:{lat:45.523777,lng:-122.6598737,zoom:15},radius:"0.3",name:"Central Eastside"},{id:36074,slug:"chinatown-old-town-portland",vibe:[1106,1073,2119,1906],map:{lat:45.5246175,lng:-122.6740295,zoom:14},name:"Old Town / Chinatown"},{id:36071,slug:"pioneer-square-seattle",vibe:[1073,1070,1067],map:{lat:47.6015184,lng:-122.3342975,zoom:14},radius:"0.3",name:"Pioneer Square"},{id:36068,slug:"ballard-seattle",vibe:[1106,2162],map:{lat:47.6792172,lng:-122.3860312,zoom:15},radius:"0.3",name:"Ballard"},{id:36065,slug:"mission-sanfrancisco",vibe:[1100,1103,1067,2119],map:{lat:37.7598648,lng:-122.4147977,zoom:15},radius:"0.3",name:"Mission District"},{id:36058,slug:"green-lake-seattle",vibe:[1106,1076],map:{lat:47.6798338,lng:-122.3257826,zoom:15},radius:"0.3",name:"Green Lake"},{id:36047,slug:"georgetown-seattle",vibe:[1106,1067],map:{lat:47.5475104,lng:-122.3214521,zoom:15},radius:"0.3",name:"Georgetown"},{id:36054,slug:"queen-anne-seattle",vibe:[],map:{lat:47.6323268,lng:-122.3568641,zoom:15},radius:"0.3",name:"Queen Anne"},{id:36050,slug:"capitol-hill-seattle",vibe:[1100,1073,6549,2119,5559],map:{lat:47.625305,lng:-122.3221835,zoom:15},radius:"0.3",name:"Capitol Hill"},{id:36044,slug:"chinatown-seattle",vibe:[],map:{lat:47.5987122,lng:-122.3239762,zoom:15},radius:"0.3",name:"Chinatown-International District"},{id:36040,slug:"fruitvale-oakland",vibe:[1070,1903,1906],map:{lat:37.7776559,lng:-122.2258763,zoom:15},radius:"0.3",name:"Fruitvale"},{id:36037,slug:"west-oakland-oakland",vibe:[2464,1067],map:{lat:37.8155761,lng:-122.2839963,zoom:14},radius:"0.3",name:"West Oakland"},{id:36034,slug:"temescal-oakland",vibe:[1067,2119],map:{lat:37.8333513,lng:-122.260109,zoom:15},radius:"0.3",name:"Temescal"},{id:36029,slug:"inner-sunset-san-francisco",vibe:[1106,2119],map:{lat:37.764133875773645,lng:-122.46626644229737,zoom:15},name:"Inner Sunset"},{id:36024,slug:"hayes-valley-san-francisco",vibe:[1106,2119],map:{lat:37.7759073,lng:-122.4245247,zoom:15},radius:"0.3",name:"Hayes Valley"},{id:36016,slug:"marina-san-francisco",vibe:[1782,1701,1687],map:{lat:37.8036667,lng:-122.4368151,zoom:15},radius:"0.3",name:"Marina"},{id:36011,slug:"bay-view",vibe:[1070,1067,1076],map:{lat:37.73465859016705,lng:-122.3908183862915,zoom:15},radius:"0.3",name:"Bayview"},{id:35418,slug:"japantown",vibe:[1060,1103,1106,1109,1064],map:{lat:37.7854135,lng:-122.429383,zoom:14},radius:"0.3",name:"Japantown"},{id:35411,slug:"north-beach",vibe:[],map:{lat:37.80035660509935,lng:-122.41009506560668,zoom:15},radius:"0.3",name:"North Beach"},{id:35399,slug:"haight-ashbury-san-francisco",vibe:[1103,1106],map:{lat:37.7692204,lng:-122.4481393,zoom:15},radius:"0.3",name:"Haight-Ashbury"},{id:34032,slug:"chinatown-vancouver",vibe:[1073,1070,1067],map:{lat:49.2801149,lng:-123.1058197,zoom:13},radius:"0.3",name:"Chinatown"},{id:34017,slug:"chinatown",vibe:[1100,2116,1067],map:{lat:37.7941378,lng:-122.4077914,zoom:16},radius:"0.3",name:"Chinatown"},{id:44075,slug:"koreatown-northgate",vibe:[3008,1064,5690,3018,1906],map:{lat:37.809589965684175,lng:-122.26953311691895,zoom:16},radius:"0.4",name:"Koreatown Northgate"}],badges=[{id:50168,slug:"van-ness-bus-badge",status:"publish",type:"general",categories:[],vibe:[],key:"van-ness-bus-badge",description:"<p>Explore the vibes Van Ness on the new bus-rapid transit and earn points towards cool rewards and learn about upcoming events.</p>\n<ul>\n<li>Check in at any of the locations in this guide or along the coordidor</li>\n<li>Add Vibes and Tips to places so other people know what to expect</li>\n<li>Send feedback to San Francisco Transit Riders &amp; SFMTA</li>\n</ul>\n",has_location:!0,location:{ID:1444,post_title:"San Francisco",post_name:"san-francisco"},map:{address:"Civic Center, San Francisco, CA, USA",lat:37.7815533,lng:-122.4156427,city:"San Francisco",name:"Civic Center",zoom:14},event:["add_vibe","check_in","save_place","add_tip"],icon:{id:50170,url:"https://cms.vibemap.com/wp-content/uploads/2022/03/Van-Ness-Bus-Rapid-Transit.jpg",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"Van Ness Bus Badge"},{id:49930,slug:"49930",status:"publish",type:"general",categories:[],vibe:[],key:"49930",description:"<p>We&#8217;re excited to announce a new partnership with Oakland&#8217;s OACC and Cut Fruit Collectivelaunching April 16th. Stay tuned for more. : )</p>\n",has_location:!1,location:{ID:1447,post_author:"1",post_date:"2020-06-10 17:37:49",post_date_gmt:"2020-06-10 17:37:49",post_content:"",post_title:"Oakland",post_excerpt:"",post_status:"publish",comment_status:"closed",ping_status:"closed",post_password:"",post_name:"oakland",to_ping:"",pinged:"",post_modified:"2022-02-15 09:32:00",post_modified_gmt:"2022-02-15 17:32:00",post_content_filtered:"",post_parent:0,guid:"https://52.148.191.161/?post_type=city&#038;p=1447",menu_order:0,post_type:"city",post_mime_type:"",comment_count:"0",filter:"raw"},map:!1,event:[],icon:{id:49911,url:"https://cms.vibemap.com/wp-content/uploads/2022/03/209914268_1011119466365184_5484193727252803894_n-e1646863593806.jpg",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"(Coming Soon!) OACC & Cut Fruit Collective Badge"},{id:43587,slug:"first-fridays",status:"publish",type:"general",categories:[],vibe:[],key:"first-fridays",description:"<p>Earn your First Friday’s After Dark Badge by checking in to select places downtown Oakland after First Friday is over and win a chance for a free night stay at The Moxy!</p>\n<p>How does this work?</p>\n<p>Earn Challenge Points by using Vibemap to check in to select places after Oakland’s First Friday. This badge can only be achieved between the hours of 9pm and 2am on November 5th. Rack up more points by visiting and checking in at more places. The more you check-in, the better chance you have of winning prizes.</p>\n<p>Where to go?</p>\n<p>We encourage you to follow your instincts, but if you need a little help, we got you covered. Are you you ready to turn things up or calm it down? Keepin’ it contemporary or going old school? Check in with yourself and find places that match your vibe with our First Friday, After Dark Guide.</p>\n",has_location:!0,location:{ID:44075,post_title:"Koreatown Northgate",post_name:"koreatown-northgate"},map:{address:"2040 Telegraph Ave, Oakland, CA 94612, USA",lat:37.81033588008649,lng:-122.26938291321412,city:"Oakland",zoom:16},event:["check_in"],icon:{id:44120,url:"https://cms.vibemap.com/wp-content/uploads/2021/10/Vibemap_Oakland-First-Friday-Badge-21-e1636037610434-3.jpg",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"Oakland First Fridays"},{id:40768,slug:"social",status:"publish",type:"general",categories:[],vibe:[],key:"social",description:"<div>\n<div>Share interesting events or places with friends</div>\n</div>\n",has_location:!1,location:!1,event:["share"],icon:{id:42800,url:"https://cms.vibemap.com/wp-content/uploads/2021/08/social.png",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"Cool Friend"},{id:40766,slug:"good-vibes",status:"publish",type:"general",categories:[],vibe:[],key:"good-vibes",description:"<div>\n<div>Do seven vibe checks.</div>\n</div>\n",has_location:!1,location:!1,event:["vibe_check"],icon:{id:42803,url:"https://cms.vibemap.com/wp-content/uploads/2021/08/good-vibes.jpg",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"Good Vibes"},{id:40763,slug:"explorer",status:"publish",type:"general",categories:[],vibe:[],key:"explorer",description:"<div>\n<div>Search for seven different vibes, at least once</div>\n</div>\n",has_location:!1,location:!1,event:["search_vibes"],icon:{id:42806,url:"https://cms.vibemap.com/wp-content/uploads/2021/08/explorer.jpg",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"Explorer"},{id:40742,slug:"collector",status:"publish",type:"general",categories:[],vibe:[],key:"collector",description:"<div>\n<div>Save ten or more places to your list.</div>\n</div>\n",has_location:!1,location:!1,map:!1,event:["save_place"],icon:{id:42809,url:"https://cms.vibemap.com/wp-content/uploads/2021/08/collector.png",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"Collector"},{id:40175,slug:"jack-london-challenge",status:"publish",type:"neighborhood",categories:[],vibe:[],key:"jack-london-challenge",description:"<p><strong>Unlock specials and win prizes by joining the Jack London Neighborhood Challenge!</strong></p>\n<h3>How does this work?</h3>\n<p>Earn Challenge Points by using Vibemap to <strong>add vibes, save places, and share tips about your favorite Jack London places.</strong> Rack up more points while you’re out and about by <strong>checking in and redeeming discount codes</strong> at some of the neighborhood’s most popular spots.</p>\n",has_location:!0,location:{ID:36165,post_title:"Jack London",post_name:"jack-london-oakland"},map:{address:"Jack London District, Oakland, CA, USA",lat:37.7947392,lng:-122.2771389,city:"Oakland",name:"Jack London District",zoom:14},event:["add_vibe","save_place","add_tip","check_in","promo","share"],icon:{id:41465,url:"https://cms.vibemap.com/wp-content/uploads/2021/08/Badge_Oak-01-5.jpg",icon:"https://cms.vibemap.com/wp-includes/images/media/default.png"},name:"Jack London Neighborhood Challenge"}],badges$1={badges:badges};axiosRetry__default.default(Axios__default.default,{retries:3,retryDelay:axiosRetry__default.default.exponentialDelay}),dayjs__default.default.extend(isBetween__default.default),dayjs__default.default.extend(utc__default.default);const wordpress=require("../dist/wordpress.js"),activityCategories=require("../dist/activityCategories.json"),ApiUrl="https://api.vibemap.com/v0.3/",filterList=(e=[{test:"test",value:"foo"},{test:"test",value:"bar"}],a="food",t="value")=>{const i=new RegExp(a.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g,"\\$&"),"i");return e.filter(e=>(e=>i.test(e[t]))(e))},getRandomItem=e=>{return e[Math.floor(Math.random()*e.length)]},encodeCardIndex=(e,a)=>{return e+a/10},matchLists=(e,a)=>{let t=0;return t=0<e.length&&0<a.length?e.filter(e=>a.includes(e)).length:t},rankVibes=(e,t)=>{let a=[];return(a=e.map(e=>{let a=0;return a=t.includes(e)?t.length-t.indexOf(e):a})).reduce((e,a)=>e+a,0)/a.length},sortByKey=(e,a)=>(console.log("sortByKey (a, b)",e,a),e),isClosedToday=e=>"00:00:00"===e.opens&&"00:00:00"===e.closes,displayHours=(t,i="dd")=>{var a=isOpen(t),o=t.find(({day_of_week:e})=>8===e);if(a.openEveryday){let e=[];a=dayjs__default.default(a.opens).format("ha")+"-"+dayjs__default.default(a.closes).format("ha"),a=(e.push(a),t.find(e=>"POPULAR"==e.name));return console.log("Popular at: ",a),e}let s=0,n=[];for(;s<7;){let e=t.find(e=>e.day_of_week==s),a=(t.find(e=>e.day_of_week==s&&"POPULAR"==e.name),!1);if(void 0!==e&&(a=isClosedToday(e)),void 0===e||a)if(a||void 0===o)n.push({day_of_week:s,closed:!0});else{let e=Object.assign({},o);e.day_of_week=s,n.push(e)}else e.closed=!1,n.push(e);s++}return n.map(e=>{var a,t=(e.day_of_week+1)%7;return!0===e.closed?dayjs__default.default().day(t).format(i)+" Closed":(a=e.opens.split(":"),e=e.closes.split(":"),dayjs__default.default().day(t).format(i)+": "+dayjs__default.default().hour(a[0]).minute(a[1]).format("ha")+"-"+dayjs__default.default().hour(e[0]).minute(e[1]).format("ha"))})},isOpen=(e,a=dayjs__default.default())=>{const t=a.day();var i=a.format("YYYY-MM-DD");if(a.hour(),!e)return{openNow:!1,openToday:!1,isPopular:!1};let o=e.find(({day_of_week:e})=>e===t);var s=e.find(({day_of_week:e})=>8===e),e=e.filter(e=>isClosedToday(e)),e=void 0!==s&&0==e.length;if(o=void 0===o?s:o){const n=dayjs__default.default(i+" "+o.opens),r=dayjs__default.default(i+" "+o.closes);s=a.isBetween(n,r),i=s&&"POPULAR"===o.name;return n.format("ha"),r.format("ha"),{openNow:s,openToday:!0,openEveryday:e,opens:n,closes:r,isPopular:i}}return{openNow:!1,openToday:!1,openEveryday:!1,isPopular:!1}},getCardOptions=a=>{let{categoryQuery:e,distanceQuery:t,geoQuery:i,searchQuery:o,vibeQuery:s}=a.singCards.posts[0];a.overrideQuery&&a.overrideQuery.vibe&&(s=a.overrideQuery.vibe),a.overrideQuery&&a.overrideQuery.cities&&0<a.overrideQuery.cities.length&&(n=cities.filter(e=>e.slug===a.overrideQuery.cities[0]),i=i||n[0].location,t=t||7),a.overrideQuery&&a.overrideQuery.location&&(i=a.overrideQuery.location,t=a.overrideQuery.distance||t),i||(n=cities.filter(e=>"oakland"===e.slug),i=n[0].location);var n=(s="string"==typeof s?s.replace(/\s/g,"").split(","):s)?s.map(e=>"string"==typeof e?e:e.slug):[],n={category:e,distance:t,point:i.longitude+","+i.latitude,ordering:"vibe",search:o,vibes:n};return console.log("cardOptions, ",n),n},getAPIParams=(e,a=50)=>{var{activity:t,distance:i}=e;let o=Object.assign({},e),s=1;return 0<i&&(s=Math.round(i*constants.METERS_PER_MILE)),o.ordering="-aggregate_rating",o.per_page=a,"all"!==t&&null!==t&&(o.category=t),o.dist=s,delete o.activity,delete o.distance,delete o.bounds,o},getCategoryMatch=(e=["all"])=>{const a=activityCategories.activityCategories.map(e=>e.slug);let t=[];return e.map(e=>(a.includes(e)&&t.push(e),!0)),t},getFullLink=(e,a="instagram")=>{if(null===e||""===e)return null;const t=i.parse(e);let i=new URL(e);e=t.path.replace("/","");return{instagram:"https://instagram.com/",twitter:"https://twitter.com/",facebook:"https://facebook.com/"}[a]+e},getMax=(e,a)=>{let t=0;return e.forEach(e=>{e=e.properties[a];e>t&&(t=e)}),t},getMin=(e,a)=>{let t=100;return e.forEach(e=>{e=e.properties[a];e<t&&(t=e)}),t},getTimeOfDay=e=>{if(e&&e.isValid())return e=parseFloat(e.format("HH")),12<=e&&e<=17?"afternoon":17<=e?"evening":"morning"},getTopVibes=e=>{let a={};e.map(e=>(e.properties.vibes.map(e=>(a.hasOwnProperty(e)?a[e]+=1:a[e]=1,null)),null));var t,i=[];for(t in a)i.push([t,a[t]]);return i.sort(function(e,a){return a[1]-e[1]})},getTopCategories=(e,a="categories")=>{let t={};e.map(e=>(e.properties[a].map(e=>(t.hasOwnProperty(e)?t[e]+=1:t[e]=1,null)),null));var i,o=[];for(i in t)o.push([i,t[i]]);return o.sort(function(e,a){return a[1]-e[1]})},getWaveFromVibe=e=>"buzzing"!==e?"medium":"high",graphToEvents=(e=[])=>{return e.map(e=>{e=e.node;const a=e.groupDetails;var t=a.name,i=a.link,e=e.slug,o=a.description,s=a.image?a.image.mediaItemUrl:null,s=[{url:s,original:s}],n=a.map,r=a.price||"free",l=a.vibes?a.vibes.map(e=>e.slug):[],d=(a.recurring,a.recurrence),c=a.which,u=a.day[1],g=a.startTime||"00:00",p=a.startTime?a.endTime:"00:00";const m=nextDateFromRecurring(d,u,c);d=dayjs__default.default(m.next(1).toLocaleString().replace("00:00:00",g)),u=dayjs__default.default(m.next(1).toLocaleString().replace("00:00:00",p));return{id:e,title:t,geometry:{type:"Point",coordinates:[-122.26747099999956,37.81396520000001]},dateTime:d,image:s,type:"event",properties:{name:t,title:t,url:i,address:n&&n.streetAddress,categories:[],city:a.cities&&a.cities[0].slug,description:o,is_online:!1,images:[],hotspots_place:n,location:n,start_date:d,end_date:u,vibemap_images:s,likes:10,price:r,recurs:!0,vibes:l}}})},normalize=(e,a,t)=>(e-a)/(t-a)*10,normalize_all=(e=500,a=1,t=100,i=1,o=10)=>{const s=LinearScale__default.default().domain([a,t]).range([i,o]);return s(e)},scaleIconSize=(e=5,a=1,t=100)=>{const i=LinearScale__default.default().domain([a,t]).range([1,5]);return i(e)},scaleMarker=(e=50,a,t=100,i=14)=>{isNaN(e)&&(e=3.5);const o=LinearScale__default.default().domain([8,20]).range([10,30]);var i=o(i),s=3*i;let n=LinearScale__default.default().domain([0,t]).range([i,s]);return Math.round(n(e))},scaleDensityArea=(e=10,a)=>{let t=LinearScale__default.default().domain([1,60,1e3]).range([0,.8,1]);return t(e)},scaleDensityBonus=e=>{let a=LinearScale__default.default().domain([0,1]).range([2*constants.HEATMAP_INTENSITY,constants.HEATMAP_INTENSITY]);return a(e)},scaleScore=(e=2)=>{let a=LinearScale__default.default().domain([0,5]).range([60,100]);return Math.round(a(e))},scaleSelectedMarker=e=>{let a=LinearScale__default.default().domain([8,12,20]).range([.1,1.2,4]);return Math.round(a(e))},getEventOptions=(a="oakland",e="month",t=10,i=null,o=[],s)=>{var n=cities.filter(e=>e.slug===a)[0].location;const r=dayjs__default.default();var l=r.day()+1;r.startOf("day");let d=0,c=0;switch(e){case"day":c=1;break;case"weekend":c=7-l;break;case"next_week":d=8-l,c=7;break;case"month":const p=dayjs__default.default().endOf("month");c=p.diff(r,"day");case"quarter":c=90}let u=r.add(d,"days").startOf("day"),g=r.add(c,"days").endOf("day");return{category:i,distance:t,point:n.longitude+","+n.latitude,ordering:"vibe",start_date:u.format("YYYY-MM-DD HH:MM"),end_date:g.format("YYYY-MM-DD HH:MM"),search:s,vibes:o}},fetchEvents=async(e,a=!1)=>{let{city:t,category:i,days:o,point:s,search:n}=e;s.split(",").map(e=>parseFloat(e)),dayjs__default.default().startOf("day").format("YYYY-MM-DD HH:MM"),dayjs__default.default().add(o,"days").format("YYYY-MM-DD HH:MM"),a&&i&&(e.search=`${i||""} `+(n||""));var a=module.exports.getAPIParams(e),e=querystring__default.default.stringify(a),a=ApiUrl+"events/",r=Axios__default.default.CancelToken.source();let l=await Axios__default.default.get(a+"?"+e,{cancelToken:r.token}).catch(function(e){return console.log("Axios error ",e.response),{data:[],count:0,top_vibes:null,loading:!1,timedOut:!1}});a=await wordpress.getGroups({search:t||""});const d=graphToEvents(a.data);return l.data.results.features=d.concat(l.data.results.features),l},nextDateFromRecurring=(...[e,a,t])=>{const i=dayjs__default.default();t=["first","second","third","fourth","fifth"].indexOf(t),t=0<t?t:0;return"monthly"==e?i.recur().every(a).daysOfWeek().every([t]).weeksOfMonthByDay():i.recur().every(a).daysOfWeek()},fetchPlacesDetails=async(e,a="place")=>{var t=Axios__default.default.CancelToken.source();let i;if("event"==a&&(i=ApiUrl+"events/"),i="place"==a?ApiUrl+"places/":i)return await Axios__default.default.get(""+i+e,{cancelToken:t.token}).catch(function(e){return console.log("Axios error ",e),null})},fetchPlacePicks=async(e={distance:5,point:"-123.1058197,49.2801149",ordering:"vibe",vibes:["chill"],preferredVibes:[],relatedVibes:[]})=>{let{activity:a,ordering:t,per_page:i,point:o,vibes:s,preferredVibes:n,relatedVibes:r}=e;var l=i||350,l=getAPIParams(e,l),d=o.split(",").map(e=>parseFloat(e)),l=querystring__default.default.stringify(l),c=ApiUrl+"places/",u=Axios__default.default.CancelToken.source(),c=await Axios__default.default.get(c+"?"+l,{cancelToken:u.token}).catch(function(e){return console.log("Axios error ",e.response),{data:[],count:0,top_vibes:null,loading:!1,timedOut:!1}}),l=formatPlaces(c.data.results.features),u=c.data.count;const g=s||[];c=g.concat(r||[]).concat(n||[]);return{data:scorePlaces(l,d,c,["aggregate_rating","vibes","distance","offers","hours"],t,void 0,e),count:u,top_vibes:getTopVibes(l),loading:!1,timedOut:!1}},decodePlaces=e=>{return e.map(e=>(e.properties.vibes=JSON.parse(e.properties.vibes),e.properties.subcategories=JSON.parse(e.properties.subcategories),e.properties.categories=JSON.parse(e.properties.categories),e.properties.vibemap_images=[],e.properties.images=[e.properties.thumbnail_url],null!=e.properties.opening_hours&&(e.properties.opening_hours=JSON.parse(e.properties.opening_hours)),delete e.properties.tips,delete e.properties.facebook,delete e.properties.telephone,delete e.properties.website,e))},formatPlaces=e=>{const i=allCategories.categories.map(e=>Object.keys(e)[0]);return e.map(e=>{let a=e.properties;a.place_type="places",a.short_name=truncate__default.default(a.name,constants.TRUCATE_LENGTH),a.aggregate_rating=parseFloat(a.aggregate_rating),a.sub_categories=a.sub_categories,a.top_vibe=null;var t=a.categories.filter(e=>i.includes(e.toLowerCase()));return void 0!==a.categories&&0!==a.categories.length&&0!==t.length||(a.categories=["missing"]),a.icon=t[0],a.cluster=null,e.properties=a,e})},vibesFromPlaces=e=>{return[]},getRecommendedVibes=e=>{return[]},scorePlaces=(e,d,c=[],u=["vibes","distance"],a,t=12,i)=>{let g={};let p={};u.map(e=>g[e]=1e-5),u.map(e=>p[e]=1/0);t=t<=10?10:t,t=normalize_all(t,10,20,0,10);let s={category:0,vibe:10,distance:8/(1+7*Math.exp(1)**(-.7*t)),rating:0,hours:0,offers:0};"relevance"!==a&&(s[a]+=3);const o=e.map(e=>{let t=e.properties;if(t.stats={},u.includes("vibes")){let[e,a]=[0,0];void(t.vibes_score=0)===t.vibes&&(t.vibes=["chill"]);var o=0<t.vibes.length?2*Math.log10(t.vibes.length):0;0<t.vibes.length&&(t.vibes_score=o),t.images&&0<t.images.length&&(a+=0<t.images.length?2*Math.log10(t.images.length):0),c&&0<c.length&&t.vibes&&(o=2*(e=matchLists(c,t.vibes))*10,i=2*rankVibes(c,t.vibes),a+=o+i,t.vibes_score+=a,t.stats.num_vibes=t.vibes.length,t.stats.num_matching_vibes=e,t.stats.vibe_match_score=o,t.stats.vibe_order_score=i),t.vibes_score>g.vibes&&(g.vibes=t.vibes_score),t.vibes_score<p.vibes&&(p.vibes=t.vibes_score),t.stats.total_vibe_score=t.vibes_score}if(u.includes("categories")){o=[0][0];t.categories_score=0;const r=t.categories.concat(t.subcategories),l=r.filter((e,a)=>r.indexOf(e)==a);if(0<t.categories.length&&(t.categories_score=t.categories.length),0<c.length){let i=[];l.forEach(a=>{var e=constants.place_sub_categories.filter(e=>e.main_category.includes(a)),t=constants.place_sub_categories.filter(e=>e.name.includes(a));0<e.length&&(i=i.concat(e[0].vibes)),0<t.length&&(i=i.concat(t[0].vibes))});o=matchLists(c,i);t.categories_score+=10*o}t.categories_score>g.categories&&(g.categories=t.categories_score),t.categories_score<p.categories&&(p.categories=t.categories_score)}var i,a,s,n;return u.includes("likes")&&(t.likes>g.likes&&(g.likes=t.likes),t.likes<p.likes&&(p.likes=t.likes)),u.includes("distance")&&(i=turf__namespace.point(e.geometry?e.geometry.coordinates:[0,0]),t.distance=turf_distance__default.default(d,i),t.distance>g.distance&&(g.distance=t.distance),t.distance<p.distance&&(p.distance=t.distance)),u.includes("aggregate_rating")&&(t.aggregate_rating>g.aggregate_rating&&(g.aggregate_rating=t.aggregate_rating),t.aggregate_rating<p.aggregate_rating&&(p.aggregate_rating=t.aggregate_rating)),t.offers_score=0,t.hours_score=0,u.includes("offers")&&(t.offers&&0<t.offers.length&&(t.offers_score=2),{openNow:o,openToday:i,opens:a,closes:s,isPopular:n}=isOpen(t.opening_hours),t.open_now=o,t.popular_now=n,t.opens=a,t.closes=s,i&&(t.hours_score+=.5),o&&(t.hours_score+=.5),n&&(t.hours_score+=5)),t.stats.hours_bonus=t.hours_score,e.properties=t,e});let n=0,r=1/0,l=o.map(e=>{let a=e.properties;u.includes("vibes")&&(a.vibes_score=normalize_all(a.vibes_score,p.vibes,g.vibes,0,1),a.vibes_score=a.vibes_score*s.vibe),u.includes("categories")&&(a.categories_score=normalize_all(a.categories_score,p.categories,g.categories,0,1),a.categories_score=a.categories_score*s.category),u.includes("likes")&&(a.likes_score=normalize_all(a.likes,p.likes,g.likes,0,1)),u.includes("aggregate_rating")&&(a.aggregate_rating_score=normalize_all(a.aggregate_rating,p.aggregate_rating,g.aggregate_rating,0,1),a.aggregate_rating_score*=s.rating,a.stats.aggregate_rating_score=a.aggregate_rating),u.includes("distance")&&(t=g.distance,a.distance_score=1-normalize_all(a.distance,p.distance,t,0,.95),a.distance_score*=s.distance,a.stats.distance_score=a.distance_score),u.includes("hours")&&(a.hours_score*=s.hours);var t=u;const i=u.map(e=>a[e+"_score"]);var o=i.indexOf(Math.max.apply(null,i));return i.indexOf(Math.min.apply(null,i)),a.average_score=i.reduce((e,a)=>e+a,0)/i.length,a.average_score>n&&(n=a.average_score),a.average_score<r&&(r=a.average_score),a.reason=t[o],e.properties=a,e});const m=l.sort((e,a)=>a.properties.average_score-e.properties.average_score);return m.map(e=>{let a=e.properties;return a.average_score=normalize_all(a.average_score,r,n,.65,1),a.icon_size=scaleIconSize(a.average_score,.65,1),a.stats.final_score_normalized=a.average_score,e})},reducePlaceProperties=(e,t=["name","url","address","categories","subcategories","neighborhood","price","short_description","vibemap_images","vibes"])=>{return e.map(a=>(a.properties=Object.fromEntries(t.map(e=>[e,a.properties[e]])),a))},toTitleCase=e=>{if("string"!=typeof e)return e;e=e.toLowerCase().split(" ");for(var a=0;a<e.length;a++)e[a]=e[a].charAt(0).toUpperCase()+e[a].slice(1);return e.join(" ")},nearest_places=(e,i,o=5)=>{var s=[],e=(e.map(e=>{let a=e.properties;var t=turf__namespace.point(e.geometry.coordinates);a.distance=turf_distance__default.default(i,t),a.distance<o&&s.push(e)}),s.slice(0));return e.sort(function(e,a){return e.properties.distance-a.properties.distance}),e},validate_check_in=(e,a,t=.5)=>{e=turf__namespace.point(e.geometry.coordinates);return turf_distance__default.default(a,e)<t},in_jls=e=>{var a=turf__namespace.polygon([[[-122.282617,37.802862],[-122.2643,37.795721],[-122.265502,37.787005],[-122.288139,37.796077],[-122.282617,37.802862]]]);return turf_boolean__default.default(e,a)},in_neighborhood=t=>{const i=[],o=[],s=turf__namespace.point(t.geometry.coordinates);return neighborhoods.map(e=>{var a=turf_distance__default.default([e.map.lng,e.map.lat],s);a<5&&in_bbox_helper(t.geometry.coordinates,e.boundary)?(i.push(e.id),o.push(e.slug)):1e-5<e.radius&&a<e.radius?(console.log("radius checked"),i.push(e.id),o.push(e.slug)):a<.8&&(console.log("dist checked"),i.push(e.id),o.push(e.slug))}),i},in_bbox_helper=(e,a)=>{return""!==a&&void 0!==a&&(a=JSON.parse(a),a=turf__namespace.polygon([a]),turf_boolean__default.default(e,a))},nearest_neighborhood=a=>{const e=neighborhoods.map(e=>({name:e.title.rendered,neigh_dist:turf_distance__default.default([e.map.lng,e.map.lat],a)}));return e.sort(function(e,a){return e.neigh_dist-a.neigh_dist}),e.slice(0,10)},challenge_badges_lookup=()=>{const a=[];return badges$1.badges.map(e=>{"neighborhood"==e.type&&a.push(e)}),a},associate_badge=t=>{const e=challenge_badges_lookup(),i=[];return e.map(a=>{console.log(a);for(let e=0;e<t.length;e++)a.location.ID==t[e]&&i.push(a)}),i},sortNeighborhoodsByVibes=(e,a)=>{if(0===a.length)return e;var t=vibes.getRelatedVibes(a);const o=[...new Set([...a,...t])],i=e.map(e=>{const a=e.vibes||e.acf.vibes,t=a.map(({slug:e})=>e);var i=o.filter(e=>t.includes(e)).length;return{...e,vibeIntersection:i}}),s=i.sort((e,a)=>a.vibeIntersection-e.vibeIntersection);return s.map(e=>{const{vibeIntersection:a,...t}=e;return t})};exports.associate_badge=associate_badge,exports.challenge_badges_lookup=challenge_badges_lookup,exports.decodePlaces=decodePlaces,exports.displayHours=displayHours,exports.encodeCardIndex=encodeCardIndex,exports.fetchEvents=fetchEvents,exports.fetchPlacePicks=fetchPlacePicks,exports.fetchPlacesDetails=fetchPlacesDetails,exports.filterList=filterList,exports.formatPlaces=formatPlaces,exports.getAPIParams=getAPIParams,exports.getCardOptions=getCardOptions,exports.getCategoryMatch=getCategoryMatch,exports.getEventOptions=getEventOptions,exports.getFullLink=getFullLink,exports.getMax=getMax,exports.getMin=getMin,exports.getRandomItem=getRandomItem,exports.getRecommendedVibes=getRecommendedVibes,exports.getTimeOfDay=getTimeOfDay,exports.getTopCategories=getTopCategories,exports.getTopVibes=getTopVibes,exports.getWaveFromVibe=getWaveFromVibe,exports.in_bbox_helper=in_bbox_helper,exports.in_jls=in_jls,exports.in_neighborhood=in_neighborhood,exports.isClosedToday=isClosedToday,exports.isOpen=isOpen,exports.matchLists=matchLists,exports.nearest_neighborhood=nearest_neighborhood,exports.nearest_places=nearest_places,exports.normalize=normalize,exports.normalize_all=normalize_all,exports.rankVibes=rankVibes,exports.reducePlaceProperties=reducePlaceProperties,exports.scaleDensityArea=scaleDensityArea,exports.scaleDensityBonus=scaleDensityBonus,exports.scaleIconSize=scaleIconSize,exports.scaleMarker=scaleMarker,exports.scaleScore=scaleScore,exports.scaleSelectedMarker=scaleSelectedMarker,exports.scorePlaces=scorePlaces,exports.sortByKey=sortByKey,exports.sortNeighborhoodsByVibes=sortNeighborhoodsByVibes,exports.toTitleCase=toTitleCase,exports.validate_check_in=validate_check_in,exports.vibesFromPlaces=vibesFromPlaces;
