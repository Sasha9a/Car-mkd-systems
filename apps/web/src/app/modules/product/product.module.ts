import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { AuthGuard } from '@car-mkd-systems/web/core/guards/auth.guard';
import { RoleGuard } from '@car-mkd-systems/web/core/guards/role.guard';
import { ShareModule } from '@car-mkd-systems/web/shared/share.module';
import { ProductAddComponent } from './components/add/product-add.component';

const productRoutes: Routes = [
  {
    path: 'add',
    canActivate: [AuthGuard, RoleGuard],
    component: ProductAddComponent,
    data: {
      roles: [RoleEnum.ADMIN],
      included: true
    }
  }
];

@NgModule({
  declarations: [
    ProductAddComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(productRoutes)
  ]
})
export class ProductModule { }
