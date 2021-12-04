import { CharacteristicDto } from '@car-mkd-systems/shared/dtos/category/characteristic.dto';
import { Expose, Type } from 'class-transformer';

@Expose()
export class ParamModificationDto {
  @Expose()
  @Type(() => CharacteristicDto)
  public characteristic: CharacteristicDto;

  @Expose()
  public value: string;
}
