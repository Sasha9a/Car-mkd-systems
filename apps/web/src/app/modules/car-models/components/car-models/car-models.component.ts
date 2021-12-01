import { Component, OnInit } from '@angular/core';
import { BrandCarDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.dto';
import { BrandCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.form.dto';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';
import { ModelCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.form.dto';
import { ConfirmDialogService } from '@car-mkd-systems/web/core/services/confirm-dialog.service';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { ModelCarStateService } from '@car-mkd-systems/web/core/services/model-car/model-car-state.service';
import { validate } from '@car-mkd-systems/web/core/services/validation/validate.service';

@Component({
  selector: 'car-car-models',
  templateUrl: './car-models.component.html',
  styleUrls: []
})
export class CarModelsComponent implements OnInit {

  public carModels: BrandCarDto[];

  public brand: BrandCarFormDto = new BrandCarFormDto();
  public errorsBrand: Record<keyof BrandCarFormDto, any[]>;

  public model: ModelCarFormDto[];
  public errorsModel: Record<keyof ModelCarFormDto, any[]>[];

  public loading = false;
  public brandEdit: BrandCarFormDto = new BrandCarFormDto();
  public modelEdit: ModelCarFormDto = new ModelCarFormDto();
  public editableId: string;

  public folding = true;

  public constructor(private readonly modelCarStateService: ModelCarStateService,
                     private readonly confirmDialogService: ConfirmDialogService,
                     private readonly errorService: ErrorService) { }

  public ngOnInit(): void {
    this.modelCarStateService.find<BrandCarDto>().subscribe((carModels) => {
      this.carModels = carModels;
      this.model = this.carModels.map(() => new ModelCarFormDto());
      this.errorsModel = this.carModels.map(() => null);
    });

    this.folding = localStorage.getItem('cms.car.models.folding') ? JSON.parse(localStorage.getItem('cms.car.models.folding')) : true;
  }

  public createBrand() {
    this.loading = true;

    const { valid, errors } = validate(this.brand, BrandCarFormDto);
    if (!valid) {
      console.error(errors);
      this.errorsBrand = errors;
      this.loading = false;
      this.errorService.errorValues<BrandCarFormDto>(this.errorsBrand);
    } else {
      this.errorsBrand = null;

      this.modelCarStateService.createBrand(this.brand).subscribe((result) => {
        this.loading = false;
        this.brand.brand = undefined;
        this.errorService.addSuccessMessage(`Бренд ${result.brand} создан`);
        this.carModels.push(result);
        this.model.push(new ModelCarFormDto());
        this.errorsModel.push(null);
      }, () => this.loading = false);
    }
  }

  public createModel(brand: BrandCarDto, index: number) {
    this.loading = true;

    this.model[index].brand = brand;
    const { valid, errors } = validate(this.model[index], ModelCarFormDto);
    if (!valid) {
      console.error(errors);
      this.errorsModel[index] = errors;
      this.loading = false;
      this.errorService.errorValues<ModelCarFormDto>(this.errorsModel[index]);
    } else {
      this.errorsModel[index] = null;

      this.modelCarStateService.createModel(this.model[index]).subscribe((result) => {
        this.loading = false;
        this.model[index].model = undefined;
        brand.models.push(result);
        this.errorService.addSuccessMessage(`Модель ${result.model} создана`);
      }, () => this.loading = false);
    }
  }

  public updateBrand(brand: BrandCarDto, formBrand: BrandCarFormDto) {
    this.loading = true;

    const { valid, errors } = validate(formBrand, BrandCarFormDto);
    if (!valid) {
      console.error(errors);
      this.loading = false;
      this.errorService.errorValues<BrandCarFormDto>(this.errorsBrand);
    } else {
      this.modelCarStateService.updateBrand(brand._id, formBrand).subscribe(() => {
        this.loading = false;
        this.errorService.addSuccessMessage(`Бренд ${brand.brand} изменен на ${formBrand.brand}`);
        brand.brand = formBrand.brand;
        this.editableId = null;
      }, () => this.loading = false);
    }
  }

  public deleteBrand(brand: BrandCarDto) {
    this.confirmDialogService.confirm({
      message: `Вы действительно хотите удалить марку "${brand.brand}"?`,
      accept: () => {
        this.loading = true;

        this.modelCarStateService.deleteBrand(brand._id).subscribe(() => {
          this.loading = false;
          this.errorService.addSuccessMessage(`Бренд ${brand.brand} удален`);
          this.carModels = this.carModels.filter((brandCar) => brand._id !== brandCar._id);
        });
      }
    });
  }

  public deleteModel(model: ModelCarDto, brand: BrandCarDto) {
    this.confirmDialogService.confirm({
      message: `Вы действительно хотите удалить модель "${model.model}" марки "${brand.brand}"?`,
      accept: () => {
        this.loading = true;

        this.modelCarStateService.deleteModel(model._id).subscribe(() => {
          this.loading = false;
          this.errorService.addSuccessMessage(`Модель ${model.model} удалена`);
          brand.models = brand.models.filter((modelCar) => model._id !== modelCar._id);
        });
      }
    });
  }

  public setFolding() {
    localStorage.setItem('cms.car.models.folding', String(this.folding));
  }

  public toModel(model: any): ModelCarDto {
    return model as ModelCarDto;
  }

}
