import { inject, Injectable, signal } from '@angular/core';
import { AuthClient, LoginRequest } from '../../api/api-client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authClient = inject(AuthClient);
  private _router = inject(Router);

  private _isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));
  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  login(loginData: LoginRequest) {
    return this.authClient.login(loginData);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this._isAuthenticated.set(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this._isAuthenticated.set(false);
    this._router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
