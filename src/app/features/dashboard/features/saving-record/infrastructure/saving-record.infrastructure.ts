import { addDoc, collection, Firestore } from "@angular/fire/firestore";
import { ISavingRecordRepository } from "../domain/repositories/saving-record.repository";

export class SavingRecordInfrastructure implements ISavingRecordRepository {
  constructor(
    private readonly _firestore: Firestore
  ) { }

  async create(record: any) {
    try {
      const recordRef = collection(this._firestore, 'records');
      return await addDoc(recordRef, record);
    } catch (error) {
      return null
    }
  }

}
