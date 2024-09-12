import { Routes } from '@angular/router';
import { AppRoutes } from './utils/libraries/app-routes';

export const routes: Routes = [
  {
    path: AppRoutes.AUTH_BASE,
    loadChildren: () => import('@auth/auth.routes')
  },
  {
    path: AppRoutes.DASHBOARD_BASE,
    loadChildren: () => import('@dashboard/dashboard.routes')
  }
];
