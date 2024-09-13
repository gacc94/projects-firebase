import { Inject } from '@angular/core';
import { IAuthRepository } from '@app/features/auth/domain/repositories/auth.repository';
import { AUTH_TOKEN } from '@app/shared/tokens/shared.token';
import { ISignOutUseCase } from '../interfaces/sign-out.interface';

export class SignOutUseCase implements ISignOutUseCase {

  constructor(
    @Inject(AUTH_TOKEN) private readonly _repository: IAuthRepository,
  ) { }

  async execute(): Promise<{ message: string } | null> {
    return await this._repository.signOut();
  }
}
