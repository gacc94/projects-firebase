import { Injectable } from '@angular/core';
import { Auth, getRedirectResult, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, User, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _provider = new GoogleAuthProvider();

  constructor(
    private readonly _auth: Auth,
    private readonly _router: Router
  ) {
    this._provider.setCustomParameters({})
  }

  async signIn(email: string, password: string): Promise<UserCredential | null> {
    try {
      return await signInWithEmailAndPassword(this._auth, email, password);
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async signInGoogle() {
    try {
      await signInWithRedirect(this._auth, this._provider);
      return await getRedirectResult(this._auth);
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async signInGoogleWithPopUp() {
    try {
      return await signInWithPopup(this._auth, this._provider);
    } catch (error) {
      return null
    }
  }
}
