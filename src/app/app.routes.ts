import { Routes } from '@angular/router';
import { AppRoutes } from './utils/libraries/app-routes';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardGuard } from './core/guards/dashboard.guard';

export const routes: Routes = [
  {
    path: AppRoutes.AUTH_BASE,
    loadChildren: () => import('@auth/auth.routes'),
    canActivate: [AuthGuard],
  },
  {
    path: AppRoutes.DASHBOARD_BASE,
    loadChildren: () => import('@dashboard/dashboard.routes'),
    canActivate: [DashboardGuard],
  },
  {
    path: '**',
    redirectTo: AppRoutes.AUTH_BASE,
    pathMatch: 'full',
  }
];
