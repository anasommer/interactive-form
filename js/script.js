// 'Name' field is being focused at the page load
const nameField = document.querySelector('#name');
nameField.focus();

// Hide 'Other Job Role' field by default
const otherJobRole = document.querySelector('#other-job-role');
otherJobRole.style.visibility = 'hidden';

const jobRole = document.querySelector('#title');
jobRole.addEventListener('change', (e)=>{
   if (e.target.value === 'other') {
    otherJobRole.style.visibility = 'visible';
   } else {
    otherJobRole.style.visibility = 'hidden';
   }
});

// Disable 'Color' select element
const colorSelect = document.querySelector('#color');
const colorOptions = colorSelect.children;
colorSelect.disabled = true;

// Design element should listen for user changes and show only t-shirt colors available for choosed design
const designSelect = document.querySelector('#design');
designSelect.addEventListener('change', (e) => {
    colorSelect.disabled = false;
    for (let i = 1; i < colorOptions.length; i++) {
        const theme = e.target.value;
        const colorOption = colorOptions[i].getAttribute('data-theme');

        if (theme === colorOption) {
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute('selected', true);
        }
        else if (theme !== colorOptions) {
            colorOptions[i].hidden = true;
            colorOptions[i].setAttribute('selected', false);
        }
    }
});

// The Total $ el below the Register for Activities section should update to reflect the sum of the cost of the user's selected activities

    // Register for Activities fieldset shoul listen for user changes. When a change is detected:
    // the total cost should increase by the value on the data-cost attr of the activity's input type = 'checkbox' el
    // if an activity is unchecked, the total cost should decrease by that amount
    // the <p> el with the id of 'activity-cost' below the activities section should update to reflect the chosen activities total cost

// The credit card payment option should be selected for the user by default. When the form first loads, 'Credit Card' should be displayed in the 'I'm going to pay with' <select> el
    // Hide other payment options from showing on page load
    // 'I'm going to pay' <select> el should listen to changes.
    // When change is detected, hide all payment sections in the form's UI except the selected one.

// Users shouldn't be able to submit a form without the required info, or with invalid info.
//Create your own custom validation
// form el should listen for the submit event.
    // when the form submission is detected, each required form field or section should be validated, or checked.
    //prevent form's submission if required fields is not valid.

    // the Name field cannot be blank or empty
    // Email address field must contain a validly formatted email address. It doesn't need to be real address, just formatted like one. 
    // the Register for Activities section must have at least one activity selected.
    // If and only if credit card is the selected payment method:
        // the Card number field must contain a 13-16 digit credit card number with no dashes or spaces. 
        // Zip code field must contain 5 digit number.
        // the CVV field must contain a 3 digit number.

// Make the focus states of the activities more obvious to all users. 
    // Make all of the activity checkbox input elements to listen for the focus and blur events.
        // When the focus event is detected, add the .focus className to the checkbox input's parent label element.
        // When the blur event is detected, remove the .focus className from the label element. It can be helpful here to directly target the element with the className of .focus in order to remove it.

// Make form validation errors obvious to all users.
    // When the user tries to submit the form, if a rewuired form field or section is invalid:
        // Add the .not-valid className to the parent element of the form field or section. For the activity section, the parent element would be the fieldset element for the activity section. For the others required inputs, the parent element would be a label element for the input.
        // Remove the .valid className from the parent element of the form field or section.
        // Display the .hint element associated with the form field or section, which will be the last child of the parent element of the form field or section. The parentElement and lastElementChild properties will be helpful here.

    // If a required form field or section is valid:
        // Add the .valid className to the parent element of the form field or section.
        // Remove the .not-valid className from the parent element of the form field or section.
        // Hide the .hint element associated with that element.