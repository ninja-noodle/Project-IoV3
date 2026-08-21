function showMainContent() {
    const loginSection = document.querySelector('#name-field-block');
    const secretSection = document.querySelector('#dob-field-block');

    // 1. Play scale-out animation on the current section
    loginSection.classList.add('page', 'animate-scale-out');

    // 2. Wait 350ms for scale-out to complete
    setTimeout(() => {
        loginSection.classList.add('hidden'); // Hide login completely

        // 3. Reveal secret content and trigger scale-in bounce
        secretSection.classList.remove('hidden');
        secretSection.classList.add('page', 'animate-scale-in');
    }, 350);
}