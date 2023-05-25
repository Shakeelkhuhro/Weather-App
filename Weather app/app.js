const API_key = '5358bc75738fb0e818a0518eadbc9600'
let form = document.getElementById("form");
let input = document.getElementById("input");
let main = document.getElementById("main");
let value = input.value;

const getGeolocation = async (city) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${API_key}`;
  const response = await fetch(url);
  const data = await response.json();
  return getWeatherData(data);
};

const getWeatherData = async (geolocationData) => {
  if (geolocationData.status === "ZERO_RESULTS") {
    swal({
      title: "City Not Found",
      text: "Please enter a valid city name",
      icon: "warning",
      dangerMode: true,
    });
    return;
  }

  const { lat, lng } = geolocationData.results[0].geometry.location;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_key}&units=metric`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();
  return showWeather(weatherData);
};

const showWeather = (data) => {
  if (data.cod === "404") {
    swal({
      title: "Weather Data Not Found",
      text: "Failed to retrieve weather data",
      icon: "error",
    });
    return;
  }

  main.innerHTML = `
    <div class="main mt-5" id="temp">
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="" class="img-fluid">
      <h4 class="tem">${data.main.temp} ℃</h4>
      <h4 class="tem" id="backdata">${data.weather[0].main}</h4>
    </div>`;

  let hello = document.getElementById("backdata");
  let a = hello.innerText;

  switch (a) {
    case "Haze":
      document.body.style.backgroundImage = "url('./haze.gif.crdownload')";
      break;
    case "Clouds":
      document.body.style.backgroundImage = "url('./cloud.gif')";
      break;
    case "Thunderstorm":
      document.body.style.backgroundImage = "url('./barish.gif')";
      break;
    case "Clear":
      document.body.style.backgroundImage = "url('./sky2.gif')";
      break;
    case "Rain":
      document.body.style.backgroundImage = "url('./rainy.gif')";
      break;
    default:
      break;
  }
};

form.addEventListener("submit", function (event) {
  getGeolocation(input.value);
  event.preventDefault();
});
