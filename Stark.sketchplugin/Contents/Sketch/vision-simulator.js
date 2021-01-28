var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/sketch/vision-simulator.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/timers/immediate.js":
/*!************************************************!*\
  !*** ./node_modules/@skpm/timers/immediate.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var timeout = __webpack_require__(/*! ./timeout */ "./node_modules/@skpm/timers/timeout.js")

function setImmediate(func, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
  return timeout.setTimeout(func, 0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
}

function clearImmediate(id) {
  return timeout.clearTimeout(id)
}

module.exports = {
  setImmediate: setImmediate,
  clearImmediate: clearImmediate
}


/***/ }),

/***/ "./node_modules/@skpm/timers/interval.js":
/*!***********************************************!*\
  !*** ./node_modules/@skpm/timers/interval.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var fiberAvailable = __webpack_require__(/*! ./test-if-fiber */ "./node_modules/@skpm/timers/test-if-fiber.js")

var setInterval
var clearInterval

var fibers = []

if (fiberAvailable()) {
  setInterval = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    // fibers takes care of keeping coscript around
    var id = fibers.length
    fibers.push(coscript.scheduleWithRepeatingInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
      }
    ))
    return id
  }

  clearInterval = function (id) {
    var interval = fibers[id]
    if (interval) {
      interval.cancel() // fibers takes care of keeping coscript around
      fibers[id] = undefined // garbage collect the fiber
    }
  }
} else {
  setInterval = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    coscript.shouldKeepAround = true
    var id = fibers.length
    fibers.push(true)
    function trigger () {
      coscript.scheduleWithInterval_jsFunction(
        (delay || 0) / 1000,
        function () {
          if (fibers[id]) { // if not cleared
            func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
            trigger()
          }
        }
      )
    }
    trigger()
    return id
  }

  clearInterval = function (id) {
    fibers[id] = false
    if (fibers.every(function (_id) { return !_id })) { // if everything is cleared
      coscript.shouldKeepAround = false
    }
  }
}

module.exports = {
  setInterval: setInterval,
  clearInterval: clearInterval
}


/***/ }),

/***/ "./node_modules/@skpm/timers/test-if-fiber.js":
/*!****************************************************!*\
  !*** ./node_modules/@skpm/timers/test-if-fiber.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () {
  return typeof coscript !== 'undefined' && coscript.createFiber
}


/***/ }),

/***/ "./node_modules/@skpm/timers/timeout.js":
/*!**********************************************!*\
  !*** ./node_modules/@skpm/timers/timeout.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var fiberAvailable = __webpack_require__(/*! ./test-if-fiber */ "./node_modules/@skpm/timers/test-if-fiber.js")

var setTimeout
var clearTimeout

var fibers = []

if (fiberAvailable()) {
  var fibers = []

  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    // fibers takes care of keeping coscript around
    var id = fibers.length
    fibers.push(coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
      }
    ))
    return id
  }

  clearTimeout = function (id) {
    var timeout = fibers[id]
    if (timeout) {
      timeout.cancel() // fibers takes care of keeping coscript around
      fibers[id] = undefined // garbage collect the fiber
    }
  }
} else {
  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    coscript.shouldKeepAround = true
    var id = fibers.length
    fibers.push(true)
    coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        if (fibers[id]) { // if not cleared
          func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
        }
        clearTimeout(id)
        if (fibers.every(function (_id) { return !_id })) { // if everything is cleared
          coscript.shouldKeepAround = false
        }
      }
    )
    return id
  }

  clearTimeout = function (id) {
    fibers[id] = false
  }
}

module.exports = {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
}


/***/ }),

/***/ "./node_modules/@stark-contrast/color-utilities/lib/__constants.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@stark-contrast/color-utilities/lib/__constants.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CB_ACHROLY = exports.CB_ACHRO = exports.CB_TRITALY = exports.CB_TRITA = exports.CB_DEUTERLY = exports.CB_DEUTER = exports.CB_PROTALY = exports.CB_PROTA = exports.RGBA_REGEX = void 0;
exports.RGBA_REGEX = /rgba?\((\d+.?\d+|\d),\s*(\d+.?\d+|\d),\s*(\d+.?\d+|\d),\s*(\d+.?\d+|\d)?\)/;
exports.CB_PROTA = 'Protanopia';
exports.CB_PROTALY = 'Protanomaly';
exports.CB_DEUTER = 'Deuteranopia';
exports.CB_DEUTERLY = 'Deuteranomaly';
exports.CB_TRITA = 'Tritanopia';
exports.CB_TRITALY = 'Tritanomaly';
exports.CB_ACHRO = 'Achromatopsia';
exports.CB_ACHROLY = 'Achromatomaly';


/***/ }),

/***/ "./node_modules/@stark-contrast/color-utilities/lib/__prop-types.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@stark-contrast/color-utilities/lib/__prop-types.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./node_modules/@stark-contrast/color-utilities/lib/color-mixer.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@stark-contrast/color-utilities/lib/color-mixer.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MixColors = void 0;
/**
 * Mixes two colors (usually one with lowered alpha)
 *
 *
 * @param firstColor - An rgba object
 * @param secondColor = An rgba object
 * @returns `The two colors mixed`
 *
 */
exports.MixColors = function (firstColor, secondColor) {
    var rgbArray2 = [firstColor.r, firstColor.g, firstColor.b];
    var rgbArray1 = [secondColor.r, secondColor.g, secondColor.b];
    var returnArray = [];
    for (var i = 0; i <= 2; i++) {
        var v1 = rgbArray1[i];
        var v2 = rgbArray2[i];
        returnArray.push(v2 + (v1 - v2) * (secondColor.a || 1));
    }
    return {
        r: Math.round(returnArray[0]),
        g: Math.round(returnArray[1]),
        b: Math.round(returnArray[2]),
        a: 1,
    };
};


/***/ }),

/***/ "./node_modules/@stark-contrast/color-utilities/lib/color-modifiers.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@stark-contrast/color-utilities/lib/color-modifiers.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LightenColor = exports.DarkenColor = void 0;
var hsl_conversions_1 = __webpack_require__(/*! ./hsl-conversions */ "./node_modules/@stark-contrast/color-utilities/lib/hsl-conversions.js");
var rgb_conversions_1 = __webpack_require__(/*! ./rgb-conversions */ "./node_modules/@stark-contrast/color-utilities/lib/rgb-conversions.js");
/**
 * Darkens the provided rgba object by the provided ammount
 *
 *
 * @param rgba - An object containing the rgba values in 0-255 format
 * @param amount - The amount to darken the rgba object
 * @returns `rgba(r, g, b, a) in 0-255 format`
 *
 */
exports.DarkenColor = function (rgba, amount) {
    var baseHsla = rgb_conversions_1.ConvertRgbaToBaseHsla(rgba);
    baseHsla.l -= amount;
    if (baseHsla.l < 0) {
        baseHsla.l = 0;
    }
    return hsl_conversions_1.ConvertBaseHslaToRgba(baseHsla);
};
/**
 * Lightens the provided rgba object by the provided ammount
 *
 *
 * @param rgba - An object containing the rgba values in 0-255 format
 * @param amount - The amount to lighten the rgba object
 * @returns `rgba(r, g, b, a) in 0-255 format`
 *
 */
exports.LightenColor = function (rgba, amount) {
    var baseHsla = rgb_conversions_1.ConvertRgbaToBaseHsla(rgba);
    baseHsla.l += amount;
    if (baseHsla.l > 1) {
        baseHsla.l = 1;
    }
    return hsl_conversions_1.ConvertBaseHslaToRgba(baseHsla);
};


/***/ }),

/***/ "./node_modules/@stark-contrast/color-utilities/lib/contrast-checker.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@stark-contrast/color-utilities/lib/contrast-checker.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GetContrastRatio = void 0;
/**
 * Returns a contrast ratio from two colors
 *
 *
 * @param firstColor - An rgba object
 * @param secondColor = An rgba object
 * @returns `A contrast ratio`
 *
 */
exports.GetContrastRatio = function (firstColor, secondColor, roundResult) {
    var getLuminance = function (color) {
        // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var RsRGB;
        var GsRGB;
        var BsRGB;
        var R;
        var G;
        var B;
        RsRGB = color.r / 255;
        GsRGB = color.g / 255;
        BsRGB = color.b / 255;
        if (RsRGB <= 0.03928) {
            R = RsRGB / 12.92;
        }
        else {
            R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
        }
        if (GsRGB <= 0.03928) {
            G = GsRGB / 12.92;
        }
        else {
            G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
        }
        if (BsRGB <= 0.03928) {
            B = BsRGB / 12.92;
        }
        else {
            B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    };
    var result = (Math.max(getLuminance(firstColor), getLuminance(secondColor)) + 0.05) /
        (Math.min(getLuminance(firstColor), getLuminance(secondColor)) + 0.05);
    if (roundResult) {
        var stringResult = String(result);
        if (stringResult.indexOf('.') !== -1) {
            var numArray = stringResult.split('.');
            if (numArray.length === 1) {
                result = Number(stringResult);
            }
            else {
                result = Number(numArray[0] + '.' + numArray[1].charAt(0) + numArray[1].charAt(1));
            }
        }
        result = Number(result.toFixed(2));
    }
    return result;
};


/***/ }),

/***/ "./node_modules/@stark-contrast/color-utilities/lib/get-luminance.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@stark-contrast/color-utilities/lib/get-luminance.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLuminance = void 0;
/**
 * Provides the luminance of a given color.
 *
 *
 * @param rgba - An object containing the rgba values in 0-255 format
 * @returns `Luminance of the color with 0 being dark and 1 being white`
 *
 */
exports.GetLuminance = function (rgba) {
    var RtempRGB;
    var GtempRGB;
    var BtempRGB;
    var newR;
    var newG;
    var newB;
    RtempRGB = rgba.r / 255;
    GtempRGB = rgba.g / 255;
    BtempRGB = rgba.b / 255;
    if (RtempRGB <= 0.03928) {
        newR = RtempRGB / 12.92;
    }
    else {
        newR = Math.pow((RtempRGB + 0.055) / 1.055, 2.4);
    }
    if (GtempRGB <= 0.03928) {
        newG = GtempRGB / 12.92;
    }
    else {
        newG = Math.pow((GtempRGB + 0.055) / 1.055, 2.4);
    }
    if (BtempRGB <= 0.03928) {
        newB = BtempRGB / 12.92;
    }
    else {
        newB = Math.pow((BtempRGB + 0.055) / 1.055, 2.4);
    }
    return Number((0.2126 * newR + 0.7152 * newG + 0.0722 * newB).toFixed(2));
};


/***/ }),

/***/ "./node_modules/@stark-contrast/color-utilities/lib/get-nearest-passing-color.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@stark-contrast/color-utilities/lib/get-nearest-passing-color.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GetColorSuggestions = exports.GetNearestPassingColor = exports.DetermineColorModification = void 0;
var color_modifiers_1 = __webpack_require__(/*! ./color-modifiers */ "./node_modules/@stark-contrast/color-utilities/lib/color-modifiers.js");
var contrast_checker_1 = __webpack_require__(/*! ./contrast-checker */ "./node_modules/@stark-contrast/color-utilities/lib/contrast-checker.js");
var rgb_conversions_1 = __webpack_require__(/*! ./rgb-conversions */ "./node_modules/@stark-contrast/color-utilities/lib/rgb-conversions.js");
/**
 * Determines whether to lighten or darken a color.
 *
 *
 * @param colorToModify - An object containing the rgba values in 0-255 format
 * @param colorToCompare - An object containing the rgba values in 0-255 format
 * @param modificationAmount - The amount to modify the color in decimal format (.1 = 10%)
 * @returns `light or dark`
 *
 */
exports.DetermineColorModification = function (colorToModify, colorToCompare, modificationAmount) {
    if (modificationAmount === void 0) { modificationAmount = 0.05; }
    var colorLightened = color_modifiers_1.LightenColor(colorToModify, modificationAmount);
    var colorDarkened = color_modifiers_1.DarkenColor(colorToModify, modificationAmount);
    var lightenedCR = contrast_checker_1.GetContrastRatio(colorLightened, colorToCompare);
    var darkenedCR = contrast_checker_1.GetContrastRatio(colorDarkened, colorToCompare);
    return lightenedCR > darkenedCR ? 'light' : 'dark';
};
/**
 * Lightens or darkens a provided color until it passes contrast with the other provided color.
 *
 *
 * @param colorToModify - An object containing the rgba values in 0-255 format
 * @param colorToCompare - An object containing the rgba values in 0-255 format
 * @param modificationAmount - The amount to modify the color in decimal format (.1 = 10%)
 * @param minimumContrast - The minimum contrast ratio to check for
 * @param modificationType - whether to lighten or darken the color
 * @returns `{ r: 18, g: 96, b: 58, a: 1}`
 *
 */
exports.GetNearestPassingColor = function (colorToModify, colorToCompare, modificationAmount, minimumContrast, modificationType) {
    if (modificationAmount === void 0) { modificationAmount = 0.05; }
    if (minimumContrast === void 0) { minimumContrast = 4.5; }
    var modFunc;
    var colorModificationType = exports.DetermineColorModification(colorToModify, colorToCompare, modificationAmount);
    if (modificationType) {
        modFunc = modificationType === 'light' ? color_modifiers_1.LightenColor : color_modifiers_1.DarkenColor;
    }
    else {
        modFunc = colorModificationType === 'light' ? color_modifiers_1.LightenColor : color_modifiers_1.DarkenColor;
    }
    var percentage = modificationAmount;
    var cr = contrast_checker_1.GetContrastRatio(colorToModify, colorToCompare);
    var runCheck = cr < minimumContrast;
    var colorToReturn = colorToModify;
    while (runCheck) {
        percentage += modificationAmount;
        var newColorModified = modFunc(colorToModify, percentage);
        var oldCr = cr;
        cr = contrast_checker_1.GetContrastRatio(newColorModified, colorToCompare);
        if (cr >= minimumContrast) {
            colorToReturn = newColorModified;
            runCheck = false;
        }
        if (oldCr === cr) {
            runCheck = false;
            if (cr < minimumContrast) {
                colorToReturn = exports.GetNearestPassingColor(colorToModify, colorToCompare, modificationAmount, minimumContrast, modFunc === color_modifiers_1.LightenColor ? 'dark' : 'light');
            }
        }
    }
    return colorToReturn;
};
/**
 * Determines whether to lighten or darken a color.
 *
 *
 * @param colorToModify - An object containing the rgba values in 0-255 format
 * @param colorToCompare - An object containing the rgba values in 0-255 format
 * @param numberOfSuggestions - The number of suggestions to return
 * @param passingColorModificationAmount - The amount to modify the color in decimal format (.1 = 10%) to get a passing color
 * @param modificationAmount - The amount to modify the color in decimal format (.1 = 10%)
 * @returns `array of colors`
 *
 */
