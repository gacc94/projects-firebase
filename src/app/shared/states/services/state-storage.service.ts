import { Inject, Injectable } from '@angular/core';
import { StorageAdapter } from '@app/shared/storage/interfaces/storage.interface';
import { STORAGE_TOKEN } from '@app/shared/tokens/shared.token';
import { BehaviorSubject } from 'rxjs';
import { IStateStorage } from '../interfaces/auth.interface';

@Injectable()
export class StateStorageService<T> implements IStateStorage<any> {

  private _state$: BehaviorSubject< T| undefined > = new BehaviorSubject< T| undefined >(undefined);

  constructor(
    @Inject(STORAGE_TOKEN) private readonly _storage: StorageAdapter,
    @Inject('STORAGE_ID') private readonly _storageId?: string,
  ){}

  get state$(): BehaviorSubject< T| undefined> {
    return this._state$;
  }

  save(state: T): T {
    this._state$.next(state);

    if (this._storageId) this._storage.setItem(this._storageId, state);

    return state;
  }

  clear(): void {
    this._state$.next(undefined);

    if (!this._storageId) return;

    this._storage.removeItem(this._storageId);
  }

}
