import { Component, OnInit } from '@angular/core';
import { ProductDto } from '@car-mkd-systems/shared/dtos/product/product.dto';
import { CategoryStateService } from '@car-mkd-systems/web/core/services/category/category-state.service';
import { ModelCarStateService } from '@car-mkd-systems/web/core/services/model-car/model-car-state.service';
import { ProductStateService } from '@car-mkd-systems/web/core/services/product/product-state.service';
import { QueryParamsService } from '@car-mkd-systems/web/core/services/query-params.service';

@Component({
  selector: 'car-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public loading = false;
  public queryParams: Record<string, { value: any, toApi: boolean }> = {
    categoryId: {
      value: null,
      toApi: true
    },
    brandId: {
      value: [],
      toApi: true
    },
    modelId: {
      value: [],
      toApi: true
    }
  };

  public products: ProductDto[];

  public filters = {
    categories: [],
    brands: [],
    models: [],
  };
  public selectedFilters = {
    category: undefined,
    brands: [],
    models: []
  };

  public constructor(private readonly modelCarStateService: ModelCarStateService,
                     private readonly categoryStateService: CategoryStateService,
                     private readonly productStateService: ProductStateService,
                     private readonly queryParamsService: QueryParamsService) { }

  public ngOnInit(): void {
    this.categoryStateService.findAllDropdown().subscribe((categories) => {
      this.filters.categories = categories;
    });

    this.modelCarStateService.findAllBrand().subscribe((brands) => {
      this.filters.brands = brands;
    });

    this.modelCarStateService.findAllModel().subscribe((models) => {
      this.filters.models = models;
    });

    this.queryParams = this.queryParamsService.getFilteredQueryParams(this.queryParams);
    this.queryParamsService.setQueryParams(this.queryParams);

    this.loadProducts();
  }

  public loadProducts() {
    this.loading = true;

    this.productStateService.find<ProductDto>(this.queryParamsService.parseQueryParamsForApi(this.queryParams)).subscribe((products) => {
      this.products = products;
      this.loading = false;
      this.selectedFilters = this.queryParamsService.getFilteredEntities(this.filters, this.queryParams);
    }, () => this.loading = false);
  }

}
