import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class IsAuth implements CanActivate {
	constructor(private authService: AuthService,
							private router: Router) {}

	canActivate() {
		if (this.authService.isAuth()) {
			return true;
		} else {
			this.router.navigate(['login']);
			return false;
		}
	}
}
