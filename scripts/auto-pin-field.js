document.addEventListener('DOMContentLoaded', () => {
    const dobBlock = document.getElementById('dob-field-block');
    const pinContainer = document.getElementById('pin-field');
    const inputs = pinContainer.querySelectorAll('.pin');

    // Helper to trigger active animation and focus
    const triggerActiveAnimation = (input) => {
        if (!input) return;
        input.focus();
        input.classList.add('active');

        setTimeout(() => {
            input.classList.remove('active');
        }, 200);
    };

    // Helper to focus the first input safely
    const focusFirstInput = () => {
        if (inputs.length > 0 && !dobBlock.classList.contains('hidden')) {
            // Small timeout ensures the DOM has updated visibility before focusing
            setTimeout(() => triggerActiveAnimation(inputs[0]), 50);
        }
    };

    // Enforce single-character & numeric rules
    inputs.forEach((input) => {
        input.setAttribute('maxlength', '1');
        input.setAttribute('inputmode', 'numeric');
    });

    // 1. Focus immediately if already visible on load
    focusFirstInput();

    // 2. Watch for class changes (un-hiding) on #dob-field-block
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                focusFirstInput();
            }
        });
    });

    observer.observe(dobBlock, { attributes: true });

    // 3. Auto-advance when typing
    pinContainer.addEventListener('input', (e) => {
        const target = e.target;
        if (!target.classList.contains('pin')) return;

        target.value = target.value.replace(/\D/g, '');
        const index = Array.from(inputs).indexOf(target);

        if (target.value && index < inputs.length - 1) {
            triggerActiveAnimation(inputs[index + 1]);
        }
    });

    // 4. Handle Backspace navigation
    pinContainer.addEventListener('keydown', (e) => {
        const target = e.target;
        if (!target.classList.contains('pin')) return;

        const index = Array.from(inputs).indexOf(target);

        if (e.key === 'Backspace' && !target.value && index > 0) {
            triggerActiveAnimation(inputs[index - 1]);
        }
    });

    // 5. Handle Paste
    pinContainer.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');

        inputs.forEach((input, index) => {
            if (pastedData[index]) {
                input.value = pastedData[index];
            }
        });

        const focusIndex = Math.min(pastedData.length, inputs.length - 1);
        triggerActiveAnimation(inputs[focusIndex]);
    });
});