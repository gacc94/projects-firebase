import { inject, InjectionToken, Provider } from "@angular/core";
import { SignInUseCase } from "../../application/usecases/sign-in.usecase";
import { SignInGoogleUseCase } from "../../application/usecases/sign-in-google.usecase";
import { ISignInGoogleUseCase } from "../../application/interfaces/sign-in-google.interface";
import { IAuthRepository } from "../../domain/repositories/auth.repository";
import { AuthInfrastructure } from "../auth.infrastructure";
import { Auth } from "@angular/fire/auth";
import { ISignInUseCase } from "../../application/interfaces/sign-in.interface";
import { AuthFactory } from "../../domain/factories/auth.factory";
import { IAuthFactory } from "../../domain/interfaces/auth.factory.interface";

export const AUTH_TOKEN = new InjectionToken<IAuthRepository>('AuthService');
export const SIGN_IN_TOKEN = new InjectionToken<ISignInUseCase>('SignInUseCase');
export const SIGN_IN_GOOGLE_TOKEN = new InjectionToken<ISignInGoogleUseCase>('SignInGoogleUseCase');

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
  }
]
