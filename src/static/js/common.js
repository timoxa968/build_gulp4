'use strict'






function geoFindMe() {

  const status = document.querySelector('#status');


  function success(position) {

    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';

    fetch(`http://api.openweathermap.org/data/2.5/find?lat=${latitude.toFixed(3)}&lon=${longitude.toFixed(3)}&cnt=20&appid=573ae8357276b34fac4061b4b853dd26`)
    .then(function (response){
      return response.json();
    })
    .then(function (result){
      console.log(result.list)
      let a1 = '';
      for (let i = 0; i < result.list.length; i++) {
        a1 += `<div class="alert alert-success" role="alert">Город - ${result.list[i].name}, температура - ${Math.round(result.list[i].main.temp - 273)};</div>`;
      }
      document.querySelector('.selected-list').innerHTML = a1;
    })
    .catch(function(){
    });
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
