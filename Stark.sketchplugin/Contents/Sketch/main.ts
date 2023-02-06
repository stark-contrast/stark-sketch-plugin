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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),
/* 1 */
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
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(34), exports);
__exportStar(__webpack_require__(15), exports);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var fiberAvailable = __webpack_require__(13)

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
/* 4 */
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
/* 5 */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.applyColorToLayer = exports.getSelectionColors = exports.getColorGroups = exports.getChildLayers = exports.getLayers = exports.handleColorFgChange = exports.handleColorBgChange = exports.handleContrastUpdateButtonClicked = exports.handleExpandCollapseClick = exports.handleContrastSelectionChange = exports.handleContrastLoaded = void 0;
var color_utilities_1 = __webpack_require__(7);
var utilities_1 = __webpack_require__(1);
Object.defineProperty(exports, "getChildLayers", { enumerable: true, get: function () { return utilities_1.getChildLayers; } });
var Sketch = __webpack_require__(2);
var SketchDom = __webpack_require__(0);
var Style = __webpack_require__(0).Style;
var expanded = true;
var backgroundLayer;
var foregroundLayer;
var showErrorState = true;
var backgroundColor = { r: 255, g: 255, b: 255, a: 1 };
var foregroundColor = { r: 255, g: 255, b: 255, a: 1 };
var colorGroups = [];
exports.handleContrastLoaded = function () {
    var browserWindow = utilities_1.getBrowserWindow();
    var doc = Sketch.getSelectedDocument();
    var selection = doc.selectedLayers.layers;
    var colorGroups = getColorGroups();
    colorGroups = colorGroups;
    if (selection.length === 0) {
        showErrorState = true;
    }
    else {
        var selectionContent = getLayers();
        backgroundColor = selectionContent.originalBgColor;
        foregroundColor = selectionContent.originalFgColor;
        showErrorState = false;
        backgroundLayer = selectionContent.backgroundLayer;
        foregroundLayer = selectionContent.foregroundLayer;
    }
    var contrastMessage = {
        colorGroups: colorGroups,
        showErrorState: showErrorState,
        backgroundColor: backgroundColor,
        foregroundColor: foregroundColor,
    };
    browserWindow.webContents
        .executeJavaScript("contrastLoaded('" + JSON.stringify(contrastMessage) + "')")
        .catch(console.error);
};
exports.handleContrastSelectionChange = function () {
    var browserWindow = utilities_1.getBrowserWindow();
    var doc = Sketch.getSelectedDocument();
    var selection = doc.selectedLayers.layers;
    var colorGroups = getColorGroups();
    colorGroups = colorGroups;
    if (selection.length === 0) {
        showErrorState = true;
        backgroundColor = { r: 255, g: 255, b: 255, a: 1 };
        foregroundColor = { r: 255, g: 255, b: 255, a: 1 };
    }
    else {
        var selectionContent = getLayers();
        backgroundColor = selectionContent.originalBgColor;
        foregroundColor = selectionContent.originalFgColor;
        showErrorState = false;
        backgroundLayer = selectionContent.backgroundLayer;
        foregroundLayer = selectionContent.foregroundLayer;
    }
    var contrastMessage = {
        colorGroups: colorGroups,
        showErrorState: showErrorState,
        backgroundColor: backgroundColor,
        foregroundColor: foregroundColor,
    };
    browserWindow.webContents
        .executeJavaScript("contrastLoaded('" + JSON.stringify(contrastMessage) + "')")
        .catch(console.error);
};
exports.handleExpandCollapseClick = function () {
    if (expanded) {
        utilities_1.setWindowBounds(360, 471);
        expanded = false;
    }
    else {
        utilities_1.setWindowBounds(360, 651);
        expanded = true;
    }
};
exports.handleContrastUpdateButtonClicked = function (updateObject) {
    var browserWindow = utilities_1.getBrowserWindow();
    try {
        utilities_1.debug(updateObject);
        var updateColorsObject = JSON.parse(updateObject);
        utilities_1.debug(updateColorsObject);
        applyColorToLayer(color_utilities_1.ConvertRgbaToHex(updateColorsObject.background, true, true), backgroundLayer);
        applyColorToLayer(color_utilities_1.ConvertRgbaToHex(updateColorsObject.foreground, true, true), foregroundLayer);
        backgroundColor = updateColorsObject.background;
        foregroundColor = updateColorsObject.foreground;
        var selectionColors = getSelectionColors();
        if (selectionColors.length > 0 && colorGroups.length > 0) {
            if (colorGroups[0].name === 'Selection Colors') {
                colorGroups[0].subgroups[0].colors = selectionColors;
            }
            else {
                colorGroups.unshift({
                    name: 'Selection Colors',
                    subgroups: [{ name: '', colors: selectionColors }],
                });
            }
        }
        else {
            if (colorGroups[0].name === 'Selection Colors') {
                colorGroups.shift();
            }
        }
        var contrastMessage = {
            colorGroups: colorGroups,
            backgroundColor: backgroundColor,
            foregroundColor: foregroundColor,
        };
        browserWindow.webContents
            .executeJavaScript("contrastLoaded('" + JSON.stringify(contrastMessage) + "')")
            .catch(console.error);
    }
    catch (error) {
        utilities_1.debug(error);
    }
};
exports.handleColorBgChange = function (updateObject) {
    var browserWindow = utilities_1.getBrowserWindow();
    var bgChangeObject = JSON.parse(updateObject);
    var bg = bgChangeObject.bgColor;
    backgroundColor = bg;
    showErrorState = false;
    var contrastMessage = {
        showErrorState: false,
        backgroundColor: bg,
    };
    browserWindow.webContents
        .executeJavaScript("contrastLoaded('" + JSON.stringify(contrastMessage) + "')")
        .catch(console.error);
};
exports.handleColorFgChange = function (updateObject) {
    var browserWindow = utilities_1.getBrowserWindow();
    var fgChangeObject = JSON.parse(updateObject);
    var fg = fgChangeObject.fgColor;
    foregroundColor = fg;
    showErrorState = false;
    var contrastMessage = {
        showErrorState: false,
        foregroundColor: fg,
    };
    browserWindow.webContents
        .executeJavaScript("contrastLoaded('" + JSON.stringify(contrastMessage) + "')")
        .catch(console.error);
};
var isFillableLayer = function (layer) {
    return (layer.type === 'Artboard' ||
        layer.type === 'Shape' ||
        layer.type === 'ShapePath' ||
        layer.type === 'Image' ||
        layer.type === 'Text');
};
var hasSolidFills = function (layer) {
    var hasSolidFills = false;
    if (isFillableLayer(layer)) {
        if (layer.type === 'Artboard' || layer.style.fills) {
            hasSolidFills = true;
        }
    }
    return hasSolidFills;
};
var getTextLayersWithFills = function (layer) {
    var textLayerSearch = SketchDom.find('Text', layer);
    var textLayersWithFills = textLayerSearch.filter(function (textLayer) { return getFills([textLayer]).length > 0; });
    return textLayersWithFills;
};
var getNonTextLayersWithFills = function (layer) {
    var nonTextLayers = [];
    var artboardSearch = SketchDom.find('Artboard', layer);
    var shapeSearch = SketchDom.find('Shape', layer);
    var shapePathSearch = SketchDom.find('ShapePath', layer);
    var imageSearch = SketchDom.find('Image', layer);
    nonTextLayers = nonTextLayers.concat(artboardSearch, shapeSearch, shapePathSearch, imageSearch);
    var nonTextLayersWithFills = nonTextLayers.filter(function (nonTextLayer) { return getFills([nonTextLayer]).length > 0; });
    return nonTextLayersWithFills;
};
var getFills = function (layers) {
    var fills = [];
    layers.forEach(function (layer) {
        if (isFillableLayer(layer)) {
            if (layer.type === 'Artboard') {
                if (layer.background) {
                    fills.push(color_utilities_1.ConvertHexToRgba(layer.background.color));
                }
                else {
                    fills.push({ r: 255, g: 255, b: 255, a: 1 });
                }
            }
            else if (layer.type === 'Shape' ||
                layer.type === 'ShapePath' ||
                layer.type === 'Image') {
                layer.style.fills.forEach(function (fill) {
                    if (fill.fillType === Style.FillType.Color) {
                        fills.push(color_utilities_1.ConvertHexToRgba(fill.color));
                    }
                });
            }
            else if (layer.type === 'Text') {
                if (layer.style.fills.length > 0) {
                    layer.style.fills.forEach(function (fill) {
                        if (fill.fillType === Style.FillType.Color) {
                            fills.push(color_utilities_1.ConvertHexToRgba(fill.color));
                        }
                    });
                }
                else {
                    var textColor = layer.sketchObject.textColor();
                    fills.push({
                        r: textColor.red() * 255,
                        g: textColor.green() * 255,
                        b: textColor.blue() * 255,
                        a: textColor.alpha(),
                    });
                }
            }
        }
    });
    return fills;
};
var getParentLayer = function (selectedLayer) {
    var parentLayer;
    var recurFunc = function (layer) {
        if (layer.parent && hasSolidFills(layer.parent)) {
            parentLayer = layer.parent;
        }
        else if (layer.parent.type === 'Page') {
            return;
        }
        else {
            recurFunc(layer.parent);
        }
    };
    recurFunc(selectedLayer);
    return parentLayer;
};
var getSingleLayerSelectionComparison = function (layer) {
    var doc = Sketch.getSelectedDocument();
    var currentPage = doc.selectedPage;
    var returnObj = {
        bgLayer: currentPage,
        fgLayer: currentPage,
    };
    try {
        if (utilities_1.isLayerGroup(layer)) {
            var textLayers = getTextLayersWithFills(layer);
            var nonTextLayers = getNonTextLayersWithFills(layer);
            if (textLayers.length > 0) {
                returnObj.fgLayer = textLayers[0];
                if (nonTextLayers.length === 0) {
                    returnObj.bgLayer = getParentLayer(textLayers[0]);
                }
                else {
                    returnObj.bgLayer = nonTextLayers[0];
                }
            }
            else if (nonTextLayers.length > 0) {
                returnObj.fgLayer = nonTextLayers[0];
                if (nonTextLayers.length > 1) {
                    returnObj.bgLayer = nonTextLayers[1];
                }
            }
        }
        else {
            returnObj.bgLayer = getParentLayer(layer);
            if (hasSolidFills(layer)) {
                returnObj.fgLayer = layer;
            }
        }
        return returnObj;
    }
    catch (error) {
        utilities_1.debug(error);
        return returnObj;
    }
};
var getDoubleLayerSelectionComparison = function (layers) {
    var doc = Sketch.getSelectedDocument();
    var currentPage = doc.selectedPage;
    var returnObj = {
        bgLayer: currentPage,
        fgLayer: currentPage,
    };
    if (layers[0].type === 'Text') {
        returnObj.fgLayer = layers[0];
        if (hasSolidFills(layers[1])) {
            returnObj.bgLayer = layers[1];
        }
        else if (utilities_1.isLayerGroup(layers[1])) {
            var nonTextLayers = getNonTextLayersWithFills(layers[1]);
            if (nonTextLayers.length > 0) {
                returnObj.bgLayer = nonTextLayers[0];
            }
        }
    }
    else if (layers[1].type === 'Text') {
        returnObj.fgLayer = layers[1];
        if (hasSolidFills(layers[0])) {
            returnObj.bgLayer = layers[0];
        }
        else if (utilities_1.isLayerGroup(layers[0])) {
            var nonTextLayers = getNonTextLayersWithFills(layers[0]);
            if (nonTextLayers.length > 0) {
                returnObj.bgLayer = nonTextLayers[0];
            }
        }
    }
    else if (hasSolidFills(layers[0])) {
        returnObj.fgLayer = layers[0];
        if (hasSolidFills(layers[1])) {
            returnObj.bgLayer = layers[1];
        }
        else if (utilities_1.isLayerGroup(layers[1])) {
            var nonTextLayers = getNonTextLayersWithFills(layers[1]);
            if (nonTextLayers.length > 0) {
                returnObj.bgLayer = nonTextLayers[0];
            }
        }
    }
    else if (hasSolidFills(layers[1])) {
        returnObj.bgLayer = layers[1];
        if (hasSolidFills(layers[0])) {
            returnObj.bgLayer = layers[0];
        }
        else if (utilities_1.isLayerGroup(layers[0])) {
            var nonTextLayers = getNonTextLayersWithFills(layers[0]);
            if (nonTextLayers.length > 0) {
                returnObj.bgLayer = nonTextLayers[0];
            }
        }
    }
    else {
        if (utilities_1.isLayerGroup(layers[0])) {
            var textLayers = getTextLayersWithFills(layers[0]);
            var nonTextLayers = getNonTextLayersWithFills(layers[0]);
            var otherLayerNonTextLayers = getNonTextLayersWithFills(layers[1]);
            if (textLayers.length > 0) {
                returnObj.fgLayer = textLayers[0];
                if (otherLayerNonTextLayers.length > 0) {
                    returnObj.bgLayer = otherLayerNonTextLayers[0];
                }
                else if (nonTextLayers.length > 0) {
                    returnObj.bgLayer = nonTextLayers[0];
                }
            }
            else {
                if (otherLayerNonTextLayers.length > 0) {
                    returnObj.fgLayer = otherLayerNonTextLayers[0];
                }
                else if (nonTextLayers.length > 0) {
                    returnObj.bgLayer = nonTextLayers[0];
                }
            }
        }
        else if (utilities_1.isLayerGroup(layers[1])) {
            var textLayers = getTextLayersWithFills(layers[1]);
            var nonTextLayers = getNonTextLayersWithFills(layers[1]);
            var otherLayerNonTextLayers = getNonTextLayersWithFills(layers[0]);
            if (textLayers.length > 0) {
                returnObj.fgLayer = textLayers[0];
                if (otherLayerNonTextLayers.length > 0) {
                    returnObj.bgLayer = otherLayerNonTextLayers[0];
                }
                else if (nonTextLayers.length > 0) {
                    returnObj.bgLayer = nonTextLayers[0];
                }
            }
            else {
                if (otherLayerNonTextLayers.length > 0) {
                    returnObj.fgLayer = otherLayerNonTextLayers[0];
                }
                else if (nonTextLayers.length > 0) {
                    returnObj.bgLayer = nonTextLayers[0];
                }
            }
        }
    }
    return returnObj;
};
var getMultiLayerSelectionComparison = function (layers) {
    var doc = Sketch.getSelectedDocument();
    var currentPage = doc.selectedPage;
    var returnObj = {
        bgLayer: currentPage,
        fgLayer: currentPage,
    };
    var textLayers = [];
    layers.every(function (layer) {
        if (textLayers.length > 0) {
            return false;
        }
        if (layer.type === 'Text' && hasSolidFills(layer)) {
            textLayers.push(layer);
        }
        else if (utilities_1.isLayerGroup(layer)) {
            var childLayers = utilities_1.getChildLayers(layer, false);
            if (childLayers.length > 0) {
                childLayers.forEach(function (childLayer) {
                    if (childLayer.type === 'Text' && hasSolidFills(childLayer)) {
                        textLayers.push(childLayer);
                    }
                });
            }
        }
        return true;
    });
    if (textLayers.length > 0) {
        returnObj.fgLayer = textLayers[0];
        var layersWithFills_1 = [];
        layers.every(function (layer) {
            if (layersWithFills_1.length > 0) {
                return false;
            }
            if (layer.type !== 'Text' && hasSolidFills(layer)) {
                layersWithFills_1.push(layer);
            }
            else if (utilities_1.isLayerGroup(layer)) {
                var childLayers = utilities_1.getChildLayers(layer, false);
                if (childLayers.length > 0) {
                    childLayers.forEach(function (childLayer) {
                        if (layer.type !== 'Text' && hasSolidFills(childLayer)) {
                            layersWithFills_1.push(childLayer);
                        }
                    });
                }
            }
            return true;
        });
        if (layersWithFills_1.length > 0) {
            returnObj.bgLayer = layersWithFills_1[0];
        }
    }
    else {
        var layersWithFills_2 = [];
        layers.forEach(function (layer) {
            if (layer.type !== 'Text' && hasSolidFills(layer)) {
                layersWithFills_2.push(layer);
            }
            else if (utilities_1.isLayerGroup(layer)) {
                var childLayers = utilities_1.getChildLayers(layer, false);
                if (childLayers.length > 0) {
                    childLayers.forEach(function (childLayer) {
                        if (layer.type !== 'Text' && hasSolidFills(childLayer)) {
                            layersWithFills_2.push(childLayer);
                        }
                    });
                }
            }
            return true;
        });
        if (layersWithFills_2.length === 1) {
            returnObj.fgLayer = layersWithFills_2[0];
        }
        else if (layersWithFills_2.length > 1) {
            returnObj.fgLayer = layersWithFills_2[0];
            returnObj.bgLayer = layersWithFills_2[1];
        }
    }
    return returnObj;
};
var getLayersToCompare = function () {
    var doc = Sketch.getSelectedDocument();
    var currentPage = doc.selectedPage;
    var selection = doc.selectedLayers.layers;
    var colorsToCompare = {
        bgLayer: currentPage,
        fgLayer: currentPage,
    };
    try {
        if (selection.length === 1) {
            colorsToCompare = getSingleLayerSelectionComparison(selection[0]);
        }
        else if (selection.length === 2) {
            colorsToCompare = getDoubleLayerSelectionComparison(selection);
        }
        else {
            colorsToCompare = getMultiLayerSelectionComparison(selection);
        }
        return colorsToCompare;
    }
    catch (error) {
        utilities_1.debug(error);
        return colorsToCompare;
    }
};
var getLayers = function () {
    try {
        var colorsToCompare = getLayersToCompare();
        var bgFills = getFills([colorsToCompare.bgLayer]);
        var fgFills = getFills([colorsToCompare.fgLayer]);
        var originalBgColor = bgFills[0];
        var normalizedBgColor = originalBgColor;
        var originalFgColor = fgFills[0];
        var normalizedFgColor = originalFgColor;
        if (originalBgColor.a < 1) {
            normalizedBgColor = color_utilities_1.MixColors(originalFgColor, originalBgColor);
        }
        if (originalFgColor.a < 1) {
            normalizedFgColor = color_utilities_1.MixColors(originalBgColor, originalFgColor);
        }
        return {
            backgroundLayer: colorsToCompare.bgLayer,
            originalBgColor: originalBgColor,
            normalizedBgColor: normalizedBgColor,
            foregroundLayer: colorsToCompare.fgLayer,
            originalFgColor: originalFgColor,
            normalizedFgColor: normalizedFgColor,
        };
    }
    catch (error) {
        utilities_1.debug(error);
    }
};
exports.getLayers = getLayers;
var getColorName = function (color) {
    return "#" + color_utilities_1.ConvertRgbaToHex(color).toUpperCase() + " / rgba(" + Math.floor(color.r) + ", " + Math.floor(color.g) + ", " + Math.floor(color.b) + ", " + Math.floor(color.a) + ")";
};
var getSelectionColors = function () {
    var colors = [];
    var fillableLayers = [];
    var doc = Sketch.getSelectedDocument();
    var selection = doc.selectedLayers.layers;
    selection.forEach(function (layer) {
        if (utilities_1.isLayerGroup(layer)) {
            var childLayers = utilities_1.getChildLayers(layer, true);
            fillableLayers = fillableLayers.concat(childLayers);
        }
        else {
            fillableLayers.push(layer);
        }
    });
    var currentFills = getFills(fillableLayers);
    var ids = currentFills.map(function (o) { return color_utilities_1.ConvertRgbaToRgbaString(o); });
    var filtered = currentFills.filter(function (color, index) { return !ids.includes(color_utilities_1.ConvertRgbaToRgbaString(color), index + 1); });
    filtered.forEach(function (fill) {
        colors.push({
            name: getColorName(fill),
            color: fill,
        });
    });
    return colors;
};
exports.getSelectionColors = getSelectionColors;
var getDocumentColorAssets = function () {
    var colors = [];
    var doc = Sketch.getSelectedDocument();
    var documentAssetColors = doc.colors;
    if (documentAssetColors && documentAssetColors.length > 0) {
        documentAssetColors.forEach(function (dac) {
            var _a;
            var colorObj = {
                name: (_a = dac === null || dac === void 0 ? void 0 : dac.name) === null || _a === void 0 ? void 0 : _a.replace("'", ''),
                color: color_utilities_1.ConvertHexToRgba(dac.color),
            };
            colors.push(colorObj);
        });
    }
    return colors;
};
var getDocumentSwatches = function () {
    var colors = [];
    var doc = Sketch.getSelectedDocument();
    var documentSwatches = doc.swatches;
    if (documentSwatches && documentSwatches.length > 0) {
        documentSwatches.forEach(function (ds) {
            var _a;
            var colorObj = {
                name: (_a = ds === null || ds === void 0 ? void 0 : ds.name) === null || _a === void 0 ? void 0 : _a.replace("'", ''),
                color: color_utilities_1.ConvertHexToRgba(ds.color),
            };
            colors.push(colorObj);
        });
    }
    return colors;
};
var getDocumentStyles = function () {
    var colors = [];
    var doc = Sketch.getSelectedDocument();
    var documentStyles = doc.sharedLayerStyles;
    if (documentStyles && documentStyles.length > 0) {
        documentStyles.forEach(function (ds) {
            var _a, _b, _c, _d;
            if (ds.style.fills.length > 0 &&
                ds.style.fills[0].fillType === Style.FillType.Color) {
                var colorObj = {
                    name: (_b = (_a = ds === null || ds === void 0 ? void 0 : ds.style) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.replace("'", ''),
                    color: color_utilities_1.ConvertHexToRgba(ds.style.fills[0].color),
                };
                colors.push(colorObj);
            }
            else if (ds.textColor) {
                var colorObj = {
                    name: (_d = (_c = ds === null || ds === void 0 ? void 0 : ds.style) === null || _c === void 0 ? void 0 : _c.name) === null || _d === void 0 ? void 0 : _d.replace("'", ''),
                    color: color_utilities_1.ConvertHexToRgba(ds.textColor),
                };
                colors.push(colorObj);
            }
        });
    }
    return colors;
};
var getGlobalColorAssets = function () {
    var colors = [];
    var globalAssetColors = Sketch.globalAssets.colors;
    if (globalAssetColors && globalAssetColors.length > 0) {
        globalAssetColors.forEach(function (gac) {
            var _a;
            var colorObj = {
                name: (_a = gac === null || gac === void 0 ? void 0 : gac.name) === null || _a === void 0 ? void 0 : _a.replace("'", ''),
                color: color_utilities_1.ConvertHexToRgba(gac.color),
            };
            colors.push(colorObj);
        });
    }
    return colors;
};
var getGlobalSwatches = function () {
    var colors = [];
    var globalSwatches = Sketch.globalAssets.swatches;
    if (globalSwatches && globalSwatches.length > 0) {
        globalSwatches.forEach(function (gs) {
            var _a;
            var colorObj = {
                name: (_a = gs === null || gs === void 0 ? void 0 : gs.name) === null || _a === void 0 ? void 0 : _a.replace("'", ''),
                color: color_utilities_1.ConvertHexToRgba(gs.color),
            };
            colors.push(colorObj);
        });
    }
    return colors;
};
var getPageColors = function () {
    var colors = [];
    var doc = Sketch.getSelectedDocument();
    var currentPage = doc.selectedPage;
    var pageLayers = utilities_1.getChildLayers(currentPage, false);
    if (pageLayers && pageLayers.length > 0) {
        var fillsFromLayers = getFills(pageLayers);
        if (fillsFromLayers && fillsFromLayers.length > 0) {
            var ids_1 = fillsFromLayers.map(function (o) { return color_utilities_1.ConvertRgbaToRgbaString(o); });
            var filtered = fillsFromLayers.filter(function (g, index) { return !ids_1.includes(color_utilities_1.ConvertRgbaToRgbaString(g), index + 1); });
            filtered.forEach(function (fill) {
                var colorObj = {
                    name: getColorName(fill),
                    color: fill,
                };
                colors.push(colorObj);
            });
        }
    }
    return colors;
};
var getColorGroups = function () {
    var colorGroups = [];
    var selectionColors = getSelectionColors();
    if (selectionColors.length > 0) {
        colorGroups.push({
            name: 'Selection Colors',
            subgroups: [{ name: '', colors: selectionColors }],
        });
    }
    var documentColorAssets = getDocumentColorAssets();
    if (documentColorAssets.length > 0) {
        colorGroups.push({
            name: 'Document Color Assets',
            subgroups: [{ name: '', colors: documentColorAssets }],
        });
    }
    var documentSwatches = getDocumentSwatches();
    if (documentSwatches.length > 0) {
        colorGroups.push({
            name: 'Document Swatches',
            subgroups: [{ name: '', colors: documentSwatches }],
        });
    }
    var documentStyles = getDocumentStyles();
    if (documentStyles.length > 0) {
        colorGroups.push({
            name: 'Document Styles',
            subgroups: [{ name: '', colors: documentStyles }],
        });
    }
    var globalAssetColors = getGlobalColorAssets();
    if (globalAssetColors.length > 0) {
        colorGroups.push({
            name: 'Global Color Assets',
            subgroups: [{ name: '', colors: globalAssetColors }],
        });
    }
    var globalSwatches = getGlobalSwatches();
    if (globalSwatches.length > 0) {
        colorGroups.push({
            name: 'Global Swatches',
            subgroups: [{ name: '', colors: globalSwatches }],
        });
    }
    var pageColors = getPageColors();
    if (pageColors.length > 0) {
        colorGroups.push({
            name: 'Page Colors',
            subgroups: [{ name: '', colors: pageColors }],
        });
    }
    return colorGroups;
};
exports.getColorGroups = getColorGroups;
var applyColorToLayer = function (color, layer) {
    if (layer.type === 'Text') {
        var immutableColor = MSImmutableColor.colorWithSVGString_(color);
        var textColor = MSColor.alloc().initWithImmutableObject_(immutableColor);
        layer.sketchObject.setTextColor(textColor);
    }
    else if (layer.type === 'Artboard') {
        layer.background.enabled = true;
        layer.background.color = color;
    }
    else {
        layer.style.fills = [
            {
                color: color,
                fillType: Style.FillType.Color,
            },
        ];
    }
};
exports.applyColorToLayer = applyColorToLayer;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(37), exports);
__exportStar(__webpack_require__(16), exports);
__exportStar(__webpack_require__(19), exports);
__exportStar(__webpack_require__(38), exports);
__exportStar(__webpack_require__(39), exports);
__exportStar(__webpack_require__(40), exports);
__exportStar(__webpack_require__(17), exports);
__exportStar(__webpack_require__(8), exports);
__exportStar(__webpack_require__(41), exports);
__exportStar(__webpack_require__(18), exports);
__exportStar(__webpack_require__(42), exports);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertRgbaToHex = exports.ConvertRgbaToBaseHsla = exports.ConvertRgbaToHsla = exports.ConvertRgbaToBaseRgba = exports.ConvertBaseRgbaToRgba = exports.ConvertRgbaStringToBaseRgba = exports.ConvertRgbaStringToRgba = exports.ConvertBaseRgbaToRgbaString = exports.ConvertRgbaToRgbaString = void 0;
var __constants_1 = __webpack_require__(18);
/**
 * Converts an rgba object to an rgba string.
 *
 *
 * @param rgba - An object containing the rgba values in 0-255 format
 * @returns `rgba(r, g, b, a) in 0-255 format`
 *
 */
