import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';
import { ProductDto } from '@car-mkd-systems/shared/dtos/product/product.dto';
import { ProductFormDto } from '@car-mkd-systems/shared/dtos/product/product.form.dto';
import { CategoryStateService } from '@car-mkd-systems/web/core/services/category/category-state.service';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { ModelCarStateService } from '@car-mkd-systems/web/core/services/model-car/model-car-state.service';
import { ProductStateService } from '@car-mkd-systems/web/core/services/product/product-state.service';

@Component({
  selector: 'car-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: []
})
export class ProductAddComponent implements OnInit {

  public product: ProductFormDto = new ProductFormDto();

  public saving = false;

  public categories: CategoryDto[];
  public modelsCar: ModelCarDto[];

  public constructor(private readonly categoryStateService: CategoryStateService,
                     private readonly modelCarStateService: ModelCarStateService,
                     private readonly productStateService: ProductStateService,
                     private readonly errorService: ErrorService,
                     private readonly route: ActivatedRoute,
                     private readonly router: Router) { }

  public ngOnInit(): void {
    const copyId = this.route.snapshot.queryParams['copyId'];
    if (copyId) {
      this.productStateService.findById<ProductDto>(copyId).subscribe((product) => {
        product.images = [];
        this.product = { ...product };
      });
    }

    this.categoryStateService.findAllDropdown().subscribe((categories) => {
      this.categories = categories;
    });

    this.modelCarStateService.findAllModel().subscribe((modelsCar) => {
      this.modelsCar = modelsCar;
    });

  }

  public createProduct(product: ProductFormDto) {
    this.saving = true;

    this.productStateService.create<ProductFormDto, ProductDto>(product).subscribe((result) => {
      this.saving = false;
      this.errorService.addSuccessMessage("Успешно создан товар");
      this.router.navigate(['/product/card', result._id]).catch(console.error);
    }, () => this.saving = false);
  }

}
