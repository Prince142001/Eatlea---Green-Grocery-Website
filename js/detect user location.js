const button = document.querySelector("button");
let apiKey = "a16627e4481746c6910558c27102e53b";

button.addEventListener("click", () => {
    if (navigator.geolocation) {        //if browser support geolocation
        // geolocation.getCurrentPosition method is used to get current position of the device
        // it takes three paramaters success, error, options. If everything is right then success
        // callback function will call else error callback function will call. We don't need third parameter for this position.
        button.innerText="Allow us to detect your location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        button.innerText = "Your browser not support."
    }
});

function onSuccess(position) {
    button.innerText="Detecting your location.....";
    let { latitude, longitude } = position.coords;
    //https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR-API-KEY
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)
        .then(response => response.json()).then(result => {
            let allDetails = result.results[0].components;  //passing components object ro allDetails variables
            let {road, state, postcode} = allDetails;   //getting road, state, pastcode properties value from allDetails obj
            button.innerText=`${road} ${state}, ${postcode}`;
            console.table(allDetails);
        }).catch(()=>{  //if any error occured
            button.innerText = "Something went wrong.";
        })
}

function onError(error) {
    if (error.code == 1) {  //if user denied the request
        button.innerText = "You denied the request.";
    } else if (error.code == 2) {   //if location is not available
        button.innerText = "Location not available.";
    } else {    //if any other error occured
        button.innerText = "Something went wrong.";
    }
    button.setAttribute("disabled", "true");    //if user denied the request then button well be disabled.
}