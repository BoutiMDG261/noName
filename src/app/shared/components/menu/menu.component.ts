import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PanelMenuComponent } from '../panel/panel-menu.component';

@Component({
    selector: 'menu-page',
    imports: [DrawerModule, ButtonModule, DividerModule, PanelMenuComponent],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
})
export class MenuComponent {
    private readonly _authService = inject(AuthService);

    fulname = computed(() => {
        const dataUser = this._authService.getDataUser();
        return dataUser ? `Salut ${dataUser.user.name}` : '';
    });
    sidebarVisible: boolean = false;

    logout() {
        this._authService.logout();
    }
}
