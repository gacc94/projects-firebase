import { inject, Provider } from "@angular/core";
import { AUTH_STATE, STORAGE_TOKEN } from "@app/shared/tokens/shared.token";
import { StateStorageService } from "../services/state-storage.service";
import { SessionStorageService } from "@app/shared/storage/services/session-storage.service";
import { StorageAdapter } from "@app/shared/storage/interfaces/storage.interface";

export const STATE_PROVIDERS: Array<Provider> = [
    {
        provide: AUTH_STATE,
        useFactory: (storage: StorageAdapter) => new StateStorageService(storage, 'auth'),
        deps: [STORAGE_TOKEN]
    }
]