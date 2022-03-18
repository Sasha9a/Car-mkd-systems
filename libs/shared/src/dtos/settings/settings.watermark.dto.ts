import { FileDto } from "@car-mkd-systems/shared/dtos/file.dto";
import { WatermarkTypeEnum } from "@car-mkd-systems/shared/enums/watermark.type.enum";
import { Expose, Type } from "class-transformer";

@Expose()
export class SettingsWatermarkDto {

  @Expose()
  public enableWatermark: boolean;

  @Expose()
  public type: WatermarkTypeEnum;

  @Expose()
  @Type(() => FileDto)
  public image: FileDto;

  @Expose()
  public text: string;

  @Expose()
  @Type(() => FileDto)
  public font: FileDto[];

  @Expose()
  public scale: number;

  @Expose()
  public opacitySource: number;

  @Expose()
  public opacityDest: number;

}
