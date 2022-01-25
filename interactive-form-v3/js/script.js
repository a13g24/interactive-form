let otherJobRoleInput = document.getElementById('other-job-role');
otherJobRoleInput.style.display = 'none';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded and parsed');
    document.getElementById('name').focus();
});

// listen for event change on Job Role selector
let jobRoleSelector = document.querySelector('select');
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