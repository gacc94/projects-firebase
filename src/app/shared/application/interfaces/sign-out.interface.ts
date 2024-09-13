export interface ISignOutUseCase {
  execute: () => Promise<{ message: string } | null>
}
