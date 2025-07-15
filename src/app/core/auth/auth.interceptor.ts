import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const _authService = inject(AuthService);
    const userData = _authService.getDataUser();
    const token = userData?.token;

    if (!token) {
        return next(req);
    }

    const headers = req.headers.set('Authorization', `Bearer ${token}`);

    const newReq = req.clone({ headers });

    return next(newReq);
}
