//implementation of socket.io along with the ws library for the shared purpose of managing WebSockets in express js
//
//import the Express.js library and assigns it to the constant express.
const express = require("express");

// imports the built-in http module in Node.js.
const http = require("http");

//imports the Socket.IO library and assigns it to the constant socketIO.
const socketIO = require("socket.io");

//an instance of the Express.js application is created and assigned to the constant
const app = express();

//an instance of the HTTP server is created by passing the app instance to the createServer() method of the http module and assigning it to the constant server.
const server = http.createServer(app);

//a new Socket.IO server instance is created by passing the server instance to the socketIO() function and assigning it to the constant io.
const io = socketIO(server);

//an event listener is set up for new WebSocket connections and passes a socket object that represents the connection.
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (data) => {
    console.log(`Received message: ${data}`);
    //The received message is broadcasted to all connected clients using the emit() method of the io object.
    io.emit("message", data);
  });
  //an event listener is set up for when a client disconnects.
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
