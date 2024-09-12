import { AuthEntity } from "../entities/auth.entity";
import { IAuthFactory } from "../interfaces/auth.factory.interface";

export class AuthFactory implements IAuthFactory {
  create(email: string, password: string): AuthEntity {
    return new AuthEntity(email, password);
  }
}
