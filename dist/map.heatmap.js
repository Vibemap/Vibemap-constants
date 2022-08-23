"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var chroma=require("chroma-js");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var chroma__default=_interopDefaultLegacy(chroma);const getHeatmap=(e,a)=>{let t=[];var l="#F8EE32",r="#FFFFFF",o="#9DE862",u="#7DCAA5",c="#BC94C4",d="#FFFCC5",i="#F09C1F";let s=a?{calm:[r,"#54CAF2",o,d],buzzing:[r,"#E479B0",i,d],dreamy:[r,c,i,d],oldschool:["#008ae5",l,i],playful:[r,u,o,l],solidarity:[r,d,l,i],together:[r,u,d],wild:"PiYG"}[a]:[r,c,l,i];return e&&(s=chroma__default.default.scale([e])),t=(t=chroma__default.default.scale(s).mode("lch").colors(6)).map((e,a)=>{var t=.2*a,e=chroma__default.default(e).alpha(t).saturate(.05*a).css();return console.log("heat layer ",a,e),e})},getVibeStyle=(a="chill")=>{var t=style_variables.default.color.vibes,l=style_variables.default.color.base.gray[1e3],r=style_variables.default.color.base.gray[200];let o={color:l,background:r};if(a in t){l=t[a].primary,t=chroma__default.default(l).luminance();let e=1.2;t<.1&&(e+=2),t<.3&&(e+=1);a="linear-gradient(45deg, "+chroma__default.default(l).brighten(e).hex()+" 0%, "+r+" 75%)";o.background=a}return o};exports.getHeatmap=getHeatmap,exports.getVibeStyle=getVibeStyle;
//# sourceMappingURL=map.heatmap.js.map
