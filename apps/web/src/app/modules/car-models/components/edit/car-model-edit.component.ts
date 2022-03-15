import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from "@angular/router";
import { BrandCarDto } from "@car-mkd-systems/shared/dtos/modelCar/brand.car.dto";
import { BrandCarFormDto } from "@car-mkd-systems/shared/dtos/modelCar/brand.car.form.dto";
import { ConfirmDialogService } from "@car-mkd-systems/web/core/services/confirm-dialog.service";
import { ErrorService } from "@car-mkd-systems/web/core/services/error.service";
import { ModelCarStateService } from "@car-mkd-systems/web/core/services/model-car/model-car-state.service";

@Component({
  selector: 'car-car-model-edit',
  templateUrl: './car-model-edit.component.html',
  styleUrls: []
})
export class CarModelEditComponent implements OnInit {

  public brandCarId: string;
  public brandCar: BrandCarDto;
  public saving = false;

  public constructor(private readonly modelCarStateService: ModelCarStateService,
                     private readonly errorService: ErrorService,
                     private readonly confirmDialogService: ConfirmDialogService,
                     private readonly router: Router,
                     private readonly route: ActivatedRoute,
                     private readonly title: Title) { }

  public ngOnInit(): void {
    this.brandCarId = this.route.snapshot.params['id'];

    if (!this.brandCarId) {
      return this.errorService.addCustomError('Ошибка', 'Произошла ошибка, вернитесь на главную и попробуйте снова.');
    }

    this.modelCarStateService.findById<BrandCarDto>(this.brandCarId).subscribe((brandCar) => {
      this.brandCar = brandCar;
      this.title.setTitle(`${this.brandCar.name} - CMS`);
    });
  }

  public edit(body: BrandCarFormDto) {
    this.saving = true;

    this.modelCarStateService.update<BrandCarFormDto>(this.brandCarId, body).subscribe(() => {
      this.saving = false;
      this.errorService.addSuccessMessage("Марка изменена");
      this.router.navigate(['/car-models']).catch(console.error);
    }, () => this.saving = false);
  }

  public delete() {
    this.confirmDialogService.confirm({
      message: `Вы действительно хотите удалить марку "${this.brandCar.name}"?<br /><br />ВНИМАНИЕ! У товаров удалится марка и ее модели`,
      accept: () => {
        this.saving = true;

        this.modelCarStateService.deleteById(this.brandCar._id).subscribe(() => {
          this.saving = false;
          this.errorService.addSuccessMessage(`Успешно`, `Марка "${this.brandCar.name}" удалена`);
          this.router.navigate(['/car-models']).catch(console.error);
        });
      }
    });
  }


}
