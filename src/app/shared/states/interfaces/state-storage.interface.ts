import { BehaviorSubject } from "rxjs";

export interface IStateStorage<T> {
    state$: BehaviorSubject< T| undefined>;
    save: (state: T) => T;
    clear: () => void;
}