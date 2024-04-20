function logError(error) {
  console.error(error);
  document.getElementById("error-message").innerHTML = `<div>${
    error.message
  }</div> ${document.getElementById("error-message").innerHTML}`;
}

function getCountryCapital(countryName) {
  const country = countries.find((obj) => obj.Country === countryName);
  if (country) {
    return country.Capital;
  } else {
    throw new Error(`Country ${countryName} not found.`); // or handle the case when country is not found
  }
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
        addCircle(text, 100000, false, true);
        checkedLocations.push(text);
      } else {
        logError(new Error(`Location ${text} is already recapped`));
      }
    } else if (line.includes("Answer is under 100km away from")) {
      const text = `${line.split("Answer is under 100km away from")[1].trim()}`;
      addCircle(text, 100000, true, true);
      addCircle(text, 50000, false, true);
      checkedLocations.push(text);
    } else if (line.includes("Answer is under 50km away from")) {
      const text = `${line.split("Answer is under 50km away from")[1].trim()}`;
      addCircle(text, 50000, true, true);
      addCircle(text, 20000, false, true);
      checkedLocations.push(text);
    }
  });
}

function clickRecapCountry() {
  var recapinput = document.getElementById("recapinput").value;
  var recapLines = recapinput.split("\n");
  recapLines.forEach((line) => {
    if (line.includes("Answer is not in")) {
      const country = line.split("Answer is not in")[1].trim();
      const capital = getCountryCapital(country);
      if (!capital) {
        logError(new Error(`Country data for ${country} is not available`));
      }
      addCircle(`${capital}, ${country}`, 100000, false, true);
    }
  });
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
      action.hit,
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
      return exactMatch;
    }

    const capitalMatch = locationsJSON.find((location) => {
      const locationString = `${location.name}, ${location.country}`;
      return locationString.toLowerCase() === name.toLowerCase();
    });
    if (capitalMatch) {
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
  const circleColor = color ? "green" : "red";
  return L.circle([location.latitude, location.longitude], {
    color: circleColor,
    fillColor: circleColor,
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
const addCircle = async function (name, radius, hit, pin) {
  try {
    // Fetch location data
    const location = await getCoords(name);

    // If no location is found, throw an error
    if (!location) {
      throw new Error(`Location ${name} not found`);
    }

    // If pin is true, add a pin to the map
    const marker = addPin(location);

    // Create a circle on the map
    const circle = createCircle(location, radius, hit);
    var guessdata = {
      location: location,
      hit: hit,
      radius: radius,
      name: name,
      circle: circle,
      marker: marker,
    };
    addGuessToList(guessdata);

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

function generateGUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

initMap();
