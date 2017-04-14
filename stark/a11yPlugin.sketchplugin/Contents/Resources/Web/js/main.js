//
// Select Elements
var simulationSelect = document.getElementById('SimulationSelect');
var artboardSelect = document.getElementById('ArtboardSelect');


//
// Navigation Elements
var colorNav = document.getElementById('ColorNav');
var contrastNav = document.getElementById('ContrastNav');


//
// Section Elements
var colorSection = document.getElementById('ColorSection');
var contrastSection = document.getElementById('ContrastSection');


//
// Button Elements
var exportButton = document.getElementById('ExportButton');
var checkContrastButton = document.getElementById('CheckContrastButton');




//
// Select Events
simulationSelect.addEventListener("change", function(event) {
  window.status = simulationSelect.value;
  runSimulation();
});

artboardSelect.addEventListener("change", function(event) {
  window.status = artboardSelect.value;
});


//
// Navigation Events
colorNav.addEventListener("click", function(event) {
  var checkerOutput = document.getElementById('CheckerOutput');
  var canvasContainer = document.getElementById('CanvasContainer');

  colorNav.classList.add('nav__item--selected');
  contrastNav.classList.remove('nav__item--selected');

  colorSection.classList.remove('hidden');
  contrastSection.classList.add('hidden');

  canvasContainer.classList.remove('hidden');
  checkerOutput.classList.add('hidden');
});

contrastNav.addEventListener("click", function(event) {
  var checkerOutput = document.getElementById('CheckerOutput');
  var canvasContainer = document.getElementById('CanvasContainer');

  colorNav.classList.remove('nav__item--selected');
  contrastNav.classList.add('nav__item--selected');

  colorSection.classList.add('hidden');
  contrastSection.classList.remove('hidden');

  canvasContainer.classList.add('hidden');
  checkerOutput.classList.remove('hidden');

  window.status = "nav-contrast";
});


//
// Button Events
exportButton.addEventListener('click', function(event) {
  var mainCanvas = document.getElementById('SimulationCanvas');
  var dt = mainCanvas.toDataURL();
  window.status = dt;
});

checkContrastButton.addEventListener('click', function(event) {
  window.status = 'Check';
});




//
// Page Functions
for (var i = 0; i < artboardNames.length; i++){
  var opt = document.createElement('option');
  opt.value = "abid_" + artboardNames[i];
  opt.innerHTML = artboardNames[i];
  artboardSelect.appendChild(opt);
}

function addCanvasOpacity() {
  var canvasContainer = document.getElementById('CanvasContainer');
  canvasContainer.classList.remove('canvas--hidden');
}

function removeCanvasOpacity() {
  var canvasContainer = document.getElementById('CanvasContainer');
  canvasContainer.classList.add('canvas--hidden');
}

function updateCheckerOutput(contrastResults) {
  var contrastRatio = document.getElementById('ContrastRatio');

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
