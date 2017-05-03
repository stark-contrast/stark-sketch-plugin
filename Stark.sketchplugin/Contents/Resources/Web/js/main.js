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
var starkLogoButton = document.getElementById('StarkLogoButton');

var zoomOutButton = document.getElementById('ZoomOutButton');
var zoomInButton = document.getElementById('ZoomInButton');


// Defaults
var canvasScale = 1;



//
// Select Events
simulationSelect.addEventListener("change", function(event) {
  window.status = simulationSelect.value;
  runSimulation();
});

artboardSelect.addEventListener("change", function(event) {
  window.status = artboardSelect.value;

  var zoomContainer = document.getElementById('ZoomContainer');

  if (artboardSelect.value == 'abid_UseWindow') {
    zoomContainer.style.display = 'none';
  } else {
    zoomContainer.style.display = 'flex';
  }
});


//
// Navigation Events
colorNav.addEventListener("click", function(event) {
  var checkerOutput = document.getElementById('CheckerOutput');
  var canvasContainer = document.getElementById('CanvasContainer');

  colorNav.classList.add('nav__item--selected');
  colorNav.classList.remove('not-selected');
  contrastNav.classList.remove('nav__item--selected');

  contrastSection.classList.add('fade-out-left');

  setTimeout(function(){
    colorSection.classList.remove('fade-in-left');
    colorSection.classList.remove('hidden');
    contrastSection.classList.add('hidden');
    colorSection.classList.add('fade-in-right');

    setTimeout(function(){
      window.status = "nav-color";
      setTimeout(function(){
        canvasContainer.classList.remove('hidden');
        checkerOutput.classList.add('hidden');
      }, 100);
    }, 100);
  }, 75);
});

contrastNav.addEventListener("click", function(event) {
  var checkerOutput = document.getElementById('CheckerOutput');
  var canvasContainer = document.getElementById('CanvasContainer');

  colorNav.classList.remove('nav__item--selected');
  colorNav.classList.add('not-selected');
  contrastNav.classList.add('nav__item--selected');

  colorSection.classList.add('fade-out-right');

  setTimeout(function(){
    contrastSection.classList.remove('fade-out-right');
    colorSection.classList.add('hidden');
    contrastSection.classList.remove('hidden');
    contrastSection.classList.add('fade-in-left');

    setTimeout(function(){
      window.status = "nav-contrast";
      setTimeout(function(){
        canvasContainer.classList.add('hidden');
        checkerOutput.classList.remove('hidden');
      }, 100);
    }, 100);
  }, 75);
});


//
// Button Events
exportButton.addEventListener('click', function(event) {
  var mainCanvas = document.getElementById('SimulationCanvas');
  var dt = mainCanvas.toDataURL();
  window.status = dt;
});

zoomInButton.addEventListener('click', function(event) {
  var canvas = document.getElementById('SimulationCanvas');
  zoomOutButton.disabled = false;
  canvasScale += .1;
  canvas.style.transform = ("scale(" + canvasScale + ")");
});

zoomOutButton.addEventListener('click', function(event) {
  var canvas = document.getElementById('SimulationCanvas');
  var newCanvasScale = canvasScale - .1;

  if (newCanvasScale <= 0.1) {
    zoomOutButton.disabled = true;
  } else {
    canvasScale -= .1;
    zoomOutButton.disabled = false;
    canvas.style.transform = ("scale(" + canvasScale + ")");
  }
});

checkContrastButton.addEventListener('click', function(event) {
  window.status = 'Check';
});

starkLogoButton.addEventListener('click', function(event) {
  window.status = 'LogoClicked';
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

function simulateContrastClick() {
  contrastNav.click();
}

function updateCheckerOutput(contrastResults) {
  var contrastRatio = document.getElementById('ContrastRatio');

  var results = contrastResults.split(',');
  contrastRatio.textContent = results[0] + ':1';


  if (results[0] >= 3.0) {
    document.getElementById('ResultsLargeAaPass').classList.remove('hidden');
    document.getElementById('ResultsLargeAaFail').classList.add('hidden');
  }

  if (results[0] >= 4.5) {
    document.getElementById('ResultsNormalAaPass').classList.remove('hidden');
    document.getElementById('ResultsNormalAaFail').classList.add('hidden');

    document.getElementById('ResultsLargeAaaPass').classList.remove('hidden');
    document.getElementById('ResultsLargeAaaFail').classList.add('hidden');
  }

  if (results[0] >= 7.0) {
    document.getElementById('ResultsNormalAaaPass').classList.remove('hidden');
    document.getElementById('ResultsNormalAaaFail').classList.add('hidden');
  }

  if (results[0] < 3.0) {
    document.getElementById('ResultsLargeAaPass').classList.add('hidden');
    document.getElementById('ResultsLargeAaFail').classList.remove('hidden');
  }

  if (results[0] < 4.5) {
    document.getElementById('ResultsNormalAaPass').classList.add('hidden');
    document.getElementById('ResultsNormalAaFail').classList.remove('hidden');

    document.getElementById('ResultsLargeAaaPass').classList.add('hidden');
    document.getElementById('ResultsLargeAaaFail').classList.remove('hidden');
  }

  if (results[0] < 7.0) {
    document.getElementById('ResultsNormalAaaPass').classList.add('hidden');
    document.getElementById('ResultsNormalAaaFail').classList.remove('hidden');
  }

  document.getElementById('ResultsNormalAaNone').classList.add('hidden');
  document.getElementById('ResultsNormalAaaNone').classList.add('hidden');
  document.getElementById('ResultsLargeAaNone').classList.add('hidden');
  document.getElementById('ResultsLargeAaaNone').classList.add('hidden');

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

window.onload = function(e){
  if (artboardSelect.value == 'abid_UseWindow') {
    var zoomContainer = document.getElementById('ZoomContainer');
    zoomContainer.style.display = 'none;'
  }

  window.status = "windowLoaded";
}
