import { Provider } from "@angular/core";
import { SessionStorageService } from "../services/session-storage.service";
import { STORAGE_TOKEN } from "@app/shared/tokens/shared.token";

export const STORAGE_PROVIDERS: Array<Provider> = [
  {
    provide: STORAGE_TOKEN,
    useClass: SessionStorageService,
    // useClass: LocalStorageService,
  },
]
