let events;

let filterInput = document.getElementById('filterInput');
let filterButton = document.getElementById('filterButton');



const xhttp = new XMLHttpRequest();
xhttp.open("GET", "json/Sport_Center.json", true);
xhttp.send();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    events = JSON.parse(this.responseText);

    filterButton.addEventListener('click', function() {
        // Get the filter values from the input element
        var filterValue = filterInput.value.toLowerCase();
    let filteredData = events.itemListElement.filter((event) => {
        return event.name.toLowerCase().includes(filterValue) || 
        event.tipusE.toLowerCase().includes(filterValue) 
      });
      let noFilteredData = events.itemListElement;
      events.itemListElement = filteredData;
      const container = document.getElementById("events-container");
      container.innerHTML='';
    displayEvents();
    events.itemListElement = noFilteredData;
  }
    );

    displayEvents();
};
}

function displayEvents() {
  const row = document.createElement("div");
  row.classList.add("row");
  events.itemListElement.forEach((event) => {
    if (event.subtipus === "event")
    {
      const col = document.createElement("div");
      col.classList.add("col-lg-3", "col-md-6");

      const team = document.createElement("div");
      team.classList.add(
        "team",
        "position-relative",
        "overflow-hidden",
        "mb-5"
      );

      const img = document.createElement("img");
      img.classList.add("img-fluid", "centers-img");
      img.setAttribute("src", event.image);
      img.setAttribute("alt", "");

      const textContainer = document.createElement("div");
      textContainer.classList.add("position-relative", "text-center");

      const teamText = document.createElement("div");
      teamText.classList.add("team-text", "bg-primary", "text-white");

      const h5 = document.createElement("h5");
      h5.classList.add("text-white", "text-uppercase");
      h5.textContent = event.name;

      row.appendChild(col);
      col.appendChild(team);
      team.appendChild(img);
      team.addEventListener('click', function activarSidebar() {
        // obrir pàgina html
        // alert("pitjat");
        window.open(event.url, "_blank");
      });
    }
  });
  const container = document.getElementById("events-container");
  container.appendChild(row);
}



window.addEventListener('resize', detectarCambioTamanioVentana);
// Actualizar los estilos CSS si el ancho es menor a 768 píxeles
function detectarCambioTamanioVentana() {
    const windowWidth = window.innerWidth;
    const sidebar = document.getElementById('sidebar');
    const displayItemsList = document.querySelectorAll('.display-items');
    displayItemsList.forEach((element) => {
        if (windowWidth > 1000 && sidebar.classList.contains('active')) {
            element.style.width = '70%';
            sidebar.style.width = '30%';
        }
        if(windowWidth < 1000 && sidebar.classList.contains('active')){
            element.style.width = '50%';
            sidebar.style.width = '50%';
        }
    });
}


function showError(message){
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}


function clearHTML(){
    result.innerHTML = '';
}