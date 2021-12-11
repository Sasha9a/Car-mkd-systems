import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDto } from '@car-mkd-systems/shared/dtos/product/product.dto';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { ProductStateService } from '@car-mkd-systems/web/core/services/product/product-state.service';

@Component({
  selector: 'car-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  public cardId: string;

  public product: ProductDto;

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

  public constructor(private readonly productStateService: ProductStateService,
                     private readonly errorService: ErrorService,
                     private readonly route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.cardId = this.route.snapshot.params.id;

    if (!this.cardId) {
      return this.errorService.addCustomError('Ошибка', 'Произошла ошибка, вернитесь на главную и попробуйте снова.');
    }

    this.productStateService.findById<ProductDto>(this.cardId).subscribe((product) => {
      this.product = product;
    });
  }

}
