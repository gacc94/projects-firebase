import { Observable } from "rxjs";

export interface AuthRepository {
  signIn: (req: Request) => Observable<any>;
}