var ConvertRgbaToRgbaString = function (rgba) {
    return "rgba(".concat(rgba.r, ", ").concat(rgba.g, ", ").concat(rgba.b, ", ").concat(rgba.a ? rgba.a : 1, ")");
};
exports.ConvertRgbaToRgbaString = ConvertRgbaToRgbaString;
/**
 * Converts a base rgba object to an rgba string.
 *
 *
 * @param rgba - An object containing the rgba values in 0-1 format
 * @returns `rgba(r, g, b, a) in 0-255 format`
 *
 */
var ConvertBaseRgbaToRgbaString = function (rgba) {
    return "rgba(".concat(Math.round(rgba.r * 255), ", ").concat(Math.round(rgba.g * 255), ", ").concat(Math.round(rgba.b * 255), ", ").concat(rgba.a ? rgba.a : 1, ")");
};
exports.ConvertBaseRgbaToRgbaString = ConvertBaseRgbaToRgbaString;
/**
 * Converts an rgba string to an rgba object.
 *
 *
 * @param rgba - An string in rgba(255, 255, 255, 1) or rgb(255, 255, 255) format
 * @returns `{ r: 255, g: 255, b: 255, a: 1}`
 *
 */
var ConvertRgbaStringToRgba = function (rgba) {
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
exports.ConvertRgbaStringToRgba = ConvertRgbaStringToRgba;
/**
 * Converts an rgba string to an rgba object.
 *
 *
 * @param rgba - An string in rgba(255, 255, 255, 1) or rgb(255, 255, 255) format
 * @returns `{ r: 0, g: 0.12, b: 0.44, a: 1}`
 *
 */
var ConvertRgbaStringToBaseRgba = function (rgba) {
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
exports.ConvertRgbaStringToBaseRgba = ConvertRgbaStringToBaseRgba;
/**
 * Converts a base rgba object to an rgba object.
 *
 *
 * @param rgba - A base rgba in 0-1 format
 * @returns `{ r: 255, g: 255, b: 255, a: 1}`
 *
 */
var ConvertBaseRgbaToRgba = function (rgba, convertAlpha) {
    var alpha = rgba.a ? rgba.a : 1;
    return {
        r: rgba.r * 255,
        g: rgba.g * 255,
        b: rgba.b * 255,
        a: convertAlpha ? alpha * 255 : alpha,
    };
};
exports.ConvertBaseRgbaToRgba = ConvertBaseRgbaToRgba;
/**
 * Converts an rgba object to a base rgba object.
 *
 *
 * @param rgba - An rgba object in 0-255 format
 * @returns `{ r: 0.1, g: 0.1, b: 0.1, a: 1}`
 *
 */
var ConvertRgbaToBaseRgba = function (rgba, convertAlpha) {
    var alpha = rgba.a ? rgba.a : 255;
    return {
        r: rgba.r / 255,
        g: rgba.g / 255,
        b: rgba.b / 255,
        a: convertAlpha ? alpha / 255 : alpha,
    };
};
exports.ConvertRgbaToBaseRgba = ConvertRgbaToBaseRgba;
/**
 * Converts an rgba object to an hsla object.
 *
 *
 * @param rgba - An object containing the rgba values in 0-255 format
 * @returns `{ h: 18, s: 96, l: 58, a: 1}`
 *
 */
var ConvertRgbaToHsla = function (rgba) {
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
exports.ConvertRgbaToHsla = ConvertRgbaToHsla;
/**
 * Converts an rgba object to a base hsla object.
 *
 *
 * @param rgba - An object containing the rgba values in 0-255 format
 * @returns `{ h: 0.18, s: 0.96, l: 0.58, a: 1}`
 *
 */
var ConvertRgbaToBaseHsla = function (rgba) {
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
exports.ConvertRgbaToBaseHsla = ConvertRgbaToBaseHsla;
/**
 * Converts an rgba object to a HEX or HEXA string.
 *
 *
 * @param rgba - An object containing the rgba values in 0-255 format
 * @returns `#e5e5e5 or e5e5e5ff`
 *
 */
var ConvertRgbaToHex = function (rgba, includeHashtag, includeAlpha) {
    var addPadding = function (color) {
        return color.length === 1 ? '0' + color : '' + color;
    };
    return "".concat(includeHashtag ? '#' : '').concat(addPadding(Math.round(rgba.r).toString(16))).concat(addPadding(Math.round(rgba.g).toString(16))).concat(addPadding(Math.round(rgba.b).toString(16))).concat(includeAlpha && rgba.a
        ? addPadding(Math.round(rgba.a * 255).toString(16))
        : '');
};
exports.ConvertRgbaToHex = ConvertRgbaToHex;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* let's try to match the API from Electron's Browser window
(https://github.com/electron/electron/blob/master/docs/api/browser-window.md) */
var EventEmitter = __webpack_require__(10)
var buildBrowserAPI = __webpack_require__(21)
var buildWebAPI = __webpack_require__(22)
var fitSubviewToView = __webpack_require__(24)
var dispatchFirstClick = __webpack_require__(25)
var injectClientMessaging = __webpack_require__(26)
var movableArea = __webpack_require__(27)
var executeJavaScript = __webpack_require__(11)
var setDelegates = __webpack_require__(28)

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
/* 10 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Promise) {var CONSTANTS = __webpack_require__(4)

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(12)))

/***/ }),
/* 12 */
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)["setTimeout"], __webpack_require__(23)["setImmediate"]))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function () {
  return typeof coscript !== 'undefined' && coscript.createFiber
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var fiberAvailable = __webpack_require__(13)

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SETTINGS_CONTRASTMODEL = exports.SETTINGS_DEFAULTCOLORFORMAT = exports.SETTINGS_DEFAULTTOOL = exports.SETTINGS_GENERATORTRIESLEFT = exports.SETTINGS_CONTRASTSUGGESTIONSTRIESLEFT = exports.SETTINGS_CONTRASTFAILMESSAGESHOWN = exports.SETTINGS_OPTINUSAGEDATA = exports.SETTINGS_MIXPANELID = exports.SETTINGS_TEAMPLANSTATUS = exports.SETTINGS_TEAMUSER = exports.SETTINGS_PLAN = exports.SETTINGS_EMAIL = exports.SETTINGS_STATUS = exports.SETTINGS_USERID = void 0;
exports.SETTINGS_USERID = 'user_id';
exports.SETTINGS_STATUS = 'subscription-status';
exports.SETTINGS_EMAIL = 'email';
exports.SETTINGS_PLAN = 'plan';
exports.SETTINGS_TEAMUSER = 'teamUser';
exports.SETTINGS_TEAMPLANSTATUS = 'teamPlanStatus';
exports.SETTINGS_MIXPANELID = 'mp_id';
exports.SETTINGS_OPTINUSAGEDATA = 'optInUsageData';
exports.SETTINGS_CONTRASTFAILMESSAGESHOWN = 'contrast-fail-message-shown';
exports.SETTINGS_CONTRASTSUGGESTIONSTRIESLEFT = 'suggestions-tries-left';
exports.SETTINGS_GENERATORTRIESLEFT = 'generator-tries-left';
exports.SETTINGS_DEFAULTTOOL = 'stark_default_tool';
exports.SETTINGS_DEFAULTCOLORFORMAT = 'stark_default_color_format';
exports.SETTINGS_CONTRASTMODEL = 'stark_contrast_model';


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LightenColor = exports.DarkenColor = void 0;
var hsl_conversions_1 = __webpack_require__(17);
var rgb_conversions_1 = __webpack_require__(8);
/**
 * Darkens the provided rgba object by the provided ammount
 *
 *
 * @param rgba - An object containing the rgba values in 0-255 format
 * @param amount - The amount to darken the rgba object
 * @returns `rgba(r, g, b, a) in 0-255 format`
 *
 */
var DarkenColor = function (rgba, amount) {
    var baseHsla = (0, rgb_conversions_1.ConvertRgbaToBaseHsla)(rgba);
    baseHsla.l -= amount;
    if (baseHsla.l < 0) {
        baseHsla.l = 0;
    }
    return (0, hsl_conversions_1.ConvertBaseHslaToRgba)(baseHsla);
};
exports.DarkenColor = DarkenColor;
/**
 * Lightens the provided rgba object by the provided ammount
 *
 *
 * @param rgba - An object containing the rgba values in 0-255 format
 * @param amount - The amount to lighten the rgba object
 * @returns `rgba(r, g, b, a) in 0-255 format`
 *
 */
var LightenColor = function (rgba, amount) {
    var baseHsla = (0, rgb_conversions_1.ConvertRgbaToBaseHsla)(rgba);
    baseHsla.l += amount;
    if (baseHsla.l > 1) {
        baseHsla.l = 1;
    }
    return (0, hsl_conversions_1.ConvertBaseHslaToRgba)(baseHsla);
};
exports.LightenColor = LightenColor;


/***/ }),
/* 17 */
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
var ConvertBaseHslaToRgba = function (hsla) {
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
exports.ConvertBaseHslaToRgba = ConvertBaseHslaToRgba;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BLURRED = exports.CB_ACHROLY = exports.CB_ACHRO = exports.CB_TRITALY = exports.CB_TRITA = exports.CB_DEUTERLY = exports.CB_DEUTER = exports.CB_PROTALY = exports.CB_PROTA = exports.RGBA_REGEX = void 0;
exports.RGBA_REGEX = /rgba?\((\d+.?\d+|\d),\s*(\d+.?\d+|\d),\s*(\d+.?\d+|\d),\s*(\d+.?\d+|\d)?\)/;
exports.CB_PROTA = 'Protanopia';
exports.CB_PROTALY = 'Protanomaly';
exports.CB_DEUTER = 'Deuteranopia';
exports.CB_DEUTERLY = 'Deuteranomaly';
exports.CB_TRITA = 'Tritanopia';
exports.CB_TRITALY = 'Tritanomaly';
exports.CB_ACHRO = 'Achromatopsia';
exports.CB_ACHROLY = 'Achromatomaly';
exports.BLURRED = 'Blurred';


/***/ }),
/* 19 */
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
var GetContrastRatio = function (firstColor, secondColor, roundResult) {
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
exports.GetContrastRatio = GetContrastRatio;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onSelectionChanged = void 0;
var sketch_module_web_view_1 = __importDefault(__webpack_require__(9));
var events = __importStar(__webpack_require__(32));
var utils = __importStar(__webpack_require__(1));
var selectedMenuItem = 'Main';
function default_1() {
    var options = {
        identifier: 'stark.main',
        frame: false,
        height: 473,
        width: 360,
        resizable: false,
        hidesOnDeactivate: true,
        alwaysOnTop: true,
        remembersWindowFrame: true,
        acceptsFirstMouse: true,
        title: 'Main',
        backgroundColor: '#FFF',
        show: false,
    };
    var browserWindow = new sketch_module_web_view_1.default(options);
    var webContents = browserWindow.webContents;
    browserWindow.once('ready-to-show', function () {
        browserWindow.show();
    });
    webContents.on('did-finish-load', function () {
        var subscription = utils.loadAllSettings();
        var tool = utils.loadSetting(utils.SETTINGS_DEFAULTTOOL);
        var colorFormat = utils.loadSetting(utils.SETTINGS_DEFAULTCOLORFORMAT);
        var contrastModel = utils.loadSetting(utils.SETTINGS_CONTRASTMODEL);
        if (tool) {
            var convertedTool = utils.convertDefaultTool(tool);
            selectedMenuItem = convertedTool;
        }
        events.handleMenuItemClick(selectedMenuItem);
        var pluginObject = {
            pluginUserData: subscription,
            pluginAppSettings: {
                selectedMenuItem: selectedMenuItem,
                defaultColorFormat: colorFormat,
                defaultTool: tool,
                contrastModel: contrastModel,
            },
        };
        webContents
            .executeJavaScript("prepareFirstLoad(" + JSON.stringify(pluginObject) + ")")
            .catch(console.error);
    });
    webContents.on('urlClicked', function (url) {
        utils.openURL(url);
    });
    webContents.on('minMaxButtonClicked', function () {
        events.handleMinMaxButtonClicked();
    });
    webContents.on('cancelButtonClicked', function () {
        browserWindow.close();
    });
    webContents.on('menuItemClicked', function (menuItem) {
        var parsedJson = JSON.parse(menuItem);
        selectedMenuItem = parsedJson.menuItem;
        events.handleMenuItemClick(parsedJson.menuItem);
    });
    webContents.on('messageReceived', function (msg) {
        events.handleMessageReceivedFromSocket(msg);
    });
    webContents.on('contrastLoaded', function () {
        events.handleContrastLoaded();
    });
    webContents.on('handleExpandCollapseClick', function () {
        events.handleExpandCollapseClick();
    });
    webContents.on('contrastUpdateButtonClicked', function (updateObject) {
        events.handleContrastUpdateButtonClicked(updateObject);
    });
    webContents.on('colorBgChange', function (updateObject) {
        events.handleColorBgChange(updateObject);
    });
    webContents.on('colorFgChange', function (updateObject) {
        events.handleColorFgChange(updateObject);
    });
    webContents.on('typographyLoaded', function () {
        events.handleTypographyLoaded();
    });
    webContents.on('typographyItemClick', function (updateObject) {
        events.handleTypographyItemClick(updateObject);
    });
    webContents.on('applyFontSizeChange', function (updateObject) {
        events.handleApplyFontSizeChange(updateObject);
    });
    webContents.on('altTextLoaded', function () {
        events.handleAltTextLoaded();
    });
    webContents.on('addAltTextItem', function (altTextObject) {
        events.handleAddAltTextItem(altTextObject);
    });
    webContents.on('deleteAltTextItem', function (altTextObject) {
        events.handleDeleteAltTextItem(altTextObject);
    });
    webContents.on('touchTargetsLoaded', function () {
        events.handleTouchTargetsLoaded();
    });
    webContents.on('focusOrderLoaded', function () {
        events.handleFocusOrderLoaded();
    });
    webContents.on('createSequence', function (sequenceObject) {
        events.handleCreateSequence(sequenceObject);
    });
    webContents.on('selectSequence', function (sequenceObject) {
        events.handleSelectSequence(sequenceObject);
    });
    webContents.on('moveSequence', function (sequenceObject) {
        events.handleMoveSequence(sequenceObject);
    });
    webContents.on('saveNameSequence', function (sequenceObject) {
        events.handleSaveNameSequence(sequenceObject);
    });
    webContents.on('deleteSequence', function (sequenceObject) {
        events.handleDeleteSequence(sequenceObject);
    });
    webContents.on('addFocusItem', function () {
        events.handleAddFocusItem();
    });
    webContents.on('deleteFocusItem', function (focusItemObject) {
        events.handleDeleteFocusItem(focusItemObject);
    });
    webContents.on('saveNameFocusItem', function (focusItemObject) {
        events.handleSaveNameFocusItem(focusItemObject);
    });
    webContents.on('moveFocusItem', function (focusItemObject) {
        events.handleMoveFocusItem(focusItemObject);
    });
    webContents.on('landmarksLoaded', function () {
        events.handleLandmarksLoaded();
    });
    webContents.on('addLandmarkItem', function (landmarkObject) {
        events.handleAddLandmarkItem(landmarkObject);
    });
    webContents.on('deleteLandmarkItem', function (landmarkObject) {
        events.handleDeleteLandmarkItem(landmarkObject);
    });
    webContents.on('visionSimulatorLoaded', function () {
        events.handleVisionSimulatorLoaded();
    });
    webContents.on('simulationTabLoaded', function () {
        events.handleSimulationTabLoaded();
    });
    webContents.on('artboardChanged', function (artboardChangedObject) {
        events.handleArtboardChanged(artboardChangedObject);
    });
    webContents.on('generate', function (generateClickObject) {
        events.handleGenerate(generateClickObject);
    });
    webContents.on('defaultToolChanged', function (toolChangedObject) {
        var toolObject = JSON.parse(toolChangedObject);
        utils.saveSetting(utils.SETTINGS_DEFAULTTOOL, toolObject.tool);
    });
    webContents.on('defaultColorFormatChanged', function (colorFormatChangedObject) {
        var colorFormatObject = JSON.parse(colorFormatChangedObject);
        utils.saveSetting(utils.SETTINGS_DEFAULTCOLORFORMAT, colorFormatObject.colorFormat);
    });
    webContents.on('contrastModelChanged', function (contrastModelChangedObject) {
        var contrastModelObject = JSON.parse(contrastModelChangedObject);
        utils.saveSetting(utils.SETTINGS_CONTRASTMODEL, contrastModelObject.contrastModel);
    });
    webContents.on('signoutButtonClicked', function () {
        utils.clearAllSettings();
    });
    webContents.on('validationSuccessful', function (validationObject) {
        utils.updateSubscription(validationObject);
    });
    webContents.on('validationFailed', function () {
        utils.clearAllSettings();
    });
    webContents.on('activationSuccessful', function (subscriptionObject) {
        var parsedJson = JSON.parse(subscriptionObject);
        utils.debug(parsedJson);
        utils.saveAllSettings(parsedJson.validationObject);
    });
    browserWindow.loadURL(__webpack_require__(49));
}
exports.default = default_1;
function onSelectionChanged(context) {
    var browserWindow = utils.getBrowserWindow();
    var menuItem = browserWindow.getTitle();
    if (menuItem === 'Contrast') {
        events.handleContrastSelectionChange();
    }
    else if (menuItem === 'Touch Targets') {
        events.handleTouchTargetsSelectionChanged();
    }
}
exports.onSelectionChanged = onSelectionChanged;


/***/ }),
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(10)
var executeJavaScript = __webpack_require__(11)

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var timeout = __webpack_require__(3)

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
/* 24 */
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
/* 25 */
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(4)

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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(clearInterval, setInterval) {var CONSTANTS = __webpack_require__(4)

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(14)["clearInterval"], __webpack_require__(14)["setInterval"]))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, Promise) {var ObjCClass = __webpack_require__(30)
var parseWebArguments = __webpack_require__(31)
var CONSTANTS = __webpack_require__(4)

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(29), __webpack_require__(12)))

