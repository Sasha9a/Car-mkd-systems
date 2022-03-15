import { Injectable } from '@angular/core';
import { BaseStateService } from '@car-mkd-systems/web/core/services/base-state.service';
import { CategoryService } from '@car-mkd-systems/web/core/services/category/category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryStateService extends BaseStateService {

  public constructor(private readonly categoryService: CategoryService) {
    super();
    this.baseService = categoryService;
  }

}
