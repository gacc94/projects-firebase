import { Injectable } from '@angular/core';
import { StorageAdapter } from '../interfaces/storage.interface';

@Injectable()
export class LocalStorageService implements StorageAdapter {

  constructor() { }

  setItem(key: string, value: any): void {
    console.log({ key, value });
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

}
