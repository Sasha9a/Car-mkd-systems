import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { UtilsService } from "../utils.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
							private flashMessages: FlashMessagesService,
							private router: Router,
							private utilService: UtilsService) { }

  ngOnInit(): void {
  }

  logoutUser() {
  	this.authService.logout();
		this.flashMessages.show('Вы успешно вышли из аккаунта', {
			cssClass: 'alert-success',
			timeout: 5000
		});
		this.router.navigate(['/']);
		this.utilService.reloadComponent('/');
		return true;
	}

}
