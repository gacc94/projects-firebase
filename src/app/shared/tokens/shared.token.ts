import { inject, InjectionToken } from "@angular/core";
import { StorageAdapter } from "../storage/interfaces/storage.interface";
import { IAuthRepository } from "@features/auth/domain/repositories/auth.repository";
import { ISignInUseCase } from "@features/auth/application/interfaces/sign-in.interface";
import { ISignInGoogleUseCase } from "@features/auth/application/interfaces/sign-in-google.interface";
import { IStateUseCase } from "@features/auth/application/interfaces/state.interface";
import { ISignOutUseCase } from "../application/interfaces/sign-out.interface";
import { StateStorageService } from "../states/services/state-storage.service";
import { SessionStorageService } from "../storage/services/session-storage.service";
import { IStateStorage } from "../states/interfaces/auth.interface";

export const STORAGE_TOKEN = new InjectionToken<StorageAdapter>('StorageServiceToken');
export const AUTH_TOKEN = new InjectionToken<IAuthRepository>('AuthService');
export const SIGN_IN_TOKEN = new InjectionToken<ISignInUseCase>('SignInUseCase');
export const SIGN_IN_GOOGLE_TOKEN = new InjectionToken<ISignInGoogleUseCase>('SignInGoogleUseCase');
export const SIGN_OUT_TOKEN = new InjectionToken<ISignOutUseCase>('SignOutUseCase');
export const STATE_AUTH_TOKEN = new InjectionToken<IStateUseCase>('StateUseCase');

/**
 *  REPOSITORIES TOKENS
 */

export const AUTH_STATE = new InjectionToken<IStateStorage<any>>('AuthState')
