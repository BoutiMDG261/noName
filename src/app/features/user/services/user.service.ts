import { inject, Injectable } from '@angular/core';
import { AuthClient, UserClient } from '../../../api/api-client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userClient = inject(UserClient);

  getUsers(pageNumber: number = 1, pageSize: number = 10) {
    return this.userClient.getUsers(pageNumber, pageSize);
  }
}
