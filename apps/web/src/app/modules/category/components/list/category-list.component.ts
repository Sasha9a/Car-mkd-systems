import { Component, OnInit } from '@angular/core';
import { CategoryDto } from "@car-mkd-systems/shared/dtos/category/category.dto";
import { CategoryStateService } from "@car-mkd-systems/web/core/services/category/category-state.service";

@Component({
  selector: 'car-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: []
})
export class CategoryListComponent implements OnInit {

  public categories: CategoryDto[];
  public loading = false;

  public openedDirectionIds: string[] = [];

  public constructor(private readonly categoryStateService: CategoryStateService) { }

  public ngOnInit(): void {
    this.loadCategories();
  }

  public loadCategories() {
    this.loading = true;

    this.categoryStateService.find<CategoryDto>().subscribe((data) => {
      this.categories = data;
      this.loading = false;
    }, () => this.loading = false);
  }

  public toCategory(category: any): CategoryDto {
    return category as CategoryDto;
  }

  public updateDirection(id: string) {
    if (this.openedDirectionIds.includes(id)) {
      this.openedDirectionIds = this.openedDirectionIds.filter((ids) => ids !== id);
    } else {
      this.openedDirectionIds.push(id);
    }
  }

}
