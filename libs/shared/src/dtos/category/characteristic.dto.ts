import { BaseDto } from '@car-mkd-systems/shared/dtos/base.dto';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { Expose, Type } from 'class-transformer';

@Expose()
export class CharacteristicDto extends BaseDto {
  @Expose()
  public name: string;

  @Expose()
  public order: number;

  @Expose()
  @Type(() => CategoryDto)
  public category: CategoryDto;
}
