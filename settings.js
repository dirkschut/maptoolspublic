var settingColorMiss = "#FF0000";
var settingColorHit = "#00FF00";

var clickSaveSettings = function () {
  settingColorHit = document.getElementById("settingColorHit").value;
  settingColorMiss = document.getElementById("settingColorMiss").value;
};

var loadDefaultSettings = function () {
  console.log("Loading default settings");
  document.getElementById("settingColorHit").value = settingColorHit;
  document.getElementById("settingColorMiss").value = settingColorMiss;
};

document.addEventListener("DOMContentLoaded", function (event) {
  loadDefaultSettings();
});
