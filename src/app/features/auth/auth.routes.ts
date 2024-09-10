import { Routes } from "@angular/router";
import { LayoutComponent } from "./presentation/views/layout/layout.component";

const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('./presentation/views/sign-in/sign-in.component')
      },
      {
        path: 'sign-up',
        loadComponent: () => import('./presentation/views/sign-up/sign-up.component')
      },
      {
        path: '**',
        redirectTo: 'sign-in',
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

export default AUTH_ROUTES;
