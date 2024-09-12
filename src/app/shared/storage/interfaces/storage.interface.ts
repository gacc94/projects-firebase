export interface StorageAdapter {
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
  clear: () => void;
  setItem: (key: string, value: any) => void;
}
