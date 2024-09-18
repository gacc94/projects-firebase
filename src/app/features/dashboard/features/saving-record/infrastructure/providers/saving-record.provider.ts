import { Provider } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { SavingRecordInfrastructure } from "../saving-record.infrastructure";
import { CREATE_SAVING_RECORD_TOKEN, SAVING_RECORD_TOKEN } from "@app/shared/tokens/shared.token";
import { ISavingRecordRepository } from '../../domain/repositories/saving-record.repository';
import { CreateUseCase } from "../../application/usecases/create.usecase";

export const SAVING_RECORD_PROVIDERS: Array<Provider> = [
  {
    provide: SAVING_RECORD_TOKEN,
    useFactory: (firestore: Firestore) => new SavingRecordInfrastructure(firestore),
    deps: [Firestore]
  },
  {
    provide: CREATE_SAVING_RECORD_TOKEN,
    useFactory: (repository: ISavingRecordRepository) => new CreateUseCase(repository),
    deps: [SAVING_RECORD_TOKEN]
  }
]

