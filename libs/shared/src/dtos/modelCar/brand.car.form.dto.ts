import { ModelCarFormDto } from "@car-mkd-systems/shared/dtos/modelCar/model.car.form.dto";
import { Expose, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

@Expose()
export class BrandCarFormDto {

  @Expose()
  @IsString({ message: "Введите название марки" })
  public name: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => ModelCarFormDto)
  public models?: ModelCarFormDto[];

}
