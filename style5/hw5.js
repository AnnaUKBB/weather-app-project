function formatTime() {
  let now = new Date();

  let currentTime = document.querySelector(".current-time");
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  currentTime.innerHTML = ` ${hours}:${minutes}`;
}

formatTime();

function formatDate() {
  let now = new Date();

  let currentDate = document.querySelector(".current-date");
  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "Januuary",
    "Fabruary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  currentDate.innerHTML = `${day}, ${date} ${month} `;
}
formatDate();

function foundWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchNewCity(city) {
  let apiKey = "25f839ad37bb008537bd01807a41779a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(foundWeather);
}

function searchInput(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city-form").value;
  searchNewCity(city);
}

function searchLocation(position) {
  let apiKey = "25f839ad37bb008537bd01807a41779a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(foundWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchInput);

let presentLocationButton = document.querySelector("button");
presentLocationButton.addEventListener("click", getCurrentLocation);

searchNewCity("New York");
