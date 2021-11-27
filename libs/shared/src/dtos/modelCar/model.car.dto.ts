import { BaseDto } from '@car-mkd-systems/shared/dtos/base.dto';
import { FirmCarDto } from '@car-mkd-systems/shared/dtos/modelCar/firm.car.dto';
import { Expose, Type } from 'class-transformer';

@Expose()
export class ModelCarDto extends BaseDto {
  @Expose()
  @Type(() => FirmCarDto)
  public firm: FirmCarDto;

  @Expose()
  public model: string;
}
