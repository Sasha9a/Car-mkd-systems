import { BaseDto } from '@car-mkd-systems/shared/dtos/base.dto';
import { BrandCarDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.dto';
import { Expose, Type } from 'class-transformer';

@Expose()
export class ModelCarDto extends BaseDto {
  @Expose()
  @Type(() => BrandCarDto)
  public brand: BrandCarDto;

  @Expose()
  public model: string;
}
