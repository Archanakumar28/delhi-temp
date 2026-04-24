var map = L.map('map').setView([28.6139, 77.2090], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(loc => {
      L.marker([loc.lat, loc.lng])
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b><br>${loc.type}`);
    });
  });
