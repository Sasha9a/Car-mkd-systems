import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	MAX_ITEM: number = 20;

	allProducts: any = [];
	showProducts: any = [];
	allPages: any = [];
	page: number = 0;
	firmCar: String = '';
	modelCar: String = '';
	allFirms: any = [];
	allModels: any = [];
	filtersFirm: any = [];
	filtersModel: any = [];
	isDisabledModelFilter: any = true;

  constructor(public authService: AuthService,
							private http: HttpClient) {
  	this.http.get('http://localhost:3000/').subscribe((data: any) => {
  		if (data.success) {
  			let max = 0;
  			this.allProducts = data.products;
  			this.allFirms = data.firms;
  			this.allModels = data.models;
  			this.filtersFirm = this.allFirms.filter((el: String, index: number) => index < 5);
				this.updatePage();
				this.allProducts.forEach((p: any) => {
					if (this.authService.isAuth() || p.isPublic) {
						max++;
					}
				});
  			let count = max / this.MAX_ITEM + (max % this.MAX_ITEM != 0 ? 1 : 0);
  			this.allPages = Array(Math.floor(count)).fill(0).map((x, i) => i);
			}
		});
	}

  ngOnInit(): void {
  }

  delFilters() {
  	this.isDisabledModelFilter = true;
  	this.modelCar = '';
  	this.firmCar = '';
  	this.filtersModel = [];
		this.filtersFirm = this.allFirms.filter((el: String, index: number) => index < 5);
		this.updatePage();
	}

  updateListFilterModel() {
		let max = 0;
		this.filtersModel = this.allModels.filter((el: any) => {
			if (el.firm === this.firmCar && el.model.toLowerCase().includes(this.modelCar.toLowerCase())
				&& el.model != this.modelCar && max < 5) {
				max++;
				return true;
			}
			return false;
		});
		this.updatePage();
	}

  updateListFilterFirm() {
  	let max = 0;
		this.filtersFirm = this.allFirms.filter((el: String) => {
			if (el.toLowerCase().includes(this.firmCar.toLowerCase()) && el != this.firmCar && max < 5) {
				max++;
				return true;
			}
			return false;
		});
		this.isDisabledModelFilter = this.allFirms.find((el: String) => this.firmCar === el) === undefined;
		if (this.isDisabledModelFilter == false) {
			let max = 0;
			this.filtersModel = this.allModels.filter((el: any) => {
				if (el.firm === this.firmCar && max < 5) {
					max++;
					return true;
				}
				return false;
			});
		} else {
			this.filtersModel = [];
			this.modelCar = '';
		}
		this.updatePage();
	}

  setPage(page: number) {
  	this.page = page;
		this.updatePage();
	}

	convertToMoney(number: number) {
		return new Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
			minimumFractionDigits: 0
		}).format(number);
	}

  isDiscount(name: String) {
  	const product = this.allProducts.find((p: any) => p.name === name);
  	if (product !== undefined) {
  		if (product.mods.filter((m: any) => m.discount != -1).length != 0) {
  			return true;
			}
		}
  	return false;
	}

	minPrice(name: String) {
		const product = this.allProducts.find((p: any) => p.name === name);
		let minPrice = -1;
		let minDiscount = -1;
		if (product !== undefined) {
			let arr = product.mods;
			arr.sort((a: any, b: any) => {
				if (a.price > b.price) {
					return 1;
				} else if (a.price < b.price) {
					return -1;
				}
				return 0;
			});
			minPrice = arr[0].price;
			arr.sort((a: any, b: any) => {
				if (a.discount > b.discount) {
					return 1;
				} else if (a.discount < b.discount) {
					return -1;
				}
				return 0;
			});
			arr = arr.filter((el: any) => el.discount != -1);
			if (arr.length != 0) {
				minDiscount = arr[0].discount;
			}
			if (minDiscount == -1) {
				return minPrice;
			} else {
				return minDiscount < minPrice ? minDiscount : minPrice;
			}
		}
		return -1;
	}

	updatePage() {
		let countProduct = 0;
		let minStart = 0;
		let max = 0;

		this.allProducts.forEach((p: any) => {
			if (this.authService.isAuth() || p.isPublic) {
				if (this.modelCar == '') {
					if ((this.firmCar != '' && p.carModels.find((m: any) => this.firmCar == m.firm)) || this.firmCar == '') {
						max++;
					}
				} else {
					if (p.carModels.find((m: any) => this.firmCar == m.firm) && p.carModels.find((m: any) => this.modelCar == m.model)) {
						max++;
					}
				}
			}
		});
		let count = max / this.MAX_ITEM + (max % this.MAX_ITEM != 0 ? 1 : 0);
		this.allPages = Array(Math.floor(count)).fill(0).map((x, i) => i);

		this.showProducts = this.allProducts.filter((p: any) => {
			if ((this.authService.isAuth() || p.isPublic) && countProduct < this.MAX_ITEM) {
				if (this.modelCar == '') {
					if ((this.firmCar != '' && p.carModels.find((m: any) => this.firmCar == m.firm)) || this.firmCar == '') {
						if (minStart < this.page * this.MAX_ITEM) {
							minStart++;
						} else {
							countProduct++;
							return true;
						}
					}
				} else {
					if (p.carModels.find((m: any) => this.firmCar == m.firm) && p.carModels.find((m: any) => this.modelCar == m.model)) {
						if (minStart < this.page * this.MAX_ITEM) {
							minStart++;
						} else {
							countProduct++;
							return true;
						}
					}
				}
			}
			return false;
		});
	}
}
