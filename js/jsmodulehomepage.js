
        document.addEventListener('DOMContentLoaded', () => {
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
        });
