/*

JavaScript specifically for the client-side
'index.html' homepage. This file defines and runs
code used for DOM manipulation and other client
specific operations for HTML and CSS.

*/


let zipCodeField = document.getElementById('zipCode');
let cityField = document.getElementById('city');
let stateField = document.getElementById('state');

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

    else if ( (city != "") && (state != "") && (zipCode == "") ) {

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

    else if ( (zipCode == "") && (city == "") && (state == "") ) {

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


/*

Attributions:

https://stackoverflow.com/questions/18770369/how-to-set-html5-required-attribute-in-javascript
https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event

*/