const userName = document.getElementById("userNameInput").value;
const loginButton = document.getElementById("loginButton");

function login() {
    event.preventDefault();
    window.location.assign(`/chat?username=${userName}`)
}

loginButton.addEventListener("click", login);

/**
 * Enter to login.
 */
document.onkeydown = function(event) {
    const e = event || window.event || arguments.callee.caller.arguments[0];
    e.keyCode === 13 && login();
};