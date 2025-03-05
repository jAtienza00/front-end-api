let osmUrl; // url
let map; // mapa
let markerGroup; // marcadores
let mostrado = false;

function mapear(event) {
  if (mostrado) {
    event.target.innerText = "Abrir mapa";
    borrarMapa(event);
    return;
  }
  event.target.innerText = "Cerrar mapa";
  obtenerMapa();
  return;
}

function obtenerMapa() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        abrirMapa(lat, lon);
      },
      (error) => {
        console.warn(
          "No se pudo obtener la ubicación, usando Madrid por defecto."
        );
        abrirMapa(40.4168, -3.7038);
      }
    );
  } else {
    alert(
      "Tu navegador no soporta geolocalización. Se usará Madrid por defecto."
    );
    abrirMapa(40.4168, -3.7038);
  }
}

function abrirMapa(lat, lon) {
  // Creamos el mapa
  (osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
    (osmAttrib =
      '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'),
    (osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }));
  document.getElementById("map").style.display = "block";
  // Esto de setView sirve para situar la cámara, las coordenadas desde las que
  map = L.map("map").setView([lat, lon], 15).addLayer(osm);
  markerGroup = L.layerGroup().addTo(map);
  showMap(lat, lon);
}

// Añade el marcador de tu localización
function showMap(lat, lon) {
  mostrado = true;
  L.marker([lat, lon])
    .addTo(map)
    .bindPopup("Tu localización")
    .openPopup()
    .addTo(map);
}

function borrarMapa(event) {
  // Verificamos si el mapa está cargado
  if (map) {
    map.remove(); // Elimina el mapa de la vista
    markerGroup.clearLayers(); // Limpia los marcadores
    document.getElementById("map").style.display = "none"; // Oculta el contenedor del mapa
    mostrado = false; // Marcamos que el mapa ya no está mostrado
  }
}
