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

// ------ Display 7-Day Forecast
function display7Forecast() {
  let forecastHTML = "";

  let days = ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="row day-01">
                <div class="col day">${day}</div>
                <div class="col">
                  <img
                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
                    alt=""
                    class="forecast-icon"
                    width="30px"
                  />
                </div>
                <div class="col">
                  <span id="max-temperature">22</span
                  ><span id="max-celcius">°C</span>
                </div>
                <div class="col">
                  <span id="min-temperature">28</span
                  ><span id="min-celcius">°C</span>
                </div>
              </div>`;
  });

  document.querySelector("#forecast").innerHTML = forecastHTML;
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
display7Forecast();

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

    let day1MinTempUnit = document.querySelector("#day-1-min-celsius");
    day1MinTempUnit.innerHTML = `°F`;
    let day1MinTemp = document.querySelector("#day1MinTempNumber");
    let day1MinTempNumber = day1MinTemp.innerHTML;
    day1MinTempNumber = Number(day1MinTempNumber);
    day1MinTemp.innerHTML = Math.round((day1MinTempNumber * 9) / 5 + 32);

    let day1MaxTempUnit = document.querySelector("#day-1-max-celsius");
    day1MaxTempUnit.innerHTML = `°F`;
    let day1MaxTemp = document.querySelector("#day1MaxTempNumber");
    let day1MaxTempNumber = day1MaxTemp.innerHTML;
    day1MaxTempNumber = Number(day1MaxTempNumber);
    day1MaxTemp.innerHTML = Math.round((day1MaxTempNumber * 9) / 5 + 32);

    let day2MinTempUnit = document.querySelector("#day-2-min-celsius");
    day2MinTempUnit.innerHTML = `°F`;
    let day2MinTemp = document.querySelector("#day2MinTempNumber");
    let day2MinTempNumber = day2MinTemp.innerHTML;
    day2MinTempNumber = Number(day2MinTempNumber);
    day2MinTemp.innerHTML = Math.round((day2MinTempNumber * 9) / 5 + 32);

    let day2MaxTempUnit = document.querySelector("#day-2-max-celsius");
    day2MaxTempUnit.innerHTML = `°F`;
    let day2MaxTemp = document.querySelector("#day2MaxTempNumber");
    let day2MaxTempNumber = day2MaxTemp.innerHTML;
    day2MaxTempNumber = Number(day2MaxTempNumber);
    day2MaxTemp.innerHTML = Math.round((day2MaxTempNumber * 9) / 5 + 32);

    let day3MinTempUnit = document.querySelector("#day-3-min-celsius");
    day3MinTempUnit.innerHTML = `°F`;
    let day3MinTemp = document.querySelector("#day3MinTempNumber");
    let day3MinTempNumber = day3MinTemp.innerHTML;
    day3MinTempNumber = Number(day3MinTempNumber);
    day3MinTemp.innerHTML = Math.round((day3MinTempNumber * 9) / 5 + 32);

    let day3MaxTempUnit = document.querySelector("#day-3-max-celsius");
    day3MaxTempUnit.innerHTML = `°F`;
    let day3MaxTemp = document.querySelector("#day3MaxTempNumber");
    let day3MaxTempNumber = day3MaxTemp.innerHTML;
    day3MaxTempNumber = Number(day3MaxTempNumber);
    day3MaxTemp.innerHTML = Math.round((day3MaxTempNumber * 9) / 5 + 32);

    let day4MinTempUnit = document.querySelector("#day-4-min-celsius");
    day4MinTempUnit.innerHTML = `°F`;
    let day4MinTemp = document.querySelector("#day4MinTempNumber");
    let day4MinTempNumber = day4MinTemp.innerHTML;
    day4MinTempNumber = Number(day4MinTempNumber);
    day4MinTemp.innerHTML = Math.round((day4MinTempNumber * 9) / 5 + 32);

    let day4MaxTempUnit = document.querySelector("#day-4-max-celsius");
    day4MaxTempUnit.innerHTML = `°F`;
    let day4MaxTemp = document.querySelector("#day4MaxTempNumber");
    let day4MaxTempNumber = day4MaxTemp.innerHTML;
    day4MaxTempNumber = Number(day4MaxTempNumber);
    day4MaxTemp.innerHTML = Math.round((day4MaxTempNumber * 9) / 5 + 32);

    let day5MinTempUnit = document.querySelector("#day-5-min-celsius");
    day5MinTempUnit.innerHTML = `°F`;
    let day5MinTemp = document.querySelector("#day5MinTempNumber");
    let day5MinTempNumber = day5MinTemp.innerHTML;
    day5MinTempNumber = Number(day5MinTempNumber);
    day5MinTemp.innerHTML = Math.round((day5MinTempNumber * 9) / 5 + 32);

    let day5MaxTempUnit = document.querySelector("#day-5-max-celsius");
    day5MaxTempUnit.innerHTML = `°F`;
    let day5MaxTemp = document.querySelector("#day5MaxTempNumber");
    let day5MaxTempNumber = day5MaxTemp.innerHTML;
    day5MaxTempNumber = Number(day5MaxTempNumber);
    day5MaxTemp.innerHTML = Math.round((day5MaxTempNumber * 9) / 5 + 32);

    let day6MinTempUnit = document.querySelector("#day-6-min-celsius");
    day6MinTempUnit.innerHTML = `°F`;
    let day6MinTemp = document.querySelector("#day6MinTempNumber");
    let day6MinTempNumber = day6MinTemp.innerHTML;
    day6MinTempNumber = Number(day6MinTempNumber);
    day6MinTemp.innerHTML = Math.round((day6MinTempNumber * 9) / 5 + 32);

    let day6MaxTempUnit = document.querySelector("#day-6-max-celsius");
    day6MaxTempUnit.innerHTML = `°F`;
    let day6MaxTemp = document.querySelector("#day6MaxTempNumber");
    let day6MaxTempNumber = day6MaxTemp.innerHTML;
    day6MaxTempNumber = Number(day6MaxTempNumber);
    day6MaxTemp.innerHTML = Math.round((day6MaxTempNumber * 9) / 5 + 32);

    let day7MinTempUnit = document.querySelector("#day-7-min-celsius");
    day7MinTempUnit.innerHTML = `°F`;
    let day7MinTemp = document.querySelector("#day7MinTempNumber");
    let day7MinTempNumber = day7MinTemp.innerHTML;
    day7MinTempNumber = Number(day7MinTempNumber);
    day7MinTemp.innerHTML = Math.round((day7MinTempNumber * 9) / 5 + 32);

    let day7MaxTempUnit = document.querySelector("#day-7-max-celsius");
    day7MaxTempUnit.innerHTML = `°F`;
    let day7MaxTemp = document.querySelector("#day7MaxTempNumber");
    let day7MaxTempNumber = day7MaxTemp.innerHTML;
    day7MaxTempNumber = Number(day7MaxTempNumber);
    day7MaxTemp.innerHTML = Math.round((day7MaxTempNumber * 9) / 5 + 32);
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

    let day1MinTempUnit = document.querySelector("#day-1-min-celsius");
    day1MinTempUnit.innerHTML = `°C`;
    let day1MinTemp = document.querySelector("#day1MinTempNumber");
    let day1MinTempNumber = day1MinTemp.innerHTML;
    day1MinTempNumber = Number(day1MinTempNumber);
    day1MinTemp.innerHTML = Math.round(((day1MinTempNumber - 32) * 5) / 9);

    let day1MaxTempUnit = document.querySelector("#day-1-max-celsius");
    day1MaxTempUnit.innerHTML = `°F`;
    let day1MaxTemp = document.querySelector("#day1MaxTempNumber");
    let day1MaxTempNumber = day1MaxTemp.innerHTML;
    day1MaxTempNumber = Number(day1MaxTempNumber);
    day1MaxTemp.innerHTML = Math.round(((day1MaxTempNumber - 32) * 5) / 9);

    let day2MinTempUnit = document.querySelector("#day-2-min-celsius");
    day2MinTempUnit.innerHTML = `°C`;
    let day2MinTemp = document.querySelector("#day2MinTempNumber");
    let day2MinTempNumber = day2MinTemp.innerHTML;
    day2MinTempNumber = Number(day2MinTempNumber);
    day2MinTemp.innerHTML = Math.round(((day2MinTempNumber - 32) * 5) / 9);

    let day2MaxTempUnit = document.querySelector("#day-2-max-celsius");
    day2MaxTempUnit.innerHTML = `°C`;
    let day2MaxTemp = document.querySelector("#day2MaxTempNumber");
    let day2MaxTempNumber = day2MaxTemp.innerHTML;
    day2MaxTempNumber = Number(day2MaxTempNumber);
    day2MaxTemp.innerHTML = Math.round(((day2MaxTempNumber - 32) * 5) / 9);

    let day3MinTempUnit = document.querySelector("#day-3-min-celsius");
    day3MinTempUnit.innerHTML = `°C`;
    let day3MinTemp = document.querySelector("#day3MinTempNumber");
    let day3MinTempNumber = day3MinTemp.innerHTML;
    day3MinTempNumber = Number(day3MinTempNumber);
    day3MinTemp.innerHTML = Math.round(((day3MinTempNumber - 32) * 5) / 9);

    let day3MaxTempUnit = document.querySelector("#day-3-max-celsius");
    day3MaxTempUnit.innerHTML = `°C`;
    let day3MaxTemp = document.querySelector("#day3MaxTempNumber");
    let day3MaxTempNumber = day3MaxTemp.innerHTML;
    day3MaxTempNumber = Number(day3MaxTempNumber);
    day3MaxTemp.innerHTML = Math.round(((day3MaxTempNumber - 32) * 5) / 9);

    let day4MinTempUnit = document.querySelector("#day-4-min-celsius");
    day4MinTempUnit.innerHTML = `°C`;
    let day4MinTemp = document.querySelector("#day4MinTempNumber");
    let day4MinTempNumber = day4MinTemp.innerHTML;
    day4MinTempNumber = Number(day4MinTempNumber);
    day4MinTemp.innerHTML = Math.round(((day4MinTempNumber - 32) * 5) / 9);

    let day4MaxTempUnit = document.querySelector("#day-4-max-celsius");
    day4MaxTempUnit.innerHTML = `°C`;
    let day4MaxTemp = document.querySelector("#day4MaxTempNumber");
    let day4MaxTempNumber = day4MaxTemp.innerHTML;
    day4MaxTempNumber = Number(day4MaxTempNumber);
    day4MaxTemp.innerHTML = Math.round(((day4MaxTempNumber - 32) * 5) / 9);

    let day5MinTempUnit = document.querySelector("#day-5-min-celsius");
    day5MinTempUnit.innerHTML = `°C`;
    let day5MinTemp = document.querySelector("#day5MinTempNumber");
    let day5MinTempNumber = day5MinTemp.innerHTML;
    day5MinTempNumber = Number(day5MinTempNumber);
    day5MinTemp.innerHTML = Math.round(((day5MinTempNumber - 32) * 5) / 9);

    let day5MaxTempUnit = document.querySelector("#day-5-max-celsius");
    day5MaxTempUnit.innerHTML = `°C`;
    let day5MaxTemp = document.querySelector("#day5MaxTempNumber");
    let day5MaxTempNumber = day5MaxTemp.innerHTML;
    day5MaxTempNumber = Number(day5MaxTempNumber);
    day5MaxTemp.innerHTML = Math.round(((day5MaxTempNumber - 32) * 5) / 9);

    let day6MinTempUnit = document.querySelector("#day-6-min-celsius");
    day6MinTempUnit.innerHTML = `°C`;
    let day6MinTemp = document.querySelector("#day6MinTempNumber");
    let day6MinTempNumber = day6MinTemp.innerHTML;
    day6MinTempNumber = Number(day6MinTempNumber);
    day6MinTemp.innerHTML = Math.round(((day6MinTempNumber - 32) * 5) / 9);

    let day6MaxTempUnit = document.querySelector("#day-6-max-celsius");
    day6MaxTempUnit.innerHTML = `°C`;
    let day6MaxTemp = document.querySelector("#day6MaxTempNumber");
    let day6MaxTempNumber = day6MaxTemp.innerHTML;
    day6MaxTempNumber = Number(day6MaxTempNumber);
    day6MaxTemp.innerHTML = Math.round(((day6MaxTempNumber - 32) * 5) / 9);

    let day7MinTempUnit = document.querySelector("#day-7-min-celsius");
    day7MinTempUnit.innerHTML = `°C`;
    let day7MinTemp = document.querySelector("#day7MinTempNumber");
    let day7MinTempNumber = day7MinTemp.innerHTML;
    day7MinTempNumber = Number(day7MinTempNumber);
    day7MinTemp.innerHTML = Math.round(((day7MinTempNumber - 32) * 5) / 9);

    let day7MaxTempUnit = document.querySelector("#day-7-max-celsius");
    day7MaxTempUnit.innerHTML = `°C`;
    let day7MaxTemp = document.querySelector("#day7MaxTempNumber");
    let day7MaxTempNumber = day7MaxTemp.innerHTML;
    day7MaxTempNumber = Number(day7MaxTempNumber);
    day7MaxTemp.innerHTML = Math.round(((day7MaxTempNumber - 32) * 5) / 9);
  }
}

let convertButton = document.querySelector("#mainTempCelsius");
convertButton.addEventListener("click", convertTemp);
