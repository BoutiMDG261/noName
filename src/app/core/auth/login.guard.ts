import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

export const LoginGuard = () => {
    const _authService = inject(AuthService);
    const _router = inject(Router);

    if (_authService.isAuthenticated()) {
        _router.navigate(['']);
        return false;
    }
    return true;
};
