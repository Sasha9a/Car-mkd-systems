import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';
import { ModificationDto } from '@car-mkd-systems/shared/dtos/product/modification.dto';
import { Expose, Type } from 'class-transformer';
import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator';

@Expose()
export class ProductFormDto {
  @Expose()
  @IsString({ message: "Введите значение" })
  public name: string;

  @Expose()
  @IsInt({ message: "Введите значение" })
  public amount: number;

  @Expose()
  @IsDefined({ message: "Не выбрана категория" })
  @Type(() => CategoryDto)
  public category: CategoryDto;

  @Expose()
  @IsOptional()
  @Type(() => FileDto)
  public images?: FileDto[] = [];

  @Expose()
  @IsOptional()
  public isPublic?: boolean;

  @Expose()
  @IsOptional()
  @Type(() => ModelCarDto)
  public modelCars?: ModelCarDto[] = [];

  @Expose()
  @IsOptional()
  @Type(() => ModificationDto)
  public modifications?: ModificationDto[] = [];
}
