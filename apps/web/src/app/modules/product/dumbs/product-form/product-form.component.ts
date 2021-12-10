import { Component, Input } from '@angular/core';
import { ProductFormDto } from '@car-mkd-systems/shared/dtos/product/product.form.dto';
import { BaseFormComponent } from '@car-mkd-systems/web/shared/dumbs/base-form/base-form.component';

@Component({
  selector: 'car-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent extends BaseFormComponent<ProductFormDto> {

  @Input() public product: ProductFormDto = new ProductFormDto();
  public dto = ProductFormDto;

  public constructor() {
    super();
  }

}
