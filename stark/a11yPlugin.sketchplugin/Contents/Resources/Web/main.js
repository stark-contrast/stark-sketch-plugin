var simSelect = document.getElementById('SimulationSelect');

simSelect.addEventListener("change", function(event) {
  window.status = simSelect.value;
  var simId = simSelect.value.replace('id_', '');
  runSimulation(simId);
});

document.addEventListener("DOMContentLoaded", function(event) {
  simSelect.value = colorBlindId;
  var simId = simSelect.value.replace('id_', '');
  runSimulation(simId);
});
