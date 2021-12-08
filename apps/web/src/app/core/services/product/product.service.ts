import { Injectable } from '@angular/core';
import { BaseService } from '@car-mkd-systems/web/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {
  protected baseUrl = '/product';

}