/***/ }),
/* 29 */
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)["setTimeout"], __webpack_require__(3)["clearTimeout"]))

/***/ }),
/* 30 */
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
/* 31 */
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
/* 32 */
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
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(33), exports);
__exportStar(__webpack_require__(6), exports);
__exportStar(__webpack_require__(43), exports);
__exportStar(__webpack_require__(44), exports);
__exportStar(__webpack_require__(45), exports);
__exportStar(__webpack_require__(46), exports);
__exportStar(__webpack_require__(47), exports);
__exportStar(__webpack_require__(48), exports);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAltTextItem = exports.editAltTextItem = exports.addAltTextItem = exports.getAltTextArtboards = exports.getAltTextArtboardGroupIds = exports.handleDeleteAltTextItem = exports.handleAddAltTextItem = exports.handleAltTextLoaded = void 0;
var utilities_1 = __webpack_require__(1);
var Sketch = __webpack_require__(2);
var Settings = __webpack_require__(5);
var Group = __webpack_require__(0).Group;
var ShapePath = __webpack_require__(0).ShapePath;
var Style = __webpack_require__(0).Style;
var Rectangle = __webpack_require__(0).Rectangle;
var Text = __webpack_require__(0).Text;
var altTextArtboards = [];
exports.handleAltTextLoaded = function () {
    var browserWindow = utilities_1.getBrowserWindow();
    try {
        var mainGroupIds = getAltTextArtboardGroupIds();
        if (mainGroupIds && mainGroupIds.length > 0) {
            var artboardsObjs = getAltTextArtboards(mainGroupIds);
            altTextArtboards = artboardsObjs;
        }
        browserWindow.webContents
            .executeJavaScript("altTextLoaded('" + JSON.stringify(altTextArtboards) + "')")
            .catch(console.error);
    }
    catch (err) {
        utilities_1.debug(err);
    }
};
exports.handleAddAltTextItem = function (altTextObject) {
    var browserWindow = utilities_1.getBrowserWindow();
    try {
        var altTextItem_1 = JSON.parse(altTextObject);
        var existingAltTextArtboards = __spreadArrays(altTextArtboards);
        var foundItem_1;
        if (altTextItem_1.layerId) {
            existingAltTextArtboards.forEach(function (artboard) {
                foundItem_1 = artboard.altTexts.find(function (item) {
                    return item.layerId === altTextItem_1.layerId;
                });
            });
        }
        if (foundItem_1) {
            foundItem_1.text = altTextItem_1.text;
            foundItem_1.status = altTextItem_1.status;
            editAltTextItem(foundItem_1.layerId, foundItem_1.text, foundItem_1.status);
        }
        else {
            var newAltTextItem_1 = addAltTextItem(altTextItem_1.status, altTextItem_1.text);
            if (newAltTextItem_1 && newAltTextItem_1.artboardId) {
                var foundArtboard = altTextArtboards.find(function (artboard) { return artboard.artboardId === newAltTextItem_1.artboardId; });
                if (foundArtboard) {
                    foundArtboard.altTexts.push({
                        name: newAltTextItem_1.name,
                        status: newAltTextItem_1.status,
                        text: newAltTextItem_1.text,
                        layerId: newAltTextItem_1.layerId,
                        layerName: newAltTextItem_1.layerName,
                    });
                }
                else {
                    altTextArtboards.push({
                        artboardId: newAltTextItem_1.artboardId,
                        artboardName: newAltTextItem_1.artboardName,
                        altTexts: [
                            {
                                name: newAltTextItem_1.name,
                                status: newAltTextItem_1.status,
                                text: newAltTextItem_1.text,
                                layerId: newAltTextItem_1.layerId,
                                layerName: newAltTextItem_1.layerName,
                            },
                        ],
                    });
                }
            }
        }
        browserWindow.webContents
            .executeJavaScript("altTextLoaded('" + JSON.stringify(altTextArtboards) + "')")
            .catch(console.error);
    }
    catch (err) {
        utilities_1.debug(err);
    }
};
exports.handleDeleteAltTextItem = function (altTextObject) {
    var browserWindow = utilities_1.getBrowserWindow();
    var altTextItem = JSON.parse(altTextObject);
    var layerId = altTextItem.layerId;
    deleteAltTextItem(layerId);
    altTextArtboards.forEach(function (artboard) {
        var foundAltTextIndex = artboard.altTexts.findIndex(function (altText) {
            return altText.layerId === layerId;
        });
        if (foundAltTextIndex > -1) {
            artboard.altTexts.splice(foundAltTextIndex, 1);
        }
    });
    var foundArtboardIndex = altTextArtboards.findIndex(function (artboard) {
        return artboard.altTexts.length < 1;
    });
    if (foundArtboardIndex > -1) {
        var removed = altTextArtboards.splice(foundArtboardIndex, 1);
    }
    browserWindow.webContents
        .executeJavaScript("altTextLoaded('" + JSON.stringify(altTextArtboards) + "')")
        .catch(console.error);
};
var getAltTextArtboardGroupIds = function () {
    var doc = Sketch.getSelectedDocument();
    var mainGroups = Settings.documentSettingForKey(doc, 'stark-alt-text-artboards');
    if (!mainGroups) {
        return [];
    }
    return mainGroups;
};
exports.getAltTextArtboardGroupIds = getAltTextArtboardGroupIds;
var getAltTextArtboards = function (mainGroupIds) {
    var doc = Sketch.getSelectedDocument();
    var artboards = [];
    var mainGroupsToDelete = [];
    mainGroupIds.forEach(function (mainGroupId, index) {
        var mainGroupLayer = doc.getLayerWithID(mainGroupId);
        if (mainGroupLayer) {
            var artboardGroupId = Settings.layerSettingForKey(mainGroupLayer, 'stark-alt-text-main-group');
            if (artboardGroupId) {
                var artboardGroupLayer = doc.getLayerWithID(artboardGroupId);
                if (artboardGroupLayer) {
                    var mainArtboard = artboardGroupLayer.getParentArtboard();
                    var artboardInfo = {
                        artboardName: mainArtboard.name,
                        artboardId: mainArtboard.id,
                        altTexts: [],
                    };
                    var altTextItems_1 = [];
                    artboardGroupLayer.layers.forEach(function (layer, index) {
                        var alTextInfo = Settings.layerSettingForKey(layer, 'stark-alt-text-item');
                        if (alTextInfo) {
                            altTextItems_1.push({
                                layerId: alTextInfo.layerId,
                                name: alTextInfo.name,
                                status: alTextInfo.status,
                                text: alTextInfo.text,
                            });
                        }
                    });
                    altTextItems_1.reverse();
                    artboardInfo.altTexts = altTextItems_1;
                    artboards.push(artboardInfo);
                }
                else {
                    mainGroupsToDelete.push(index);
                }
            }
        }
    });
    mainGroupsToDelete.forEach(function (mainGroupToDelete) {
        mainGroupIds.splice(mainGroupToDelete, 1);
    });
    Settings.setDocumentSettingForKey(doc, 'stark-alt-text-artboards', mainGroupIds);
    return artboards;
};
exports.getAltTextArtboards = getAltTextArtboards;
var addAltTextItem = function (status, text) {
    var doc = Sketch.getSelectedDocument();
    var selection = doc.selectedLayers;
    var itemData;
    if (selection.isEmpty) {
        utilities_1.showToast('Please select a layer to attach alt-text to.');
    }
    else if (selection.length > 1) {
        utilities_1.showToast('Alt-text can only be attached to one layer or group.');
    }
    else {
        var currentArtboard = selection.layers[0].getParentArtboard();
        var existingMainGroupId = Settings.layerSettingForKey(currentArtboard, 'stark-alt-text-main-group');
        var artboardGroup = doc.getLayerWithID(existingMainGroupId);
        var altTextItemGroup;
        if (artboardGroup) {
            altTextItemGroup = addAltTextItemGroup(artboardGroup.layers.length + 1, status, text, selection.layers[0], artboardGroup);
        }
        else {
            artboardGroup = createMainGroup(currentArtboard);
            altTextItemGroup = addAltTextItemGroup(1, status, text, selection.layers[0], artboardGroup);
            Settings.setLayerSettingForKey(currentArtboard, 'stark-alt-text-main-group', artboardGroup.id);
            var currentArtboardGroups = Settings.documentSettingForKey(doc, 'stark-alt-text-artboards');
            if (!currentArtboardGroups) {
                currentArtboardGroups = [];
            }
            currentArtboardGroups.push(currentArtboard.id);
            Settings.setDocumentSettingForKey(doc, 'stark-alt-text-artboards', currentArtboardGroups);
        }
        altTextItemGroup.moveToBack();
        Settings.setLayerSettingForKey(altTextItemGroup, 'stark-alt-text-item', {
            layerId: altTextItemGroup.id,
            name: selection.layers[0].name,
            status: status,
            text: text,
        });
        itemData = {
            artboardId: currentArtboard.id,
            artboardName: currentArtboard.name,
            layerId: altTextItemGroup.id,
            layerName: selection.layers[0].name,
            name: selection.layers[0].name,
            status: status,
            text: text,
        };
    }
    return itemData;
};
exports.addAltTextItem = addAltTextItem;
var editAltTextItem = function (layerId, text, status) {
    var doc = Sketch.getSelectedDocument();
    var altTextItemGroup = doc.getLayerWithID(layerId);
    if (altTextItemGroup) {
        var altTextGroup = altTextItemGroup.layers[2];
        var badgesGroup = altTextItemGroup.layers[1];
        var backgroundGroup = altTextItemGroup.layers[0];
        badgesGroup.layers[1].remove();
        var leftGroup = badgesGroup.layers[0];
        var rightGroup = new Group({
            name: "right",
            parent: badgesGroup,
        });
        var statusBackground = new ShapePath({
            frame: {
                x: leftGroup.frame.width,
                y: 12,
                width: 27,
                height: 20,
            },
            type: Sketch.Types.ShapePath,
            name: 'status background',
            shapeType: ShapePath.ShapeType.Rectangle,
            style: {
                fills: [],
                borders: [
                    {
                        color: '#0000001a',
                        fillType: Style.FillType.Color,
                        thickness: 1,
                        position: Style.BorderPosition.Inside,
                    },
                ],
            },
            parent: rightGroup,
        });
        statusBackground.points[1].cornerRadius = 5;
        statusBackground.points[2].cornerRadius = 5;
        var statusIcon = void 0;
        if (status === 'written' || status === 'decorative') {
            statusIcon =
                '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.89355 9.94531C4.21045 9.94531 4.45752 9.82178 4.62939 9.56396L9.65674 1.78662C9.78564 1.59326 9.83398 1.42139 9.83398 1.25488C9.83398 0.830566 9.52246 0.524414 9.0874 0.524414C8.78662 0.524414 8.604 0.631836 8.42139 0.921875L3.87207 8.12988L1.54102 5.17578C1.36377 4.95557 1.18115 4.85889 0.917969 4.85889C0.477539 4.85889 0.160645 5.17041 0.160645 5.6001C0.160645 5.78809 0.225098 5.96533 0.380859 6.15332L3.16309 9.58008C3.36719 9.83252 3.59277 9.94531 3.89355 9.94531Z" fill="#381FD1" /></svg>';
        }
        else if (status === 'to-do') {
            statusIcon =
                '<svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.14355 1.82031H8.85107C9.21631 1.82031 9.5332 1.50879 9.5332 1.12744C9.5332 0.751465 9.21631 0.43457 8.85107 0.43457H1.14355C0.789062 0.43457 0.461426 0.751465 0.461426 1.12744C0.461426 1.50879 0.789062 1.82031 1.14355 1.82031Z" fill="rgba(0,0,0,0.95)" /></svg>';
        }
        else {
            statusIcon =
                '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.88037 11.332H10.125C11.0811 11.332 11.7041 10.6123 11.7041 9.74756C11.7041 9.48438 11.6343 9.21582 11.4946 8.96875L7.36426 1.76074C7.05811 1.23438 6.53711 0.96582 6 0.96582C5.46289 0.96582 4.93652 1.23975 4.63574 1.76074L0.505371 8.97412C0.365723 9.22119 0.295898 9.48438 0.295898 9.74756C0.295898 10.6123 0.918945 11.332 1.88037 11.332ZM2.03613 10.188C1.72998 10.188 1.52588 9.94092 1.52588 9.66162C1.52588 9.58105 1.53662 9.48438 1.58496 9.39844L5.5542 2.43213C5.65088 2.26562 5.82812 2.19043 6 2.19043C6.17188 2.19043 6.34375 2.26562 6.44043 2.4375L10.4097 9.40381C10.458 9.48975 10.4795 9.58643 10.4795 9.66162C10.4795 9.94092 10.2646 10.188 9.96387 10.188H2.03613ZM6.00537 7.54541C6.31689 7.54541 6.50488 7.36816 6.51562 7.03516L6.59619 4.59668C6.6123 4.25293 6.35449 4.01123 6 4.01123C5.63477 4.01123 5.3877 4.25293 5.40381 4.59131L5.479 7.04053C5.49512 7.36816 5.67773 7.54541 6.00537 7.54541ZM6.00537 9.3501C6.37061 9.3501 6.66602 9.09766 6.66602 8.73779C6.66602 8.37793 6.37598 8.12549 6.00537 8.12549C5.62939 8.12549 5.33398 8.3833 5.33398 8.73779C5.33398 9.09766 5.63477 9.3501 6.00537 9.3501Z" fill="#BA1C1C" /></svg>';
        }
        var group = Sketch.createLayerFromData(statusIcon, 'svg');
        group.parent = rightGroup;
        group.frame.x = leftGroup.frame.x + leftGroup.frame.width + 5;
        group.frame.y = leftGroup.frame.y + group.frame.height / 2;
        var statusText = new Text({
            type: Sketch.Types.Text,
            name: 'status',
            text: "" + (status.charAt(0).toUpperCase() + status.slice(1)),
            style: {
                fontFamily: 'Helvetica',
                textColor: status === 'written' || status === 'decorative' || status === 'to-do'
                    ? '#000000f2'
                    : '#BA1C1C',
                fontSize: 13,
                fontStyle: 'normal',
                lineHeight: 20,
                kerning: -0.08,
                borders: [],
            },
            parent: rightGroup,
        });
        statusText.fixedWidth = false;
        statusBackground.frame.width =
            group.frame.width + statusText.frame.width + 19;
        statusBackground.frame.height = 20;
        statusBackground.frame.x = leftGroup.frame.x + leftGroup.frame.width - 1;
        statusBackground.frame.y = leftGroup.frame.y;
        statusText.frame.x = group.frame.x + group.frame.width + 5;
        statusText.frame.y = statusBackground.frame.y;
        rightGroup.adjustToFit();
        badgesGroup.adjustToFit();
        altTextGroup.layers[0].text = "" + text;
        altTextGroup.adjustToFit();
        altTextItemGroup.adjustToFit();
        if (backgroundGroup.frame.height !== altTextItemGroup.frame.height) {
            backgroundGroup.frame.height = altTextItemGroup.frame.height + 12;
        }
        altTextItemGroup.adjustToFit();
        var existingItemData = Settings.layerSettingForKey(altTextItemGroup, 'stark-alt-text-item');
        Settings.setLayerSettingForKey(altTextItemGroup, 'stark-alt-text-item', {
            layerId: existingItemData.layerId,
            name: existingItemData.name,
            status: status,
            text: text,
        });
    }
};
exports.editAltTextItem = editAltTextItem;
var deleteAltTextItem = function (id) {
    var doc = Sketch.getSelectedDocument();
    var altTextItemGroupLayer = doc.getLayerWithID(id);
    var altTextItemGroupLayerParent = altTextItemGroupLayer.parent;
    var altTextItemLength = altTextItemGroupLayerParent.layers.length;
    if (altTextItemLength === 1) {
        var altTextArtboards_1 = Settings.documentSettingForKey(doc, 'stark-alt-text-artboards');
        var foundIndex = altTextArtboards_1.findIndex(function (artboard) {
            return artboard === altTextItemGroupLayerParent.id;
        });
        var splicedArr = altTextArtboards_1.splice(foundIndex, 1);
        Settings.setDocumentSettingForKey(doc, 'stark-alt-text-artboards', altTextArtboards_1);
    }
    altTextItemGroupLayer.remove();
    if (altTextItemLength === 1) {
        altTextItemGroupLayerParent.remove();
    }
};
exports.deleteAltTextItem = deleteAltTextItem;
var createMainGroup = function (parentArtboard) {
    return new Group({
        name: 'Stark Alt-Texts',
        parent: parentArtboard,
    });
};
var addAltTextItemGroup = function (index, status, altText, selectedLayer, parent) {
    var returnGroup = new Group({
        name: "" + selectedLayer.name,
        parent: parent,
        frame: new Rectangle(0, 0, 260, 100),
    });
    var background = new ShapePath({
        frame: {
            x: selectedLayer.frame.x - 12,
            y: selectedLayer.frame.y - 12,
            width: 260,
            height: 20,
        },
        type: Sketch.Types.ShapePath,
        name: 'Background',
        shapeType: ShapePath.ShapeType.Rectangle,
        style: {
            fills: [
                {
                    color: '#FFFFFF',
                    fillType: Style.FillType.Color,
                },
            ],
            borders: [
                {
                    color: '##0000001a',
                    fillType: Style.FillType.Color,
                    thickness: 0.5,
                    position: Style.BorderPosition.Inside,
                },
            ],
            shadows: [
                {
                    color: '#00000040',
                    blur: 4,
                    x: 0,
                    y: 1,
                    spread: 0,
                },
            ],
        },
        parent: returnGroup,
    });
    background.points.forEach(function (point) { return (point.cornerRadius = 4); });
    var badgesGroup = new Group({
        name: "badges",
        parent: returnGroup,
    });
    var leftGroup = new Group({
        name: "left",
        parent: badgesGroup,
    });
    var indexBackground = new ShapePath({
        frame: {
            x: background.frame.x + 12,
            y: background.frame.y + 12,
            width: 27,
            height: 20,
        },
        type: Sketch.Types.ShapePath,
        name: 'index background',
        shapeType: ShapePath.ShapeType.Rectangle,
        style: {
            fills: [
                {
                    color: '#381FD1',
                    fillType: Style.FillType.Color,
                },
            ],
            borders: [],
        },
        parent: leftGroup,
    });
    indexBackground.points[0].cornerRadius = 5;
    indexBackground.points[3].cornerRadius = 5;
    var indexText = new Text({
        type: Sketch.Types.Text,
        name: 'index',
        text: "#" + index,
        style: {
            fontFamily: 'Helvetica',
            textColor: '#FFFFFF',
            fontSize: 13,
            fontStyle: 'normal',
            lineHeight: 20,
            kerning: -0.08,
            borders: [],
        },
        parent: leftGroup,
    });
    indexText.fixedWidth = false;
    indexBackground.frame.width = indexText.frame.width + 8;
    indexBackground.frame.height = 20;
    indexText.frame.x = indexBackground.frame.x + 4;
    indexText.frame.y = indexBackground.frame.y;
    leftGroup.adjustToFit();
    var rightGroup = new Group({
        name: "right",
        parent: badgesGroup,
    });
    var statusBackground = new ShapePath({
        frame: {
            x: indexBackground.frame.width,
            y: 12,
            width: 27,
            height: 20,
        },
        type: Sketch.Types.ShapePath,
        name: 'status background',
        shapeType: ShapePath.ShapeType.Rectangle,
        style: {
            fills: [],
            borders: [
                {
                    color: '#0000001a',
                    fillType: Style.FillType.Color,
                    thickness: 1,
                    position: Style.BorderPosition.Inside,
                },
            ],
        },
        parent: rightGroup,
    });
    statusBackground.points[1].cornerRadius = 5;
    statusBackground.points[2].cornerRadius = 5;
    var statusIcon;
    if (status === 'written' || status === 'decorative') {
        statusIcon =
            '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.89355 9.94531C4.21045 9.94531 4.45752 9.82178 4.62939 9.56396L9.65674 1.78662C9.78564 1.59326 9.83398 1.42139 9.83398 1.25488C9.83398 0.830566 9.52246 0.524414 9.0874 0.524414C8.78662 0.524414 8.604 0.631836 8.42139 0.921875L3.87207 8.12988L1.54102 5.17578C1.36377 4.95557 1.18115 4.85889 0.917969 4.85889C0.477539 4.85889 0.160645 5.17041 0.160645 5.6001C0.160645 5.78809 0.225098 5.96533 0.380859 6.15332L3.16309 9.58008C3.36719 9.83252 3.59277 9.94531 3.89355 9.94531Z" fill="#381FD1" /></svg>';
    }
    else if (status === 'to-do') {
        statusIcon =
            '<svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.14355 1.82031H8.85107C9.21631 1.82031 9.5332 1.50879 9.5332 1.12744C9.5332 0.751465 9.21631 0.43457 8.85107 0.43457H1.14355C0.789062 0.43457 0.461426 0.751465 0.461426 1.12744C0.461426 1.50879 0.789062 1.82031 1.14355 1.82031Z" fill="rgba(0,0,0,0.95)" /></svg>';
    }
    else {
        statusIcon =
            '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.88037 11.332H10.125C11.0811 11.332 11.7041 10.6123 11.7041 9.74756C11.7041 9.48438 11.6343 9.21582 11.4946 8.96875L7.36426 1.76074C7.05811 1.23438 6.53711 0.96582 6 0.96582C5.46289 0.96582 4.93652 1.23975 4.63574 1.76074L0.505371 8.97412C0.365723 9.22119 0.295898 9.48438 0.295898 9.74756C0.295898 10.6123 0.918945 11.332 1.88037 11.332ZM2.03613 10.188C1.72998 10.188 1.52588 9.94092 1.52588 9.66162C1.52588 9.58105 1.53662 9.48438 1.58496 9.39844L5.5542 2.43213C5.65088 2.26562 5.82812 2.19043 6 2.19043C6.17188 2.19043 6.34375 2.26562 6.44043 2.4375L10.4097 9.40381C10.458 9.48975 10.4795 9.58643 10.4795 9.66162C10.4795 9.94092 10.2646 10.188 9.96387 10.188H2.03613ZM6.00537 7.54541C6.31689 7.54541 6.50488 7.36816 6.51562 7.03516L6.59619 4.59668C6.6123 4.25293 6.35449 4.01123 6 4.01123C5.63477 4.01123 5.3877 4.25293 5.40381 4.59131L5.479 7.04053C5.49512 7.36816 5.67773 7.54541 6.00537 7.54541ZM6.00537 9.3501C6.37061 9.3501 6.66602 9.09766 6.66602 8.73779C6.66602 8.37793 6.37598 8.12549 6.00537 8.12549C5.62939 8.12549 5.33398 8.3833 5.33398 8.73779C5.33398 9.09766 5.63477 9.3501 6.00537 9.3501Z" fill="#BA1C1C" /></svg>';
    }
    var group = Sketch.createLayerFromData(statusIcon, 'svg');
    group.parent = rightGroup;
    group.frame.x = leftGroup.frame.x + leftGroup.frame.width + 5;
    group.frame.y = leftGroup.frame.y + group.frame.height / 2;
    var statusText = new Text({
        type: Sketch.Types.Text,
        name: 'status',
        text: "" + (status.charAt(0).toUpperCase() + status.slice(1)),
        style: {
            fontFamily: 'Helvetica',
            textColor: status === 'written' || status === 'decorative' || status === 'to-do'
                ? '#000000f2'
                : '#BA1C1C',
            fontSize: 13,
            fontStyle: 'normal',
            lineHeight: 20,
            kerning: -0.08,
            borders: [],
        },
        parent: rightGroup,
    });
    statusText.fixedWidth = false;
    statusBackground.frame.width =
        group.frame.width + statusText.frame.width + 19;
    statusBackground.frame.height = 20;
    statusBackground.frame.x = leftGroup.frame.x + leftGroup.frame.width - 1;
    statusBackground.frame.y = leftGroup.frame.y;
    statusText.frame.x = group.frame.x + group.frame.width + 5;
    statusText.frame.y = statusBackground.frame.y;
    rightGroup.adjustToFit();
    badgesGroup.adjustToFit();
    var altGroup = new Group({
        name: "alt-text",
        parent: returnGroup,
    });
    var altLayer = new Text({
        type: Sketch.Types.Text,
        name: 'alt-text',
        text: "" + altText,
        style: {
            fontFamily: 'Helvetica',
            textColor: '#000000f2',
            fontSize: 13,
            fontStyle: 'normal',
            kerning: -0.08,
            lineHeight: 20,
            borders: [],
            alignment: Text.Alignment.left,
        },
        parent: altGroup,
    });
    altLayer.frame.width = 234;
    altLayer.fixedWidth = true;
    altLayer.frame.x = background.frame.x + 12;
    altLayer.frame.y = background.frame.y + 40;
    altGroup.adjustToFit();
    returnGroup.adjustToFit();
    background.frame.height = returnGroup.frame.height + 12;
    var rect = new Rectangle(0, 0, 100, 100);
    var newRect = rect.changeBasis({
        from: selectedLayer,
        to: selectedLayer.getParentArtboard(),
    });
    positionInArtboard(returnGroup, newRect.x - 12, newRect.y - 12);
    returnGroup.adjustToFit();
    return returnGroup;
};
var parentOffsetInArtboard = function (layer) {
    var offset = { x: 0, y: 0 };
    var parent = layer.parent;
    while (parent.name && parent.type !== 'Artboard') {
        offset.x += parent.frame.x;
        offset.y += parent.frame.y;
        parent = parent.parent;
    }
    return offset;
};
var positionInArtboard = function (layer, x, y) {
    var parentOffset = parentOffsetInArtboard(layer);
    var newFrame = new Sketch.Rectangle(layer.frame);
    newFrame.x = x - parentOffset.x;
    newFrame.y = y - parentOffset.y;
    layer.frame = newFrame;
    updateParentFrames(layer);
};
var updateParentFrames = function (layer) {
    var parent = layer.parent;
    while (parent && parent.name && parent.type !== 'Artboard') {
        parent.adjustToFit();
        parent = parent.parent;
    }
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getChildLayers = exports.isLayerGroup = exports.debug = exports.convertDefaultTool = exports.showToast = exports.updateSubscription = exports.clearAllSettings = exports.generateMixpanelUniqueId = exports.loadAllSettings = exports.loadSetting = exports.saveAllSettings = exports.saveSetting = exports.openURL = exports.setWindowBounds = exports.getBrowserWindow = void 0;
var remote_1 = __webpack_require__(35);
var constants_1 = __webpack_require__(15);
var Settings = __webpack_require__(5);
var UI = __webpack_require__(36);
exports.getBrowserWindow = function () {
    return remote_1.getWebview('stark.main');
};
exports.setWindowBounds = function (width, height) {
    var browserWindow = exports.getBrowserWindow();
    var currentBounds = browserWindow.getBounds();
    if (currentBounds.height > height) {
        browserWindow.setBounds({
            y: currentBounds.y - (currentBounds.height - height),
            height: height,
            width: width,
        });
    }
    else if (currentBounds.height < height) {
        browserWindow.setBounds({
            y: currentBounds.y + (height - currentBounds.height),
            height: height,
            width: width,
        });
    }
    else {
        browserWindow.setBounds({
            height: height,
            width: width,
        });
    }
};
exports.openURL = function (url) {
    var nsurl = NSURL.URLWithString(url);
    NSWorkspace.sharedWorkspace().openURL(nsurl);
};
exports.saveSetting = function (key, value) {
    Settings.setSettingForKey("com.stark." + key, value);
};
exports.saveAllSettings = function (subscriptionObject) {
    exports.saveSetting(constants_1.SETTINGS_USERID, subscriptionObject.id);
    exports.saveSetting(constants_1.SETTINGS_EMAIL, subscriptionObject.email);
    exports.saveSetting(constants_1.SETTINGS_MIXPANELID, subscriptionObject.mp_id);
    exports.saveSetting(constants_1.SETTINGS_OPTINUSAGEDATA, subscriptionObject.optInUsageData);
    exports.saveSetting(constants_1.SETTINGS_STATUS, subscriptionObject.status);
    exports.saveSetting(constants_1.SETTINGS_PLAN, subscriptionObject.plan);
    exports.saveSetting(constants_1.SETTINGS_TEAMUSER, subscriptionObject.teamUser);
    exports.saveSetting(constants_1.SETTINGS_TEAMPLANSTATUS, subscriptionObject.teamPlanStatus);
};
exports.loadSetting = function (key) {
    return Settings.settingForKey("com.stark." + key);
};
exports.loadAllSettings = function () {
    var mixpanelUniqueId;
    if (exports.loadSetting(constants_1.SETTINGS_MIXPANELID) === undefined ||
        exports.loadSetting(constants_1.SETTINGS_MIXPANELID) === '') {
        mixpanelUniqueId = exports.generateMixpanelUniqueId();
        exports.saveSetting(constants_1.SETTINGS_MIXPANELID, mixpanelUniqueId);
        exports.saveSetting(constants_1.SETTINGS_OPTINUSAGEDATA, true);
    }
    return {
        id: exports.loadSetting(constants_1.SETTINGS_USERID),
        email: exports.loadSetting(constants_1.SETTINGS_EMAIL),
        mp_id: exports.loadSetting(constants_1.SETTINGS_MIXPANELID),
        optInUsageData: exports.loadSetting(constants_1.SETTINGS_OPTINUSAGEDATA),
        status: exports.loadSetting(constants_1.SETTINGS_STATUS),
        plan: exports.loadSetting(constants_1.SETTINGS_PLAN) === undefined ||
            exports.loadSetting(constants_1.SETTINGS_PLAN) === ''
            ? ''
            : exports.loadSetting(constants_1.SETTINGS_PLAN),
        teamUser: exports.loadSetting(constants_1.SETTINGS_TEAMUSER),
        teamPlanStatus: exports.loadSetting(constants_1.SETTINGS_TEAMPLANSTATUS),
        contrastFailMessageShown: exports.loadSetting(constants_1.SETTINGS_CONTRASTFAILMESSAGESHOWN) === undefined ||
            exports.loadSetting(constants_1.SETTINGS_CONTRASTFAILMESSAGESHOWN) === ''
            ? true
            : exports.loadSetting(constants_1.SETTINGS_CONTRASTFAILMESSAGESHOWN),
        suggestionsTriesLeft: exports.loadSetting(constants_1.SETTINGS_CONTRASTSUGGESTIONSTRIESLEFT) === undefined ||
            exports.loadSetting(constants_1.SETTINGS_CONTRASTSUGGESTIONSTRIESLEFT) === ''
            ? 4
            : exports.loadSetting(constants_1.SETTINGS_CONTRASTSUGGESTIONSTRIESLEFT),
        generatorTriesLeft: exports.loadSetting(constants_1.SETTINGS_GENERATORTRIESLEFT) === undefined ||
            exports.loadSetting(constants_1.SETTINGS_GENERATORTRIESLEFT) === ''
            ? 3
            : exports.loadSetting(constants_1.SETTINGS_GENERATORTRIESLEFT),
    };
};
exports.generateMixpanelUniqueId = function () {
    return (new Date().getUTCMilliseconds().toString() + new Date().getTime().toString()).toString();
};
exports.clearAllSettings = function () {
    [
        constants_1.SETTINGS_USERID,
        constants_1.SETTINGS_STATUS,
        constants_1.SETTINGS_EMAIL,
        constants_1.SETTINGS_PLAN,
        constants_1.SETTINGS_MIXPANELID,
        constants_1.SETTINGS_OPTINUSAGEDATA,
        constants_1.SETTINGS_TEAMUSER,
        constants_1.SETTINGS_TEAMPLANSTATUS,
    ].forEach(function (key) {
        exports.saveSetting(key, '');
    });
};
exports.updateSubscription = function (subscriptionObject) {
    exports.saveSetting(constants_1.SETTINGS_USERID, subscriptionObject.id);
    exports.saveSetting(constants_1.SETTINGS_EMAIL, subscriptionObject.email);
    exports.saveSetting(constants_1.SETTINGS_STATUS, subscriptionObject.status);
    exports.saveSetting(constants_1.SETTINGS_PLAN, subscriptionObject.plan);
    exports.saveSetting(constants_1.SETTINGS_TEAMUSER, subscriptionObject.teamUser);
    exports.saveSetting(constants_1.SETTINGS_TEAMPLANSTATUS, subscriptionObject.teamPlanStatus);
    exports.saveSetting(constants_1.SETTINGS_OPTINUSAGEDATA, subscriptionObject.optInUsageData);
};
exports.showToast = function (message) {
    UI.message(message);
};
exports.convertDefaultTool = function (tool) {
    var returnTool = '';
    switch (tool) {
        case 'Main': {
            returnTool = 'Main';
            break;
        }
        case 'Contrast': {
            returnTool = 'Check Contrast';
            break;
        }
        case 'Typography': {
            returnTool = 'Typography';
            break;
        }
        case 'Alt-Text': {
            returnTool = 'Alt-Text';
            break;
        }
        case 'Touch Targets': {
            returnTool = 'Touch Targets';
            break;
        }
        case 'Focus Order': {
            returnTool = 'Focus Order';
            break;
        }
        case 'Landmarks': {
            returnTool = 'Landmarks';
            break;
        }
        case 'Vision': {
            returnTool = 'Vision Simulator';
            break;
        }
        default: {
            returnTool = 'Main';
        }
    }
    return returnTool;
};
exports.debug = function (message) {
    console.log('=======================');
    console.log('=======================');
    console.log('=======================');
    console.log('=======================');
    console.log(message);
    console.log('=======================');
    console.log('=======================');
    console.log('=======================');
    console.log('=======================');
};
exports.isLayerGroup = function (layer) {
    return (layer.type === 'Page' ||
        layer.type === 'Group' ||
        layer.type === 'SymbolInstance' ||
        layer.type === 'SymbolMaster' ||
        layer.type === 'Artboard');
};
var isSymbolInstance = function (layer) {
    return layer.type === 'SymbolInstance';
};
exports.getChildLayers = function (selectedLayer, detachSymbolInstances) {
    var childLayers = [];
    var recurFunc = function (layer) {
        if (layer) {
            var layerName = layer.name;
            if (layerName !== 'Stark Landmarks' &&
                layerName !== 'Stark Alt-Texts' &&
                layerName !== 'Stark Focus Orders') {
                if (exports.isLayerGroup(layer) && !isSymbolInstance(layer)) {
                    layer.layers.forEach(function (childLayer) {
                        if (exports.isLayerGroup(childLayer)) {
                            recurFunc(childLayer);
                        }
                        else {
                            childLayers.push(childLayer);
                        }
                    });
                }
                else if (isSymbolInstance(layer) && detachSymbolInstances) {
                    var group = layer.detach({
                        recursively: true,
                    });
                    recurFunc(group);
                }
                else if (isSymbolInstance(layer)) {
                    var group = layer.master;
                    recurFunc(group);
                }
            }
        }
    };
    recurFunc(selectedLayer);
    return childLayers;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/* globals NSThread */
var threadDictionary = NSThread.mainThread().threadDictionary()

module.exports.getWebview = function(identifier) {
  return __webpack_require__(9).fromId(identifier) // eslint-disable-line
}

module.exports.isWebviewPresent = function isWebviewPresent(identifier) {
  return !!threadDictionary[identifier]
}

module.exports.sendToWebview = function sendToWebview(identifier, evalString) {
  if (!module.exports.isWebviewPresent(identifier)) {
    return
  }

  var panel = threadDictionary[identifier]
  var webview = null
  var subviews = panel.contentView().subviews()
  for (var i = 0; i < subviews.length; i += 1) {
    if (
      !webview &&
      !subviews[i].isKindOfClass(WKInspectorWKWebView) &&
      subviews[i].isKindOfClass(WKWebView)
    ) {
      webview = subviews[i]
    }
  }

  if (!webview || !webview.evaluateJavaScript_completionHandler) {
    throw new Error('Webview ' + identifier + ' not found')
  }

  webview.evaluateJavaScript_completionHandler(evalString, null)
}


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ }),
/* 37 */
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
var MixColors = function (firstColor, secondColor) {
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
exports.MixColors = MixColors;


/***/ }),
/* 38 */
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
var GetLuminance = function (rgba) {
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
exports.GetLuminance = GetLuminance;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GetColorSuggestions = exports.GetNearestPassingColor = exports.DetermineColorModification = void 0;
var color_modifiers_1 = __webpack_require__(16);
var contrast_checker_1 = __webpack_require__(19);
var rgb_conversions_1 = __webpack_require__(8);
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
var DetermineColorModification = function (colorToModify, colorToCompare, modificationAmount) {
    if (modificationAmount === void 0) { modificationAmount = 0.05; }
    var colorLightened = (0, color_modifiers_1.LightenColor)(colorToModify, modificationAmount);
    var colorDarkened = (0, color_modifiers_1.DarkenColor)(colorToModify, modificationAmount);
    var lightenedCR = (0, contrast_checker_1.GetContrastRatio)(colorLightened, colorToCompare);
    var darkenedCR = (0, contrast_checker_1.GetContrastRatio)(colorDarkened, colorToCompare);
    return lightenedCR > darkenedCR ? 'light' : 'dark';
};
exports.DetermineColorModification = DetermineColorModification;
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
var GetNearestPassingColor = function (colorToModify, colorToCompare, modificationAmount, minimumContrast, modificationType) {
    if (modificationAmount === void 0) { modificationAmount = 0.05; }
    if (minimumContrast === void 0) { minimumContrast = 4.5; }
    var modFunc;
    var colorModificationType = (0, exports.DetermineColorModification)(colorToModify, colorToCompare, modificationAmount);
    if (modificationType) {
        modFunc = modificationType === 'light' ? color_modifiers_1.LightenColor : color_modifiers_1.DarkenColor;
    }
    else {
        modFunc = colorModificationType === 'light' ? color_modifiers_1.LightenColor : color_modifiers_1.DarkenColor;
    }
    var percentage = modificationAmount;
    var cr = (0, contrast_checker_1.GetContrastRatio)(colorToModify, colorToCompare);
    var runCheck = cr < minimumContrast;
    var colorToReturn = colorToModify;
    while (runCheck) {
        percentage += modificationAmount;
        var newColorModified = modFunc(colorToModify, percentage);
        var oldCr = cr;
        cr = (0, contrast_checker_1.GetContrastRatio)(newColorModified, colorToCompare);
        if (cr >= minimumContrast) {
            colorToReturn = newColorModified;
            runCheck = false;
        }
        if (oldCr === cr) {
            runCheck = false;
            if (cr < minimumContrast) {
                colorToReturn = (0, exports.GetNearestPassingColor)(colorToModify, colorToCompare, modificationAmount, minimumContrast, modFunc === color_modifiers_1.LightenColor ? 'dark' : 'light');
            }
        }
    }
    return colorToReturn;
};
exports.GetNearestPassingColor = GetNearestPassingColor;
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
var GetColorSuggestions = function (colorToModify, colorToCompare, numberOfSuggestions, passingColorModificationAmount, modificationAmount) {
    if (numberOfSuggestions === void 0) { numberOfSuggestions = 4; }
    if (passingColorModificationAmount === void 0) { passingColorModificationAmount = 0.05; }
    if (modificationAmount === void 0) { modificationAmount = 0.1; }
    var initialModification = (0, exports.DetermineColorModification)(colorToModify, colorToCompare, passingColorModificationAmount);
    var passingColor = (0, exports.GetNearestPassingColor)(colorToModify, colorToCompare, passingColorModificationAmount);
    var colorModifier = initialModification === 'light' ? color_modifiers_1.LightenColor : color_modifiers_1.DarkenColor;
    var colorArray = [(0, rgb_conversions_1.ConvertRgbaToRgbaString)(passingColor)];
    for (var i = 1; i < numberOfSuggestions; i++) {
        colorArray.push((0, rgb_conversions_1.ConvertRgbaToRgbaString)(colorModifier(passingColor, i * modificationAmount)));
    }
    var initialDupeColorCount = 0;
    colorArray.forEach(function (color, index) {
        if (index !== 0 && color === colorArray[index - 1]) {
            initialDupeColorCount++;
        }
    });
    if (initialDupeColorCount > 2) {
        var newModifier = initialModification === 'light' ? color_modifiers_1.DarkenColor : color_modifiers_1.LightenColor;
        var newPassingColor = (0, exports.GetNearestPassingColor)(colorToModify, colorToCompare, passingColorModificationAmount, 4.5, initialModification === 'light' ? 'dark' : 'light');
        var newColorArray_1 = [(0, rgb_conversions_1.ConvertRgbaToRgbaString)(newPassingColor)];
        for (var i = 1; i < numberOfSuggestions; i++) {
            newColorArray_1.push((0, rgb_conversions_1.ConvertRgbaToRgbaString)(newModifier(newPassingColor, i * 0.1)));
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
exports.GetColorSuggestions = GetColorSuggestions;


/***/ }),
/* 40 */
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
var ConvertHexToRgbaString = function (hex) {
    var normalizedHex = hex.startsWith('#')
        ? hex.substring(1, hex.length + 1)
        : hex;
    var rgba = {
        r: parseInt(normalizedHex.slice(0, 2), 16),
        g: parseInt(normalizedHex.slice(2, 4), 16),
        b: parseInt(normalizedHex.slice(4, 6), 16),
        a: parseInt(normalizedHex.slice(6, 8), 16) / 255,
    };
    return "rgba(".concat(rgba.r, ", ").concat(rgba.g, ", ").concat(rgba.b, ", ").concat(rgba.a ? rgba.a.toFixed(2) : 1, ")");
};
exports.ConvertHexToRgbaString = ConvertHexToRgbaString;
/**
 * Converts a hex string to an rgba.
 *
 *
 * @param hex - A hex in string format
 * @returns `{ r: 255, g: 255, b: 255, a: 1}`
 *
 */
var ConvertHexToRgba = function (hex) {
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
exports.ConvertHexToRgba = ConvertHexToRgba;


/***/ }),
/* 41 */
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
var SimulateColorblindness = function (rgba, colorblindMatrix) {
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
exports.SimulateColorblindness = SimulateColorblindness;
var GetColorblindMatrixArray = function (colorblindType) {
    switch (colorblindType) {
        case 'Protanopia': {
            return [
                0.152, 1.053, -0.205, 0.0, 0.0, 0.115, 0.786, 0.099, 0.0, 0.0, -0.004,
                -0.048, 1.052, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0,
            ];
        }
        case 'Protanomaly': {
            return [
                0.817, 0.183, 0, 0, 0, 0.333, 0.667, 0, 0, 0, 0, 0.125, 0.875, 0, 0, 0,
                0, 0, 1, 0,
            ];
        }
        case 'Deuteranopia': {
            return [
                0.367, 0.861, -0.228, 0.0, 0.0, 0.28, 0.673, 0.047, 0.0, 0.0, -0.012,
                0.043, 0.969, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0,
            ];
        }
        case 'Deuteranomaly': {
            return [
                0.8, 0.2, 0, 0, 0, 0.258, 0.742, 0, 0, 0, 0, 0.142, 0.858, 0, 0, 0, 0,
                0, 1, 0,
            ];
        }
        case 'Tritanopia': {
            return [
                1.256, -0.077, -0.179, 0.0, 0.0, -0.078, 0.931, 0.148, 0.0, 0.0, 0.005,
                0.691, 0.304, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0,
            ];
        }
        case 'Tritanomaly': {
            return [
                0.967, 0.033, 0, 0, 0, 0, 0.733, 0.267, 0, 0, 0, 0.183, 0.817, 0, 0, 0,
                0, 0, 1, 0,
            ];
        }
        case 'Achromatopsia': {
            return [
                0.213, 0.715, 0.072, 0.0, 0.0, 0.213, 0.715, 0.072, 0.0, 0.0, 0.213,
                0.715, 0.072, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0,
            ];
        }
        case 'Achromatomaly': {
            return [
                0.618, 0.32, 0.062, 0, 0, 0.163, 0.775, 0.062, 0, 0, 0.163, 0.32, 0.516,
                0, 0, 0, 0, 0, 1, 0,
            ];
        }
        default: {
            return [
                1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
                1,
            ];
        }
    }
};
exports.GetColorblindMatrixArray = GetColorblindMatrixArray;
var GetColorblindMatrixString = function (colorblindType) {
    return (0, exports.GetColorblindMatrixArray)(colorblindType).join(', ');
};
exports.GetColorblindMatrixString = GetColorblindMatrixString;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMoveFocusItem = exports.handleSaveNameFocusItem = exports.handleDeleteFocusItem = exports.handleAddFocusItem = exports.handleDeleteSequence = exports.handleSaveNameSequence = exports.handleMoveSequence = exports.handleSelectSequence = exports.handleCreateSequence = exports.handleFocusOrderLoaded = void 0;
var utilities_1 = __webpack_require__(1);
var Sketch = __webpack_require__(2);
var Settings = __webpack_require__(5);
var Group = __webpack_require__(0).Group;
var Style = __webpack_require__(0).Style;
var ShapePath = __webpack_require__(0).ShapePath;
var Rectangle = __webpack_require__(0).Rectangle;
var Text = __webpack_require__(0).Text;
var sequences = [];
var currentSequence = null;
var focusItems = [];
exports.handleFocusOrderLoaded = function () {
    var browserWindow = utilities_1.getBrowserWindow();
    var mainGroupIds = getMainGroupIds();
    if (mainGroupIds && mainGroupIds.length > 0) {
        var sequenceObjs = getSequences(mainGroupIds);
        sequences = sequenceObjs;
        var focusOrderMessage = {
            sequences: sequenceObjs,
        };
        browserWindow.webContents
            .executeJavaScript("focusOrderLoaded('" + JSON.stringify(focusOrderMessage) + "')")
            .catch(console.error);
    }
};
exports.handleCreateSequence = function (sequenceObject) {
    try {
        var browserWindow = utilities_1.getBrowserWindow();
        var sequence_1 = JSON.parse(sequenceObject);
        var existingSequenceName = sequences.find(function (sequenceItem) { return sequenceItem.name === sequence_1.name; });
        if (existingSequenceName) {
            utilities_1.showToast('Sequence names must be unique.');
        }
        else {
            currentSequence = { id: sequence_1.name, name: sequence_1.name };
            sequences.push(currentSequence);
            focusItems = [];
            var focusOrderMessage = {
                sequences: sequences,
                focusItems: focusItems,
            };
            browserWindow.webContents
                .executeJavaScript("focusOrderLoaded('" + JSON.stringify(focusOrderMessage) + "')")
                .catch(console.error);
        }
    }
    catch (error) {
        utilities_1.debug(error);
    }
};
exports.handleSelectSequence = function (sequenceObject) {
    var browserWindow = utilities_1.getBrowserWindow();
    var sequence = JSON.parse(sequenceObject);
    var sequenceId = sequences[sequence.index].id;
    var returnedFocusItems = getFocusItems(sequenceId);
    currentSequence = { id: sequenceId, name: sequence.name };
    focusItems = returnedFocusItems;
    var focusOrderMessage = {
        focusItems: focusItems,
    };
    browserWindow.webContents
        .executeJavaScript("focusOrderLoaded('" + JSON.stringify(focusOrderMessage) + "')")
        .catch(console.error);
};
exports.handleMoveSequence = function (sequenceObject) {
    var browserWindow = utilities_1.getBrowserWindow();
    var sequence = JSON.parse(sequenceObject);
    var movingLayer = sequences[sequence.startingIndex].id;
    var destinationLayer = sequences[sequence.destinationIndex].id;
    moveSequence(movingLayer, destinationLayer, sequence.startingIndex, sequence.destinationIndex);
    var movedItem = sequences[sequence.startingIndex];
    sequences.splice(sequence.startingIndex, 1);
    sequences.splice(sequence.destinationIndex, 0, movedItem);
    var focusOrderMessage = {
        sequences: sequences,
    };
    browserWindow.webContents
        .executeJavaScript("focusOrderLoaded('" + JSON.stringify(focusOrderMessage) + "')")
        .catch(console.error);
};
exports.handleSaveNameSequence = function (sequenceObject) {
    var browserWindow = utilities_1.getBrowserWindow();
    var sequence = JSON.parse(sequenceObject);
    var existingSequenceName = sequences.find(function (sequenceItem) { return sequenceItem.name === sequence.name; });
    if (existingSequenceName) {
        utilities_1.showToast('Sequence names must be unique.');
    }
    else {
        var sequenceId = sequences[sequence.index].id;
        saveNameSequence(sequenceId, sequence.name);
        sequences[sequence.index].name = sequence.name;
        var focusOrderMessage = {
            sequences: sequences,
        };
        browserWindow.webContents
            .executeJavaScript("focusOrderLoaded('" + JSON.stringify(focusOrderMessage) + "')")
            .catch(console.error);
    }
};
exports.handleDeleteSequence = function (sequenceObject) {
    var browserWindow = utilities_1.getBrowserWindow();
    var sequence = JSON.parse(sequenceObject);
    var sequenceId = sequences[sequence.index].id;
    deleteSequence(sequenceId, sequence.index);
    if (currentSequence.id === sequenceId) {
        focusItems = [];
    }
    sequences.splice(sequence.index, 1);
    var focusOrderMessage = {
        sequences: sequences,
    };
    browserWindow.webContents
        .executeJavaScript("focusOrderLoaded('" + JSON.stringify(focusOrderMessage) + "')")
        .catch(console.error);
};
exports.handleAddFocusItem = function () {
    var browserWindow = utilities_1.getBrowserWindow();
    var itemData = addFocusItem(focusItems.length, currentSequence);
    if (itemData.sequenceId) {
        var foundSequence = sequences.find(function (sequence) { return sequence.name === currentSequence.name; });
        foundSequence.id = itemData.sequenceId;
    }
    focusItems.push({
        id: itemData.id,
        name: itemData.name,
    });
    var focusOrderMessage = {
        sequences: sequences,
        focusItems: focusItems,
    };
    browserWindow.webContents
        .executeJavaScript("focusOrderLoaded('" + JSON.stringify(focusOrderMessage) + "')")
        .catch(console.error);
};
exports.handleDeleteFocusItem = function (focusItemObject) {
    var browserWindow = utilities_1.getBrowserWindow();
    var focusItem = JSON.parse(focusItemObject);
    var foId = focusItems[focusItem.index].id;
    deleteFocusItem(foId);
    focusItems.splice(focusItem.index, 1);
    var focusOrderMessage = {
        focusItems: focusItems,
    };
    browserWindow.webContents
        .executeJavaScript("focusOrderLoaded('" + JSON.stringify(focusOrderMessage) + "')")
        .catch(console.error);
};
exports.handleSaveNameFocusItem = function (focusItemObject) {
    var browserWindow = utilities_1.getBrowserWindow();
    var focusItem = JSON.parse(focusItemObject);
    var foId = focusItems[focusItem.index].id;
    saveNameFocusItem(focusItem.index, focusItem.name, foId);
    focusItems[focusItem.index].name = focusItem.name;
    var focusOrderMessage = {
        focusItems: focusItems,
    };
    browserWindow.webContents
        .executeJavaScript("focusOrderLoaded('" + JSON.stringify(focusOrderMessage) + "')")
        .catch(console.error);
};
exports.handleMoveFocusItem = function (focusItemObject) {
    var browserWindow = utilities_1.getBrowserWindow();
    var focusItem = JSON.parse(focusItemObject);
    var movingLayer = focusItems[focusItem.startingIndex].id;
    var destinationLayer = focusItems[focusItem.destinationIndex].id;
    moveFocusItem(movingLayer, destinationLayer);
    var movedItem = focusItems[focusItem.startingIndex];
    focusItems.splice(focusItem.startingIndex, 1);
    focusItems.splice(focusItem.destinationIndex, 0, movedItem);
    var focusOrderMessage = {
        focusItems: focusItems,
    };
    browserWindow.webContents
        .executeJavaScript("focusOrderLoaded('" + JSON.stringify(focusOrderMessage) + "')")
        .catch(console.error);
};
var getMainGroupIds = function () {
    var doc = Sketch.getSelectedDocument();
    var mainGroups = Settings.documentSettingForKey(doc, 'stark-fo-main-groups');
    if (!mainGroups) {
        return [];
    }
    return mainGroups;
};
var getSequences = function (mainGroupIds) {
    var doc = Sketch.getSelectedDocument();
    var sequences = [];
    var mainGroupsToDelete = [];
    mainGroupIds.forEach(function (mainGroupId, index) {
        var mainGroupLayer = doc.getLayerWithID(mainGroupId);
        if (mainGroupLayer) {
            var sequenceLayers_1 = Settings.layerSettingForKey(mainGroupLayer, 'stark-fo-sequences');
            var sequenceGroupsToDelete_1 = [];
            if (sequenceLayers_1) {
                sequenceLayers_1.forEach(function (sequence, index) {
                    if (sequence) {
                        var sequenceGroupLayer = doc.getLayerWithID(sequence.id);
                        if (sequenceGroupLayer) {
                            sequences.push({ id: sequence.id, name: sequence.name });
                        }
                        else {
                            sequenceGroupsToDelete_1.push(index);
                        }
                    }
                    else {
                        sequenceGroupsToDelete_1.push(index);
                    }
                });
                sequenceGroupsToDelete_1.forEach(function (sequenceGroupToDelete) {
                    sequenceLayers_1.splice(sequenceGroupToDelete, 1);
                });
                Settings.setLayerSettingForKey(mainGroupLayer, 'stark-fo-sequences', sequenceLayers_1);
            }
        }
        else {
            mainGroupsToDelete.push(index);
        }
    });
    mainGroupsToDelete.forEach(function (mainGroupToDelete) {
        mainGroupIds.splice(mainGroupToDelete, 1);
    });
    Settings.setDocumentSettingForKey(doc, 'stark-fo-main-groups', mainGroupIds);
    return sequences;
};
var getFocusItems = function (sequenceLayerId) {
    var doc = Sketch.getSelectedDocument();
    var sequenceLayer = doc.getLayerWithID(sequenceLayerId);
    var focusItems = [];
    sequenceLayer.layers.forEach(function (layer, index) {
        var focusItemInfo = Settings.layerSettingForKey(layer, 'stark-fo-item');
        var focusItemLayer = doc.getLayerWithID(focusItemInfo.id);
        var numberLayer = focusItemLayer.layers[focusItemLayer.layers.length - 1];
        if (numberLayer.text != sequenceLayer.layers.length - index) {
            focusItemLayer.name = sequenceLayer.layers.length - index + " - " + focusItemInfo.name;
            numberLayer.text = "" + (sequenceLayer.layers.length - index);
        }
        if (focusItemInfo) {
            focusItems.push({
                associatedId: focusItemInfo.associatedId,
                id: focusItemInfo.id,
                name: focusItemInfo.name,
            });
        }
    });
    focusItems.reverse();
    return focusItems;
};
var moveSequence = function (movingLayerId, destinationLayerId, startingIndex, destinationIndex) {
    var doc = Sketch.getSelectedDocument();
    var movingLayer = doc.getLayerWithID(movingLayerId);
    var destinationLayer = doc.getLayerWithID(destinationLayerId);
    if (movingLayer && destinationLayer) {
        movingLayer.index = destinationLayer.index;
        var mainGroupLayer = doc.getLayerWithID(movingLayer.parent.id);
        if (mainGroupLayer) {
            var sequenceLayers = Settings.layerSettingForKey(mainGroupLayer, 'stark-fo-sequences');
            var movedItem = sequenceLayers[startingIndex];
            sequenceLayers.splice(startingIndex, 1);
            sequenceLayers.splice(destinationIndex, 0, movedItem);
            Settings.setLayerSettingForKey(mainGroupLayer, 'stark-fo-sequences', sequenceLayers);
        }
    }
};
var saveNameSequence = function (id, name) {
    var doc = Sketch.getSelectedDocument();
    var sequenceGroupLayer = doc.getLayerWithID(id);
    var parentArtboard = sequenceGroupLayer.getParentArtboard();
    var mainGroupId = Settings.layerSettingForKey(parentArtboard, 'stark-fo-main-group');
    var mainGroupLayer = doc.getLayerWithID(mainGroupId);
    var sequencesArr = Settings.layerSettingForKey(mainGroupLayer, 'stark-fo-sequences');
    var foundSequence = sequencesArr.find(function (sequence) { return sequence.id === id; });
    if (foundSequence) {
        foundSequence.name = name;
        sequenceGroupLayer.name = name;
        Settings.setLayerSettingForKey(mainGroupLayer, 'stark-fo-sequences', sequencesArr);
    }
};
var deleteSequence = function (id, index) {
    var doc = Sketch.getSelectedDocument();
    var sequenceGroupLayer = doc.getLayerWithID(id);
    var parentArtboard = sequenceGroupLayer.getParentArtboard();
    var mainGroupId = Settings.layerSettingForKey(parentArtboard, 'stark-fo-main-group');
    var mainGroupLayer = doc.getLayerWithID(mainGroupId);
    var sequencesArr = Settings.layerSettingForKey(mainGroupLayer, 'stark-fo-sequences');
    sequencesArr.splice(index, 1);
    sequenceGroupLayer.remove();
    if (sequencesArr && sequencesArr.length > 0) {
        Settings.setLayerSettingForKey(mainGroupLayer, 'stark-fo-sequences', sequencesArr);
    }
};
var addFocusItem = function (itemsLength, currentSequence) {
    var doc = Sketch.getSelectedDocument();
    var selection = doc.selectedLayers;
    var itemData;
    if (selection.isEmpty) {
        utilities_1.showToast('Please select a layer to attach a focus item to.');
    }
    else if (selection.length > 1) {
        utilities_1.showToast('A focus item can only be attached to one layer or group.');
    }
    else {
        var currentArtboard = selection.layers[0].getParentArtboard();
        if (itemsLength === 0) {
            var existingMainGroupId = Settings.layerSettingForKey(currentArtboard, 'stark-fo-main-group');
            var starkGroup = doc.getLayerWithID(existingMainGroupId);
            var sequenceGroup = void 0;
            if (starkGroup) {
                sequenceGroup = createSequenceGroup(currentSequence.name, starkGroup);
                var existingSequences = Settings.layerSettingForKey(starkGroup, 'stark-fo-sequences');
                existingSequences.push({
                    id: sequenceGroup.id,
                    name: sequenceGroup.name,
                });
                Settings.setLayerSettingForKey(starkGroup, 'stark-fo-sequences', existingSequences);
            }
            else {
                starkGroup = createMainGroup(currentArtboard);
                sequenceGroup = createSequenceGroup(currentSequence.name, starkGroup);
                var currentMainGroups = Settings.documentSettingForKey(doc, 'stark-fo-main-groups');
                if (!currentMainGroups) {
                    currentMainGroups = [];
                }
                currentMainGroups.push(starkGroup.id);
                Settings.setDocumentSettingForKey(doc, 'stark-fo-main-groups', currentMainGroups);
                Settings.setLayerSettingForKey(currentArtboard, 'stark-fo-main-group', starkGroup.id);
                Settings.setLayerSettingForKey(starkGroup, 'stark-fo-sequences', [
                    { id: sequenceGroup.id, name: sequenceGroup.name },
                ]);
            }
            sequenceGroup.moveToBack();
            var numberGroup = addNumberGroup(itemsLength + 1, selection.layers[0], sequenceGroup);
            Settings.setLayerSettingForKey(numberGroup, 'stark-fo-item', {
                associatedId: selection.layers[0].id,
                id: numberGroup.id,
                name: selection.layers[0].name,
            });
            itemData = {
                sequenceId: sequenceGroup.id,
                id: numberGroup.id,
                name: selection.layers[0].name,
            };
        }
        else {
            var foundSequenceGroup = doc.getLayerWithID(currentSequence.id);
            if (currentArtboard.id !== foundSequenceGroup.getParentArtboard().id) {
                utilities_1.showToast("Unable to add focus item to this sequence since it's on another artboard.");
            }
            else {
                var numberGroup = addNumberGroup(itemsLength + 1, selection.layers[0], foundSequenceGroup);
                numberGroup.moveToBack();
                Settings.setLayerSettingForKey(numberGroup, 'stark-fo-item', {
                    associatedId: selection.layers[0].id,
                    id: numberGroup.id,
                    name: selection.layers[0].name,
                });
                itemData = {
                    id: numberGroup.id,
                    name: selection.layers[0].name,
                };
            }
        }
    }
    return itemData;
};
var createMainGroup = function (parentArtboard) {
    return new Group({
        name: 'Stark Focus Orders',
        parent: parentArtboard,
        locked: true,
    });
};
var createSequenceGroup = function (name, parent) {
    return new Group({
        name: name,
        parent: parent,
        locked: true,
    });
};
var addNumberGroup = function (number, selectedLayer, parent) {
    var circledNumberRect = new Rectangle(0, 0, 24, 24);
    var returnGroup = new Group({
        name: number + " - " + selectedLayer.name,
        parent: parent,
        frame: new Rectangle(0, 0, 100, 100),
    });
    var dottedLine = new ShapePath({
        frame: {
            x: 12,
            y: 12,
            width: selectedLayer.frame.width,
            height: selectedLayer.frame.height,
        },
        type: Sketch.Types.ShapePath,
        name: 'Dotted Line',
        shapeType: ShapePath.ShapeType.Rectangle,
        style: {
            borders: [
                { color: '#4B4B4E', fillType: Style.FillType.Color, thickness: 2 },
            ],
            borderOptions: { dashPattern: [4, 2] },
        },
        parent: returnGroup,
    });
    var circle = new ShapePath({
        frame: circledNumberRect,
        type: Sketch.Types.ShapePath,
        name: 'Circle',
        shapeType: ShapePath.ShapeType.Oval,
        style: {
            fills: [
                {
                    color: '#381FD1',
                    fillType: Style.FillType.Color,
                },
            ],
            borders: [
                { color: '#FFFFFF', fillType: Style.FillType.Color, thickness: 2 },
            ],
            shadows: [
                {
                    color: '#00000022',
                    blur: 5,
                    x: 2,
                    y: 3,
                    spread: 1,
                },
            ],
        },
        parent: returnGroup,
    });
    var text = new Text({
        type: Sketch.Types.Text,
        name: 'Number',
        text: "" + number,
        style: {
            fontFamily: 'Helvetica',
            textColor: '#FFFFFF',
            fontSize: 16,
            fontWeight: 8,
            borders: [],
        },
        parent: returnGroup,
    });
    text.frame.x = (circle.frame.width - text.frame.width) / 2;
    text.frame.y = (circle.frame.height - text.frame.height) / 2;
    var rect = new Rectangle(0, 0, 100, 100);
    var newRect = rect.changeBasis({
        from: selectedLayer,
        to: selectedLayer.getParentArtboard(),
    });
    returnGroup.adjustToFit();
    positionInArtboard(returnGroup, newRect.x - 12, newRect.y - 12);
    return returnGroup;
};
var parentOffsetInArtboard = function (layer) {
    var offset = { x: 0, y: 0 };
    var parent = layer.parent;
    while (parent.name && parent.type !== 'Artboard') {
        offset.x += parent.frame.x;
        offset.y += parent.frame.y;
        parent = parent.parent;
    }
    return offset;
};
var positionInArtboard = function (layer, x, y) {
    var parentOffset = parentOffsetInArtboard(layer);
    var newFrame = new Sketch.Rectangle(layer.frame);
    newFrame.x = x - parentOffset.x;
    newFrame.y = y - parentOffset.y;
    layer.frame = newFrame;
    updateParentFrames(layer);
};
var updateParentFrames = function (layer) {
    var parent = layer.parent;
    while (parent && parent.name && parent.type !== 'Artboard') {
        parent.adjustToFit();
        parent = parent.parent;
    }
};
var moveFocusItem = function (movingLayerId, destinationLayerId) {
    var doc = Sketch.getSelectedDocument();
    var movingLayer = doc.getLayerWithID(movingLayerId);
    var destinationLayer = doc.getLayerWithID(destinationLayerId);
    movingLayer.index = destinationLayer.index;
    movingLayer.parent.layers.forEach(function (layer, index) {
        var focusItemInfo = Settings.layerSettingForKey(layer, 'stark-fo-item');
        if (focusItemInfo) {
            layer.name = movingLayer.parent.layers.length - index + " - " + focusItemInfo.name;
            layer.layers[layer.layers.length - 1].text = "" + (movingLayer.parent.layers.length - index);
        }
    });
};
var saveNameFocusItem = function (index, name, id) {
    var doc = Sketch.getSelectedDocument();
    var foItemGroupLayer = doc.getLayerWithID(id);
    if (foItemGroupLayer) {
        foItemGroupLayer.name = index + 1 + " - " + name;
        var focusItemInfo = Settings.layerSettingForKey(foItemGroupLayer, 'stark-fo-item');
        focusItemInfo.name = name;
        Settings.setLayerSettingForKey(foItemGroupLayer, 'stark-fo-item', focusItemInfo);
    }
};
var deleteFocusItem = function (id) {
    var doc = Sketch.getSelectedDocument();
    var foItemGroupLayer = doc.getLayerWithID(id);
    var foIglIndex = foItemGroupLayer.index;
    var foItemGroupLayerParent = foItemGroupLayer.parent;
    var focusItemLength = foItemGroupLayerParent.layers.length;
    foItemGroupLayer.remove();
    foItemGroupLayerParent.layers.forEach(function (layer, index) {
        if (layer.index < foIglIndex) {
            var focusItemInfo = Settings.layerSettingForKey(layer, 'stark-fo-item');
            if (focusItemInfo) {
                layer.name = foItemGroupLayerParent.layers.length - index + " - " + focusItemInfo.name;
                layer.layers[layer.layers.length - 1].text = "" + (foItemGroupLayerParent.layers.length - index);
            }
        }
    });
    if (focusItemLength === 1) {
        foItemGroupLayerParent.parent.remove();
    }
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteLandmarkItem = exports.handleAddLandmarkItem = exports.handleLandmarksLoaded = void 0;
var utilities_1 = __webpack_require__(1);
var Sketch = __webpack_require__(2);
var Settings = __webpack_require__(5);
var Group = __webpack_require__(0).Group;
var Style = __webpack_require__(0).Style;
var ShapePath = __webpack_require__(0).ShapePath;
var Rectangle = __webpack_require__(0).Rectangle;
var Text = __webpack_require__(0).Text;
var landmarkArtboards = [];
exports.handleLandmarksLoaded = function () {
    var browserWindow = utilities_1.getBrowserWindow();
    var mainGroupIds = getLandmarkArtgroupIds();
    if (mainGroupIds && mainGroupIds.length > 0) {
        var artboardsObjs = getLandmarkArtboards(mainGroupIds);
        landmarkArtboards = artboardsObjs;
    }
    var landmarksMessage = {
        artboards: landmarkArtboards,
    };
    browserWindow.webContents
        .executeJavaScript("landmarksLoaded('" + JSON.stringify(landmarksMessage) + "')")
        .catch(console.error);
};
exports.handleAddLandmarkItem = function (landmarkObject) {
    var browserWindow = utilities_1.getBrowserWindow();
    var landmarkItem = JSON.parse(landmarkObject);
    var itemData = addLandmarkItem(landmarkItem.landmarkType);
    if (itemData && itemData.artboardId) {
        var foundArtboard = landmarkArtboards.find(function (artboard) { return artboard.artboardId === itemData.artboardId; });
        if (foundArtboard) {
            foundArtboard.landmarks.push({
                type: itemData.type,
                layerId: itemData.layerId,
                layerName: itemData.layerName,
            });
        }
        else {
            landmarkArtboards.push({
                artboardId: itemData.artboardId,
                artboardName: itemData.artboardName,
                landmarks: [
                    {
                        type: itemData.type,
                        layerId: itemData.layerId,
                        layerName: itemData.layerName,
                    },
                ],
            });
        }
    }
    var landmarksMessage = {
        artboards: landmarkArtboards,
    };
    browserWindow.webContents
        .executeJavaScript("landmarksLoaded('" + JSON.stringify(landmarksMessage) + "')")
        .catch(console.error);
};
exports.handleDeleteLandmarkItem = function (landmarkObject) {
    var browserWindow = utilities_1.getBrowserWindow();
    var landmarkItem = JSON.parse(landmarkObject);
    var layerId = landmarkItem.layerId;
    deleteLandmarkItem(layerId);
    landmarkArtboards.forEach(function (artboard) {
        var foundLandmarkIndex = artboard.landmarks.findIndex(function (landmark) {
            return landmark.layerId === layerId;
        });
        if (foundLandmarkIndex > -1) {
            artboard.landmarks.splice(foundLandmarkIndex, 1);
        }
    });
    var foundArtboardIndex = landmarkArtboards.findIndex(function (artboard) {
        return artboard.landmarks.length < 1;
    });
    if (foundArtboardIndex > -1) {
        landmarkArtboards.splice(foundArtboardIndex, 1);
    }
    var landmarksMessage = {
        artboards: landmarkArtboards,
    };
    browserWindow.webContents
        .executeJavaScript("landmarksLoaded('" + JSON.stringify(landmarksMessage) + "')")
        .catch(console.error);
};
var getLandmarkArtgroupIds = function () {
    var doc = Sketch.getSelectedDocument();
    var mainGroups = Settings.documentSettingForKey(doc, 'stark-landmarks-artboards');
    if (!mainGroups) {
        return [];
    }
    return mainGroups;
};
var getLandmarkArtboards = function (mainGroupIds) {
    var doc = Sketch.getSelectedDocument();
    var artboards = [];
    var mainGroupsToDelete = [];
    mainGroupIds.forEach(function (mainGroupId, index) {
        var mainGroupLayer = doc.getLayerWithID(mainGroupId);
        if (mainGroupLayer) {
            var artboardGroupId = Settings.layerSettingForKey(mainGroupLayer, 'stark-landmark-main-group');
            if (artboardGroupId) {
                var artboardGroupLayer = doc.getLayerWithID(artboardGroupId);
                if (artboardGroupLayer) {
                    var mainArtboard = artboardGroupLayer.getParentArtboard();
                    var artboardInfo = {
                        artboardName: mainArtboard.name,
                        artboardId: mainArtboard.id,
                        landmarks: [],
                    };
                    var landmarkItems_1 = [];
                    artboardGroupLayer.layers.forEach(function (layer, index) {
                        var landmarkInfo = Settings.layerSettingForKey(layer, 'stark-landmark-item');
                        if (landmarkInfo) {
                            landmarkItems_1.push({
                                type: landmarkInfo.type,
                                layerId: landmarkInfo.layerId,
                                layerName: landmarkInfo.layerName,
                            });
                        }
                    });
                    landmarkItems_1.reverse();
                    artboardInfo.landmarks = landmarkItems_1;
                    artboards.push(artboardInfo);
                }
                else {
                    mainGroupsToDelete.push(index);
                }
            }
        }
    });
    mainGroupsToDelete.forEach(function (mainGroupToDelete) {
        mainGroupIds.splice(mainGroupToDelete, 1);
    });
    Settings.setDocumentSettingForKey(doc, 'stark-landmarks-artboards', mainGroupIds);
    return artboards;
};
var addLandmarkItem = function (landmarkType) {
    try {
        var doc = Sketch.getSelectedDocument();
        var selection = doc.selectedLayers;
        var itemData = void 0;
        if (selection.isEmpty) {
            utilities_1.showToast('Please select a layer to attach a landmark to.');
        }
        else if (selection.length > 1) {
            utilities_1.showToast('A landmark can only be attached to one layer or group.');
        }
        else if (!selection.layers[0].getParentArtboard()) {
            utilities_1.showToast('A landmark must be attached to a layer in an artboard.');
        }
        else {
            var currentArtboard = selection.layers[0].getParentArtboard();
            var existingMainGroupId = Settings.layerSettingForKey(currentArtboard, 'stark-landmark-main-group');
            var artboardGroup = doc.getLayerWithID(existingMainGroupId);
            var landmarkTypeGroup;
            if (artboardGroup) {
                landmarkTypeGroup = addLandmarkTypeGroup(landmarkType, selection.layers[0], artboardGroup);
            }
            else {
                artboardGroup = createMainGroup(currentArtboard);
                landmarkTypeGroup = addLandmarkTypeGroup(landmarkType, selection.layers[0], artboardGroup);
                Settings.setLayerSettingForKey(currentArtboard, 'stark-landmark-main-group', artboardGroup.id);
                var currentArtboardGroups = Settings.documentSettingForKey(doc, 'stark-landmarks-artboards');
                if (!currentArtboardGroups) {
                    currentArtboardGroups = [];
                }
                currentArtboardGroups.push(currentArtboard.id);
                Settings.setDocumentSettingForKey(doc, 'stark-landmarks-artboards', currentArtboardGroups);
            }
            landmarkTypeGroup.moveToBack();
            Settings.setLayerSettingForKey(landmarkTypeGroup, 'stark-landmark-item', {
                type: landmarkType,
                layerId: landmarkTypeGroup.id,
                layerName: selection.layers[0].name,
            });
            itemData = {
                artboardId: currentArtboard.id,
                artboardName: currentArtboard.name,
                type: landmarkType,
                layerId: landmarkTypeGroup.id,
                layerName: selection.layers[0].name,
            };
        }
        return itemData;
    }
    catch (error) {
        utilities_1.debug(error);
    }
};
var createMainGroup = function (parentArtboard) {
    return new Group({
        name: 'Stark Landmarks',
        parent: parentArtboard,
        locked: true,
    });
};
var addLandmarkTypeGroup = function (landmarkType, selectedLayer, parent) {
    var colors = getLandmarkColors(landmarkType);
    var tagWidth = getLandmarkTypeWidth(landmarkType);
    var rectangleTypeRect = new Rectangle(0, 0, tagWidth, 20);
    var returnGroup = new Group({
        name: landmarkType + " - " + selectedLayer.name,
        parent: parent,
        frame: new Rectangle(0, 0, 100, 100),
    });
    var solidLine = new ShapePath({
        frame: {
            x: 12,
            y: 12,
            width: selectedLayer.frame.width + 24,
            height: selectedLayer.frame.height + 24,
        },
        type: Sketch.Types.ShapePath,
        name: 'Solid Line',
        shapeType: ShapePath.ShapeType.Rectangle,
        style: {
            borders: [
                { color: '#FFFFFF', fillType: Style.FillType.Color, thickness: 2 },
            ],
        },
        parent: returnGroup,
    });
    solidLine.points.forEach(function (point) { return (point.cornerRadius = 8); });
    var dottedLine = new ShapePath({
        frame: {
            x: 12,
            y: 12,
            width: selectedLayer.frame.width + 24,
            height: selectedLayer.frame.height + 24,
        },
        type: Sketch.Types.ShapePath,
        name: 'Dotted Line',
        shapeType: ShapePath.ShapeType.Rectangle,
        style: {
            borders: [
                {
                    color: colors.textColor,
                    fillType: Style.FillType.Color,
                    thickness: 2,
                },
            ],
            borderOptions: { dashPattern: [4, 2] },
        },
        parent: returnGroup,
    });
    dottedLine.points.forEach(function (point) { return (point.cornerRadius = 8); });
    var textContainer = new ShapePath({
        frame: rectangleTypeRect,
        type: Sketch.Types.ShapePath,
        name: 'Rectangle',
        shapeType: ShapePath.ShapeType.Rectangle,
        style: {
            fills: [
                {
                    color: colors.bgColor,
                    fillType: Style.FillType.Color,
                },
            ],
            borders: [
                { color: '#FFFFFF', fillType: Style.FillType.Color, thickness: 2 },
            ],
        },
        parent: returnGroup,
    });
    textContainer.points.forEach(function (point) { return (point.cornerRadius = 2); });
    var text = new Text({
        type: Sketch.Types.Text,
        name: 'Type',
        text: "" + landmarkType,
        style: {
            fontFamily: 'Helvetica',
            textColor: colors.textColor,
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: 8,
            lineHeight: 12,
            borders: [],
        },
        parent: returnGroup,
    });
    textContainer.frame.x = selectedLayer.frame.width + 24 - (tagWidth - 6);
    textContainer.frame.y = 18;
    text.sketchObject.setTextBehaviour(2);
    text.style.verticalAlignment = Text.VerticalAlignment.center;
    text.style.alignment = Text.Alignment.center;
    text.style.kerning = null;
    text.frame.width = textContainer.frame.width;
    text.frame.height = textContainer.frame.height;
    text.frame.x = selectedLayer.frame.width + 24 - (tagWidth - 6);
    text.frame.y = 18;
    var rect = new Rectangle(0, 0, 100, 100);
    var newRect = rect.changeBasis({
        from: selectedLayer,
        to: selectedLayer.getParentArtboard(),
    });
    returnGroup.adjustToFit();
    positionInArtboard(returnGroup, newRect.x - 12, newRect.y - 12);
    return returnGroup;
};
var parentOffsetInArtboard = function (layer) {
    var offset = { x: 0, y: 0 };
    var parent = layer.parent;
    while (parent.name && parent.type !== 'Artboard') {
        offset.x += parent.frame.x;
        offset.y += parent.frame.y;
        parent = parent.parent;
    }
    return offset;
};
var positionInArtboard = function (layer, x, y) {
    var parentOffset = parentOffsetInArtboard(layer);
    var newFrame = new Sketch.Rectangle(layer.frame);
    newFrame.x = x - parentOffset.x;
    newFrame.y = y - parentOffset.y;
    layer.frame = newFrame;
    updateParentFrames(layer);
};
var updateParentFrames = function (layer) {
    var parent = layer.parent;
    while (parent && parent.name && parent.type !== 'Artboard') {
        parent.adjustToFit();
        parent = parent.parent;
    }
};
var deleteLandmarkItem = function (id) {
    var doc = Sketch.getSelectedDocument();
    var landmarkItemGroupLayer = doc.getLayerWithID(id);
    var landmarkItemGroupLayerParent = landmarkItemGroupLayer.parent;
    var landmarkItemLength = landmarkItemGroupLayerParent.layers.length;
    if (landmarkItemLength === 1) {
        var landmarkArtboards_1 = Settings.documentSettingForKey(doc, 'stark-landmarks-artboards');
        var foundIndex = landmarkArtboards_1.findIndex(function (artboard) {
            return artboard === landmarkItemGroupLayerParent.id;
        });
        var splicedArr = landmarkArtboards_1.splice(foundIndex, 1);
        Settings.setDocumentSettingForKey(doc, 'stark-landmarks-artboards', landmarkArtboards_1);
    }
    landmarkItemGroupLayer.remove();
    if (landmarkItemLength === 1) {
        landmarkItemGroupLayerParent.remove();
    }
};
var getLandmarkTypeWidth = function (landmarkType) {
    var landmarkWidth;
    switch (landmarkType) {
        case 'Aside':
            landmarkWidth = 44;
            break;
        case 'Main':
            landmarkWidth = 39;
            break;
        case 'Footer':
            landmarkWidth = 50;
            break;
        case 'Nav':
            landmarkWidth = 34;
            break;
        case 'Form':
            landmarkWidth = 42;
            break;
        case 'Section':
            landmarkWidth = 56;
            break;
        case 'Header':
            landmarkWidth = 54;
            break;
        default:
    }
    return landmarkWidth;
};
var getLandmarkColors = function (landmarkType) {
    var landmarkColors;
    switch (landmarkType) {
        case 'Aside':
            landmarkColors = {
                bgColor: '#E5DDC3',
                textColor: '#56430C',
            };
            break;
        case 'Main':
            landmarkColors = {
                bgColor: '#EBD7EA',
                textColor: '#6B2E66',
            };
            break;
        case 'Footer':
            landmarkColors = {
                bgColor: '#CDE0E8',
                textColor: '#254961',
            };
            break;
        case 'Nav':
            landmarkColors = {
                bgColor: '#CFE3C1',
                textColor: '#214F03',
            };
            break;
        case 'Form':
            landmarkColors = {
                bgColor: '#ECD8DA',
                textColor: '#762E2E',
            };
            break;
        case 'Section':
            landmarkColors = {
                bgColor: '#C3E5D5',
                textColor: '#0A502B',
            };
            break;
        case 'Header':
            landmarkColors = {
                bgColor: '#DDDAEC',
                textColor: '#3E4073',
            };
            break;
        default:
    }
    return landmarkColors;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMinMaxButtonClicked = exports.handleMessageReceivedFromSocket = exports.handleMenuItemClick = void 0;
var color_utilities_1 = __webpack_require__(7);
var utils = __importStar(__webpack_require__(1));
var contrast_1 = __webpack_require__(6);
var Sketch = __webpack_require__(2);
var previousHeight;
exports.handleMenuItemClick = function (menuItem) {
    prepareFeature(menuItem);
};
exports.handleMessageReceivedFromSocket = function (msg) {
    var doc = Sketch.getSelectedDocument();
    var updateColorsObject = JSON.parse(msg);
    var foundLayer = doc.getLayerWithID(updateColorsObject.layerId);
    if (foundLayer) {
        contrast_1.applyColorToLayer(color_utilities_1.ConvertRgbaToHex(updateColorsObject.value, true, true), foundLayer);
    }
};
exports.handleMinMaxButtonClicked = function () {
    var browserWindow = utils.getBrowserWindow();
    var menuItem = browserWindow.getTitle();
    var currentHeight = browserWindow.getBounds().height;
    if (currentHeight == 40) {
        utils.setWindowBounds(menuItem === 'Vision Simulator' ? 448 : 360, previousHeight);
    }
    else {
        previousHeight = currentHeight;
        utils.setWindowBounds(menuItem === 'Vision Simulator' ? 448 : 360, 40);
    }
};
var prepareFeature = function (changeEvent) {
    var browserWindow = utils.getBrowserWindow();
    switch (changeEvent) {
        case 'Main': {
            browserWindow.setTitle('Main');
            utils.setWindowBounds(360, 473);
            break;
        }
        case 'Contrast':
        case 'Check Contrast': {
            browserWindow.setTitle('Contrast');
            utils.setWindowBounds(360, 651);
            break;
        }
        case 'Alt-Text': {
            browserWindow.setTitle('Alt-Text');
            utils.setWindowBounds(360, 561);
            break;
        }
        case 'Typography': {
            browserWindow.setTitle('Typography');
            utils.setWindowBounds(360, 561);
            break;
        }
        case 'Touch Targets': {
            browserWindow.setTitle('Touch Targets');
            utils.setWindowBounds(360, 347);
            break;
        }
        case 'Focus Order': {
            browserWindow.setTitle('Focus Order');
            utils.setWindowBounds(360, 602);
            break;
        }
        case 'Landmarks': {
            browserWindow.setTitle('Landmarks');
            utils.setWindowBounds(360, 586);
            break;
        }
        case 'Vision':
        case 'Vision Simulator': {
            browserWindow.setTitle('Vision Simulator');
            utils.setWindowBounds(448, 621);
            break;
        }
        case 'Settings': {
            browserWindow.setTitle('Settings');
            utils.setWindowBounds(360, 490);
            break;
        }
        case 'Account': {
            browserWindow.setTitle('Account');
            utils.setWindowBounds(360, 490);
            break;
        }
        case 'Upgrade': {
            browserWindow.setTitle('Account');
            utils.setWindowBounds(360, 463);
            break;
        }
        default: {
            browserWindow.setTitle('Main');
            utils.setWindowBounds(360, 463);
            break;
        }
    }
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTouchTargetsSelectionChanged = exports.handleTouchTargetsLoaded = void 0;
var utilities_1 = __webpack_require__(1);
var Sketch = __webpack_require__(2);
exports.handleTouchTargetsLoaded = function () {
    var browserWindow = utilities_1.getBrowserWindow();
    var doc = Sketch.getSelectedDocument();
    var selection = doc.selectedLayers;
    var touchTargetMessage = {
        dimensions: {
            width: 0,
            height: 0,
        },
    };
    if (selection.isEmpty) {
        utilities_1.showToast('Select a layer to check touch targets.');
    }
    else if (selection.length === 1) {
        touchTargetMessage.dimensions.width = Math.trunc(selection.layers[0].frame.width);
        touchTargetMessage.dimensions.height = Math.trunc(selection.layers[0].frame.height);
    }
    else {
        utilities_1.showToast('Too many layers to check touch targets against.');
    }
    browserWindow.webContents
        .executeJavaScript("touchTargetsLoaded('" + JSON.stringify(touchTargetMessage) + "')")
        .catch(console.error);
};
exports.handleTouchTargetsSelectionChanged = function () {
    var browserWindow = utilities_1.getBrowserWindow();
    var doc = Sketch.getSelectedDocument();
    var selection = doc.selectedLayers;
    var touchTargetMessage = {
        dimensions: {
            width: 0,
            height: 0,
        },
    };
    if (selection.isEmpty) {
        utilities_1.showToast('Select a layer to check touch targets.');
    }
    else if (selection.length === 1) {
        touchTargetMessage.dimensions.width = Math.trunc(selection.layers[0].frame.width);
        touchTargetMessage.dimensions.height = Math.trunc(selection.layers[0].frame.height);
    }
    else {
        utilities_1.showToast('Too many layers to check touch targets against.');
    }
    browserWindow.webContents
        .executeJavaScript("touchTargetsLoaded('" + JSON.stringify(touchTargetMessage) + "')")
        .catch(console.error);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.handleApplyFontSizeChange = exports.handleTypographyItemClick = exports.handleTypographyLoaded = void 0;
var utilities_1 = __webpack_require__(1);
var Sketch = __webpack_require__(2);
var SketchDom = __webpack_require__(0);
exports.handleTypographyLoaded = function () {
    var browserWindow = utilities_1.getBrowserWindow();
    var typographyMessage = {
        items: [],
    };
    var page = Sketch.getSelectedDocument().selectedPage;
    var textLayers = SketchDom.find('Text', page);
    textLayers.forEach(function (layer) {
        if (layer.style.fontSize < 12) {
            typographyMessage.items.push({
                name: layer.name,
                size: Math.trunc(layer.style.fontSize),
                fontName: layer.style.fontFamily,
                fontWeight: layer.style.fontWeight,
                layerId: layer.id,
            });
        }
    });
    browserWindow.webContents
        .executeJavaScript("typographyLoaded('" + JSON.stringify(typographyMessage) + "')")
        .catch(console.error);
};
exports.handleTypographyItemClick = function (updateObject) {
    var updatedTypographyObject = JSON.parse(updateObject);
    var doc = Sketch.getSelectedDocument();
    var layer = doc.getLayerWithID(updatedTypographyObject.layerId);
    doc.centerOnLayer(layer);
};
exports.handleApplyFontSizeChange = function (updateObject) {
    var updatedTypographyObject = JSON.parse(updateObject);
    var doc = Sketch.getSelectedDocument();
    var layer = doc.getLayerWithID(updatedTypographyObject.layerId);
    layer.style.fontSize = updatedTypographyObject.fontSize;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGenerate = exports.handleArtboardChanged = exports.handleSimulationTabLoaded = exports.handleVisionSimulatorLoaded = void 0;
var color_utilities_1 = __webpack_require__(7);
var utilities_1 = __webpack_require__(1);
var contrast_1 = __webpack_require__(6);
var Sketch = __webpack_require__(2);
var Style = __webpack_require__(0).Style;
var artboardNames = [];
exports.handleVisionSimulatorLoaded = function () {
    var browserWindow = utilities_1.getBrowserWindow();
    var doc = Sketch.getSelectedDocument();
    artboardNames = getArtboardNames(doc);
    var selectedArtboard = getSelectedArtboard(doc);
    if (artboardNames.length <= 0) {
        utilities_1.showToast('You need at least one artboard to run the vision simulator.');
        return;
    }
    if (!selectedArtboard && doc.selectedLayers.layers.length > 0) {
        utilities_1.showToast('The vision simulator can only be run on artboards.');
        return;
    }
    if (!selectedArtboard) {
        artboardNames[0].isSelected = true;
    }
    browserWindow.webContents
        .executeJavaScript("visionSimulatorLoaded('" + JSON.stringify({
        artboards: artboardNames,
    }) + "')")
        .catch(console.error);
};
exports.handleSimulationTabLoaded = function () {
    var browserWindow = utilities_1.getBrowserWindow();
    var doc = Sketch.getSelectedDocument();
    var selectedArtboard = getSelectedArtboard(doc);
    var artboardToSim = selectedArtboard
        ? selectedArtboard
        : artboardNames[0].id;
    var layer = doc.getLayerWithID(artboardToSim);
    var exportedArtboard = exportArtboard(layer);
    browserWindow.webContents
        .executeJavaScript("simulationTabLoaded('" + JSON.stringify({
        imageData: exportedArtboard,
        sizeData: getArtboardSize(layer),
    }) + "')")
        .catch(console.error);
};
exports.handleArtboardChanged = function (artboardChangedObject) {
    var browserWindow = utilities_1.getBrowserWindow();
    var doc = Sketch.getSelectedDocument();
    var artboardObject = JSON.parse(artboardChangedObject);
    utilities_1.debug(artboardObject);
    var layer = doc.getLayerWithID(artboardObject.artboardId);
    utilities_1.debug(layer);
    var exportedArtboard = exportArtboard(layer);
    artboardNames.forEach(function (artboardName) {
        return (artboardName.isSelected = artboardObject.artboardId === artboardName.id);
    });
    browserWindow.webContents
        .executeJavaScript("simulationTabLoaded('" + JSON.stringify({
        imageData: exportedArtboard,
        sizeData: getArtboardSize(layer),
    }) + "')")
        .catch(console.error);
};
exports.handleGenerate = function (generateClickObject) {
    var generateObject = JSON.parse(generateClickObject);
    var artboard = Sketch.getSelectedDocument().getLayerWithID(generateObject.artboardToGenerate);
    generateSimulatedArtboards(artboard, generateObject.visionSimulatorTypesSelected);
};
var getColorblindSimulatedColor = function (color, colorblindMatrix) {
    var convertedColor = color_utilities_1.ConvertHexToRgba(color);
    return color_utilities_1.ConvertRgbaToRgbaString(color_utilities_1.SimulateColorblindness(convertedColor, colorblindMatrix));
};
var iterateStyles = function (styles, colorblindMatrix) {
    styles.forEach(function (fillOrBorder) {
        if (fillOrBorder.fillType === Style.FillType.Color) {
            var newRgba = getColorblindSimulatedColor(fillOrBorder.color, colorblindMatrix);
            fillOrBorder.color = newRgba;
        }
        else if (fillOrBorder.fillType === Style.FillType.Gradient) {
            fillOrBorder.gradient.stops.forEach(function (stop) {
                var newRgba = getColorblindSimulatedColor(stop.color, colorblindMatrix);
                stop.color = newRgba;
            });
        }
    });
};
var generateSimulatedArtboards = function (artboardToGenerate, visionSimulatorTypes) {
    var artboardName = artboardToGenerate.name;
    var lastPosition = artboardToGenerate.frame.x;
    var artboardsToGroup = [];
    visionSimulatorTypes.forEach(function (type) {
        var newArtboard = artboardToGenerate.duplicate();
        newArtboard.name = artboardName + " - " + type;
        var startPos = lastPosition + newArtboard.frame.width + 100;
        newArtboard.frame.x = startPos;
        lastPosition = startPos;
        artboardsToGroup.push(newArtboard);
        if (type === color_utilities_1.BLURRED) {
            var childLayers = contrast_1.getChildLayers(newArtboard, true);
            childLayers.forEach(function (layer) {
                layer.style.blur = {
                    type: Style.BlurType.Gaussian,
                    radius: 1.75,
                    enabled: true,
                };
            });
        }
        else {
            var colorblindMatrix_1 = color_utilities_1.GetColorblindMatrixArray(type);
            if (newArtboard.background && newArtboard.background.color) {
                var newRgba = getColorblindSimulatedColor(newArtboard.background.color, colorblindMatrix_1);
                contrast_1.applyColorToLayer(newRgba, newArtboard);
            }
            var childLayers = contrast_1.getChildLayers(newArtboard, true);
            childLayers.forEach(function (layer) {
                if (layer.type === 'Shape' ||
                    layer.type === 'ShapePath' ||
                    layer.type === 'Image' ||
                    layer.type === 'Text') {
                    iterateStyles(layer.style.fills, colorblindMatrix_1);
                    iterateStyles(layer.style.borders, colorblindMatrix_1);
                    if (layer.type === 'Text') {
                        var textColor = layer.sketchObject.textColor();
                        var color = {
                            r: textColor.red() * 255,
                            g: textColor.green() * 255,
                            b: textColor.blue() * 255,
                            a: textColor.alpha(),
                        };
                        var newRgba = color_utilities_1.ConvertRgbaStringToRgba(getColorblindSimulatedColor(color_utilities_1.ConvertRgbaToHex(color), colorblindMatrix_1));
                        contrast_1.applyColorToLayer(color_utilities_1.ConvertRgbaToHex(newRgba, true, true), layer);
                    }
                }
            });
        }
    });
    var doc = Sketch.getSelectedDocument();
    doc.centerOnLayer(artboardsToGroup[0]);
    utilities_1.showToast(visionSimulatorTypes.length + " Simulated artboard" + (visionSimulatorTypes.length > 1 ? 's' : '') + " generated.");
};
var getArtboardNames = function (document) {
    var page = document.selectedPage;
    var selectedArtboard = getSelectedArtboard(document);
    var artboardNames = [];
    var regex = /'/g;
    page.layers.forEach(function (layer) {
        (layer.type === 'Artboard' || layer.type === 'SymbolMaster') &&
            artboardNames.push({
                id: layer.id,
                name: layer.name.replace(regex, '’'),
                isSelected: selectedArtboard == layer.id,
            });
    });
    return artboardNames.reverse();
};
var getSelectedArtboard = function (document) {
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
var exportArtboard = function (artboard) {
    var exportOptions = {
        scales: '2',
        formats: 'png',
        output: false,
    };
    return Sketch.export(artboard, exportOptions).toString('base64');
};
var getArtboardSize = function (artboard) {
    return {
        width: artboard.frame.width * 2,
        height: artboard.frame.height * 2,
    };
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = "file://" + context.plugin.urlForResourceNamed("_webpack_resources/382e82375e9410380a7dc4f1a8818864.html").path();

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default');
that['onSelectionChanged'] = __skpm_run.bind(this, 'onSelectionChanged')
