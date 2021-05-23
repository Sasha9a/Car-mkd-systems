import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { UtilsService } from "../utils.service";

@Component({
  selector: 'app-edit-models',
  templateUrl: './edit-models.component.html',
  styleUrls: ['./edit-models.component.css']
})
export class EditModelsComponent implements OnInit {

	model: String = '';
	firm: String = '';
	modelsCar: any = {};
	allFirms: any = [];
	oldFirm: String = '';

  constructor(private http: HttpClient,
							private router: Router,
							private flashMessages: FlashMessagesService,
							private utilsService: UtilsService) {
	}

  ngOnInit(): void {
		this.http.get('edit-models').subscribe((data: any) => {
			this.modelsCar = data.modelsCar;
			this.allFirms = data.distinctFirm;
		});
  }

	createModelCar() {
  	const modelCar = {
  		model: this.model,
			firm: this.firm,
			task: 1
		};
		if (modelCar.model === '') {
			this.flashMessages.show('Введите модель!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		} else if (modelCar.firm === '') {
			this.flashMessages.show('Введите фирму!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		} else if (modelCar.model.length > 64) {
			this.flashMessages.show('Слишком большое название модели!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		} else if (modelCar.firm.length > 64) {
			this.flashMessages.show('Слишком большое название фирмы!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		}
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		this.http.post('edit-models',
			modelCar,
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
		this.utilsService.reloadComponent('/edit-models');
		return true;
	}

	updateNameFirm(oldFirm: String) {
		const modelCar = {
			firm: this.firm,
			oldFirm: oldFirm,
			task: 2
		};
		if (modelCar.firm === '') {
			return false;
		} else if (modelCar.firm.length > 64) {
			this.flashMessages.show('Слишком большое название фирмы!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		} else if (modelCar.firm === modelCar.oldFirm) {
			this.flashMessages.show('Название фирмы совпадает с нынешним!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		} else {
			this.httpPost(modelCar);
			return true;
		}
	}

	updateNameModel(oldModel: String, firm: String) {
		const modelCar = {
			model: this.model,
			firm: firm,
			oldModel: oldModel,
			task: 4
		};
		if (modelCar.model === '') {
			return false;
		} else if (modelCar.model.length > 64) {
			this.flashMessages.show('Слишком большое название модели!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		} else if (modelCar.model === modelCar.oldModel) {
			this.flashMessages.show('Название модели совпадает с нынешним!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		} else {
			this.httpPost(modelCar);
			return true;
		}
	}

	deleteFirm(firm: String) {
		const modelCar = {
			firm: firm,
			task: 3
		};
		this.httpPost(modelCar);
		return true;
	}

	deleteModel(model: String, firm: String) {
		const modelCar = {
			model: model,
			firm: firm,
			task: 5
		};
		this.httpPost(modelCar);
		return true;
	}

	httpPost(modelCar: any) {
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		this.http.post('edit-models',
			modelCar,
			{headers: headers}).subscribe((data:any) => {
			this.flashMessages.show(data.message, {
				cssClass: 'alert-success',
				timeout: 5000
			});
		});
		this.utilsService.reloadComponent('/edit-models');
	}
}
