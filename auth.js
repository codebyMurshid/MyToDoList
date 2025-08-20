const login = document.getElementById("login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const credentialserror = document.querySelector(".credentialserror");

const useremail = ["test", "test2"];
const userpass = ["123", "456"];

login.addEventListener("click", function () {
    // empty check
    if (!email.value || !password.value) {
        credentialserror.classList.add("active");
        return;
    }

    // find email index
    const emailIndex = useremail.indexOf(email.value);

    if (emailIndex !== -1 && userpass[emailIndex] === password.value) {
        // correct pair → login success
        window.location.href = "todolist.html";
    } else {
        // wrong email/pass
        credentialserror.classList.add("active");
    }
});

// Hide error instantly when user types
[email, password].forEach(input => {
    if (input) { // avoid null crash
        input.addEventListener("input", () => {
            credentialserror.classList.remove("active");
        });
    }
});