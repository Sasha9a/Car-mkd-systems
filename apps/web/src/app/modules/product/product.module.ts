import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { AuthGuard } from '@car-mkd-systems/web/core/guards/auth.guard';
import { RoleGuard } from '@car-mkd-systems/web/core/guards/role.guard';
import { SharedModule } from '@car-mkd-systems/web/shared/shared.module';
import { ProductAddComponent } from './components/add/product-add.component';
import { ProductFormComponent } from './dumbs/product-form/product-form.component';
import { ProductCardComponent } from './components/card/product-card.component';
import { ProductEditComponent } from './components/edit/product-edit.component';

const productRoutes: Routes = [
  {
    path: 'add',
    canActivate: [AuthGuard, RoleGuard],
    component: ProductAddComponent,
    data: {
      title: 'Добавить товар - CMS',
      roles: [RoleEnum.SUPERADMIN, RoleEnum.ADMIN],
      included: true
    }
  },
  {
    path: 'card/:id',
    component: ProductCardComponent
  },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard, RoleGuard],
    component: ProductEditComponent,
    data: {
      title: 'Редактирование товара - CMS',
      roles: [RoleEnum.SUPERADMIN, RoleEnum.ADMIN],
      included: true
    }
  }
];

@NgModule({
  declarations: [
    ProductAddComponent,
    ProductFormComponent,
    ProductCardComponent,
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(productRoutes),
    FormsModule
  ]
})
export class ProductModule { }
