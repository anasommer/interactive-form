const formEl = document.querySelector('form');
const email = document.querySelector('#email');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const cardNumber = document.querySelector('#cc-num');

// 'Name' field is being focused at the page load
const nameField = document.querySelector('#name');
nameField.focus();

// Hide 'Other Job Role' field by default
const otherJobRole = document.querySelector('#other-job-role');
otherJobRole.style.visibility = 'hidden';

const jobRole = document.querySelector('#title');
jobRole.addEventListener('change', e =>{
   if (e.target.value === 'other') {
    otherJobRole.style.visibility = 'visible';
   } else {
    otherJobRole.style.visibility = 'hidden';
   }
})

// Disable 'Color' select element
const colorSelect = document.querySelector('#color');
const colorOptions = colorSelect.children;
colorSelect.disabled = true;

// Design element should listen for user changes and show only t-shirt colors available for choosed design
const designSelect = document.querySelector('#design');
designSelect.addEventListener('change', e => {
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
})

// The Total $ el below the Register for Activities section should update to reflect the sum of the cost of the user's selected activities
const total = document.querySelector('#activities-cost');
const activities = document.querySelector('#activities');
const allActivities = document.querySelectorAll('#activities input');
let totalCost = 0;

    activities.addEventListener('change', e => {
      const clicked = e.target;   
      const clickedType = clicked.getAttribute('data-day-and-time');
      const activityCost = +clicked.getAttribute('data-cost');
     
      for(let i = 1; i < allActivities.length; i++) {
        const activityType = allActivities[i].getAttribute('data-day-and-time');

        if (clickedType === activityType && clicked !== allActivities[i]) {
            clicked.checked ? allActivities[i].disabled = true :
            allActivities[i].disabled = false;
        }
      }

        if (clicked.checked) { 
            totalCost += activityCost;
        } else if (!clicked.checked) {
            totalCost -= activityCost;
        } 
      total.innerHTML = `Total: $${totalCost}`;
    })



// The credit card payment option should be selected for the user by default. When the form first loads, 'Credit Card' should be displayed in the 'I'm going to pay with' <select> el
const payment = document.querySelector('#payment');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const creditCard = document.querySelector('#credit-card');

paypal.style.display = 'none';
bitcoin.style.display = 'none';
payment.children[1].selected = true;

    payment.addEventListener('change', e => {
        const paymentMethod = e.target.value;
        if (paymentMethod === 'paypal') {
            hidePaymentMethods(paypal, creditCard, bitcoin);
        } if (paymentMethod === 'bitcoin') {
            hidePaymentMethods(bitcoin, creditCard, paypal);
        } if (paymentMethod === 'credit-card') {
            hidePaymentMethods(creditCard, bitcoin, paypal);
        }
    })

    function hidePaymentMethods (show, hideMethod1, hideMethod2) {
        show.style.display = '';
        hideMethod1.style.display = 'none';
        hideMethod2.style.display = 'none';     
    }


formEl.addEventListener('submit', e => {
    if (!nameValidator()) {
        e.preventDefault();
    } else if (!emailValidator()) {
        e.preventDefault();
    } else if (!activitiesValidator()) {
        e.preventDefault();
    } else if (!validCardNumber()) {
        e.preventDefault();
    } else if (!validZip()) {
        e.preventDefault();
    } else if (!validCvv()) {
        e.preventDefault();
    }
})

// Form Validators
const nameValidator = () => {
    const nameValue = nameField.value;
    const validName = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    return validName;
}

const emailValidator = () => {
    const emailValue = email.value;
    const validEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    return validEmail;
}

const activitiesValidator = () => {
    const validActivities = totalCost > 0;
    return validActivities;
}

const validCardNumber = () => {
    const cardNumberValue = cardNumber.value;
    const validCardNumber = /^\d{13,16}$/.test(cardNumberValue);
    return validCardNumber;
}

const validZip = () => {
    const zipValue = zipCode.value;
    const validZip = /^\d{5}$/.test(zipValue);
    return validZip;
} 

const validCvv = () => {
    const cvvValue = cvv.value;
    const validCvv = /^\d{3}$/.test(cvvValue);
    return validCvv;
}

activities.addEventListener('focus', () => {
    for (let i = 1; i < allActivities.length; i ++) {
        console.log(allActivities[i]);
    }
})

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