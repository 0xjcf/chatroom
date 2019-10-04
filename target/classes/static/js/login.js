const userNameInput = document.getElementById("user-name-input");
const loginButton = document.getElementById("login-button");

function login() {
    event.preventDefault();
    const username = userNameInput.value;
    window.location.assign(`/chat?username=${username}`)
}

loginButton.addEventListener("click", login);

/**
 * Enter to login.
 */
document.onkeydown = function(event) {
    const e = event || window.event || arguments.callee.caller.arguments[0];
    e.keyCode === 13 && login();
};
