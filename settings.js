var settingColorMiss = "#FF0000";
var settingColorHit = "#00FF00";
var settingMinimumPopulation = 5000;

var clickSaveSettings = function () {
  settingColorHit = document.getElementById("settingColorHit").value;
  settingColorMiss = document.getElementById("settingColorMiss").value;
  settingMinimumPopulation = document.getElementById(
    "settingMinimumPopulation"
  ).value;
  applyGuessListColors();
  applyMinimumPopulation();
};

var loadDefaultSettings = function () {
  console.log("Loading default settings");
  document.getElementById("settingColorHit").value = settingColorHit;
  document.getElementById("settingColorMiss").value = settingColorMiss;
  document.getElementById("settingMinimumPopulation").value =
    settingMinimumPopulation;
};

var applyGuessListColors = function () {
  var hits = document.getElementsByClassName("hitText");
  var misses = document.getElementsByClassName("missText");
  for (var i = 0; i < hits.length; i++) {
    hits[i].style.color = settingColorHit;
  }
  for (var i = 0; i < misses.length; i++) {
    misses[i].style.color = settingColorMiss;
  }
};

var applyMinimumPopulation = function () {
  clearLocationMarkers();
  addLocationMarkers();
};

document.addEventListener("DOMContentLoaded", function (event) {
  loadDefaultSettings();
});
