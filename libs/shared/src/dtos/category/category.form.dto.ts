import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class CategoryFormDto {
  @Expose()
  @IsString({ message: "Введите значение" })
  public name: string;
}
