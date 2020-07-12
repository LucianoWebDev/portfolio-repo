//! Weather Widget in NavBar
//! Get the location from the user
function getLocation() {
    let btnDisapear = document.querySelector('.btnGeo')
    btnDisapear.remove()
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        console.log('Geolocation is not supported by this browser.')
    }
}

//! Get the data from the API
function showPosition(position) {
    var lat = position.coords.latitude
    var long = position.coords.longitude
    function get_data_from_url_three() {
        var request = new XMLHttpRequest()
        request.open(
            'GET',
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=92c642667ab083d0f1a12e915ccbf3da&units=metric#`,
            false
        )
        request.send(null)
        return request.responseText
    }

    //! Convert the Data into readable format from input field
    var data_url_three = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=92c642667ab083d0f1a12e915ccbf3da&units=metric#`
    var data_obj_three = JSON.parse(get_data_from_url_three(data_url_three))

    //! Declare the weather icon from the API data
    var iconthree = data_obj_three.weather[0].icon
    const imageURLThree =
        'http://openweathermap.org/img/wn/' + iconthree + '@2x.png'

    //! Create P element for City Name
    let cityPa = document.createElement('P')
    document.querySelector('.weatherDiv').appendChild(cityPa)
    cityPa.className = 'weatherCityDownest'
    document.querySelector(
        '.weatherCityDownest'
    ).innerHTML = `${data_obj_three.name}, ${data_obj_three.sys.country}`

    // //! Create P element for Temp
    let tempPa = document.createElement('P')
    document.querySelector('.weatherDiv').appendChild(tempPa)
    tempPa.className = 'weatherTempDownest'
    document.querySelector('.weatherTempDownest').innerHTML = `${Math.floor(
        data_obj_three.main.temp
    )}° C`

    //! Create P element for Description
    // let descPa = document.createElement('P')
    // document.querySelector('.weatherDiv').appendChild(descPa)
    // descPa.className = 'weatherDescDownest'
    // document.querySelector(
    //     '.weatherDescDownest'
    // ).innerHTML = `${data_obj_three.weather[0].description}`

    //! Create IMG element for Icon
    let iconPa = document.createElement('IMG')
    document.querySelector('.weatherDiv').appendChild(iconPa)
    iconPa.className = 'weatherIconDownest'
    document.querySelector('.weatherIconDownest').src = imageURLThree
}

function pageReload() {
    location.reload()
}
