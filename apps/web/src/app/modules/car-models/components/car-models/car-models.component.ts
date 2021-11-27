import { Component, OnInit } from '@angular/core';
import { FirmCarDto } from '@car-mkd-systems/shared/dtos/modelCar/firm.car.dto';
import { FirmCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/firm.car.form.dto';
import { ModelCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.form.dto';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { ModelCarStateService } from '@car-mkd-systems/web/core/services/model-car/model-car-state.service';
import { validate } from '@car-mkd-systems/web/core/services/validation/validate.service';

@Component({
  selector: 'car-car-models',
  templateUrl: './car-models.component.html',
  styleUrls: []
})
export class CarModelsComponent implements OnInit {

  public carModels: FirmCarDto[];

  public firm: FirmCarFormDto = new FirmCarFormDto();
  public errorsFirm: Record<keyof FirmCarFormDto, any[]>;

  public model: ModelCarFormDto[];
  public errorsModel: Record<keyof ModelCarFormDto, any[]>[];

  public loading = false;

  public folding = true;

  public constructor(private readonly modelCarStateService: ModelCarStateService,
                     private readonly errorService: ErrorService) { }

  public ngOnInit(): void {
    this.modelCarStateService.find<FirmCarDto>().subscribe((carModels) => {
      this.carModels = carModels;
      this.model = this.carModels.map(() => new ModelCarFormDto());
      this.errorsModel = this.carModels.map(() => null);
    });

    this.folding = localStorage.getItem('cms.car.models.folding') ? JSON.parse(localStorage.getItem('cms.car.models.folding')) : true;
  }

  public createFirm() {
    this.loading = true;

    const { valid, errors } = validate(this.firm, FirmCarFormDto);
    if (!valid) {
      console.error(errors);
      this.errorsFirm = errors;
      this.loading = false;
      this.errorService.addCustomError(this.errorsFirm.firm.map((er) => `${er}`).join(', '));
    } else {
      this.errorsFirm = null;

      this.modelCarStateService.createFirm(this.firm).subscribe((result) => {
        this.loading = false;
        this.errorService.addSuccessMessage(`Фирма ${result.firm} создана`);
        this.carModels.push(result);
        this.model.push(new ModelCarFormDto());
        this.errorsModel.push(null);
      }, () => this.loading = false);
    }
  }

  public createModel(firm: FirmCarDto, index: number) {
    this.loading = true;

    this.model[index].firm = firm;
    const { valid, errors } = validate(this.model[index], ModelCarFormDto);
    if (!valid) {
      console.error(errors);
      this.errorsModel[index] = errors;
      this.loading = false;
      this.errorService.addCustomError(this.errorsModel[index].model.map((er) => `${er}`).join(', '));
    } else {
      this.errorsModel[index] = null;

      this.modelCarStateService.createModel(this.model[index]).subscribe((result) => {
        this.loading = false;
        this.errorService.addSuccessMessage(`Модель ${result.model} создана`);
      }, () => this.loading = false);
    }
  }

  public setFolding() {
    localStorage.setItem('cms.car.models.folding', String(this.folding));
  }

}
