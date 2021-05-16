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

	urlID: String = '';
	product: any = null;

  constructor(public authService: AuthService,
							private http: HttpClient,
							private flashMessages: FlashMessagesService,
							private router: Router,
							private utils: UtilsService) {
		this.urlID = this.router.parseUrl(this.router.url).root.children[PRIMARY_OUTLET].segments[1].path;
		this.http.get('http://localhost:3000/product/' + this.urlID).subscribe((data: any) => {
			this.product = data.product;
		});
	}

  ngOnInit(): void {
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
					this.utils.reloadComponent('/product/' + this.urlID);
				}
				return true;
		});
	}



}
