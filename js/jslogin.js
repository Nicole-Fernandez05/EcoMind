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

// --- Login Form Validation and Modal JavaScript ---
// Get form elements for validation
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton') || document.querySelector('.login-button');

// Function to check if both email and password fields have values
function checkFormValidity() {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    
    // Enable button only if both fields have values
    if (emailValue && passwordValue) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

// Add event listeners to input fields for real-time validation
if (emailInput && passwordInput && loginButton) {
    // Initially disable the login button
    loginButton.disabled = true;
    
    emailInput.addEventListener('input', checkFormValidity);
    passwordInput.addEventListener('input', checkFormValidity);
}

// Function to display the custom modal with a message and optional callback
function showModal(message, callback) {
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('myModal').style.display = 'flex'; /* Show modal */
    
    // Store callback for later use
    window.modalCallback = callback;
}

// Function to close the custom modal
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
    
    // Execute callback if it exists
    if (window.modalCallback) {
        window.modalCallback();
        window.modalCallback = null;
    }
}

// Event listener for the login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic validation
    if (!email || !password) {
        showModal('Please fill in both email and password fields.');
        return;
    }

    // Check if user type is selected
    const selectedUserType = document.querySelector('.user-type-btn.active');
    if (!selectedUserType) {
        showModal('Please select whether you are a Student or Admin.');
        return;
    }

    // Simulate successful login and redirect to homepage
    showModal(`Welcome back! Login successful for ${email}`, function() {
        // Redirect to homepage after successful login
        window.location.href = 'homepage.html';
    });
    
    // In a real application, you would send this data to a server for authentication.
    console.log('Login attempt:', { 
        email, 
        password, 
        userType: selectedUserType.getAttribute('data-selected') || 'student' 
    });
});

// Function to toggle password visibility
function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleImg = document.getElementById('passwordToggleImg');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleImg.src = 'images/hidden.png';
        toggleImg.alt = 'Hide password';
    } else {
        passwordField.type = 'password';
        toggleImg.src = 'images/show.png';
        toggleImg.alt = 'Show password';
    }
}

// Function for social login simulation
function socialLogin(provider) {
    showModal(`Redirecting to ${provider} login...`);
    console.log(`Social login with ${provider}`);
}

// Function to navigate to registration page - UPDATED TO REDIRECT
function showRegister() {
    // Redirect to register.html page
    window.location.href = 'register.html';
}

// User type selection functionality
function selectUserType(selectedBtn, userType) {
    // Remove active class from all user type buttons
    const allButtons = document.querySelectorAll('.user-type-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to the clicked button
    selectedBtn.classList.add('active');
    
    // Store the selected user type for form processing
    selectedBtn.setAttribute('data-selected', userType);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
}
