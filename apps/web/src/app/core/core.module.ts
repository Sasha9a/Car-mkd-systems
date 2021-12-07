import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { AppComponent } from '@car-mkd-systems/web/core/app.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@car-mkd-systems/web/core/guards/auth.guard';
import { RoleGuard } from '@car-mkd-systems/web/core/guards/role.guard';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonLayoutComponent } from '@car-mkd-systems/web/shared/layouts/common-layout/common-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../modules/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'car-models',
        canActivate: [AuthGuard],
        loadChildren: () => import('../modules/car-models/car-models.module').then(m => m.CarModelsModule)
      },
      {
        path: 'category',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('../modules/category/category.module').then(m => m.CategoryModule),
        data: {
          roles: [RoleEnum.ADMIN],
          included: true
        }
      }
    ]
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'ignore',
      scrollPositionRestoration: 'enabled'
    }),
    ToastModule,
    ConfirmDialogModule,
    ScrollTopModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class CoreModule { }
