import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

@Expose()
export class HelpFormDto {

  @Expose()
  @IsString({ message: "Введите название" })
  public title: string;

  @Expose()
  @IsString({ message: "Введите текст" })
  public text: string;

  @Expose()
  @IsDefined({ message: "Введите очередность" })
  public order: number;

}
