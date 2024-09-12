import { AuthEntity } from "../entities/auth.entity";

export interface IAuthFactory {
  create: (email: string, password: string) => AuthEntity;
}
