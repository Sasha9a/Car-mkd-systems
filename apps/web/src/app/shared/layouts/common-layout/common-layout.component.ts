import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { AuthService } from '@car-mkd-systems/web/core/services/user/auth.service';
import * as moment from 'moment-timezone';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'car-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: []
})
export class CommonLayoutComponent implements OnInit {

  public footerYear: string;

  public menuHeader: MenuItem[] = [
    {
      label: 'Создать товар',
      routerLink: '/product/add'
    },
    {
      separator: true
    },
    {
      label: 'Панель моделей автотранспорта',
      routerLink: '/car-models'
    },
    {
      label: 'Панель категорий',
      routerLink: '/category'
    },
    {
      separator: true
    },
    {
      label: 'Помощь',
      routerLink: '/help'
    },
    {
      separator: true
    },
    {
      label: 'Выйти',
      command: () => {
        this.authService.logout();
        this.errorService.addSuccessMessage("Вы успешно вышли!");
        this.router.navigate(['']).catch(console.error);
      }
    }
  ];

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
  }

}
