import { UserCredential } from "@angular/fire/auth";

export interface ISignInUseCase {
  execute: (email: string, password: string) => Promise<UserCredential | null>
}
