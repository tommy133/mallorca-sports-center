let map;
let selectedMarker;
let markers = [];
let hotelDistances = [];

async function initMap() {
  const { Map, InfoWindow, Icon } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    center: { lat: 39.62, lng: 2.93 },
    zoom: 10,
  });

  const infoWindow = new InfoWindow(); // InfoWindow para mostrar la foto

   const iconosDeporte = {
    Escalada: "svg/escalada.svg",
    Basket: "svg/basket.svg",
    Pàdel: "svg/padel.svg",
  };

  // Carga el archivo JSON
  fetch("json/Sport_Center.json")
    .then((response) => response.json())
    .then((data) => {
      data.itemListElement.forEach((element) => {
        const latitude = element.geo.latitude;
        const longitude = element.geo.longitude;
        const deporte = element.tipusE;
        const foto = element.image;
        const nom = element.name;

        const iconUrl = iconosDeporte[deporte];

        // Crea el icono SVG personalizado
        const icon = {
          url: iconUrl,
          scaledSize: new google.maps.Size(20, 20),
          anchor: new google.maps.Point(0, 0),
        };

        const marker = new google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
          icon: icon,
        });

        marker.addListener("click", () => {
          selectedMarker = marker;
          const content = `
            <div>
              <img src="${foto}" alt="Foto" style="width: 200px;">
              <h5>${nom}</h5>
              <p>${deporte}</p>
              <a href="#" onclick="hotelesMasCerca('${marker.getPosition().toString()}')">Hotels més aprop</a>
            </div>
          `;
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        });

        const deporteSelect = document.getElementById("deporte-select");
        deporteSelect.addEventListener("change", function () {
          deporteSelect.value == deporte ? marker.setMap(map) : marker.setMap(null);
        });
        markers.push(marker); //Añadir marcador al array
      });
    })
    .catch((error) => {
      console.error("Error al cargar el archivo JSON:", error);
    });
}

async function hotelesMasCerca(selectedMarkerPosition) {
  markers.forEach((marker) => {
    if (marker.getPosition().toString() !== selectedMarkerPosition) {
      marker.setMap(null); // Eliminar marcadores diferentes al seleccionado
    }
  });

  const { InfoWindow } = await google.maps.importLibrary("maps");
  const infoWindow = new InfoWindow();

  fetch("json/hotel.json")
    .then((response) => response.json())
    .then((data) => {
      data.itemListElement.forEach((element) => {
        const latitude = parseFloat(element.geo.latitude);
        const longitude = parseFloat(element.geo.longitude);
        const foto = element.image;
        const nom = element.name;

        const icon = {
          url: "svg/hotel.svg",
          scaledSize: new google.maps.Size(20, 20), 
          anchor: new google.maps.Point(0, 0), 
        };

        const markerHotel = new google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
          icon: icon, 
        });

        const hotelDistance = {
          name: nom,
          distance: calculateDistance(selectedMarker,markerHotel),
          marker: markerHotel
        }

        hotelDistances.push(hotelDistance);

        markerHotel.addListener("click", () => {
          const content = `
            <div>
              <img src="${foto}" alt="Foto" style="width: 200px;">
              <h5>${nom}</h5>
            </div>
          `;
          infoWindow.setContent(content);
          infoWindow.open(map, markerHotel);
        });
      });
      // Sort the array by distance
    hotelDistances.sort(compareDistance);

    //una vegada ordenats mos petam es markers menos es més propers

    for (let i = 5; i < hotelDistances.length; i++) {
      hotelDistances[i].marker.setMap(null); 
    }
    
    
    })
    .catch((error) => {
      console.error("Error al cargar el archivo JSON:", error);
    });

    
}

// Function to calculate the distance between two markers
function calculateDistance(marker1, marker2) {
  const lat1 = marker1.getPosition().lat();
  const lng1 = marker1.getPosition().lng();
  const lat2 = marker2.getPosition().lat();
  const lng2 = marker2.getPosition().lng();

  const R = 6371; // Radius of the earth in kilometers
  const dLat = deg2rad(lat2 - lat1); // Convert latitude difference to radians
  const dLon = deg2rad(lng2 - lng1); // Convert longitude difference to radians

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
}

// Function to convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Custom comparison function for sorting by distance
function compareDistance(a, b) {
  return a.distance - b.distance;
}

initMap();