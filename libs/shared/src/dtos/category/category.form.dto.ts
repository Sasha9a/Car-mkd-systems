import { CharacteristicFormDto } from "@car-mkd-systems/shared/dtos/category/characteristic.form.dto";
import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

@Expose()
export class CategoryFormDto {

  @Expose()
  @IsString({ message: "Введите значение" })
  public name: string;

  @Expose()
  @IsOptional()
  public parentId?: string;

  @Expose()
  @IsOptional()
  public isVaried?: boolean;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => CharacteristicFormDto)
  public characteristics?: CharacteristicFormDto[];

}
