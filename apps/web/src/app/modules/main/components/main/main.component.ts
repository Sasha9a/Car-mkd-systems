import { Component, OnInit, ViewChild, ViewRef } from '@angular/core';
import { ProductDto } from '@car-mkd-systems/shared/dtos/product/product.dto';
import { ProductQueryDto } from '@car-mkd-systems/shared/dtos/product/product.query.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { CategoryStateService } from '@car-mkd-systems/web/core/services/category/category-state.service';
import { ModelCarStateService } from '@car-mkd-systems/web/core/services/model-car/model-car-state.service';
import { ProductStateService } from '@car-mkd-systems/web/core/services/product/product-state.service';
import { QueryParamsService } from '@car-mkd-systems/web/core/services/query-params.service';
import { AuthService } from '@car-mkd-systems/web/core/services/user/auth.service';
import { Paginator } from 'primeng/paginator';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'car-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('paginatorStart', { static: false }) public paginatorStart: Paginator;
  @ViewChild('paginatorEnd', { static: false }) public paginatorEnd: Paginator;

  public loading = true;
  public countProducts = 0;
  public queryParams: Record<keyof ProductQueryDto | string, { value: any, toApi: boolean }> = {
    categories: {
      value: [],
      toApi: true
    },
    brands: {
      value: [],
      toApi: true
    },
    models: {
      value: [],
      toApi: true
    },
    limit: {
      value: 4,
      toApi: true
    },
    offset: {
      value: 0,
      toApi: true
    },
    page: {
      value: 0,
      toApi: false
    }
  };

  public products: ProductDto[];

  public filters = {
    categories: [],
    brands: [],
    models: [],
  };
  public selectedFilters = {
    categories: [],
    brands: [],
    models: []
  };

  public priceInfo: Record<string, {
    minPriceProduct: number,
    minPricePartnerProduct: number,
    isDiscountProduct: boolean,
    isDiscountPartnerProduct: boolean
  }> = {};

  public constructor(private readonly modelCarStateService: ModelCarStateService,
                     private readonly categoryStateService: CategoryStateService,
                     private readonly productStateService: ProductStateService,
                     public readonly queryParamsService: QueryParamsService,
                     private readonly authService: AuthService,
                     private readonly appRef: ViewRef) {
  }

  public ngOnInit(): void {
    forkJoin(
      this.categoryStateService.findAllDropdown(),
      this.modelCarStateService.findAllBrand(),
      this.modelCarStateService.findAllModel())
      .subscribe(([categories, brands, models]) => {
        this.filters = {
          categories: categories,
          brands: brands,
          models: models
        };
        this.queryParams = this.queryParamsService.getFilteredQueryParams(this.queryParams);
        this.queryParamsService.setQueryParams(this.queryParams);
        this.selectedFilters = this.queryParamsService.getFilteredEntities(this.filters, this.queryParams);

        this.loadProducts();
      });
  }

  public loadProducts() {
    this.loading = true;

    this.setQueryParam('categories', this.selectedFilters.categories);
    this.setQueryParam('brands', this.selectedFilters.brands);
    this.setQueryParam('models', this.selectedFilters.models);

    this.productStateService.findAll(this.queryParamsService.parseQueryParamsForApi(this.queryParams)).subscribe((products) => {
      this.products = products.items;
      this.countProducts = products.count;
      this.products.forEach((product) => {
        this.priceInfo[product._id] = {
          minPriceProduct: Math.min(...product.modifications
                                              .map((modification) => modification.price)
                                              .filter((modification) => !isNaN(modification))),
          minPricePartnerProduct: Math.min(...product.modifications
                                                     .map((modification) => modification.pricePartner)
                                                     .filter((modification) => !isNaN(modification))),
          isDiscountProduct: !!product.modifications.find((modification) => modification.discount),
          isDiscountPartnerProduct: !!product.modifications.find((modification) => modification.discountPartner)
        };
      });
      setTimeout(() => {
        this.paginatorStart?.changePage(this.queryParams.page.value);
        this.paginatorEnd?.changePage(this.queryParams.page.value);
      });
      this.loading = false;
    }, () => this.loading = false);
  }

  public setQueryParam(key: string, value: any[]) {
    this.queryParamsService.setQueryParam(this.queryParams, key, value.map((val) => val._id));
  }

  public paginate(event: { first: number, rows: string, page: number, pageCount: number }) {
    if (this.queryParams.page.value !== Number(event.page)) {
      this.queryParamsService.setQueryParam(this.queryParams, 'page', Number(event.page));
      this.queryParamsService.setQueryParam(this.queryParams, 'offset', Number(event.page) * this.queryParams.limit.value);
      this.loadProducts();
    }
    if (this.paginatorStart.getPage() !== Number(event.page)) {
      setTimeout(() => this.paginatorStart.changePage(Number(event.page)));
    }
    if (this.paginatorEnd.getPage() !== Number(event.page)) {
      setTimeout(() => this.paginatorEnd.changePage(Number(event.page)));
    }
  }

  public isPartner(): boolean {
    return this.authService.currentUser?.roles.some((role) => [RoleEnum.ADMIN, RoleEnum.PARTNER].includes(role));
  }

  public reload() {
    this.appRef.reattach();
  }

}
