import { BaseDto } from "@car-mkd-systems/shared/dtos/base.dto";
import { Expose } from "class-transformer";

@Expose()
export class HelpDto extends BaseDto {

  @Expose()
  public title: string;

  @Expose()
  public text: string;

}
