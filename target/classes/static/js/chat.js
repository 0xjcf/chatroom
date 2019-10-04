const SPEAK = "SPEAK";
const ENTER = "ENTER";
const username = document.querySelector("#username").textContent;
const message = document.querySelector("#msg");

const socket = new WebSocket(`ws://localhost:8080/chatroom/${username}`);
console.log("Connecting to socket...");

socket.onopen = function(event) {
  console.log("WebSocket open connection");
};

socket.onmessage = function(event) {
  console.log("WebSocket Receives：%c" + event.data, "color:green");
  //Receive Message from Server
  const message = JSON.parse(event.data) || {};
  const messageText = message.message;
  const messageContainer = document.querySelector("#message-container");
  if (message.type === SPEAK) {
    messageContainer.appendChild(
      `<div class="mdui-card" style="margin: 10px 0;">
            <div class="mdui-card-primary">
                <div class="mdui-card-content message-content">
                    ${message.username}: ${messageText}
                </div>
            </div>
        </div>`
    );
  }

  const enteredTheRoom = document.querySelector("#entered-the-room");
  console.log(messageText);
  if (message.type === ENTER) {
    enteredTheRoom.textContent = messageText;
    setTimeout(function() {
      enteredTheRoom.textContent = "";
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
socket.onclose = function(event) {
  console.log("WebSocket close connection.");
};

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
sendMessageButton.addEventListener("click", sendMessageToServer, { passive: true });

const clearMessageButton = document.querySelector("#clear-message");
clearMessageButton.addEventListener("click", clearMessage, { passive: true });

document.onkeydown = function(event) {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  e.keyCode === 13 && sendMessageToServer();
};
