"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var Axios=require("axios"),dayjs=require("dayjs"),utc=require("dayjs/plugin/utc"),isBetween=require("dayjs/plugin/isBetween");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var Axios__default=_interopDefaultLegacy(Axios),dayjs__default=_interopDefaultLegacy(dayjs),utc__default=_interopDefaultLegacy(utc),isBetween__default=_interopDefaultLegacy(isBetween),activityCategories=[{id:6295,description:"Discover the best things to do in %city%, based on your vibe. Guides, events, activities, and more to help you plan a visit or weekend. Whether you’re a first time visitor or long-time local, we'll recommend something fun and interesting.",name:"All",slug:"all",parent:0,details:{verb:"Do",noun:"Things to do",vibeset:[399],sub_categories:[{name:"Food",description:"Find places to eat and explore culinary culture. Whether your vibe is a lively brunch, a friendly lunch, a chill breakfast, or an intimate dinner, we've got you covered with the best restaurants and other places to eat, including outdoor patios, rooftop bars, and markets. You can also discover by taste, like savory, sweet, and spicy.\n",parent:6295,slug:"food",id:6331},{name:"Visit",description:"Visitors guide to the best of %city%. Discover culture, history, and landmarks while having a fun, memorable time sightseeing and exploring. We've collected must see spots and favorite for tourist and locals alike. Plan your trip or weekend getaway and book these attractions for free or at a discount. ",parent:0,slug:"visit",id:6298},{name:"Drink",description:"Where to drink and enjoy beer, wine, cocktails and sober-friendly options including coffee, tea, and more. Discover drinking styles like tiki, bubbly, and sober-friendly. Beyond watering holes, check out outdoor spots, events, and tours. ",parent:6295,slug:"drinking",id:6328},{name:"Art",description:"",parent:6295,slug:"art",id:6291},{name:"Outdoors",description:"",parent:6295,slug:"outdoors",id:6340},{name:"Community",description:"Explore ways to get involved in your local community. Support local businesses, volunteer, give back, or pay it forward with these community groups and hubs of local culture. ",parent:6295,slug:"community",id:6293},{id:6292,description:"",name:"Comedy",slug:"comedy",parent:6295,term_id:6292},{id:6334,description:"",name:"Entertainment",slug:"entertainment",parent:6295,term_id:6334},{id:6337,description:"",name:"Fitness",slug:"games",parent:6295,term_id:6337}],msv:"1830",icon:"allLogo",vibes:["dreamy","creative","fun","local","new","amazing","family","trending","classic","adventurous"],search_term:""}},{id:6291,description:"",name:"Art",slug:"art",parent:6295,details:{verb:"Art",noun:"Art",msv:"8",sub_categories:[{name:"Gallery",description:"",parent:6291,slug:"gallery",id:6307}],vibeset:[262],vibes:["artsy","creative","inspired"],icon:"art"}},{id:6292,description:"",name:"Comedy",slug:"comedy",parent:6295,term_id:6292},{id:6293,description:"Explore ways to get involved in your local community. Support local businesses, volunteer, give back, or pay it forward with these community groups and hubs of local culture. ",name:"Community",slug:"community",parent:6295,details:{verb:"Get Involved",noun:"Community",vibeset:[396,399],sub_categories:[],msv:"2",icon:"community",vibes:["community","local","cultural","multicultural","social"],search_term:""}},{id:6328,description:"Where to drink and enjoy beer, wine, cocktails and sober-friendly options including coffee, tea, and more. Discover drinking styles like tiki, bubbly, and sober-friendly. Beyond watering holes, check out outdoor spots, events, and tours. ",name:"Drink",slug:"drinking",parent:6295,details:{verb:"Drink",noun:"Drinking",sub_categories:[],vibeset:[390],vibes:["fun","boozy","happy","cheap","friendly"],msv:"90",icon:"drink",search_term:""}},{id:6334,description:"",name:"Entertainment",slug:"entertainment",parent:6295,term_id:6334},{id:6323,description:"Explore what's happening in %city%. Make a plan for tonight or this weekend with your events calendar. Explore art, music, nightlife based on your vibe. You can get free and discounted tickets on Vibemap and easily add events to your social calendar or share with friends. Every time you go to an event you earn points towards unique events, experience, and ways to socialize. You also earn discounts and rewards and local venues.",name:"Events",slug:"events",parent:0,details:{verb:"Events",noun:"Events",sub_categories:[],vibeset:!1,vibes:["local","chill","fun","unique"],msv:"246",icon:"events",search_term:""}},{id:6337,description:"",name:"Fitness",slug:"games",parent:6295,term_id:6337},{id:6331,description:"Find places to eat and explore culinary culture. Whether your vibe is a lively brunch, a friendly lunch, a chill breakfast, or an intimate dinner, we've got you covered with the best restaurants and other places to eat, including outdoor patios, rooftop bars, and markets. You can also discover by taste, like savory, sweet, and spicy.\n",name:"Food",slug:"food",parent:6295,details:{verb:"Eat",noun:"Food",sub_categories:[],vibeset:[387],vibes:["local","foodie","authentic","new","spicy","sweet","popup"],msv:"1500",icon:"food",search_term:""}},{id:6307,description:"",name:"Gallery",slug:"gallery",parent:6291,details:{vibes:["small","local","community"],sub_categories:[]}}],cities=[{id:45678,slug:"houston",type:"official",location:{latitude:29.760314934412516,longitude:-95.36962040978698},mailchimp_id:"ea2fe099f2",name:"Houston"},{id:44901,slug:"puerto-vallarta",type:"early",location:{latitude:20.615046993637947,longitude:-105.231817181398},mailchimp_id:"57c905a1df",name:"Puerto Vallarta"},{id:38387,slug:"austin",type:"early",location:{latitude:30.267153,longitude:-97.7430608},mailchimp_id:"1d933c234f",name:"Austin"},{id:38380,slug:"denver",type:"early",location:{latitude:39.7392358,longitude:-104.990251},mailchimp_id:"b576abf895",name:"Denver"},{id:38148,slug:"chicago",type:"early",location:{latitude:41.8781136,longitude:-87.6297982},mailchimp_id:"b865b3ef72",name:"Chicago"},{id:38143,slug:"new-york",type:"early",location:{latitude:40.7127610684055,longitude:-74.0060103509262},mailchimp_id:"56ebd9923f",name:"New York"},{id:38137,slug:"san-diego",type:"official",location:{latitude:32.715738,longitude:-117.1610838},mailchimp_id:"7fb6e2a465",name:"San Diego"},{id:38119,slug:"los-angeles",type:"official",location:{latitude:34.04734503476973,longitude:-118.25308336038819},mailchimp_id:"7fb6e2a465",name:"Los Angeles"},{id:1450,slug:"guadalajara",type:"official",location:{latitude:20.65969879999999,longitude:-103.3496092},mailchimp_id:"0154de5655",name:"Guadalajara"},{id:1447,slug:"oakland",type:"official",location:{latitude:37.8043514,longitude:-122.2711639},mailchimp_id:"da0894a0e6",name:"Oakland"},{id:1444,slug:"san-francisco",type:"official",location:{latitude:37.7749295,longitude:-122.4194155},mailchimp_id:"f30df08e52",name:"San Francisco"},{id:1441,slug:"portland",type:"official",location:{latitude:45.5051064,longitude:-122.6750261},mailchimp_id:"27c0467a17",name:"Portland"},{id:1438,slug:"seattle",type:"official",location:{latitude:47.6062095,longitude:-122.3320708},mailchimp_id:"baadb78d87",name:"Seattle"},{id:1435,slug:"vancouver",type:"official",location:{latitude:49.2827291,longitude:-123.1207375},mailchimp_id:"da30e0d7dc",name:"Vancouver"}];const jsonpack=require("jsonpack"),GATSBY_WP_BASEURL=(dayjs__default.default.extend(isBetween__default.default),dayjs__default.default.extend(utc__default.default),"https://cms.vibemap.com"),REST_PATH="/wp-json/wp/v2/",helpers=require("./helpers.js"),postCategories=require("../dist/postCategories");let vibeTaxonomy=[];try{const b=require("../dist/vibesFromCMSTaxonomy.zip.json");vibeTaxonomy=jsonpack.unpack(b)}catch(e){console.log("Error with packed vibes ",e)}const defaultFilters={categories:[],cities:[],vibesets:[],vibes:[]},getTaxonomyIds=(e,t=["chill"])=>{switch(e){case"category":return t.map(e=>{const t=helpers.filterList(activityCategories,e,"slug");return 0<t.length?t.map(e=>e.id):[]});case"vibe":return t.map(e=>{const t=helpers.filterList(vibeTaxonomy,e,"slug");return 0<t.length?t.map(e=>e.id):[]});case"cities":return t.map(e=>{const t=helpers.filterList(cities,e,"slug");return 0<t.length?t.map(e=>e.id):[]})}return[]},fetchBadges=async()=>{var e=GATSBY_WP_BASEURL+REST_PATH+"badges";return await Axios__default.default.get(e).catch(e=>console.error(e))},fetchCities=async(e=50)=>{e=`?_fields=id, link, name, slug, title, acf, type
    &per_page=`+e,e=GATSBY_WP_BASEURL+REST_PATH+"city"+e;return await Axios__default.default.get(e).catch(e=>console.error(e))},fetchNeighborhoods=async(e=defaultFilters,t=1,i=100)=>{var a=Axios__default.default.CancelToken.source(),o=GATSBY_WP_BASEURL+"/wp-json/wp/v2/neighborhoods?_fields=id, slug, type, link, _links, title, categories, vibe, acf, content, featured_media, featured_media_src_url";console.log("Wordpress URL ",o);let s=await Axios__default.default.get(o,{cancelToken:a.token,params:{_embed:!0,per_page:i,page:1<=t?t:1,categories:e.category,vibesets:e.vibesets.toString()}}).catch(e=>{console.error(e)});return s.numPages=parseInt(s.headers["x-wp-totalpages"]),s},fetchActivityCategories=async(e=defaultFilters,t,i)=>{var a=Axios__default.default.CancelToken.source(),o=GATSBY_WP_BASEURL+"/wp-json/wp/v2/activity-category";let s=await Axios__default.default.get(o,{cancelToken:a.token}).catch(e=>{console.error(e)});return s.numPages=parseInt(s.headers["x-wp-totalpages"]),s},fetchCategories=async(e=defaultFilters,t,i)=>{var a=Axios__default.default.CancelToken.source();let o=await Axios__default.default.get(GATSBY_WP_BASEURL+"/wp-json/wp/v2/categories/",{cancelToken:a.token}).catch(e=>{console.error(e)});return o.numPages=parseInt(o.headers["x-wp-totalpages"]),o},getCityInfo=(t="San Francisco",i=null)=>{let e=null;i&&(i=i.toString(),a=cities.filter(e=>e.slug===i.toString()),e=0<a.length?a[0]:null);var a=cities.filter(e=>e.name===t);return e=0<a.length?a[0]:null},filterNeighborhoods=(e,t="San Francisco",i=null)=>{var a;i&&(i=i.toString(),a=cities.filter(e=>e.slug===i.toString()),t=0<a.length?a[0].title.rendered:null);return t||i?filter(e,e=>e.city===t||e.title.includes(t)):e},fetchVibeTaxonomy=async(e=1,t=100,i=["acf","id","link","name","slug","description"])=>{var a=async(e=1,t=100)=>{t=`?_fields=${i.join(",")}&per_page=${t}&page=`+e,e=GATSBY_WP_BASEURL+REST_PATH+"vibe"+t;return(await Axios__default.default.get(e).catch(e=>console.error(e))).data};let o=await a(e,t),s=!0;var r;let n=e;for(;s;)o.length>=n*t?(r=await a(n+=1).catch(e=>console.error(e)),o=o.concat(r)):s=!1;return o},getGroups=async({city:t="Vancouver",per_page:e=100}={})=>{e="?_fields=id,date,slug,title,acf&per_page="+e,e=GATSBY_WP_BASEURL+REST_PATH+"group"+e;const i=(await Axios__default.default.get(e).catch(e=>console.error(e))).data;e=i.filter(e=>e.acf.map&&t?t===e.acf.map.city?e:void 0:(e.title=e.title.rendered,e));return groupsToEvents(e),e?{error:!1,data:e,message:`Got ${i.length} groups`}:{error:!0,data:[],message:"No data for groups"}},getPosts=async(e=defaultFilters,t=!1,i=20,a=["id","date","slug","status","type","link","title","content","excerpt","author","categories","vibe","blocks","acf","featured_media","featured_media_src_url"],o=!1)=>{o=o?"&_embed":"",a="?_fields="+a.join(","),a=""+GATSBY_WP_BASEURL+REST_PATH+"posts"+a+o;const s={per_page:i,cities:getTaxonomyIds("cities",e.cities).toString(),sticky:!0};e.category&&0<e.category.length&&(s.category=getTaxonomyIds("category",e.category).toString()),e.vibes&&0<e.vibes.length&&(s.search=e.vibes.join(", "));let r=await Axios__default.default.get(a,{params:s}).catch(e=>{console.error("Wordpress error",e)}),n=(s.sticky=!1,await Axios__default.default.get(a,{params:s}).catch(e=>console.error(e)));o=n.data.filter(e=>!0!==e.acf.hide_post).map(t=>{var e=postCategories.filter(e=>e.id===t.categories[0]);return t.category=e?e[0].name:"Guide",t});return!0===t?r:(n.data=n?r.data.concat(o):r,n)},getPost=async e=>{Axios__default.default({url:"https://cms.vibemap.com/graphql",method:"post",data:{operationName:"PostDetails",query:`query PostDetails($id: String!) {
      posts {
        nodes {
          id
          slug
        }
      }
    }
    `,variables:{id:e}}}).then(e=>{console.log(e.data)})};exports.fetchActivityCategories=fetchActivityCategories,exports.fetchBadges=fetchBadges,exports.fetchCategories=fetchCategories,exports.fetchCities=fetchCities,exports.fetchNeighborhoods=fetchNeighborhoods,exports.fetchVibeTaxonomy=fetchVibeTaxonomy,exports.filterNeighborhoods=filterNeighborhoods,exports.getCityInfo=getCityInfo,exports.getGroups=getGroups,exports.getPost=getPost,exports.getPosts=getPosts,exports.getTaxonomyIds=getTaxonomyIds;
