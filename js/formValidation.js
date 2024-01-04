//personal info validation

const nameField = document.getElementById('person-name');
const emailField = document.getElementById('email');
const phoneField = document.getElementById('phone');

const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}(?:\.[a-z]{2,})?$/;

export default function validatePersonalInfo() {
    let valid = true;

    const createError = (field, message, element_id) => {
        field.classList.add('error');
        field.setCustomValidity('');
        const err = document.createElement('span');
        err.classList.add('error-message');
        err.textContent = message;
        document.getElementById(element_id).appendChild(err);
        field.reportValidity();
        valid = false;
    }
    const removeError = (field, element_id) => {
        field.classList.remove('error');
        field.setCustomValidity('');
        const errContainer = document.getElementById(element_id);
        if (errContainer) {
            errContainer.children[0]?.remove();
        }
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
        removeError(phoneField, 'phone-label');
        createError(phoneField, 'Phone is required.', 'phone-label');
    } else {
        removeError(phoneField, 'phone-label');
    }

    return valid;
}