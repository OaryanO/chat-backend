import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

/* ---------------- ALLOWED ORIGINS ---------------- */
const allowedOrigins = [
  "https://chat-frontend-gilt-seven.vercel.app",
  "https://chat-frontend-git-main-aryan-singhs-projects-b9dd610f.vercel.app",
  "https://chat-frontend-4ihys6hsi-aryan-singhs-projects-b9dd610f.vercel.app",
  "http://localhost:3000"
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {}; // userId -> socketId

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

/* ---------------- SOCKET EVENTS ---------------- */
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