exports.GetColorSuggestions = function (colorToModify, colorToCompare, numberOfSuggestions, passingColorModificationAmount, modificationAmount) {
    if (numberOfSuggestions === void 0) { numberOfSuggestions = 4; }
    if (passingColorModificationAmount === void 0) { passingColorModificationAmount = 0.05; }
    if (modificationAmount === void 0) { modificationAmount = 0.1; }
    var initialModification = exports.DetermineColorModification(colorToModify, colorToCompare, passingColorModificationAmount);
    var passingColor = exports.GetNearestPassingColor(colorToModify, colorToCompare, passingColorModificationAmount);
    var colorModifier = initialModification === 'light' ? color_modifiers_1.LightenColor : color_modifiers_1.DarkenColor;
    var colorArray = [rgb_conversions_1.ConvertRgbaToRgbaString(passingColor)];
    for (var i = 1; i < numberOfSuggestions; i++) {
        colorArray.push(rgb_conversions_1.ConvertRgbaToRgbaString(colorModifier(passingColor, i * modificationAmount)));
    }
    var initialDupeColorCount = 0;
    colorArray.forEach(function (color, index) {
        if (index !== 0 && color === colorArray[index - 1]) {
            initialDupeColorCount++;
        }
    });
    if (initialDupeColorCount > 2) {
        var newModifier = initialModification === 'light' ? color_modifiers_1.DarkenColor : color_modifiers_1.LightenColor;
        var newPassingColor = exports.GetNearestPassingColor(colorToModify, colorToCompare, passingColorModificationAmount, 4.5, initialModification === 'light' ? 'dark' : 'light');
        var newColorArray_1 = [rgb_conversions_1.ConvertRgbaToRgbaString(newPassingColor)];
        for (var i = 1; i < numberOfSuggestions; i++) {
            newColorArray_1.push(rgb_conversions_1.ConvertRgbaToRgbaString(newModifier(newPassingColor, i * 0.1)));
        }
        var newDupeColorCount_1 = 0;
        newColorArray_1.forEach(function (color, index) {
            if (index !== 0 && color === newColorArray_1[index - 1]) {
                newDupeColorCount_1++;
            }
        });
        if (newDupeColorCount_1 < initialDupeColorCount) {
            return newColorArray_1;
        }
    }
    return colorArray;
};


/***/ }),

/***/ "./node_modules/@stark-contrast/color-utilities/lib/hex-conversions.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@stark-contrast/color-utilities/lib/hex-conversions.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertHexToRgba = exports.ConvertHexToRgbaString = void 0;
/**
 * Converts a hex string to an rgba string.
 *
 *
 * @param hex - A hex in string format
 * @returns `rgba(r, g, b, a) in 0-255 format`
 *
 */
exports.ConvertHexToRgbaString = function (hex) {
    var normalizedHex = hex.startsWith('#')
        ? hex.substring(1, hex.length + 1)
        : hex;
    var rgba = {
        r: parseInt(normalizedHex.slice(0, 2), 16),
        g: parseInt(normalizedHex.slice(2, 4), 16),
        b: parseInt(normalizedHex.slice(4, 6), 16),
        a: parseInt(normalizedHex.slice(6, 8), 16) / 255,
    };
    return "rgba(" + rgba.r + ", " + rgba.g + ", " + rgba.b + ", " + (rgba.a ? rgba.a.toFixed(2) : 1) + ")";
};
/**
 * Converts a hex string to an rgba.
 *
 *
 * @param hex - A hex in string format
 * @returns `{ r: 255, g: 255, b: 255, a: 1}`
 *
 */
exports.ConvertHexToRgba = function (hex) {
    var normalizedHex = hex.startsWith('#')
        ? hex.substring(1, hex.length + 1)
        : hex;
    var alpha = parseInt(normalizedHex.slice(6, 8), 16) / 255 || 1;
    var rgba = {
        r: parseInt(normalizedHex.slice(0, 2), 16),
        g: parseInt(normalizedHex.slice(2, 4), 16),
        b: parseInt(normalizedHex.slice(4, 6), 16),
        a: Number(alpha.toFixed(2)),
    };
    return rgba;
};


/***/ }),

/***/ "./node_modules/@stark-contrast/color-utilities/lib/hsl-conversions.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@stark-contrast/color-utilities/lib/hsl-conversions.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertBaseHslaToRgba = void 0;
/**
 * Converts an hsla object to an rgba object.
 *
 *
 * @param hsla - An object containing the hsla values in 0-255 format
 * @returns `{ r: 18, g: 96, b: 58, a: 1}`
 *
 */
exports.ConvertBaseHslaToRgba = function (hsla) {
    var red;
    var green;
    var blue;
    var convertHueToRgb = function (p, q, t) {
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        if (t < 1 / 6)
            return p + (q - p) * 6 * t;
        if (t < 1 / 2)
            return q;
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };
    if (hsla.s === 0) {
        red = green = blue = hsla.l;
    }
    else {
        var q = hsla.l < 0.5 ? hsla.l * (1 + hsla.s) : hsla.l + hsla.s - hsla.l * hsla.s;
        var p = 2 * hsla.l - q;
        red = convertHueToRgb(p, q, hsla.h + 1 / 3);
        green = convertHueToRgb(p, q, hsla.h);
        blue = convertHueToRgb(p, q, hsla.h - 1 / 3);
    }
    return {
        r: Math.round(red * 255),
        g: Math.round(green * 255),
        b: Math.round(blue * 255),
        a: hsla.a,
    };
};


/***/ }),

/***/ "./node_modules/@stark-contrast/color-utilities/lib/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@stark-contrast/color-utilities/lib/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./color-mixer */ "./node_modules/@stark-contrast/color-utilities/lib/color-mixer.js"), exports);
__exportStar(__webpack_require__(/*! ./color-modifiers */ "./node_modules/@stark-contrast/color-utilities/lib/color-modifiers.js"), exports);
__exportStar(__webpack_require__(/*! ./contrast-checker */ "./node_modules/@stark-contrast/color-utilities/lib/contrast-checker.js"), exports);
__exportStar(__webpack_require__(/*! ./get-luminance */ "./node_modules/@stark-contrast/color-utilities/lib/get-luminance.js"), exports);
__exportStar(__webpack_require__(/*! ./get-nearest-passing-color */ "./node_modules/@stark-contrast/color-utilities/lib/get-nearest-passing-color.js"), exports);
__exportStar(__webpack_require__(/*! ./hex-conversions */ "./node_modules/@stark-contrast/color-utilities/lib/hex-conversions.js"), exports);
__exportStar(__webpack_require__(/*! ./hsl-conversions */ "./node_modules/@stark-contrast/color-utilities/lib/hsl-conversions.js"), exports);
__exportStar(__webpack_require__(/*! ./rgb-conversions */ "./node_modules/@stark-contrast/color-utilities/lib/rgb-conversions.js"), exports);
__exportStar(__webpack_require__(/*! ./simulate-colorblindness */ "./node_modules/@stark-contrast/color-utilities/lib/simulate-colorblindness.js"), exports);
__exportStar(__webpack_require__(/*! ./__constants */ "./node_modules/@stark-contrast/color-utilities/lib/__constants.js"), exports);
__exportStar(__webpack_require__(/*! ./__prop-types */ "./node_modules/@stark-contrast/color-utilities/lib/__prop-types.js"), exports);


/***/ }),

/***/ "./node_modules/@stark-contrast/color-utilities/lib/rgb-conversions.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@stark-contrast/color-utilities/lib/rgb-conversions.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertRgbaToHex = exports.ConvertRgbaToBaseHsla = exports.ConvertRgbaToHsla = exports.ConvertRgbaToBaseRgba = exports.ConvertBaseRgbaToRgba = exports.ConvertRgbaStringToBaseRgba = exports.ConvertRgbaStringToRgba = exports.ConvertBaseRgbaToRgbaString = exports.ConvertRgbaToRgbaString = void 0;
var __constants_1 = __webpack_require__(/*! ./__constants */ "./node_modules/@stark-contrast/color-utilities/lib/__constants.js");
/**
 * Converts an rgba object to an rgba string.
 *
 *
 * @param rgba - An object containing the rgba values in 0-255 format
 * @returns `rgba(r, g, b, a) in 0-255 format`
 *
 */
exports.ConvertRgbaToRgbaString = function (rgba) {
    return "rgba(" + rgba.r + ", " + rgba.g + ", " + rgba.b + ", " + (rgba.a ? rgba.a : 1) + ")";
};
/**
 * Converts a base rgba object to an rgba string.
 *
 *
 * @param rgba - An object containing the rgba values in 0-1 format
 * @returns `rgba(r, g, b, a) in 0-255 format`
 *
 */
exports.ConvertBaseRgbaToRgbaString = function (rgba) {
    return "rgba(" + Math.round(rgba.r * 255) + ", " + Math.round(rgba.g * 255) + ", " + Math.round(rgba.b * 255) + ", " + (rgba.a ? rgba.a : 1) + ")";
};
/**
 * Converts an rgba string to an rgba object.
 *
 *
 * @param rgba - An string in rgba(255, 255, 255, 1) or rgb(255, 255, 255) format
 * @returns `{ r: 255, g: 255, b: 255, a: 1}`
 *
 */
exports.ConvertRgbaStringToRgba = function (rgba) {
    var regex = __constants_1.RGBA_REGEX;
    var rgbaArray = rgba.match(regex);
    if (rgbaArray && (rgbaArray === null || rgbaArray === void 0 ? void 0 : rgbaArray.length) > 0) {
        return {
            r: Number(rgbaArray[1]),
            g: Number(rgbaArray[2]),
            b: Number(rgbaArray[3]),
            a: Number(rgbaArray[4]),
        };
    }
    return { r: 0, g: 0, b: 0, a: 0 };
};
/**
 * Converts an rgba string to an rgba object.
 *
 *
 * @param rgba - An string in rgba(255, 255, 255, 1) or rgb(255, 255, 255) format
 * @returns `{ r: 0, g: 0.12, b: 0.44, a: 1}`
 *
 */
exports.ConvertRgbaStringToBaseRgba = function (rgba) {
    var regex = __constants_1.RGBA_REGEX;
    var rgbaArray = rgba.match(regex);
    if (rgbaArray && (rgbaArray === null || rgbaArray === void 0 ? void 0 : rgbaArray.length) > 0) {
        return {
            r: Number(rgbaArray[1]) / 255,
            g: Number(rgbaArray[2]) / 255,
            b: Number(rgbaArray[3]) / 255,
            a: Number(rgbaArray[4]),
        };
    }
    return { r: 0, g: 0, b: 0, a: 0 };
};
/**
 * Converts a base rgba object to an rgba object.
 *
 *
 * @param rgba - A base rgba in 0-1 format
 * @returns `{ r: 255, g: 255, b: 255, a: 1}`
 *
 */
exports.ConvertBaseRgbaToRgba = function (rgba, convertAlpha) {
    var alpha = rgba.a ? rgba.a : 1;
    return {
        r: rgba.r * 255,
        g: rgba.g * 255,
        b: rgba.b * 255,
        a: convertAlpha ? alpha * 255 : alpha,
    };
};
/**
 * Converts an rgba object to a base rgba object.
 *
 *
 * @param rgba - An rgba object in 0-255 format
 * @returns `{ r: 0.1, g: 0.1, b: 0.1, a: 1}`
 *
 */
exports.ConvertRgbaToBaseRgba = function (rgba, convertAlpha) {
    var alpha = rgba.a ? rgba.a : 255;
    return {
        r: rgba.r / 255,
        g: rgba.g / 255,
        b: rgba.b / 255,
        a: convertAlpha ? alpha / 255 : alpha,
    };
};
/**
 * Converts an rgba object to an hsla object.
 *
 *
 * @param rgba - An object containing the rgba values in 0-255 format
 * @returns `{ h: 18, s: 96, l: 58, a: 1}`
 *
 */
exports.ConvertRgbaToHsla = function (rgba) {
    var red = rgba.r / 255;
    var green = rgba.g / 255;
    var blue = rgba.b / 255;
    var max = Math.max(red, green, blue);
    var min = Math.min(red, green, blue);
    var h = 0;
    var s;
    var l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case red:
                h = (green - blue) / d + (green < blue ? 6 : 0);
                break;
            case green:
                h = (blue - red) / d + 2;
                break;
            case blue:
                h = (red - green) / d + 4;
                break;
        }
        h /= 6;
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
        a: rgba.a,
    };
};
/**
 * Converts an rgba object to a base hsla object.
 *
 *
 * @param rgba - An object containing the rgba values in 0-255 format
 * @returns `{ h: 0.18, s: 0.96, l: 0.58, a: 1}`
 *
 */
exports.ConvertRgbaToBaseHsla = function (rgba) {
    var red = rgba.r / 255;
    var green = rgba.g / 255;
    var blue = rgba.b / 255;
    var max = Math.max(red, green, blue);
    var min = Math.min(red, green, blue);
    var h = 0;
    var s;
    var l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case red:
                h = (green - blue) / d + (green < blue ? 6 : 0);
                break;
            case green:
                h = (blue - red) / d + 2;
                break;
            case blue:
                h = (red - green) / d + 4;
                break;
        }
        h /= 6;
    }
    return {
        h: h,
        s: s,
        l: l,
        a: rgba.a,
    };
};
/**
 * Converts an rgba object to a HEX or HEXA string.
 *
 *
 * @param rgba - An object containing the rgba values in 0-255 format
 * @returns `#e5e5e5 or e5e5e5ff`
 *
 */
exports.ConvertRgbaToHex = function (rgba, includeHashtag, includeAlpha) {
    var addPadding = function (color) {
        return color.length === 1 ? '0' + color : '' + color;
    };
    return "" + (includeHashtag ? '#' : '') + addPadding(Math.round(rgba.r).toString(16)) + addPadding(Math.round(rgba.g).toString(16)) + addPadding(Math.round(rgba.b).toString(16)) + (includeAlpha && rgba.a
        ? addPadding(Math.round(rgba.a * 255).toString(16))
        : '');
};


/***/ }),

/***/ "./node_modules/@stark-contrast/color-utilities/lib/simulate-colorblindness.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@stark-contrast/color-utilities/lib/simulate-colorblindness.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GetColorblindMatrixString = exports.GetColorblindMatrixArray = exports.SimulateColorblindness = void 0;
/**
 * Simulates a colorblindness on the provided rgba object
 *
 *
 * @param rgba - An object containing the rgba values in 0-255 format
 * @param colorblindMatrix - The matrix to use for the colorblind simulation. Use GetColorblindMatrixArray for this.
 * @returns `An rgba object with the simulated colorblindness`
 *
 */
