import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { BrandCarDto } from "@car-mkd-systems/shared/dtos/modelCar/brand.car.dto";
import { BrandCarFormDto } from "@car-mkd-systems/shared/dtos/modelCar/brand.car.form.dto";
import { ErrorService } from "@car-mkd-systems/web/core/services/error.service";
import { ModelCarStateService } from "@car-mkd-systems/web/core/services/model-car/model-car-state.service";

@Component({
  selector: 'car-car-model-add',
  templateUrl: './car-model-add.component.html',
  styleUrls: []
})
export class CarModelAddComponent {

  public brandCar = new BrandCarFormDto();
  public saving = false;

  public constructor(private readonly modelCarStateService: ModelCarStateService,
                     private readonly errorService: ErrorService,
                     private readonly router: Router) { }

  public create(body: BrandCarFormDto) {
    this.saving = true;

    this.modelCarStateService.create<BrandCarFormDto, BrandCarDto>(body).subscribe(() => {
      this.saving = false;
      this.errorService.addSuccessMessage("Марка успешно создана");
      this.router.navigate(['/car-models']).catch(console.error);
    }, () => this.saving = false);
  }

}
