import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { IStateStorage, ITokenState } from '@app/shared/states/interfaces';
import { TOKEN_STATE } from '@app/shared/tokens/shared.token';
import { AppRoutes } from '@app/utils/libraries/app-routes';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class DashboardGuard {

  constructor(
    @Inject(TOKEN_STATE) private readonly _tokenState: IStateStorage<ITokenState>,
    private readonly _router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const hasToken = this._tokenState.state$.value;
    if (hasToken) return true;

    // if (typeof hasToken !== 'object' || typeof hasToken.accessToken !== 'string') {
    //   return true;
    // }

    this._navigatesToAuth();
    return false;
  }

  private _navigatesToAuth(): void {
    this._router.navigateByUrl(AppRoutes.AUTH_BASE);
  }
}
