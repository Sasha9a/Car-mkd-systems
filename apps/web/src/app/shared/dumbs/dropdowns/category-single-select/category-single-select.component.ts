import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';

@Component({
  selector: 'car-category-single-select',
  templateUrl: './category-single-select.component.html',
  styleUrls: []
})
export class CategorySingleSelectComponent {

  @Input() public categories: CategoryDto[] = [];

  @Input() public selectedCategory: CategoryDto;
  @Output() public selectedCategoryChange = new EventEmitter<CategoryDto>();

  @Input() public virtualScroll = false;
  @Input() public itemSize = 80;

  @Input() public labelInput = '';

  @Input() public class = '';

  public toCategory(category: any): CategoryDto {
    return category as CategoryDto;
  }

}
