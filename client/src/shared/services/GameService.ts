import { makeAutoObservable } from "mobx";
import { IParticipants } from "../types/participants";
import { SyncGameData } from "../types/game";
import { socketService } from "./SocketService";

class GameService {
  pack: string[] = [];
  word: string = "";
  peaceful: IParticipants[] = [];
  scout: IParticipants | null = null;
  loading: boolean = true;
  time: string = "7:00";
  inGame: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTime = (time: string) => {
    const [minutes, seconds] = time.split(":");
    const realSeconds = Number(seconds) % 60;
    const realMinutes = Number(minutes) + (Number(seconds) - realSeconds) / 60;
    this.time = `${realMinutes}:${realSeconds}`;
  };

  syncTime = () => {
    socketService.syncTime(this.time);
  };

  syncGame = (data: SyncGameData) => {
    this.inGame = true;
    const { peaceful, scout, word } = data;
    this.peaceful = peaceful;
    this.scout = scout;
    this.word = word;

    this.loading = false;
  };

  setPack = (pack: string[]) => {
    this.pack = pack;
  };

  startGame = (players: IParticipants[]) => {
    this.inGame = true;

    this.word = this.pack[Math.floor(Math.random() * this.pack.length)] ?? "";
    const randomPlayer = Math.floor(Math.random() * players.length);

    players.forEach((player) => {
      if (player.id === players[randomPlayer].id) {
        this.scout = player;
      } else {
        this.peaceful.push(player);
      }
    });

    socketService.syncGame({
      peaceful: this.peaceful,
      scout: this.scout,
      word: this.word,
    });
  };

  endGame = () => {
    this.loading = true;
    this.inGame = false;

    socketService.endGame();
  };

  simpleEndGame = () => {
    this.loading = true;
    this.inGame = false;
  };
}

export const gameService = new GameService();
