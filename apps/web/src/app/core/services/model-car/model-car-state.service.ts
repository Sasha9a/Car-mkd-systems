import { Injectable } from '@angular/core';
import { BrandCarDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.dto';
import { BrandCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.form.dto';
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

  public findAllBrand(): Observable<BrandCarDto[]> {
    return this.modelCarService.findAllBrand();
  }

  public findAllModel(): Observable<ModelCarDto[]> {
    return this.modelCarService.findAllModel();
  }

  public createBrand(body: BrandCarFormDto): Observable<BrandCarDto> {
    return this.modelCarService.createBrand(body);
  }

  public createModel(body: ModelCarFormDto): Observable<ModelCarDto> {
    return this.modelCarService.createModel(body);
  }

  public updateBrand(id: string, body: BrandCarFormDto): Observable<BrandCarDto> {
    return this.modelCarService.updateBrand(id, body);
  }

  public updateModel(id: string, body: ModelCarFormDto): Observable<ModelCarDto> {
    return this.modelCarService.updateModel(id, body);
  }

  public deleteBrand(id: string): Observable<null> {
    return this.modelCarService.deleteBrand(id);
  }

  public deleteModel(id: string): Observable<null> {
    return this.modelCarService.deleteModel(id);
  }
}
