const apiKey = '3d867b40e27960853e7201648ec6e4e5'
const apiCountryURL = "https://flagsapi.com/"

const cityInput = document.querySelector('#city-input')
const search = document.querySelector('#search')
const container = document.querySelector("#weather-data")
const errorMessage = document.querySelector('#error-message')

const cityElement = document.querySelector('#city')
const countryElement = document.querySelector('#country')
const tempElement = document.querySelector('#temperature span')
const descriptionElement = document.querySelector('#description span')
const weatherIcon = document.querySelector('#weather-icon')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')


async function getWeatherData(city){

  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`) 
  const data = await res.json()

  return data
}

async function showWeatherData(city){
  try {
    const data = await getWeatherData(city)
    removeHiddenClass()
    cityElement.innerText = data.name
    countryElement.setAttribute('src', `${apiCountryURL}${data.sys.country}/flat/64.png`)
    tempElement.innerText = parseInt(data.main.temp)
    descriptionElement.innerText = data.weather[0].description
    weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    humidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h`
  } catch (error) {
    container.classList.add('hidden')
    errorMessage.classList.remove('hidden')
  }
}

search.addEventListener('click', async (ev) =>{
  ev.preventDefault()
  const city = cityInput.value
  showWeatherData(city)
})

cityInput.addEventListener('keyup', (ev) =>{
  if(ev.code === 'Enter'){
    const city = ev.target.value
    showWeatherData(city)
}
})

function removeHiddenClass(){
  container.classList.remove('hidden')
  errorMessage.classList.add('hidden')
}
