import { Provider } from "@angular/core";
import { SignInUseCase } from "../../application/usecases/sign-in.usecase";
import { SignInGoogleUseCase } from "../../application/usecases/sign-in-google.usecase";
import { IAuthRepository } from "../../domain/repositories/auth.repository";
import { AuthInfrastructure } from "../auth.infrastructure";
import { Auth } from "@angular/fire/auth";
import { AuthFactory } from "../../domain/factories/auth.factory";
import { StateUseCase } from "../../application/usecases/state.usecase";
import { USER_STATE, AUTH_TOKEN, SIGN_IN_GOOGLE_TOKEN, SIGN_IN_TOKEN, STATE_AUTH_TOKEN, TOKEN_STATE, ERROR_FIREBASE_STATE } from "@app/shared/tokens/shared.token";
import { ITokenState, IUserState, IStateStorage } from "@app/shared/states/interfaces";
import { IErrorFirebaseState } from "@app/shared/states/interfaces/error-custom.interface";

export const AUT_PROVIDERS: Array<Provider> = [
  {
    provide: AUTH_TOKEN,
    useFactory:
      (auth: Auth, userState: IStateStorage<IUserState>, tokenState: IStateStorage<ITokenState>, errorState: IStateStorage<IErrorFirebaseState>) =>
        new AuthInfrastructure(auth, userState, tokenState, errorState),
    deps: [Auth, USER_STATE, TOKEN_STATE, ERROR_FIREBASE_STATE]
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
