import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const authRoute: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    }
];
