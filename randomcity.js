/**
 * Generates a random city based on the provided locations data and updates the HTML with the city details.
 */
var clickRandomCity = function () {
  var filteredLocations = locationsJSON.filter(function (location) {
    return location.population >= 5000;
  });

  var randomIndex = Math.floor(Math.random() * filteredLocations.length);
  var randomCity = filteredLocations[randomIndex];

  var randomCityDiv = document.getElementById("randomCity");
  randomCityDiv.innerHTML = `
    Random city: ${randomCity.name}<br />
    Region: ${randomCity.region}<br />
    Country: ${randomCity.country}<br />
    Population: ${randomCity.population}
`;
};
