import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { AppComponent } from '@car-mkd-systems/web/core/app.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@car-mkd-systems/web/core/guards/auth.guard';
import { RoleGuard } from '@car-mkd-systems/web/core/guards/role.guard';
import { SharedModule } from "@car-mkd-systems/web/shared/shared.module";
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonLayoutComponent } from '@car-mkd-systems/web/shared/layouts/common-layout/common-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../modules/main/main.module').then(m => m.MainModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../modules/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'car-models',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('../modules/car-models/car-models.module').then(m => m.CarModelsModule),
        data: {
          roles: [RoleEnum.ADMIN],
          included: true
        }
      },
      {
        path: 'category',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('../modules/category/category.module').then(m => m.CategoryModule),
        data: {
          roles: [RoleEnum.ADMIN],
          included: true
        }
      },
      {
        path: 'settings',
        canActivate: [AuthGuard, RoleGuard],
        loadChildren: () => import('../modules/settings/settings.module').then(m => m.SettingsModule),
        data: {
          roles: [RoleEnum.ADMIN],
          included: true
        }
      },
      {
        path: 'product',
        loadChildren: () => import('../modules/product/product.module').then(m => m.ProductModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
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
    SharedModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class CoreModule { }
