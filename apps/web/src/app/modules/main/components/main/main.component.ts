import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CategoryDto } from "@car-mkd-systems/shared/dtos/category/category.dto";
import { BrandCarDto } from "@car-mkd-systems/shared/dtos/modelCar/brand.car.dto";
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
  styleUrls: []
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
    models: []
  };
  public selectedFilters = {
    categories: [],
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
                     private readonly route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      forkJoin(
        this.categoryStateService.find<CategoryDto>(),
        this.modelCarStateService.find<BrandCarDto>())
        .subscribe(([categories, brands]) => {
          this.filters = {
            categories: categories,
            models: brands
          };
          this.queryParams = this.queryParamsService.getFilteredQueryParams(this.queryParams);
          this.queryParamsService.setQueryParams(this.queryParams);
          this.selectedFilters = this.queryParamsService.getFilteredEntities(this.filters, this.queryParams);

          this.loadProducts();
        });
    });
  }

  public loadProducts() {
    this.loading = true;

    this.productStateService.findAll(this.queryParamsService.parseQueryParamsForApi(this.queryParams)).subscribe((products) => {
      this.products = products.items;
      this.countProducts = products.count;
      this.products.forEach((product) => {
        this.priceInfo[product._id] = {
          minPriceProduct: product.category?.isVaried ? Math.min(...product.modifications
                                              .map((modification) => {
                                                if (modification.discount) {
                                                  return modification.price < modification.discount ? modification.price : modification.discount;
                                                }
                                                return modification.price || NaN;
                                              })
                                              .filter((modification) => !isNaN(modification)))
            : (product.modifications[0]?.discount && product.modifications[0]?.price > product.modifications[0]?.discount
              ? product.modifications[0]?.discount : product.modifications[0]?.price),
          minPricePartnerProduct: product.category?.isVaried ? Math.min(...product.modifications
                                                     .map((modification) => {
                                                       if (modification.discountPartner) {
                                                         return modification.pricePartner < modification.discountPartner ? modification.pricePartner : modification.discountPartner;
                                                       }
                                                       return modification.pricePartner || NaN;
                                                     })
                                                     .filter((modification) => !isNaN(modification)))
            : (product.modifications[0]?.discountPartner && product.modifications[0]?.pricePartner > product.modifications[0]?.discountPartner
              ? product.modifications[0]?.discountPartner : product.modifications[0]?.pricePartner),
          isDiscountProduct: product.category?.isVaried ? !!product.modifications.find((modification) => modification.discount)
            : !!product.modifications[0]?.discount,
          isDiscountPartnerProduct: product.category?.isVaried ? !!product.modifications.find((modification) => modification.discountPartner)
            : !!product.modifications[0]?.discountPartner
        };
      });
      setTimeout(() => {
        this.paginatorStart?.changePage(this.queryParams.page.value);
        this.paginatorEnd?.changePage(this.queryParams.page.value);
      });
      this.loading = false;
    }, () => this.loading = false);
  }

  public clickSearch() {
    this.setQueryParam('categories', this.selectedFilters.categories);
    this.setQueryParam('models', this.selectedFilters.models);

    this.loadProducts();
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
    return this.authService.currentUser?.roles?.some((role) => [RoleEnum.ADMIN, RoleEnum.PARTNER].includes(role));
  }

}
