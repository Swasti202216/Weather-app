const weatherApi ={
    key:"b5d210d244a43689256915d6e3ae5014",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather",
}
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const searchInputBox = document.getElementById('input-box');
//Event listener function on key press
searchInputBox.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display="block";
    }
});
//Get weather report and current location
// const inputbox=wrapper.querySelector(".input-box"),
//  locationBtn=inputbox.querySelector("button");
// locationBtn.addEventListener("click",()=>{
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(onSuccess);
//     }
//     else
//     {
//         alert("Your Browser Not Support Geolocation Api");
//     }
// } );
// function onSuccess(position){
//     // console.log(position);
//     const{latitude,longitude}=position.coords;
//     fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&lang={lang}`)
//     .then(weather => {
//         return weather.json();
//     }).then(showWeatherReport);
// }
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}
//Show weather report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText=`${weather.name}, ${weather.sys.country}`;

    let temp =document.getElementById('temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML= `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType=document.getElementById('weather');
    weatherType.innerText= `${weather.weather[0].main}`;

    let date= document.getElementById('date');
    let todayDate= new Date();
    date.innerText =  dateManage(todayDate);

    if(weatherType.textContent == 'Clouds'||weatherType.textContent == 'Mostly Cloudy'||weatherType.textContent == 'Intermittent Clouds'){
        document.body.style.backgroundImage="url('icons/cloudy.jpg')";
    }
    else  if(weatherType.textContent == 'Clear' || weatherType.textContent=='Mostly Clear'){
        document.body.style.backgroundImage="url('icons/clear.jpg')";
    }
    else  if(weatherType.textContent == 'Rain' || weatherType.textContent == 'Showers'){
        document.body.style.backgroundImage="url('icons/rain.jpg')";
    }
    else  if(weatherType.textContent == 'Snow'){
        document.body.style.backgroundImage="url('icons/snow.jpg')";
    }
    else  if(weatherType.textContent == 'Thunderstorm'){
        document.body.style.backgroundImage="url('icons/thunderstorm.jpg')";
    }
    else  if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage="url('icons/haze.jpg')";
    }
    else if(weatherType.textContent == 'Mist'|| weatherType.textContent == 'Fog'){
        document.body.style.backgroundImage="url('icons/mist.jpg')";
    } 
    else if(weatherType.textContent == 'Smoke'){
        document.body.style.backgroundImage="url('icons/smoke.jpg')";
    }
    else if(weatherType.textContent == 'Sunny'||weatherType.textContent == 'Mostly Sunny'){
        document.body.style.backgroundImage="url('icons/sunny.jpg')";
    }
    else if(weatherType.textContent == 'Partly Sunny'||weatherType.textContent == 'Hazy Sunshine'){
        document.body.style.backgroundImage="url('icons/partlysunny.jpg')";
    }
    else  if(weatherType.textContent == 'Windy'){
        document.body.style.backgroundImage="url('icons/windy.jpg')";
    }
}
//date manage
function dateManage(dateArg){
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months=["January","Feburary","March","April","May","June","July","August","September","October","November","December"];
    let year = dateArg.getFullYear();
    let month=months[dateArg.getMonth()];
    let date=dateArg.getDate();
    let day=days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}