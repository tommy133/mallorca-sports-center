const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');


console.log('hola');
callAPI();


function callAPI(){
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=39.606805723373036&lon=2.655903364769095&appid=e443226be243e85601ebdf922d9574b7';

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