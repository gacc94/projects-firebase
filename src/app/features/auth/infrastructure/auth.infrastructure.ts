import { Inject, Injectable } from '@angular/core';
import { IAuthRepository } from '../domain/repositories/auth.repository';
import { Auth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, UserCredential } from '@angular/fire/auth';
import { AUTH_STATE } from '@app/shared/tokens/shared.token';
import { IStateStorage } from '@app/shared/states/interfaces/auth.interface';

export class AuthInfrastructure implements IAuthRepository {

  protected _provider: GoogleAuthProvider = new GoogleAuthProvider();

  constructor(
    private readonly _auth: Auth,
    @Inject(AUTH_STATE) private readonly _authState: IStateStorage<any>
  ) { }

  async signIn(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this._auth, email, password);
  }

  async signInGoogleRedirect(): Promise<UserCredential | null> {
    try {
      await signInWithRedirect(this._auth, this._provider);
      return await getRedirectResult(this._auth);
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  async signInGoogleWithPopUp(): Promise<UserCredential | null> {
    try {
      const credential = await signInWithPopup(this._auth, this._provider);
      this._authState.save(credential);
      return credential
    } catch (error) {
      console.log({ error });
      return null
    }
  }

  async signOut(): Promise<{ message: string } | null> {
    try {
      await signOut(this._auth);
      return {
        message: 'Sign out successfully',
      }
    } catch (error) {
      return null;
    }
  }


  getState() {
    return new Promise((resolve) => {
      onAuthStateChanged(this._auth, (user) => {
        if (!user) resolve(null);
        resolve(user);
      });
    })
  }
}
