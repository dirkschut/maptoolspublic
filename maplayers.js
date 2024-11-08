var AttributionOSM =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
var AttributionThunderforest =
  '&copy; <a href="https://www.thunderforest.com">Thunderforest</a>';

// Add an OpenStreetMap tile layer to the map
var OSMtiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: `${AttributionOSM}`,
  useCache: true,
  crossOrigin: true,
  cacheMaxAge: 108000000,
});

// Add a tile layer to the map
var atlas = L.tileLayer(
  `https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${atlasKey}`,
  {
    maxZoom: 19,
    attribution: `${AttributionOSM} | ${AttributionThunderforest}`,
    useCache: true,
    crossOrigin: true,
    cacheMaxAge: 108000000,
  }
);

// Add a Bing tile layer to the map
var bingTiles = new L.BingLayer(bingKey, {
  imagerySet: "CanvasLight",
  useCache: true,
  crossOrigin: true,
  cacheMaxAge: 108000000,
});

var addLocationMarkers = function () {
  locationsJSON.forEach((location) => {
    if (location.population >= settingMinimumPopulation) {
      var marker = L.marker(L.latLng(location.latitude, location.longitude), {
        title: location.name,
      });
      marker.bindPopup(
        `Name: ${location.name}<br />Region: ${location.region}`
      );
      marker
        .getPopup()
        .setContent(
          `<button onClick='navigator.clipboard.writeText("${location.name}");'>Copy name</button><br />Name: ${location.name}<br />Region: ${location.region}<br />`
        );
      locationmarkers.addLayer(marker);
    }
  });
};

var clearLocationMarkers = function () {
  locationmarkers.clearLayers();
};

var locationmarkers = L.markerClusterGroup();
addLocationMarkers();

var guessesLayerGroup = L.layerGroup();

var equatorLayerGroup = L.layerGroup();
var equator = L.polyline(
  [
    [0, -180],
    [0, 180],
  ],
  { color: "red" }
);
equatorLayerGroup.addLayer(equator);

// Initialize the map
var map;

var initMap = function () {
  map = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [OSMtiles, guessesLayerGroup, equatorLayerGroup],
  });

  // Add a layer control to the map
  var baseMaps = {
    OpenStreetMap: OSMtiles,
    Atlas: atlas,
    Bing: bingTiles,
  };

  var overlayMaps = {
    Locations: locationmarkers,
    Guesses: guessesLayerGroup,
    Equator: equatorLayerGroup,
  };

  L.control.layers(baseMaps, overlayMaps).addTo(map);
};
