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
var map;

var initMap = function () {
  map = L.map("map", {
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
};