exports.SimulateColorblindness = function (rgba, colorblindMatrix) {
    var fu = function (n) {
        return n < 0 ? 0 : n < 255 ? n : 255;
    };
    var ogColor = {
        r: rgba.r,
        g: rgba.g,
        b: rgba.b,
        a: rgba.a ? rgba.a : 1,
    };
    var r = ogColor.r * colorblindMatrix[0] +
        ogColor.g * colorblindMatrix[1] +
        ogColor.b * colorblindMatrix[2] +
        ogColor.a * colorblindMatrix[3] +
        colorblindMatrix[4];
    var g = ogColor.r * colorblindMatrix[5] +
        ogColor.g * colorblindMatrix[6] +
        ogColor.b * colorblindMatrix[7] +
        ogColor.a * colorblindMatrix[8] +
        colorblindMatrix[9];
    var b = ogColor.r * colorblindMatrix[10] +
        ogColor.g * colorblindMatrix[11] +
        ogColor.b * colorblindMatrix[12] +
        ogColor.a * colorblindMatrix[13] +
        colorblindMatrix[14];
    var a = ogColor.r * colorblindMatrix[15] +
        ogColor.g * colorblindMatrix[16] +
        ogColor.b * colorblindMatrix[17] +
        ogColor.a * colorblindMatrix[18] +
        colorblindMatrix[19];
    return {
        r: Math.round(fu(r)),
        g: Math.round(fu(g)),
        b: Math.round(fu(b)),
        a: fu(a),
    };
};
exports.GetColorblindMatrixArray = function (colorblindType) {
    switch (colorblindType) {
        case 'Protanopia': {
            return [
                0.567,
                0.433,
                0,
                0,
                0,
                0.558,
                0.442,
                0,
                0,
                0,
                0,
                0.242,
                0.758,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
            ];
        }
        case 'Protanomaly': {
            return [
                0.817,
                0.183,
                0,
                0,
                0,
                0.333,
                0.667,
                0,
                0,
                0,
                0,
                0.125,
                0.875,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
            ];
        }
        case 'Deuteranopia': {
            return [
                0.625,
                0.375,
                0,
                0,
                0,
                0.7,
                0.3,
                0,
                0,
                0,
                0,
                0.3,
                0.7,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
            ];
        }
        case 'Deuteranomaly': {
            return [
                0.8,
                0.2,
                0,
                0,
                0,
                0.258,
                0.742,
                0,
                0,
                0,
                0,
                0.142,
                0.858,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
            ];
        }
        case 'Tritanopia': {
            return [
                0.95,
                0.05,
                0,
                0,
                0,
                0,
                0.433,
                0.567,
                0,
                0,
                0,
                0.475,
                0.525,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
            ];
        }
        case 'Tritanomaly': {
            return [
                0.967,
                0.033,
                0,
                0,
                0,
                0,
                0.733,
                0.267,
                0,
                0,
                0,
                0.183,
                0.817,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
            ];
        }
        case 'Achromatopsia': {
            return [
                0.299,
                0.587,
                0.114,
                0,
                0,
                0.299,
                0.587,
                0.114,
                0,
                0,
                0.299,
                0.587,
                0.114,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
            ];
        }
        case 'Achromatomaly': {
            return [
                0.618,
                0.32,
                0.062,
                0,
                0,
                0.163,
                0.775,
                0.062,
                0,
                0,
                0.163,
                0.32,
                0.516,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
            ];
        }
        default: {
            return [
                1,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                1,
            ];
        }
    }
};
exports.GetColorblindMatrixString = function (colorblindType) {
    return exports.GetColorblindMatrixArray(colorblindType).join(', ');
};


/***/ }),

/***/ "./node_modules/mocha-js-delegate/index.js":
/*!*************************************************!*\
  !*** ./node_modules/mocha-js-delegate/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* globals MOClassDescription, NSObject, NSSelectorFromString, NSClassFromString, MOPropertyDescription */

module.exports = function MochaDelegate(definition, superclass) {
  var uniqueClassName =
    'MochaJSDelegate_DynamicClass_' + NSUUID.UUID().UUIDString()

  var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(
    uniqueClassName,
    superclass || NSObject
  )

  // Storage
  var handlers = {}
  var ivars = {}

  // Define an instance method
  function setHandlerForSelector(selectorString, func) {
    var handlerHasBeenSet = selectorString in handlers
    var selector = NSSelectorFromString(selectorString)

    handlers[selectorString] = func

    /*
      For some reason, Mocha acts weird about arguments: https://github.com/logancollins/Mocha/issues/28
      We have to basically create a dynamic handler with a likewise dynamic number of predefined arguments.
    */
    if (!handlerHasBeenSet) {
      var args = []
      var regex = /:/g
      while (regex.exec(selectorString)) {
        args.push('arg' + args.length)
      }

      // eslint-disable-next-line no-eval
      var dynamicFunction = eval(
        '(function (' +
          args.join(', ') +
          ') { return handlers[selectorString].apply(this, arguments); })'
      )

      delegateClassDesc.addInstanceMethodWithSelector_function(
        selector,
        dynamicFunction
      )
    }
  }

  // define a property
  function setIvar(key, value) {
    var ivarHasBeenSet = key in handlers

    ivars[key] = value

    if (!ivarHasBeenSet) {
      delegateClassDesc.addInstanceVariableWithName_typeEncoding(key, '@')
      var description = MOPropertyDescription.new()
      description.name = key
      description.typeEncoding = '@'
      description.weak = true
      description.ivarName = key
      delegateClassDesc.addProperty(description)
    }
  }

  this.getClass = function() {
    return NSClassFromString(uniqueClassName)
  }

  this.getClassInstance = function(instanceVariables) {
    var instance = NSClassFromString(uniqueClassName).new()
    Object.keys(ivars).forEach(function(key) {
      instance[key] = ivars[key]
    })
    Object.keys(instanceVariables || {}).forEach(function(key) {
      instance[key] = instanceVariables[key]
    })
    return instance
  }
  // alias
  this.new = this.getClassInstance

  // Convenience
  if (typeof definition === 'object') {
    Object.keys(definition).forEach(
      function(key) {
        if (typeof definition[key] === 'function') {
          setHandlerForSelector(key, definition[key])
        } else {
          setIvar(key, definition[key])
        }
      }
    )
  }

  delegateClassDesc.registerClass()
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setTimeout, clearTimeout) {// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@skpm/timers/timeout.js */ "./node_modules/@skpm/timers/timeout.js")["setTimeout"], __webpack_require__(/*! ./node_modules/@skpm/timers/timeout.js */ "./node_modules/@skpm/timers/timeout.js")["clearTimeout"]))

/***/ }),

/***/ "./node_modules/promise-polyfill/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setTimeout, setImmediate) {

/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        // @ts-ignore
        return constructor.reject(reason);
      });
    }
  );
}

