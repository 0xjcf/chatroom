const SPEAK = "SPEAK";
const ENTER = "ENTER";
const username = document.querySelector("#username").textContent;
let message = document.querySelector("#msg").textContent;
console.log(username);
console.log(message);

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

function sendMsgToServer(type = "", username = "", message = "") {
  if (message) {
    socket.send(JSON.stringify({ type, username, message: message }));
    message.value = null;
  }
}

function clearMsg() {
  document.querySelector(".message-container").remove();
}

document.onkeydown = function(event) {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  e.keyCode === 13 && sendMsgToServer();
};
