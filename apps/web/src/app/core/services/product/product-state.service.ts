import { Injectable } from '@angular/core';
import { BaseStateService } from '@car-mkd-systems/web/core/services/base-state.service';
import { ProductService } from '@car-mkd-systems/web/core/services/product/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductStateService extends BaseStateService {

  public constructor(private readonly productService: ProductService) {
    super();
    this.baseService = productService;
  }
}
