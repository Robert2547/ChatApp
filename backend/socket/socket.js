import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
}); // Create a new instance of socket.io

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]; // Get the socketId of the receiver
};

const userSocketMap = {}; // { userId: socketId }
// socket will be the user
// socket.on is used to listen to the event, can both be used on the server and the client
io.on("connection", (socket) => {
  console.log("A user connected");

  const userId = socket.handshake.query.userId; // Get the userId from the query params
  if (userId !== undefined) {
    // If the user is authenticated
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // send events to all connected clients

  socket.on("disconnect", () => {
    console.log("User disconnected");
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // send events to all connected clients
  });

  socket.on("chat message", (msg) => {
    console.log;
  });
});

export { app, io, server };
