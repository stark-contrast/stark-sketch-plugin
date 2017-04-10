var simSelect = document.getElementById('SimulationSelect');

var artboardSelect = document.getElementById('ArtboardSelect');

var opt1 = document.createElement('option');
opt1.value = "";
opt1.innerHTML = "";
artboardSelect.appendChild(opt1);

for (var i = 0; i < artboardNames.length; i++){
    var opt = document.createElement('option');
    opt.value = "abid_" + artboardNames[i];
    opt.innerHTML = artboardNames[i];
    artboardSelect.appendChild(opt);
}

simSelect.addEventListener("change", function(event) {
  window.status = simSelect.value;
  var simId = simSelect.value.replace('id_', '');
  runSimulation(simId);
});

artboardSelect.addEventListener("change", function(event) {
  window.status = artboardSelect.value;
});

document.addEventListener("DOMContentLoaded", function(event) {
  simSelect.value = colorBlindId;
  var simId = simSelect.value.replace('id_', '');
  runSimulation(simId);
});
