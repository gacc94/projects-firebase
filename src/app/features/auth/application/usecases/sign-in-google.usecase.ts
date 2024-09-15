import { Inject, Injectable } from '@angular/core';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { OAuthCredential, UserCredential } from '@angular/fire/auth';
import { ISignInGoogleUseCase } from '../interfaces/sign-in-google.interface';
import { AUTH_TOKEN } from '@app/shared/tokens/shared.token';

export class SignInGoogleUseCase implements ISignInGoogleUseCase {

  constructor(
    @Inject(AUTH_TOKEN) private readonly _authRepository: IAuthRepository
  ) { }

  async execute(): Promise<UserCredential | OAuthCredential | null> {
    return await this._authRepository.signInGoogleWithPopUp();
  }
}
