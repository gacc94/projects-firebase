import { InjectionToken, Provider } from "@angular/core";
import { StorageAdapter } from "../interfaces/storage.interface";
import { SessionStorageService } from "../services/session-storage.service";

export const STORAGE_SERVICE_TOKEN = new InjectionToken<StorageAdapter>('StorageServiceToken');

export const STORAGE_PROVIDERS: Array<Provider> = [
  {
    provide: STORAGE_SERVICE_TOKEN,
    useClass: SessionStorageService,
    // useClass: LocalStorageService,
  },
]
