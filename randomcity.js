/**
 * Generates a random city based on the provided locations data and updates the HTML with the city details.
 */
var clickRandomCity = function () {
  // Group locations by country
  var locationsByCountry = locationsJSON.reduce(function (acc, location) {
    if (location.population >= 5000) {
      (acc[location.country] = acc[location.country] || []).push(location);
    }
    return acc;
  }, {});

  // Get an array of countries
  //var countries = Object.keys(locationsByCountry);

  // Filter the countries by the checked continents
  var checkedContinents = getCheckedContinents();
  var tempCountries = filterCountriesByContinent(countries, checkedContinents);

  // Select a random country
  var randomCountry =
    tempCountries[Math.floor(Math.random() * tempCountries.length)];

  console.log(randomCountry);

  // Group locations in the selected country by region
  var locationsByRegion = locationsByCountry[randomCountry.Country].reduce(
    function (acc, location) {
      (acc[location.region] = acc[location.region] || []).push(location);
      return acc;
    },
    {}
  );

  // Get an array of regions in the selected country
  var regions = Object.keys(locationsByRegion);

  // Select a random region
  var randomRegion = regions[Math.floor(Math.random() * regions.length)];

  // Select a random location from the chosen region
  var locationsInRegion = locationsByRegion[randomRegion];
  var randomLocation =
    locationsInRegion[Math.floor(Math.random() * locationsInRegion.length)];

  // Update the HTML with the random city details
  document.getElementById("randomCityName").innerText = randomLocation.name;
  document.getElementById("randomCityLatitude").innerText =
    randomLocation.latitude;
  document.getElementById("randomCityLongitude").innerText =
    randomLocation.longitude;
  document.getElementById("randomCityRegion").innerText = randomLocation.region;
  document.getElementById("randomCityCountry").innerText =
    randomCountry.Country;
  document.getElementById("randomCityPopulation").innerText =
    randomLocation.population;
};

var copyRandomCityToClipboard = function () {
  var randomCity = document.getElementById("randomCityName").innerText;
  navigator.clipboard.writeText(randomCity);
};

var openRandomCityInGoogleMaps = function () {
  var lat = document.getElementById("randomCityLatitude").innerText;
  var lon = document.getElementById("randomCityLongitude").innerText;
  openGoogleMaps(lat, lon);
};

var openGoogleMaps = function (latitude, longitude) {
  var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
  window.open(url);
};

// Get the list of checked continents
var getCheckedContinents = function () {
  var continents = ["AF", "AS", "EU", "NA", "OC", "SA", "AN"]; // Add all the two letter continent codes here
  var checkedContinents = [];
  continents.forEach(function (continent) {
    var checkbox = document.getElementById("random" + continent);
    if (checkbox && checkbox.checked) {
      checkedContinents.push(continent);
    }
  });
  return checkedContinents;
};

// Filter the countries array
var filterCountriesByContinent = function (countries, checkedContinents) {
  return countries.filter(function (country) {
    return checkedContinents.includes(country.Continent);
  });
};
