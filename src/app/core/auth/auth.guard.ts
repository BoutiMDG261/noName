import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { CanActivateFn } from "@angular/router";

export const AuthGuard: CanActivateFn = () => {
    const _authService = inject(AuthService);
    const _router = inject(Router);

    if (_authService.isAuthenticated()) {
        return true;
    } else {
        _router.navigate(['/login']);
        return false;
    }
};