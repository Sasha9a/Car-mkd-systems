import { Injectable } from '@angular/core';
import { BaseStateService } from '@car-mkd-systems/web/core/services/base-state.service';
import { ModelCarService } from '@car-mkd-systems/web/core/services/model-car/model-car.service';

@Injectable({
  providedIn: 'root'
})
export class ModelCarStateService extends BaseStateService {

  public constructor(private readonly modelCarService: ModelCarService) {
    super();
    this.baseService = modelCarService;
  }

}
