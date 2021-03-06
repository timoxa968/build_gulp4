'use strict'

fetch('http://api.openweathermap.org/data/2.5/find?lat=55.5&lon=37.5&cnt=10&appid=573ae8357276b34fac4061b4b853dd26')
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(function(){
  });


function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  }

  function error() {
    status.textContent = 'Невозможно получить ваше местоположение';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

document.querySelector('#find-me').addEventListener('click', geoFindMe);

$(document).ready(function () {
    // alert(1);
});
