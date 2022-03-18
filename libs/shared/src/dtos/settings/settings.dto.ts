import { BaseDto } from "@car-mkd-systems/shared/dtos/base.dto";
import { SettingsWatermarkDto } from "@car-mkd-systems/shared/dtos/settings/settings.watermark.dto";
import { Expose, Type } from "class-transformer";

@Expose()
export class SettingsDto extends BaseDto {

  @Expose()
  public headerText: string;

  @Expose()
  public footerText: string;

  @Expose()
  @Type(() => SettingsWatermarkDto)
  public watermark: Partial<SettingsWatermarkDto>;

}
