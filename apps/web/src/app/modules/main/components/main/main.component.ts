import { Component, OnInit } from '@angular/core';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { BrandCarDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.dto';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';
import { ProductDto } from '@car-mkd-systems/shared/dtos/product/product.dto';
import { ProductQueryDto } from '@car-mkd-systems/shared/dtos/product/product.query.dto';
import { CategoryStateService } from '@car-mkd-systems/web/core/services/category/category-state.service';
import { ModelCarStateService } from '@car-mkd-systems/web/core/services/model-car/model-car-state.service';
import { ProductStateService } from '@car-mkd-systems/web/core/services/product/product-state.service';

@Component({
  selector: 'car-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public loading = false;
  public queryParams: ProductQueryDto;

  public products: ProductDto[];

  public categories: CategoryDto[];
  public brands: BrandCarDto[];
  public models: ModelCarDto[];

  public constructor(private readonly modelCarStateService: ModelCarStateService,
                     private readonly categoryStateService: CategoryStateService,
                     private readonly productStateService: ProductStateService) { }

  public ngOnInit(): void {
    this.queryParams = <ProductQueryDto>{
      limit: 50,
      offset: 0
    };

    this.categoryStateService.findAllDropdown().subscribe((categories) => {
      this.categories = categories;
    });

    this.modelCarStateService.findAllBrand().subscribe((brands) => {
      this.brands = brands;
    });

    this.modelCarStateService.findAllModel().subscribe((models) => {
      this.models = models;
    });

    this.loadProducts();
  }

  public loadProducts() {
    this.loading = true;

    this.productStateService.find<ProductDto>(this.queryParams).subscribe((products) => {
      this.products = products;
      this.loading = false;
    }, () => this.loading = false);
  }

}
