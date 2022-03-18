import { FileDto } from "@car-mkd-systems/shared/dtos/file.dto";
import { Expose, Type } from "class-transformer";

@Expose()
export class SettingsWatermarkDto {

  @Expose()
  public type: 'TEXT' | 'IMAGE';

  @Expose()
  @Type(() => FileDto)
  public image: FileDto;

  @Expose()
  public text: string;

  @Expose()
  @Type(() => FileDto)
  public font: FileDto[];

  @Expose()
  public scaleImage: number;

  @Expose()
  public scaleText: number;

  @Expose()
  public opacitySource: number;

  @Expose()
  public opacityDest: number;

}
