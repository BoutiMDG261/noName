import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PanelMenuComponent } from './shared/components/panel/panel-menu.component';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PanelMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly _authService = inject(AuthService);
  title = 'front';
  isConnected = this._authService.isAuthenticated;
}