function allSettled(arr) {
  var P = this;
  return new P(function(resolve, reject) {
    if (!(arr && typeof arr.length !== 'undefined')) {
      return reject(
        new TypeError(
          typeof arr +
            ' ' +
            arr +
            ' is not iterable(cannot read property Symbol(Symbol.iterator))'
        )
      );
    }
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        var then = val.then;
        if (typeof then === 'function') {
          then.call(
            val,
            function(val) {
              res(i, val);
            },
            function(e) {
              args[i] = { status: 'rejected', reason: e };
              if (--remaining === 0) {
                resolve(args);
              }
            }
          );
          return;
        }
      }
      args[i] = { status: 'fulfilled', value: val };
      if (--remaining === 0) {
        resolve(args);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
}

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function isArray(x) {
  return Boolean(x && typeof x.length !== 'undefined');
}

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = finallyConstructor;

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.all accepts an array'));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.allSettled = allSettled;

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.race accepts an array'));
    }

    for (var i = 0, len = arr.length; i < len; i++) {
      Promise.resolve(arr[i]).then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  // @ts-ignore
  (typeof setImmediate === 'function' &&
    function(fn) {
      // @ts-ignore
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@skpm/timers/timeout.js */ "./node_modules/@skpm/timers/timeout.js")["setTimeout"], __webpack_require__(/*! ./node_modules/@skpm/timers/immediate.js */ "./node_modules/@skpm/timers/immediate.js")["setImmediate"]))

/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/browser-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/browser-api.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function parseHexColor(color) {
  // Check the string for incorrect formatting.
  if (!color || color[0] !== '#') {
    if (
      color &&
      typeof color.isKindOfClass === 'function' &&
      color.isKindOfClass(NSColor)
    ) {
      return color
    }
    throw new Error(
      'Incorrect color formating. It should be an hex color: #RRGGBBAA'
    )
  }

  // append FF if alpha channel is not specified.
  var source = color.substr(1)
  if (source.length === 3) {
    source += 'F'
  } else if (source.length === 6) {
    source += 'FF'
  }
  // Convert the string from #FFF format to #FFFFFF format.
  var hex
  if (source.length === 4) {
    for (var i = 0; i < 4; i += 1) {
      hex += source[i]
      hex += source[i]
    }
  } else if (source.length === 8) {
    hex = source
  } else {
    return NSColor.whiteColor()
  }

  var r = parseInt(hex.slice(0, 2), 16) / 255
  var g = parseInt(hex.slice(2, 4), 16) / 255
  var b = parseInt(hex.slice(4, 6), 16) / 255
  var a = parseInt(hex.slice(6, 8), 16) / 255

  return NSColor.colorWithSRGBRed_green_blue_alpha(r, g, b, a)
}

module.exports = function(browserWindow, panel, webview) {
  // keep reference to the subviews
  browserWindow._panel = panel
  browserWindow._webview = webview
  browserWindow._destroyed = false

  browserWindow.destroy = function() {
    return panel.close()
  }

  browserWindow.close = function() {
    if (panel.delegate().utils && panel.delegate().utils.parentWindow) {
      var shouldClose = true
      browserWindow.emit('close', {
        get defaultPrevented() {
          return !shouldClose
        },
        preventDefault: function() {
          shouldClose = false
        },
      })
      if (shouldClose) {
        panel.delegate().utils.parentWindow.endSheet(panel)
      }
      return
    }

    if (!browserWindow.isClosable()) {
      return
    }

    panel.performClose(null)
  }

  function focus(focused) {
    if (!browserWindow.isVisible()) {
      return
    }
    if (focused) {
      NSApplication.sharedApplication().activateIgnoringOtherApps(true)
      panel.makeKeyAndOrderFront(null)
    } else {
      panel.orderBack(null)
      NSApp.mainWindow().makeKeyAndOrderFront(null)
    }
  }

  browserWindow.focus = focus.bind(this, true)
  browserWindow.blur = focus.bind(this, false)

  browserWindow.isFocused = function() {
    return panel.isKeyWindow()
  }

  browserWindow.isDestroyed = function() {
    return browserWindow._destroyed
  }

  browserWindow.show = function() {
    // This method is supposed to put focus on window, however if the app does not
    // have focus then "makeKeyAndOrderFront" will only show the window.
    NSApp.activateIgnoringOtherApps(true)

    if (panel.delegate().utils && panel.delegate().utils.parentWindow) {
      return panel.delegate().utils.parentWindow.beginSheet_completionHandler(
        panel,
        __mocha__.createBlock_function('v16@?0q8', function() {
          browserWindow.emit('closed')
        })
      )
    }

    return panel.makeKeyAndOrderFront(null)
  }

  browserWindow.showInactive = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.hide = function() {
    return panel.orderOut(null)
  }

  browserWindow.isVisible = function() {
    return panel.isVisible()
  }

  browserWindow.isModal = function() {
    return false
  }

  browserWindow.maximize = function() {
    if (!browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }
  browserWindow.unmaximize = function() {
    if (browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }

  browserWindow.isMaximized = function() {
    if ((panel.styleMask() & NSResizableWindowMask) !== 0) {
      return panel.isZoomed()
    }
    var rectScreen = NSScreen.mainScreen().visibleFrame()
    var rectWindow = panel.frame()
    return (
      rectScreen.origin.x == rectWindow.origin.x &&
      rectScreen.origin.y == rectWindow.origin.y &&
      rectScreen.size.width == rectWindow.size.width &&
      rectScreen.size.height == rectWindow.size.height
    )
  }

  browserWindow.minimize = function() {
    return panel.miniaturize(null)
  }

  browserWindow.restore = function() {
    return panel.deminiaturize(null)
  }

  browserWindow.isMinimized = function() {
    return panel.isMiniaturized()
  }

  browserWindow.setFullScreen = function(fullscreen) {
    if (fullscreen !== browserWindow.isFullscreen()) {
      panel.toggleFullScreen(null)
    }
  }

  browserWindow.isFullscreen = function() {
    return panel.styleMask() & NSFullScreenWindowMask
  }

  browserWindow.setAspectRatio = function(aspectRatio /* , extraSize */) {
    // Reset the behaviour to default if aspect_ratio is set to 0 or less.
    if (aspectRatio > 0.0) {
      panel.setAspectRatio(NSMakeSize(aspectRatio, 1.0))
    } else {
      panel.setResizeIncrements(NSMakeSize(1.0, 1.0))
    }
  }

  browserWindow.setBounds = function(bounds, animate) {
    if (!bounds) {
      return
    }

    // Do nothing if in fullscreen mode.
    if (browserWindow.isFullscreen()) {
      return
    }

    const newBounds = Object.assign(browserWindow.getBounds(), bounds)

    // TODO: Check size constraints since setFrame does not check it.
    // var size = bounds.size
    // size.SetToMax(GetMinimumSize());
    // gfx::Size max_size = GetMaximumSize();
    // if (!max_size.IsEmpty())
    //   size.SetToMin(max_size);

    var cocoaBounds = NSMakeRect(
      newBounds.x,
      0,
      newBounds.width,
      newBounds.height
    )
    // Flip Y coordinates based on the primary screen
    var screen = NSScreen.screens().firstObject()
    cocoaBounds.origin.y = NSHeight(screen.frame()) - newBounds.y

    panel.setFrame_display_animate(cocoaBounds, true, animate)
  }

  browserWindow.getBounds = function() {
    const cocoaBounds = panel.frame()
    var mainScreenRect = NSScreen.screens()
      .firstObject()
      .frame()
    return {
      x: cocoaBounds.origin.x,
      y: Math.round(NSHeight(mainScreenRect) - cocoaBounds.origin.y),
      width: cocoaBounds.size.width,
      height: cocoaBounds.size.height,
    }
  }

  browserWindow.setContentBounds = function(bounds, animate) {
    // TODO:
    browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getContentBounds = function() {
    // TODO:
    return browserWindow.getBounds()
  }

  browserWindow.setSize = function(width, height, animate) {
    // TODO: handle resizing around center
    return browserWindow.setBounds({ width: width, height: height }, animate)
  }

  browserWindow.getSize = function() {
    var bounds = browserWindow.getBounds()
    return [bounds.width, bounds.height]
  }

  browserWindow.setContentSize = function(width, height, animate) {
    // TODO: handle resizing around center
    return browserWindow.setContentBounds(
      { width: width, height: height },
      animate
    )
  }

  browserWindow.getContentSize = function() {
    var bounds = browserWindow.getContentBounds()
    return [bounds.width, bounds.height]
  }

  browserWindow.setMinimumSize = function(width, height) {
    const minSize = CGSizeMake(width, height)
    panel.setContentMinSize(minSize)
  }

  browserWindow.getMinimumSize = function() {
    const size = panel.contentMinSize()
    return [size.width, size.height]
  }

  browserWindow.setMaximumSize = function(width, height) {
    const maxSize = CGSizeMake(width, height)
    panel.setContentMaxSize(maxSize)
  }

  browserWindow.getMaximumSize = function() {
    const size = panel.contentMaxSize()
    return [size.width, size.height]
  }

  browserWindow.setResizable = function(resizable) {
    return browserWindow._setStyleMask(resizable, NSResizableWindowMask)
  }

  browserWindow.isResizable = function() {
    return panel.styleMask() & NSResizableWindowMask
  }

  browserWindow.setMovable = function(movable) {
    return panel.setMovable(movable)
  }
  browserWindow.isMovable = function() {
    return panel.isMovable()
  }

  browserWindow.setMinimizable = function(minimizable) {
    return browserWindow._setStyleMask(minimizable, NSMiniaturizableWindowMask)
  }

  browserWindow.isMinimizable = function() {
    return panel.styleMask() & NSMiniaturizableWindowMask
  }

  browserWindow.setMaximizable = function(maximizable) {
    if (panel.standardWindowButton(NSWindowZoomButton)) {
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(maximizable)
    }
  }

  browserWindow.isMaximizable = function() {
    return (
      panel.standardWindowButton(NSWindowZoomButton) &&
      panel.standardWindowButton(NSWindowZoomButton).isEnabled()
    )
  }

  browserWindow.setFullScreenable = function(fullscreenable) {
    browserWindow._setCollectionBehavior(
      fullscreenable,
      NSWindowCollectionBehaviorFullScreenPrimary
    )
    // On EL Capitan this flag is required to hide fullscreen button.
    browserWindow._setCollectionBehavior(
      !fullscreenable,
      NSWindowCollectionBehaviorFullScreenAuxiliary
    )
  }

  browserWindow.isFullScreenable = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorFullScreenPrimary
  }

  browserWindow.setClosable = function(closable) {
    browserWindow._setStyleMask(closable, NSClosableWindowMask)
  }

  browserWindow.isClosable = function() {
    return panel.styleMask() & NSClosableWindowMask
  }

  browserWindow.setAlwaysOnTop = function(top, level, relativeLevel) {
    var windowLevel = NSNormalWindowLevel
    var maxWindowLevel = CGWindowLevelForKey(kCGMaximumWindowLevelKey)
    var minWindowLevel = CGWindowLevelForKey(kCGMinimumWindowLevelKey)

    if (top) {
      if (level === 'normal') {
        windowLevel = NSNormalWindowLevel
      } else if (level === 'torn-off-menu') {
        windowLevel = NSTornOffMenuWindowLevel
      } else if (level === 'modal-panel') {
        windowLevel = NSModalPanelWindowLevel
      } else if (level === 'main-menu') {
        windowLevel = NSMainMenuWindowLevel
      } else if (level === 'status') {
        windowLevel = NSStatusWindowLevel
      } else if (level === 'pop-up-menu') {
        windowLevel = NSPopUpMenuWindowLevel
      } else if (level === 'screen-saver') {
        windowLevel = NSScreenSaverWindowLevel
      } else if (level === 'dock') {
        // Deprecated by macOS, but kept for backwards compatibility
        windowLevel = NSDockWindowLevel
      } else {
        windowLevel = NSFloatingWindowLevel
      }
    }

    var newLevel = windowLevel + (relativeLevel || 0)
    if (newLevel >= minWindowLevel && newLevel <= maxWindowLevel) {
      panel.setLevel(newLevel)
    } else {
      throw new Error(
        'relativeLevel must be between ' +
          minWindowLevel +
          ' and ' +
          maxWindowLevel
      )
    }
  }

  browserWindow.isAlwaysOnTop = function() {
    return panel.level() !== NSNormalWindowLevel
  }

  browserWindow.moveTop = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.center = function() {
    panel.center()
  }

  browserWindow.setPosition = function(x, y, animate) {
    return browserWindow.setBounds({ x: x, y: y }, animate)
  }

  browserWindow.getPosition = function() {
    var bounds = browserWindow.getBounds()
    return [bounds.x, bounds.y]
  }

  browserWindow.setTitle = function(title) {
    panel.setTitle(title)
  }

  browserWindow.getTitle = function() {
    return String(panel.title())
  }

  var attentionRequestId = 0
  browserWindow.flashFrame = function(flash) {
    if (flash) {
      attentionRequestId = NSApp.requestUserAttention(NSInformationalRequest)
    } else {
      NSApp.cancelUserAttentionRequest(attentionRequestId)
      attentionRequestId = 0
    }
  }

  browserWindow.getNativeWindowHandle = function() {
    return panel
  }

  browserWindow.getNativeWebViewHandle = function() {
    return webview
  }

  browserWindow.loadURL = function(url) {
    // When frameLocation is a file, prefix it with the Sketch Resources path
    if (/^(?!https?|file).*\.html?$/.test(url)) {
      if (typeof __command !== 'undefined' && __command.pluginBundle()) {
        url =
          'file://' +
          __command
            .pluginBundle()
            .urlForResourceNamed(url)
            .path()
      }
    }

    if (/^file:\/\/.*\.html?$/.test(url)) {
      // ensure URLs containing spaces are properly handled
      url = NSString.alloc().initWithString(url)
      url = url.stringByAddingPercentEncodingWithAllowedCharacters(
        NSCharacterSet.URLQueryAllowedCharacterSet()
      )
      webview.loadFileURL_allowingReadAccessToURL(
        NSURL.URLWithString(url),
        NSURL.URLWithString('file:///')
      )
      return
    }

    const properURL = NSURL.URLWithString(url)
    const urlRequest = NSURLRequest.requestWithURL(properURL)

    webview.loadRequest(urlRequest)
  }

  browserWindow.reload = function() {
    webview.reload()
  }

  browserWindow.setHasShadow = function(hasShadow) {
    return panel.setHasShadow(hasShadow)
  }

  browserWindow.hasShadow = function() {
    return panel.hasShadow()
  }

  browserWindow.setOpacity = function(opacity) {
    return panel.setAlphaValue(opacity)
  }

  browserWindow.getOpacity = function() {
    return panel.alphaValue()
  }

  browserWindow.setVisibleOnAllWorkspaces = function(visible) {
    return browserWindow._setCollectionBehavior(
      visible,
      NSWindowCollectionBehaviorCanJoinAllSpaces
    )
  }

  browserWindow.isVisibleOnAllWorkspaces = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorCanJoinAllSpaces
  }

  browserWindow.setIgnoreMouseEvents = function(ignore) {
    return panel.setIgnoresMouseEvents(ignore)
  }

  browserWindow.setContentProtection = function(enable) {
    panel.setSharingType(enable ? NSWindowSharingNone : NSWindowSharingReadOnly)
  }

  browserWindow.setAutoHideCursor = function(autoHide) {
    panel.setDisableAutoHideCursor(autoHide)
  }

  browserWindow.setVibrancy = function(type) {
    var effectView = browserWindow._vibrantView

    if (!type) {
      if (effectView == null) {
        return
      }

      effectView.removeFromSuperview()
      panel.setVibrantView(null)
      return
    }

    if (effectView == null) {
      var contentView = panel.contentView()
      effectView = NSVisualEffectView.alloc().initWithFrame(
        contentView.bounds()
      )
      browserWindow._vibrantView = effectView

      effectView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
      effectView.setBlendingMode(NSVisualEffectBlendingModeBehindWindow)
      effectView.setState(NSVisualEffectStateActive)
      effectView.setFrame(contentView.bounds())
      contentView.addSubview_positioned_relativeTo(
        effectView,
        NSWindowBelow,
        null
      )
    }

    var vibrancyType = NSVisualEffectMaterialLight

    if (type === 'appearance-based') {
      vibrancyType = NSVisualEffectMaterialAppearanceBased
    } else if (type === 'light') {
      vibrancyType = NSVisualEffectMaterialLight
    } else if (type === 'dark') {
      vibrancyType = NSVisualEffectMaterialDark
    } else if (type === 'titlebar') {
      vibrancyType = NSVisualEffectMaterialTitlebar
    } else if (type === 'selection') {
      vibrancyType = NSVisualEffectMaterialSelection
    } else if (type === 'menu') {
      vibrancyType = NSVisualEffectMaterialMenu
    } else if (type === 'popover') {
      vibrancyType = NSVisualEffectMaterialPopover
    } else if (type === 'sidebar') {
      vibrancyType = NSVisualEffectMaterialSidebar
    } else if (type === 'medium-light') {
      vibrancyType = NSVisualEffectMaterialMediumLight
    } else if (type === 'ultra-dark') {
      vibrancyType = NSVisualEffectMaterialUltraDark
    }

    effectView.setMaterial(vibrancyType)
  }

  browserWindow._setBackgroundColor = function(colorName) {
    var color = parseHexColor(colorName)
    webview.setValue_forKey(false, 'drawsBackground')
    panel.backgroundColor = color
  }

  browserWindow._invalidate = function() {
    panel.flushWindow()
    panel.contentView().setNeedsDisplay(true)
  }

  browserWindow._setStyleMask = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setStyleMask(panel.styleMask() | flag)
    } else {
      panel.setStyleMask(panel.styleMask() & ~flag)
    }
    // Change style mask will make the zoom button revert to default, probably
    // a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._setCollectionBehavior = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setCollectionBehavior(panel.collectionBehavior() | flag)
    } else {
      panel.setCollectionBehavior(panel.collectionBehavior() & ~flag)
    }
    // Change collectionBehavior will make the zoom button revert to default,
    // probably a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._showWindowButton = function(button) {
    var view = panel.standardWindowButton(button)
    view.superview().addSubview_positioned_relative(view, NSWindowAbove, null)
  }
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/constants.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/constants.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  JS_BRIDGE: '__skpm_sketchBridge',
  JS_BRIDGE_RESULT_SUCCESS: '__skpm_sketchBridge_success',
  JS_BRIDGE_RESULT_ERROR: '__skpm_sketchBridge_error',
  START_MOVING_WINDOW: '__skpm_startMovingWindow',
  EXECUTE_JAVASCRIPT: '__skpm_executeJS',
  EXECUTE_JAVASCRIPT_SUCCESS: '__skpm_executeJS_success_',
  EXECUTE_JAVASCRIPT_ERROR: '__skpm_executeJS_error_',
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/dispatch-first-click.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/dispatch-first-click.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var tagsToFocus =
  '["text", "textarea", "date", "datetime-local", "email", "number", "month", "password", "search", "tel", "time", "url", "week" ]'

module.exports = function(webView, event) {
  var point = webView.convertPoint_fromView(event.locationInWindow(), null)
  return (
    'var el = document.elementFromPoint(' + // get the DOM element that match the event
    point.x +
    ', ' +
    point.y +
    '); ' +
    'if (el && el.tagName === "SELECT") {' + // select needs special handling
    '  var event = document.createEvent("MouseEvents");' +
    '  event.initMouseEvent("mousedown", true, true, window);' +
    '  el.dispatchEvent(event);' +
    '} else if (el && ' + // some tags need to be focused instead of clicked
    tagsToFocus +
    '.indexOf(el.type) >= 0 && ' +
    'el.focus' +
    ') {' +
    'el.focus();' + // so focus them
    '} else if (el) {' +
    'el.dispatchEvent(new Event("click", {bubbles: true}))' + // click the others
    '}'
  )
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/execute-javascript.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/execute-javascript.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Promise) {var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

module.exports = function(webview, browserWindow) {
  function executeJavaScript(script, userGesture, callback) {
    if (typeof userGesture === 'function') {
      callback = userGesture
      userGesture = false
    }
    var fiber = coscript.createFiber()

    // if the webview is not ready yet, defer the execution until it is
    if (
      webview.navigationDelegate().state &&
      webview.navigationDelegate().state.wasReady == 0
    ) {
      return new Promise(function(resolve, reject) {
        browserWindow.once('ready-to-show', function() {
          executeJavaScript(script, userGesture, callback)
            .then(resolve)
            .catch(reject)
          fiber.cleanup()
        })
      })
    }

    return new Promise(function(resolve, reject) {
      var requestId = Math.random()

      browserWindow.webContents.on(
        CONSTANTS.EXECUTE_JAVASCRIPT_SUCCESS + requestId,
        function(res) {
          try {
            if (callback) {
              callback(null, res)
            }
            resolve(res)
          } catch (err) {
            reject(err)
          }
          fiber.cleanup()
        }
      )
      browserWindow.webContents.on(
        CONSTANTS.EXECUTE_JAVASCRIPT_ERROR + requestId,
        function(err) {
          try {
            if (callback) {
              callback(err)
              resolve()
            } else {
              reject(err)
            }
          } catch (err2) {
            reject(err2)
          }
          fiber.cleanup()
        }
      )

      webview.evaluateJavaScript_completionHandler(
        module.exports.wrapScript(script, requestId),
        null
      )
    })
  }

  return executeJavaScript
}

module.exports.wrapScript = function(script, requestId) {
  return (
    'window.' +
    CONSTANTS.EXECUTE_JAVASCRIPT +
    '(' +
    requestId +
    ', ' +
    JSON.stringify(script) +
    ')'
  )
}

module.exports.injectScript = function(webView) {
  var source =
    'window.' +
    CONSTANTS.EXECUTE_JAVASCRIPT +
    ' = function(id, script) {' +
    '  try {' +
    '    var res = eval(script);' +
    '    if (res && typeof res.then === "function" && typeof res.catch === "function") {' +
    '      res.then(function (res2) {' +
    '        window.postMessage("' +
    CONSTANTS.EXECUTE_JAVASCRIPT_SUCCESS +
    '" + id, res2);' +
    '      })' +
    '      .catch(function (err) {' +
    '        window.postMessage("' +
    CONSTANTS.EXECUTE_JAVASCRIPT_ERROR +
    '" + id, err);' +
    '      })' +
    '    } else {' +
    '      window.postMessage("' +
    CONSTANTS.EXECUTE_JAVASCRIPT_SUCCESS +
    '" + id, res);' +
    '    }' +
    '  } catch (err) {' +
    '    window.postMessage("' +
    CONSTANTS.EXECUTE_JAVASCRIPT_ERROR +
    '" + id, err);' +
    '  }' +
    '}'
  var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
    source,
    0,
    true
  )
  webView
    .configuration()
    .userContentController()
    .addUserScript(script)
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/promise-polyfill/lib/index.js */ "./node_modules/promise-polyfill/lib/index.js")))

/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/fitSubview.js":
/*!***************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/fitSubview.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function addEdgeConstraint(edge, subview, view, constant) {
  view.addConstraint(
    NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(
      subview,
      edge,
      NSLayoutRelationEqual,
      view,
      edge,
      1,
      constant
    )
  )
}
module.exports = function fitSubviewToView(subview, view, constants) {
  constants = constants || []
  subview.setTranslatesAutoresizingMaskIntoConstraints(false)

  addEdgeConstraint(NSLayoutAttributeLeft, subview, view, constants[0] || 0)
  addEdgeConstraint(NSLayoutAttributeTop, subview, view, constants[1] || 0)
  addEdgeConstraint(NSLayoutAttributeRight, subview, view, constants[2] || 0)
  addEdgeConstraint(NSLayoutAttributeBottom, subview, view, constants[3] || 0)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* let's try to match the API from Electron's Browser window
(https://github.com/electron/electron/blob/master/docs/api/browser-window.md) */
var EventEmitter = __webpack_require__(/*! events */ "events")
var buildBrowserAPI = __webpack_require__(/*! ./browser-api */ "./node_modules/sketch-module-web-view/lib/browser-api.js")
var buildWebAPI = __webpack_require__(/*! ./webview-api */ "./node_modules/sketch-module-web-view/lib/webview-api.js")
var fitSubviewToView = __webpack_require__(/*! ./fitSubview */ "./node_modules/sketch-module-web-view/lib/fitSubview.js")
var dispatchFirstClick = __webpack_require__(/*! ./dispatch-first-click */ "./node_modules/sketch-module-web-view/lib/dispatch-first-click.js")
var injectClientMessaging = __webpack_require__(/*! ./inject-client-messaging */ "./node_modules/sketch-module-web-view/lib/inject-client-messaging.js")
var movableArea = __webpack_require__(/*! ./movable-area */ "./node_modules/sketch-module-web-view/lib/movable-area.js")
var executeJavaScript = __webpack_require__(/*! ./execute-javascript */ "./node_modules/sketch-module-web-view/lib/execute-javascript.js")
var setDelegates = __webpack_require__(/*! ./set-delegates */ "./node_modules/sketch-module-web-view/lib/set-delegates.js")

