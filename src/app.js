// ------ Show Position
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "fdbbb67f1d9b8ba71b3b07f3d6t4a6od";
  let apiEndPoint = "https://api.shecodes.io/weather/v1/current?";
  let apiUrl = `${apiEndPoint}lon=${lon}&lat=${lat}&key=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

// ----- Show Current Location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocButton = document.querySelector("#currentLocationButton");
currentLocButton.addEventListener("click", getCurrentLocation);

// ------ Display 24 Hour Forecast
function displayHourForecast(response) {
  let forecastHourHTML = "";
  let hours = ["Now", hour + 1, hour + 2, hour + 3, hour + 4, hour + 5];

  hours.forEach(function (hour) {
    if (hour < 8) {
      hour = `0${hour}`;
    }
    forecastHourHTML =
      forecastHourHTML +
      `<div class="col">
                <ul class="hour-data">
                  <li>${hour}</li>
                  <li>
                    <img
                      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
                      alt=""
                      class=""
                      width="30px"
                    />
                  </li>
                  <li>
                    <span id="hour-temperature">15</span
                    ><span class="hour-celsius" id="hour-celsius">°C</span>
                  </li>
                </ul>
              </div>`;
  });
  document.querySelector("#forecast-hour").innerHTML = forecastHourHTML;
}

// ------ Format Day
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// ------ Display 7-Day Forecast
function display7Forecast(response) {
  let forecast = response.data.daily;

  let forecastHTML = "";

  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="row day-01">
                <div class="col day">${formatDay(forecastDay.time)}</div>
                <div class="col">
                  <img
                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                      forecastDay.condition.icon
                    }.png"
                    alt=""
                    class="forecast-icon"
                    width="30px"
                  />
                </div>
                <div class="col">
                  <span class="min-temperature" id="min-temperature">${Math.round(
                    forecastDay.temperature.minimum
                  )}</span
                  ><span class="min-celcius" id="min-celsius">°C</span>
                </div>
                <div class="col">
                  <span class="max-temperature" id="max-temperature">${Math.round(
                    forecastDay.temperature.maximum
                  )}</span
                  ><span class="max-celcius" id="max-celsius">°C</span>
                </div>
              </div>`;
  });
  document.querySelector("#forecast").innerHTML = forecastHTML;
}

function getHourForeCastUrl(city) {
  let units = "metric";
  let apiKey = "93fe0d3d16a144f2aac193056232809";
  let apiEndpoint = "https://api.weatherapi.com/v1/forecast.xml?";
  let apiUrl = `${apiEndpoint}&key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`;

  axios.get(apiUrl).then(displayHourForecast);
}

function get7ForeCastUrl(city) {
  let units = "metric";
  let apiKey = "fdbbb67f1d9b8ba71b3b07f3d6t4a6od";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/forecast?";
  let apiUrl = `${apiEndpoint}query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(display7Forecast);
}

// ----- Display Weather Data
function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.city;
  document.querySelector("#mainTempNumber").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#feelsLikeTempNumber").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.condition.description;
  document
    .querySelector("#weather-icon")
    .setAttribute("src", response.data.condition.icon_url);
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", response.data.condition.icon);

  get7ForeCastUrl(response.data.city);
  getHourForeCastUrl(response.data.city);
}

// ----- Search City
function search(city) {
  let units = "metric";
  let apiKey = "fdbbb67f1d9b8ba71b3b07f3d6t4a6od";
  let apiEndPoint = "https://api.shecodes.io/weather/v1/current?";
  let apiUrl = `${apiEndPoint}query=${city}&units=${units}&key=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

// ------ Display search data
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value.trim();
  search(city);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", handleSubmit);

search("Berlin");

// ------ Current date ------
function formatTime(now) {
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

  let date = now.getDate();

  let months = [
    "January",
    "February",
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
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${date} ${month} ${hour}:${minute}`;
}

let now = new Date();
document.querySelector("#current-time").innerHTML = formatTime(now);

let hour = now.getHours();

// ------ Celcius to Fahrenheit

function convertTemp(event) {
  event.preventDefault();

  let feelsLikeTempUnit = document.querySelector("#feelsLikeTempCelsius");
  if (feelsLikeTempUnit.innerHTML === "°C") {
    event.target.innerHTML = `°F | C`;

    let mainTemp = document.querySelector("#mainTempNumber");
    let mainTempNumber = mainTemp.innerHTML;
    mainTempNumber = Number(mainTempNumber);
    mainTemp.innerHTML = Math.round((mainTempNumber * 9) / 5 + 32);

    let feelsLikeTempUnit = document.querySelector("#feelsLikeTempCelsius");
    feelsLikeTempUnit.innerHTML = `°F`;
    let feelsLikeTemp = document.querySelector("#feelsLikeTempNumber");
    let feelsLikeTempNumber = feelsLikeTemp.innerHTML;
    feelsLikeTempNumber = Number(feelsLikeTempNumber);
    feelsLikeTemp.innerHTML = Math.round((feelsLikeTempNumber * 9) / 5 + 32);

    document.querySelector("#hour-celsius").innerHTML = `°F`;
    document.querySelector("#hour-temperature").innerHTML = Math.round(
      (Number(document.querySelector("#hour-temperature").innerHTML) * 9) / 5 +
        32
    );

    document.querySelector("#min-celsius").innerHTML = `°F`;
    document.querySelector("#max-celsius").innerHTML = `°F`;
    document.querySelector("#min-temperature").innerHTML = Math.round(
      (Number(document.querySelector("#min-temperature").innerHTML) * 9) / 5 +
        32
    );
    document.querySelector("#max-temperature").innerHTML = Math.round(
      (Number(document.querySelector("#max-temperature").innerHTML) * 9) / 5 +
        32
    );
  } else {
    event.target.innerHTML = `°C | F`;

    let mainTemp = document.querySelector("#mainTempNumber");
    let mainTempNumber = mainTemp.innerHTML;
    mainTempNumber = Number(mainTempNumber);
    mainTemp.innerHTML = Math.round(((mainTempNumber - 32) * 5) / 9);

    let feelsLikeTempUnit = document.querySelector("#feelsLikeTempCelsius");
    feelsLikeTempUnit.innerHTML = `°C`;
    let feelsLikeTemp = document.querySelector("#feelsLikeTempNumber");
    let feelsLikeTempNumber = feelsLikeTemp.innerHTML;
    feelsLikeTempNumber = Number(feelsLikeTempNumber);
    feelsLikeTemp.innerHTML = Math.round(((feelsLikeTempNumber - 32) * 5) / 9);

    document.querySelector("#hour-celsius").innerHTML = `°C`;
    document.querySelector("#hour-temperature").innerHTML = Math.round(
      ((Number(document.querySelector("#hour-temperature").innerHTML) - 32) *
        5) /
        9
    );
    document.querySelector("#min-celsius").innerHTML = `°C`;
    document.querySelector("#max-celsius").innerHTML = `°C`;
    document.querySelector("#min-temperature").innerHTML = Math.round(
      ((Number(document.querySelector("#min-temperature").innerHTML) - 32) *
        5) /
        9
    );
    document.querySelector("#max-temperature").innerHTML = Math.round(
      ((Number(document.querySelector("#max-temperature").innerHTML) - 32) *
        5) /
        9
    );
  }
}

let convertButton = document.querySelector("#mainTempCelsius");
convertButton.addEventListener("click", convertTemp);
