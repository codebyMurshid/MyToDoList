const login = document.getElementById("login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const credentialserror = document.querySelector(".credentialserror");

const useremail = ["test", "test2"];
const userpass = ["123", "456"]


login.addEventListener("click", function () {
    console.log(email.value);
    console.log(password.value);

    if (email.value === "" || password.value === "") {
        credentialserror.classList.add("active");
    }
    else {
        credentialserror.classList.remove("active");
    }

    if (useremail.includes(email.value) && userpass.includes(password.value)) {
        window.location.href = 'todolist.html';
    }

    else {
        credentialserror.classList.add("active");;
    }

})
