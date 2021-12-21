import { Injectable } from '@angular/core';
import { ProductItemDto } from '@car-mkd-systems/shared/dtos/product/product.item.dto';
import { BaseStateService } from '@car-mkd-systems/web/core/services/base-state.service';
import { ProductService } from '@car-mkd-systems/web/core/services/product/product.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductStateService extends BaseStateService {

  public constructor(private readonly productService: ProductService) {
    super();
    this.baseService = productService;
  }

  public findAll(queryParams: Record<string, { value: any, toApi: boolean }>): Observable<ProductItemDto> {
    return this.productService.findAll(queryParams);
  }
}
