import { dataObj } from "./data.js";
import { moveNext, confirmBtn, callbacks } from "./navigation.js";
import validate from "./formValidation.js";
import { nameField, emailField, phoneField, acradeDiscount, advancedDiscount, proDiscount, form } from "./formFields.js";
import { planField, planField2, planField3 } from "./formFields.js";
import { billingM, billingY } from "./formFields.js";
import { arcadeOptionPrice, advancedOptionPrice, proOptionPrice } from "./formFields.js";
import { planPrice, planType, addOnSummary, total } from "./formFields.js";
import { onlineService, largeStorage, customization } from "./formFields.js";
import { onlineOption, storageOption, customizationOption } from "./formFields.js";


const formData = new FormData();
let selectedPlan, billingAbbr, selectedBilling, totalPrice, selectedAddOns = [];

selectedBilling = billingM.checked ? dataObj.monthly : dataObj.yearly;
billingAbbr = billingM.checked ? 'mo' : 'yr';
selectedPlan = { name: 'Arcade', price: selectedBilling.plan.arcade };

const updatePlan = () => {
    if (planField.checked) {
        selectedPlan = { name: 'Arcade', price: selectedBilling.plan.arcade };
    } else if (planField2.checked) {
        selectedPlan = { name: 'Advanced', price: selectedBilling.plan.advanced };
    } else if (planField3.checked) {
        selectedPlan = { name: 'Pro', price: selectedBilling.plan.pro };
    }
}

const updateAddOns = () => {
    selectedAddOns = [];
    if (onlineService.checked) {
        selectedAddOns.push({ name: 'Online Service', price: selectedBilling.addOn.onlineService });
    }
    if (largeStorage.checked) {
        selectedAddOns.push({ name: 'Cloud Storage', price: selectedBilling.addOn.cloudStorage });
    }
    if (customization.checked) {
        selectedAddOns.push({ name: 'Customization', price: selectedBilling.addOn.profile });
    }
}

[billingM, billingY, planField, planField2, planField3].forEach((input) => {
    const update = () => {
        selectedBilling = billingM.checked ? dataObj.monthly : dataObj.yearly;
        billingAbbr = billingM.checked ? 'mo' : 'yr';
        updatePlan();
        updateAddOns();
    }
    input.addEventListener('onload', () => {
        update();
    });
    input.addEventListener('change', () => {
        update();
    });
});

[onlineService, largeStorage, customization].forEach((input) => {
    input.addEventListener('change', () => {
        updateAddOns();
    });
});

// Update form data
/**
 * Updates the form data and displays the prices, discounts, and summary based on the selected options.
 */
