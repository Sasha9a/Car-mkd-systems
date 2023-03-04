import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DeepPartial } from '@car-mkd-systems/web/core/types/deep-partial';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected http = inject(HttpClient);
  protected baseUrl: string;

  public find<T>(options?: any): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl, {
      params: options ? this.objectToHttpParams(options) : {}
    });
  }

  public findById<T>(id: number): Observable<T> {
    return this.http.get<T>(this.baseUrl + '/' + id);
  }

  public create<T>(model: any): Observable<T> {
    return this.http.post<T>(this.baseUrl, model);
  }

  public update<T, K = void>(model: Partial<T>): Observable<K> {
    return this.http.put<K>(this.baseUrl + '/' + (model as any).id, model);
  }

  public patch<T extends { id?: number }>(model: DeepPartial<T>): Observable<void> {
    return this.http.patch<void>(this.baseUrl + '/' + model.id, model);
  }

  public deleteById<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.baseUrl + '/' + id);
  }

  public objectToHttpParams(params: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (Array.isArray(params[key]) && !params[key].length) {
        return;
      }
      httpParams = httpParams.append(key, params[key]);
    });

    return httpParams;
  }
}
