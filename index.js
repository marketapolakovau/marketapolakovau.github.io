import key from "./url.js";

fetchWeather();
async function fetchWeather() {
  fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Prague?unitGroup=metric&include=current&key=" +
      key +
      "&contentType=json"
  )
    .then((response) => response.json())
    .then((weather) => {
      //show city, address and actual condition on page
      document.getElementById("heading").innerHTML = weather.address;
      document.getElementById("full-address").innerHTML =
        weather.resolvedAddress;
      document.getElementById("description").innerHTML =
        weather.currentConditions.conditions;
      //creates new element and show weather data with label
      let data = {
        "Temperature ": weather.currentConditions.temp,
        "Feels like: ": weather.currentConditions.feelslike,
        "Humidity: ": weather.currentConditions.humidity,
        "Pressure: ": weather.currentConditions.pressure,
        "UV index: ": weather.currentConditions.uvindex,
      };
      let weatherDataContainer = document.getElementById("weather-data");
      Object.keys(data).forEach((element) => {
        document.getElementById(element) &&
          document.getElementById(element).remove();
        let newElement = document.createElement("p");
        newElement.setAttribute("id", element);
        newElement.innerHTML = element + ": " + data[element];

        weatherDataContainer.appendChild(newElement);
      });
    })
    .catch((err) => {
      alert(err.message);
    });
}

// reload data every 5 minutes
setInterval(() => fetchWeather(), 300000);

//reload by clicking on button
document.getElementById("refresh").addEventListener("click", () => {
  fetchWeather();
});
