import { Injectable } from '@angular/core';
import { ProductItemDto } from '@car-mkd-systems/shared/dtos/product/product.item.dto';
import { BaseService } from '@car-mkd-systems/web/core/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {
  protected baseUrl = '/product';

  public findAll(queryParams: Record<string, { value: any, toApi: boolean }>): Observable<ProductItemDto> {
    return this.http.get<ProductItemDto>(this.baseUrl, { params: queryParams as any });
  }

}
