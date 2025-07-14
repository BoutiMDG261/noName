import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
    selector: 'user-list-page',
    imports: [ButtonModule],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
    private readonly _authService = inject(AuthService);

    title = signal<string>('');

    ngOnInit(): void {
        this.title.set('Hello World !!!');
    }

    logout() {
        this._authService.logout();
    }
}
