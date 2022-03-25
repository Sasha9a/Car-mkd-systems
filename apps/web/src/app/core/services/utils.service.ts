import { Injectable } from '@angular/core';
import { BrandCarDto } from "@car-mkd-systems/shared/dtos/modelCar/brand.car.dto";
import { ModelCarDto } from "@car-mkd-systems/shared/dtos/modelCar/model.car.dto";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public flattenCategory<T>(categories: T[]) {
    return categories.reduce<T[]>((_categories, _category) => {
      _category = Object.assign({}, _category);
      _categories = _categories.concat(_category);
      if (_category['children']) {
        _categories = _categories.concat(this.flattenCategory(_category['children']));
        _category['children'] = [];
      }
      return _categories;
    }, []);
  }

  public flattenModels(brands: BrandCarDto[]) {
    return brands.reduce<ModelCarDto[]>((_models, _brand) => {
      _brand = Object.assign({}, _brand);
      _models = _models.concat(_brand);
      if (_brand.models) {
        _models = _models.concat(..._brand.models);
      }
      return _models;
    }, []);
  }

}
