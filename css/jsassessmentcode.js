document.addEventListener('DOMContentLoaded', () => {
    // Sidebar elements
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebarContainer = document.getElementById('sidebar-container');
    const sidebarMenu = document.getElementById('sidebar-menu');

    // Access Code elements
    const accessCodeInput = document.getElementById('accessCodeInput');
    const startButton = document.getElementById('startBtn');
    const errorMessage = document.getElementById('errorMessage');
    const passwordToggle = document.getElementById('passwordToggle'); // Get the eye icon element

    // Sidebar Toggle Logic
    if (hamburgerIcon && sidebarContainer && sidebarMenu) {
        hamburgerIcon.addEventListener('click', () => {
            sidebarContainer.classList.add('open');
            sidebarMenu.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
        });
    }

    if (closeSidebarBtn && sidebarContainer && sidebarMenu) {
        closeSidebarBtn.addEventListener('click', () => {
            sidebarContainer.classList.remove('open');
            sidebarMenu.classList.remove('open');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    if (sidebarContainer && sidebarMenu) {
        // Close sidebar if clicking outside the menu
        sidebarContainer.addEventListener('click', (event) => {
            if (event.target === sidebarContainer) {
                sidebarContainer.classList.remove('open');
                sidebarMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebarContainer && sidebarMenu) {
                sidebarContainer.classList.remove('open');
                sidebarMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // Access Code Validation Logic
    if (startButton && accessCodeInput && errorMessage) {
        startButton.addEventListener('click', (event) => {
            const enteredCode = accessCodeInput.value.trim(); // Get and trim the input value
            const correctCode = 'ecomind12345'; // The required access code

            if (enteredCode === correctCode) {
                // If the code is correct, allow the default link behavior (navigation)
                errorMessage.classList.remove('show'); // Hide any error message
                errorMessage.textContent = ''; // Clear error text
                // The <a> tag's href will handle the redirection automatically
            } else {
                // If the code is incorrect
                event.preventDefault(); // Stop the link from navigating
                errorMessage.textContent = 'Invalid Access Code'; // Set error text
                errorMessage.classList.add('show'); // Show the error message
            }
        });

        // Optional: Clear the error message when the user starts typing again
        accessCodeInput.addEventListener('input', () => {
            errorMessage.classList.remove('show');
            errorMessage.textContent = '';
        });
    }

    // NEW: Password Toggle Logic
    if (passwordToggle && accessCodeInput) {
        passwordToggle.addEventListener('click', () => {
            // Toggle the type attribute
            const type = accessCodeInput.getAttribute('type') === 'password' ? 'text' : 'password';
            accessCodeInput.setAttribute('type', type);

            // Toggle the eye icon
            passwordToggle.classList.toggle('fa-eye');
            passwordToggle.classList.toggle('fa-eye-slash');
        });
    }
});
