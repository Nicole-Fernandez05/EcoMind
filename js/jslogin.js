// --- Sidebar and Header Navigation JavaScript ---
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeSidebarBtn = document.getElementById('close-sidebar-btn');
const sidebarContainer = document.getElementById('sidebar-container');
const sidebarMenu = document.getElementById('sidebar-menu');
const sidebarLinks = document.querySelectorAll('.sidebar-links a');
const topNavLinks = document.querySelectorAll('.top-nav-links a');

// Function to open the sidebar
function openSidebar() {
    sidebarContainer.classList.add('open');
    sidebarMenu.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent body scroll when sidebar is open
}

// Function to close the sidebar
function closeSidebar() {
    sidebarContainer.classList.remove('open');
    sidebarMenu.classList.remove('open');
    document.body.style.overflow = ''; // Restore body scroll
}

// Event listeners for sidebar functionality
hamburgerIcon.addEventListener('click', openSidebar);
closeSidebarBtn.addEventListener('click', closeSidebar);
sidebarContainer.addEventListener('click', (event) => {
    // Close sidebar if the click is on the overlay (not the menu itself)
    if (event.target === sidebarContainer) {
        closeSidebar();
    }
});

sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeSidebar(); // Close sidebar after clicking a link
        // You can add logic here to handle navigation if not using direct href
        console.log(`Sidebar navigating to: ${link.getAttribute('href')}`);
    });
});

topNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Handle navigation for top bar links
        console.log(`Top nav navigating to: ${link.getAttribute('href')}`);
    });
});

// Optional: Close sidebar if window is resized above mobile breakpoint while sidebar is open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebarContainer.classList.contains('open')) {
        closeSidebar();
    }
});

// --- Login Form and Modal JavaScript ---
// Function to display the custom modal with a message
function showModal(message) {
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('myModal').style.display = 'flex'; /* Show modal */
}

// Function to close the custom modal
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// Event listener for the login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (email && password) {
        showModal(`Welcome back! Login successful for ${email}`);
        // In a real application, you would send this data to a server for authentication.
        console.log('Login attempt:', { email, password });
    } else {
        showModal('Please fill in all fields');
    }
});

// Function to toggle password visibility
function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleImg = document.getElementById('passwordToggleImg');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleImg.src = 'https://placehold.co/20x20/CCCCCC/000000?text=🙈';
        toggleImg.alt = 'Hide password';
    } else {
        passwordField.type = 'password';
        toggleImg.src = 'https://placehold.co/20x20/CCCCCC/000000?text=👁️';
        toggleImg.alt = 'Show password';
    }
}

// Function for social login simulation
function socialLogin(provider) {
    showModal(`Redirecting to ${provider} login...`);
    console.log(`Social login with ${provider}`);
}

// Function to navigate to registration page simulation
function showRegister() {
    showModal('Redirecting to registration page...');
    console.log('Navigate to registration');
}
