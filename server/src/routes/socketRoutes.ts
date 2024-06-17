import { Server } from "socket.io";
import socketController from "../controllers/socketController";

const socketRoutes = (io: Server): void => {
  io.on("connection", (socket) => {
    socketController(io, socket);
  });
};

export default socketRoutes;
