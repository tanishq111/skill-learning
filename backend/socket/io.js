import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io = null;

const userRoom = (userId) => `user:${userId}`;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_ORIGIN || "http://localhost:5175",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("UNAUTHORIZED"));

    try {
      socket.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      next(new Error(err.name === "TokenExpiredError" ? "TOKEN_EXPIRED" : "TOKEN_INVALID"));
    }
  });

  io.on("connection", (socket) => {
    socket.join(userRoom(socket.user.id));

    socket.on("disconnect", () => {
      socket.leave(userRoom(socket.user.id));
    });
  });

  return io;
};

export const emitToUser = (userId, event, payload) => {
  if (!io) return;
  io.to(userRoom(userId)).emit(event, payload);
};