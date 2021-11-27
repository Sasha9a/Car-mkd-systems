import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class FirmCarFormDto {
  @Expose()
  @IsString({ message: "Введите значение" })
  public firm: string;
}
