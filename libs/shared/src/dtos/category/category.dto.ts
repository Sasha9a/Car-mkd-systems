import { BaseDto } from '@car-mkd-systems/shared/dtos/base.dto';
import { CharacteristicDto } from '@car-mkd-systems/shared/dtos/category/characteristic.dto';
import { Expose, Type } from 'class-transformer';

@Expose()
export class CategoryDto extends BaseDto {
  @Expose()
  public name: string;

  @Expose()
  @Type(() => CharacteristicDto)
  public characteristics?: CharacteristicDto[];
}
