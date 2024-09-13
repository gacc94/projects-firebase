import { UserCredential } from "@angular/fire/auth";

export interface IAuthRepository {
  signIn: (email: string, password: string) => Promise<UserCredential | null>;
  signInGoogleWithPopUp: () => Promise<UserCredential | null>;
  signInGoogleRedirect: () => Promise<UserCredential | null>;
  signOut: () => Promise<{ message: string } | null>;
  getState: () => Promise<unknown>;
}
