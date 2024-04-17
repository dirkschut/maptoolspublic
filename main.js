var guesses = [];

function logError(error) {
  console.error(error);
  document.getElementById("error-message").innerHTML = `<div>${
    error.message
  }</div> ${document.getElementById("error-message").innerHTML}`;
}

function getCountryCapital(countryName) {
  switch (countryName) {
    case "Ireland":
      countryName = "Republic of Ireland";
      break;
    case "India":
      countryName = "Republic of India";
      break;
    case "United States":
      countryName = "United States of America";
      break;
    case "Oman":
      countryName = "Sultanate of Oman";
      break;
    case "China":
      countryName = "cn";
      break;
    case "Dominica":
      countryName = "Commonwealth of Dominica";
      break;
    case "Timor Leste":
      countryName = "Timor-Leste";
      break;
    case "U.S. Virgin Islands":
      countryName = "United States Virgin Islands";
      break;
  }
  return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => response.json())
    .then((data) => {
      switch (countryName) {
        case "Macao":
          data[0].capital = ["Macao"];
          data[0].name.common = "Macao";
          break;
        case "Curacao":
          data[0].name.common = "Curacao";
          break;
        case "cn":
          countryName = "China";
          break;
        case "Antarctica":
          data[0].capital = ["McMurdo"];
          break;
      }
      if (data && data[0] && data[0].capital && data[0].capital[0]) {
        if (
          data[0].name.common != countryName &&
          data[0].name.official != countryName
        ) {
          logError(new Error(`Country name ${countryName} is not correct`));
        }
        return `${data[0].capital[0]}, ${data[0].name.common}`;
      } else {
        throw new Error(`Country data for ${countryName} is not available`);
      }
    })
    .catch((error) => {
      logError(error);
    });
}

function clickRecapCities() {
  var recapinput = document.getElementById("recapinput").value;
  var recapLines = recapinput.split("\n");
  var country = recapLines[0].split("Country: ")[1];
  var checkedLocations = [];
  console.log(country);
  recapLines.forEach((line) => {
    if (line.includes("Answer is not")) {
      const text = `${line.split("Answer is not")[1].trim()}, ${country}`;
      if (!checkedLocations.includes(text)) {
        addCircle(text, 100000, "red", true);
        checkedLocations.push(text);
      } else {
        logError(new Error(`Location ${text} is already recapped`));
      }
    } else if (line.includes("Answer is under 100km away from")) {
      const text = `${line.split("Answer is under 100km away from")[1].trim()}`;
      addCircle(text, 100000, "green", true);
      addCircle(text, 50000, "red", true);
      checkedLocations.push(text);
    } else if (line.includes("Answer is under 50km away from")) {
      const text = `${line.split("Answer is under 50km away from")[1].trim()}`;
      addCircle(text, 50000, "green", true);
      addCircle(text, 20000, "red", true);
      checkedLocations.push(text);
    }
  });
}

function clickRecapCountry() {
  var recapinput = document.getElementById("recapinput").value;
  var recapLines = recapinput.split("\n");
  recapLines.forEach((line) => {
    if (line.includes("Answer is not in")) {
      const text = line.split("Answer is not in")[1].trim();
      getCountryCapital(text).then((capital) => {
        if (!capital) {
          logError(new Error(`Country data for ${text} is not available`));
        } else {
          addCircle(capital, 100000, "red", true);
        }
      });
    }
  });
}

async function updateCountries() {
  document.getElementById("countries").innerHTML = "";
  for (const country of countries) {
    if (!guesses.some((guess) => guess.location.countryName === country)) {
      const capital = await getCountryCapital(country);
      document.getElementById("countries").innerHTML += `<li>${capital}</li>`;
    }
  }
}

function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// Function to handle circle button click
const clickCircleButton = function (actions) {
  actions.forEach(function (action) {
    // Add a circle for each action
    addCircle(
      document.getElementById("name").value,
      action.radius * 1000,
      action.color,
      action.pin
    );
  });
};

function levenshteinDistance(a, b) {
  const matrix = [];

  // increment along the first column of each row
  let i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  let j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
}

