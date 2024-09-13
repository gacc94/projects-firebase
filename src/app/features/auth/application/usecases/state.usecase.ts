import { Inject } from "@angular/core";
import { AUTH_TOKEN } from "../../infrastructure/providers/auth.provider";
import { IAuthRepository } from "../../domain/repositories/auth.repository";
import { IStateUseCase } from "../interfaces/state.interface";

export class StateUseCase implements IStateUseCase {

  constructor(
    @Inject(AUTH_TOKEN) private readonly _authRepository: IAuthRepository,
  ) { }

  async execute() {
    return await this._authRepository.getState();
  }
}
