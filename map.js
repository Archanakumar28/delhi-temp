var map = L.map('map').setView([28.6139, 77.2090], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

let markers = [];
let allData = [];

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    allData = data;
    displayMarkers(data);
  });

function displayMarkers(data) {
  // Remove existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  // Add new markers
  data.forEach(loc => {
    let marker = L.marker([loc.lat, loc.lng])
      .addTo(map)
      .bindPopup(`<b>${loc.name}</b><br>${loc.type}`);

    markers.push(marker);
  });
}

function filterMarkers(category) {
  if (category === 'all') {
    displayMarkers(allData);
  } else {
    let filtered = allData.filter(loc => loc.type === category);
    displayMarkers(filtered);
  }
}
