const socket = new WebSocket('ws://localhost:8080/chatroom');

console.log(socket.readyState);

socket.addEventListener("open", function(event) {
    console.log(socket.readyState)
    console.log("WebSocket open connection");
    socket.send("Hello Server!");
});

// webSocket.addEventListener("message", function(event) {
//     console.log("WebSocket Receives：%c" + event.data, "color:green");
//     //Receive Message from Server
//     const message = JSON.parse(event.data) || {};
//     const messageContainer = $(".message-container");
//     if (message.type === "SPEAK") {
//         messageContainer.append(
//             '<div class="mdui-card" style="margin: 10px 0;">' +
//                 '<div class="mdui-card-primary">' +
//                 '<div class="mdui-card-content message-content">' +
//                 message.username +
//                 "：" +
//                 message.msg +
//                 "</div>" +
//                 "</div></div>"
//         );
//     }
//     $(".chat-num").text(message.onlineCount);
//     const cards = messageContainer.children(".mdui-card:visible").toArray();
//     if (cards.length > 5) {
//         cards.forEach(function(item, index) {
//             index < $cards.length - 5 && $(item).slideUp("fast");
//         });
//     }
// });

// webSocket.addEventListener("close", function(event) {
//     console.log("WebSocket close connection.");
// });

// webSocket.addEventListener("error", function(event) {
//     console.log("WebSocket exception.");
// });

// function sendMsgToServer() {
//     const message = document.getElementById("msg");
//     if (message.val()) {
//         webSocket.send(
//             JSON.stringify({
//                 username: $("#username").text(),
//                 msg: message.value
//             })
//         );
//         message.value = null;
//     }
// }

/**
 * Clear screen
 */
// function clearMsg() {
//     document.querySelector(".message-container").innerHTML = "";
// }

/**
 * Enter to send message.
 */
// document.onkeydown = function(event) {
//     const e = event || window.event || arguments.callee.caller.arguments[0];
//     e.keyCode === 13 && sendMsgToServer();
// };
