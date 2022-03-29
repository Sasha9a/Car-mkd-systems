import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "@car-mkd-systems/web/modules/user/components/login/login.component";
import { SharedModule } from "@car-mkd-systems/web/shared/shared.module";
import { UserCreateFormComponent } from './dumbs/user-create-form/user-create-form.component';
import { UserEditFormComponent } from './dumbs/user-edit-form/user-edit-form.component';

const userRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Логин - CMS'
    }
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    UserCreateFormComponent,
    UserEditFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    FormsModule,
    SharedModule
  ]
})
export class UserModule { }
