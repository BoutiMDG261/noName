import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ApiResponseOfPaginatedListOfUserDto } from '../../../../api/api-client';

@Component({
    selector: 'user-list-page',
    imports: [],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
    private readonly _userService = inject(UserService);
    usersData = signal<ApiResponseOfPaginatedListOfUserDto | null>(null);
    loading = signal(false);

    ngOnInit(): void {
        this.loadUsers(1, 10);
    }

    loadUsers(pageNumber: number, pageSize: number) {
        this.loading.set(true);

        this._userService.getUsers(pageNumber, pageSize).subscribe({
            next: (res: ApiResponseOfPaginatedListOfUserDto) => {
                this.usersData.set(res);
                
                this.loading.set(false);
            },
            error: () => {
                this.usersData.set(null);
                this.loading.set(false);
            }
        });
    }
}
