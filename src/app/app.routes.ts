import { Routes } from '@angular/router';
import { AppRoutes } from './utils/libraries/app-routes';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardGuard } from './core/guards/dashboard.guard';

const routeAuth = AppRoutes.removeCaracter(AppRoutes.AUTH_BASE)!;
const routeDashboard = AppRoutes.removeCaracter(AppRoutes.DASHBOARD_BASE)!;

export const routes: Routes = [
  {
    path: routeAuth,
    loadChildren: () => import('@auth/auth.routes'),
    // canActivate: [AuthGuard],
  },
  {
    path: routeDashboard,
    loadChildren: () => import('@dashboard/dashboard.routes'),
    // canActivate: [DashboardGuard],
  },
  {
    path: '**',
    redirectTo: routeAuth,
    pathMatch: 'full',
  }
];
