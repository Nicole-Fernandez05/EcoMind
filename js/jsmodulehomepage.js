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

if (hamburgerIcon) hamburgerIcon.addEventListener('click', openSidebar);

if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);



if (sidebarContainer) {

    sidebarContainer.addEventListener('click', (event) => {

        if (event.target === sidebarContainer) {

            closeSidebar();

        }

    });

}



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

    if (window.innerWidth > 768 && sidebarContainer && sidebarContainer.classList.contains('open')) {

        closeSidebar();

    }

});





// --- Login Button to Avatar / Logout Functionality ---

const loginStatusContainer = document.getElementById('login-status-container');

const loginLink = document.getElementById('loginLink'); // The original login link element



function updateLoginStatusUI() {

    if (!loginStatusContainer) {

        console.warn("login-status-container not found. Login/Avatar functionality may not work.");

        return;

    }



    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'; // Check login status



    if (isLoggedIn) {

        // If logged in, display the avatar and a basic dropdown

        loginStatusContainer.innerHTML = `

            <div class="user-avatar" onclick="toggleProfileMenu()">

                <img src="images/avatar.png" alt="User Avatar">

            </div>

            <div id="profile-dropdown" class="profile-dropdown-content">

                <a href="profile.html">My Profile</a>

                <a href="#" onclick="logoutUser()">Logout</a>

            </div>

        `;

        // Hide the original login link if it's separate and was still visible

        if (loginLink) loginLink.style.display = 'none';



    } else {

        // If not logged in, display the login button

        loginStatusContainer.innerHTML = `

            <a href="login.html" class="login-button">Login</a>

        `;

        // Ensure the original login link is shown if it was hidden

        if (loginLink) loginLink.style.display = ''; // Reset display

    }

}



function toggleProfileMenu() {

    const dropdown = document.getElementById('profile-dropdown');

    if (dropdown) {

        dropdown.classList.toggle('show');

    }

}



// Close the dropdown if the user clicks outside of it

window.addEventListener('click', function(event) {

    const avatarImg = document.querySelector('.user-avatar img');

    const dropdown = document.getElementById('profile-dropdown');



    if (dropdown && !dropdown.contains(event.target) && (!avatarImg || !avatarImg.contains(event.target))) {

        if (dropdown.classList.contains('show')) {

            dropdown.classList.remove('show');

        }

    }

});





function logoutUser() {

    sessionStorage.removeItem('isLoggedIn'); // Clear login status

    localStorage.removeItem('token'); // Clear any stored token (if applicable)

    // You might want to redirect to the homepage or login page after logout

    window.location.href = 'homepage.html';

}



// Make functions globally accessible if called from HTML onclick attributes

window.toggleProfileMenu = toggleProfileMenu;

window.logoutUser = logoutUser;





// --- Module Completion/Locking Logic (Add your specific module logic here) ---

// This part remains specific to your module homepage functionality.

// Example:

// const module2Link = document.getElementById('module2-link');

// const module3Link = document.getElementById('module3-link');

// etc.



// function checkModuleCompletion() {

//     // Example: Check if Module 1 is completed (using sessionStorage or localStorage)

//     const module1Completed = sessionStorage.getItem('module1Completed') === 'true';



//     if (module1Completed && module2Link) {

//         module2Link.classList.remove('locked');

//         module2Link.href = 'module2.html'; // Set the actual link

//     } else if (module2Link) {

//         module2Link.addEventListener('click', (e) => {

//             if (module2Link.classList.contains('locked')) {

//                 e.preventDefault();

//                 alert('Please complete Module 1 first!');

//             }

//         });

//     }

//     // Repeat for other modules

// }





// --- Initial calls on page load ---

document.addEventListener('DOMContentLoaded', () => {

updateLoginStatusUI(); // Update the login/avatar in the header

    // checkModuleCompletion(); // Call your module locking logic

   

    // Set the current year in the footer

    const yearSpan = document.getElementById('year');

    if (yearSpan) {

        yearSpan.textContent = new Date().getFullYear();

    }

});
