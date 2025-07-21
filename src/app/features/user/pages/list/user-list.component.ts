import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UsersStore } from '../../store/user.store';
import { UserDto } from '../../../../api/api-client';
@Component({
    selector: 'user-list-page',
    imports: [TableModule, ButtonModule],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
    readonly _userStore = inject(UsersStore);
    loading = signal(false);

    ngOnInit(): void {
        this._userStore.loadUsers();
    }

    get users(): UserDto[] {
        return this._userStore.data()?.items || [];
    }

    refreshList() {
        this._userStore.loadUsers();
    }
}
