import { BaseDto } from '@car-mkd-systems/shared/dtos/base.dto';
import { Expose } from 'class-transformer';

@Expose()
export class UserDto extends BaseDto {
  @Expose()
  public login: string;

  @Expose()
  public password: string;
}
