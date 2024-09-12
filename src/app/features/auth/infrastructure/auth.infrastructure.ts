import { Injectable } from '@angular/core';
import { IAuthRepository } from '../domain/repositories/auth.repository';
import { Auth, getRedirectResult, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, UserCredential } from '@angular/fire/auth';

export class AuthInfrastructure implements IAuthRepository {

  protected _provider: GoogleAuthProvider = new GoogleAuthProvider();

  constructor(
    private readonly _auth: Auth,
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
      return await signInWithPopup(this._auth, this._provider);
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

}
