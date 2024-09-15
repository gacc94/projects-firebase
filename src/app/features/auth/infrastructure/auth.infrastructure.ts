import { Inject } from '@angular/core';
import { IAuthRepository } from '../domain/repositories/auth.repository';
import { Auth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, UserCredential } from '@angular/fire/auth';
import { ERROR_FIREBASE_STATE, TOKEN_STATE, USER_STATE } from '@app/shared/tokens/shared.token';
import { IStateStorage } from '@app/shared/states/interfaces/state-storage.interface';
import { UserCredentialMapper } from './mappers/user.mapper';
import { ITokenState, IUserState } from '@shared/states/interfaces';
import { FirebaseError } from '@angular/fire/app';
import { ErrorCustomMapper } from './mappers/error.mapper';
import { IErrorFirebaseState } from '@app/shared/states/interfaces/error-custom.interface';

export class AuthInfrastructure implements IAuthRepository {

  protected _provider: GoogleAuthProvider = new GoogleAuthProvider();

  constructor(
    private readonly _auth: Auth,
    @Inject(USER_STATE) private readonly _userState: IStateStorage<IUserState>,
    @Inject(TOKEN_STATE) private readonly _tokenState: IStateStorage<ITokenState>,
    @Inject(ERROR_FIREBASE_STATE) private readonly _errorFirebaseState: IStateStorage<IErrorFirebaseState>,
  ) { }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(this._auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorFirebase = new ErrorCustomMapper(error).mapToCustomError();
        this._errorFirebaseState.save(errorFirebase);
      }
      return null;
    }

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
      const user = new UserCredentialMapper().to(credential);
      this._userState.save(user);
      this._tokenState.save(user.stsTokenManager);
      return credential;
    } catch (error) {
      console.log({ error });
      return null
    }
  }

  async signOut(): Promise<{ message: string } | null> {
    try {
      await signOut(this._auth);
      this._tokenState.clear();
      this._userState.clear();
      return { message: 'Sign out successfully' }
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

  async forgotPassword(email: string) {
    try {
      return await sendPasswordResetEmail(this._auth, email);
    } catch (error) {
      console.log({ error });
      return null;
    }
  }
}
