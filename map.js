// INITIAL MAP
var map = L.map('map').setView([28.6139, 77.2090], 11);

// TILE
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// STORE MARKERS
var markers = [];

// FUNCTION TO ADD MARKER
function addMarker(lat, lng, category, title, desc, img) {

  var marker = L.marker([lat, lng]);

  marker.category = category;

  marker.bindPopup(`
    <div style="width:200px">
      <h3>${title}</h3>
      <img src="${img}" style="width:100%; border-radius:6px;">
      <p>${desc}</p>
      <small><b>Category:</b> ${category}</small>
    </div>
  `);

  markers.push(marker);
  marker.addTo(map);
}

// ------------------ DATA ------------------

// CR PARK (Religious example)
addMarker(
  28.5400, 77.2470,
  "Religious",
  "CR Park Durga Puja",
  "A major pandal space transforming the neighborhood into a ritual-cultural landscape.",
  "images/pandal.jpg"
);

// Wedding (Social)
addMarker(
  28.6304, 77.2177,
  "Social",
  "Wedding Tent",
  "Displays aspiration through lighting, fabric, and scale.",
  "images/wedding.jpg"
);

// Protest (Political)
addMarker(
  28.6129, 77.2295,
  "Political",
  "Protest Stage",
  "Transforms public space into a site of resistance and visibility.",
  "images/protest.jpg"
);

// Market (Commercial)
addMarker(
  28.6562, 77.2410,
  "Commercial",
  "Festival Market",
  "Pop-up commercial activity shaping seasonal urban rhythms.",
  "images/market.jpg"
);


// ------------------ FILTER FUNCTION ------------------

function filterMarkers(category) {

  markers.forEach(marker => {
    map.removeLayer(marker);
  });

  markers.forEach(marker => {
    if (category === "all" || marker.category === category) {
      marker.addTo(map);
    }
  });

}
