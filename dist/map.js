"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var geoViewport=require("@mapbox/geo-viewport"),Axios=require("axios"),turf=require("@turf/helpers"),meta=require("@turf/meta"),clusters=require("@turf/clusters"),bboxPolygon=require("@turf/bbox-polygon"),turf_boolean=require("@turf/boolean-point-in-polygon"),turf_center=require("@turf/center"),turf_distance=require("@turf/distance"),turf_truncate=require("@turf/truncate"),clustersDbscan=require("@turf/clusters-dbscan"),pointsWithinPolygon=require("@turf/points-within-polygon"),rhumbBearing=require("@turf/rhumb-bearing"),rhumbDistance=require("@turf/rhumb-distance"),rhumbDestination=require("@turf/rhumb-destination"),querystring=require("querystring");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function _interopNamespace(o){if(o&&o.__esModule)return o;var r=Object.create(null);return o&&Object.keys(o).forEach(function(e){var t;"default"!==e&&(t=Object.getOwnPropertyDescriptor(o,e),Object.defineProperty(r,e,t.get?t:{enumerable:!0,get:function(){return o[e]}}))}),r.default=o,Object.freeze(r)}var geoViewport__default=_interopDefaultLegacy(geoViewport),Axios__default=_interopDefaultLegacy(Axios),turf__namespace=_interopNamespace(turf),bboxPolygon__default=_interopDefaultLegacy(bboxPolygon),turf_boolean__default=_interopDefaultLegacy(turf_boolean),turf_center__default=_interopDefaultLegacy(turf_center),turf_distance__default=_interopDefaultLegacy(turf_distance),turf_truncate__default=_interopDefaultLegacy(turf_truncate),clustersDbscan__default=_interopDefaultLegacy(clustersDbscan),pointsWithinPolygon__default=_interopDefaultLegacy(pointsWithinPolygon),rhumbBearing__default=_interopDefaultLegacy(rhumbBearing),rhumbDistance__default=_interopDefaultLegacy(rhumbDistance),rhumbDestination__default=_interopDefaultLegacy(rhumbDestination),querystring__default=_interopDefaultLegacy(querystring);const getMax=(e,t)=>{let o=0;return e.forEach(e=>{e=e.properties[t];e>o&&(o=e)}),o},geocodeAddress=async(e="AIzaSyAJfpSSx6pudnbjILmdUPBG7O4Diu2RHgE",t="Red Bay Coffee Roasers",o=null)=>{const r=new URLSearchParams({address:t,key:e});if(null==e)return{error:!0,data:null,message:"No API key provided."};t="https://vibemap.com/googleGeocoder?"+r.toString()+(o?"&components=locality="+o:""),o=await Axios__default.default.get(t).catch(e=>(console.log("error ",e),{error:!0,data:e})),t=o&&o.data&&o.data.results?o.data.results:null;if(t&&0<t.length&&t[0].place_id){var a=t[0].place_id,e=await getPlaceDetails(e,a);const i=e.data;return!0!==e.error&&(i.id=a,i.source="google",a=i.geometry.location,i.geometry.coordinates=[a.lng,a.lat],i.properties={name:i.name,aggregate_rating:i.rating,address:i.address,telephone:i.formatted_phone_number,tips:i.reviews?i.reviews.map(e=>e.text):[],url:i.url}),{error:!1,data:{place:e.data,results:t}}}return{error:!1,data:{place:null,results:o.data}}},getPlaceDetails=async(e=null,t="ChIJAQDsXLeAj4ARx-92_aeMjX4")=>{if(null==e)return{error:!0,data:null,message:"No API key provided."};const o=new URLSearchParams({key:e,place_id:t});e="https://vibemap.com/googlePlaces?"+o.toString(),t=await Axios__default.default.get(e).catch(e=>(console.log("error ",e),{error:!0,data:null}));if(t.error||null==t.data||!t.data.result)return{error:!0,data:t.data};e=t.data.result;return{error:!1,data:{...e,address:e.formatted_address,url:e.website}}},getPlaceSocial=async(e,t="Vibemap",o="08cefff08b1db59b1")=>{if(null==e)return{error:!0,data:null,message:"No API key provided."};const r=new URLSearchParams({key:e,q:t,cx:o});console.log("Params to strng ",r.toString());e=`GET https://customsearch.googleapis.com/customsearch/v1
        ?${r.toString()} HTTP/1.1`,t=await Axios__default.default.get(e).catch(e=>(console.log("error ",e),{error:!0,data:e}));console.log("Response ",t)},getArea=e=>{return turf_distance__default.default([e[0],e[1]],[e[0],e[3]],{units:"miles"})*turf_distance__default.default([e[0],e[1]],[e[2],e[1]],{units:"miles"})},getBounds=(e,t,o)=>{return geoViewport__default.default.bounds([e.longitude,e.latitude],t,[o.width,o.height],512)},isPointInBounds=(e,t)=>{e=turf__namespace.point(e),t=getPolygon(t);return turf_boolean__default.default(e,t)},getPolygon=e=>{return bboxPolygon__default.default(e)},getClusters=(e,t)=>{e=turf.featureCollection(e);let l=[];e=clustersDbscan__default.default(e,t/1e3,{mutate:!0,minPoints:2});return clusters.clusterEach(e,"cluster",function(e,t){if("null"!==t){let i=turf_center__default.default(e),n=getMax(e.features,"average_score");e.features.length,meta.featureEach(e,function(e,t){let o=e.properties;o.vibes_score;var r=rhumbDistance__default.default(i,e),a=rhumbBearing__default.default(i,e),r=rhumbDestination__default.default(i,2*r,a);o.offset=r.geometry,o.in_cluster=!0,o.top_in_cluster=!1,o.average_score>=n?o.top_in_cluster=!0:o.icon_size=o.icon_size/2,e.properties=o,l.push(e)})}else meta.featureEach(e,function(e,t){e.properties.in_cluster=!1,e.properties.top_in_cluster=!0,l.push(e)})}),l=l.sort((e,t)=>t.properties.average_score-e.properties.average_score)},getDistance=(e,t)=>{return turf_distance__default.default([e[0],e[1]],[t[0],t[1]],{units:"miles"})},getDistanceToPixels=(e,t)=>{var o=e[0],r=e[1],e=e[2];return turf_distance__default.default([o,r],[e,r],{unit:"miles"})/t.width},getFeaturesInBounds=(t,o)=>{var e=turf.featureCollection(t.map(e=>(e.type="Feature",e))),r=o&&o.flat?o.flat():o;try{var a=bboxPolygon__default.default(r);return pointsWithinPolygon__default.default(e,a).features}catch(e){return console.log("Problem with bounds ",o,e),console.error("Problem with bounds ",o,e),t}},getFeaturesFromSource=(e,t,o=0)=>{var r=!!e&&e.isSourceLoaded,e=e?e.sourceId:null;if(mapRef.current){const i=mapRef.current.getMap();var a=i.getBounds().toArray();return t||r&&"public.places_vt"===e||r&&"places_data"===e||r&&"composite"===e?(t=i.querySourceFeatures("public.places_vt",{sourceLayer:"public.places_vt"}),r=[viewport.longitude,viewport.latitude],placesFromTile(t,"places",a,r,viewport.zoom)):null}},getDirections=async(n,l,s="walking")=>new Promise(function(t,e){var o=`https://api.mapbox.com/directions/v5/mapbox/${s}/`,r=querystring__default.default.stringify({access_token:l,geometries:"geojson",steps:!0,waypoints:[]}),a=n[0],i=n[n.length-1],a=(String(a),String(i),n.join(";"));fetch(o+a+"?"+r).then(e=>e.json()).then(e=>{t({data:e,loading:!1,timedOut:!1})},e=>{console.log(e)})}),getWaypoints=e=>{return e.map(e=>e.geometry.coordinates)},getBestRoute=e=>{e=e.data.routes[0];return{type:"Feature",properties:{distance:e.distance},geometry:{type:"LineString",coordinates:e.geometry.coordinates}}},getLocationFromPoint=(e=[-122.269994,37.806507])=>{return{centerpoint:e,longitude:e[0],latitude:e[1]}},getPointFromLocation=(e={latitude:37.806507,longitude:-122.269994})=>{return[e.longitude,e.latitude]},getMapStyles=()=>({categories:{going_out:"#e31a1c"},lens:{"fill-color":"#007AFF","fill-opacity":.4,"fill-outline-color":"#007AFF"},geolocateStyle:{position:"absolute",right:3,top:100,width:30},navigateStyle:{top:3,right:3},top_marker:{"icon-size":["interpolate",["linear"],["zoom"],8,.4,16,1,22,32]},marker_layout:{"icon-image":["to-string",["get","icon"]],"icon-allow-overlap":!1,"icon-ignore-placement":!1,"icon-size":["interpolate",["linear"],["zoom"],10,["+",["*",["get","average_score"],.4],.2],20,["+",["*",["get","average_score"],.8],.2]],"symbol-sort-key":["get","vibe_score"],"text-size":["interpolate",["linear"],["zoom"],8,4,14,8,20,12],"text-field":["to-string",["get","short_name"]],"text-anchor":"top","text-allow-overlap":!1,"text-ignore-placement":!1,"text-line-height":1,"text-justify":"auto","text-variable-anchor":["top","bottom","right"],"text-font":["Public Sans Regular","Arial Unicode MS Regular"],"text-max-width":10,"text-radial-offset":1.4,visibility:"visible"},marker_paint:{"text-color":"#7D7C84","icon-color":"#3475BA","text-halo-color":"#FFFFFF","text-halo-width":1.2},route_layout:{"line-join":"round","line-cap":"round"},route_paint:{"line-color":"#3887be","line-width":5,"line-opacity":.75},top_pick_layout:{"icon-image":["to-string",["get","icon"]],"icon-size":["interpolate",["linear"],["zoom"],8,.4,22,1.6],"symbol-sort-key":["get","vibe_score"],"text-field":["match",["get","top_in_cluster"],["false"],"",["to-string",["get","short_name"]]],"text-allow-overlap":!1,"icon-allow-overlap":!1,"icon-ignore-placement":!1,"text-ignore-placement":!1,"text-radial-offset":["interpolate",["linear"],["zoom"],8,.6,12,["-",["get","icon_size"],0],14,["+",["get","icon_size"],0],20,["+",["get","icon_size"],.2]],"text-font":["Public Sans Bold","Arial Unicode MS Regular"],"text-line-height":1,"text-letter-spacing":0,"text-anchor":"top","text-variable-anchor":["top","bottom","right"],"text-justify":"auto","text-size":["interpolate",["linear"],["zoom"],8,8,22,14],"text-max-width":10,visibility:"visible"},neighborhood_layout:{"text-size":{base:1,stops:[[10,8],[18,12]]},"text-transform":"uppercase","text-padding":1,"text-field":["to-string",["get","neighborhood"]],"text-font":["Public Sans Bold"],"text-letter-spacing":.1,"text-allow-overlap":!0,"text-ignore-placement":!0,"text-max-width":8,visibility:"visible"},neighborhood_paint:{"text-halo-color":"hsla(295, 100%, 100%, 0.8)","text-halo-width":1,"text-color":"hsl(253, 50%, 47%)"},top_pick_paint:{"text-color":"#666666","text-halo-color":"#FFFFFF","text-halo-width":1.4},top_vibe_layout:{"text-field":["to-string",["get","top_vibe"]],"text-font":["Roboto Condensed Italic"],"text-justify":"auto","text-anchor":"top","text-allow-overlap":!1,"icon-allow-overlap":!1,"icon-ignore-placement":!0,"text-ignore-placement":!0,"symbol-sort-key":["get","vibe_score"],"text-size":["interpolate",["linear"],["zoom"],8,6,22,20],"text-radial-offset":["interpolate",["linear"],["zoom"],8,.4,12,["-",["get","icon_size"],1.3],15,["-",["get","icon_size"],1],18,["-",["get","icon_size"],1.6]],"text-max-width":12},places_heatmap:{"heatmap-radius":["interpolate",["linear"],["zoom"],8,1,10,16,12,32,13,40,14,60,20,200],"heatmap-opacity":["interpolate",["linear"],["zoom"],8,.4,11,.2,20,.3],"heatmap-intensity":.2,"heatmap-weight":["interpolate",["linear"],["get","vibes_score"],1,.1,2,.6,10,2],"heatmap-color":["interpolate",["linear"],["heatmap-density"],.1,"hsla(240, 80%, 94%, 0.2)",.2,"hsla(125, 63%, 88%, 0.4)",.4,"hsla(192, 84%, 80%, 0.4)",.6,"hsla(274, 100%, 65%, 0.5)",.95,"hsla(300, 100%, 50%, 0.6)",1.1,"hsla(42, 100%, 64%, 0.6)"]},places_cluster:{"circle-color":["step",["get","point_count"],"#51bbd6",100,"#f1f075",750,"#f28cb1"],"circle-opacity":.2,"circle-stroke-color":"#FFFFFF","circle-stroke-width":2.4,"circle-radius":{property:"point_count",type:"interval",stops:[[0,60],[100,80],[750,160]]}},events_circle:{"circle-radius":{base:8,stops:[[8,4],[18,20]]},"circle-color":"#C650CC","circle-stroke-color":"#CC9423","circle-stroke-width":.4,"circle-opacity":{stops:[[8,.01],[20,.6]]},"circle-translate":[-2,-2]},hidden_circles:{"circle-opacity":0},places_circle:{"circle-radius":["interpolate",["linear"],["get","aggregate_rating"],1,.1,2,2,10,4],"circle-color":"#765382","circle-stroke-color":"#FFFFFF","circle-stroke-width":.4,"circle-stroke-opacity":.8,"circle-opacity":{stops:[[8,.4],[20,.6]]}}}),getPosition=e=>new Promise(function(t,o){navigator.geolocation&&navigator.geolocation.getCurrentPosition||t(!1),navigator.geolocation.getCurrentPosition(function(e){t(e)},function(e){o(!1),console.warn(`ERROR(${e.code}): `+e.message)},{enableHighAccuracy:!0,timeout:4e3})}),getRadius=e=>{return turf_distance__default.default([e[0],e[1]],[e[2],e[3]],{units:"miles"})/2},getFeatureCollection=e=>turf.featureCollection(e),getTruncatedFeatures=e=>turf_truncate__default.default(e,{precision:6,coordinates:2}),sortLocations=(e,t)=>{let a=turf__namespace.point([t.longitude,t.latitude]);return e.sort((e,t)=>{var o=e.centerpoint?turf__namespace.point(e.centerpoint):turf__namespace.point([e.location.longitude,e.location.latitude]),r=t.centerpoint?turf__namespace.point(t.centerpoint):turf__namespace.point([t.location.longitude,t.location.latitude]);return e.distance=turf_distance__default.default(a,o),t.distance=turf_distance__default.default(a,r),e.distance>t.distance?1:-1})},distanceBetweenLocations=(e,t,o=0)=>{e=turf__namespace.point([e.longitude,e.latitude]),t=turf__namespace.point([t.longitude,t.latitude]);return turf_distance__default.default(e,t)},zoomToRadius=e=>{let t=scalePow(1).domain([8,12,13,14,16,18]).range([40,7,3,3.5,1.5,.8]);return t(e)};exports.distanceBetweenLocations=distanceBetweenLocations,exports.geocodeAddress=geocodeAddress,exports.getArea=getArea,exports.getBestRoute=getBestRoute,exports.getBounds=getBounds,exports.getClusters=getClusters,exports.getDirections=getDirections,exports.getDistance=getDistance,exports.getDistanceToPixels=getDistanceToPixels,exports.getFeatureCollection=getFeatureCollection,exports.getFeaturesFromSource=getFeaturesFromSource,exports.getFeaturesInBounds=getFeaturesInBounds,exports.getLocationFromPoint=getLocationFromPoint,exports.getMapStyles=getMapStyles,exports.getPlaceDetails=getPlaceDetails,exports.getPlaceSocial=getPlaceSocial,exports.getPointFromLocation=getPointFromLocation,exports.getPolygon=getPolygon,exports.getPosition=getPosition,exports.getRadius=getRadius,exports.getTruncatedFeatures=getTruncatedFeatures,exports.getWaypoints=getWaypoints,exports.isPointInBounds=isPointInBounds,exports.sortLocations=sortLocations,exports.zoomToRadius=zoomToRadius;
