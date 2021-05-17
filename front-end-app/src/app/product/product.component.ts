import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import {PRIMARY_OUTLET, Router} from "@angular/router";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { UtilsService } from "../utils.service";

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

  constructor(public authService: AuthService,
							private http: HttpClient,
							private flashMessages: FlashMessagesService,
							private router: Router,
							private utils: UtilsService) {
		this.urlID = this.router.parseUrl(this.router.url).root.children[PRIMARY_OUTLET].segments[1].path;
		this.http.get('http://localhost:3000/product/' + this.urlID).subscribe((data: any) => {
			this.product = data.product;
			this.allFirms = data.allFirms;
			this.allModels = data.allModels;
			this.activeFirms = data.activeFirms;
			console.log(this.activeFirms);
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
				console.log(this.activeFirms);
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
				console.log(this.activeFirms);
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
