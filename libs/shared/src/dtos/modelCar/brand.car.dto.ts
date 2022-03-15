import { BaseDto } from '@car-mkd-systems/shared/dtos/base.dto';
import { Expose, Type } from 'class-transformer';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';

@Expose()
export class BrandCarDto extends BaseDto {
  @Expose()
  public name: string;

  @Expose()
  @Type(() => ModelCarDto)
  public models?: ModelCarDto[];
}
