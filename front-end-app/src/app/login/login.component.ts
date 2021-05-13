import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	login: String;
	password: String;

	constructor(private flashMessages: FlashMessagesService,
							private router: Router,
							private authService: AuthService) {
		this.login = '';
		this.password = '';
	}

	ngOnInit(): void {
	}

	btnLoginClick() {
		const user = {
			login: this.login,
			password: this.password
		};
		if (user.login === '') {
			this.flashMessages.show('Введите логин!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		} else if (user.password === '') {
			this.flashMessages.show('Введите пароль!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return  false;
		}
		this.authService.authUser(user).subscribe((data:any) => {
			if (!data.success) {
				this.flashMessages.show(data.message, {
					cssClass: 'alert-danger',
					timeout: 5000
				});
				this.router.navigate(['/login']);
			} else {
				this.router.navigate(['/']);
				this.authService.storeUser(data.token, data.user);
				this.flashMessages.show('Вы авторизовались', {
					cssClass: 'alert-success',
					timeout: 5000
				});
			}
		});
		return true;
	}

}
