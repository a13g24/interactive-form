let otherJobRoleInput = document.getElementById('other-job-role');
let colorSelector = document.getElementById('color');
let paymentInfoFieldset = document.querySelector('.payment-methods');
let jobRoleSelector = document.querySelector('select');
let designSelector = document.getElementById('design');
let jsPuns = [];  // holds js puns shirt colors
let heartJs = []; // holds heart js shirt colors
let colorSelectorChildren = colorSelector.children;

// things to do when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded and parsed');

    // focus cursor in name field
    document.getElementById('name').focus();

    // hide other job field
    otherJobRoleInput.style.display = 'none';

    // disable color selector by default
    colorSelector.disabled = true;

    // select credit card in payment area by default
    document.getElementById('payment').children[1].selected = true;

    // hide paypal payment
    paymentInfoFieldset.children[3].hidden = true;

    // hide bitcoin payment
    paymentInfoFieldset.children[4].hidden = true;

    // separates puns and hearts colors into disparate arrays
    for (let i of colorSelectorChildren) {
        let attr = i.getAttribute('data-theme');

        // display only js puns colors
        if (attr === 'js puns') {
            jsPuns.push(i);
        } else if (attr === 'heart js') {
            heartJs.push(i);
        }
    }

    // get activities box
    let activitiesBox = document.querySelector('#activities-box');

    // highlight activities boxes 
    for (let child of activitiesBox.children) {
        child.firstElementChild.addEventListener('focus', () => {
            child.className = 'focus';
        })

        child.firstElementChild.addEventListener('blur', () => {
            child.classList.remove('focus');
        })
    }
});

// job role selector listener
jobRoleSelector.addEventListener('change', (e) => {
    let selectedValue = e.target.value;

    if (selectedValue.toLowerCase() === 'other') {
        // show box if other selected
        otherJobRoleInput.style.display = '';
    } else {
        // hide box if other is not selected
        otherJobRoleInput.style.display = 'none';
    }
});

// design selector listener
designSelector.addEventListener('change', (e) => {
    // enable color selector
    colorSelector.disabled = false;

    // hides/unhides certain options in selection menu
    let hideUnhide = function(boolOne, boolTwo) {
        jsPuns.forEach( el => el.hidden = boolOne );
        heartJs.forEach( el => el.hidden = boolTwo );
    }

    // reveals the first option in the selected list
    let showFirst = function(element) {
        for (let child of element.children) {
            if (!child.hidden) {
                child.selected = true;
                break;
            }
        }
    }

    // display js puns
    if (e.target.value.toLowerCase() === 'js puns') {
        hideUnhide(false, true);
    } else {
        // display I heart options
        hideUnhide(true, false);
    }

    showFirst(colorSelector);
});

// register for activities section
let registerForActivitiesFieldset = document.getElementById('activities');
let total = 0;
registerForActivitiesFieldset.addEventListener('change', (e) => {
    let amt = e.target.getAttribute('data-cost')

    // add to total
    if (e.target.checked) {
        total += Number.parseInt(amt);
    } else {
        total -= Number.parseInt(amt)
    }
    // subtract from total
    document.getElementById('activities-cost').textContent = `Total: $${total}`;
});

    /** PAYMENT AREA **/

 // Listener for payment info section
paymentInfoFieldset.addEventListener('change', (e) => {
    let val = e.target.value;
    let creditCard = paymentInfoFieldset.children[2];
    let ccExpr = document.getElementById('exp-month');
    let ccExprYear = document.getElementById('exp-year');
    let paypal = paymentInfoFieldset.children[3];
    let bitcoin = paymentInfoFieldset.children[4];

    // hides/shows credit card fields 
    let hideShowCC = function(bool) {
        creditCard.hidden = bool;
        ccExpr.hidden = bool;
        ccExprYear.hidden = bool;
    };

    switch (val) {
        case 'credit-card':
            // show cc
            hideShowCC(false);

            // hide paypal
            paypal.hidden = true;

            // hide bitcoin
            bitcoin.hidden = true;
            break;
        case 'paypal':
            // show paypal
            paypal.hidden = false;

            // hide cc
            hideShowCC(true);

            // hide bitcoin
            bitcoin.hidden = true;
            break;
        case 'bitcoin':
            // show bitcoin
            bitcoin.hidden = false;

            // hide cc
            hideShowCC(true);

            // hide paypal
            paypal.hidden = true;
            break;
    }
});

    /** FORM VALIDATION **/
/**
 * Provides accessibility for when validation succeeds.
 * @param {Object} element - The element to display validation
 */
function validationPass(element) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
}

/**
 * Provides accessibility warning for when validation fails.
 * @param {Object} element - The element to display validation for.
 */
function validationFail(element) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
}

/**
 * Validates name.
 * @returns true if name field is valid
 */
const nameValidator = () => {
    let nameElement = document.getElementById('name');
    let nameValue = nameElement.value;
    let nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);

    if (nameIsValid) {
        validationPass(nameElement);
    } else {
        validationFail(nameElement);
    }

    return nameIsValid;
}

/**
 * Validates email.
 * @returns true if email is valid
 */
const emailValidator = () => {
    let email = document.getElementById('email');
    let emailValue = email.value;
    let emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);

    if (emailIsValid) {
        validationPass(email);
    } else {
        validationFail(email);
    }

    return emailIsValid;
}

/**
 * Validates activities.
 * @returns true if at least 1 activity is selected
 */
const activitiesValidator = () => {
    let count = 0;

    let activities = document.getElementById('activities-box')

    // determine checked status of all activities
    for (let i of activities.children) {
        if (i.firstElementChild.checked) {
            // check is found, incr count
            count++;
        }
    }

    // at least 1 activity must be selected
    let activitiesIsValid = count > 0;

    if (activitiesIsValid) {
        validationPass(activities);
    } else {
        validationFail(activities);
    }

    return activitiesIsValid;
}

/**
 * Validates credit card.
 * @returns true if cc, zip and cvv are valid entries
 */
const ccValidator = () => {
    let isCCSelected = false;

    // find which payment method is selected
    for (let i of document.getElementById('payment').children) {
        if (i.value === 'credit-card') {
            isCCSelected = i.selected;
            break;
        }
    }

    if (isCCSelected) {
        let cc = document.getElementById('cc-num');

        // get cc number
        let ccNumValue = cc.value;

        // validate cc number
        let isValidCCNum = /^\d{13,16}$/.test(ccNumValue);

        let zip = document.getElementById('zip');

        // get zip
        let zipValue = zip.value;

        // validate zip
        let isValidZip = /^\d{5}$/.test(zipValue);

        let cvv = document.getElementById('cvv');

        // get cvv
        let cvvValue = cvv.value;

        // validate cvv
        let isValidCvv = /^\d{3}$/.test(cvvValue);

        let isPaymentValid = isValidCCNum  && isValidZip && isValidCvv;

        // visualize validation for cc
        if (isValidCCNum) {
            validationPass(cc);
        } else {
            validationFail(cc);
        }

        // visualize validation for zip
        if (isValidZip) {
            validationPass(zip);
        } else {
            validationFail(zip);
        }

        // visualize validation for cvv
        if (isValidCvv) {
            validationPass(cvv);
        } else {
            validationFail(cvv);
        }

        return isPaymentValid;
    }
}

// validate the form
document.querySelector('form').addEventListener('submit', (e) => {
    if (!nameValidator()) {
        e.preventDefault();
    }

    if (!emailValidator()) {
        e.preventDefault();
    }

    if (!activitiesValidator()) {
        e.preventDefault();
    }

    if (!ccValidator()) {
        e.preventDefault();
    }
});