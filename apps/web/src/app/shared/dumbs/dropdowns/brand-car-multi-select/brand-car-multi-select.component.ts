import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrandCarDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.dto';

@Component({
  selector: 'car-brand-car-multi-select',
  templateUrl: './brand-car-multi-select.component.html',
  styleUrls: []
})
export class BrandCarMultiSelectComponent {

  @Input() public brandsCar: BrandCarDto[] = [];

  @Input() public selectedBrandsCar: BrandCarDto[] = [];
  @Output() public selectedBrandsCarChange = new EventEmitter<BrandCarDto[]>();

  @Input() public labelInput = false;

}
