import { FirebaseError } from "@angular/fire/app";
import { IErrorFirebaseState } from "@app/shared/states/interfaces/error-custom.interface";

export interface IErrorMapper {
  mapToCustomError: (error: FirebaseError) => any;
}

export class ErrorCustomMapper implements IErrorMapper {

  constructor(public error: FirebaseError) {
    this.error = error;
  }

  mapToCustomError(): IErrorFirebaseState {
    return {
      ...this.error,
      customMessage: 'Invalid Credentials'
    };
  }

}
