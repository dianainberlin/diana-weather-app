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
function displayHourForecast(hour) {
  let forecastHourHTML = "";

  let hours = ["Now", hour + 1, hour + 2, hour + 3, hour + 4, hour + 5];
  hours.forEach(function (hour) {
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
                  <span id="min-temperature">${Math.round(
                    forecastDay.temperature.minimum
                  )}</span
                  ><span id="min-celcius">°C</span>
                </div>
                <div class="col">
                  <span id="max-temperature">${Math.round(
                    forecastDay.temperature.maximum
                  )}</span
                  ><span id="max-celcius">°C</span>
                </div>
              </div>`;
  });
  document.querySelector("#forecast").innerHTML = forecastHTML;
}

function getForeCastUrl(city) {
  let apiKey = "fdbbb67f1d9b8ba71b3b07f3d6t4a6od";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/forecast?";
  let apiUrl = `${apiEndpoint}query=${city}&key=${apiKey}&units=metric`;

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

  getForeCastUrl(response.data.city);
}

// ----- Search City
function search(city) {
  let apiKey = "fdbbb67f1d9b8ba71b3b07f3d6t4a6od";
  let apiEndPoint = "https://api.shecodes.io/weather/v1/current?";
  let apiUrl = `${apiEndPoint}query=${city}&units=metric&key=${apiKey}`;
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
displayHourForecast(hour);

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
    /*document.querySelector("#min-temperature").innerHTML = Math.round(
      (Number(document.querySelector("#hour-temperature").innerHTML) * 9) / 5 +
        32
    );
    document.querySelector("#max-temperature").innerHTML = Math.round(
      (Number(document.querySelector("#hour-temperature").innerHTML) * 9) / 5 +
        32
    );*/

    let hour1TempUnit = document.querySelector("#hour-1-celsius");
    hour1TempUnit.innerHTML = `°F`;
    let hour1Temp = document.querySelector("#hour1TempNumber");
    let hour1TempNumber = hour1Temp.innerHTML;
    hour1TempNumber = Number(hour1TempNumber);
    hour1Temp.innerHTML = Math.round((hour1TempNumber * 9) / 5 + 32);

    let hour2TempUnit = document.querySelector("#hour-2-celsius");
    hour2TempUnit.innerHTML = `°F`;
    let hour2Temp = document.querySelector("#hour2TempNumber");
    let hour2TempNumber = hour2Temp.innerHTML;
    hour2TempNumber = Number(hour2TempNumber);
    hour2Temp.innerHTML = Math.round((hour2TempNumber * 9) / 5 + 32);

    let hour3TempUnit = document.querySelector("#hour-3-celsius");
    hour3TempUnit.innerHTML = `°F`;
    let hour3Temp = document.querySelector("#hour3TempNumber");
    let hour3TempNumber = hour3Temp.innerHTML;
    hour3TempNumber = Number(hour3TempNumber);
    hour3Temp.innerHTML = Math.round((hour3TempNumber * 9) / 5 + 32);

    let hour4TempUnit = document.querySelector("#hour-4-celsius");
    hour4TempUnit.innerHTML = `°F`;
    let hour4Temp = document.querySelector("#hour4TempNumber");
    let hour4TempNumber = hour4Temp.innerHTML;
    hour1TempNumber = Number(hour4TempNumber);
    hour4Temp.innerHTML = Math.round((hour4TempNumber * 9) / 5 + 32);

    let hour5TempUnit = document.querySelector("#hour-5-celsius");
    hour5TempUnit.innerHTML = `°F`;
    let hour5Temp = document.querySelector("#hour5TempNumber");
    let hour5TempNumber = hour5Temp.innerHTML;
    hour5TempNumber = Number(hour5TempNumber);
    hour5Temp.innerHTML = Math.round((hour5TempNumber * 9) / 5 + 32);

    let hour6TempUnit = document.querySelector("#hour-6-celsius");
    hour6TempUnit.innerHTML = `°F`;
    let hour6Temp = document.querySelector("#hour6TempNumber");
    let hour6TempNumber = hour6Temp.innerHTML;
    hour6TempNumber = Number(hour6TempNumber);
    hour6Temp.innerHTML = Math.round((hour6TempNumber * 9) / 5 + 32);
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

    let hour1TempUnit = document.querySelector("#hour-1-celsius");
    hour1TempUnit.innerHTML = `°C`;
    let hour1Temp = document.querySelector("#hour1TempNumber");
    let hour1TempNumber = hour1Temp.innerHTML;
    hour1TempNumber = Number(hour1TempNumber);
    hour1Temp.innerHTML = Math.round(((hour1TempNumber - 32) * 5) / 9);

    let hour2TempUnit = document.querySelector("#hour-2-celsius");
    hour2TempUnit.innerHTML = `°C`;
    let hour2Temp = document.querySelector("#hour2TempNumber");
    let hour2TempNumber = hour2Temp.innerHTML;
    hour2TempNumber = Number(hour2TempNumber);
    hour2Temp.innerHTML = Math.round(((hour2TempNumber - 32) * 5) / 9);

    let hour3TempUnit = document.querySelector("#hour-3-celsius");
    hour3TempUnit.innerHTML = `°C`;
    let hour3Temp = document.querySelector("#hour3TempNumber");
    let hour3TempNumber = hour3Temp.innerHTML;
    hour3TempNumber = Number(hour3TempNumber);
    hour3Temp.innerHTML = Math.round(((hour3TempNumber - 32) * 5) / 9);

    let hour4TempUnit = document.querySelector("#hour-4-celsius");
    hour4TempUnit.innerHTML = `°C`;
    let hour4Temp = document.querySelector("#hour4TempNumber");
    let hour4TempNumber = hour4Temp.innerHTML;
    hour4TempNumber = Number(hour4TempNumber);
    hour4Temp.innerHTML = Math.round(((hour4TempNumber - 32) * 5) / 9);

    let hour5TempUnit = document.querySelector("#hour-5-celsius");
    hour5TempUnit.innerHTML = `°C`;
    let hour5Temp = document.querySelector("#hour5TempNumber");
    let hour5TempNumber = hour5Temp.innerHTML;
    hour5TempNumber = Number(hour5TempNumber);
    hour5Temp.innerHTML = Math.round(((hour5TempNumber - 32) * 5) / 9);

    let hour6TempUnit = document.querySelector("#hour-6-celsius");
    hour6TempUnit.innerHTML = `°C`;
    let hour6Temp = document.querySelector("#hour6TempNumber");
    let hour6TempNumber = hour6Temp.innerHTML;
    hour6TempNumber = Number(hour6TempNumber);
    hour6Temp.innerHTML = Math.round(((hour6TempNumber - 32) * 5) / 9);
  }
}

let convertButton = document.querySelector("#mainTempCelsius");
convertButton.addEventListener("click", convertTemp);
