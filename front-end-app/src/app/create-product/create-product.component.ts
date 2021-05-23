import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

	name: String = '';
	stock: Number | undefined;

  constructor(private http: HttpClient,
							private router: Router,
							private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
  }

  createProduct() {
		const product = {
			name: this.name,
			stock: this.stock,
		};
		if (product.name === '') {
			this.flashMessages.show('Введите название товара!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		} else if (product.stock === undefined) {
			this.flashMessages.show('Введите количество товара!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		} else if (product.name.length > 100) {
			this.flashMessages.show('Слишком большое название товара!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		} else if (product.stock < 0 || product.stock > 100000) {
			this.flashMessages.show('Слишком большое или маленькое кол-во товара!', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
			return false;
		} else {
			let headers = new HttpHeaders();
			headers.append('Content-Type', 'application/json');
			this.http.post('product/new',
				product,
				{headers: headers}).subscribe((data:any) => {
				this.flashMessages.show(data.message, {
					cssClass: 'alert-success',
					timeout: 5000
				});
				this.router.navigate(['/product/' + data.product._id]);
			});
			return true;
		}
	}

}
