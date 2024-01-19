//personal info validation
import { nameField, emailField, phoneField } from "./formFields.js";

const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}(?:\.[a-z]{2,})?$/;
const removeError = (field, element_id) => {
    field.classList.remove('error');
    field.setCustomValidity('');
    const errContainer = document.getElementById(element_id);
    if (errContainer) {
        errContainer.children[0]?.remove();
    }
}

nameField.addEventListener('input', () => {
    removeError(nameField, 'name-label');
});
emailField.addEventListener('input', () => {
    removeError(emailField, 'email-label');
});
phoneField.addEventListener('input', () => {
    removeError(phoneField, 'phone-label');
});


export default function validatePersonalInfo() {
    let valid = true;

    const createError = (field, message, element_id) => {
        field.classList.add('error');
        field.setCustomValidity('');
        const err = document.createElement('span');
        err.classList.add('error-message');
        err.textContent = message;
        document.getElementById(element_id).appendChild(err);
        // field.reportValidity();
        valid = false;
    }
    if (!nameField.checkValidity()) {
        removeError(nameField, 'name-label');
        createError(nameField, 'Name is required.', 'name-label');
    } else {
        removeError(nameField, 'name-label');
    }
    if (!emailField.checkValidity()) {
        removeError(emailField, 'email-label');
        createError(emailField, 'Email is required.', 'email-label');

    } else if (!pattern.test(emailField.value)) {
        removeError(emailField, 'email-label');
        createError(emailField, 'Invalid email.', 'email-label');
    } else {
        removeError(emailField, 'email-label');
    }

    if (!phoneField.checkValidity()) {
        if (phoneField.value === '') {
            removeError(phoneField, 'phone-label');
            createError(phoneField, 'Phone is required.', 'phone-label');
        } else {
            removeError(phoneField, 'phone-label');
            createError(phoneField, 'Invalid phone number.', 'phone-label');
        }
    } else {
        removeError(phoneField, 'phone-label');
    }
    //remove event listener
    nameField.removeEventListener('input', () => {
        removeError(nameField, 'name-label');
    });
    emailField.removeEventListener('input', () => {
        removeError(emailField, 'email-label');
    });
    phoneField.removeEventListener('input', () => {
        removeError(phoneField, 'phone-label');
    });
    return valid;
}