let map;
let markers = [];

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
    })
    .catch((error) => {
      console.error("Error al cargar el archivo JSON:", error);
    });
}



initMap();