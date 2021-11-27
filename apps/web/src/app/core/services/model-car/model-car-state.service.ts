import { Injectable } from '@angular/core';
import { FirmCarDto } from '@car-mkd-systems/shared/dtos/modelCar/firm.car.dto';
import { FirmCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/firm.car.form.dto';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';
import { ModelCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.form.dto';
import { BaseStateService } from '@car-mkd-systems/web/core/services/base-state.service';
import { ModelCarService } from '@car-mkd-systems/web/core/services/model-car/model-car.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelCarStateService extends BaseStateService {

  public constructor(private readonly modelCarService: ModelCarService) {
    super();
    this.baseService = modelCarService;
  }

  public createFirm(body: FirmCarFormDto): Observable<FirmCarDto> {
    return this.modelCarService.createFirm(body);
  }

  public createModel(body: ModelCarFormDto): Observable<ModelCarDto> {
    return this.modelCarService.createModel(body);
  }
}
