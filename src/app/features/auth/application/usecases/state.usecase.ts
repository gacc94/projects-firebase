import { Inject } from "@angular/core";
import { IAuthRepository } from "../../domain/repositories/auth.repository";
import { IStateUseCase } from "../interfaces/state.interface";
import { AUTH_TOKEN } from "@app/shared/tokens/shared.token";

export class StateUseCase implements IStateUseCase {

  constructor(
    @Inject(AUTH_TOKEN) private readonly _authRepository: IAuthRepository,
  ) { }

  async execute() {
    return await this._authRepository.getState();
  }
}
