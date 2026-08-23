document.addEventListener('DOMContentLoaded', () => {
    const pinContainer = document.getElementById('gift-pin-field');
    const inputs = pinContainer.querySelectorAll('.gift-pin');
    const button = document.querySelector('#gift-pin-field-block-content button');

    // Replace with your generated 64-character SHA-256 string
    const CORRECT_PIN_HASH = "63cf52215b7514d8dcdc9bfabd47aef052acce6dbc732367e4e0d97c8c2ad01a";

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
            document.getElementById('gift-pin-error').classList.add('hidden');
            navigateSections('#view-gifts', '#view-gifts-content');
            document.body.style.padding = '0';
            document.documentElement.style.padding = '0';
        } else {
            document.getElementById('gift-pin-error').classList.remove('hidden');
            resetInputs();
        }
    }

    // 1. Click Listener
    if (button) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            checkPinMatch();
        });
    }

    // 2. Enter Key Listener on all PIN inputs
    pinContainer.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkPinMatch();
        }
    });
});