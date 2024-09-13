import { Inject, Injectable } from '@angular/core';
import { AUTH_TOKEN } from '../../infrastructure/providers/auth.provider';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { UserCredential } from '@angular/fire/auth';
import { ISignInGoogleUseCase } from '../interfaces/sign-in-google.interface';

export class SignInGoogleUseCase implements ISignInGoogleUseCase {

  constructor(
    @Inject(AUTH_TOKEN) private readonly _authRepository: IAuthRepository
  ) { }

  async execute(): Promise<UserCredential | null> {
    return await this._authRepository.signInGoogleWithPopUp();
  }
}
