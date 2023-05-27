let map;
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    center: { lat: 39.62, lng: 2.93 },
    zoom: 10,
  });

  // Carga el archivo JSON
  fetch("json/Sport_Center.json")
    .then((response) => response.json())
    .then((data) => {
      data.itemListElement.forEach((element) => {
        const latitude = element.geo.latitude;
        const longitude = element.geo.longitude;
        const deporte = element.tipusE;

        const marker = new google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
        });

        const deporteSelect = document.getElementById("deporte-select");
        deporteSelect.addEventListener("change", function () {
          deporteSelect.value==deporte? marker.setMap(map):marker.setMap(null);
        });
      });
    })
    .catch((error) => {
      console.error("Error al cargar el archivo JSON:", error);
    });
}

initMap();