function BrowserWindow(options) {
  options = options || {}

  var identifier = options.identifier || NSUUID.UUID().UUIDString()
  var threadDictionary = NSThread.mainThread().threadDictionary()

  var existingBrowserWindow = BrowserWindow.fromId(identifier)

  // if we already have a window opened, reuse it
  if (existingBrowserWindow) {
    return existingBrowserWindow
  }

  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  if (options.modal && !options.parent) {
    throw new Error('A modal needs to have a parent.')
  }

  // Long-running script
  var fiber = coscript.createFiber()

  // Window size
  var width = options.width || 800
  var height = options.height || 600
  var mainScreenRect = NSScreen.screens()
    .firstObject()
    .frame()
  var cocoaBounds = NSMakeRect(
    typeof options.x !== 'undefined'
      ? options.x
      : Math.round((NSWidth(mainScreenRect) - width) / 2),
    typeof options.y !== 'undefined'
      ? NSHeight(mainScreenRect) - options.y
      : Math.round((NSHeight(mainScreenRect) - height) / 2),
    width,
    height
  )

  if (options.titleBarStyle && options.titleBarStyle !== 'default') {
    options.frame = false
  }

  var useStandardWindow = options.windowType !== 'textured'
  var styleMask = NSTitledWindowMask

  // this is commented out because the toolbar doesn't appear otherwise :thinking-face:
  // if (!useStandardWindow || options.frame === false) {
  //   styleMask = NSFullSizeContentViewWindowMask
  // }
  if (options.minimizable !== false) {
    styleMask |= NSMiniaturizableWindowMask
  }
  if (options.closable !== false) {
    styleMask |= NSClosableWindowMask
  }
  if (options.resizable !== false) {
    styleMask |= NSResizableWindowMask
  }
  if (!useStandardWindow || options.transparent || options.frame === false) {
    styleMask |= NSTexturedBackgroundWindowMask
  }

  var panel = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(
    cocoaBounds,
    styleMask,
    NSBackingStoreBuffered,
    true
  )

  var wkwebviewConfig = WKWebViewConfiguration.alloc().init()
  var webView = WKWebView.alloc().initWithFrame_configuration(
    CGRectMake(0, 0, options.width || 800, options.height || 600),
    wkwebviewConfig
  )
  injectClientMessaging(webView)
  webView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)
  setDelegates(browserWindow, panel, webView, options)

  if (options.windowType === 'desktop') {
    panel.setLevel(kCGDesktopWindowLevel - 1)
    // panel.setCanBecomeKeyWindow(false)
    panel.setCollectionBehavior(
      NSWindowCollectionBehaviorCanJoinAllSpaces |
        NSWindowCollectionBehaviorStationary |
        NSWindowCollectionBehaviorIgnoresCycle
    )
  }

  if (
    typeof options.minWidth !== 'undefined' ||
    typeof options.minHeight !== 'undefined'
  ) {
    browserWindow.setMinimumSize(options.minWidth || 0, options.minHeight || 0)
  }

  if (
    typeof options.maxWidth !== 'undefined' ||
    typeof options.maxHeight !== 'undefined'
  ) {
    browserWindow.setMaximumSize(
      options.maxWidth || 10000,
      options.maxHeight || 10000
    )
  }

  // if (options.focusable === false) {
  //   panel.setCanBecomeKeyWindow(false)
  // }

  if (options.transparent || options.frame === false) {
    panel.titlebarAppearsTransparent = true
    panel.titleVisibility = NSWindowTitleHidden
    panel.setOpaque(0)
    panel.isMovableByWindowBackground = true
    var toolbar2 = NSToolbar.alloc().initWithIdentifier(
      'titlebarStylingToolbar'
    )
    toolbar2.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar2)
  }

  if (options.titleBarStyle === 'hiddenInset') {
    var toolbar = NSToolbar.alloc().initWithIdentifier('titlebarStylingToolbar')
    toolbar.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar)
  }

  if (options.frame === false || !options.useContentSize) {
    browserWindow.setSize(width, height)
  }

  if (options.center) {
    browserWindow.center()
  }

  if (options.alwaysOnTop) {
    browserWindow.setAlwaysOnTop(true)
  }

  if (options.fullscreen) {
    browserWindow.setFullScreen(true)
  }
  browserWindow.setFullScreenable(!!options.fullscreenable)

  let title = options.title
  if (options.frame === false) {
    title = undefined
  } else if (
    typeof title === 'undefined' &&
    typeof __command !== 'undefined' &&
    __command.pluginBundle()
  ) {
    title = __command.pluginBundle().name()
  }

  if (title) {
    browserWindow.setTitle(title)
  }

  var backgroundColor = options.backgroundColor
  if (options.transparent) {
    backgroundColor = NSColor.clearColor()
  }
  if (!backgroundColor && options.frame === false && options.vibrancy) {
    backgroundColor = NSColor.clearColor()
  }

  browserWindow._setBackgroundColor(
    backgroundColor || NSColor.windowBackgroundColor()
  )

  if (options.hasShadow === false) {
    browserWindow.setHasShadow(false)
  }

  if (typeof options.opacity !== 'undefined') {
    browserWindow.setOpacity(options.opacity)
  }

  options.webPreferences = options.webPreferences || {}

  webView
    .configuration()
    .preferences()
    .setValue_forKey(
      options.webPreferences.devTools !== false,
      'developerExtrasEnabled'
    )
  webView
    .configuration()
    .preferences()
    .setValue_forKey(
      options.webPreferences.javascript !== false,
      'javaScriptEnabled'
    )
  webView
    .configuration()
    .preferences()
    .setValue_forKey(!!options.webPreferences.plugins, 'plugInsEnabled')
  webView
    .configuration()
    .preferences()
    .setValue_forKey(
      options.webPreferences.minimumFontSize || 0,
      'minimumFontSize'
    )

  if (options.webPreferences.zoomFactor) {
    webView.setMagnification(options.webPreferences.zoomFactor)
  }

  var contentView = panel.contentView()

  if (options.frame !== false) {
    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)
  } else {
    // In OSX 10.10, adding subviews to the root view for the NSView hierarchy
    // produces warnings. To eliminate the warnings, we resize the contentView
    // to fill the window, and add subviews to that.
    // http://crbug.com/380412
    contentView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
    fitSubviewToView(contentView, contentView.superview())

    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)

    // The fullscreen button should always be hidden for frameless window.
    if (panel.standardWindowButton(NSWindowFullScreenButton)) {
      panel.standardWindowButton(NSWindowFullScreenButton).setHidden(true)
    }

    if (!options.titleBarStyle || options.titleBarStyle === 'default') {
      // Hide the window buttons.
      panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
      panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
      panel.standardWindowButton(NSWindowCloseButton).setHidden(true)

      // Some third-party macOS utilities check the zoom button's enabled state to
      // determine whether to show custom UI on hover, so we disable it here to
      // prevent them from doing so in a frameless app window.
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(false)
    }
  }

  if (options.vibrancy) {
    browserWindow.setVibrancy(options.vibrancy)
  }

  // Set maximizable state last to ensure zoom button does not get reset
  // by calls to other APIs.
  browserWindow.setMaximizable(options.maximizable !== false)

  panel.setHidesOnDeactivate(options.hidesOnDeactivate !== false)

  if (options.remembersWindowFrame) {
    panel.setFrameAutosaveName(identifier)
    panel.setFrameUsingName_force(panel.frameAutosaveName(), false)
  }

  if (options.acceptsFirstMouse) {
    browserWindow.on('focus', function(event) {
      if (event.type() === NSEventTypeLeftMouseDown) {
        browserWindow.webContents
          .executeJavaScript(dispatchFirstClick(webView, event))
          .catch(() => {})
      }
    })
  }

  executeJavaScript.injectScript(webView)
  movableArea.injectScript(webView)
  movableArea.setupHandler(browserWindow)

  if (options.show !== false) {
    browserWindow.show()
  }

  browserWindow.on('closed', function() {
    browserWindow._destroyed = true
    threadDictionary.removeObjectForKey(identifier)
    var observer = threadDictionary[identifier + '.themeObserver']
    if (observer) {
      NSApplication.sharedApplication().removeObserver_forKeyPath(
        observer,
        'effectiveAppearance'
      )
      threadDictionary.removeObjectForKey(identifier + '.themeObserver')
    }
    fiber.cleanup()
  })

  threadDictionary[identifier] = panel

  fiber.onCleanup(function() {
    if (!browserWindow._destroyed) {
      browserWindow.destroy()
    }
  })

  return browserWindow
}

BrowserWindow.fromId = function(identifier) {
  var threadDictionary = NSThread.mainThread().threadDictionary()

  if (threadDictionary[identifier]) {
    return BrowserWindow.fromPanel(threadDictionary[identifier], identifier)
  }

  return undefined
}

BrowserWindow.fromPanel = function(panel, identifier) {
  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  if (!panel || !panel.contentView) {
    throw new Error('needs to pass an NSPanel')
  }

  var webView = null
  var subviews = panel.contentView().subviews()
  for (var i = 0; i < subviews.length; i += 1) {
    if (
      !webView &&
      !subviews[i].isKindOfClass(WKInspectorWKWebView) &&
      subviews[i].isKindOfClass(WKWebView)
    ) {
      webView = subviews[i]
    }
  }

  if (!webView) {
    throw new Error('The panel needs to have a webview')
  }

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)

  return browserWindow
}

module.exports = BrowserWindow


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/inject-client-messaging.js":
/*!****************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/inject-client-messaging.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

module.exports = function(webView) {
  var source =
    'window.originalPostMessage = window.postMessage;' +
    'window.postMessage = function(actionName) {' +
    '  if (!actionName) {' +
    "    throw new Error('missing action name')" +
    '  }' +
    '  var id = String(Math.random()).replace(".", "");' +
    '    var args = [].slice.call(arguments);' +
    '    args.unshift(id);' +
    '  return new Promise(function (resolve, reject) {' +
    '    window["' +
    CONSTANTS.JS_BRIDGE_RESULT_SUCCESS +
    '" + id] = resolve;' +
    '    window["' +
    CONSTANTS.JS_BRIDGE_RESULT_ERROR +
    '" + id] = reject;' +
    '    window.webkit.messageHandlers.' +
    CONSTANTS.JS_BRIDGE +
    '.postMessage(JSON.stringify(args));' +
    '  });' +
    '}'
  var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
    source,
    0,
    true
  )
  webView
    .configuration()
    .userContentController()
    .addUserScript(script)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/movable-area.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/movable-area.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(clearInterval, setInterval) {var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

module.exports.injectScript = function(webView) {
  var source =
    '(function () {' +
    "document.addEventListener('mousedown', onMouseDown);" +
    '' +
    'function shouldDrag(target) {' +
    '  if (!target || (target.dataset || {}).appRegion === "no-drag") { return false }' +
    '  if ((target.dataset || {}).appRegion === "drag") { return true }' +
    '  return shouldDrag(target.parentElement)' +
    '};' +
    '' +
    'function onMouseDown(e) {' +
    '  if (e.button !== 0 || !shouldDrag(e.target)) { return }' +
    '  window.postMessage("' +
    CONSTANTS.START_MOVING_WINDOW +
    '");' +
    '};' +
    '})()'
  var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
    source,
    0,
    true
  )
  webView
    .configuration()
    .userContentController()
    .addUserScript(script)
}

module.exports.setupHandler = function(browserWindow) {
  var initialMouseLocation = null
  var initialWindowPosition = null
  var interval = null

  function moveWindow() {
    // if the user released the button, stop moving the window
    if (!initialWindowPosition || NSEvent.pressedMouseButtons() !== 1) {
      clearInterval(interval)
      initialMouseLocation = null
      initialWindowPosition = null
      return
    }

    var mouse = NSEvent.mouseLocation()
    browserWindow.setPosition(
      initialWindowPosition.x + (mouse.x - initialMouseLocation.x),
      initialWindowPosition.y + (initialMouseLocation.y - mouse.y), // y is inverted
      false
    )
  }

  browserWindow.webContents.on(CONSTANTS.START_MOVING_WINDOW, function() {
    initialMouseLocation = NSEvent.mouseLocation()
    var position = browserWindow.getPosition()
    initialWindowPosition = {
      x: position[0],
      y: position[1],
    }

    interval = setInterval(moveWindow, 1000 / 60) // 60 fps
  })
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@skpm/timers/interval.js */ "./node_modules/@skpm/timers/interval.js")["clearInterval"], __webpack_require__(/*! ./node_modules/@skpm/timers/interval.js */ "./node_modules/@skpm/timers/interval.js")["setInterval"]))

/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/parseWebArguments.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/parseWebArguments.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(webArguments) {
  var args = null
  try {
    args = JSON.parse(webArguments)
  } catch (e) {
    // malformed arguments
  }

  if (
    !args ||
    !args.constructor ||
    args.constructor !== Array ||
    args.length == 0
  ) {
    return null
  }

  return args
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/set-delegates.js":
/*!******************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/set-delegates.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, Promise) {var ObjCClass = __webpack_require__(/*! mocha-js-delegate */ "./node_modules/mocha-js-delegate/index.js")
var parseWebArguments = __webpack_require__(/*! ./parseWebArguments */ "./node_modules/sketch-module-web-view/lib/parseWebArguments.js")
var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

// We create one ObjC class for ourselves here
var WindowDelegateClass
var NavigationDelegateClass
var WebScriptHandlerClass
var ThemeObserverClass

// TODO: events
// - 'page-favicon-updated'
// - 'new-window'
// - 'did-navigate-in-page'
// - 'will-prevent-unload'
// - 'crashed'
// - 'unresponsive'
// - 'responsive'
// - 'destroyed'
// - 'before-input-event'
// - 'certificate-error'
// - 'found-in-page'
// - 'media-started-playing'
// - 'media-paused'
// - 'did-change-theme-color'
// - 'update-target-url'
// - 'cursor-changed'
// - 'context-menu'
// - 'select-bluetooth-device'
// - 'paint'
// - 'console-message'

