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
  "images/Durga Pandal.jpeg"
);

// Wedding (Social)
addMarker(
  28.643318, 77.338189,
  "Social",
  "Chattarpur-Weddings",
  "Displays aspiration through lighting, fabric, and scale.",
  "images/wedding.jpeg"
);

// Protest (Political)
addMarker(
 28.627057, 77.216624,
  "Political",
  "Jantar Mantar",
  "Transforms public space into a site of resistance and visibility.",
  "images/Protest.jpeg"
);

// Market (Commercial)
addMarker(
  28.6290542,77.2185485,
  "Commercial",
  "Janpath Temporary Market",
  "Pop-up commercial activity shaping seasonal urban rhythms.",
  "images/market.jpg"
);

// Concert (Commercial)
addMarker(
 28.4951279, 77.0887591,
  "Commercial",
  "DLF CYBER Hub",
  "Pop-up commercial activity shaping seasonal urban rhythms.",
  "images/Concert.jpeg"
);

// Book Fair (Commercial)
addMarker(
28.6196233, 77.2424336,
  "Commercial",
  "Bharat Mandapam",
  "Pop-up commercial activity shaping seasonal urban rhythms.",
  "images/Concert.jpeg"
);

// Bhandara(Religious)
addMarker(
28.5677, 77.2433,
  "Religious",
  "Lajpat Nagar",
  "Pop-up commercial activity shaping seasonal urban rhythms.",
  "images/Bhandara.jpeg"
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
