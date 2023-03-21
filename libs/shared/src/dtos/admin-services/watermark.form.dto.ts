import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { WatermarkTypeEnum } from '@car-mkd-systems/shared/enums/watermark.type.enum';
import { Expose, Type } from 'class-transformer';
import { IsDefined, IsOptional } from 'class-validator';

@Expose()
export class WatermarkFormDto {
  @Expose()
  @IsDefined({ message: 'Выберите тип водного знака' })
  public type: WatermarkTypeEnum;

  @Expose()
  @IsDefined({ message: 'Нужно залить хотя бы 1 фотографию' })
  public images: FileDto[];

  @Expose()
  @IsOptional()
  public nameArchive?: string;

  @Expose()
  @IsOptional()
  @Type(() => FileDto)
  public imageWatermark?: FileDto;

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
