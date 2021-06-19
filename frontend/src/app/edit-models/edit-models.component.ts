import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

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
  inputFirms: Array<string> = new Array<string>();
  inputModels: Array<string> = new Array<string>();

  constructor(private http: HttpClient,
							private router: Router,
							private flashMessages: FlashMessagesService) {
	}

  ngOnInit(): void {
  	const modelCar = {
  		task: 0
		};
  	this.sendPost(modelCar, (data: any) => {
  		if (data.success) {
        this.updateInfo(data);
			}
		});
  }

	createModelCar() {
  	const modelCar = {
      firm: this.firm,
  		model: this.model,
			task: 1
		};
		if (modelCar.model === '') {
			this.flashMessages.show('Введите модель!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
		} else if (modelCar.firm === '') {
			this.flashMessages.show('Введите фирму!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
		} else if (modelCar.model.length > 64) {
			this.flashMessages.show('Слишком большое название модели!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
		} else if (modelCar.firm.length > 64) {
			this.flashMessages.show('Слишком большое название фирмы!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
		} else {
      this.sendPost(modelCar, (data: any) => {
        if (!data.success) {
          this.flashMessages.show(data.message, {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        } else {
          this.firm = '';
          this.model = '';
          this.flashMessages.show(data.message, {
            cssClass: 'alert-success',
            timeout: 5000
          });
          this.updateInfo(data);
        }
      });
    }
		return false;
	}

	updateNameFirm(oldFirm: String, index: number) {
		const modelCar = {
			firm: this.inputFirms[index],
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
		} else if (modelCar.firm === modelCar.oldFirm) {
			this.flashMessages.show('Название фирмы совпадает с нынешним!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
		} else {
      this.callbackData(modelCar);
		}
    return false;
	}

	updateNameModel(oldModel: String, firm: String, index: number) {
		const modelCar = {
			model: this.inputModels[index],
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
		} else if (modelCar.model === modelCar.oldModel) {
			this.flashMessages.show('Название модели совпадает с нынешним!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
		} else {
      this.callbackData(modelCar);
		}
    return false;
	}

	deleteFirm(firm: String) {
		const modelCar = {
			firm: firm,
			task: 3
		};
    this.callbackData(modelCar);
		return false;
	}

	deleteModel(model: String, firm: String) {
		const modelCar = {
			model: model,
			firm: firm,
			task: 5
		};
    this.callbackData(modelCar);
    return false;
	}

	callbackData(modelCar: any) {
    this.sendPost(modelCar, (data: any) => {
      this.flashMessages.show(data.message, {
        cssClass: 'alert-success',
        timeout: 5000
      });
      this.updateInfo(data);
    });
  }

  updateInfo(data: any) {
    this.modelsCar = data.modelsCar;
    this.allFirms = data.distinctFirm;
    this.inputFirms = new Array<string>(this.allFirms.length);
    this.inputModels = new Array<string>(this.modelsCar.length);
  }

	sendPost(object: any, callback: any) {
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		this.http.post('edit-models',
			object, {headers: headers}).subscribe(callback);
	}
}
