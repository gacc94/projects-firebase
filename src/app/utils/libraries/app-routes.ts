export abstract class AppRoutes {
  /*
    * ========================================
    *           ROUTES - HOME
    * =======================================*/
  static readonly HOME: string = '/home';

  static readonly AUTH_BASE: string = 'auth';
  static readonly DASHBOARD_BASE: string = 'dashboard';

  /*
    * ========================================
    *           ROUTES - DASHBOARD
    * =======================================*/
  static readonly SIGN_IN: string = `${this.AUTH_BASE}/sign-in`;
  static readonly SIGN_UP: string = `${this.AUTH_BASE}/sign-up`;
  static readonly EMAIL_VERIFICATION: string = `${this.AUTH_BASE}/email-verification`;
  static readonly FORGOT_PASSWORD: string = `${this.AUTH_BASE}/forgot-password`;

  /*
    * ========================================
    *           ROUTES - DASHBOARD
    * =======================================*/
  static readonly DASH_HOME: string = `${this.DASHBOARD_BASE}/home`;
  static readonly DASH_USERS: string = `${this.DASHBOARD_BASE}/users`;
  static readonly DASH_COUNTRIES: string = `${this.DASHBOARD_BASE}/countries`;

  static removeCaracter(url: string): string | undefined {
    return url.split('/').at(1);
  }
}
