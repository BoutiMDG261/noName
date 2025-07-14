import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginGuard } from './core/auth/login.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/user/pages/list/user-list.component').then(m => m.UserListComponent),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoute),
        canActivate: [LoginGuard]
    }
];
