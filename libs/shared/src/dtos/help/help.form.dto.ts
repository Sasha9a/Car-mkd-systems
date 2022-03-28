import { Expose } from "class-transformer";
import { IsString } from "class-validator";

@Expose()
export class HelpFormDto {

  @Expose()
  @IsString({ message: "Введите название" })
  public title: string;

  @Expose()
  @IsString({ message: "Введите текст" })
  public text: string;

}
