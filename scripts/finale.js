document.addEventListener('DOMContentLoaded', () => {
    const doneButton = document.getElementById('done-gifts-btn');

    if (doneButton) {
        doneButton.addEventListener('click', (e) => {
            e.preventDefault();

            // Navigate to final thank-you card
            navigateSections('#view-gifts-content', '#thank-you-block');

            // Restore standard layout padding if modified earlier
            document.body.style.padding = '';
            document.documentElement.style.padding = '';

            // Ensure view scrolls to top for final card
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});