module.exports = function(browserWindow, panel, webview, options) {
  if (!ThemeObserverClass) {
    ThemeObserverClass = new ObjCClass({
      utils: null,

      'observeValueForKeyPath:ofObject:change:context:': function(keyPath,object,change) {
        const newAppearance = change[NSKeyValueChangeNewKey]
        const isDark = String(newAppearance.bestMatchFromAppearancesWithNames(['NSAppearanceNameAqua', 'NSAppearanceNameDarkAqua'])) === 'NSAppearanceNameDarkAqua'

        this.utils.executeJavaScript(
          "document.body.classList.remove('__skpm-" +
            (isDark ? 'light' : 'dark') +
            "'); document.body.classList.add('__skpm-" +
            (isDark ? 'dark' : 'light') +
            "')"
        )
      },
    })
  }

  if (!WindowDelegateClass) {
    WindowDelegateClass = new ObjCClass({
      utils: null,
      panel: null,

      'windowDidResize:': function() {
        this.utils.emit('resize')
      },

      'windowDidMiniaturize:': function() {
        this.utils.emit('minimize')
      },

      'windowDidDeminiaturize:': function() {
        this.utils.emit('restore')
      },

      'windowDidEnterFullScreen:': function() {
        this.utils.emit('enter-full-screen')
      },

      'windowDidExitFullScreen:': function() {
        this.utils.emit('leave-full-screen')
      },

      'windowDidMove:': function() {
        this.utils.emit('move')
        this.utils.emit('moved')
      },

      'windowShouldClose:': function() {
        var shouldClose = 1
        this.utils.emit('close', {
          get defaultPrevented() {
            return !shouldClose
          },
          preventDefault: function() {
            shouldClose = 0
          },
        })
        return shouldClose
      },

      'windowWillClose:': function() {
        this.utils.emit('closed')
      },

      'windowDidBecomeKey:': function() {
        this.utils.emit('focus', this.panel.currentEvent())
      },

      'windowDidResignKey:': function() {
        this.utils.emit('blur')
      },
    })
  }

  if (!NavigationDelegateClass) {
    NavigationDelegateClass = new ObjCClass({
      state: {
        wasReady: 0,
      },
      utils: null,

      // // Called when the web view begins to receive web content.
      'webView:didCommitNavigation:': function(webView) {
        this.utils.emit('will-navigate', {}, String(String(webView.URL())))
      },

      // // Called when web content begins to load in a web view.
      'webView:didStartProvisionalNavigation:': function() {
        this.utils.emit('did-start-navigation')
        this.utils.emit('did-start-loading')
      },

      // Called when a web view receives a server redirect.
      'webView:didReceiveServerRedirectForProvisionalNavigation:': function() {
        this.utils.emit('did-get-redirect-request')
      },

      // // Called when the web view needs to respond to an authentication challenge.
      // 'webView:didReceiveAuthenticationChallenge:completionHandler:': function(
      //   webView,
      //   challenge,
      //   completionHandler
      // ) {
      //   function callback(username, password) {
      //     completionHandler(
      //       0,
      //       NSURLCredential.credentialWithUser_password_persistence(
      //         username,
      //         password,
      //         1
      //       )
      //     )
      //   }
      //   var protectionSpace = challenge.protectionSpace()
      //   this.utils.emit(
      //     'login',
      //     {},
      //     {
      //       method: String(protectionSpace.authenticationMethod()),
      //       url: 'not implemented', // TODO:
      //       referrer: 'not implemented', // TODO:
      //     },
      //     {
      //       isProxy: !!protectionSpace.isProxy(),
      //       scheme: String(protectionSpace.protocol()),
      //       host: String(protectionSpace.host()),
      //       port: Number(protectionSpace.port()),
      //       realm: String(protectionSpace.realm()),
      //     },
      //     callback
      //   )
      // },

      // Called when an error occurs during navigation.
      // 'webView:didFailNavigation:withError:': function(
      //   webView,
      //   navigation,
      //   error
      // ) {},

      // Called when an error occurs while the web view is loading content.
      'webView:didFailProvisionalNavigation:withError:': function(
        webView,
        navigation,
        error
      ) {
        this.utils.emit('did-fail-load', error)
      },

      // Called when the navigation is complete.
      'webView:didFinishNavigation:': function() {
        if (this.state.wasReady == 0) {
          this.state.wasReady = 1
          this.utils.emitBrowserEvent('ready-to-show')
        }
        this.utils.emit('did-navigate')
        this.utils.emit('did-frame-navigate')
        this.utils.emit('did-stop-loading')
        this.utils.emit('did-finish-load')
        this.utils.emit('did-frame-finish-load')
      },

      // Called when the web view’s web content process is terminated.
      'webViewWebContentProcessDidTerminate:': function() {
        this.utils.emit('dom-ready')
      },

      // Decides whether to allow or cancel a navigation.
      // webView:decidePolicyForNavigationAction:decisionHandler:

      // Decides whether to allow or cancel a navigation after its response is known.
      // webView:decidePolicyForNavigationResponse:decisionHandler:
    })
  }

  if (!WebScriptHandlerClass) {
    WebScriptHandlerClass = new ObjCClass({
      utils: null,
      'userContentController:didReceiveScriptMessage:': function(_, message) {
        var args = this.utils.parseWebArguments(String(message.body()))
        if (!args) {
          return
        }
        if (!args[0] || typeof args[0] !== 'string') {
          return
        }
        args[0] = String(args[0])

        this.utils.emit.apply(this, args)
      },
    })
  }

  var themeObserver = ThemeObserverClass.new({
    utils: {
      executeJavaScript(script) {
        webview.evaluateJavaScript_completionHandler(script, null)
      },
    },
  })

  var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
    "document.addEventListener('DOMContentLoaded', function() { document.body.classList.add('__skpm-" +
      (typeof MSTheme !== 'undefined' && MSTheme.sharedTheme().isDark()
        ? 'dark'
        : 'light') +
      "') }, false)",
    0,
    true
  )
  webview
    .configuration()
    .userContentController()
    .addUserScript(script)

  NSApplication.sharedApplication().addObserver_forKeyPath_options_context(
    themeObserver,
    'effectiveAppearance',
    NSKeyValueObservingOptionNew,
    null
  )

  var threadDictionary = NSThread.mainThread().threadDictionary()
  threadDictionary[browserWindow.id + '.themeObserver'] = themeObserver

  var navigationDelegate = NavigationDelegateClass.new({
    utils: {
      setTitle: browserWindow.setTitle.bind(browserWindow),
      emitBrowserEvent() {
        try {
          browserWindow.emit.apply(browserWindow, arguments)
        } catch (err) {
          if (
            typeof process !== 'undefined' &&
            process.listenerCount &&
            process.listenerCount('uncaughtException')
          ) {
            process.emit('uncaughtException', err, 'uncaughtException')
          } else {
            console.error(err)
            throw err
          }
        }
      },
      emit() {
        try {
          browserWindow.webContents.emit.apply(
            browserWindow.webContents,
            arguments
          )
        } catch (err) {
          if (
            typeof process !== 'undefined' &&
            process.listenerCount &&
            process.listenerCount('uncaughtException')
          ) {
            process.emit('uncaughtException', err, 'uncaughtException')
          } else {
            console.error(err)
            throw err
          }
        }
      },
    },
    state: {
      wasReady: 0,
    },
  })

  webview.setNavigationDelegate(navigationDelegate)

  var webScriptHandler = WebScriptHandlerClass.new({
    utils: {
      emit(id, type) {
        if (!type) {
          webview.evaluateJavaScript_completionHandler(
            CONSTANTS.JS_BRIDGE_RESULT_SUCCESS + id + '()',
            null
          )
          return
        }

        var args = []
        for (var i = 2; i < arguments.length; i += 1) args.push(arguments[i])

        var listeners = browserWindow.webContents.listeners(type)

        Promise.all(
          listeners.map(function(l) {
            return Promise.resolve().then(function() {
              return l.apply(l, args)
            })
          })
        )
          .then(function(res) {
            webview.evaluateJavaScript_completionHandler(
              CONSTANTS.JS_BRIDGE_RESULT_SUCCESS +
                id +
                '(' +
                JSON.stringify(res) +
                ')',
              null
            )
          })
          .catch(function(err) {
            webview.evaluateJavaScript_completionHandler(
              CONSTANTS.JS_BRIDGE_RESULT_ERROR +
                id +
                '(' +
                JSON.stringify(err) +
                ')',
              null
            )
          })
      },
      parseWebArguments: parseWebArguments,
    },
  })

  webview
    .configuration()
    .userContentController()
    .addScriptMessageHandler_name(webScriptHandler, CONSTANTS.JS_BRIDGE)

  var utils = {
    emit() {
      try {
        browserWindow.emit.apply(browserWindow, arguments)
      } catch (err) {
        if (
          typeof process !== 'undefined' &&
          process.listenerCount &&
          process.listenerCount('uncaughtException')
        ) {
          process.emit('uncaughtException', err, 'uncaughtException')
        } else {
          console.error(err)
          throw err
        }
      }
    },
  }
  if (options.modal) {
    // find the window of the document
    var msdocument
    if (options.parent.type === 'Document') {
      msdocument = options.parent.sketchObject
    } else {
      msdocument = options.parent
    }
    if (msdocument && String(msdocument.class()) === 'MSDocumentData') {
      // we only have an MSDocumentData instead of a MSDocument
      // let's try to get back to the MSDocument
      msdocument = msdocument.delegate()
    }
    utils.parentWindow = msdocument.windowForSheet()
  }

  var windowDelegate = WindowDelegateClass.new({
    utils: utils,
    panel: panel,
  })

  panel.setDelegate(windowDelegate)
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./node_modules/promise-polyfill/lib/index.js */ "./node_modules/promise-polyfill/lib/index.js")))

/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/webview-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/webview-api.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events */ "events")
var executeJavaScript = __webpack_require__(/*! ./execute-javascript */ "./node_modules/sketch-module-web-view/lib/execute-javascript.js")

// let's try to match https://github.com/electron/electron/blob/master/docs/api/web-contents.md
module.exports = function buildAPI(browserWindow, panel, webview) {
  var webContents = new EventEmitter()

  webContents.loadURL = browserWindow.loadURL

  webContents.loadFile = function(/* filePath */) {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  webContents.downloadURL = function(/* filePath */) {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  webContents.getURL = function() {
    return String(webview.URL())
  }

  webContents.getTitle = function() {
    return String(webview.title())
  }

  webContents.isDestroyed = function() {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  webContents.focus = browserWindow.focus
  webContents.isFocused = browserWindow.isFocused

  webContents.isLoading = function() {
    return !!webview.loading()
  }

  webContents.isLoadingMainFrame = function() {
    // TODO:
    return !!webview.loading()
  }

  webContents.isWaitingForResponse = function() {
    return !webview.loading()
  }

  webContents.stop = function() {
    webview.stopLoading()
  }
  webContents.reload = function() {
    webview.reload()
  }
  webContents.reloadIgnoringCache = function() {
    webview.reloadFromOrigin()
  }
  webContents.canGoBack = function() {
    return !!webview.canGoBack()
  }
  webContents.canGoForward = function() {
    return !!webview.canGoForward()
  }
  webContents.canGoToOffset = function(offset) {
    return !!webview.backForwardList().itemAtIndex(offset)
  }
  webContents.clearHistory = function() {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.goBack = function() {
    webview.goBack()
  }
  webContents.goForward = function() {
    webview.goForward()
  }
  webContents.goToIndex = function(index) {
    var backForwardList = webview.backForwardList()
    var backList = backForwardList.backList()
    var backListLength = backList.count()
    if (backListLength > index) {
      webview.loadRequest(NSURLRequest.requestWithURL(backList[index]))
      return
    }
    var forwardList = backForwardList.forwardList()
    if (forwardList.count() > index - backListLength) {
      webview.loadRequest(
        NSURLRequest.requestWithURL(forwardList[index - backListLength])
      )
      return
    }
    throw new Error('Cannot go to index ' + index)
  }
  webContents.goToOffset = function(offset) {
    if (!webContents.canGoToOffset(offset)) {
      throw new Error('Cannot go to offset ' + offset)
    }
    webview.loadRequest(
      NSURLRequest.requestWithURL(webview.backForwardList().itemAtIndex(offset))
    )
  }
  webContents.isCrashed = function() {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setUserAgent = function(/* userAgent */) {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.getUserAgent = function() {
    const userAgent = webview.customUserAgent()
    return userAgent ? String(userAgent) : undefined
  }
  webContents.insertCSS = function(css) {
    var source =
      "var style = document.createElement('style'); style.innerHTML = " +
      css.replace(/"/, '\\"') +
      '; document.head.appendChild(style);'
    var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
      source,
      0,
      true
    )
    webview
      .configuration()
      .userContentController()
      .addUserScript(script)
  }
  webContents.insertJS = function(source) {
    var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
      source,
      0,
      true
    )
    webview
      .configuration()
      .userContentController()
      .addUserScript(script)
  }
  webContents.executeJavaScript = executeJavaScript(webview, browserWindow)
  webContents.setIgnoreMenuShortcuts = function() {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setAudioMuted = function(/* muted */) {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.isAudioMuted = function() {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setZoomFactor = function(factor) {
    webview.setMagnification_centeredAtPoint(factor, CGPointMake(0, 0))
  }
  webContents.getZoomFactor = function(callback) {
    callback(Number(webview.magnification()))
  }
  webContents.setZoomLevel = function(level) {
    // eslint-disable-next-line no-restricted-properties
    webContents.setZoomFactor(Math.pow(1.2, level))
  }
  webContents.getZoomLevel = function(callback) {
    // eslint-disable-next-line no-restricted-properties
    callback(Math.log(Number(webview.magnification())) / Math.log(1.2))
  }
  webContents.setVisualZoomLevelLimits = function(/* minimumLevel, maximumLevel */) {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setLayoutZoomLevelLimits = function(/* minimumLevel, maximumLevel */) {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  // TODO:
  // webContents.undo = function() {
  //   webview.undoManager().undo()
  // }
  // webContents.redo = function() {
  //   webview.undoManager().redo()
  // }
  // webContents.cut = webview.cut
  // webContents.copy = webview.copy
  // webContents.paste = webview.paste
  // webContents.pasteAndMatchStyle = webview.pasteAsRichText
  // webContents.delete = webview.delete
  // webContents.replace = webview.replaceSelectionWithText

  webContents.send = function() {
    const script =
      'window.postMessage({' +
      'isSketchMessage: true,' +
      "origin: '" +
      String(__command.identifier()) +
      "'," +
      'args: ' +
      JSON.stringify([].slice.call(arguments)) +
      '}, "*")'
    webview.evaluateJavaScript_completionHandler(script, null)
  }

  webContents.getNativeWebview = function() {
    return webview
  }

  browserWindow.webContents = webContents
}


/***/ }),

/***/ "./src/sketch/utilities/common.js":
/*!****************************************!*\
  !*** ./src/sketch/utilities/common.js ***!
  \****************************************/
/*! exports provided: openURL, saveSetting, saveAllSettings, loadSetting, loadAllSettings, showToast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openURL", function() { return openURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveSetting", function() { return saveSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveAllSettings", function() { return saveAllSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadSetting", function() { return loadSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAllSettings", function() { return loadAllSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showToast", function() { return showToast; });
/* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch/settings */ "sketch/settings");
/* harmony import */ var sketch_settings__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_settings__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch/ui */ "sketch/ui");
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/sketch/utilities/constants.js");



/* 
Opens a URL from Sketch
*/

var openURL = function openURL(url) {
  var nsurl = NSURL.URLWithString(url);
  NSWorkspace.sharedWorkspace().openURL(nsurl);
};
/* 
Saves a setting in Sketch to the provided key
*/


var saveSetting = function saveSetting(key, value) {
  sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.setSettingForKey("com.stark.".concat(key), value);
};
/*
Saves all settings in Sketch
*/


var saveAllSettings = function saveAllSettings(subscriptionObject) {
  saveSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_EMAIL"], subscriptionObject.email);
  saveSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_LICENSE"], subscriptionObject.keygenLicenseKey);
  saveSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_MIXPANELID"], subscriptionObject.mp_id);
  saveSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_STATUS"], 'valid');
  saveSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_PLAN"], subscriptionObject.plan);
  saveSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_TEAMUSER"], subscriptionObject.teamUser);
  saveSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_VERIFICATION"], new Date().getMonth());
};
/* 
Loads a setting in Sketch with the provided key
*/


var loadSetting = function loadSetting(key) {
  return sketch_settings__WEBPACK_IMPORTED_MODULE_0___default.a.settingForKey("com.stark.".concat(key));
};
/*
Loads all settings in Sketch
*/


var loadAllSettings = function loadAllSettings() {
  return {
    email: loadSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_EMAIL"]),
    keygenLicenseKey: loadSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_LICENSE"]),
    mp_id: loadSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_MIXPANELID"]),
    status: loadSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_STATUS"]),
    plan: loadSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_PLAN"]) === undefined || loadSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_PLAN"]) === '' ? 'FREE_TIER' : loadSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_PLAN"]),
    teamUser: loadSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_TEAMUSER"]),
    verification: loadSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_VERIFICATION"]),
    contrastFailMessageShown: loadSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_CONTRASTFAILMESSAGESHOWN"]) === undefined || loadSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_CONTRASTFAILMESSAGESHOWN"]) === '' ? true : loadSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_CONTRASTFAILMESSAGESHOWN"]),
    suggestionsTriesLeft: loadSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_CONTRASTSUGGESTIONSTRIESLEFT"]) === undefined || loadSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_CONTRASTSUGGESTIONSTRIESLEFT"]) === '' ? 4 : loadSetting(_constants__WEBPACK_IMPORTED_MODULE_2__["SETTINGS_CONTRASTSUGGESTIONSTRIESLEFT"])
  };
};
/*
Shows a message at the bottom of the Sketch window
*/


