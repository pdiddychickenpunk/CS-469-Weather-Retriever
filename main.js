const express = require('express');
const app = express();
const port = 9000;
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '\\public\\', '\\html\\', 'index.html'));

});

app.get('/weatherInformation', (req, res) => {

    const weatherData = { city: 'Vancouver', state: 'Washington', zip_code: '98662' };
    res.json(weatherData);

});

app.listen(port, () => {

    console.log(`Listening on port: ${port}.`);

});


/*
async function getWeatherData() {

    const response = await fetch('/weatherInformation');
    const information = await response.json();
    let city = information['city'];
    let state = information['state'];
    let zip_code = information['zip_code'];
    console.log(`City: ${city}. State: ${state}. Zip Code: ${zip_code}.`);
}

getWeatherData();

*/

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
    
    To start nodemon and app:
    nodemon js/main.js

*/