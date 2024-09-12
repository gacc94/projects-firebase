import { UserCredential } from "@angular/fire/auth";

export interface ISignInGoogleUseCase {
  execute: () => Promise<UserCredential | null>
}
