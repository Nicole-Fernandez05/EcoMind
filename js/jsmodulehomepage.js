
        document.addEventListener('DOMContentLoaded', () => {
    // --- Sidebar/Hamburger Menu Functionality ---
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebarContainer = document.getElementById('sidebar-container');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const currentYearSpan = document.getElementById('year');

    // Set current year in the footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Open sidebar - will only work if hamburgerIcon is made visible in CSS
    if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', () => {
            sidebarContainer.classList.add('open');
            sidebarMenu.classList.add('open');
        });
    }

    // Close sidebar by clicking close button
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', () => {
            sidebarContainer.classList.remove('open');
            sidebarMenu.classList.remove('open');
        });
    }

    // Close sidebar by clicking outside the menu (on the overlay)
    if (sidebarContainer) {
        sidebarContainer.addEventListener('click', (event) => {
            if (event.target === sidebarContainer) {
                sidebarContainer.classList.remove('open');
                sidebarMenu.classList.remove('open');
            }
        });
    }

    // Optional: Close sidebar when a link inside is clicked
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebarContainer.classList.remove('open');
            sidebarMenu.classList.remove('open');
        });
    });

    // Update navigation links to match the new structure
    const topNavLinks = document.querySelectorAll('.top-nav-links a');
    const currentPath = window.location.pathname;

    topNavLinks.forEach(link => {
        link.classList.remove('active'); // Remove active from all first
        // Adjust active class based on current page
        if (link.href.includes('home.html') && currentPath.includes('home.html')) {
            link.classList.add('active');
        } else if (link.href.includes('modulehomepage.html') && currentPath.includes('modulehomepage.html')) {
            link.classList.add('active');
        } else if (link.href.includes('gamehomepage.html') && currentPath.includes('gamehomepage.html')) {
            link.classList.add('active');
        }
        // Default active for home if no other match
        if (currentPath === '/' || currentPath.includes('index.html')) {
            // Check if home link is specifically present and mark active
            if (link.href.includes('home.html') || link.href.endsWith('#home')) {
                link.classList.add('active');
            }
        }
    });


    const moduleLinks = document.querySelectorAll('.modules-container .module-link');

    // Function to check module completion status from localStorage
    const isModuleCompleted = (moduleNumber) => {
        return localStorage.getItem(`module${moduleNumber}Completed`) === 'true';
    };

    // Function to update module link status based on completion
    const updateModuleLinks = () => {
        moduleLinks.forEach((link, index) => {
            const moduleNumber = index + 1; // Modules are 1-indexed (Module 1, Module 2, etc.)
            const moduleCard = link.querySelector('.module-card');
            const moduleLabel = moduleCard.querySelector('.module-label').textContent;

            // Module 1 is always accessible
            if (moduleNumber === 1) {
                link.href = `module1.html`; // Set the actual link for Module 1
                link.classList.remove('locked');
                moduleCard.setAttribute('aria-disabled', 'false');
                link.style.pointerEvents = 'auto'; // Ensure it's clickable
                moduleCard.style.opacity = '1'; // Ensure full visibility
                moduleCard.style.cursor = 'pointer'; // Restore pointer cursor
                return; // Skip further checks for Module 1
            }

            // For subsequent modules, check if the previous module is completed
            if (isModuleCompleted(moduleNumber - 1)) {
                link.href = `module${moduleNumber}.html`; // Set the actual link for the module
                link.classList.remove('locked');
                moduleCard.setAttribute('aria-disabled', 'false');
                link.style.pointerEvents = 'auto';
                moduleCard.style.opacity = '1';
                moduleCard.style.cursor = 'pointer';
            } else {
                link.href = '#'; // Prevent navigation
                link.classList.add('locked');
                moduleCard.setAttribute('aria-disabled', 'true');
                link.style.pointerEvents = 'none'; // Disable clicks
                moduleCard.style.opacity = '0.6'; // Visually indicate it's locked
                moduleCard.style.cursor = 'not-allowed'; // Change cursor for locked modules

              
                if (!link.hasAttribute('data-locked-listener')) { // Prevent adding multiple listeners
                    link.addEventListener('click', (e) => {
                        if (link.classList.contains('locked')) {
                            e.preventDefault(); // Stop the default link behavior
                            alert(`Please complete ${moduleLabel} before accessing this module.`);
                        }
                    });
                    link.setAttribute('data-locked-listener', 'true'); // Mark that listener is added
                }
            }
        });
    };

    updateModuleLinks();

});
