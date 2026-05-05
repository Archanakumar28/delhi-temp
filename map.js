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
  "Transforms neighborhood space into a temporary sacred landscape through ritual, spectacle, and collective memory.",
  "images/Durga Pandal.jpeg"
);

// Wedding (Social)
addMarker(
  28.643318, 77.338189,
  "Social",
  "Chattarpur-Weddings",
  "Reconfigures space into a site of aspiration and celebration through scale, ornamentation, and sensory excess.",
  "images/wedding.jpeg"
);

// Protest (Political)
addMarker(
 28.627057, 77.216624,
  "Political",
  "Jantar Mantar",
  "Converts urban space into a visible मंच of dissent, negotiation, and collective voice.",
  "images/Protest.jpeg"
);

// Market (Commercial)
addMarker(
  28.6290542,77.2185485,
  "Commercial",
  "Janpath Temporary Market",
  "Activates streets as fluid marketplaces shaped by mobility, informality, and seasonal rhythms.",
  "images/Market.jpeg"
);

// Concert (Commercial)
addMarker(
 28.4951279, 77.0887591,
  "Commercial",
  "DLF CYBER Hub",
  "Transforms corporate space into a temporary cultural hub through performance and consumption.",
  "images/Concert.jpeg"
);

// Book Fair (Commercial)
addMarker(
28.6196233, 77.2424336,
  "Commercial",
  "Bharat Mandapam",
  "Hosts large-scale temporary knowledge and trade environments that emerge through event-based congregation.",
  "images/Book fair.jpeg"
);

// Bhandara(Religious)
addMarker(
28.5677, 77.2433,
  "Religious",
  "Lajpat Nagar",
  "Pop-up commercial activity shaping seasonal urban rhythms.",
  "images/Bhandara.jpeg"
);

// Banjara Market(Commercial)
addMarker(
28.5833, 77.0667,
  "Commercial",
  "Dwarka Hub",
  "Creates itinerant retail landscapes defined by mobility, reuse, and informal economies.",
  "images/Market.jpeg"
);


// Open Screening(Commercial)
addMarker(
28.5528, 77.1947,
  "Commercial",
  "Hauz Khaaz",
  "Reimagines public space as a shared visual experience through temporary cinematic gatherings.",
  "images/Cinema.jpeg"
);

// Open Concerts(Commercial)
addMarker(
28.5969, 77.2453,
  "Commercial",
  "Sunder Nursery",
  "Blends landscape and performance to produce ephemeral atmospheres of leisure and cultural engagement.",
  "images/Candle.jpeg"
);

// Cultural Fair(Commercial)
addMarker(
28.5732, 77.2085,
  "Commercial",
  "Delhi Haat INA",
  "Constructs a curated yet temporary marketplace of craft, culture, and regional identity.",
  "images/Crafts.jpeg"
);


// Auto Expo(Commercial)
addMarker(
28.6195, 77.2424,
  "Commercial",
  "Bhart Mandapam",
  "Transforms exhibition space into a spectacle of innovation, scale, and consumer imagination.",
  "images/Showcase festivals.jpeg"
);

// Temporary Art Festivals(Commercial)
addMarker(
28.5862, 77.2252,
  "Commercial",
  "Lodhi Art District",
  "Activates urban surfaces as evolving canvases through time-bound artistic interventions.",
  "images/Temp art.jpeg"
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
