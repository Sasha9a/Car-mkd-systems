import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';

@Component({
  selector: 'car-category-multi-select',
  templateUrl: './category-multi-select.component.html',
  styleUrls: []
})
export class CategoryMultiSelectComponent {

  @Input() public categories: CategoryDto[] = [];

  @Input() public selectedCategories: CategoryDto[] = [];
  @Output() public selectedCategoriesChange = new EventEmitter<CategoryDto[]>();

  @Input() public labelInput = false;

}
