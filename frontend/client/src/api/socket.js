import { io } from "socket.io-client";

const URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

let socket = null;

export const getSocket = () => {
  if (socket) return socket;

  socket = io(URL, {
    autoConnect: false,
    withCredentials: true,
    auth: (cb) => cb({ token: localStorage.getItem("token") }),
  });

  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};