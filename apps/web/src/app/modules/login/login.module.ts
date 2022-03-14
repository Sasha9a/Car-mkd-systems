import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@car-mkd-systems/web/shared/shared.module';

const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Логин - CMS'
    }
  }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
	imports: [
		CommonModule,
		RouterModule.forChild(loginRoutes),
		FormsModule,
		SharedModule
	]
})
export class LoginModule { }
