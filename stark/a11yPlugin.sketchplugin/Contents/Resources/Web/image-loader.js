var oldRgb = [];
var oldFilteredRGB;

function runSimulation() {
  var simType = colorBlindId.replace('cbid_', '');
  var canvas = document.getElementById('mainCanvas');
  var ctx = canvas.getContext('2d');

  var img = new Image();
  img.onload = function () {
    var width = img.width;
    var height = img.height;
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    ctx.drawImage(img, 0, 0, width, height,
                        0, 0, canvas.width, canvas.height);
    var pixels = ctx.getImageData(0, 0, width, height);

    for (var i = 0; i < pixels.data.length; i += 4) {
      var filteredRGB;
      var rgb = [pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]];

      if (oldRgb[0] == rgb[0] && oldRgb[1] == rgb[1] && oldRgb[2] == rgb[2]) {
        filteredRGB = oldFilteredRGB;
      } else {
        filteredRGB = fBlind[simType](rgb);
        oldFilteredRGB = filteredRGB;
        oldRgb = rgb;
      }

      pixels.data[i    ] = filteredRGB[0];
      pixels.data[i + 1] = filteredRGB[1];
      pixels.data[i + 2] = filteredRGB[2];
    }

    ctx.putImageData(pixels, 0, 0);
  }

  img.src = "snapshot.png" + "?ts=" + new Date().getTime();
}
