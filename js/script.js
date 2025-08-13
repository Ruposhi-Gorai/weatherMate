let input = document.getElementById("search-input");
let form = document.querySelector("#search-form");
let data = document.querySelector(".weather-body");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let query = input.value;
  try {
    let output = await getData(query);
    displayData(output);
  } catch (err) {
    alert("City not found!");
    console.error(err);
  }
});

async function getData(city) {
  const getUrl = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0f2fb94282ad6a3dbf2387c407b74806&units=metric`
  );
  let output = await getUrl.json();
  //  console.log(output);
  return output;
}

function displayData(city) {
  let weatherBody = document.createElement("main");
  weatherBody.classList.add("weather-body");
  weatherBody.innerHTML = `
              <div class="weather-info">
                <h3 id="">Temp ${city.main.temp}°C  
                <img src="https://openweathermap.org/img/wn/${city.weather[0].icon}.png" 
                 alt="${city.weather[0].description}">
                </h3>
                <p>${city.name}, ${city.sys.country} </p>
                </div>
                <div class="weather-data">
                    <span>Wind: ${city.wind.speed}</span>
                    <span>Humidity: ${city.main.humidity}</span>
                    <span>Visibility: ${city.visibility}</span>
               </div>`;
  document.body.append(weatherBody);
  input.value = "";
}
