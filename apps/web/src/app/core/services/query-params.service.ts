import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from "@car-mkd-systems/web/core/services/utils.service";

const paramsMap = {
  'categories': 'categories:string',
  'models': 'models:string'
};

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {

  public constructor(private readonly route: ActivatedRoute,
                     private readonly router: Router,
                     private readonly utilsService: UtilsService) { }

  public getFilteredQueryParams(currentParams: Record<string, { value: any, toApi: boolean }> = {}): any {
    const result: Record<string, { value: any, toApi: boolean }> = {};
    const queryParams = this.route.snapshot.queryParams;

    Object.keys(currentParams).forEach((key) => {

      const type = paramsMap[key] && paramsMap[key].includes(':') ? paramsMap[key].split(':')[1] : '';

      result[key] = {
        value: queryParams[key] || currentParams[key].value,
        toApi: currentParams[key].toApi
      };

      if (Array.isArray(currentParams[key].value) && !Array.isArray(result[key].value)) {
        result[key].value = [result[key].value];
      }

      if (type === 'number') {
        result[key].value = Array.isArray(result[key].value) ? result[key].value.map((value) => +value) : +result[key].value;
      } else if (type === 'boolean') {
        result[key].value = Array.isArray(result[key].value) ? result[key].value.map((value) => String(value) === 'true') : String(result[key]) === 'true';
      }
    });

    return result;
  }

  public parseQueryParamsForApi(queryParams: Record<string, { value: any, toApi: boolean }>) {
    const filteredParams = { ...queryParams };
    Object.keys(filteredParams).forEach((key) => {
      if ((Array.isArray(filteredParams[key].value) && !filteredParams[key].value.length) ||
        (!Array.isArray(filteredParams[key].value) && !filteredParams[key].value) ||
        !filteredParams[key].toApi) {
        delete filteredParams[key];
      }
    });

    const result = {};
    Object.keys(filteredParams).forEach((key) => {
      result[key] = filteredParams[key].value;
    });

    return result;
  }

  public setQueryParams(queryParams: Record<string, { value: any, toApi: boolean }>) {
    const filteredParams = { ...queryParams };
    Object.keys(filteredParams).forEach((key) => {
      if ((Array.isArray(filteredParams[key].value) && !filteredParams[key].value.length) ||
        (!Array.isArray(filteredParams[key].value) && !filteredParams[key].value)) {
        delete filteredParams[key];
      }
    });

    const result = {};
    Object.keys(filteredParams).forEach((key) => {
      result[key] = filteredParams[key].value;
    });

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: result,
        replaceUrl: true
      }).catch(console.error);
  }

  public getFilteredEntities(filters: any, queryParams: Record<string, { value: any, toApi: boolean }>): any {
    const result = {};

    Object.keys(paramsMap).forEach((key) => {
      const [fieldName, fieldKey] = paramsMap[key].split(':');

      if (!(fieldName in filters)) {
        return;
      }

      if (queryParams[key]) {
        if (key === 'categories') {
          result[fieldName] = queryParams[key].value && fieldKey
            ? this.utilsService.flattenCategory(filters[fieldName]).filter((option) => queryParams[key].value.map((param) => String(param)).includes(String(option['_id'])))
            : (queryParams[key].value || []);
        } else if (key === 'models') {
          result[fieldName] = queryParams[key].value && fieldKey
            ? this.utilsService.flattenModels(filters[fieldName]).filter((option) => queryParams[key].value.map((param) => String(param)).includes(String(option['_id'])))
            : (queryParams[key].value || []);
        } else if (Array.isArray(queryParams[key].value)) {
          result[fieldName] = queryParams[key].value && fieldKey
            ? filters[fieldName].filter((option) => queryParams[key].value.map((param) => String(param)).includes(String(option['_id'])))
            : (queryParams[key].value || []);
        } else {
          const select = filters[fieldName]?.filter((option) => queryParams[key].value === String(option['_id']));
          result[fieldName] = queryParams[key].value && fieldKey
            ? (select[0] ? select[0] : null)
            : (queryParams[key].value || null);
        }
      }
    });

    return result;
  }

  public setQueryParam(queryParams: Record<string, { value: any, toApi: boolean }>, key: string, value: any) {
    if (queryParams[key]) {
      queryParams[key].value = value;
      this.setQueryParams(queryParams);
    }
  }

}
