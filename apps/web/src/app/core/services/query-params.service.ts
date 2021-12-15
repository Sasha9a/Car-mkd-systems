import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {

  public constructor(private readonly route: ActivatedRoute,
                     private readonly router: Router) { }

  public setQueryParams(queryParams: Record<string, any>) {
    const filteredParams = { ...queryParams };

    delete filteredParams.limit;
    delete filteredParams.offset;
    delete filteredParams.sort;
    delete filteredParams.search;

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: filteredParams,
        replaceUrl: true
      }).catch(console.error);
  }

}
