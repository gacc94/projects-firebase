import { Routes } from "@angular/router";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./presentation/views/layout/layout.component'),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./presentation/views/home/home.component')
      },
      {
        path: 'saving-record',
        loadComponent: () => import('./features/saving-record/presentation/views/saving-record/saving-record.component')
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

export default DASHBOARD_ROUTES;
