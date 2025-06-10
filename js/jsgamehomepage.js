
    document.addEventListener('DOMContentLoaded', () => {
      const hamburgerIcon = document.getElementById('hamburger-icon');
      const closeSidebarBtn = document.getElementById('close-sidebar-btn');
      const sidebarContainer = document.getElementById('sidebar-container');
      const sidebarMenu = document.getElementById('sidebar-menu');

      // Open sidebar
      if (hamburgerIcon) { // Added null check
        hamburgerIcon.addEventListener('click', () => {
          sidebarContainer.classList.add('open');
          sidebarMenu.classList.add('open');
          document.body.style.overflow = 'hidden'; // Prevent scrolling body when sidebar is open
        });
      }

      // Close sidebar by clicking close button
      if (closeSidebarBtn) { // Added null check
        closeSidebarBtn.addEventListener('click', () => {
          sidebarContainer.classList.remove('open');
          sidebarMenu.classList.remove('open');
          document.body.style.overflow = ''; // Allow body scrolling again
        });
      }

      // Close sidebar by clicking outside the menu (on the overlay)
      if (sidebarContainer) { // Added null check
        sidebarContainer.addEventListener('click', (event) => {
          // Check if the click occurred directly on the container and not on the sidebar menu itself
          if (event.target === sidebarContainer) {
            sidebarContainer.classList.remove('open');
            sidebarMenu.classList.remove('open');
            document.body.style.overflow = ''; // Allow body scrolling again
          }
        });
      }

      // Optional: Close sidebar when a link inside is clicked
      const sidebarLinks = document.querySelectorAll('.sidebar-links a');
      sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
          sidebarContainer.classList.remove('open');
          sidebarMenu.classList.remove('open');
          document.body.style.overflow = ''; // Allow body scrolling again
        });
      });
    });