var showToast = function showToast(message) {
  sketch_ui__WEBPACK_IMPORTED_MODULE_1___default.a.message(message);
};



/***/ }),

/***/ "./src/sketch/utilities/constants.js":
/*!*******************************************!*\
  !*** ./src/sketch/utilities/constants.js ***!
  \*******************************************/
/*! exports provided: SETTINGS_LICENSE, SETTINGS_STATUS, SETTINGS_EMAIL, SETTINGS_PLAN, SETTINGS_VERIFICATION, SETTINGS_TEAMUSER, SETTINGS_MIXPANELID, SETTINGS_CONTRASTFAILMESSAGESHOWN, SETTINGS_CONTRASTSUGGESTIONSTRIESLEFT, URL_PRICING, URL_SUPPORT, URL_SIGNUP, URL_MYACCOUNT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_LICENSE", function() { return SETTINGS_LICENSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_STATUS", function() { return SETTINGS_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_EMAIL", function() { return SETTINGS_EMAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_PLAN", function() { return SETTINGS_PLAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_VERIFICATION", function() { return SETTINGS_VERIFICATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_TEAMUSER", function() { return SETTINGS_TEAMUSER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_MIXPANELID", function() { return SETTINGS_MIXPANELID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_CONTRASTFAILMESSAGESHOWN", function() { return SETTINGS_CONTRASTFAILMESSAGESHOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_CONTRASTSUGGESTIONSTRIESLEFT", function() { return SETTINGS_CONTRASTSUGGESTIONSTRIESLEFT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL_PRICING", function() { return URL_PRICING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL_SUPPORT", function() { return URL_SUPPORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL_SIGNUP", function() { return URL_SIGNUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL_MYACCOUNT", function() { return URL_MYACCOUNT; });
var SETTINGS_LICENSE = 'keygenLicenseKey';
var SETTINGS_STATUS = 'subscription-status';
var SETTINGS_EMAIL = 'email';
var SETTINGS_PLAN = 'plan';
var SETTINGS_VERIFICATION = 'verification';
var SETTINGS_TEAMUSER = 'teamUser';
var SETTINGS_MIXPANELID = 'mp_id';
var SETTINGS_CONTRASTFAILMESSAGESHOWN = 'contrast-fail-message-shown';
var SETTINGS_CONTRASTSUGGESTIONSTRIESLEFT = 'suggestions-tries-left';
var URL_PRICING = 'https://getstark.co/pricing';
var URL_SUPPORT = 'https://getstark.co/support';
var URL_SIGNUP = 'https://account.getstark.co/sign-up';
var URL_MYACCOUNT = 'https://account.getstark.co';


/***/ }),

/***/ "./src/sketch/utilities/contrast-check.js":
/*!************************************************!*\
  !*** ./src/sketch/utilities/contrast-check.js ***!
  \************************************************/
/*! exports provided: getLayers, getChildLayers, applyColorToLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLayers", function() { return getLayers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChildLayers", function() { return getChildLayers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyColorToLayer", function() { return applyColorToLayer; });
/* harmony import */ var _stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @stark-contrast/color-utilities */ "./node_modules/@stark-contrast/color-utilities/lib/index.js");
/* harmony import */ var _stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_0__);
var Style = __webpack_require__(/*! sketch/dom */ "sketch/dom").Style;

 // layer: The layer to check if it's a group
// RETURNS: bool - whether the provided layer is a group

var isLayerGroup = function isLayerGroup(layer) {
  return layer.type === 'Group' || layer.type === 'SymbolInstance' || layer.type === 'SymbolMaster' || layer.type === 'Artboard';
}; // layer: The layer to check if it's a group
// RETURNS: bool - whether the provided layer is a group


var isSymbolInstance = function isSymbolInstance(layer) {
  return layer.type === 'SymbolInstance';
}; // layer: The layer to check if a fill can be applied to it
// RETURNS: bool - whether the provided layer can have a fill


var isFillableLayer = function isFillableLayer(layer) {
  return layer.type === 'Artboard' || layer.type === 'Shape' || layer.type === 'ShapePath' || layer.type === 'Image' || layer.type === 'Text';
}; // layer: the layer to validate of whether or not it's a color
// RETURNS: bool - whether it's a valid color fill


var isColorFill = function isColorFill(layer) {
  if (layer.type === 'Artboard') {
    return layer.background.color ? true : false;
  } else if (layer.type === 'Shape' || layer.type === 'ShapePath' || layer.type === 'Image') {
    return layer.style.fills ? true : false;
  } else if (layer.type === 'Text') {
    return true;
  } else {
    return false;
  }
}; // layers: The selected layers to get fills from
// RETURNS: all of the fills in the provided layers that are SOLID


var getFills = function getFills(layers) {
  var fills = [];
  layers.forEach(function (layer) {
    if (isFillableLayer(layer)) {
      if (layer.type === 'Artboard') {
        fills.push(layer.background.color);
      } else if (layer.type === 'Shape' || layer.type === 'ShapePath' || layer.type === 'Image') {
        layer.style.fills.forEach(function (fill) {
          if (fill.fillType === Style.FillType.Color) {
            fills.push(fill);
          }
        });
      } else if (layer.type === 'Text') {
        fills.push(layer.sketchObject.textColor());
      }
    }
  });
  return fills;
}; // selectedLayer: The layer the user has selected
// RETURNS: array - all child layers in the selected layer


var getChildLayers = function getChildLayers(selectedLayer, detachSymbolInstances) {
  var childLayers = [];

  var recurFunc = function recurFunc(layer) {
    if (isLayerGroup(layer) && !isSymbolInstance(layer)) {
      layer.layers.forEach(function (childLayer) {
        if (isLayerGroup(childLayer)) {
          recurFunc(childLayer);
        } else {
          childLayers.push(childLayer);
        }
      });
    } else if (isSymbolInstance(layer) && detachSymbolInstances) {
      var group = layer.detach({
        recursively: true
      });
      recurFunc(group);
    } else if (isSymbolInstance(layer)) {
      var group = layer.master;
      recurFunc(group);
    }
  };

  recurFunc(selectedLayer);
  return childLayers;
}; // selectedLayer: The layer the user has selected
// RETURNS: array - the first parent layer to have a fill


var getParentLayer = function getParentLayer(selectedLayer) {
  var parentLayers = [];

  var recurFunc = function recurFunc(layer) {
    if (layer.parent && isColorFill(layer.parent)) {
      parentLayers.push(layer.parent);
    } else if (layer.parent.type === 'Page') {
      return;
    } else {
      recurFunc(layer.parent);
    }
  };

  recurFunc(selectedLayer);
  return parentLayers;
}; // layer: The layer that has a fill to normalize
// RETURNS: object - contains rgba in a 0-255 format


var convertColorToCssFormat = function convertColorToCssFormat(layer) {
  if (layer.type === 'Artboard') {
    var color = Object(_stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_0__["ConvertHexToRgba"])(layer.background.color);
    return color;
  } else if (layer.type === 'Shape' || layer.type === 'ShapePath' || layer.type === 'Image') {
    var _color = Object(_stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_0__["ConvertHexToRgba"])(layer.style.fills[0].color);

    if (layer.style.opacity < 1 && _color.a < 1) {
      return {
        errorMessage: 'Either the fill or layer opacity needs to be at full opacity.'
      };
    }

    _color.a = layer.style.opacity < 1 ? layer.style.opacity : _color.a;
    return _color;
  } else if (layer.type === 'Text') {
    var _color2 = layer.sketchObject.textColor();

    return {
      r: _color2.red() * 255,
      g: _color2.green() * 255,
      b: _color2.blue() * 255,
      a: _color2.alpha()
    };
  }
};

var validateSelection = function validateSelection(selection) {
  var selectionObj = {};

  switch (selection.length) {
    case 0:
      {
        selectionObj.errorMessage = 'Please select at least one layer to run the contrast checker.';
        break;
      }

    case 1:
      {
        selectionObj = validateSingleLayerSelection(selection[0]);
        break;
      }

    case 2:
      {
        selectionObj = validateDoubleLayerSelection(selection);
        break;
      }

    default:
      {
        selectionObj.errorMessage = 'You can only run the contrast checker against two layers.';
      }
  }

  return selectionObj;
}; // selectedLayer: the layer the user has selected
// RETURNS: either two layers to contrast check or an error


var validateSingleLayerSelection = function validateSingleLayerSelection(selectedLayer) {
  var layers = [];
  var childLayers = getChildLayers(selectedLayer);
  layers = layers.concat(childLayers);

  if (childLayers.length < 2) {
    layers.push(selectedLayer);
    var parentLayers = getParentLayer(selectedLayer);
    layers = layers.concat(parentLayers);
  }

  var validatedLayerAmount = validateLayerAmount(layers);

  if (validatedLayerAmount !== 'valid') {
    return {
      errorMessage: validatedLayerAmount
    };
  }

  var fills = getFills(layers);
  var validatedFillAmount = validateFillAmount(fills);

  if (validatedFillAmount !== 'valid') {
    return {
      errorMessage: validatedFillAmount
    };
  }

  return {
    firstColor: layers[1],
    secondColor: layers[0]
  };
}; // selection: should just be two layers the user has selected
// RETURNS: either two layers to contrast check or an error


var validateDoubleLayerSelection = function validateDoubleLayerSelection(selection) {
  var layers = [];

  if (isLayerGroup(selection[0])) {
    layers = layers.concat(getChildLayers(selection[0]));
  } else {
    layers.push(selection[0]);
  }

  if (isLayerGroup(selection[1])) {
    layers = layers.concat(getChildLayers(selection[1]));
  } else {
    layers.push(selection[1]);
  }

  var validatedLayerAmount = validateLayerAmount(layers);

  if (validatedLayerAmount !== 'valid') {
    return {
      errorMessage: validatedLayerAmount
    };
  }

  var fills = getFills(layers);
  var validatedFillAmount = validateFillAmount(fills);

  if (validatedFillAmount !== 'valid') {
    return {
      errorMessage: validatedFillAmount
    };
  }

  return {
    firstColor: layers[1],
    secondColor: layers[0]
  };
}; // void: Checks the number of layers and errors out accordingly


var validateLayerAmount = function validateLayerAmount(layers) {
  if (layers.length === 1) {
    return 'Please select an additional layer to check against.';
  } else if (layers.length > 2) {
    return 'Too many layers to check against. Try directly selecting two layers.';
  }

  return 'valid';
}; // void: Checks the number of fills and errors out accordingly


var validateFillAmount = function validateFillAmount(fills) {
  if (fills.length < 2) {
    return 'You can only check against colors, not mixed fills, gradients or bitmaps.';
  } else if (fills.length > 2) {
    return "Make sure your layers don't have more than one fill applied.";
  }

  return 'valid';
}; // selection: user's current selection
// RETURNS: either a boolean for validity or an error object


var validateSelectionOpacity = function validateSelectionOpacity(normalizedBgColor, normalizedFgColor) {
  if (normalizedBgColor.a < 1 && normalizedFgColor.a < 1) {
    return {
      errorMessage: 'At least one layer needs to be at full opacity.'
    };
  }

  if (normalizedBgColor.a < 1) {
    return {
      errorMessage: 'Only the foreground (top) layer can be less than 100% opacity.'
    };
  }
}; // selection: user's current selection
// RETURNS: a reordered layer list


var reorderSelection = function reorderSelection(selection) {
  var bgLayer = selection.secondColor;
  var fgLayer = selection.firstColor;

  if (selection.firstColor.type === 'Text' || selection.secondColor.type === 'Text') {
    bgLayer = selection.secondColor.type === 'Text' ? selection.firstColor : selection.secondColor;
    fgLayer = selection.secondColor.type === 'Text' ? selection.secondColor : selection.firstColor;
  }

  return {
    bgLayer: bgLayer,
    fgLayer: fgLayer
  };
}; // selection: user's current selection
// RETURNS: object containing all of the necessary layer info


var getLayers = function getLayers(selection) {
  var validatedSelection = validateSelection(selection);

  if (validatedSelection.errorMessage) {
    return {
      errorMessage: validatedSelection.errorMessage
    };
  }

  var reorderedSelection = reorderSelection(validatedSelection);
  var originalBgColor = convertColorToCssFormat(reorderedSelection.bgLayer);

  if (originalBgColor.errorMessage) {
    return {
      errorMessage: originalBgColor.errorMessage
    };
  }

  var originalFgColor = convertColorToCssFormat(reorderedSelection.fgLayer);

  if (originalFgColor.errorMessage) {
    return {
      errorMessage: originalFgColor.errorMessage
    };
  }

  var normalizedBgColor = originalBgColor;
  var normalizedFgColor = originalFgColor;
  var opacityValidation = validateSelectionOpacity(originalBgColor, originalFgColor);

  if (opacityValidation === null || opacityValidation === void 0 ? void 0 : opacityValidation.errorMessage) {
    return opacityValidation;
  }

  if (originalBgColor.a < 1) {
    normalizedBgColor = Object(_stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_0__["MixColors"])(originalFgColor, originalBgColor);
  }

  if (originalFgColor.a < 1) {
    normalizedFgColor = Object(_stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_0__["MixColors"])(originalBgColor, originalFgColor);
  }

  var hasText = validatedSelection.firstColor.type === 'Text' || validatedSelection.secondColor.type === 'Text';
  return {
    backgroundLayer: reorderedSelection.bgLayer,
    originalBgColor: originalBgColor,
    normalizedBgColor: normalizedBgColor,
    foregroundLayer: reorderedSelection.fgLayer,
    originalFgColor: originalFgColor,
    normalizedFgColor: normalizedFgColor,
    hasText: hasText
  };
}; // color: the color to apply
// layer: the layer to apply the color to
// RETURNS: void


