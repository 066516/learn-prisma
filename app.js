// app.js

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

const io = new socketIo.Server(server, {
  cors: {
    origin: "*", // Replace with the actual origin of your frontend app
    methods: "*",
    credentials: true,
  },
}); // Setup Socket.IO
require("dotenv").config();
app.use(express.json());

// Enable CORS for all routes
const corsOptions = {
  origin: "*", // Replace with the actual origin of your frontend app
  methods: "*",
  credentials: true, // Enable credentials (cookies, authorization headers) cross-origin
};

// Enable CORS with the specified options
app.use(cors(corsOptions));
app.options("*", cors());  // Enable CORS for preflight requests
// Import routes  as a function and pass `io`
const storyRoutes = require("./routes/story")(io);

const userRoutes = require("./routes/user"); // Assuming `userRoutes` doesn't need `io`
const updateStory = require("./corn/storyCorn");
app.use("/api", storyRoutes);
app.use("/api", userRoutes);
// app.use("/api", userRoutes); // Use this if `userRoutes` is properly set up to handle `io` or doesn't need it

io.on("connection", (socket) => {
  console.log(`A client connected: ${socket.id}`);
  socket.on('test',(mssg) => console.log(mssg));
  socket.emit('test1','hello form server');
})
const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