export const updateForm = () => {
    arcadeOptionPrice.textContent = `$${dataObj.monthly.plan.arcade}/${billingAbbr}`;
    advancedOptionPrice.textContent = `$${dataObj.monthly.plan.advanced}/${billingAbbr}`;
    proOptionPrice.textContent = `$${dataObj.monthly.plan.pro}/${billingAbbr}`;

    if (selectedBilling === dataObj.monthly) {
        acradeDiscount.textContent = dataObj.monthly.discount + ' ' + 'months free';
        advancedDiscount.textContent = dataObj.monthly.discount + ' ' + 'months free';
        proDiscount.textContent = dataObj.monthly.discount + ' ' + 'months free';

        if (dataObj.monthly.discount === 0) {
            if (!acradeDiscount.classList.contains('hidden')) {
                acradeDiscount.classList.add('hidden');
            }
            if (!advancedDiscount.classList.contains('hidden')) {
                advancedDiscount.classList.add('hidden');
            }
            if (!proDiscount.classList.contains('hidden')) {
                proDiscount.classList.add('hidden');
            }
        } else {
            acradeDiscount.classList.remove('hidden');
            advancedDiscount.classList.remove('hidden');
            proDiscount.classList.remove('hidden');
        }
    }

    if (selectedBilling === dataObj.yearly) {
        acradeDiscount.textContent = dataObj.yearly.discount + ' ' + 'months free';
        advancedDiscount.textContent = dataObj.yearly.discount + ' ' + 'months free';
        proDiscount.textContent = dataObj.yearly.discount + ' ' + 'months free';

        if (dataObj.yearly.discount === 0) {
            if (!acradeDiscount.classList.contains('hidden')) {
                acradeDiscount.classList.add('hidden');
            }
            if (!advancedDiscount.classList.contains('hidden')) {
                advancedDiscount.classList.add('hidden');
            }
            if (!proDiscount.classList.contains('hidden')) {
                proDiscount.classList.add('hidden');
            }
        } else {
            acradeDiscount.classList.remove('hidden');
            advancedDiscount.classList.remove('hidden');
            proDiscount.classList.remove('hidden');
        }
    }

    // Add-ons price
    onlineOption.children[2].textContent = `$${dataObj.monthly.addOn.onlineService}/${billingAbbr}`;
    storageOption.children[2].textContent = `$${dataObj.monthly.addOn.cloudStorage}/${billingAbbr}`;
    customizationOption.children[2].textContent = `$${dataObj.monthly.addOn.profile}/${billingAbbr}`;

    // Summary
    planType.children[0].textContent = selectedPlan.name + ' ' + `(${billingAbbr === 'mo' ? 'Monthly' : 'Yearly'})`;
    planPrice.textContent = `$${selectedPlan.price}/${billingAbbr}`;
    addOnSummary.innerHTML = '';

    selectedAddOns.forEach((addOn) => {
        const container = document.createElement('div');
        container.classList.add('add-on-summary-item');
        const addOn_type = document.createElement('span');
        addOn_type.classList.add('add-on-type');
        addOn_type.textContent = addOn.name;
        const addOn_price = document.createElement('span');
        addOn_price.classList.add('add-on-price');
        addOn_price.textContent = `+$${addOn.price}/${billingAbbr}`;
        container.appendChild(addOn_type);
        container.appendChild(addOn_price);
        addOnSummary.appendChild(container);
    });

    // Total
    totalPrice = selectedPlan.price;
    selectedAddOns.forEach((addOn) => {
        totalPrice += addOn.price;
    });

    total.children[0].textContent = `Total (per ${billingAbbr === 'mo' ? 'month' : 'year'})`;
    total.children[1].textContent = `$${totalPrice}/${billingAbbr}`;
};

[planField, planField2, planField3, billingM, billingY].forEach((input) => {
    input.addEventListener('change', () => {
        updateForm();
    });
});

[onlineService, largeStorage, customization].forEach((input) => {
    input.addEventListener('change', () => {
        updateForm();
    });
});

//update form data when moving to next step in navigation.js
callbacks(updateForm);

//get data from form
const getPersonalData = () => {
    formData['name'] = nameField.value;
    formData['email'] = emailField.value;
    formData['phone'] = phoneField.value;
}

const getPlanData = () => {
    formData['plan'] = selectedPlan.name;
    formData['planPrice'] = `$${selectedPlan.price}`;
    formData['billing'] = billingAbbr === 'mo' ? 'Monthly' : 'Yearly';
}

const getAddOnData = () => {
    formData['addOns'] = selectedAddOns.map((addOn) => {
        return {
            name: addOn.name,
            price: `$${addOn.price}`
        }
    });
}

const getTotals = () => {
    formData['totalPrice'] = `$${totalPrice}`;
}

//ensure data is added to formData object
const appendData = () => {
    if (validate()) {
        getPersonalData();
    }
    getPlanData();
    getAddOnData();
    getTotals();
    return formData;
}

confirmBtn.addEventListener('click', () => {
    // window.location.href = 'success.html'; -> redirect to success page if needed
    const data = JSON.stringify(appendData());
    moveNext();
    fetch('http://url/endpoint', { // Post data to server-> replaced with appropriate url
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    }).then((res) => {
        console.alert('Data sent');
        form.reset();
    }).catch((err) => {
        console.error('Error', err);
    });
});
