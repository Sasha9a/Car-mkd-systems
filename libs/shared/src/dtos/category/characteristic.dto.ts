import { BaseDto } from '@car-mkd-systems/shared/dtos/base.dto';
import { Expose } from 'class-transformer';

@Expose()
export class CharacteristicDto extends BaseDto {

  @Expose()
  public name: string;

  @Expose()
  public order: number;

}
