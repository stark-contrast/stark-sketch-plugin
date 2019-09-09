var that=this;function __skpm_run(e,t){that.context=t;var r=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s="./src/refresh.js")}({"./src/refresh.js":
/*!************************!*\
  !*** ./src/refresh.js ***!
  \************************/
/*! exports provided: default */function(e,t,r){"use strict";r.r(t);r(/*! sketch */"sketch"),r(/*! sketch/dom */"sketch/dom");var n=r(/*! sketch/settings */"sketch/settings"),o=r.n(n),s=r(/*! sketch/ui */"sketch/ui"),i=r.n(s);t.default=function(e){o.a.setSettingForKey("com.stark.license-key",""),o.a.setSettingForKey("com.stark.subscription-status",""),o.a.setSettingForKey("com.stark.email",""),o.a.setSettingForKey("com.stark.frequency",""),o.a.setSettingForKey("com.stark.verification",""),i.a.message("Your subscription refreshed! Head back to the registration screen to re-enter your license key.")}},sketch:
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */function(e,t){e.exports=require("sketch")},"sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */function(e,t){e.exports=require("sketch/dom")},"sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */function(e,t){e.exports=require("sketch/settings")},"sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */function(e,t){e.exports=require("sketch/ui")}});"default"===e&&"function"==typeof r?r(t):r[e](t)}that.onRun=__skpm_run.bind(this,"default");