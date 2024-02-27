/*

JavaScript specifically for the client-side
'index.html' homepage. This file defines and runs
code used for DOM manipulation and other client
specific operations for HTML and CSS.

*/

let zipCodeField = document.getElementById('zipCode');
let cityField = document.getElementById('city');
let stateField = document.getElementById('state');
let favoriteSection = document.querySelector('.favoriteSection');
let showFavoritesButton = document.getElementById('showFavorites');

async function getFavorites() {

    /*

    Performs a GET request to the server to retrieve favorites data.

    */

    const response = await fetch('http://localhost:9000/getFavorites');
    const favorites = await response.json();
    return favorites;

}

async function getFavoriteWeatherData(city, state) {

    /*

    Performs an API call to the Weather API
    by using information for a favorited location.
    The resulting weather is returned in the standard
    '/weatherInformation' route.

    */

    // https://www.freecodecamp.org/news/javascript-post-request-how-to-send-an-http-post-request-in-js/
    fetch('http://localhost:9000/weatherInformation', {

        method: "POST",
        body: JSON.stringify({

            city: city,
            state: state,
            zipCode: 'undefined' // Endpoint expects zipcode, even though we don't have it here.

        }),

    });

    console.log(`POST request for ${city} sent.`);
}

function buildFetchLocationButton(city, state) {

    /*

    Returns a new 'Fetch this location' button
    to be used on new favorite location
    items.

    */

    let fetchThisLocationButton = document.createElement('button');
    fetchThisLocationButton.textContent = `Fetch ${city} Weather`;
    fetchThisLocationButton.addEventListener('click', () => {

        // https://stackoverflow.com/questions/49982058/how-to-call-an-async-function
        let result = getFavoriteWeatherData(city, state).then(

            (result) => { console.log(result) });
    });

    return fetchThisLocationButton;

}

function buildFavoritesContainer(city, state) {

    /*

    Returns a new container to hold all
    favorite location items for a single
    favorite location.

    */

    let favoriteContainer = document.createElement('div');

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
    favoriteContainer.className = 'favoriteContainer';

    return favoriteContainer;

}

function buildFavoriteCityContainer(city, state) {

    /*

    Returns a new container to hold
    the favorite city item for a single
    favorite location.

    */

    let favoriteCityContainer = document.createElement('div');
    favoriteCityContainer.className = 'favoriteCityContainer';
    let favoriteCity = document.createElement('p');
    favoriteCity.textContent = city;
    favoriteCityContainer.appendChild(favoriteCity);

    return favoriteCityContainer;

}

function buildFavoriteStateContainer(city, state) {

    /*

    Returns a new container to hold
    the favorite state item for a single
    favorite location.

    */

    let favoriteStateContainer = document.createElement('div');
    favoriteStateContainer.className = 'favoriteStateContainer';
    let favoriteState = document.createElement('p');
    favoriteState.textContent = state;
    favoriteStateContainer.appendChild(favoriteState);

    return favoriteStateContainer;
}

function displayFavorite(city, state) {

    /*

    Displays all favorited locations on
    the homepage.

    */

    // TODO: Add functions to build all of these elements.
    // have a form be created for each 'fetch Favorite' button,
    // just like the regular 'Fetch Weather Data' button uses to
    // communicate with the proper endpoint.

    let favoriteSection = document.querySelector('.favoriteSection');
    
    let favoriteContainer = buildFavoritesContainer(city, state);
    let fetchThisLocationButton = buildFetchLocationButton(city, state);
    let favoriteCityContainer = buildFavoriteCityContainer(city, state);
    let favoriteStateContainer = buildFavoriteStateContainer(city, state);

    favoriteContainer.appendChild(favoriteCityContainer);
    favoriteContainer.appendChild(favoriteStateContainer);
    favoriteContainer.appendChild(fetchThisLocationButton);
    favoriteSection.appendChild(favoriteContainer);

}

