import { PaginationDto } from '@car-mkd-systems/shared/dtos/pagination.dto';
import { Expose } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

@Expose()
export class ProductQueryDto extends PaginationDto {

  @Expose()
  @IsArray()
  @IsOptional()
  public categories?: string[];

  @Expose()
  @IsArray()
  @IsOptional()
  public brands?: string[];

  @Expose()
  @IsArray()
  @IsOptional()
  public models?: string[];
}
