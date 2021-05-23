import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { UtilsService } from "../utils.service";

@Component({
  selector: 'app-edit-params',
  templateUrl: './edit-params.component.html',
  styleUrls: ['./edit-params.component.css']
})
export class EditParamsComponent implements OnInit {

	name: String = '';
	allParams: any = [];

  constructor(private http: HttpClient,
							private router: Router,
							private flashMessages: FlashMessagesService,
							private utilsService: UtilsService) { }

  ngOnInit(): void {
		this.http.get('http://localhost:3000/edit-params').subscribe((data: any) => {
			this.allParams = data.allParams;
		});
  }

  addParam() {
		const param = {
			name: this.name,
			task: 1
		};
		if (param.name === '') {
			this.flashMessages.show('Введите название характеристики!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		} else if (param.name.length > 100) {
			this.flashMessages.show('Слишком большое название характеристики!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		} else {
			let headers = new HttpHeaders();
			headers.append('Content-Type', 'application/json');
			this.http.post('edit-params',
				param,
				{headers: headers}).subscribe((data:any) => {
				if (!data.success) {
					this.flashMessages.show(data.message, {
						cssClass: 'alert-danger',
						timeout: 5000
					});
				} else {
					this.flashMessages.show(data.message, {
						cssClass: 'alert-success',
						timeout: 5000
					});
				}
			});
			this.utilsService.reloadComponent('/edit-params');
			return true;
		}
	}

	deleteParam(name: String) {
		const param = {
			name: name,
			task: 2
		};
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		this.http.post('edit-params',
			param,
			{headers: headers}).subscribe((data:any) => {
			this.flashMessages.show(data.message, {
				cssClass: 'alert-success',
				timeout: 5000
			});
		});
		this.utilsService.reloadComponent('/edit-params');
	}

}
