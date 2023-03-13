import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDto } from '@car-mkd-systems/shared/dtos/user/user.dto';
import { AuthService } from '@car-mkd-systems/web/core/services/user/auth.service';
import { UserAvatarComponent } from '@car-mkd-systems/web/shared/dumbs/user-avatar/user-avatar.component';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'car-admin-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, UserAvatarComponent, MenubarModule, PanelMenuModule],
  templateUrl: './admin-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminMenuComponent implements OnInit {
  @Input() public minimized: boolean;

  public items: MenuItem[];
  public menubar: MenuItem[];

  public currentUser: UserDto;

  public constructor(private readonly authService: AuthService) {}

  public ngOnInit() {
    this.currentUser = this.authService.currentUser;

    this.menubar = [
      {
        label: 'Выход',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        }
      }
    ];

    this.items = [
      {
        label: 'Рабочий стол',
        icon: 'pi pi-desktop',
        routerLink: '/admin',
        routerLinkActiveOptions: { exact: true }
      }
    ];
  }

  public logout() {
    this.authService.logout(location.pathname + location.search);
  }
}
