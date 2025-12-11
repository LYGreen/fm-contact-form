/** @type {HTMLFormElement} */
const form = document.getElementById('form');

/** @type {Number} */
let timer = null;

/**
 * Displays the message box with animation.
 */
const displayMessageBox = () => {
    const messageBox = document.getElementById('messagebox');

    const animate = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        messageBox.style.top = messageBox.clientHeight + 25 + 'px';
        timer = setTimeout(() => {
            messageBox.style.top = '0';
        }, 3000);
    };

    animate();
}

/**
 * Handles form submission.
 * @param {Event} e - The submit event.
 */
form.addEventListener('submit', (e) => {
    e.preventDefault();

    /** @type {HTMLElement[]} */
    const fields = document.querySelectorAll('.field');

    fields.forEach(field => {
        /** @type {HTMLInputElement | HTMLTextAreaElement} */
        const input = field.querySelector('input, textarea');

        /** @type {HTMLElement[]} */
        const errors = field.querySelectorAll('.error, .error-invalid');
        errors.forEach(error => error.style.display = 'none');

        // Required field validation
        if (input.value.trim() == '') {
            /** @type {HTMLElement} */
            const error = field.querySelector('.error');
            error.style.display = 'inline';
            return;
        }

        // Email validation
        if (!input.validity.valid) {
            /** @type {HTMLElement} */
            const error = field.querySelector('.error-invalid') || field.querySelector('.error');
            error.style.display = 'inline';
            return;
        }

    });

    /** @type {HTMLElement[]} */
    const invalidFields = form.querySelectorAll(':invalid');

    if (invalidFields.length > 0) {
        return;
    } else {
        displayMessageBox();
    }

});