var applyColorToLayer = function applyColorToLayer(color, layer) {
  if (layer.type === 'Text') {
    var immutableColor = MSImmutableColor.colorWithSVGString_(color);
    var textColor = MSColor.alloc().initWithImmutableObject_(immutableColor);
    layer.sketchObject.setTextColor(textColor);
  } else if (layer.type === 'Artboard') {
    layer.background.enabled = true;
    layer.background.color = color;
  } else {
    layer.style.fills = [{
      color: color,
      fillType: Style.FillType.Color
    }];
  }
};



/***/ }),

/***/ "./src/sketch/utilities/index.js":
/*!***************************************!*\
  !*** ./src/sketch/utilities/index.js ***!
  \***************************************/
/*! exports provided: openURL, saveSetting, saveAllSettings, loadSetting, loadAllSettings, showToast, generateSimulatedArtboards, getArtboardNames, getSelectedArtboard, exportArtboard, getArtboardSize, getLayers, applyColorToLayer, SETTINGS_LICENSE, SETTINGS_STATUS, SETTINGS_EMAIL, SETTINGS_PLAN, SETTINGS_VERIFICATION, SETTINGS_TEAMUSER, SETTINGS_MIXPANELID, SETTINGS_CONTRASTFAILMESSAGESHOWN, SETTINGS_CONTRASTSUGGESTIONSTRIESLEFT, URL_PRICING, URL_SUPPORT, URL_SIGNUP, URL_MYACCOUNT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./src/sketch/utilities/common.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "openURL", function() { return _common__WEBPACK_IMPORTED_MODULE_0__["openURL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "saveSetting", function() { return _common__WEBPACK_IMPORTED_MODULE_0__["saveSetting"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "saveAllSettings", function() { return _common__WEBPACK_IMPORTED_MODULE_0__["saveAllSettings"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadSetting", function() { return _common__WEBPACK_IMPORTED_MODULE_0__["loadSetting"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadAllSettings", function() { return _common__WEBPACK_IMPORTED_MODULE_0__["loadAllSettings"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "showToast", function() { return _common__WEBPACK_IMPORTED_MODULE_0__["showToast"]; });

/* harmony import */ var _vision_simulator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vision-simulator */ "./src/sketch/utilities/vision-simulator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateSimulatedArtboards", function() { return _vision_simulator__WEBPACK_IMPORTED_MODULE_1__["generateSimulatedArtboards"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getArtboardNames", function() { return _vision_simulator__WEBPACK_IMPORTED_MODULE_1__["getArtboardNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSelectedArtboard", function() { return _vision_simulator__WEBPACK_IMPORTED_MODULE_1__["getSelectedArtboard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "exportArtboard", function() { return _vision_simulator__WEBPACK_IMPORTED_MODULE_1__["exportArtboard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getArtboardSize", function() { return _vision_simulator__WEBPACK_IMPORTED_MODULE_1__["getArtboardSize"]; });

/* harmony import */ var _contrast_check__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contrast-check */ "./src/sketch/utilities/contrast-check.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLayers", function() { return _contrast_check__WEBPACK_IMPORTED_MODULE_2__["getLayers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyColorToLayer", function() { return _contrast_check__WEBPACK_IMPORTED_MODULE_2__["applyColorToLayer"]; });

/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/sketch/utilities/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_LICENSE", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["SETTINGS_LICENSE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_STATUS", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["SETTINGS_STATUS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_EMAIL", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["SETTINGS_EMAIL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_PLAN", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["SETTINGS_PLAN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_VERIFICATION", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["SETTINGS_VERIFICATION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_TEAMUSER", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["SETTINGS_TEAMUSER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_MIXPANELID", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["SETTINGS_MIXPANELID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_CONTRASTFAILMESSAGESHOWN", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["SETTINGS_CONTRASTFAILMESSAGESHOWN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_CONTRASTSUGGESTIONSTRIESLEFT", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["SETTINGS_CONTRASTSUGGESTIONSTRIESLEFT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "URL_PRICING", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["URL_PRICING"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "URL_SUPPORT", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["URL_SUPPORT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "URL_SIGNUP", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["URL_SIGNUP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "URL_MYACCOUNT", function() { return _constants__WEBPACK_IMPORTED_MODULE_3__["URL_MYACCOUNT"]; });







/***/ }),

/***/ "./src/sketch/utilities/vision-simulator.js":
/*!**************************************************!*\
  !*** ./src/sketch/utilities/vision-simulator.js ***!
  \**************************************************/
/*! exports provided: generateSimulatedArtboards, getArtboardNames, getSelectedArtboard, exportArtboard, getArtboardSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateSimulatedArtboards", function() { return generateSimulatedArtboards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getArtboardNames", function() { return getArtboardNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelectedArtboard", function() { return getSelectedArtboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportArtboard", function() { return exportArtboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getArtboardSize", function() { return getArtboardSize; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @stark-contrast/color-utilities */ "./node_modules/@stark-contrast/color-utilities/lib/index.js");
/* harmony import */ var _stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _contrast_check__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contrast-check */ "./src/sketch/utilities/contrast-check.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common */ "./src/sketch/utilities/common.js");


var Style = __webpack_require__(/*! sketch/dom */ "sketch/dom").Style;




/*
Takes the color, converts it as necessary, and simulates the colorblindness
Returns an rgba string
*/

var getColorblindSimulatedColor = function getColorblindSimulatedColor(color, colorblindMatrix) {
  var convertedColor = Object(_stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_1__["ConvertHexToRgba"])(color);
  return Object(_stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_1__["ConvertRgbaToRgbaString"])(Object(_stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_1__["SimulateColorblindness"])(convertedColor, colorblindMatrix));
};
/*
Iterates over fills or borders and simulates colorblind
*/


var iterateStyles = function iterateStyles(styles, colorblindMatrix) {
  styles.forEach(function (fillOrBorder) {
    if (fillOrBorder.fillType === Style.FillType.Color) {
      var newRgba = getColorblindSimulatedColor(fillOrBorder.color, colorblindMatrix);
      fillOrBorder.color = newRgba;
    } else if (fillOrBorder.fillType === Style.FillType.Gradient) {
      fillOrBorder.gradient.stops.forEach(function (stop) {
        var newRgba = getColorblindSimulatedColor(stop.color, colorblindMatrix);
        stop.color = newRgba;
      });
    }
  });
};
/*
Generates artboards with the selected colorblind types
*/


var generateSimulatedArtboards = function generateSimulatedArtboards(artboardToGenerate, colorblindTypes) {
  var artboardName = artboardToGenerate.name;
  var lastPosition = artboardToGenerate.frame.x;
  var artboardsToGroup = [];
  colorblindTypes.forEach(function (type) {
    var colorblindMatrix = Object(_stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_1__["GetColorblindMatrixArray"])(type);
    var newArtboard = artboardToGenerate.duplicate();
    newArtboard.name = "".concat(artboardName, " - ").concat(type);
    var startPos = lastPosition + newArtboard.frame.width + 100;
    newArtboard.frame.x = startPos;
    lastPosition = startPos;

    if (newArtboard.background && newArtboard.background.color) {
      var newRgba = getColorblindSimulatedColor(newArtboard.background.color, colorblindMatrix);
      Object(_contrast_check__WEBPACK_IMPORTED_MODULE_2__["applyColorToLayer"])(newRgba, newArtboard);
    }

    artboardsToGroup.push(newArtboard);
    var childLayers = Object(_contrast_check__WEBPACK_IMPORTED_MODULE_2__["getChildLayers"])(newArtboard, true);
    childLayers.forEach(function (layer) {
      if (layer.type === 'Shape' || layer.type === 'ShapePath' || layer.type === 'Image' || layer.type === 'Text') {
        iterateStyles(layer.style.fills, colorblindMatrix);
        iterateStyles(layer.style.borders, colorblindMatrix);

        if (layer.type === 'Text') {
          var textColor = layer.sketchObject.textColor();
          var color = {
            r: textColor.red() * 255,
            g: textColor.green() * 255,
            b: textColor.blue() * 255,
            a: textColor.alpha()
          };

          var _newRgba = Object(_stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_1__["ConvertRgbaStringToRgba"])(getColorblindSimulatedColor(Object(_stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_1__["ConvertRgbaToHex"])(color), colorblindMatrix));

          Object(_contrast_check__WEBPACK_IMPORTED_MODULE_2__["applyColorToLayer"])(Object(_stark_contrast_color_utilities__WEBPACK_IMPORTED_MODULE_1__["ConvertRgbaToHex"])(_newRgba, true, true), layer);
        }
      }
    });
  });
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  doc.centerOnLayer(artboardsToGroup[0]);
  Object(_common__WEBPACK_IMPORTED_MODULE_3__["showToast"])("".concat(colorblindTypes.length, " Simulated artboard").concat(colorblindTypes.length > 1 ? 's' : '', " generated."));
};
/*
Returns an array of all the artboards on the current page
*/


var getArtboardNames = function getArtboardNames(document) {
  var page = document.selectedPage;
  var selectedArtboard = getSelectedArtboard(document);
  var artboardNames = [];
  var regex = /'/g;
  page.layers.forEach(function (layer) {
    (layer.type === 'Artboard' || layer.type === 'SymbolMaster') && artboardNames.push({
      id: layer.id,
      name: layer.name.replace(regex, '’'),
      isSelected: selectedArtboard == layer.id
    });
  });
  return artboardNames.reverse();
};
/*
Return the currently selected artboard
*/


var getSelectedArtboard = function getSelectedArtboard(document) {
  var selection = document.selectedLayers.layers;
  var selectedArtboard;
  selection.forEach(function (layer) {
    selectedArtboard = layer.sketchObject.parentArtboard();
  });

  if (selectedArtboard) {
    selectedArtboard = selectedArtboard.objectID();
  }

  return selectedArtboard;
};
/*
Export the selected artboard at 2x
*/


var exportArtboard = function exportArtboard(artboard) {
  var exportOptions = {
    scales: '2',
    formats: 'png',
    output: false
  };
  return sketch__WEBPACK_IMPORTED_MODULE_0___default.a.export(artboard, exportOptions).toString('base64');
};
/*
Return the artboard's height and width
*/


var getArtboardSize = function getArtboardSize(artboard) {
  return {
    width: artboard.frame.width * 2,
    height: artboard.frame.height * 2
  };
};



/***/ }),

/***/ "./src/sketch/vision-simulator.js":
/*!****************************************!*\
  !*** ./src/sketch/vision-simulator.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch-module-web-view */ "./node_modules/sketch-module-web-view/lib/index.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities */ "./src/sketch/utilities/index.js");



/* harmony default export */ __webpack_exports__["default"] = (function () {
  var settingsObject = _utilities__WEBPACK_IMPORTED_MODULE_2__["loadAllSettings"]();
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var artboardNames = _utilities__WEBPACK_IMPORTED_MODULE_2__["getArtboardNames"](doc);
  var selectedArtboard = _utilities__WEBPACK_IMPORTED_MODULE_2__["getSelectedArtboard"](doc);

  if (artboardNames.length <= 0) {
    _utilities__WEBPACK_IMPORTED_MODULE_2__["showToast"]('You need at least one artboard to run the vision simulator.');
    return;
  }

  if (!selectedArtboard && doc.selectedLayers.layers.length > 0) {
    _utilities__WEBPACK_IMPORTED_MODULE_2__["showToast"]('The vision simulator can only be run on artboards.');
    return;
  }

  var options = {
    identifier: 'stark.simulation',
    frame: false,
    height: 568,
    width: 610,
    resizable: false,
    alwaysOnTop: true,
    title: 'simulation',
    backgroundColor: '#FFF',
    show: false
  };
  var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_1___default.a(options);
  var webContents = browserWindow.webContents;
  var visionSimulatorObject = {
    artboardNames: artboardNames,
    subscription: settingsObject
  };
  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    webContents.executeJavaScript("prepareFirstLoad('Simulation', '".concat(JSON.stringify(visionSimulatorObject), "')")).catch(console.error);
  });
  webContents.on('simulationDialogMounted', function () {
    var artboardToSim = selectedArtboard ? selectedArtboard : artboardNames[0].id;
    var layer = doc.getLayerWithID(artboardToSim);
    var exportedArtboard = _utilities__WEBPACK_IMPORTED_MODULE_2__["exportArtboard"](layer);
    visionSimulatorObject.sizeData = _utilities__WEBPACK_IMPORTED_MODULE_2__["getArtboardSize"](layer);
    webContents.executeJavaScript("prepareFirstLoad('Simulation', '".concat(JSON.stringify(visionSimulatorObject), "', '").concat(exportedArtboard, "')")).catch(console.error);
  });
  webContents.on('artboardChanged', function (artboardChangedObject) {
    var artboardObject = JSON.parse(artboardChangedObject);
    var layer = doc.getLayerWithID(artboardObject.artboardToSim);
    var exportedArtboard = _utilities__WEBPACK_IMPORTED_MODULE_2__["exportArtboard"](layer);
    visionSimulatorObject.sizeData = _utilities__WEBPACK_IMPORTED_MODULE_2__["getArtboardSize"](layer);
    webContents.executeJavaScript("prepareFirstLoad('Simulation', '".concat(JSON.stringify(visionSimulatorObject), "', '").concat(exportedArtboard, "')")).catch(console.error);
  });
  webContents.on('tabChange', function (tabChangedObject) {
    var tabObject = JSON.parse(tabChangedObject);

    if (tabObject.tabName === 'simulation') {
      browserWindow.setSize(610, 568, false);
    } else {
      browserWindow.setSize(400, 568, false);
    }
  });
  webContents.on('purchaseButtonClicked', function () {
    _utilities__WEBPACK_IMPORTED_MODULE_2__["openURL"](_utilities__WEBPACK_IMPORTED_MODULE_2__["URL_PRICING"]);
  });
  webContents.on('generate', function (generateClickObject) {
    var generateObject = JSON.parse(generateClickObject);
    var artboard = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument().getLayerWithID(generateObject.artboardToGenerate);
    _utilities__WEBPACK_IMPORTED_MODULE_2__["generateSimulatedArtboards"](artboard, generateObject.selectedColorblindTypes);
  });
  webContents.on('cancelButtonClicked', function () {
    browserWindow.close();
  });
  browserWindow.loadURL(__webpack_require__(/*! ../web/ui.html */ "./src/web/ui.html"));
});

/***/ }),

/***/ "./src/web/ui.html":
/*!*************************!*\
  !*** ./src/web/ui.html ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + context.plugin.urlForResourceNamed("_webpack_resources/382e82375e9410380a7dc4f1a8818864.html").path();

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=vision-simulator.js.map