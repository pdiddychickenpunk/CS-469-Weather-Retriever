const express = require('express');
const { url } = require('inspector');
const app = express();
const port = 9000;
const path = require('path');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.engine('html', require('ejs').renderFile);

let pubDirectory = path.join(__dirname, 'public');

console.log(pubDirectory);
async function getWeatherData(url) {

    /*

    Calls the Weather API using the provided url. The url
    parameter must contain the API key and the parameter(s)
    needed for a specific call.

    */

    const response = await fetch(url);
    const weatherResult = await response.json();
    let city = weatherResult['location']['name'];
    let state = weatherResult['location']['region'];
    let country = weatherResult['location']['country'];
    let latitude = weatherResult['location']['lat'];
    let longitude = weatherResult['location']['lon'];
    let timeZone = weatherResult['location']['tz_id'];
    let localTime = weatherResult['location']['localtime'];
    let result = `Here is the weather in ${city} ${state}: Latitude: ${latitude}. Longitude: ${longitude}. Time Zone: ${timeZone}. Local Time: ${localTime}.`;
    return result;
}

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '\\public\\', '\\html\\', 'index.html'));

});

app.post('/weatherInformation', (req, res) => {

    let locationInformation = req.body;
    let zip_code = locationInformation['zipCode'];
    let city = locationInformation['city'];
    let state = locationInformation['state'];
    let weatherUrl = ''
    // user provides all input fields.
    if (zip_code !='' && city != '' && state !='') {

        weatherUrl = ''
    }


    // user provides only zip code.
    else if (zip_code != '' && city == '' && state == '') {

        weatherUrl = ''
    }

    else if (zip_code == '' && city != '' && state != '') {

        weatherUrl = ''
    }

    // https://stackoverflow.com/questions/49982058/how-to-call-an-async-function
    let result = getWeatherData(weatherUrl).then((result) => {res.render(`${pubDirectory}/html/weatherResult.html`, {result:result})});

});

app.listen(port, () => {

    console.log(`Listening on port: ${port}.`);

});


/*
    Attributions:

    “Your Career in Web Development Starts Here.” Your Career in Web Development Starts Here | The Odin Project, The Odin Project, www.theodinproject.com/. Accessed 24 Jan. 2024.
    “1.4: JSON - Working with Data and Apis in JavaScript.” YouTube, The Coding Train, 25 May 2019, www.youtube.com/watch?v=uxf0--uiX0I. 

    https://developer.mozilla.org/en-US/docs/Web/API/Response/status
    https://expressjs.com/en/starter/installing.html
    https://expressjs.com/en/starter/hello-world.html
    https://www.youtube.com/watch?v=OgXqtxF0BO8
    https://www.youtube.com/watch?v=7UErZ43jzrU
    https://www.youtube.com/watch?v=1YscOTfgAI4
    https://www.youtube.com/watch?v=mW2NyglYpm8
    https://www.youtube.com/watch?v=fyc-4YmgLu0
    https://www.youtube.com/watch?v=C_vv1D5oDZ0
    https://www.youtube.com/watch?v=PbfjNTsHfaU
    https://stackoverflow.com/questions/69212019/error-in-postman-req-body-is-not-a-function
    https://www.youtube.com/watch?v=-qkU95vNqTo
    https://www.youtube.com/watch?v=vegqqDjulKg
    https://www.weatherapi.com/api-explorer.aspx
    https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
    https://stackoverflow.com/questions/49982058/how-to-call-an-async-function
    https://www.youtube.com/watch?v=Lj7vHt9uJgw
    https://www.npmjs.com/package/ejs
    https://stackoverflow.com/questions/37991995/passing-a-variable-from-node-js-to-html

    To start nodemon and app:
    nodemon js/main.js

*/