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
	allParams: any = [];
	urlID: String = '';
	product: any = null;
	countStock: Number | undefined;
	activeFirms: any = [];
	newNameMod: String = '';
	editNameMod: String = '';
	activeMod: number = -1;
	price: Number | undefined;
	discount: Number | undefined;
	param: Array<string> = new Array<string>();

  constructor(public authService: AuthService,
							private http: HttpClient,
							private flashMessages: FlashMessagesService,
							private router: Router) {
		this.urlID = this.router.parseUrl(this.router.url).root.children[PRIMARY_OUTLET].segments[1].path;
		this.http.get('product/' + this.urlID).subscribe((data: any) => {
			this.product = data.product;
			if (this.product.mods.length !== 0) {
				this.activeMod = 0;
			}
			this.allFirms = data.allFirms;
			this.allModels = data.allModels;
			this.allParams = data.allParams;
			this.activeFirms = data.activeFirms;
			this.param = new Array<string>(this.allParams.length);
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

	convertToMoney(number: number) {
  	return new Intl.NumberFormat('ru-RU', {
  		style: 'currency',
			currency: 'RUB',
			minimumFractionDigits: 0
		}).format(number);
	}

	findParam(name: String) {
  	if (this.activeMod != -1) {
			let par = this.product.mods[this.activeMod].params.find((el: any) => el.name === name);
			if (par !== undefined) {
				return this.product.mods[this.activeMod].params.find((el: any) => el.name === name).value;
			} else {
				return '';
			}
		}
  	return '';
	}

	deleteProduct() {
		const product = {
			task: 12
		};
		this.sendPost('application/json', product, (data: any) => {
			if (data.success) {
				this.flashMessages.show('Товар успешно удален', {
					cssClass: 'alert-success',
					timeout: 5000
				});
				this.router.navigate(['/']);
			} else {
				this.flashMessages.show('Произошла ошибка!', {
					cssClass: 'alert-danger',
					timeout: 5000
				});
			}
		});
	}

	publicProduct() {
		const product = {
			task: 11
		};
		if (this.product.mods.length === 0) {
			this.flashMessages.show('Чтобы опубликовать, нужно создать минимум 1 тип комплектации!', {
				cssClass: 'alert-danger',
				timeout: 10000
			});
			return false;
		} else if (this.product.carModels.length === 0) {
			this.flashMessages.show('Чтобы опубликовать, нужно продукт прикрепить минимум к одному автомобилю!', {
				cssClass: 'alert-danger',
				timeout: 10000
			});
			return false;
		}
		this.sendPost('application/json', product, (data: any) => {
			if (data.success) {
				this.product.isPublic = data.isPublic;
				this.flashMessages.show('Товар опубликован', {
					cssClass: 'alert-success',
					timeout: 5000
				});
			}
		});
		return true;
	}

	editParam(name: String, index: number) {
  	const product = {
  		nameParam: name,
			value: this.param[index],
			nameMod: this.product.mods[this.activeMod].name,
			task: 10
		};
  	if (this.param[index] === undefined) {
  		return false;
		} else if (this.param[index].length > 100) {
			this.flashMessages.show('Слишком длинный текст!', {
				cssClass: 'alert-danger',
				timeout: 10000
			});
			return false;
		}
  	this.param[index] = '';
  	this.sendPost('application/json', product, (data: any) => {
			if (data.success) {
				this.product.mods = data.mods;
			} else {
				this.flashMessages.show(data.message, {
					cssClass: 'alert-danger',
					timeout: 10000
				});
			}
		});
  	return true;
	}

	delDiscount() {
		const product = {
			nameMod: this.product.mods[this.activeMod].name,
			task: 9
		};
		this.sendPost('application/json', product, (data: any) => {
			if (data.success) {
				this.product.mods = data.mods;
			} else {
				this.flashMessages.show(data.message, {
					cssClass: 'alert-danger',
					timeout: 5000
				});
			}
		});
	}

	addDiscount() {
		const product = {
			discount: this.discount,
			nameMod: this.product.mods[this.activeMod].name,
			task: 8
		};
		if (this.discount === undefined) {
			return false;
		} else if (this.discount < 0 || this.discount > this.product.mods[this.activeMod].price - 1) {
			this.flashMessages.show('Число не должно быть меньше 0 или больше цены товара!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		}
		this.discount = undefined;
		this.sendPost('application/json', product, (data: any) => {
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

	editPrice() {
		const product = {
			price: this.price,
			nameMod: this.product.mods[this.activeMod].name,
			task: 7
		};
		if (this.price === undefined) {
			return false;
		} else if (this.price < 0 || this.price > 100000) {
			this.flashMessages.show('Число не должно быть меньше 0 или больше 100.000!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		}
		this.price = undefined;
		this.sendPost('application/json', product, (data: any) => {
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

	selectMod(index: number) {
  	this.activeMod = index;
	}

	deleteMod() {
		const product = {
			nameMod: this.product.mods[this.activeMod].name,
			task: 6
		}
		this.sendPost('application/json', product, (data: any) => {
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
		this.sendPost('application/json', product, (data: any) => {
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
  	this.sendPost('application/json', product, (data: any) => {
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
		this.sendPost('application/json', product, (data: any) => {
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
		this.sendPost('application/json', product, (data: any) => {
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
		if (this.countStock === undefined) {
			return false;
		} else if (this.countStock < 0 || this.countStock > 10000) {
			this.flashMessages.show('Число не должно быть меньше 0 или больше 10.000!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		}
		this.countStock = undefined;
		this.sendPost('application/json', product, (data: any) => {
			if (data.success) {
				this.product.stock = data.stock;
			}
		});
		return true;
	}

  uploadImages(event: any) {
  	const formData = new FormData();
		for (let f of event.target.files) {
			formData.append('images', f, f.name);
		}
		this.sendPost('multipart/form-data', formData, (data: any) => {
			if (!data.success) {
				this.flashMessages.show('Произошла ошибка во время загрузки фото!', {
					cssClass: 'alert-danger',
					timeout: 5000
				});
			} else {
				this.product.images = data.images;
			}
		});
		return true;
	}

	sendPost(valueContent: string, object: any, callback: any) {
		let headers = new HttpHeaders();
		headers.append('Content-Type', valueContent);
		this.http.post('product/' + this.urlID,
			object, {headers: headers}).subscribe(callback);
	}
}
