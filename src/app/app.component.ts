import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthStore } from './store/auth.store';

import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ReplyHub.Frontend';
  menuItems: MenuItem[];

  constructor(private authStore: AuthStore, private router: Router) {
    this.menuItems = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  logout() {
    this.authStore.clearTokens();
    this.router.navigate(['/login']);
  }
}
