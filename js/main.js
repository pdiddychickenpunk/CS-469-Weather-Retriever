/*
    Attributions:

    “Your Career in Web Development Starts Here.” Your Career in Web Development Starts Here | The Odin Project, The Odin Project, www.theodinproject.com/. Accessed 24 Jan. 2024.
    “1.4: JSON - Working with Data and Apis in JavaScript.” YouTube, The Coding Train, 25 May 2019, www.youtube.com/watch?v=uxf0--uiX0I. 

    https://developer.mozilla.org/en-US/docs/Web/API/Response/status
    https://expressjs.com/en/starter/installing.html

*/

async function getWeatherData(url) {

    const response = await fetch(url);
    const status_code = response.status;

    if (status_code == '200') {

        console.log(`${status_code}: OK`);
        const information = await response.json();
        let city = information['location']['name'];
        let state = information['location']['region'];
        let country = information['location']['country'];
        let time = information['location']['localtime'];
        console.log(`City: ${city}. State: ${state}. Country: ${country}. Time: ${time}.`);
    }

    else {

        console.log(`${status_code}: ERROR`);
    }

}

const url = "";
getWeatherData(url);
