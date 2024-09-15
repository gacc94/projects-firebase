import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { IStateStorage, ITokenState } from '@app/shared/states/interfaces';
import { TOKEN_STATE } from '@app/shared/tokens/shared.token';
import { AppRoutes } from '@app/utils/libraries/app-routes';
import { } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  constructor(
    @Inject(TOKEN_STATE) private readonly _tokenState: IStateStorage<ITokenState>,
    private readonly _router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const hasToken = this._tokenState.state$.value;
    console.log({ hasToken });
    if (!hasToken) {
      return true;
    }
    this._navigatesToDashboard();
    return false;
  }

  private _navigatesToDashboard(): void {
    this._router.navigateByUrl(AppRoutes.DASHBOARD_BASE);
  }
}
