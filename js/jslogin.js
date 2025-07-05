// js/login.js (Specific to login.html)

document.addEventListener('DOMContentLoaded', () => {
    // Re-call updateLoginStatusUI for the login page specifically
    // to ensure the header reflects the correct state on load.
    window.updateLoginStatusUI();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('.login-button'); // Use querySelector as there might be multiple buttons with this class
    const loginForm = document.getElementById('loginForm');
    const userTypeButtons = document.querySelectorAll('.user-type-btn');

    let selectedUserRole = 'student'; // Default to student

    // Initialize the active user type button
    userTypeButtons.forEach(btn => {
        if (btn.getAttribute('data-user-role') === selectedUserRole) {
            btn.classList.add('active');
        }
    });

    window.selectUserType = function(selectedBtn, userRole) {
        userTypeButtons.forEach(btn => btn.classList.remove('active'));
        selectedBtn.classList.add('active');
        selectedUserRole = userRole;
        // You could store this in sessionStorage if you want it to persist across visits,
        // but for a single login session, a variable is fine.
    };

    function checkFormValidity() {
        if (emailInput && passwordInput && loginButton) {
            const emailValue = emailInput.value.trim();
            const passwordValue = passwordInput.value.trim();
            loginButton.disabled = !(emailValue && passwordValue);
        }
    }

    if (emailInput && passwordInput && loginButton) {
        loginButton.disabled = true; // Initially disable the button
        emailInput.addEventListener('input', checkFormValidity);
        passwordInput.addEventListener('input', checkFormValidity);
    }

    // Event listener for the login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            if (!emailInput || !passwordInput) {
                console.error("Email or Password input elements not found on the login form.");
                window.showModal('An internal error occurred. Please try again.');
                return;
            }

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            const studentEmailPrefix = '2024';
            const adminEmailPrefix = '2020';
            const studentPassword = "student123";
            const adminPassword = "admin123";

            if (!email || !password) {
                window.showModal('Please fill in both email and password fields.');
                return;
            }

            let loginSuccess = false;
            let redirectPage = '';
            let message = '';
            let userRoleLoggedIn = '';

            // Basic email format validation (optional, but good practice)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                window.showModal('Please enter a valid email address.');
                return;
            }

            if (selectedUserRole === 'student') {
                if (email.startsWith(studentEmailPrefix)) {
                    if (password === studentPassword) {
                        loginSuccess = true;
                        redirectPage = 'modulehomepage.html';
                        message = 'Welcome back, Student! Login successful.';
                        userRoleLoggedIn = 'student';
                    } else {
                        message = 'Incorrect password for student account.';
                    }
                } else {
                    message = 'This email does not match a student account (expected to start with 2024).';
                }
            } else if (selectedUserRole === 'admin') {
                if (email.startsWith(adminEmailPrefix)) {
                    if (password === adminPassword) {
                        loginSuccess = true;
                        redirectPage = 'statusbar.html';
                        message = 'Welcome back, Admin! Login successful.';
                        userRoleLoggedIn = 'admin';
                    } else {
                        message = 'Incorrect password for admin account.';
                    }
                } else {
                    message = 'This email does not match an admin account (expected to start with 2020).';
                }
            } else {
                message = 'Please select a user type (Student or Admin).';
            }

            window.showModal(message, function() {
                if (loginSuccess) {
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('userEmail', email);
                    sessionStorage.setItem('userType', userRoleLoggedIn); // Store user type
                    window.location.href = redirectPage;
                }
            });

            console.log('Login attempt:', {
                email,
                password,
                selectedUserRole
            });
        });
    }

    window.togglePassword = function() {
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
    };

    window.socialLogin = function(provider) {
        window.showModal(`Redirecting to ${provider} login...`);
        console.log(`Social login with ${provider}`);
    };

    window.showRegister = function() {
        window.location.href = 'register.html';
    };
});
