// app.js

const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

const io = require("socket.io-client");

// create a new Socket.io client instance and connect to the server
const socket = io("http://localhost:3002");

// handle connection events
socket.on("connect", function () {
  console.log("Connected to server!");
});

socket.on("disconnect", function () {
  console.log("Disconnected from server!");
});

// handle custom events
socket.on("story_created", function (data) {
  console.log("Received a hello message:", data.content);
});

socket.on('test1', function (data) {
  console.log("Received a hello message:", data);
});

// send a message to the server
socket.emit("test", "Hello Nabil!");
