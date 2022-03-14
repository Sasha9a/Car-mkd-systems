import { Expose } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';

@Expose()
export class CharacteristicFormDto {

  @Expose()
  @IsString({ message: "Введите название характеристики" })
  public name: string;

  @Expose()
  @IsDefined({ message: "Введите очередность характеристики" })
  public order: number;

}
