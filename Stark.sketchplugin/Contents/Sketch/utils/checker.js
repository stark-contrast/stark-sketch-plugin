function checkContrast(context) {
  var currentDocument = context.document;
  var selection = currentDocument.selectedLayers().containedLayers();
  var currentArtboard = currentDocument.currentPage().currentArtboard();
  var isValidSelection = validateSelection(selection, currentArtboard);

  if (isValidSelection) {
    var firstColor = getColor(selection[0]);
    var secondColor = selection.length == 1
      ? currentArtboard.backgroundColor()
      : getColor(selection[1]);

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
  }
}

function validateSelection(layers, currentArtboard) {
  var app = [NSApplication sharedApplication];
  var isValid = true;

  // They must have at least one layer selected that's on an artoboard
  // or two layers selected
  if ((layers.length == 1 && currentArtboard) || layers.length == 2) {
    for (var i = 0; i < layers.length; ++i) {
      var currentLayerClass = layers[i].class();

      // Groups, images, and pages are not valid selections since they can't
      // have fills or backgrounds
      if (currentLayerClass == "MSLayerGroup" || currentLayerClass == "MSBitmapLayer" || currentLayerClass == "MSPage") {
        isValid = false;
        [app displayDialog:"The two layers you select cannot be Groups, Images or Pages. Text, Shapes, and Artboards are A-OK!" withTitle:"Unable to Check Contrast."];
      }
    }

  //
  // Can't check contrast of zero layers.
  } else if (layers.length == 0) {
    isValid = false;
    [app displayDialog:"At least two layers need to be selected in order for the Contrast Checker to work. They can be Text, Shapes or Artboards." withTitle:"No layers selected."];

  //
  // More than two layers is too many.
  } else if (layers.length > 2) {
    isValid = false;
    [app displayDialog:"You must select no more than two layers. They can be Text, Shapes or Artboards." withTitle:"Unable to Check Contrast."];
  }

  // If their selection is valid, we have to also ensure that at least one of
  // their layers is full opacity since we'd have no idea what color we'd be
  // comparing otherwise.
  if (isValid) {
    var firstColor = getColor(layers[0]);
    var secondColor = layers.length == 1
      ? currentArtboard.backgroundColor()
      : getColor(layers[1]);

    // If they only have one layer selected, we ensure that the artboard
    // is at full opacity or this won't work.
    if (layers.length == 1) {

      if (currentArtboard.backgroundColor().alpha() < 1) {
        isValid = false;
        [app displayDialog:"Your current Artboard needs to be at full opacity in order for the Contrast Checker to work." withTitle:"Unable to Check Contrast."];
      }

    // They've selected two layers and we just need to check the first color to
    // make sure it at least is at full opacity.
    } else {
      if (firstColor.alpha() < 1) {
        isValid = false;
        [app displayDialog:"At least one of your selected layer colors needs to be at full opacity in order for the Contrast Checker to work." withTitle:"Unable to Check Contrast."];
      }
    }
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
