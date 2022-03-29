import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsDto } from "@car-mkd-systems/shared/dtos/settings/settings.dto";
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { SettingsStateService } from "@car-mkd-systems/web/core/services/settings/settings-state.service";
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

  public settings: SettingsDto;

  public constructor(public readonly authService: AuthService,
                     private readonly settingsStateSetvice: SettingsStateService,
                     private readonly errorService: ErrorService,
                     private readonly router: Router) {
  }

  public ngOnInit(): void {
    if (moment().year() === 2021) {
      this.footerYear = '2021';
    } else {
      this.footerYear = `2021-${moment().year()}`;
    }

    this.settingsStateSetvice.find<SettingsDto>().subscribe((settings) => {
      if (settings) {
        this.settings = settings[0];
      }
    });

    this.loadMenu();
  }

  public loadMenu() {
    this.menuHeader = [
      {
        label: 'Создать товар',
        visible: this.authService.checkRoles([RoleEnum.SUPERADMIN, RoleEnum.ADMIN]),
        routerLink: '/product/add'
      },
      {
        separator: true,
        visible: this.authService.checkRoles([RoleEnum.SUPERADMIN, RoleEnum.ADMIN]),
      },
      {
        label: 'Пользователи',
        visible: this.authService.checkRoles([RoleEnum.SUPERADMIN]),
        routerLink: '/user'
      },
      {
        label: 'Панель моделей автотранспорта',
        visible: this.authService.checkRoles([RoleEnum.SUPERADMIN, RoleEnum.ADMIN]),
        routerLink: '/car-models'
      },
      {
        label: 'Панель категорий',
        visible: this.authService.checkRoles([RoleEnum.SUPERADMIN, RoleEnum.ADMIN]),
        routerLink: '/category'
      },
      {
        label: 'Настройки',
        visible: this.authService.checkRoles([RoleEnum.SUPERADMIN, RoleEnum.ADMIN]),
        routerLink: '/settings'
      },
      {
        label: 'Помощь',
        visible: this.authService.checkRoles([RoleEnum.SUPERADMIN, RoleEnum.ADMIN]),
        routerLink: '/help'
      },
      {
        separator: true,
        visible: this.authService.checkRoles([RoleEnum.SUPERADMIN, RoleEnum.ADMIN])
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
  }

}
