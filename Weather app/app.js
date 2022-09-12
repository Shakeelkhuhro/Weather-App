const API_key = '5358bc75738fb0e818a0518eadbc9600'
let form = document.getElementById("form")
let input = document.getElementById("input")
let main = document.getElementById("main")
let value = input.value

const getweather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
    const response = await fetch(url)
    const data = await response.json()
    return showweather(data)
  
}
const showweather = (data) => {
    // console.log(data)
    if(data.cod=="404"){
       swal({
            title: "City Not Found",
            text: "Please Select Correct City Name ",
            icon: "warning",
            dangerMode: true,
        })
        return
    }
    main.innerHTML = `
    <div class="main mt-5" id="temp">
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" class="img-fluid">
        <h4 class="tem" >${data.main.temp} ℃</h4>
        <h4 class="tem" id="backdata">${data.weather[0].main}</h4>
    </div>`
    let hello = document.getElementById("backdata")
    let a = hello.innerText
    if ( a=="Haze"){
        document.body.style.backgroundImage ="url('./haze.gif.crdownload')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "100% 100vh";
    }
    else if ( a=="Clouds"){
        document.body.style.backgroundImage ="url('./cloud.gif')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "100% 100vh";
    }
    else if ( a=="Thunderstorm"){
        document.body.style.backgroundImage ="url('./barish.gif')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "100% 100vh";
    }
    else if ( a=="Clear"){
        document.body.style.backgroundImage ="url('./sky2.gif')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "100% 100vh";
    }
    else if ( a=="Rain"){
        document.body.style.backgroundImage ="url('./rainy.gif')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "100% 100vh";
    }



}
form.addEventListener(
    "submit", function (event) {
        getweather(input.value)
        event.preventDefault()
    }
)