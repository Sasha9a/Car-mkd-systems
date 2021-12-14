import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ShareModule } from '@car-mkd-systems/web/shared/share.module';

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
		InputTextModule,
		FormsModule,
		PasswordModule,
		ButtonModule,
		RippleModule,
		ShareModule
	]
})
export class LoginModule { }
