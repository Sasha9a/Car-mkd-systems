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
  selector: 'car-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: []
})
export class ProductEditComponent implements OnInit {

  public productId: string;

  public product: ProductFormDto;

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
    this.productId = this.route.snapshot.params['id'];
    if (!this.productId) {
      return this.errorService.addCustomError('Ошибка', 'Произошла ошибка, вернитесь на главную и попробуйте снова.');
    }

    this.productStateService.findById<ProductDto>(this.productId).subscribe((product) => {
      this.product = { ...product };
    });

    this.categoryStateService.find<CategoryDto>().subscribe((categories) => {
      this.categories = categories;
    });

    this.modelCarStateService.findAllModel().subscribe((modelsCar) => {
      this.modelsCar = modelsCar;
    });

  }

  public editProduct(product: ProductFormDto) {
    this.saving = true;

    this.productStateService.update<ProductFormDto>(this.productId, product).subscribe(() => {
      this.saving = false;
      this.errorService.addSuccessMessage("Товар изменен");
      this.router.navigate(['/product/card', this.productId]).catch(console.error);
    }, () => this.saving = false);
  }

}
