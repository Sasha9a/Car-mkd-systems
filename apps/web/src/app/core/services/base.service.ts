import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Базовый сервис
 * Определяет стандартные методы API
 * @class BaseService
 */

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  /**
   * Базовый url сервиса
   */

  protected baseUrl: string;

  /**
   * @param {HttpClient} http
   */

  public constructor(protected http: HttpClient) { }

  /**
   * Параметры запроса
   * @options {}
   * Получение массива объектов
   * @returns {Observable<T[]>}
   */
  public find<T>(options?: any): Observable<T[]> {
    return this.http.get<T[]>(
      this.baseUrl,
      {
        params: this.getParams(options)
      });
  }

  /**
   * Получение объекта по идентификатору
   * @param {number} id
   * @returns {Observable<T>}
   */
  public findById<T>(id: number): Observable<T> {
    return this.http.get<T>(this.baseUrl + '/' + id);
  }

  /**
   * Создание объекта
   * @param {BaseEntity} model
   * @returns {Observable<T>}
   */
  public create<T>(model: any): Observable<T> {
    return this.http.post<T>(this.baseUrl, model);
  }

  /**
   * Изменение объекта
   * @param {BaseEntity} model
   * @returns {Observable<T>}
   */
  public update<T>(model): Observable<T> {
    return this.http.put<T>(this.baseUrl + '/' + model.id, model);
  }

  /**
   * Удаление объекта
   * @returns {Observable<T>}
   * @param id
   */
  public deleteById<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.baseUrl + '/' + id);
  }

  protected getParams(options) {
    const params = {};
    if (options) {
      Object.entries(options).map((o) => {
        params[o[0]] = o[1];
      });
    }
    return params;
  }

}
