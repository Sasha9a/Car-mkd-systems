import { Component, Input } from '@angular/core';
import { BrandCarFormDto } from "@car-mkd-systems/shared/dtos/modelCar/brand.car.form.dto";
import { ModelCarDto } from "@car-mkd-systems/shared/dtos/modelCar/model.car.dto";
import { ModelCarFormDto } from "@car-mkd-systems/shared/dtos/modelCar/model.car.form.dto";
import { ErrorService } from "@car-mkd-systems/web/core/services/error.service";
import { validate } from "@car-mkd-systems/web/core/services/validation/validate.service";
import { BaseFormComponent } from "@car-mkd-systems/web/shared/dumbs/base-form/base-form.component";

@Component({
  selector: 'car-car-model-form',
  templateUrl: './car-model-form.component.html',
  styleUrls: []
})
export class CarModelFormComponent extends BaseFormComponent<BrandCarFormDto> {

  @Input() public brandCar = new BrandCarFormDto();
  public dto = BrandCarFormDto;

  @Input() public route: string;

  public modelCarEdit: ModelCarFormDto = new ModelCarFormDto();

  public constructor(public override readonly errorService: ErrorService) {
    super(errorService);
  }

  public toModelCar(modelCar: any): ModelCarDto {
    return modelCar as ModelCarDto;
  }

  public addModelCar() {
    if (!Array.isArray(this.brandCar.models)) {
      this.brandCar.models = [];
    }
    const modelCar = new ModelCarFormDto();
    this.modelCarEdit = modelCar;
    this.brandCar.models.push(modelCar);
  }

  public updateModelCar(modelCar: ModelCarDto) {
    const { valid, errors } = validate(this.modelCarEdit, ModelCarFormDto);
    if (!valid) {
      console.error(errors);
      this.errorService.errorValues<ModelCarFormDto>(errors);
    } else {
      modelCar.name = this.modelCarEdit.name;
      this.modelCarEdit = null;
    }
  }

  public deleteModelCar(modelCar: ModelCarFormDto) {
    this.brandCar.models = this.brandCar.models.filter((c) => modelCar !== c);
  }

}
