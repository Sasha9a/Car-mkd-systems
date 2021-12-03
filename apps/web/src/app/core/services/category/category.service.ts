import { Injectable } from '@angular/core';
import { CharacteristicDto } from '@car-mkd-systems/shared/dtos/category/characteristic.dto';
import { CharacteristicFormDto } from '@car-mkd-systems/shared/dtos/category/characteristic.form.dto';
import { BaseService } from '@car-mkd-systems/web/core/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
  protected baseUrl = '/category';

  public createCharacteristic(body: CharacteristicFormDto): Observable<CharacteristicDto> {
    return this.http.post<CharacteristicDto>(`${this.baseUrl}/characteristic`, body);
  }

  public updateCharacteristic(id: string, body: CharacteristicFormDto): Observable<CharacteristicDto> {
    return this.http.put<CharacteristicDto>(`${this.baseUrl}/characteristic/${id}`, body);
  }

  public deleteCharacteristic(id: string): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/characteristic/${id}`);
  }
}
