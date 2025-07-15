import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const LoginGuard = () => {
    const _authService = inject(AuthService);
    const _router = inject(Router);

    if (_authService.isAuthenticated()) {
        _router.navigate(['']);
        return false;
    }
    return true;
};
