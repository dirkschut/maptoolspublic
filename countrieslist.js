var updateCountriesList = function () {
  var countriesList = document.getElementById("countriesList");
  countriesList.innerHTML = "";
  countries.forEach(function (country) {
    if (hasCountryBeenGuessed(country.Country)) {
      return;
    }
    var checkbox = document.getElementById(`continent${country.Continent}`);
    if (checkbox && !checkbox.checked) {
      return;
    }
    var countryElement = document.createElement("li");
    countryElement.innerHTML = country.Country;
    countriesList.appendChild(countryElement);
  });
};
