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

}
