import { Injectable } from '@angular/core';
import { FirmCarDto } from '@car-mkd-systems/shared/dtos/modelCar/firm.car.dto';
import { FirmCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/firm.car.form.dto';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';
import { ModelCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.form.dto';
import { BaseService } from '@car-mkd-systems/web/core/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelCarService extends BaseService {

  protected baseUrl = '/car-model';

  public createFirm(body: FirmCarFormDto): Observable<FirmCarDto> {
    return this.http.post<FirmCarDto>(`${this.baseUrl}/firm`, body);
  }

  public createModel(body: ModelCarFormDto): Observable<ModelCarDto> {
    return this.http.post<ModelCarDto>(`${this.baseUrl}/model`, body);
  }

}
