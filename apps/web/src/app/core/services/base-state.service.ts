import { Injectable } from '@angular/core';
import { BaseModel } from '@car-mkd-systems/web/core/models/base.model';
import { BaseService } from '@car-mkd-systems/web/core/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseStateService {

  protected baseService: BaseService;
  protected cachedEntities = <Record<number, any>>{};

  public find<T>(options?: any): Observable<T[]> {
    return this.baseService.find<T>(options);
  }

  public create<T, K extends BaseModel>(model: T): Observable<K> {
    return this.baseService.create<K>(model);
  }

  public findById<T extends BaseModel>(id: string): Observable<T> {
    return this.baseService.findById<T>(id);
  }

  public update<T>(id, model: T): Observable<T> {
    return this.baseService.update<T>(id, model);
  }

  public deleteById(id: string): Observable<null> {
    return this.baseService.deleteById(id);
  }

}
