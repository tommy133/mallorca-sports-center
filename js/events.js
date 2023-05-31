let events;

let filterInput = document.getElementById('filterInput');
let filterButton = document.getElementById('filterButton');



const xhttp = new XMLHttpRequest();
xhttp.open("GET", "json/events.json", true);
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
    displayCenters();
    events.itemListElement = noFilteredData;
  }
    );

    displayCenters();
};
}

function displayCenters() {
  const row = document.createElement("div");
  row.classList.add("row"); 
  events.itemListElement.forEach((event) => {
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
      img.classList.add("img-fluid", "events-img");
      img.setAttribute("src", event.image);
      img.setAttribute("alt", "");
      
      img.style.height = "380px";
      img.style.width = "200%";

      team.addEventListener("click", function(event) {
        event.preventDefault();
        const url = event.url;
        window.open(url, "_blank");
      });

      const textContainer = document.createElement("div");
      textContainer.classList.add("position-relative", "text-center");

      const teamText = document.createElement("div");
      teamText.classList.add("team-text", "bg-primary", "text-white");

      const h5 = document.createElement("h5");
      h5.classList.add("text-white", "text-uppercase");
      h5.textContent = event.name;

      const info = document.createElement("div");
      info.classList.add("team-social", "bg-dark", "text-center");



      row.appendChild(col);
      col.appendChild(team);
      team.appendChild(img);
      team.appendChild(textContainer);
      textContainer.appendChild(teamText);
      teamText.appendChild(h5);
      textContainer.appendChild(info);

  });
  const container = document.getElementById("events-container");
  container.appendChild(row);
}

function clearHTML(){
    result.innerHTML = '';
}