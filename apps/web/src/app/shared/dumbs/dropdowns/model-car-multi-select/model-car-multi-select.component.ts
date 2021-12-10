import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';

@Component({
  selector: 'car-model-car-multi-select',
  templateUrl: './model-car-multi-select.component.html',
  styleUrls: []
})
export class ModelCarMultiSelectComponent {

  @Input() public modelsCar: ModelCarDto[] = [];

  @Input() public selectedModelsCar: ModelCarDto[] = [];
  @Output() public selectedModelsCarChange = new EventEmitter<ModelCarDto[]>();

  @Input() public labelInput = false;

  public toModelCar(modelCar: any): ModelCarDto {
    return modelCar as ModelCarDto;
  }


}
