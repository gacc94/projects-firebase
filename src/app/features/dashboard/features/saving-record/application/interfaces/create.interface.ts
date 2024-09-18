export interface ICreateUseCase {
  execute: (record: any) => Promise<any>;
}
