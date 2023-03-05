import { Route } from '@angular/router';
import { AuthGuard } from '@car-mkd-systems/web/core/guards/auth.guard';
import { DashboardComponent } from '@car-mkd-systems/web/modules/dashboard/components/dashboard/dashboard.component';
import { LoginComponent } from '@car-mkd-systems/web/modules/user/components/login/login.component';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    data: {
      title: 'Рабочий стол'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Авторизация'
    }
  }
];
