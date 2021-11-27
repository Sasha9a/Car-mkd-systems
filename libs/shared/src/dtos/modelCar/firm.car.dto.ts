import { BaseDto } from '@car-mkd-systems/shared/dtos/base.dto';
import { Expose, Type } from 'class-transformer';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';

@Expose()
export class FirmCarDto extends BaseDto {
  @Expose()
  public firm: string;

  @Expose()
  @Type(() => ModelCarDto)
  public models?: ModelCarDto[];
}
