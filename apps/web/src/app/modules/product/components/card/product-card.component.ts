import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { CharacteristicDto } from '@car-mkd-systems/shared/dtos/category/characteristic.dto';
import { ModificationDto } from '@car-mkd-systems/shared/dtos/product/modification.dto';
import { ProductDto } from '@car-mkd-systems/shared/dtos/product/product.dto';
import { ProductFormDto } from '@car-mkd-systems/shared/dtos/product/product.form.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { CategoryStateService } from '@car-mkd-systems/web/core/services/category/category-state.service';
import { ConfirmDialogService } from '@car-mkd-systems/web/core/services/confirm-dialog.service';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { ProductStateService } from '@car-mkd-systems/web/core/services/product/product-state.service';
import { AuthService } from '@car-mkd-systems/web/core/services/user/auth.service';

@Component({
  selector: 'car-card',
  templateUrl: './product-card.component.html',
  styleUrls: []
})
export class ProductCardComponent implements OnInit {

  public cardId: string;
  public loading = false;

  public product: ProductDto;
  public category: CategoryDto;

  public responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  public activeModification: ModificationDto;

  public brandsProduct: string[];

  public get RoleEnum() {
    return RoleEnum;
  }

  public constructor(private readonly productStateService: ProductStateService,
                     private readonly categoryStateService: CategoryStateService,
                     private readonly errorService: ErrorService,
                     private readonly route: ActivatedRoute,
                     private readonly router: Router,
                     public readonly authService: AuthService,
                     private readonly confirmDialogService: ConfirmDialogService,
                     private readonly title: Title) { }

  public ngOnInit(): void {
    this.cardId = this.route.snapshot.params['id'];

    if (!this.cardId) {
      return this.errorService.addCustomError('Ошибка', 'Произошла ошибка, вернитесь на главную и попробуйте снова.');
    }

    this.productStateService.findById<ProductDto>(this.cardId).subscribe((product) => {
      this.product = product;
      if (this.product.modifications.length) {
        this.activeModification = this.product.modifications[0];
      }
      if (this.product.modelsCar?.length) {
        this.brandsProduct = this.product.modelsCar.map((model) => model.brand.brand)
                                 .filter((brand, index, self) => self.indexOf(brand) === index)
                                 .sort();
      }

      if (this.product.category) {
        this.categoryStateService.findById<CategoryDto>(this.product.category._id).subscribe((category) => {
          this.category = category;
        });
      }

      this.title.setTitle(`${this.product.name} - CMS`);
    });
  }

  public publicProduct() {
    if (this.product.category) {
      this.confirmDialogService.confirm({
        message: `Вы действительно хотите опубликовать товар "${this.product.name}"?`,
        accept: () => {
          this.loading = true;

          const product: ProductFormDto = { ...this.product };
          product.isPublic = true;
          this.productStateService.update<ProductFormDto>(this.product._id, product).subscribe(() => {
            this.product.isPublic = true;
            this.loading = false;
            this.errorService.addSuccessMessage(`Товар ${this.product.name} опубликован`);
          });
        }
      });
    } else {
      this.errorService.addCustomError('Ошибка', 'Добавьте категорию к товару');
    }
  }

  public deleteProduct() {
    this.confirmDialogService.confirm({
      message: `Вы действительно хотите удалить товар "${this.product.name}"?`,
      accept: () => {
        this.loading = true;

        this.productStateService.deleteById(this.product._id).subscribe(() => {
          this.loading = false;
          this.errorService.addSuccessMessage(`Товар ${this.product.name} удален`);
          this.router.navigate(['/']).catch(console.error);
        });
      }
    });
  }

  public isPartner(): boolean {
    return this.authService.currentUser?.roles.some((role) => [RoleEnum.ADMIN, RoleEnum.PARTNER].includes(role));
  }

  public toCharacteristic(characteristic: any): CharacteristicDto {
    return characteristic as CharacteristicDto;
  }

}
