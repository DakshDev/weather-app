let search_inp = document.getElementById("search_inp");
let search_button = document.getElementById("search_button");
let weather_icon_image = document.getElementById("weather_icon_image");
let curr_temp_c = document.getElementById("curr_temp_c");
let curr_location = document.getElementById("curr_location");
let curr_humidity = document.getElementById("curr_humidity");
let curr_wind = document.getElementById("curr_wind");




async function WeatherApi(name, call) {
    let fetchData = await fetch(`https://api.weatherapi.com/v1/current.json?key=c23d9d223a06474bb59142759252201&q=${name}&aqi=no`);
    let convertJson = await fetchData.json();
    let temp_c =  convertJson.current.temp_c;
    let location = convertJson.location.name;
    let humidity = convertJson.current.humidity;
    let wind_kph = convertJson.current.wind_kph;
    
    call(location, humidity, wind_kph, temp_c)
}
WeatherApi("united kingdom", WeatherInfo);



function WeatherInfo(location, humidity, wind_kph, temperature){
    curr_temp_c.innerHTML = temperature;
    curr_location.innerHTML = location;
    curr_humidity.innerHTML = humidity+"%";
    curr_wind.innerHTML = wind_kph+"%";
}











search_button.addEventListener("click", afterClick);
search_inp.addEventListener("keypress", (e)=>{
    if(e.key == "Enter"){
        afterClick()
    }
});


function afterClick(){
    if(search_inp.value.length > 0){
        WeatherApi(search_inp.value, WeatherInfo);
    }else{
        console.log("Err")
    }
}















function pass(data){
    let lat = data.coords.latitude;
    let lon = data.coords.longitude;
    console.log("Latitude",lat, "Longitude",lon)
    WeatherApi(`${lat} ${lon}`, WeatherInfo);
    localStorage.setItem("firstTimeAllowed",true)
}


if(localStorage.firstTimeAllowed == 'true'){
    navigator.geolocation.getCurrentPosition(pass, ()=>console.log("Not Allowed The Location"));
}else{

    window.addEventListener("load", (event) => {
        setTimeout(()=>{
        let data = confirm("Enable Your Location, To see your current Weather update")
        if(data){
            navigator.geolocation.getCurrentPosition(pass, ()=>console.log("Not Allowed The Location"));
        }
        },5000)
    });
}
