const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');
const step4 = document.getElementById('step-4');
const step5 = document.getElementById('step-5');

const navSteps = document.querySelectorAll('.step-num');

const panelBtns = document.querySelector('.panel-btn');

const confirmBtn = document.getElementById('confirm');
const backBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');

const steps = [step1, step2, step3, step4, step5];

let currentStepIndex = 0;

const removeActive = () => {
    steps.forEach(step => {
        if (step.classList.contains('active')) {
            step.classList.remove('active');
            return;
        }
        return;
    });
}
const moveNext = () => {
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
    }
    if (currentStepIndex === 3) {
        confirmBtn.classList.remove('hidden');
        nextBtn.classList.add('hidden');
    }
    navSteps[currentStepIndex].classList.add('selected');
    navSteps[currentStepIndex - 1]?.classList.remove('selected');
}

const moveBack = () => {
    console.log(currentStepIndex);
    steps[currentStepIndex].classList.remove('active');
    currentStepIndex--;
    console.log(currentStepIndex);
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

nextBtn.addEventListener('click', moveNext);
backBtn.addEventListener('click', moveBack);

if (steps[0].classList.contains('active')) {
    backBtn.classList.add('hidden');
}
if (step5.classList.contains('active')){
    console.log('hello')
}
confirmBtn.classList.add('hidden');
confirmBtn.addEventListener('click', () => {
    // window.location.href = 'success.html';
    moveNext();
});

console.log(steps[4])
