var updateCountriesList = function () {
  var countriesList = document.getElementById("countriesList");
  countriesList.innerHTML = "";

  var countryHeader = document.createElement("tr");
  countryHeader.innerHTML = "<th>Country</th><th>Capital</th>";
  countriesList.appendChild(countryHeader);

  countries.forEach(function (country) {
    if (hasCountryBeenGuessed(country.Country)) {
      return;
    }

    //Check Continent Filter
    var checkbox = document.getElementById(`continent${country.Continent}`);
    if (checkbox && !checkbox.checked) {
      return;
    }
    var countryElement = document.createElement("tr");

    //Check Hemisphere Filter
    var checkedNorth = document.getElementById("hemisphereNorth").checked;
    var checkedSouth = document.getElementById("hemisphereSouth").checked;
    if (checkedNorth && !checkedSouth && !country.InNorthernHemisphere) {
      return;
    } else if (checkedSouth && !checkedNorth && !country.InSouthernHemisphere) {
      return;
    }

    var countryCell = document.createElement("td");
    countryCell.innerHTML = country.Country;
    countryElement.appendChild(countryCell);

    var capitalCell = document.createElement("td");
    capitalCell.innerHTML = country.Capital;
    countryElement.appendChild(capitalCell);

    countriesList.appendChild(countryElement);
  });
};
