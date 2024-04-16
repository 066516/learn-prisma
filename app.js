const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

const io = new socketIo.Server(server, {
  cors: {
    origin: "*", // Allow requests from all domains (for Socket.IO)
    methods: ["GET", "POST"], // Specify allowed HTTP methods
    credentials: true, // Allow cookies and other credentials
  },
});

require("dotenv").config();
app.use(express.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
// Import routes and pass `io`
const storyRoutes = require("./routes/story")(io);
const userRoutes = require("./routes/user"); // Assuming `userRoutes` doesn't need `io`

// Mount routes
app.use("/api", storyRoutes);
app.use("/api", userRoutes);

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log(`A client connected: ${socket.id}`);
  socket.on("test", (mssg) => {
    console.log(mssg + " test event received");
    socket.emit("test1", "hello from server nabil");
  });
  socket.emit("test1", "hello from server nabil");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
