'use strict'

const out = document.querySelector(".selected-list");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    out.innerHTML = "Геолокация не поддерживается этим браузером.";
  }
}

function showPosition(position) {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  fetch(`http://api.openweathermap.org/data/2.5/find?lat=${latitude.toFixed(3)}&lon=${longitude.toFixed(3)}&cnt=1&units=metric&lang=ru&appid=573ae8357276b34fac4061b4b853dd26`)
    .then(function (response){
      return response.json();
    })
    .then(function (result){
      let a1 = '';
      for (let i = 0; i < result.list.length; i++) {
        a1 += `
        <div class="alert alert-success" role="alert">
          Город - ${result.list[i].name},
          температура - ${Math.round(result.list[i].main.temp)};
        </div>`;
      }
      document.querySelector('.selected-list').innerHTML = a1;
    })
    .catch(function(){
    });
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      out.innerHTML = "Пользователь отклонил запрос на геолокацию."
      break;
    case error.POSITION_UNAVAILABLE:
      out.innerHTML = "Информация о местоположении недоступна."
      break;
    case error.TIMEOUT:
      out.innerHTML = "Запрос, чтобы получить местоположение пользователя по таймауту."
      break;
    case error.UNKNOWN_ERROR:
      out.innerHTML = "Произошла неизвестная ошибка."
      break;
  }
}


function zero_first_format(value){
    (value < 10) ? value='0'+value : ''
    return value;
}

function date_time(){
    var current_datetime = new Date();
    var day = zero_first_format(current_datetime.getDate());
    var month = zero_first_format(current_datetime.getMonth()+1);
    var year = current_datetime.getFullYear();
    var hours = zero_first_format(current_datetime.getHours());
    var minutes = zero_first_format(current_datetime.getMinutes());
    var seconds = zero_first_format(current_datetime.getSeconds());

    return day+"."+month+"."+year+" "+hours+":"+minutes+":"+seconds;
}

setInterval(function () {
  document.getElementById('current_date_time_block2').innerHTML = date_time();
}, 1000);

window.onload = getLocation(), date_time();
