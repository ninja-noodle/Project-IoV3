document.addEventListener('DOMContentLoaded', () => {
    const pinContainer = document.getElementById('pin-field');
    const inputs = pinContainer.querySelectorAll('.pin');
    const button = document.querySelector('#pin-field-block-content button');

    // Replace with your generated 64-character SHA-256 string
    const CORRECT_PIN_HASH = "fcbba330679e1a7561aeab1faa73482aedd5fc30d12d7842aae4936a1394f3d7";

    // SHA-256 helper
    async function hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Get current PIN value
    const getEnteredPin = () => Array.from(inputs).map(i => i.value).join('');

    // Clear fields on error
    const resetInputs = () => {
        inputs.forEach(input => input.value = '');
        inputs[0].focus();
    };

    // Dedicated validation function
    async function checkPinMatch() {
        const enteredPin = getEnteredPin();
        const enteredHash = await hashString(enteredPin);

        if (enteredHash === CORRECT_PIN_HASH) {
            navigateSections('#dob-field-block', '#success-block');
        } else {
            document.getElementById('dob-pin-error').classList.remove('hidden');
            resetInputs();
        }
    }

    // 1. Click Listener
    button.addEventListener('click', (e) => {
        e.preventDefault();
        checkPinMatch();
    });

    // 2. Enter Key Listener on all PIN inputs
    // Note: Using 'keydown' is recommended over 'keypress' as keypress is deprecated
    pinContainer.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkPinMatch();
        }
    });
});