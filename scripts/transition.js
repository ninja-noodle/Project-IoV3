/**
 * Universal transition function with dynamic loader support
 * @param {string|HTMLElement} currentSection - Selector or DOM Element to exit
 * @param {string|HTMLElement} nextSection - Selector or DOM Element to enter
 * @param {string|HTMLElement} loader - Selector or DOM Element for the loader
 * @param {number} loaderDuration - Time in ms to show loader (default: 1000)
 */

document.addEventListener('DOMContentLoaded', () => {
    const initialSection = document.querySelector('#name-field-block');

    if (initialSection) {
        // Ensure hidden is removed if it was present
        initialSection.classList.remove('hidden');

        // Double requestAnimationFrame guarantees the browser renders initial state before animating
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                initialSection.classList.add('page', 'animate-scale-in');

                // Automatically focus the name input
                const nameInput = initialSection.querySelector('input');
                if (nameInput) nameInput.focus();
            });
        });
    }
});

function navigateSections(currentSection, nextSection, loader, loaderDuration = 1000) {
    const currentEl = typeof currentSection === 'string' ? document.querySelector(currentSection) : currentSection;
    const nextEl = typeof nextSection === 'string' ? document.querySelector(nextSection) : nextSection;
    const loaderEl = typeof loader === 'string' ? document.querySelector(loader) : loader;

    if (!currentEl || !nextEl) return;

    // 1. Reset any previous animation state and ensure base '.page' class exists
    currentEl.classList.remove('animate-scale-in');
    currentEl.classList.add('page');

    // Force browser reflow to guarantee CSS notices the new animation class
    void currentEl.offsetWidth;

    // 2. Play scale-out animation
    currentEl.classList.add('animate-scale-out');

    // 3. Wait for scale-out animation to finish (350ms)
    setTimeout(() => {
        currentEl.classList.add('hidden');
        currentEl.classList.remove('animate-scale-out', 'page'); // Clean up exit classes

        // 4. Show loader
        if (loaderEl) loaderEl.classList.remove('hidden');

        // 5. Run loader phase
        setTimeout(() => {
            // Hide loader
            if (loaderEl) loaderEl.classList.add('hidden');

            // 6. Reveal next section and trigger scale-in bounce
            nextEl.classList.remove('hidden');
            nextEl.classList.add('page', 'animate-scale-in');

            // 7. Auto-focus the first input box in the new section
            const firstInput = nextEl.querySelector('input');
            if (firstInput) firstInput.focus();

        }, loaderDuration);

    }, 350); // Matches your CSS exit animation duration
}