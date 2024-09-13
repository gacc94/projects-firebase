import { Inject } from '@angular/core';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { AuthEntity } from '../../domain/entities/auth.entity';
import { AuthFactory } from '../../domain/factories/auth.factory';
import { IAuthFactory } from '../../domain/interfaces/auth.factory.interface';
import { UserCredential } from '@angular/fire/auth';
import { ISignInUseCase } from '../interfaces/sign-in.interface';
import { AUTH_TOKEN } from '@shared/tokens/shared.token';
export class SignInUseCase implements ISignInUseCase {

  constructor(
    @Inject(AUTH_TOKEN) private readonly _authRepository: IAuthRepository,
    private readonly _authFactory: IAuthFactory
  ) { }

  async execute(email: string, password: string): Promise<UserCredential | null> {
    const auth: AuthEntity = this._authFactory.create(email, password);
    return await this._authRepository.signIn(auth.email, auth.password);
  }
}
