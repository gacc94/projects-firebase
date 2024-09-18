import { Inject } from "@angular/core";
import { ISavingRecordRepository } from '../../domain/repositories/saving-record.repository';
import { SAVING_RECORD_TOKEN } from "@app/shared/tokens/shared.token";
import { ICreateUseCase } from "../interfaces/create.interface";

export class CreateUseCase implements ICreateUseCase {

  constructor(
    @Inject(SAVING_RECORD_TOKEN) private readonly _repository: ISavingRecordRepository,
  ) { }

  execute(record: any): Promise<any> {
    return this._repository.create(record);
  }

}
