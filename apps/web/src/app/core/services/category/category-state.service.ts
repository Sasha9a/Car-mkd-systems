import { Injectable } from '@angular/core';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { BaseStateService } from '@car-mkd-systems/web/core/services/base-state.service';
import { CategoryService } from '@car-mkd-systems/web/core/services/category/category.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryStateService extends BaseStateService {

  public constructor(private readonly categoryService: CategoryService) {
    super();
    this.baseService = categoryService;
  }

  public findAllDropdown(): Observable<CategoryDto[]> {
    return this.categoryService.findAllDropdown();
  }

}
