import { BaseDto } from '@car-mkd-systems/shared/dtos/base.dto';
import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';
import { ModificationDto } from '@car-mkd-systems/shared/dtos/product/modification.dto';
import { Expose, Type } from 'class-transformer';

@Expose()
export class ProductDto extends BaseDto {
  @Expose()
  public name: string;

  @Expose()
  public amount: number;

  @Expose()
  @Type(() => CategoryDto)
  public category: CategoryDto;

  @Expose()
  @Type(() => FileDto)
  public images: FileDto[];

  @Expose()
  public isPublic: boolean;

  @Expose()
  @Type(() => ModelCarDto)
  public modelsCar: ModelCarDto[];

  @Expose()
  @Type(() => ModificationDto)
  public modifications: ModificationDto[];
}
