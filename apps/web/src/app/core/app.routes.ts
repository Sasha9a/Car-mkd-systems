import { Route } from '@angular/router';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { AuthGuard } from '@car-mkd-systems/web/core/guards/auth.guard';
import { RoleGuard } from '@car-mkd-systems/web/core/guards/role.guard';
import { MainComponent } from '@car-mkd-systems/web/modules/main/components/main/main.component';
import { LoginComponent } from '@car-mkd-systems/web/modules/user/components/login/login.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'prefix'
  },
  {
    path: '',
    component: MainComponent,
    title: 'Главная'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Авторизация'
  },
  {
    path: 'admin',
    loadChildren: () => import('../modules/admin/admin.routes').then((m) => m.adminRoutes),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [RoleEnum.SUPERADMIN, RoleEnum.ADMIN],
      included: true
    }
  }
];
