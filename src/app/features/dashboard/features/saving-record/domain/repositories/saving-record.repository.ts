export interface ISavingRecordRepository {
  create: (record: any) => Promise<any>;
}
