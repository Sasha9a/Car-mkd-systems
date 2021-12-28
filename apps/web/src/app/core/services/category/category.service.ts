import { Injectable } from '@angular/core';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { CharacteristicDto } from '@car-mkd-systems/shared/dtos/category/characteristic.dto';
import { CharacteristicFormDto } from '@car-mkd-systems/shared/dtos/category/characteristic.form.dto';
import { BaseService } from '@car-mkd-systems/web/core/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
  protected override baseUrl = '/category';

  public findAllDropdown(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.baseUrl}/all`);
  }

  public createCharacteristic(body: CharacteristicFormDto): Observable<CharacteristicDto> {
    return this.http.post<CharacteristicDto>(`${this.baseUrl}/characteristic`, body);
  }

  public updateCharacteristic(id: string, body: CharacteristicFormDto): Observable<CharacteristicDto> {
    return this.http.put<CharacteristicDto>(`${this.baseUrl}/characteristic/object/${id}`, body);
  }

  public updateOrderCharacteristics(body: CharacteristicDto[]): Observable<null> {
    return this.http.put<null>(`${this.baseUrl}/characteristic/order`, body);
  }

  public deleteCharacteristic(id: string): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/characteristic/${id}`);
  }
}
