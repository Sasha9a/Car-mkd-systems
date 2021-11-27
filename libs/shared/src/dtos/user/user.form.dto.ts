import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class UserFormDto {
  @Expose()
  @IsString({ message: "Введите логин" })
  public login: string;

  @Expose()
  @IsString({ message: "Введите пароль" })
  public password: string;
}
