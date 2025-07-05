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
    document.body.style.overflow = 'hidden';
}

// Function to close the sidebar
function closeSidebar() {
    sidebarContainer.classList.remove('open');
    sidebarMenu.classList.remove('open');
    document.body.style.overflow = '';
}

// Event listeners for sidebar functionality
hamburgerIcon.addEventListener('click', openSidebar);
closeSidebarBtn.addEventListener('click', closeSidebar);

sidebarContainer.addEventListener('click', (event) => {
    if (event.target === sidebarContainer) {
        closeSidebar();
    }
});

sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeSidebar();
        console.log(`Sidebar navigating to: ${link.getAttribute('href')}`);
    });
});

topNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log(`Top nav navigating to: ${link.getAttribute('href')}`);
    });
});

// Close sidebar if window is resized above mobile breakpoint while sidebar is open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebarContainer.classList.contains('open')) {
        closeSidebar();
    }
});

// --- Login Form Validation and Modal JavaScript ---
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton') || document.querySelector('.login-button');

// Function to check if both email and password fields have values
function checkFormValidity() {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    loginButton.disabled = !(emailValue && passwordValue);
}

// Add event listeners to input fields for real-time validation
if (emailInput && passwordInput && loginButton) {
    loginButton.disabled = true;
    emailInput.addEventListener('input', checkFormValidity);
    passwordInput.addEventListener('input', checkFormValidity);
}

// Function to display the custom modal with a message and optional callback
function showModal(message, callback) {
    const modalMessage = document.getElementById('modalMessage');
    const modal = document.getElementById('myModal');

    if (modalMessage && modal) {
        modalMessage.textContent = message;
        modal.style.display = 'flex';
        window.modalCallback = callback;
    }
}

// Function to close the custom modal
function closeModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'none';
        if (window.modalCallback) {
            window.modalCallback();
            window.modalCallback = null;
        }
    }
}

// Event listener for the login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Define specific passwords for students and admins
    const studentPassword = "student123";
    const adminPassword = "admin123";

    if (!email || !password) {
        showModal('Please fill in both email and password fields.');
        return;
    }

    if (email.startsWith('2024')) {
        if (password === studentPassword) {
            showModal('Welcome back! Login successful.', function() {
                window.location.href = 'modulehomepage.html';
            });
        } else {
            showModal('Invalid email or password.');
        }
    } else if (email.startsWith('2020')) {
        if (password === adminPassword) {
            showModal('Welcome back! Login successful.', function() {
                window.location.href = 'statusbar.html';
            });
        } else {
            showModal('Incorrect password.');
        }
    } else {
        showModal('Invalid email or password.');
    }

    console.log('Login attempt:', {
        email,
        password,
        userType: email.startsWith('2024') ? 'student' : 'admin'
    });
});

// Function to toggle password visibility
function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleImg = document.getElementById('passwordToggleImg');

    if (passwordField && toggleImg) {
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
}

// Function for social login simulation
function socialLogin(provider) {
    showModal(`Redirecting to ${provider} login...`);
    console.log(`Social login with ${provider}`);
}

// Function to navigate to registration page
function showRegister() {
    window.location.href = 'register.html';
}

// User type selection functionality
function selectUserType(selectedBtn, userType) {
    const allButtons = document.querySelectorAll('.user-type-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));
    selectedBtn.classList.add('active');
    selectedBtn.setAttribute('data-selected', userType);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
};
