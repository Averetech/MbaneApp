function refreshWeatherData(response) {
  let searchedCity = document.querySelector("#searched-city");
  let currentTemp = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  searchedCity.innerHTML = response.data.city;
  currentTemp.innerHTML = Math.round(temperature);
}

function getCityObect(city) {
  let apiKey = "1e34ff4f3f045a566c8e39at1b7beo2f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeatherData);
}

function searchCity(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-input");
  getCityObect(searchFormInput.value);
}

let submitForm = document.querySelector("#submit-form");
submitForm.addEventListener("submit", searchCity);

getCityObect("Cape Town");