// Function to fetch data from geonames API
const fetchData = async function (name) {
  try {
    const exactMatch = locationsJSON.find((location) => {
      const locationString = `${location.name}, ${location.region}, ${location.country}`;
      return locationString.toLowerCase() === name.toLowerCase();
    });

    if (exactMatch) {
      console.log(`Exact match found: ${exactMatch.name}`);
      return exactMatch;
    }

    const capitalMatch = locationsJSON.find((location) => {
      const locationString = `${location.name}, ${location.country}`;
      return locationString.toLowerCase() === name.toLowerCase();
    });
    if (capitalMatch) {
      console.log(`Capital match found: ${capitalMatch.name}`);
      return capitalMatch;
    }

    console.log(`No exact match found. Searching for: ${name}`);

    const response = locationsJSON.reduce(
      (closestMatch, location) => {
        const locationString = `${location.name}, ${location.region}, ${location.country}`;
        const distance = levenshteinDistance(
          locationString.toLowerCase(),
          name.toLowerCase()
        );
        if (distance < closestMatch.distance) {
          return { location, distance };
        }
        return closestMatch;
      },
      { location: null, distance: Infinity }
    ).location;

    if (!response) {
      throw new Error(`No match found in locationsJSON for ${name}`);
    }

    console.log(response);
    return response;
  } catch (error) {
    logError(error);
  }
};

// Function to find location from geonames data
const findLocation = function (geonamesData, searchterm) {
  // Find the first populated place or city in the geonames data
  // geonamesData: array of objects from geonames API
  // Returns: first object that matches the condition or undefined
  const location = geonamesData.find((item) => item.fcl === "P");

  // If no location is found, throw an error
  if (!location) {
    throw new Error(
      `No location found in geonames data with serach term ${searchterm}`
    );
  }

  // Return the found location
  return location;
};

// Function to get coordinates from geonames API
// name: string, name of the location to fetch data for
// Returns: location object or throws an error
const getCoords = async function (name) {
  const geonamesData = await fetchData(name.trim());
  return geonamesData;
};

// Function to create a circle on the map
// location: object, contains lat and lng properties
// radius: number, radius of the circle
// color: string, color of the circle
// Returns: Leaflet circle object
const createCircle = function (location, radius, color) {
  return L.circle([location.latitude, location.longitude], {
    color: color,
    fillColor: color,
    fillOpacity: 0.05,
    radius: radius,
  }).addTo(map);
};

// Function to add a pin to the map
// location: object, contains lat and lng properties
// Returns: Leaflet marker object
const addPin = function (location) {
  const marker = L.marker([location.latitude, location.longitude]).addTo(map);
  marker.bindPopup(location.name).openPopup();
  return marker;
};

// Function to add a circle to the map
// name: string, name of the location to fetch data for
// radius: number, radius of the circle
// color: string, color of the circle
// pin: boolean, whether to add a pin to the map
// Returns: nothing
const addCircle = async function (name, radius, color, pin) {
  try {
    // Fetch location data
    const location = await getCoords(name);
    console.log(location);

    // If no location is found, throw an error
    if (!location) {
      throw new Error(`Location ${name} not found`);
    }

    // Create a circle on the map
    const circle = createCircle(location, radius, color);
    var hit = false;
    if (color === "green") {
      hit = true;
    }
    var guessdata = {
      location: location,
      hit: hit,
      radius: radius,
      name: name,
    };
    guesses.push(guessdata);

    // If pin is true, add a pin to the map
    if (pin) {
      const marker = addPin(location);
    }

    // If the centerCamera checkbox is checked, center the map on the location
    if (document.getElementById("centerCamera").checked) {
      map.setView([location.latitude, location.longitude], 8);
    }
  } catch (error) {
    logError(error);
  }
};

const getPointIsWithinCircle = function (
  pointLat,
  pointLng,
  circleLat,
  circleLng,
  circleRadius
) {
  const distance = map.distance(
    L.latLng(pointLat, pointLng),
    L.latLng(circleLat, circleLng)
  );
  // If the distance is less than the circle's radius, the point is within the circle
  return distance < circleRadius;
};

var OSMtiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  useCache: true,
  crossOrigin: true,
  cacheMaxAge: 108000000,
});

// Add a tile layer to the map
var atlas = L.tileLayer(
  `https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${atlasKey}`,
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    useCache: true,
    crossOrigin: true,
    cacheMaxAge: 108000000,
  }
);

var locationmarkers = L.markerClusterGroup();
locationsJSON.forEach((location) => {
  if (location.population >= 5000) {
    var marker = L.marker(L.latLng(location.latitude, location.longitude), {
      title: location.name,
    });
    marker.bindPopup(`Name: ${location.name}<br />Region: ${location.region}`);
    locationmarkers.addLayer(marker);
  }
});

// Initialize the map
const map = L.map("map", {
  center: [0, 0],
  zoom: 2,
  layers: [OSMtiles],
});

// Add a layer control to the map
var baseMaps = {
  OpenStreetMap: OSMtiles,
  Atlas: atlas,
};

var overlayMaps = {
  Locations: locationmarkers,
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
