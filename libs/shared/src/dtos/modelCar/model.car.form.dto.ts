import { BrandCarDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.dto';
import { Expose, Type } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

@Expose()
export class ModelCarFormDto {
  @Expose()
  @IsString({ message: "Введите значение" })
  public model: string;

  @Expose()
  @IsDefined({ message: "Не выбран бренд" })
  @Type(() => BrandCarDto)
  public brand: BrandCarDto;
}
