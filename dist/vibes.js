"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var Fuse=require("fuse.js"),LinearScale=require("linear-scale");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var Fuse__default=_interopDefaultLegacy(Fuse),LinearScale__default=_interopDefaultLegacy(LinearScale),asset={font:{icon:{name:"Nantes",woff:"https://etldev.blob.core.windows.net/fonts/Nantes-Regular.woff"}}},color={base:{white:"#ffffff",black:"#000000",gray:{50:"#f9f7fc",100:"#efeff4",200:"#e2e2ed",300:"#e4e4ea",400:"#d1d0d8",500:"#b2b1bc",600:"#9999a3",700:"#7d7c84",800:"#535156",900:"#3c3b3f",1e3:"#242326"},yellow:{bright:"#fdff00",deep:"#ef9b0d",light:"#fef483",pastel:"#f1ffcf",primary:"#fded35"},lime:{bright:"#64ff00",deep:"#58e86b",light:"#a8f36a",pastel:"#d4ffdc",primary:"#78ec6c"},green:{bright:"#54ff95",deep:"#006e59",light:"#61ecb2",pastel:"#b4ffd9",primary:"#00b459"},teal:{bright:"#00ffe4",deep:"#205273",light:"#00cec8",pastel:"#c4f7f4",primary:"#57b5b1"},blue:{bright:"#0000ff",deep:"#000045",light:"#3cd8ff",pastel:"#a0e5f7",primary:"#2d76cc"},violet:{bright:"#6b00d7",deep:"#190087",light:"#5172bf",pastel:"#cad8f9",primary:"#1d54d7"},purple:{bright:"#9100ff",deep:"#4e0089",light:"#d391fa",pastel:"#e5d0ff",primary:"#b34eff"},magenta:{bright:"#ff00ff",deep:"#7e1a65",light:"#e779b8",pastel:"#ffc4ff",primary:"#c400c4"},red:{bright:"#ff0000",deep:"#a30000",light:"#ff6434",pastel:"#ffccbc",primary:"#dd2c00"},orange:{bright:"#ef7200",deep:"#e55929",light:"#d99566",pastel:"#fff3e0",primary:"#ff5722"},golden:{bright:"#f7941d",deep:"#c66900",light:"#ffc947",pastel:"#ffffe4",primary:"#ff9800"}},heatmap:{first:"rgba(255, 200, 71, 0.8)",second:"rgba(255, 0, 255, 0.8)",third:"rgba(178, 77, 255, 0.8)",fourth:"rgba(161, 230, 247, 0.6)",fifth:"rgba(205, 244, 208, 0.4)",sixth:"#f9f7fc"},vibes:{absurd:{primary:"#a8f36a",secondary:"#00ffe4"},active:{primary:"#64ff00",secondary:"#c4f7f4"},activist:{primary:"#e779b8",secondary:"#ef9b0d"},adventurous:{primary:"#64ff00",secondary:"#00cec8",tertiary:"#c4f7f4"},alternative:{primary:"#f7941d",secondary:"#ffc947"},airy:{primary:"#fff3e0",secondary:"#f1ffcf"},analog:{primary:"#205273",secondary:"#ef7200"},antique:{primary:"#d99566",secondary:"#57b5b1"},artisanal:{primary:"#ffccbc",secondary:"#b4ffd9"},architectural:{primary:"#c400c4",secondary:"#fff3e0"},artsy:{primary:"#d391fa",secondary:"#006e59"},aquatic:{primary:"#0000ff",secondary:"#00ffe4"},art:{primary:"#d391fa",secondary:"#00cec8"},authentic:{primary:"#f7941d",secondary:"#b34eff"},aware:{primary:"#9100ff",secondary:"#00ffe4",tertiary:"#fff3e0"},beautiful:{primary:"#e5d0ff",secondary:"#e779b8"},belonging:{primary:"#f7941d",secondary:"#fdff00"},blissful:{primary:"#e779b8",secondary:"#f1ffcf"},boho:{primary:"#fff3e0",secondary:"#c66900"},bold:{primary:"#ef7200",secondary:"#ffc4ff"},boozy:{primary:"#ff5722",secondary:"#dd2c00"},botanical:{primary:"#b4ffd9",secondary:"#006e59"},bright:{primary:"#fdff00",secondary:"#d4ffdc"},brunch:{primary:"#fded35",secondary:"#ff00ff"},busy:{primary:"#e55929",secondary:"#ff9800"},buzzing:{primary:"#c66900",secondary:"#fded35",tertiary:"#ffc947"},calm:{primary:"#ffffe4",secondary:"#d4ffdc",tertiary:"#3cd8ff"},celebration:{primary:"#ff9800",secondary:"#f1ffcf"},celebratory:{primary:"#ff9800",secondary:"#d391fa"},charming:{primary:"#cad8f9",secondary:"#e5d0ff"},cheerful:{primary:"#ffc4ff",secondary:"#fff3e0"},chill:{primary:"#a0e5f7",secondary:"#ffccbc",tertiary:"#f1ffcf"},cinematic:{primary:"#205273",secondary:"#d391fa"},civic:{primary:"#00cec8",secondary:"#205273"},classic:{primary:"#e55929",secondary:"#c400c4"},colorful:{primary:"#ff00ff",secondary:"#00cec8"},community:{primary:"#ffccbc",secondary:"#c400c4"},contemplative:{primary:"#a0e5f7",secondary:"#c4f7f4"},cool:{primary:"#57b5b1",secondary:"#3cd8ff"},courageous:{primary:"#d391fa",secondary:"#fff3e0"},collective:{primary:"#f1ffcf",secondary:"#000045"},collectable:{primary:"#d391fa",secondary:"#f1ffcf"},cozy:{primary:"#ffffe4",secondary:"#cad8f9"},cultural:{primary:"#b34eff",secondary:"#ff00ff"},curious:{primary:"#00cec8",secondary:"#ef9b0d"},cute:{primary:"#e779b8",secondary:"#fded35"},creative:{primary:"#a0e5f7",secondary:"#9100ff"},crowded:{primary:"#000045",secondary:"#ffccbc"},datespot:{primary:"#ff00ff",secondary:"#ff0000"},drip:{primary:"#e55929",secondary:"#4e0089"},diverse:{primary:"#e5d0ff",secondary:"#00ffe4"},diy:{primary:"#5172bf",secondary:"#d391fa"},dreamy:{primary:"#d391fa",secondary:"#a0e5f7",tertiary:"#f1ffcf"},drinking:{primary:"#ff5722",secondary:"#dd2c00"},dynamic:{primary:"#9100ff",secondary:"#78ec6c"},eclectic:{primary:"#ffffe4",secondary:"#64ff00"},edgy:{primary:"#1d54d7",secondary:"#fff3e0"},energetic:{primary:"#ffc947",secondary:"#fded35",tertiary:"#c66900"},energy:{primary:"#ff5722",secondary:"#ff9800"},exciting:{primary:"#fded35",secondary:"#ff00ff"},family:{primary:"#f1ffcf",secondary:"#9100ff"},festive:{primary:"#ffc947",secondary:"#ff00ff"},fierce:{primary:"#a30000",secondary:"#ffccbc"},folk:{primary:"#a30000",secondary:"#fded35"},fragrant:{primary:"#b4ffd9",secondary:"#d4ffdc"},friendly:{primary:"#3cd8ff",secondary:"#d391fa"},fun:{primary:"#ffffe4",secondary:"#00ffe4"},funny:{primary:"#00cec8",secondary:"#fded35"},generous:{primary:"#2d76cc",secondary:"#a8f36a"},happy:{primary:"#ef9b0d",secondary:"#d4ffdc"},healthy:{primary:"#c4f7f4",secondary:"#58e86b"},hippie:{primary:"#ffc4ff",secondary:"#ff9800"},historic:{primary:"#c66900",secondary:"#fff3e0"},hopeful:{primary:"#f7941d",secondary:"#d4ffdc"},inclusive:{primary:"#6b00d7",secondary:"#61ecb2"},iconic:{primary:"#7e1a65",secondary:"#ffc4ff"},inspired:{primary:"#b4ffd9",secondary:"#58e86b"},intimate:{primary:"#dd2c00",secondary:"#ffccbc"},joyful:{primary:"#3cd8ff",secondary:"#ffc4ff"},kitschy:{primary:"#ffccbc",secondary:"#006e59"},legacy:{primary:"#d391fa",secondary:"#e5d0ff"},lit:{primary:"#fded35",secondary:"#ff0000"},lively:{primary:"#ff5722",secondary:"#61ecb2"},local:{primary:"#ff00ff",secondary:"#a8f36a"},loud:{primary:"#ff5722",secondary:"#64ff00"},love:{primary:"#c400c4",secondary:"#b34eff"},magical:{primary:"#ef9b0d",secondary:"#c400c4"},mindful:{primary:"#fef483",secondary:"#d99566"},minimalist:{primary:"#e2e2ed",secondary:"#c4f7f4"},moody:{primary:"#ffccbc",secondary:"#190087"},musical:{primary:"#00ffe4",secondary:"#9100ff"},mystic:{primary:"#f1ffcf",secondary:"#c400c4"},natural:{primary:"#61ecb2",secondary:"#ffccbc"},neon:{primary:"#fdff00",secondary:"#64ff00"},new:{primary:"#64ff00",secondary:"#e5d0ff"},nostalgic:{primary:"#fff3e0",secondary:"#190087",tertiary:"#d99566"},old:{primary:"#57b5b1",secondary:"#ffccbc"},"old-school":{primary:"#190087",secondary:"#d99566",tertiary:"#fff3e0"},outdoors:{primary:"#78ec6c",secondary:"#3cd8ff"},party:{primary:"#9100ff",secondary:"#ffccbc"},patio:{primary:"#fded35",secondary:"#a8f36a"},passionate:{primary:"#ff6434",secondary:"#ffc947"},peaceful:{primary:"#3cd8ff",secondary:"#fff3e0"},playful:{primary:"#00cec8",secondary:"#a8f36a",tertiary:"#00cec8"},playtime:{primary:"#00cec8",secondary:"#a8f36a",tertiary:"#00cec8"},popular:{primary:"#e779b8",secondary:"#ffc947"},proud:{primary:"#0000ff",secondary:"#3cd8ff"},positive:{primary:"#ffc4ff",secondary:"#fded35"},quiet:{primary:"#cad8f9",secondary:"#57b5b1"},"quiet-energy":{primary:"#3cd8ff",secondary:"#b4ffd9",tertiary:"#ffffe4"},radical:{primary:"#c400c4",secondary:"#00ffe4"},rebel:{primary:"#205273",secondary:"#ffccbc"},relaxing:{primary:"#2d76cc",secondary:"#c4f7f4"},retro:{primary:"#2d76cc",secondary:"#ef9b0d"},romantic:{primary:"#ff0000",secondary:"#e5d0ff"},rousing:{primary:"#c4f7f4",secondary:"#f1ffcf"},scenic:{primary:"#58e86b",secondary:"#c4f7f4"},sensual:{primary:"#7e1a65",secondary:"#ffccbc"},serene:{primary:"#d4ffdc",secondary:"#fded35"},shimmy:{primary:"#d391fa",secondary:"#2d76cc"},sleepy:{primary:"#57b5b1",secondary:"#cad8f9"},social:{primary:"#ff0000",secondary:"#ffccbc",tertiary:"#f1ffcf"},solidarity:{primary:"#9100ff",secondary:"#00ffe4",tertiary:"#fff3e0"},spiritual:{primary:"#4e0089",secondary:"#ffc4ff"},spontaneous:{primary:"#e5d0ff",secondary:"#ffc4ff"},throwback:{primary:"#7e1a65",secondary:"#9100ff"},together:{primary:"#ff0000",secondary:"#ffccbc",tertiary:"#f1ffcf"},trendy:{primary:"#fef483",secondary:"#ff00ff"},trending:{primary:"#ffc947",secondary:"#d391fa"},tropical:{primary:"#54ff95",secondary:"#ff00ff"},trust:{primary:"#ffc947",secondary:"#e779b8"},underground:{primary:"#1d54d7",secondary:"#d391fa"},unique:{primary:"#0000ff",secondary:"#e5d0ff"},vibrant:{primary:"#9100ff",secondary:"#ffccbc"},views:{primary:"#3cd8ff",secondary:"#a0e5f7"},vintage:{primary:"#d99566",secondary:"#dd2c00"},volunteer:{primary:"#ff9800",secondary:"#a8f36a"},whimsical:{primary:"#3cd8ff",secondary:"#54ff95"},wild:{primary:"#00b459",secondary:"#006e59"},wistful:{primary:"#ffc947",secondary:"#ffc4ff"},witchy:{primary:"#e779b8",secondary:"#a30000"},witty:{primary:"#205273",secondary:"#a0e5f7"},zen:{primary:"#57b5b1",secondary:"#2d76cc"}},gradients:{quiet_energy:"#57b5b1 #d391fa"},text:{dark:"#3c3b3f",muted:"#535156",light:"#d1d0d8"},ui:{button:{active:"#3c3b3f",disabled:"#9999a3"},tab:{active:"#3c3b3f",disabled:"#b2b1bc"}}},column={gap:{desktop:"1.5rem",mobile:"0.5rem",list:"1.75rem"}},margin={center:"0 auto"},padding={item:"2.5rem",section:"3.5rem"},post={text:{block:{heading:30,subheading:18},card:{title:20,description:14,category:16},caption:16,category:18,cite:16,heading:{title:36,subheading:30,heading1:36,heading2:34,heading3:30,heading4:26,heading5:20,heading6:18},list:18,info:16,paragraph:18,pullquote:32}},transitions={base:{default:"0.35s ease !default"}},font={family:{sans:"Public Sans",serif:"Nantes"},height:{base:1.2,large:1.6,small:1,tall:1.8,none:0},size:{base:16,normal:16,small:14,tiny:12,micro:10,large:18},weight:{base:300,light:200,normal:300,link:400,medium:500,bold:700}},units={base:{base:4,huge:12,large:8,nano:.4,small:2,tiny:1}},variables={asset:asset,color:color,column:column,"line-height":{tall:1.8,large:1.6,base:1.2,small:1,none:0},margin:margin,padding:padding,post:post,transitions:transitions,font:font,units:units};const jsonpack=require("jsonpack");let activityCategories={},allVibes=[],vibeRelations=[];try{const b=require("../dist/vibesFromCMSTaxonomy.zip.json"),c=(allVibes=jsonpack.unpack(b),require("../dist/vibeRelations.zip.json")),d=(vibeRelations=jsonpack.unpack(c),require("../dist/activityCategories.zip.json"));activityCategories=jsonpack.unpack(d)}catch(e){console.log("Error upacking vibes ",e)}const getVibeInfo=(r="chill")=>{var e=allVibes.find(e=>e.slug===r);return e||null},getVibesFromSlugs=e=>{const a=[];return e.forEach(r=>{var e=allVibes.find(e=>e.slug===r);e&&a.push(e)}),a},getVibeGradient=(r="chill")=>{let e="#DDDDDD",a="#AAAAAA";var f=variables.color.vibes,i=(allVibes.filter(e=>r===e.key),f[r]),f=(f[r]&&(e=i.primary,a=i.secondary),{color1:e,color2:a,gradient:`linear-gradient(44deg, ${e} 20%, ${a} 100% )`});return f},getCategory=(r="food")=>{var e=activityCategories.find(e=>e.slug===r);return e||null},getCategoriesByLevel=(r=2)=>{return activityCategories.filter(e=>{return parseInt(e.level)==r})},flattenCategories=(e,f=1)=>{let i=[];return e.forEach(e=>{const{subcategories:r,...a}=e;i.push(a),1<f&&r&&0<r.length&&(i=[...i,...flattenCategories(r,f-1)])}),i},activityCategoryToOptions=e=>{return e.map(e=>{var r=e.seo&&e.seo.focuskw&&0<e.seo.focuskw.length?e.seo.focuskw:e&&e.title?e.title:e.name;return{key:e.slug,label:r,seo:e.seo,title:e.name,value:e.slug,level:e.level}})},getSubCategories=(r="all",e="all")=>{const a=activityCategories;const f=a.find(e=>e.slug===r).details.sub_categories;let i=[];switch(e){case"keys":i=f.map(e=>e.slug);break;case"all":i=f.map(e=>getCategory(e.slug));break;default:i=f}return i},getVibes=(e="keys")=>{let r=[];return r="keys"===e?allVibes.map(e=>e.slug):allVibes},searchCategories=(e="ing",r=.2,a=["name","definition","title"])=>{a={includeScore:!0,keys:a,threshold:r};const f=new Fuse__default.default(activityCategories,a);return f.search(e)},searchVibes=(e="ing",r=.2,a=["name","definition"])=>{a={includeScore:!0,keys:a,threshold:r};const f=new Fuse__default.default(allVibes,a);return f.search(e)},getVibePreferences=(e="matrix",r=null,a=0,f=!0)=>{if(!r||!r.extra_data)throw new Error("getVibePreferences: the data parameter must have a `extra_data` property");const i=getVibes("keys");let c=i.map(e=>0);const s={favorites:1,myvibes:1,vibepoints:{search:.1,vibecheck:.4,save:.5},upvotedvibes:{vibenames:.4,meta:.2},vibecheckhistory:.7},t=r.extra_data,o=(t.favorites&&Object.values(t.favorites).forEach(e=>{e&&e.properties&&e.properties.vibes&&e.properties.vibes.forEach(e=>{i.includes(e)&&(e=i.indexOf(e),c[e]=c[e]+s.favorites)})}),t.myVibes&&t.myVibes.map(function(e){i.includes(e)&&(e=i.indexOf(e),c[e]=c[e]+s.myvibes)}),t.vibePoints&&t.vibePoints.forEach(e=>{switch(e.reason){case"search vibes":e.searchVibes.forEach(e=>{e=i.indexOf(e);c[e]=c[e]+s.vibepoints.search});break;case"vibe check":if(!e.vibeCheckVibe[0])return;e.vibeCheckVibe[0].forEach(e=>{e=i.indexOf(e);c[e]=c[e]+s.vibepoints.vibecheck})}}),t.upvotedVibes&&Object.values(t.upvotedVibes).forEach(e=>{if(e&&e.place&&e.place.properties&&e.place.properties.vibes){const r=e.place.properties.vibes;r.forEach(e=>{i.includes(e)&&(e=i.indexOf(e),c[e]=c[e]+s.upvotedvibes.meta)}),e&&e.vibeNames&&e.vibeNames.forEach(e=>{i.includes(e)&&(e=i.indexOf(e),c[e]=c[e]+s.upvotedvibes.vibenames)})}}),t.vibeCheckHistory&&t.vibeCheckHistory.forEach(e=>{e&&e.vibes&&e.vibes.forEach(e=>{e.forEach(e=>{i.includes(e)&&(e=i.indexOf(e),c[e]=c[e]+s.vibecheckhistory)})})}),c.reduce((e,r)=>e<r?r:e,0));if("matrix"===e)return f&&0!==o?c.map(e=>e/o):c;const n=c.map((e,r)=>{return{key:i[r],score:f&&0!==o?e/o:e}}),d=n.sort((e,r)=>r.score-e.score),y=d.filter(e=>e.score>a);return y.map(({key:e})=>e)},getVibesFromVibeTimes=e=>{var r=e&&0<e.length?e.sort((e,r)=>r.score-e.score).map(e=>e.name):[];return console.log("Handle these vibe times: ",e,r),r},getRelatedVibes=(e=["chill"],c=.4)=>{let s=e;e=e.flatMap(e=>{var r=getVibeInfo(e);let a=[];r&&r.details&&r.details.vibes&&(s=s.concat(r.details.vibes)),r&&r.alias&&(a=s.concat([r.alias]));var f=vibeRelations[e];const i=[];for(e in f)f[e]>=c&&i.push(e);return a=s.concat(i)});return[...new Set(e)]},yourvibe_scale_v1=e=>{let r=1.061645*e**.289052;return 1<r?r=1:r<0&&(r=0),r},normalize_all=(e=500,r=1,a=100,f=1,i=10)=>{return LinearScale__default.default().domain([r,a]).range([f,i])(e)},percent_yourvibe=(e,a)=>{let f=1/e.length,i=0;var c=[];let s=0;e.map(r=>{a.includes(r)&&(i+=f,s+=1),r in vibeRelations&&a.map(e=>{e in vibeRelations[r]&&c.push(vibeRelations[r][e])})});var r=a.length-s,r=(r=1<=c.length&&1<r?Math.log10(10)/Math.log10(20):1<=c.length&&1==r?c[0]:0,normalize_all(r,0,1,0,f*(e.length-s)));i+=r;let t=yourvibe_scale_v1(i);return t<=0&&(t=.5),Math.round(100*t)};exports.activityCategoryToOptions=activityCategoryToOptions,exports.flattenCategories=flattenCategories,exports.getCategoriesByLevel=getCategoriesByLevel,exports.getCategory=getCategory,exports.getRelatedVibes=getRelatedVibes,exports.getSubCategories=getSubCategories,exports.getVibeGradient=getVibeGradient,exports.getVibeInfo=getVibeInfo,exports.getVibePreferences=getVibePreferences,exports.getVibes=getVibes,exports.getVibesFromSlugs=getVibesFromSlugs,exports.getVibesFromVibeTimes=getVibesFromVibeTimes,exports.normalize_all=normalize_all,exports.percent_yourvibe=percent_yourvibe,exports.searchCategories=searchCategories,exports.searchVibes=searchVibes,exports.yourvibe_scale_v1=yourvibe_scale_v1;
//# sourceMappingURL=vibes.js.map
