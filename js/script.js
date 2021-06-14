const formEl = document.querySelector('form');
const nameField = document.querySelector('#name');
const email = document.querySelector('#email');
const jobRole = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');
const designSelect = document.querySelector('#design');
const colorSelect = document.querySelector('#color');
const activities = document.querySelector('#activities');
const allActivities = document.querySelectorAll('#activities input');
const activitiesBox = document.querySelector('#activities-box');
const total = document.querySelector('#activities-cost');
const cardNumber = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const payment = document.querySelector('#payment');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const creditCard = document.querySelector('#credit-card');



// 'Name' field is being focused at the page load
nameField.focus();

// Hide 'Other Job Role' field by default
otherJobRole.style.visibility = 'hidden';

// 'Job Role' section should listen for user changes and shows 'Other Role' input if option 'Other' is checked
jobRole.addEventListener('change', e =>{
   if (e.target.value === 'other') {
    otherJobRole.style.visibility = 'visible';
   } else {
    otherJobRole.style.visibility = 'hidden';
   }
})

// Disable 'Color' select element
colorSelect.disabled = true;

// Design element should listen for user changes and show only t-shirt colors available for choosed design
designSelect.addEventListener('change', e => {
    const theme = e.target.value;
    colorSelect.disabled = false;
    const colorChildren = colorSelect.children;

    for (let i = 1; i < colorChildren.length; i++) {
        const colorOption = colorChildren[i].getAttribute('data-theme');

        if (theme === colorOption) {
            colorChildren[i].hidden = false;
            colorChildren[i].setAttribute('selected', true);
        }
        else if (theme !== colorOption) {
            colorChildren[i].hidden = true;
            colorChildren[i].removeAttribute('selected', false);
        }
    }
})


// The Total $ el below the Register for Activities section should update to reflect the sum of the cost of the user's selected activities and prevent user from registration of activities if they are happening at the same time
let totalCost = 0;
    // 'Register for Activities' should listen for user changes
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



// The credit card payment option should be selected for the user by default. When the form first loads, 'Credit Card' should be displayed in the 'I'm going to pay with'
payment.children[1].selected = true;
paypal.style.display = 'none';
bitcoin.style.display = 'none';

// 'I'm going to pay' section should listen for user changes and shows chosen payment method to the user
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

    // Hide other payment options
    function hidePaymentMethods (show, hideMethod1, hideMethod2) {
        show.style.display = '';
        hideMethod1.style.display = 'none';
        hideMethod2.style.display = 'none';
    }

// Form element shoul listen for submit and prevent form from sending if there'se a problem in validation
formEl.addEventListener('submit', e => {
    if (!nameValidator()) {
        e.preventDefault();
        validationMessage(nameField, 'valid', 'not-valid', 'block');
    } else {
        validationMessage(nameField, 'not-valid', 'valid');
    }
    if (!emailValidator()) {
        e.preventDefault();
        validationMessage(email, 'valid', 'not-valid', 'block');
    }  else {
        validationMessage(email, 'not-valid', 'valid');
    }
    if (!activitiesValidator()) {
        e.preventDefault();
        validationMessage(activitiesBox, 'valid', 'not-valid', 'block');
    } else {
        validationMessage(activitiesBox, 'not-valid', 'valid');
    }
    if (payment.value === 'credit-card') {
        if (!validCardNumber()) {
            e.preventDefault();
            validationMessage(cardNumber, 'valid', 'not-valid', 'block');
        } else {
            validationMessage(cardNumber, 'not-valid', 'valid');
        }
        if (!validZip()) {
            e.preventDefault();
            validationMessage(zipCode, 'valid', 'not-valid', 'block');
        } else {
            validationMessage(zipCode, 'not-valid', 'valid');
        }
        if (!validCvv()) {
            e.preventDefault();
            validationMessage(cvv, 'valid', 'not-valid', 'block');
        } else {
            validationMessage(cvv, 'not-valid', 'valid');
        }
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

const validationMessage = (id, removeClass, addClass, display = '') => {
    const parentElement = id.parentElement;
    parentElement.classList.remove(removeClass);
    parentElement.classList.add(addClass);
    parentElement.lastElementChild.style.display = display;
}


// Accessibility - Make all of the activity checkbox input elements to listen for the focus and blur events.
function focusBlur (){

  for (let i = 0; i < allActivities.length; i++) {

    allActivities[i].addEventListener('focus', () => {
    const checkboxLabel = allActivities[i].parentElement.classList.add('focus');
    });
    allActivities[i].addEventListener('blur', () =>{
    const checkboxLabel = allActivities[i].parentElement.classList.remove('focus');
    })
 } 
}
focusBlur();
