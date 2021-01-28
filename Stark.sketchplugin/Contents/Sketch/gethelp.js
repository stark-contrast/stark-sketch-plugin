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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/sketch/gethelp.js");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./src/sketch/gethelp.js":
/*!*******************************!*\
  !*** ./src/sketch/gethelp.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/sketch/utilities/index.js");

/* harmony default export */ __webpack_exports__["default"] = (function () {
  _utilities__WEBPACK_IMPORTED_MODULE_0__["openURL"](_utilities__WEBPACK_IMPORTED_MODULE_0__["URL_SUPPORT"]);
});

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

//# sourceMappingURL=gethelp.js.map