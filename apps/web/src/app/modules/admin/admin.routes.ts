import { Routes } from '@angular/router';
import { DashboardAdminComponent } from '@car-mkd-systems/web/modules/admin/components/dashboard-admin/dashboard-admin.component';
import { AdminLayoutComponent } from '@car-mkd-systems/web/shared/layouts/admin-layout/admin-layout.component';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'prefix'
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardAdminComponent,
        data: {
          title: 'Админ-панель'
        }
      },
      {
        path: 'service',
        loadChildren: () => import('./components/services/admin-service.routes').then((m) => m.adminServiceRoutes)
      }
    ]
  }
];
