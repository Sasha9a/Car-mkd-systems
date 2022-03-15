import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class ModelCarFormDto {

  @Expose()
  @IsString({ message: "Введите название модели" })
  public name: string;

}
