let jobRoleSelector = document.querySelector('select');
let otherJobRoleInput = document.getElementById('other-job-role');
let colorSelector = document.getElementById('color');

// things to do when page loads
document.addEventListener('DOMContentLoaded', () => {
    // TODO - remove this log
    console.log('DOM loaded and parsed');

    // focus cursor in name field
    document.getElementById('name').focus();

    // hide other job field
    otherJobRoleInput.style.display = 'none';

    // disable color selector by default
    colorSelector.disabled = true;
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


let designSelector = document.getElementById('design');
let jsPuns = [];  // holds js puns shirt colors
let heartJs = []; // holds heart js shirt colors
let colorSelectorChildren = colorSelector.children;

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

// design selector listener
designSelector.addEventListener('change', (e) => {
    // enable color selector
    colorSelector.disabled = false;

    // hides/unhides certain options in selection menu
    let hideUnhide = function(boolOne, boolTwo) {
        jsPuns.forEach( el => el.hidden = boolOne );
        heartJs.forEach( el => el.hidden = boolTwo );
    }
    
    // display js puns
    if (e.target.value.toLowerCase() === 'js puns') {
        hideUnhide(false, true);
    } else {
        // display I heart options
        hideUnhide(true, false);
    }
});