import { Injectable } from '@angular/core';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { BaseService } from '@car-mkd-systems/web/core/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
  protected override baseUrl = '/category';

  public findAllDropdown(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.baseUrl}/all`);
  }

}
