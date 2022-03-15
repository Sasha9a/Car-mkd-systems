import { Injectable } from '@angular/core';

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

}
