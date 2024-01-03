const mlabel = document.getElementById('monthly-billing-label');
const ylabel = document.getElementById('yearly-billing-label');

mlabel.addEventListener('click', (e) => {
    if (e.target.classList.contains('selected-billing')) {
        return;
    }
    mlabel.classList.add('selected-billing');
    if (ylabel.classList.contains('selected-billing')) {
        ylabel.classList.remove('selected-billing');
    }
});
ylabel.addEventListener('click', (e) => {
    if (e.target.classList.contains('selected-billing')) {
        return;
    }
    ylabel.classList.add('selected-billing');
    if (mlabel.classList.contains('selected-billing')) {
        mlabel.classList.remove('selected-billing');
    }
});