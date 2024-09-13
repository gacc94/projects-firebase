import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { ISignOutUseCase } from '@app/shared/application/interfaces/sign-out.interface';
import { SIGN_OUT_TOKEN } from '@app/shared/tokens/shared.token';
import { AppRoutes } from '@app/utils/libraries/app-routes';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export default class LayoutComponent {
  private _breakpointObserver = inject(BreakpointObserver);

  constructor(
    private readonly _router: Router,
    @Inject(SIGN_OUT_TOKEN) private readonly _signOutUseCase: ISignOutUseCase,
  ) { }


  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  async signOut() {
    const result = await this._signOutUseCase.execute();
    if (!result) return;
    console.log(result.message);
    this._redirectAuth();
  }

  private _redirectAuth() {
    this._router.navigateByUrl(AppRoutes.AUTH_BASE);
  }
}
