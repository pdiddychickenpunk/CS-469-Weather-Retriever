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


function buildFavoritesContainer(city, state) {

    /*
 
    Returns a new container to hold all
    favorite location items for a single
    favorite location.
 
    */

    console.log(`Build container: City: ${city} State: ${state}.`);

    let favoriteContainer = document.createElement('div');
    let favoriteForm = document.createElement('form');

    // Build input elements.
    // https://www.geeksforgeeks.org/how-to-create-a-form-dynamically-with-the-javascript/
    // https://stackoverflow.com/questions/7609130/set-the-default-value-of-an-input-field
    let favoriteCityInput = document.createElement('input');
    favoriteCityInput.setAttribute('type', 'hidden');
    favoriteCityInput.setAttribute('name' , 'city');
    favoriteCityInput.value = city;

    let favoriteStateInput = document.createElement('input');
    favoriteStateInput.setAttribute('type', 'hidden');
    favoriteStateInput.setAttribute('name' , 'state');
    favoriteStateInput.value = state;

    let fetchThisLocationButton = document.createElement('button');
    fetchThisLocationButton.setAttribute('type', 'submit');
    fetchThisLocationButton.textContent = `Fetch ${city} Weather`;
    fetchThisLocationButton.addEventListener('click', () => {

        favoriteForm.submit();
    });

    // https://www.geeksforgeeks.org/how-to-create-a-form-dynamically-with-the-javascript/
    favoriteForm.setAttribute('method', 'post');
    favoriteForm.setAttribute('action', '/weatherInformation');
    favoriteForm.appendChild(favoriteCityInput);
    favoriteForm.appendChild(favoriteStateInput);
    favoriteForm.appendChild(fetchThisLocationButton);

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
    favoriteContainer.className = 'favoriteContainer';
    favoriteContainer.appendChild(favoriteForm);
    favoriteContainer.appendChild(fetchThisLocationButton);
    return favoriteContainer;

};


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
    let favoriteCityContainer = buildFavoriteCityContainer(city, state);
    let favoriteStateContainer = buildFavoriteStateContainer(city, state);

    favoriteContainer.appendChild(favoriteCityContainer);
    favoriteContainer.appendChild(favoriteStateContainer);
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
https://www.geeksforgeeks.org/how-to-create-a-form-dynamically-with-the-javascript/
https://stackoverflow.com/questions/7609130/set-the-default-value-of-an-input-field

*/