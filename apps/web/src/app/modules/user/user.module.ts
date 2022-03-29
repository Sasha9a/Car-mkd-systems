import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { RoleEnum } from "@car-mkd-systems/shared/enums/role.enum";
import { AuthGuard } from "@car-mkd-systems/web/core/guards/auth.guard";
import { RoleGuard } from "@car-mkd-systems/web/core/guards/role.guard";
import { LoginComponent } from "@car-mkd-systems/web/modules/user/components/login/login.component";
import { SharedModule } from "@car-mkd-systems/web/shared/shared.module";
import { UserCreateFormComponent } from './dumbs/user-create-form/user-create-form.component';
import { UserEditFormComponent } from './dumbs/user-edit-form/user-edit-form.component';
import { UserAddComponent } from './components/add/user-add.component';
import { UserEditComponent } from './components/edit/user-edit.component';
import { UserListComponent } from './components/list/user-list.component';

const userRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, RoleGuard],
    component: UserListComponent,
    data: {
      title: 'Пользователи - CMS',
      roles: [RoleEnum.SUPERADMIN],
      included: true
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Логин - CMS'
    }
  },
  {
    path: 'add',
    canActivate: [AuthGuard, RoleGuard],
    component: UserAddComponent,
    data: {
      title: 'Добавить пользователя - CMS',
      roles: [RoleEnum.SUPERADMIN],
      included: true
    }
  },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard, RoleGuard],
    component: UserEditComponent,
    data: {
      roles: [RoleEnum.SUPERADMIN],
      included: true
    }
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    UserCreateFormComponent,
    UserEditFormComponent,
    UserAddComponent,
    UserEditComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    FormsModule,
    SharedModule
  ]
})
export class UserModule { }
