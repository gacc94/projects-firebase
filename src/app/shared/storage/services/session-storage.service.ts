import { Injectable } from '@angular/core';
import { StorageAdapter } from '../interfaces/storage.interface';

@Injectable()
export class SessionStorageService implements StorageAdapter {

  constructor() { }

  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }

  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

}
