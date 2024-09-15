import { UserCredential, OAuthCredential } from '@angular/fire/auth';

export interface ISignInGoogleUseCase {
  execute: () => Promise<UserCredential | OAuthCredential | null>
}
