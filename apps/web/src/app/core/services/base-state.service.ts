import { Injectable } from '@angular/core';
import { BaseModel } from '@car-mkd-systems/web/core/models/base.model';
import { StateServiceRequestOptions } from '@car-mkd-systems/web/core/models/state-service-request-options.model';
import { BaseService } from '@car-mkd-systems/web/core/services/base.service';
import { Observable, of, tap } from 'rxjs';

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
    return this.baseService.create<K>(model).pipe(
      tap((entity) => this.cachedEntities[entity._id] = entity)
    );
  }

  public findById<T extends BaseModel>(id: number, options: StateServiceRequestOptions = { withCache: true }): Observable<T> {
    if (this.cachedEntities[id] && options.withCache) {
      const cachedEntity = this.cachedEntities[id];
      delete this.cachedEntities[id];
      return of(cachedEntity);
    }
    return this.baseService.findById<T>(id).pipe(
      tap((entity) => this.cachedEntities[entity._id] = entity)
    );
  }

  public update<T>(id, model: T): Observable<T> {
    return this.baseService.update<T>(id, model);
  }

  public deleteById(id: string): Observable<null> {
    return this.baseService.deleteById(id);
  }

}
