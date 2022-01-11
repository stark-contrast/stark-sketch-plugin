var that=this;function __skpm_run(t,r){that.context=r;var e=function(t){var r={};function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var o in t)e.d(n,o,function(r){return t[r]}.bind(null,o));return n},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="",e(e.s=16)}([function(t,r){t.exports=require("sketch/settings")},function(t,r){t.exports=require("sketch")},function(t,r,e){"use strict";var n=this&&this.__createBinding||(Object.create?function(t,r,e,n){void 0===n&&(n=e),Object.defineProperty(t,n,{enumerable:!0,get:function(){return r[e]}})}:function(t,r,e,n){void 0===n&&(n=e),t[n]=r[e]}),o=this&&this.__exportStar||function(t,r){for(var e in t)"default"===e||Object.prototype.hasOwnProperty.call(r,e)||n(r,t,e)};Object.defineProperty(r,"__esModule",{value:!0}),o(e(10),r),o(e(5),r),o(e(8),r),o(e(11),r),o(e(12),r),o(e(13),r),o(e(6),r),o(e(4),r),o(e(14),r),o(e(7),r),o(e(15),r)},function(t,r){t.exports=require("sketch/dom")},function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.ConvertRgbaToHex=r.ConvertRgbaToBaseHsla=r.ConvertRgbaToHsla=r.ConvertRgbaToBaseRgba=r.ConvertBaseRgbaToRgba=r.ConvertRgbaStringToBaseRgba=r.ConvertRgbaStringToRgba=r.ConvertBaseRgbaToRgbaString=r.ConvertRgbaToRgbaString=void 0;var n=e(7);r.ConvertRgbaToRgbaString=function(t){return"rgba("+t.r+", "+t.g+", "+t.b+", "+(t.a?t.a:1)+")"},r.ConvertBaseRgbaToRgbaString=function(t){return"rgba("+Math.round(255*t.r)+", "+Math.round(255*t.g)+", "+Math.round(255*t.b)+", "+(t.a?t.a:1)+")"},r.ConvertRgbaStringToRgba=function(t){var r=n.RGBA_REGEX,e=t.match(r);return e&&(null==e?void 0:e.length)>0?{r:Number(e[1]),g:Number(e[2]),b:Number(e[3]),a:Number(e[4])}:{r:0,g:0,b:0,a:0}},r.ConvertRgbaStringToBaseRgba=function(t){var r=n.RGBA_REGEX,e=t.match(r);return e&&(null==e?void 0:e.length)>0?{r:Number(e[1])/255,g:Number(e[2])/255,b:Number(e[3])/255,a:Number(e[4])}:{r:0,g:0,b:0,a:0}},r.ConvertBaseRgbaToRgba=function(t,r){var e=t.a?t.a:1;return{r:255*t.r,g:255*t.g,b:255*t.b,a:r?255*e:e}},r.ConvertRgbaToBaseRgba=function(t,r){var e=t.a?t.a:255;return{r:t.r/255,g:t.g/255,b:t.b/255,a:r?e/255:e}},r.ConvertRgbaToHsla=function(t){var r,e=t.r/255,n=t.g/255,o=t.b/255,a=Math.max(e,n,o),i=Math.min(e,n,o),u=0,s=(a+i)/2;if(a===i)u=r=0;else{var l=a-i;switch(r=s>.5?l/(2-a-i):l/(a+i),a){case e:u=(n-o)/l+(n<o?6:0);break;case n:u=(o-e)/l+2;break;case o:u=(e-n)/l+4}u/=6}return{h:Math.round(360*u),s:Math.round(100*r),l:Math.round(100*s),a:t.a}},r.ConvertRgbaToBaseHsla=function(t){var r,e=t.r/255,n=t.g/255,o=t.b/255,a=Math.max(e,n,o),i=Math.min(e,n,o),u=0,s=(a+i)/2;if(a===i)u=r=0;else{var l=a-i;switch(r=s>.5?l/(2-a-i):l/(a+i),a){case e:u=(n-o)/l+(n<o?6:0);break;case n:u=(o-e)/l+2;break;case o:u=(e-n)/l+4}u/=6}return{h:u,s:r,l:s,a:t.a}},r.ConvertRgbaToHex=function(t,r,e){var n=function(t){return 1===t.length?"0"+t:""+t};return(r?"#":"")+n(Math.round(t.r).toString(16))+n(Math.round(t.g).toString(16))+n(Math.round(t.b).toString(16))+(e&&t.a?n(Math.round(255*t.a).toString(16)):"")}},function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.LightenColor=r.DarkenColor=void 0;var n=e(6),o=e(4);r.DarkenColor=function(t,r){var e=o.ConvertRgbaToBaseHsla(t);return e.l-=r,e.l<0&&(e.l=0),n.ConvertBaseHslaToRgba(e)},r.LightenColor=function(t,r){var e=o.ConvertRgbaToBaseHsla(t);return e.l+=r,e.l>1&&(e.l=1),n.ConvertBaseHslaToRgba(e)}},function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.ConvertBaseHslaToRgba=void 0,r.ConvertBaseHslaToRgba=function(t){var r,e,n,o=function(t,r,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?t+6*(r-t)*e:e<.5?r:e<2/3?t+(r-t)*(2/3-e)*6:t};if(0===t.s)r=e=n=t.l;else{var a=t.l<.5?t.l*(1+t.s):t.l+t.s-t.l*t.s,i=2*t.l-a;r=o(i,a,t.h+1/3),e=o(i,a,t.h),n=o(i,a,t.h-1/3)}return{r:Math.round(255*r),g:Math.round(255*e),b:Math.round(255*n),a:t.a}}},function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.BLURRED=r.CB_ACHROLY=r.CB_ACHRO=r.CB_TRITALY=r.CB_TRITA=r.CB_DEUTERLY=r.CB_DEUTER=r.CB_PROTALY=r.CB_PROTA=r.RGBA_REGEX=void 0,r.RGBA_REGEX=/rgba?\((\d+.?\d+|\d),\s*(\d+.?\d+|\d),\s*(\d+.?\d+|\d),\s*(\d+.?\d+|\d)?\)/,r.CB_PROTA="Protanopia",r.CB_PROTALY="Protanomaly",r.CB_DEUTER="Deuteranopia",r.CB_DEUTERLY="Deuteranomaly",r.CB_TRITA="Tritanopia",r.CB_TRITALY="Tritanomaly",r.CB_ACHRO="Achromatopsia",r.CB_ACHROLY="Achromatomaly",r.BLURRED="Blurred"},function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.GetContrastRatio=void 0,r.GetContrastRatio=function(t,r,e){var n=function(t){var r,e,n;return r=t.r/255,e=t.g/255,n=t.b/255,.2126*(r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4))+.7152*(e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))+.0722*(n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4))},o=(Math.max(n(t),n(r))+.05)/(Math.min(n(t),n(r))+.05);if(e){var a=String(o);if(-1!==a.indexOf(".")){var i=a.split(".");o=1===i.length?Number(a):Number(i[0]+"."+i[1].charAt(0)+i[1].charAt(1))}o=Number(o.toFixed(2))}return o}},function(t,r){t.exports=require("sketch/ui")},function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.MixColors=void 0,r.MixColors=function(t,r){for(var e=[t.r,t.g,t.b],n=[r.r,r.g,r.b],o=[],a=0;a<=2;a++){var i=n[a],u=e[a];o.push(u+(i-u)*(r.a||1))}return{r:Math.round(o[0]),g:Math.round(o[1]),b:Math.round(o[2]),a:1}}},function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.GetLuminance=void 0,r.GetLuminance=function(t){var r,e,n,o,a,i;return r=t.r/255,e=t.g/255,n=t.b/255,o=r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4),a=e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4),i=n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4),Number((.2126*o+.7152*a+.0722*i).toFixed(2))}},function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.GetColorSuggestions=r.GetNearestPassingColor=r.DetermineColorModification=void 0;var n=e(5),o=e(8),a=e(4);r.DetermineColorModification=function(t,r,e){void 0===e&&(e=.05);var a=n.LightenColor(t,e),i=n.DarkenColor(t,e);return o.GetContrastRatio(a,r)>o.GetContrastRatio(i,r)?"light":"dark"},r.GetNearestPassingColor=function(t,e,a,i,u){var s;void 0===a&&(a=.05),void 0===i&&(i=4.5);var l=r.DetermineColorModification(t,e,a);s=u?"light"===u?n.LightenColor:n.DarkenColor:"light"===l?n.LightenColor:n.DarkenColor;for(var c=a,g=o.GetContrastRatio(t,e),b=g<i,d=t;b;){var f=s(t,c+=a),v=g;(g=o.GetContrastRatio(f,e))>=i&&(d=f,b=!1),v===g&&(b=!1,g<i&&(d=r.GetNearestPassingColor(t,e,a,i,s===n.LightenColor?"dark":"light")))}return d},r.GetColorSuggestions=function(t,e,o,i,u){void 0===o&&(o=4),void 0===i&&(i=.05),void 0===u&&(u=.1);for(var s=r.DetermineColorModification(t,e,i),l=r.GetNearestPassingColor(t,e,i),c="light"===s?n.LightenColor:n.DarkenColor,g=[a.ConvertRgbaToRgbaString(l)],b=1;b<o;b++)g.push(a.ConvertRgbaToRgbaString(c(l,b*u)));var d=0;if(g.forEach((function(t,r){0!==r&&t===g[r-1]&&d++})),d>2){var f="light"===s?n.DarkenColor:n.LightenColor,v=r.GetNearestPassingColor(t,e,i,4.5,"light"===s?"dark":"light"),h=[a.ConvertRgbaToRgbaString(v)];for(b=1;b<o;b++)h.push(a.ConvertRgbaToRgbaString(f(v,.1*b)));var C=0;if(h.forEach((function(t,r){0!==r&&t===h[r-1]&&C++})),C<d)return h}return g}},function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.ConvertHexToRgba=r.ConvertHexToRgbaString=void 0,r.ConvertHexToRgbaString=function(t){var r=t.startsWith("#")?t.substring(1,t.length+1):t,e={r:parseInt(r.slice(0,2),16),g:parseInt(r.slice(2,4),16),b:parseInt(r.slice(4,6),16),a:parseInt(r.slice(6,8),16)/255};return"rgba("+e.r+", "+e.g+", "+e.b+", "+(e.a?e.a.toFixed(2):1)+")"},r.ConvertHexToRgba=function(t){var r=t.startsWith("#")?t.substring(1,t.length+1):t,e=parseInt(r.slice(6,8),16)/255||1;return{r:parseInt(r.slice(0,2),16),g:parseInt(r.slice(2,4),16),b:parseInt(r.slice(4,6),16),a:Number(e.toFixed(2))}}},function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.GetColorblindMatrixString=r.GetColorblindMatrixArray=r.SimulateColorblindness=void 0,r.SimulateColorblindness=function(t,r){var e=function(t){return t<0?0:t<255?t:255},n=t.r,o=t.g,a=t.b,i=t.a?t.a:1,u=n*r[0]+o*r[1]+a*r[2]+i*r[3]+r[4],s=n*r[5]+o*r[6]+a*r[7]+i*r[8]+r[9],l=n*r[10]+o*r[11]+a*r[12]+i*r[13]+r[14],c=n*r[15]+o*r[16]+a*r[17]+i*r[18]+r[19];return{r:Math.round(e(u)),g:Math.round(e(s)),b:Math.round(e(l)),a:e(c)}},r.GetColorblindMatrixArray=function(t){switch(t){case"Protanopia":return[.567,.433,0,0,0,.558,.442,0,0,0,0,.242,.758,0,0,0,0,0,1,0];case"Protanomaly":return[.817,.183,0,0,0,.333,.667,0,0,0,0,.125,.875,0,0,0,0,0,1,0];case"Deuteranopia":return[.625,.375,0,0,0,.7,.3,0,0,0,0,.3,.7,0,0,0,0,0,1,0];case"Deuteranomaly":return[.8,.2,0,0,0,.258,.742,0,0,0,0,.142,.858,0,0,0,0,0,1,0];case"Tritanopia":return[.95,.05,0,0,0,0,.433,.567,0,0,0,.475,.525,0,0,0,0,0,1,0];case"Tritanomaly":return[.967,.033,0,0,0,0,.733,.267,0,0,0,.183,.817,0,0,0,0,0,1,0];case"Achromatopsia":return[.299,.587,.114,0,0,.299,.587,.114,0,0,.299,.587,.114,0,0,0,0,0,1,0];case"Achromatomaly":return[.618,.32,.062,0,0,.163,.775,.062,0,0,.163,.32,.516,0,0,0,0,0,1,0];default:return[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1]}},r.GetColorblindMatrixString=function(t){return r.GetColorblindMatrixArray(t).join(", ")}},function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0})},function(t,r,e){"use strict";e.r(r),e(0),e(9),e(1),e(2),e(3).Style,e(3).Style,e(3).Group,e(3).ShapePath,e(3).Style,e(3).Rectangle,e(3).Text,e(3).Group,e(3).ShapePath,e(3).Style,e(3).Rectangle,e(3).Text,r.default=function(){!function(t){var r=NSURL.URLWithString("https://getstark.co/support");NSWorkspace.sharedWorkspace().openURL(r)}()}}]);"default"===t&&"function"==typeof e?e(r):e[t](r)}that.onRun=__skpm_run.bind(this,"default");