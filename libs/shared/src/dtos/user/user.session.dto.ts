import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class UserSessionDto {

  @Expose()
  @IsString()
  public _id: string;

  @Expose()
  @IsString()
  public login: string;

  @Expose()
  @IsString()
  public token: string;

  @Expose()
  public roles: RoleEnum[];

}
