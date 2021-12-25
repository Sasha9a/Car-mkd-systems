import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { AuthService } from '@car-mkd-systems/web/core/services/user/auth.service';
import * as moment from 'moment-timezone';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'car-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['common-layout.component.scss']
})
export class CommonLayoutComponent implements OnInit {

  public footerYear: string;

  public menuHeader: MenuItem[] = [];

  public constructor(public readonly authService: AuthService,
                     private readonly errorService: ErrorService,
                     private readonly router: Router) {
  }

  public ngOnInit(): void {
    if (moment().year() === 2021) {
      this.footerYear = '2021';
    } else {
      this.footerYear = `2021-${moment().year()}`;
    }

    this.loadMenu();
  }

  public loadMenu() {
    this.menuHeader = [
      {
        label: 'Создать товар',
        visible: this.authService.currentUser?.roles.includes(RoleEnum.ADMIN),
        routerLink: '/product/add'
      },
      {
        separator: true,
        visible: this.authService.currentUser?.roles.includes(RoleEnum.ADMIN),
      },
      {
        label: 'Панель моделей автотранспорта',
        visible: this.authService.currentUser?.roles.includes(RoleEnum.ADMIN),
        routerLink: '/car-models'
      },
      {
        label: 'Панель категорий',
        visible: this.authService.currentUser?.roles.includes(RoleEnum.ADMIN),
        routerLink: '/category'
      },
      {
        separator: true,
        visible: this.authService.currentUser?.roles.includes(RoleEnum.ADMIN)
      },
      {
        label: 'Выйти',
        command: () => {
          this.authService.logout();
          this.errorService.addSuccessMessage("Вы успешно вышли!");
          if (this.router.url.split('?')[0] === '/') {
            setTimeout(() => location.reload(), 1500);
          }
          this.router.navigate(['']).catch(console.error);
        }
      }
    ];
  }

}
