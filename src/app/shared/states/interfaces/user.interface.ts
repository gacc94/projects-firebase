import { User } from "@angular/fire/auth";
import { ITokenState } from "./token.interface";

export interface IUserState extends User {
  stsTokenManager: ITokenState;
}
