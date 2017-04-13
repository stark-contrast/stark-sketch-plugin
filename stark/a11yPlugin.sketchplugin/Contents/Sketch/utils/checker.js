@import 'utils/nibui.js';

var COSCRIPT;

function checkContrast(context) {
  var sketch = context.api();
  var selection = sketch.selectedDocument.selectedLayers;
  var currentArtboard = context.document.currentPage().currentArtboard();
  var validSelection = validateSelection(selection, currentArtboard);

  if (validSelection) {
    // Get colors to compare against
    var layers = selection.nativeLayers;
    var firstColor = getColor(layers[0]);
    var secondColor = selection.length == 1
      ? currentArtboard.backgroundColor()
      : getColor(layers[1]);

    if (selection.length == 1) {
      validSelection = !(currentArtboard.backgroundColor().alpha() < 1);
    } else {
      validSelection = !(firstColor.alpha() < 1);
    }

    if (validSelection) {
      if (secondColor.alpha() < 1) {
        var newSecondColor = convertAlpha(firstColor, secondColor, secondColor.alpha());
        secondColor = [MSColor colorWithRed:newSecondColor[0]/255 green:newSecondColor[1]/255 blue:newSecondColor[2]/255 alpha:1];
      }

      var contrastRatio = getContrastRatio(firstColor, secondColor);
      contrastRatio = Math.round(contrastRatio * 100) / 100;

      var returnValue = (contrastRatio + ',' +
        firstColor.red() + '|' + firstColor.green() + '|' + firstColor.blue() +
        ',' +
        secondColor.red() + '|' + secondColor.green() + '|' + secondColor.blue());

      return returnValue;

    } else {
      sketch.alert("You must select no more than two layers of any combination of Text, Shapes, or Artboards", "Error");
    }
  }
}

function validateSelection(layers, currentArtboard) {
  var isValid = true;
  if ((layers.length == 1 && currentArtboard) || layers.length == 2) {
    layers.iterate(function(layer) {
      if (layer.isGroup || layer.isImage || layer.isPage) {
        isValid = false;
      }
    });
  } else {
    isValid = false;
  }

  return isValid;
}

function getColor(layer) {
	var color;

  if (layer.class() == MSTextLayer) {
    color = layer.textColor();
  } else {
    color = layer.style().fills().firstObject().color();
  }

  return color;
}

function convertAlpha(color1, color2, alpha) {
  var weight = alpha * 100;

  var rgbArray2 = [color1.red(), color1.green(), color1.blue()];
  var rgbArray1 = [color2.red(), color2.green(), color2.blue()];

  var returnArray = [];
  for(var i = 0; i <= 2; i++) {
    var v1 = Math.round(rgbArray1[i] * 255);
    var v2 = Math.round(rgbArray2[i] * 255);

    returnArray.push(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));
  }

  return returnArray;
}

function getContrastRatio(firstColor, secondColor) {
  firstColor = getRgb(firstColor);
  secondColor = getRgb(secondColor);

  return (Math.max(firstColor, secondColor) + 0.05)/(Math.min(firstColor, secondColor) + 0.05);
}

function getRgb(color) {
  var r = color.red();
  var g = color.green();
  var b = color.blue();

  return (0.2126 * calculateColor(r) + 0.7152 * calculateColor(g) + 0.0722 * calculateColor(b));
}

function calculateColor(color) {
  return (color <= 0.03928) ? color/12.92 : Math.pow(((color + 0.055)/1.055), 2.4);
}
