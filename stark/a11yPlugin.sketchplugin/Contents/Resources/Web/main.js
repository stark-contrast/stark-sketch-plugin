var canvas = document.getElementById('canvas');
var mainCanvas = document.getElementById('mainCanvas');

var simSelect = document.getElementById('SimulationSelect');

var artboardSelect = document.getElementById('ArtboardSelect');

var colorNav = document.getElementById('ColorNav');
var contrastNav = document.getElementById('ContrastNav');

var colorSection = document.getElementById('ColorBlindSection');
var contrastSection = document.getElementById('ContrastCheckSection');

var exportButton = document.getElementById('ExportButton');
var contrastCheckButton = document.getElementById('ContrastCheckButton');

var checkerOutput = document.getElementById('CheckerOutput');
var contrastRatio = document.getElementById('ContrastRatio');

var opt1 = document.createElement('option');
opt1.value = "abid_UseWindow";
opt1.innerHTML = "Use Window";
artboardSelect.appendChild(opt1);

for (var i = 0; i < artboardNames.length; i++){
    var opt = document.createElement('option');
    opt.value = "abid_" + artboardNames[i];
    opt.innerHTML = artboardNames[i];
    artboardSelect.appendChild(opt);
}

simSelect.addEventListener("change", function(event) {
  window.status = simSelect.value;
  colorBlindId = simSelect.value;
  runSimulation();
});

artboardSelect.addEventListener("change", function(event) {
  artboardId = artboardSelect.value;
  window.status = artboardSelect.value;
});

colorNav.addEventListener("click", function(event) {
  colorNav.classList.add('nav__item--selected');
  contrastNav.classList.remove('nav__item--selected');

  colorSection.classList.remove('hidden');
  contrastSection.classList.add('hidden');

  canvas.classList.remove('hidden');
  checkerOutput.classList.add('hidden');
});

contrastNav.addEventListener("click", function(event) {
  colorNav.classList.remove('nav__item--selected');
  contrastNav.classList.add('nav__item--selected');

  colorSection.classList.add('hidden');
  contrastSection.classList.remove('hidden');

  canvas.classList.add('hidden');
  checkerOutput.classList.remove('hidden');
});

exportButton.addEventListener('click', download, false);

contrastCheckButton.addEventListener('click', function(event) {
  window.status = 'Check';
});

function addCanvasOpacity() {
  canvas.classList.remove('canvas--hidden');
}

function removeCanvasOpacity() {
  canvas.classList.add('canvas--hidden');
}

function download() {
    var dt = mainCanvas.toDataURL();
    window.status = dt;
}

function updateCheckerOutput(contrastResults) {
  var results = contrastResults.split(',');
  contrastRatio.textContent = results[0];

  var firstColor = results[1].split('|');
  var secondColor = results[2].split('|');

  firstColor[0] = firstColor[0] * 255;
  firstColor[1] = firstColor[1] * 255;
  firstColor[2] = firstColor[2] * 255;

  secondColor[0] = secondColor[0] * 255;
  secondColor[1] = secondColor[1] * 255;
  secondColor[2] = secondColor[2] * 255;

  var leftOutput = document.getElementById('OutputLeft');
  leftOutput.style.backgroundColor = 'rgb(' + Math.round(firstColor[0]) + ',' + Math.round(firstColor[1]) + ',' + Math.round(firstColor[2]) + ')';

  leftOutput.style.color = 'rgb(' + Math.round(secondColor[0]) + ',' + Math.round(secondColor[1]) + ',' + Math.round(secondColor[2]) + ')';


  var rightOutput = document.getElementById('OutputRight');
  rightOutput.style.backgroundColor = 'rgb(' + Math.round(secondColor[0]) + ',' + Math.round(secondColor[1]) + ',' + Math.round(secondColor[2]) + ')';

  rightOutput.style.color = 'rgb(' + Math.round(firstColor[0]) + ',' + Math.round(firstColor[1]) + ',' + Math.round(firstColor[2]) + ')';
}