function determineUserInputRequirements(zipCode, city, state) {

    /*

    Determines which of the user input fields should
    be set to 'required'. If all parameters have a value,
    all user input fields are set to 'required'.

    */


    if (zipCode != "") {

        /*

        If zip code is not blank, we don't need to bother checking city and state. 
        Zip code is enough to make the API call.

        */

        //https://stackoverflow.com/questions/18770369/how-to-set-html5-required-attribute-in-javascript
        zipCodeField.setAttribute('required', '');
        cityField.removeAttribute('required');
        stateField.removeAttribute('required');

    }

    else if ((city != "") && (state != "") && (zipCode == "")) {

        /*

        If city and state are not blank, we don't need the zip code filled in
        to make the API call.

        */

        zipCodeField.removeAttribute('required');
        cityField.setAttribute('required', '');
        stateField.setAttribute('required', '');

    }

    else if (zipCode != "") {

        zipCodeField.setAttribute('required', '');
        cityField.removeAttribute('required');
        stateField.removeAttribute('required');
    }

    else if ((zipCode == "") && (city == "") && (state == "")) {

        // If all fields are empty, we prevent the form from being submitted.
        zipCodeField.setAttribute('required', '');
        cityField.setAttribute('required', '');
        stateField.setAttribute('required', '');

    }

    // Logic to determine if city and zip are filled in but not state.

    // Logic to determine if state and zip are filled in but not city.

    else {

        // All parameters empty.
        return;

    }

}

function clearFavoritesDisplay() {

    /*

    Clears all elements from the favorites display
    area (UI only). Does not remove them from storage.

    */

    favoriteSection.innerHTML = "";
    return;
}

//https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event
zipCodeField.addEventListener('focusout', () => {


    let zipCodeValue = zipCodeField.value;
    let cityValue = cityField.value;
    let stateValue = stateField.value;

    determineUserInputRequirements(zipCodeValue, cityValue, stateValue);
});

//https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event
cityField.addEventListener('focusout', () => {

    let zipCodeValue = zipCodeField.value;
    let cityValue = cityField.value;
    let stateValue = stateField.value;

    determineUserInputRequirements(zipCodeValue, cityValue, stateValue);
});

//https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event
stateField.addEventListener('focusout', () => {

    let zipCodeValue = zipCodeField.value;
    let cityValue = cityField.value;
    let stateValue = stateField.value;

    determineUserInputRequirements(zipCodeValue, cityValue, stateValue);
});

showFavoritesButton.addEventListener('click', () => {

    /*
    
    Before displaying the favorites, we wipe the favorites area clean.
    
    */

    clearFavoritesDisplay();

    // https://stackoverflow.com/questions/49982058/how-to-call-an-async-function
    let favorites = getFavorites().then(
        // https://www.freecodecamp.org/news/how-to-iterate-over-objects-in-javascript/
        (favorites) => {
            for (key in favorites) {

                let city = favorites[key];
                let state = key;
                displayFavorite(city, state);

            }
        })
});

document.addEventListener('DOMContentLoaded', () => {

    /*
    
    Before displaying the favorites, we wipe the favorites area clean.
    
    */

    clearFavoritesDisplay();

    // https://stackoverflow.com/questions/49982058/how-to-call-an-async-function
    let favorites = getFavorites().then(
        // https://www.freecodecamp.org/news/how-to-iterate-over-objects-in-javascript/
        (favorites) => {
            for (key in favorites) {

                let city = favorites[key];
                let state = key;
                displayFavorite(city, state);

            }
        })
});

/*

Attributions:

https://stackoverflow.com/questions/18770369/how-to-set-html5-required-attribute-in-javascript
https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event
https://www.codingninjas.com/studio/library/how-to-read-csv-file-in-javascript
https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
https://www.freecodecamp.org/news/how-to-iterate-over-objects-in-javascript/
https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event

*/