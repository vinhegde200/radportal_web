import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./comps/pages/login/login.component').then(m => m.LoginComponent) },
    { path: 'home', loadComponent: () => import('./comps/pages/home/home.component').then(m => m.HomeComponent )},
    { path: 'home/:company', loadComponent: () => import('./comps/pages/home/home.component').then(m => m.HomeComponent )}
];
