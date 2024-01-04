import  validate  from './formValidation.js';

//form navigation
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');
const step4 = document.getElementById('step-4');
const step5 = document.getElementById('step-5');

const navSteps = document.querySelectorAll('.step-num');

const confirmBtn = document.getElementById('confirm');
const backBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');

const steps = [step1, step2, step3, step4, step5];

const changeBtn = document.getElementById('change-link');

let currentStepIndex = 0;

const moveNext = () => {
    if (currentStepIndex === 0) {
        if (!validate()) {
            return;
        }
    }
    steps[currentStepIndex].classList.remove('active');
    currentStepIndex++;
    steps[currentStepIndex].classList.add('active');

    if (currentStepIndex > 0) {
        backBtn.classList.remove('hidden');
    }
    if (currentStepIndex === 4) {
        // nextBtn.classList.add('hidden');
        // confirmBtn.classList.add('hidden');
        // backBtn.classList.add('hidden');
        nextBtn.remove();
        backBtn.remove();
        confirmBtn.remove();
        navSteps.item(currentStepIndex-1).classList.add('selected');
    }
    if (currentStepIndex === 3) {
        confirmBtn.classList.remove('hidden');
        nextBtn.classList.add('hidden');
    }
    if (navSteps[currentStepIndex]){
        navSteps[currentStepIndex].classList.add('selected');
    }
    if (currentStepIndex !== 4){
        navSteps[currentStepIndex - 1]?.classList.remove('selected');
    }
}

const moveBack = () => {
    steps[currentStepIndex].classList.remove('active');
    currentStepIndex--;
    steps[currentStepIndex].classList.add('active');
    if (currentStepIndex === 0) {
        backBtn.classList.add('hidden');
    }
    if (currentStepIndex < 4) {
        nextBtn.classList.remove('hidden');
        confirmBtn.classList.add('hidden');
    }
    navSteps[currentStepIndex].classList.add('selected');
    navSteps[currentStepIndex + 1]?.classList.remove('selected');
}

if (steps[0].classList.contains('active')) {
    backBtn.classList.add('hidden');
}

confirmBtn.classList.add('hidden');

nextBtn.addEventListener('click', moveNext);
backBtn.addEventListener('click', moveBack);
changeBtn.addEventListener('click', ()=>{
    steps[currentStepIndex].classList.remove('active');
    navSteps[currentStepIndex]?.classList.remove('selected');
    currentStepIndex = 1;
    steps[currentStepIndex].classList.add('active');
    nextBtn.classList.remove('hidden');
    confirmBtn.classList.add('hidden');
    navSteps[currentStepIndex].classList.add('selected');
    navSteps[currentStepIndex + 1]?.classList.remove('selected');
});

export { moveNext, confirmBtn };

