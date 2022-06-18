let apiKey = "c110ea55f9fc67bbe11e8618e106eff8";
let tempC = null;
let humValue = null;
let windValue = null;
let time = null;
//let now = new Date();
function currentData(anyDate) {
  let realTime = new Date(anyDate);
  let hours = realTime.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = realTime.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let day = realTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let fullDay = days[day];
  let result = `Valid for ${fullDay} ${hours}:${minutes} `;

  return result;
}
let setDate = document.querySelector(".currentTime");
//setDate.innerHTML = currentData(time);



let favCities = document.querySelectorAll(".favorites");

let currentCity = document.querySelector("p.currentCity");

Array.from(favCities).forEach(function (city) {
  city.addEventListener("click", function (e) {
    search(e.target.id);
  });
});

let tempInF = document.querySelector("span.TempF");
let tempInС = document.querySelector("span.TempC");
let searchCity = document.querySelector(".search");
let humidity = document.querySelector("p.humidity");
let wind = document.querySelector("p.wind");
let description = document.querySelector("p.currentDescription");
let currentPicture = document.querySelector(".currentPicture");

function setCity(event) {
  event.preventDefault();

  let cityName = document.querySelector("#search");

  if (cityName.value.length > 0) {
    search(cityName.value);
  }
}
searchCity.addEventListener("click", setCity);

/* function showData(response) {
    if (response.status === 200) {
      let city = response.data.name;
      time = response.data.dt * 1000;
      setDate.innerHTML = currentData(time);

      tempC = Math.round(response.data.main.temp);
      tempInС.innerHTML = tempC;
      currentCity.innerHTML = city;
      console.log(response.data);
      description.innerHTML = response.data.weather[0].description;
      humValue = `Humidity ${response.data.main.humidity}%`;
      humidity.innerHTML = humValue;
      windValue = `Wind ${Math.round(response.data.wind.speed)} m/c`;
      wind.innerHTML = windValue;
      let icon = response.data.weather[0].icon;
      console.log(icon);
      currentPicture.setAttribute(
        "src",
        `http://openweathermap.org/img/w/${icon}.png`
      );
      startC();
    }
  } */
  


function search(cityName) {
  function showData(response) {
    if (response.status === 200) {
      let city = response.data.name;
      time = response.data.dt * 1000;
      setDate.innerHTML = currentData(time);

      tempC = Math.round(response.data.main.temp);
      tempInС.innerHTML = tempC;
      currentCity.innerHTML = city;
      console.log(response.data);
      description.innerHTML = response.data.weather[0].description;
      humValue = `Humidity ${response.data.main.humidity}%`;
      humidity.innerHTML = humValue;
      windValue = `Wind ${Math.round(response.data.wind.speed)} m/c`;
      wind.innerHTML = windValue;
      let icon = response.data.weather[0].icon;
      console.log(icon);
      currentPicture.setAttribute(
        "src",
        `http://openweathermap.org/img/w/${icon}.png`
      );
      startC();
    }
  }
  //showData(response);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showData);
}

let currentPlace = document.querySelector(".current");
function setPlace(event) {
  event.preventDefault();

  function showData(response) {
    if (response.status === 200) {
      let city = response.data.name;
      tempC = Math.round(response.data.main.temp);
      let tempInС = document.querySelector("span.TempC");
      tempInС.innerHTML = tempC;
      currentCity.innerHTML = city;
      startC();
    }
  }
  
  function myPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showData);
  }

  navigator.geolocation.getCurrentPosition(myPosition);
}
currentPlace.addEventListener("click", setPlace);

let visible = document.querySelector(".currentTemp");
let unvisible = document.querySelector(".hiddenTemp");
function setTempF(event) {
  event.preventDefault();
  if (unvisible.classList.contains("hiddenTemp")) {
    unvisible.classList.add("currentTemp");
    visible.classList.remove("currentTemp");
    visible.classList.add("hiddenTemp");
    unvisible.classList.remove("hiddenTemp");

    tempInF.innerHTML = Math.round((tempC * 9) / 5 + 32);
    let humidityF = document.querySelector("p.humidityF");
    let windF = document.querySelector("p.windF");
    humidityF.innerHTML = humValue;
    windF.innerHTML = windValue;
  }
}
visible.addEventListener("click", setTempF);

function setTempC(event) {
  event.preventDefault();
  startC();
}
unvisible.addEventListener("click", setTempC);

function startC() {
  unvisible.classList.remove("currentTemp");
  visible.classList.add("currentTemp");
  visible.classList.remove("hiddenTemp");
  unvisible.classList.add("hiddenTemp");
}

window.onload = search("Kyiv");

/*
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${newCity}`
  );
   */
