import { FirebaseError } from "@angular/fire/app";

export interface IErrorFirebaseState extends FirebaseError {
  customMessage: string;
}
