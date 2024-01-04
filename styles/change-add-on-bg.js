const option1 = document.getElementById('online-option');
const option2 = document.getElementById('storage-option');
const option3 = document.getElementById('customization-option');
const input1 = document.getElementById('online-service');
const input2 = document.getElementById('large-storage');
const input3 = document.getElementById('customization');

//if option1 is clicked add style to option1 if input1 is checked
input1.addEventListener('click', (e) => {
    if (e.target.checked) {
        option1.classList.add('selected-addon');
    }
    else {
        option1.classList.remove('selected-addon');
    }
});
//if option2 is clicked add style to option2 if input2 is checked
input2.addEventListener('click', (e) => {
    if (e.target.checked) {
        option2.classList.add('selected-addon');
    }
    else {
        option2.classList.remove('selected-addon');
    }
});
//if option3 is clicked add style to option3 if input3 is checked
input3.addEventListener('click', (e) => {
    if (e.target.checked) {
        option3.classList.add('selected-addon');
    }
    else {
        option3.classList.remove('selected-addon');
    }
});