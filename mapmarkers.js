var iconCross = L.icon({
  iconUrl: "icons/cross.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Function to add a pin to the map
// location: object, contains lat and lng properties
// Returns: Leaflet marker object
const addPin = function (location) {
  const marker = L.marker([location.latitude, location.longitude], {
    icon: iconCross,
  }).addTo(guessesLayerGroup);
  marker.bindPopup(location.name).openPopup();
  return marker;
};
