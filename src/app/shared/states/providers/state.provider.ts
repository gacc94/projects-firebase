import { Provider } from "@angular/core";
import { USER_STATE, STORAGE_TOKEN, TOKEN_STATE, ERROR_FIREBASE_STATE } from "@app/shared/tokens/shared.token";
import { StateStorageService } from "../services/state-storage.service";
import { StorageAdapter } from "@app/shared/storage/interfaces/storage.interface";
import { environment } from "src/environments/environment";
import { ITokenState, IUserState } from "../interfaces";
import { IErrorFirebaseState } from "../interfaces/error-custom.interface";

export const STATE_PROVIDERS: Array<Provider> = [
  {
    provide: USER_STATE,
    useFactory: (storage: StorageAdapter) => new StateStorageService<IUserState>(storage, environment.storageKeys.user),
    deps: [STORAGE_TOKEN]
  },
  {
    provide: TOKEN_STATE,
    useFactory: (storage: StorageAdapter) => new StateStorageService<ITokenState>(storage, environment.storageKeys.token),
    deps: [STORAGE_TOKEN]
  },
  {
    provide: ERROR_FIREBASE_STATE,
    useFactory: (storage: StorageAdapter) => new StateStorageService<IErrorFirebaseState>(storage, environment.storageKeys.erorrFirebase),
    deps: [STORAGE_TOKEN]
  },
]
