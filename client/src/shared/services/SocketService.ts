import { makeAutoObservable } from "mobx";
import { io } from "socket.io-client";

class SocketService {
  socket = io("/", {
    path: "/",
  });

  constructor() {
    makeAutoObservable(this);

    this.socket.connect();
  }

  sendSocket = () => {
    this.socket.emit("message", "Hello!!!!!!! TEST MESSAGE");
  };
}

export const socketService = new SocketService();
