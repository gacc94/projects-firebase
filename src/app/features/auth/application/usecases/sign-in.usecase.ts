import { Inject, Injectable } from '@angular/core';
import { AUTH_TOKEN } from '../../infrastructure/providers/auth.provider';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { AuthEntity } from '../../domain/entities/auth.entity';
import { AuthFactory } from '../../domain/factories/auth.factory';
import { IAuthFactory } from '../../domain/interfaces/auth.factory.interface';
export class SignInUseCase {

  constructor(
    @Inject(AUTH_TOKEN) private readonly _authRepository: IAuthRepository,
    private readonly _authFactory: IAuthFactory
  ) { }

  async execute(email: string, password: string) {
    try {
      const auth: AuthEntity = this._authFactory.create(email, password);
      return await this._authRepository.signIn(auth.email, auth.password);
    } catch (err) {
      return null;
    }
  }
}
