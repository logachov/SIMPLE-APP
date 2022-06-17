let apiKey = "c110ea55f9fc67bbe11e8618e106eff8";
let now = new Date();
function currentData(anyDate) {
  let hours = anyDate.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = anyDate.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let day = anyDate.getDay();
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
  let result = `${fullDay} ${hours}:${minutes} `;

  return result;
}
let setDate = document.querySelector(".currentTime");
setDate.innerHTML = currentData(now);

let tempC = null;

let favCities = document.querySelectorAll(".favorites");
let currentCity = document.querySelector("span.currentCity");
//let curCity = document.querySelector("span.currentCity");

Array.from(favCities).forEach(function (city) {
  city.addEventListener("click", function (e) {
    //curCity.innerHTML = e.target.id;
    search(e.target.id);
  });
});

let tempInF = document.querySelector("span.TempF");

let searchCity = document.querySelector(".search");
function setCity(event) {
  event.preventDefault();

  let cityName = document.querySelector("#search");

  if (cityName.value.length > 0) {
    search(cityName.value);
  }
}
searchCity.addEventListener("click", setCity);

function search(cityName) {
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
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showData);
}

let currentPlace = document.querySelector(".current");
function setPlace(event) {
  event.preventDefault();

  let currentCity = document.querySelector("span.currentCity");

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
  if (unvisible.classList.contains("hiddenTemp") ) {
  unvisible.classList.add("currentTemp");
  visible.classList.remove("currentTemp");
  visible.classList.add("hiddenTemp");
  unvisible.classList.remove("hiddenTemp");
  //let tempInC = document.querySelector("span.TempC");
  //let tempC = parseInt(tempInC.innerText);
  tempInF.innerHTML = Math.round((tempC * 9) / 5 + 32);
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

search("Amsterdam");

/*
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${newCity}`
  );
   */
