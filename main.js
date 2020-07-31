'use strict';

const api = {
  key: 'b3fb7dba488e9689b86071cf31199c80',
  base: 'https://api.openweathermap.org/data/2.5/',
  //http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={YOUR API KEY}
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    setQuery();
    displayBackground();
  }
});

function setQuery() {
  getResults(searchbox.value);
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector('.location__city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location__date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current__temperature');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let currWeather = document.querySelector('.current__weather-text');
  currWeather.innerText = weather.weather[0].main;

  let currIcon = document.querySelector('.current__weather-icon');
  let icon = weather['weather'][0]['icon'];
  currIcon.innerHTML = `<img src='http://openweathermap.org/img/w/${icon}.png' alt='Icon depicting current weather.'>`;

  let currHiLow = document.querySelector('.current__hi-low');
  currHiLow.innerHTML = `${Math.round(
    weather.main.temp_min
  )}<span>°C</span> / ${Math.round(weather.main.temp_max)}<span>°C</span>`;
}

function dateBuilder(d) {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function displayBackground() {
  const main = document.querySelector('main');
  main.classList.add('display');
}
