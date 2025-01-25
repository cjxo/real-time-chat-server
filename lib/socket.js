const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const sockio = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  }
});

const socketToUserMap = {};

const getSocketId = (userId) => {
  return socketToUserMap[userId];
};

sockio.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    socketToUserMap[userId] = socket.id;
    sockio.emit("new online user", Object.keys(socketToUserMap));
  }

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete socketToUserMap[userId];
    sockio.emit("new online user", Object.keys(socketToUserMap));
  });
});

module.exports = { app, server, sockio, getSocketId };
