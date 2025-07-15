import { Component, computed, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
    selector: 'panel-menu-page',
    imports: [ButtonModule, PanelMenuModule],
    templateUrl: './panel-menu.component.html',
    styleUrl: './panel-menu.component.scss',
})
export class PanelMenuComponent implements OnInit {
    private readonly _authService = inject(AuthService);

    fulname = computed(() => {
        const dataUser = this._authService.getDataUser();
        return dataUser ? `Salut ${dataUser.user.name}` : '';
    });
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            {
                label: 'Gérer les utilisateurs',
                icon: 'pi pi-users',
                routerLink: '/'
            },
            {
                label: 'Profil',
                icon: 'pi pi-user',
                routerLink: '/profil'
            },
            {
                label: 'Paramètres',
                icon: 'pi pi-cog',
                routerLink: '/settings'
            }
        ];
    }

    logout() {
        this._authService.logout();
    }
}
