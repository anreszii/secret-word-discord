import { IParticipants } from "../participants";

export interface SyncGameData {
  peaceful: IParticipants[];
  scout: IParticipants | null;
  word: string;
}
