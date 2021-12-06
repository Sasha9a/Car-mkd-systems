import { ParamModificationDto } from '@car-mkd-systems/shared/dtos/product/param.modification.dto';
import { Expose, Type } from 'class-transformer';

@Expose()
export class ModificationDto {
  @Expose()
  public name: string;

  @Expose()
  public price: number;

  @Expose()
  public discount: number;

  @Expose()
  public pricePartner: number;

  @Expose()
  public discountPartner: number;

  @Expose()
  @Type(() => ParamModificationDto)
  public params: ParamModificationDto[];
}
