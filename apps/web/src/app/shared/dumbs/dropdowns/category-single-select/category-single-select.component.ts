import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { UtilsService } from "@car-mkd-systems/web/core/services/utils.service";

@Component({
  selector: 'car-category-single-select',
  templateUrl: './category-single-select.component.html',
  styleUrls: []
})
export class CategorySingleSelectComponent {

  @Input() public categories: CategoryDto[];

  @Input() public selectedCategory: CategoryDto;
  @Output() public selectedCategoryChange = new EventEmitter<CategoryDto>();

  @Input() public class = '';
  @Input() public disabled = false;
  @Input() public placeholder = '';

  public dataCategories: { label: string, key: string, children: any[] }[];
  public dataSelectCategory: { label: string, key: string, children: any[] };

  public constructor(private readonly utilsService: UtilsService) {
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['categories']?.currentValue) {
      this.dataCategories = this.parseCategories(changes['categories'].currentValue);
    }
    if (changes['selectedCategory']?.currentValue) {
      this.dataSelectCategory = this.utilsService.flattenCategory(this.dataCategories).find((category) => {
        return category.key === changes['selectedCategory'].currentValue._id;
      });
    }
  }

  public changeValue(item: { label: string, key: string, children: any[] }) {
    const selectCategory = this.utilsService.flattenCategory(this.categories).find((category) => item.key === category._id);
    this.selectedCategoryChange.emit(selectCategory);
  }

  public parseCategories(categories: CategoryDto[]): { label: string, key: string, children: any[] }[] {
    if (!categories || !categories.length) {
      return [];
    }
    return categories.map((category) => {
      return {
        label: category.name,
        key: category._id,
        children: this.parseCategories(category.children)
      };
    });
  }

}
