import { Injectable } from '@angular/core';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { CharacteristicDto } from '@car-mkd-systems/shared/dtos/category/characteristic.dto';
import { CharacteristicFormDto } from '@car-mkd-systems/shared/dtos/category/characteristic.form.dto';
import { BaseStateService } from '@car-mkd-systems/web/core/services/base-state.service';
import { CategoryService } from '@car-mkd-systems/web/core/services/category/category.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryStateService extends BaseStateService {

  public constructor(private readonly categoryService: CategoryService) {
    super();
    this.baseService = categoryService;
  }

  public findAllDropdown(): Observable<CategoryDto[]> {
    return this.categoryService.findAllDropdown();
  }

  public createCharacteristic(body: CharacteristicFormDto): Observable<CharacteristicDto> {
    return this.categoryService.createCharacteristic(body);
  }

  public updateCharacteristic(id: string, body: CharacteristicFormDto): Observable<CharacteristicDto> {
    return this.categoryService.updateCharacteristic(id, body);
  }

  public updateOrderCharacteristics(body: CharacteristicDto[]): Observable<null> {
    return this.categoryService.updateOrderCharacteristics(body);
  }

  public deleteCharacteristic(id: string): Observable<null> {
    return this.categoryService.deleteCharacteristic(id);
  }
}
