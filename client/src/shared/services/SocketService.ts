import { makeAutoObservable } from "mobx";
import { io } from "socket.io-client";
import { SyncGameData } from "../types/game";

class SocketService {
  socket = io("/", {
    path: "/socket",
  });

  constructor() {
    makeAutoObservable(this);
  }

  getToken = (code: string) => {
    this.socket.emit("token", code);
  };

  syncPack = (pack: string[]) => {
    this.socket.emit("pack", pack);
  };

  syncGame = (data: SyncGameData) => {
    this.socket.emit("syncGame", data);
  };

  endGame = () => {
    this.socket.emit("endGame");
  };

  syncTime = (time: string) => {
    this.socket.emit("syncTime", time);
  };
}

export const socketService = new SocketService();
