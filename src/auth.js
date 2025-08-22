// ========== DOM ELEMENTS ==========
const loginBtn = document.getElementById("login-btn");
const Name = document.getElementById("Name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const credentialError = document.querySelector(".credentialserror");
const signupBtn = document.getElementById("signup-btn");

const clientId = "923216260193-hhgkre5bbrso32kcson7hnhsg07j9j58.apps.googleusercontent.com";

// Load existing "users" database from localStorage
let storedUsers = JSON.parse(localStorage.getItem("users")) || [];


// ==================== LOCAL LOGIN ====================
if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        // empty check
        if (!email.value || !password.value) {
            credentialError.classList.add("active");
            return;
        }

        // find matching user
        const matchedUser = storedUsers.find(user => user.email === email.value && user.password === password.value);

        if (matchedUser) {
            // Save logged-in user
            localStorage.setItem("user", JSON.stringify(matchedUser));
            window.location.href = "todolist.html";
        } else {
            credentialError.classList.add("active");
        }
    });
}

// Hide error instantly when user types
[email, password].forEach(input => {
    if (input) {
        input.addEventListener("input", () => {
            credentialError.classList.remove("active");
        });
    }
});


// ==================== LOCAL SIGNUP ====================
if (signupBtn) {
    signupBtn.addEventListener("click", signup);
}

function signup() {
    const signupEmail = email.value;
    const signupPassword = password.value;
    const signupName = Name.value;

    // Check for duplicates
    const userExists = storedUsers.some(user => user.email === signupEmail);
    if (userExists) {
        alert("Email already exists!");
        return;
    }

    const newUser = {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        loginType: "local"
    };

    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    alert("Account created! Please log in.");
    window.location.href = "index.html";
}


// ==================== GOOGLE LOGIN ====================
window.onload = function () {
    const googleBtn = document.getElementById("google-login");
    if (googleBtn) {
        google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredentialResponse
        });

        googleBtn.addEventListener("click", () => {
            google.accounts.id.prompt(); // show popup
        });
    }
};

function handleCredentialResponse(response) {
    const payload = JSON.parse(atob(response.credential.split(".")[1]));

    // Save Google user in "database" if not exists
    if (!storedUsers.some(u => u.email === payload.email)) {
        const newUser = {
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
            loginType: "google"
        };
        storedUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(storedUsers));
    }

    // Save current logged in user
    localStorage.setItem("user", JSON.stringify({
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        loginType: "google"
    }));

    window.location.href = "todolist.html";
}


// ==================== PROTECT TODOLIST ====================
if (window.location.pathname.endsWith("todolist.html")) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        // Not logged in --> redirect to login page
        window.location.href = "index.html";
    } else {
        console.log("Logged in as:", user);

        const userprofile = document.getElementById("userprofile");
        if (userprofile) {
            userprofile.textContent = `Welcome, ${user.name}!`;
        }
    }

    // Logout button
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.href = "index.html";
        });
    }
}
