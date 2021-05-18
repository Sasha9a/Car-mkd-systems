import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import {PRIMARY_OUTLET, Router} from "@angular/router";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

	allFirms: any = [];
	allModels: any = [];
	urlID: String = '';
	product: any = null;
	countStock: Number | undefined;
	activeFirms: any = [];
	newNameMod: String = '';
	editNameMod: String = '';
	activeMod: number = -1;

  constructor(public authService: AuthService,
							private http: HttpClient,
							private flashMessages: FlashMessagesService,
							private router: Router) {
		this.urlID = this.router.parseUrl(this.router.url).root.children[PRIMARY_OUTLET].segments[1].path;
		this.http.get('http://localhost:3000/product/' + this.urlID).subscribe((data: any) => {
			this.product = data.product;
			if (this.product.mods.length !== 0) {
				this.activeMod = 0;
			}
			this.allFirms = data.allFirms;
			this.allModels = data.allModels;
			this.activeFirms = data.activeFirms;
		});
	}

  ngOnInit(): void {
  }

	isModelCar(model: String, firm: String) {
  	const arr = this.product.carModels.filter((cm: any) => {
  		return cm.model == model && cm.firm == firm;
		});
  	return arr.length != 0;
	}

	selectMod(index: number) {
  	this.activeMod = index;
	}

	deleteMod() {
		const product = {
			nameMod: this.product.mods[this.activeMod].name,
			task: 6
		}
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		this.http.post('http://localhost:3000/product/' + this.urlID,
			product, {headers: headers}).subscribe((data:any) => {
			if (data.success) {
				this.product.mods = data.mods;
				if (this.product.mods.length > 0) {
					this.activeMod = 0;
				} else {
					this.activeMod = -1;
				}
			} else {
				this.flashMessages.show(data.message, {
					cssClass: 'alert-danger',
					timeout: 5000
				});
			}
		});
	}

	editMod() {
		const product = {
			nameMod: this.editNameMod,
			oldNameMod: this.product.mods[this.activeMod].name,
			task: 5
		}
		if (this.editNameMod === '') {
			return false;
		} else if (this.editNameMod.length > 64) {
			this.flashMessages.show('Слишком длинное название модификации!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		} else if (this.editNameMod === this.product.mods[this.activeMod].name) {
			this.flashMessages.show('Название совпадает с нынешним!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		}
		this.editNameMod = '';
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		this.http.post('http://localhost:3000/product/' + this.urlID,
			product, {headers: headers}).subscribe((data:any) => {
			if (data.success) {
				this.product.mods = data.mods;
			} else {
				this.flashMessages.show(data.message, {
					cssClass: 'alert-danger',
					timeout: 5000
				});
			}
		});
		return true;
	}

	createMod() {
		const product = {
			nameMod: this.newNameMod,
			task: 4
		}
  	if (this.newNameMod === '') {
  		return false;
		} else if (this.newNameMod.length > 64) {
			this.flashMessages.show('Слишком длинное название модификации!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		}
  	this.newNameMod = '';
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		this.http.post('http://localhost:3000/product/' + this.urlID,
			product, {headers: headers}).subscribe((data:any) => {
			if (data.success) {
				this.product.mods = data.mods;
				if (this.product.mods.length !== 0 && this.activeMod === -1) {
					this.activeMod = 0;
				}
			} else {
				this.flashMessages.show(data.message, {
					cssClass: 'alert-danger',
					timeout: 5000
				});
			}
		});
		return true;
	}

	addCarModel(model: any) {
  	const product = {
			model: model,
			task: 2
		}
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		this.http.post('http://localhost:3000/product/' + this.urlID,
			product, {headers: headers}).subscribe((data:any) => {
			if (data.success) {
				this.product.carModels = data.carModels;
				this.activeFirms = data.activeFirms;
			}
		});
	}

	delCarModel(model: any) {
		const product = {
			model: model,
			task: 3
		}
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		this.http.post('http://localhost:3000/product/' + this.urlID,
			product, {headers: headers}).subscribe((data:any) => {
			if (data.success) {
				this.product.carModels = data.carModels;
				this.activeFirms = data.activeFirms;
			}
		});
	}

	updateStock() {
  	const product = {
  		stock: this.countStock,
			task: 1
		};
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		this.http.post('http://localhost:3000/product/' + this.urlID,
			product, {headers: headers}).subscribe((data:any) => {
				if (data.success) {
					this.product.stock = this.countStock;
				}
		});
	}

  uploadImages(event: any) {
  	const formData = new FormData();
		for (let f of event.target.files) {
			formData.append('images', f, f.name);
		}
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'multipart/form-data');
		this.http.post('http://localhost:3000/product/' + this.urlID,
			formData, {headers: headers}).subscribe((data:any) => {
				if (!data.success) {
					this.flashMessages.show('Произошла ошибка во время загрузки фото!', {
						cssClass: 'alert-danger',
						timeout: 5000
					});
				} else {
					this.product.images = data.images;
				}
				return true;
		});
	}
}
