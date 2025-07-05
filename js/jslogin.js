<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoMind - Environmental Education</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="css/csslogin.css">
    <style>
        /* Add some basic styling for the avatar/logged-in state */
        .login-info {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #fff;
            cursor: pointer; 
            position: relative;
        }
        .login-info img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: #5cb85c; /* Example background for avatar */
            padding: 2px;
            border: 1px solid #fff;
        }
        .login-info .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
            right: 0;
            top: 40px; /* Adjust as needed */
            border-radius: 5px;
            overflow: hidden;
        }
        .login-info .dropdown-content a {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            text-align: left;
        }
        .login-info .dropdown-content a:hover {
            background-color: #ddd;
        }
        .login-info.active .dropdown-content {
            display: block;
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="header-left">
            <div class="logo">
                <button class="hamburger-icon" id="hamburger-icon">☰</button>
                <span class="logo-icon">
                    <img src="images/logoecomind.svg" alt="Leaf Icon">
                </span>
                ECOMIND
            </div>
        </div>
        <nav class="top-nav-links">
            <a href="homepage.html" class="active">Home</a>
            <a href="modulehomepage.html">Modules</a>
            <a href="gamehomepage.html">Game</a>
            <div id="login-status-container">
                <a href="login.html" id="loginLink">Login</a>

                <div class="login-info" id="userInfoContainer" style="display: none;">
                    <img src="images/default-avatar.png" alt="User Avatar" id="userAvatar">
                    <span id="userDisplayName"></span>
                    <div class="dropdown-content">
                        <a href="#" id="logoutButton">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <div class="sidebar-container" id="sidebar-container">
        <aside class="sidebar-menu" id="sidebar-menu">
            <button class="close-sidebar-btn" id="close-sidebar-btn">&times;</button>
            <ul class="sidebar-links">
                <li><a href="homepage.html" class="active">Home</a></li>
                <li><a href="modulehomepage.html">Modules</a></li>
                <li><a href="finalhomepage.html">Final Assessment</a></li>
                <li><a href="login.html" id="sidebarLoginLink">Login</a></li> <li style="display: none;" id="sidebarLogoutItem"><a href="#" id="sidebarLogoutButton">Logout</a></li>
            </ul>
        </aside>
    </div>

    <main class="main-content">
        <section class="welcome-section">
        </section>

        <section class="login-section">
            <h2>Login</h2>
            <div class="user-type-buttons">
                <button type="button" class="user-type-btn" data-user-role="student" onclick="selectUserType(this, 'student')">Student</button>
                <span class="or-divider">or</span>
                <button type="button" class="user-type-btn" data-user-role="admin" onclick="selectUserType(this, 'admin')">Admin</button>
            </div>
            <form id="loginForm">
                <div class="form-group">
                    <input type="email" id="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <div class="password-field">
                        <input type="password" id="password" placeholder="Password" required>
                        <span class="password-toggle" onclick="togglePassword()">
                            <img id="passwordToggleImg" src="images/show.png" alt="Show password">
                        </span>
                    </div>
                </div>
                <button type="submit" class="login-button">Login</button>
            </form>

            <div class="social-login">
                <button class="social-btn" onclick="socialLogin('facebook')">
                    <img src="images/facebook.png" alt="Facebook" width="16" height="16"> Facebook
                </button>
                <button class="social-btn" onclick="socialLogin('google')">
                    <img src="images/google.png" alt="Google" width="16" height="16"> Google
                </button>
            </div>
        </section>
    </main>

    <div id="myModal" class="modal">
        <div class="modal-content">
            <span class="close-button" onclick="closeModal()">&times;</span>
            <p id="modalMessage"></p>
            <button class="login-button mt-4" onclick="closeModal()">OK</button>
        </div>
    </div>

    <script src="js/jsauth.js"></script>
    <script src="js/jslogin.js"></script>
</body>
</html>
