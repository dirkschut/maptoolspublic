var settingColorMiss = "#FF0000";
var settingColorHit = "#00FF00";

var clickSaveSettings = function () {
  settingColorHit = document.getElementById("settingColorHit").value;
  settingColorMiss = document.getElementById("settingColorMiss").value;
  applyGuessListColors();
};

var loadDefaultSettings = function () {
  console.log("Loading default settings");
  document.getElementById("settingColorHit").value = settingColorHit;
  document.getElementById("settingColorMiss").value = settingColorMiss;
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

document.addEventListener("DOMContentLoaded", function (event) {
  loadDefaultSettings();
});
