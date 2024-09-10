import { Routes } from "@angular/router";
import { LayoutComponent } from "./presentation/views/layout/layout.component";

const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('./presentation/views/sign-in/sign-in.component').then(m => m.SignInComponent)
      },
      {
        path: '**',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      }
      // { path: 'about', loadChildren: () => import('./presentation/views/about/about.module').then(m => m.AboutModule) },
      // { path: 'contact', loadChildren: () => import('./presentation/views/contact/contact.module').then(m => m
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

export default AUTH_ROUTES;
