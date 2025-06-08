document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebarContainer = document.getElementById('sidebar-container');
    const sidebarMenu = document.getElementById('sidebar-menu');

    // Open sidebar
    hamburgerIcon.addEventListener('click', () => {
        sidebarContainer.classList.add('open');
        sidebarMenu.classList.add('open');
    });

    // Close sidebar by clicking close button
    closeSidebarBtn.addEventListener('click', () => {
        sidebarContainer.classList.remove('open');
        sidebarMenu.classList.remove('open');
    });

    // Close sidebar by clicking outside the menu (on the overlay)
    sidebarContainer.addEventListener('click', (event) => {
        // Check if the click occurred directly on the container and not on the sidebar menu itself
        if (event.target === sidebarContainer) {
            sidebarContainer.classList.remove('open');
            sidebarMenu.classList.remove('open');
        }
    });

    // Optional: Close sidebar when a link inside is clicked
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebarContainer.classList.remove('open');
            sidebarMenu.classList.remove('open');
        });
    });

    // JavaScript for progress circle (for visual effect, not actual data)
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        const percentageText = card.querySelector('.stat-progress-circle span').textContent;
        const percentage = parseFloat(percentageText.replace('%', ''));
        let progressFill = card.querySelector('.stat-progress-fill');
        if (!progressFill) {
            progressFill = document.createElement('div');
            progressFill.classList.add('stat-progress-fill');
            card.querySelector('.stat-progress-circle').prepend(progressFill);
        }
        progressFill.style.setProperty('--progress', percentage + '%');
    });
});
