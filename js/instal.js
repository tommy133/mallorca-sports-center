var centers;

const xhttp = new XMLHttpRequest();
xhttp.open("GET", "json/centres_esportius.json", true);
xhttp.send();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    centers = JSON.parse(this.responseText);

    displayCenters();
  }
};

function displayCenters() {
  console.log(centers);

  const row = document.createElement("div");
  row.classList.add("row");
  centers.itemListElement.forEach((center) => {console.log(center)
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
      img.classList.add("img-fluid");
      img.setAttribute("src", center.image);
      img.setAttribute("alt", "");

      const textContainer = document.createElement("div");
      textContainer.classList.add("position-relative", "text-center");

      const teamText = document.createElement("div");
      teamText.classList.add("team-text", "bg-primary", "text-white");

      const h5 = document.createElement("h5");
      h5.classList.add("text-white", "text-uppercase");
      h5.textContent = center.name;

      const p = document.createElement("p");
      p.classList.add("m-0");
      p.textContent = center.geo.address.addressLocality;

      const teamSocial = document.createElement("div");
      teamSocial.classList.add("team-social", "bg-dark", "text-center");

      const twitter = document.createElement("a");
      twitter.classList.add("btn", "btn-outline-primary", "btn-square", "mr-2");
      twitter.setAttribute("href", center.contactPoint.twitter);

      const twitterIcon = document.createElement("i");
      twitterIcon.classList.add("fab", "fa-twitter");

      const facebook = document.createElement("a");
      facebook.classList.add(
        "btn",
        "btn-outline-primary",
        "btn-square",
        "mr-2"
      );
      facebook.setAttribute("href", center.contactPoint.facebook);

      const facebookIcon = document.createElement("i");
      facebookIcon.classList.add("fab", "fa-facebook-f");

      const instagram = document.createElement("a");
      instagram.classList.add("btn", "btn-outline-primary", "btn-square");
      instagram.setAttribute("href", center.contactPoint.instagram);

      const instagramIcon = document.createElement("i");
      instagramIcon.classList.add("fab", "fa-instagram");

      row.appendChild(col);
      col.appendChild(team);
      team.appendChild(img);
      team.appendChild(textContainer);
      textContainer.appendChild(teamText);
      teamText.appendChild(h5);
      teamText.appendChild(p);
      textContainer.appendChild(teamSocial);
      teamSocial.appendChild(twitter);
      twitter.appendChild(twitterIcon);
      teamSocial.appendChild(facebook);
      facebook.appendChild(facebookIcon);
      teamSocial.appendChild(instagram);
      instagram.appendChild(instagramIcon);

      team.addEventListener('click', function activarSidebar() {
        createSidebar(center);
        // This function will display the details of the selected element
        document.getElementById('sidebar').classList.toggle('active');
        
        const displayItemsList = document.querySelectorAll('.display-items');
        displayItemsList.forEach((element) => {
            if (sidebar.classList.contains('active')) {
                element.style.marginLeft = '0';
                element.style.marginBottom = '500px';
                detectarCambioTamanioVentana();
            } else {
                element.style.width = '100%';
                element.style.marginLeft = '';
            }
        });
      });

  });
  const container = document.getElementById("centers-container");
  container.appendChild(row);
}

function createSidebar(center) {
  const container = document.getElementById('sidebar');
  container.innerHTML = '';
  const title = document.createElement('h2');
  title.innerText = center.name;
  container.appendChild(title);

  const image = document.createElement('img');
  image.classList.add('img-sidebar');
  image.src = center.image;
  image.alt = '';
  container.appendChild(image);

  const hours = document.createElement('p');
  hours.innerText = `Horaris: ${center.schedule}`;
  container.appendChild(hours);

  const weather = document.createElement('section');
  weather.classList.add('weather-content');

  const weatherResult = document.createElement('div');
  weatherResult.classList.add('result');
  weather.appendChild(weatherResult);

  container.appendChild(weather);
  result = document.querySelector('.result');
  form = document.querySelector('.get-weather');
  callWeatherAPI(center.geo.latitude, center.geo.longitude);
  
  const map = document.createElement('iframe');
  const embedUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBmujnroAI4oHwpPNNdQRad77vsnE3_AVs&center=${center.geo.latitude},${center.geo.longitude}&zoom=15`;
  map.src = embedUrl;
  map.width = '600';
  map.height = '450';
  map.style.border = '0';
  map.allowFullscreen = true;
  map.loading = 'lazy';
  map.referrerpolicy = 'no-referrer-when-downgrade';
  container.appendChild(map);

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






function callWeatherAPI(lat, lon){
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=e443226be243e85601ebdf922d9574b7";

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('Coordenadas incorrectas..');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
            //console.log(dataJSON);
        })
        .catch(error => {
            console.log(error);
        })
}

function showWeather(data){
    const {name, main:{temp}, weather:[arr]} = data;

    const degrees = kelvinToCentigrade(temp);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
    `;

    result.appendChild(content);

    console.log(name);
    console.log(temp);
    console.log(arr.icon); 
}

function showError(message){
    //console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}