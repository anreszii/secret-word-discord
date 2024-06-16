import { makeAutoObservable } from "mobx";

class AuthService {
  constructor() {
    makeAutoObservable(this);
  }
}

export const authService = new AuthService();
