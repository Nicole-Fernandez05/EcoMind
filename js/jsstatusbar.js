 document.addEventListener('DOMContentLoaded', () => {
            const hamburgerIcon = document.getElementById('hamburger-icon');
            const closeSidebarBtn = document.getElementById('close-sidebar-btn');
            const sidebarContainer = document.getElementById('sidebar-container');
            const sidebarMenu = document.getElementById('sidebar-menu');

            // Open sidebar
            hamburgerIcon.addEventListener('click', () => {
                sidebarContainer.classList.add('open');
                sidebarMenu.classList.add('open');
                document.body.style.overflow = 'hidden'; // Prevent scrolling body when sidebar is open
            });

            // Close sidebar by clicking close button
            closeSidebarBtn.addEventListener('click', () => {
                sidebarContainer.classList.remove('open');
                sidebarMenu.classList.remove('open');
                document.body.style.overflow = ''; // Allow body scrolling again
            });

            // Close sidebar by clicking outside the menu (on the overlay)
            sidebarContainer.addEventListener('click', (event) => {
                // Check if the click occurred directly on the container and not on the sidebar menu itself
                if (event.target === sidebarContainer) {
                    sidebarContainer.classList.remove('open');
                    sidebarMenu.classList.remove('open');
                    document.body.style.overflow = ''; // Allow body scrolling again
                }
            });

            // Optional: Close sidebar when a link inside is clicked
            const sidebarLinks = document.querySelectorAll('.sidebar-links a');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', () => {
                    sidebarContainer.classList.remove('open');
                    sidebarMenu.classList.remove('open');
                    document.body.style.overflow = ''; // Allow body scrolling again
                });
            });

            // --- Delete Confirmation Modal Logic ---
            const deleteModal = document.getElementById('deleteConfirmationModal');
            const confirmDeleteYes = document.getElementById('confirmDeleteYes');
            const confirmDeleteNo = document.getElementById('confirmDeleteNo');
            const userList = document.getElementById('user-list');
            let userToDeleteId = null; // To store the ID of the user to be deleted

            // Event delegation for delete buttons
            userList.addEventListener('click', (event) => {
                const deleteBtn = event.target.closest('.delete-btn');
                if (deleteBtn) {
                    userToDeleteId = deleteBtn.dataset.userId; // Get the user ID from the button's data attribute
                    deleteModal.style.display = 'flex'; // Show the modal
                    document.body.style.overflow = 'hidden'; // Prevent scrolling body when modal is open
                }
            });

            // Handle 'Yes' click for deletion
            confirmDeleteYes.addEventListener('click', () => {
                if (userToDeleteId) {
                    const userEntry = document.querySelector(`.user-entry[data-user-id="${userToDeleteId}"]`);
                    if (userEntry) {
                        userEntry.remove(); // Remove the user entry from the DOM
                        // In a real application, you would send a request to your backend to delete the user data here.
                        console.log(`User with ID ${userToDeleteId} has been deleted.`);
                    }
                }
                userToDeleteId = null; // Reset
                deleteModal.style.display = 'none'; // Hide the modal
                document.body.style.overflow = ''; // Allow body scrolling again
            });

            // Handle 'No' click for deletion
            confirmDeleteNo.addEventListener('click', () => {
                userToDeleteId = null; // Reset
                deleteModal.style.display = 'none'; // Hide the modal
                document.body.style.overflow = ''; // Allow body scrolling again
            });

            // Close modal if clicked outside (on the overlay)
            deleteModal.addEventListener('click', (event) => {
                if (event.target === deleteModal) {
                    userToDeleteId = null; // Reset
                    deleteModal.style.display = 'none'; // Hide the modal
                    document.body.style.overflow = ''; // Allow body scrolling again
                }
            });

            // Update header links to point to actual HTML files
            document.querySelectorAll('.top-nav-links a, .sidebar-links a').forEach(link => {
                // Adjust this logic if you have complex routing.
                // For now, it updates the "active" class based on the current page's HTML file name.
                const currentPath = window.location.pathname.split('/').pop();
                const linkHref = link.getAttribute('href');

                // Special handling for "Home" link if it leads to "homepage.html"
                if (linkHref === "homepage.html" && (currentPath === "progress_report.html" || currentPath === "")) {
                     link.classList.remove('active');
                } else if (linkHref === currentPath) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }

                // If on this page (progress_report.html), ensure none of the generic links are active
                if (currentPath === 'progress_report.html' && link.classList.contains('active') && link.getAttribute('href') !== 'progress_report.html') {
                    link.classList.remove('active');
                }
            });
            // Highlight "Progress Report" if that's a link in the sidebar or top nav
            // For this specific page, if it's not explicitly in the navigation, you might manually activate a related link
            // For example, if "User Progress Report" is part of "Modules" or "Admin" section.
            // For demonstration, let's assume it's related to "Modules" for now if not explicitly listed.
            // Or, if "progress_report.html" is a distinct page, none of the default links might be "active".
            // Since the original sidebar did not have a "progress report" link, I'll leave the current logic.
            // If you add a link like <a href="progress_report.html">Progress Report</a>, it will become active automatically.

        });
