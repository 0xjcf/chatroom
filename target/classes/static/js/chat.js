const socket = new WebSocket('ws://localhost:8080/chatroom');

console.log("Connecting to socket...");

socket.addEventListener("open", function(event) {
    console.log(event)
    console.log("WebSocket open connection");
});
