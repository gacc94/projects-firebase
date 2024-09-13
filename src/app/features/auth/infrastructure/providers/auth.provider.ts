import { Provider } from "@angular/core";
import { SignInUseCase } from "../../application/usecases/sign-in.usecase";
import { SignInGoogleUseCase } from "../../application/usecases/sign-in-google.usecase";
import { IAuthRepository } from "../../domain/repositories/auth.repository";
import { AuthInfrastructure } from "../auth.infrastructure";
import { Auth } from "@angular/fire/auth";
import { AuthFactory } from "../../domain/factories/auth.factory";
import { StateUseCase } from "../../application/usecases/state.usecase";
import { AUTH_TOKEN, SIGN_IN_GOOGLE_TOKEN, SIGN_IN_TOKEN, STATE_AUTH_TOKEN } from "@app/shared/tokens/shared.token";

export const AUT_PROVIDERS: Array<Provider> = [
  {
    provide: AUTH_TOKEN,
    useFactory: (auth: Auth) => new AuthInfrastructure(auth),
    deps: [Auth]
  },
  {
    provide: SIGN_IN_TOKEN,
    useFactory: (repository: IAuthRepository) => new SignInUseCase(repository, new AuthFactory()),
    deps: [AUTH_TOKEN]
  },
  {
    provide: SIGN_IN_GOOGLE_TOKEN,
    useFactory: (repository: IAuthRepository) => new SignInGoogleUseCase(repository),
    deps: [AUTH_TOKEN]
  },
  {
    provide: STATE_AUTH_TOKEN,
    useFactory: (repository: IAuthRepository) => new StateUseCase(repository),
    deps: [AUTH_TOKEN]
  },
]
