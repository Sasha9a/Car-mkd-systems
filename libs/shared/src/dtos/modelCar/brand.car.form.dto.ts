import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class BrandCarFormDto {
  @Expose()
  @IsString({ message: "Введите значение" })
  public brand: string;
}
