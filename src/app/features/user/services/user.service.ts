import { inject, Injectable } from '@angular/core';
import { AuthClient, UserClient } from '../../../api/api-client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userClient = inject(UserClient);
  private authClient = inject(AuthClient);
  private _router = inject(Router);

  // private _isAuthenticated = signal<boolean>(!!localStorage.getItem('data'));
  // readonly isAuthenticated = this._isAuthenticated.asReadonly();

  getUsers(pageNumber: number = 1, pageSize: number = 10) {
    return this.userClient.getUsers(pageNumber, pageSize);
  }
}
