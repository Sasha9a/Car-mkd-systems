import { Injectable } from '@angular/core';
import { BrandCarDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.dto';
import { BrandCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.form.dto';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';
import { ModelCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.form.dto';
import { BaseService } from '@car-mkd-systems/web/core/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelCarService extends BaseService {

  protected baseUrl = '/car-model';

  public createBrand(body: BrandCarFormDto): Observable<BrandCarDto> {
    return this.http.post<BrandCarDto>(`${this.baseUrl}/brand`, body);
  }

  public createModel(body: ModelCarFormDto): Observable<ModelCarDto> {
    return this.http.post<ModelCarDto>(`${this.baseUrl}/model`, body);
  }

  public deleteBrand(id: string): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/brand/${id}`);
  }

}
