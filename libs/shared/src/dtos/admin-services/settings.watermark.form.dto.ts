import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { WatermarkTypeEnum } from '@car-mkd-systems/shared/enums/watermark.type.enum';
import { Expose, Type } from 'class-transformer';
import { IsDefined, IsOptional } from 'class-validator';

@Expose()
export class SettingsWatermarkFormDto {
  @Expose()
  @IsDefined({ message: 'Выберите тип водного знака' })
  public type: WatermarkTypeEnum;

  @Expose()
  @IsOptional()
  @Type(() => FileDto)
  public image?: FileDto;

  @Expose()
  @IsOptional()
  public text?: string;

  @Expose()
  @IsOptional()
  public backgroundColor?: string;

  @Expose()
  @IsOptional()
  @Type(() => FileDto)
  public font?: FileDto[];

  @Expose()
  @IsOptional()
  public scale?: number;

  @Expose()
  @IsOptional()
  public opacitySource?: number;

  @Expose()
  @IsOptional()
  public opacityDest?: number;
}
