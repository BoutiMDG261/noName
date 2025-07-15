import { inject, Injectable, signal } from '@angular/core';
import { AuthClient, LoginRequest, LoginResponse } from '../../api/api-client';
import { Router } from '@angular/router';
import { IUseLogin } from '../../features/user/interfaces/user-login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authClient = inject(AuthClient);
  private _router = inject(Router);

  private _isAuthenticated = signal<boolean>(!!localStorage.getItem('data'));
  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  login(loginData: LoginRequest) {
    return this.authClient.login(loginData);
  }

  saveDataUser(data: LoginResponse): void {
    localStorage.setItem('data', JSON.stringify(data));
    this._isAuthenticated.set(true);
  }

  logout(): void {
    localStorage.removeItem('data');
    this._isAuthenticated.set(false);
    this._router.navigate(['/login']);
  }

  getDataUser(): LoginResponse | null {
    const data = localStorage.getItem('data');
    return data ? JSON.parse(data) : null;
  }
}
