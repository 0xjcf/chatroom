const SPEAK = "SPEAK", ENTER = "ENTER", EXIT = "EXIT";
const username = document.querySelector("#username").textContent;
const message = document.querySelector("#msg");
const socket = new WebSocket(`ws://localhost:8080/chatroom/${username}`);

console.log("Connecting to socket...");

socket.onopen = function(event) {
  console.log("WebSocket open connection");
};

socket.onmessage = function(event) {
  console.log("WebSocket Receives：%c" + event.data, "color:green");

  const message = JSON.parse(event.data) || {};
  const messageText = message.message;
  const messageContainer = document.querySelector("#message-container");

  if (message.type === SPEAK) {
    messageContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="mdui-card" style="margin: 10px 0;">
        <div class="mdui-card-primary">
            <div class="mdui-card-content message-content">
                ${message.username}: ${messageText}
            </div>
        </div>
      </div>`
    );
  }

  const enterOrExit = document.querySelector("#enter-or-exit");
  if (message.type === ENTER || message.type === EXIT) {
    enterOrExit.innerHTML = `
    <span class="mdui-chip-icon mdui-color-blue">
      <i class="mdui-icon material-icons">transfer_within_a_station</i></span>
    <span class="mdui-chip-title">${messageText}</span>`;

    setTimeout(function() {
      enterOrExit.innerHTML = "";
    }, 2000);
  }

  document.querySelector("#chat-num").textContent = message.onlineCount;
  const cards = messageContainer.children;
  //   if (cards.length > 5) {
  // cards.forEach(function(item, index) {
  //   index < cards.length - 5 && item.slideUp("fast");
  // });
  //   }

  for (let card of cards) {
    console.log(card);
  }
};

const exitAppButton = document.querySelector("#exit-app");
exitAppButton.addEventListener("click", socket.onclose = function(event) {
  console.log("WebSocket close connection.");
});

socket.onerror = function(event) {
  console.log("WebSocket exception.");
};

function sendMessageToServer() {
  console.log(`Sending message to server...`);

  if (message.value) {
    socket.send(JSON.stringify({ username, message: message.value }));
    clearMessage();
  }
}

function clearMessage() {
  message.value = "";
}

const sendMessageButton = document.querySelector("#send-message");
sendMessageButton.addEventListener("click", sendMessageToServer);

const clearMessageButton = document.querySelector("#clear-message");
clearMessageButton.addEventListener("click", clearMessage);

document.onkeydown = function(event) {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  e.keyCode === 13 && sendMessageToServer();
};
