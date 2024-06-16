import { ILocalStorageItems } from "shared/types/localStorage";

class LocalStorageService {
  setItem(key: ILocalStorageItems, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: ILocalStorageItems): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: ILocalStorageItems): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
export const localStorageService = new LocalStorageService();
