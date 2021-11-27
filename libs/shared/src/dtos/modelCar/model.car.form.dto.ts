import { FirmCarDto } from '@car-mkd-systems/shared/dtos/modelCar/firm.car.dto';
import { Expose, Type } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

@Expose()
export class ModelCarFormDto {
  @Expose()
  @IsString({ message: "Введите значение" })
  public model: string;

  @Expose()
  @IsDefined({ message: "Не выбрана фирма" })
  @Type(() => FirmCarDto)
  public firm: FirmCarDto;
}
