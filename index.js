function refreshWeatherData(response) {
  let searchedCity = document.querySelector("#searched-city");
  let currentTemp = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let tempDescription = document.querySelector("#temp-description");
  let windSpeed = document.querySelector("#wind-speed");
  let speed = response.data.wind.speed;
  let theHumidity = document.querySelector("#humidity");
  let humidit = response.data.temperature.humidity;
  let currentDate = document.querySelector("#date");
  let time = new Date(response.data.time * 1000);
  let iconImage = document.querySelector("#icon");
  let today = moment().format("DD MMM YYYY[,] HH[:]mm");

  iconImage.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;
  tempDescription.innerHTML = response.data.condition.description;
  searchedCity.innerHTML = response.data.city;
  currentTemp.innerHTML = Math.round(temperature);
  windSpeed.innerHTML = Math.round(speed);
  theHumidity.innerHTML = humidit;
  currentDate.innerHTML = today;

  getForecast(response.data.city);
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

function getDayForecast(timeStamp) {
  let forecastDay = new Date(timeStamp * 1000);
  let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return forecastDays[forecastDay.getDay()];
}

function getForecast(city) {
  let apiKey = "1e34ff4f3f045a566c8e39at1b7beo2f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeeklyForecast);
}

function displayWeeklyForecast(response) {
  let forecastHTML = "";
  let dailyArray = response.data.daily;

  dailyArray.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="daily-forecast">
    <p class="day">${getDayForecast(day.time)}</p>
    <img src="${day.condition.icon_url}" class="day-icon"/>
    <div class="daily-temp">
    <strong>${Math.round(day.temperature.maximum)}°</strong>/<div>${Math.round(
          day.temperature.minimum
        )}°</div>
    </div>
    </div>
    `;
    }
  });

  let weeklyForecast = document.querySelector("#weekly-forecast");
  weeklyForecast.innerHTML = forecastHTML;
}

let weeklyForecastBtn = document.querySelector("#btn");
console.log(weeklyForecastBtn);

let submitForm = document.querySelector("#submit-form");
submitForm.addEventListener("submit", searchCity);

getCityObect("Cape Town");
