import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { Expose, Type } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

@Expose()
export class CharacteristicFormDto {
  @Expose()
  @IsString({ message: "Введите значение" })
  public name: string;

  @Expose()
  @IsDefined({ message: "Введите значение" })
  public order: number;

  @Expose()
  @IsDefined({ message: "Не выбрана категория" })
  @Type(() => CategoryDto)
  public category: CategoryDto;
}
