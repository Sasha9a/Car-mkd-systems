import { ProductDto } from '@car-mkd-systems/shared/dtos/product/product.dto';
import { Expose, Type } from 'class-transformer';

@Expose()
export class ProductItemDto {
  @Expose()
  @Type(() => ProductDto)
  public items: ProductDto[];

  @Expose()
  public count: number;
}
