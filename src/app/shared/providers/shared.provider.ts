import { Provider } from "@angular/core";
import { SignOutUseCase } from "../application/usecases/sign-out.usecase";
import { AUTH_TOKEN, SIGN_OUT_TOKEN } from "../tokens/shared.token";
import { IAuthRepository } from "@app/features/auth/domain/repositories/auth.repository";
import { STORAGE_PROVIDERS } from "../storage/providers/storage.provider";

export const SHARED_PROVIDERS: Array<Provider> = [
  ...STORAGE_PROVIDERS,
  {
    provide: SIGN_OUT_TOKEN,
    useFactory: (repository: IAuthRepository) => new SignOutUseCase(repository),
    deps: [AUTH_TOKEN]
  }
]
