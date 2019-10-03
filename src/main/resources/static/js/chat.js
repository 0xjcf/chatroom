const socket = new WebSocket('ws://localhost:8080/chatroom');

console.log(socket.readyState);

socket.addEventListener("open", function(event) {
    console.log(socket.readyState)
    console.log("WebSocket open connection");
    socket.send("Hello Server!");
});
