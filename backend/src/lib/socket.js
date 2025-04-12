import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// Used to store online users
const userSocketMap = {}; //{userId:socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId; // Get userId from query params
  if (userId) userSocketMap[userId] = socket.id; // Store the socket id in userSocketMap

  //Send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Send online users to all clients

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);

    delete userSocketMap[userId]; // Remove the socket id from userSocketMap
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Send online users to all clients
  });
});

export { io, app, server };
