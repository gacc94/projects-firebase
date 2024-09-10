export interface IAuth {
  authenticated: boolean;
  user: any; // User object
  token: string; // JWT token
  refreshToken: string; // JWT refresh token
}

export class Auth {
  constructor() {
    Object.assign(this, Auth);
  }
}
