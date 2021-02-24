const apiKey="";
const apiURL="https://api.openweathermap.org/data/2.5/weather?";

const searchBtn = document.querySelector('#search-btn');

// this method is to fetch the value from openweathermap 
// this require api and city name
const getWeather = async (place) => {
    try {
      let response = await fetch(apiURL + `q=${place}&appid=${apiKey}&units=metric`);
      let data = await response.json();
      if(data.cod !== '404'){
        document.querySelector('#weatherCard').innerHTML =  getWeatherCard(data);
      }else{
        document.querySelector('#weatherCard').innerHTML = `Invalid: City name not found`;
      }
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

  // This method renders card view for the weather.
  const getWeatherCard = data => {
    const imageName = getImages[data.weather[0].icon];
    return `  <div class="card text-center col-md-4" >
                    <div class="card-header"><b> ${data.name} </b></div>
                    <div class="card-body">
                        <img src="icons/${imageName}" height = 150 >
                        <h5 class="card-title">${data.weather[0].description}</h5>
                        <div class="row">
                            <div class="col-md-6 text-start">Minimum : ${data.main.temp_min}&#8451;  </div>
                            <div class="col-md-6 text-end">Maximun : ${data.main.temp_max}&#8451;</div>
                        </div>
                    </div>
                    <div class="card-footer text-primary "> 
                    <div class="row">
                        <div class="col-md-5 text-start">Temp: ${data.main.temp}&#8451;  </div>
                        <div class="col-md-7 text-end"> Feels Like: ${data.main.feels_like}&#8451;</div>
                    </div>
                </div>`
  }

  // adding event to search button
  searchBtn.addEventListener('click', e => {
    e.preventDefault();
    let city = document.querySelector('#text-city');
    clearWarning(city)
    if(city.value.length > 3){
        getWeather(city.value);
        city.classList.remove('is-valid');
    }else{
        showWarning(city)
    }
  });

  // Show warning if city name is not entered
  const showWarning = (cityObj) => {
    cityObj.classList.add('is-invalid');
    cityObj.classList.remove('is-valid');
  }

  // remove warning from city name
  const clearWarning = (cityObj) => {
    cityObj.classList.add('is-valid');
    cityObj.classList.remove('is-invalid');
  }

// obtain images according to the response data.
const getImages = {
    '01d': 'sun.PNG',
    '02d': 'partial_cloudy.PNG',
    '03d': 'cloudy.PNG',
    '04d': 'cloudy.PNG',
    '09d': 'rainy.PNG',
    '10d': 'drizzle.PNG',
    '11d': 'thunder.PNG',
    '13d': 'snow.PNG',
    '50d': 'windy.PNG',
    '01n': 'sun.PNG',
    '02n': 'partial_cloudy.PNG',
    '03n': 'cloudy.PNG',
    '04n': 'cloudy.PNG',
    '09n': 'rainy.PNG',
    '10n': 'drizzle.PNG',
    '11n': 'thunder.PNG',
    '13n': 'snow.PNG',
    '50n': 'windy.PNG',
  };
  

