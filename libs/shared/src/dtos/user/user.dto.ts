import { BaseDto } from '@car-mkd-systems/shared/dtos/base.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Expose } from 'class-transformer';

@Expose()
export class UserDto extends BaseDto {
  @Expose()
  public login: string;

  @Expose()
  public password: string;

  @Expose()
  public roles: RoleEnum[];

  @Expose()
  public token: string;
}
