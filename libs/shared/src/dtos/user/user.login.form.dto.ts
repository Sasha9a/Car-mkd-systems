import { Expose } from 'class-transformer';
import { IsString, Length } from 'class-validator';

@Expose()
export class UserLoginFormDto {
  @Expose()
  @IsString({ message: "Введите логин" })
  @Length(4, 32, { message: 'Логин должен быть от 4 до 32 символов' })
  public login: string;

  @Expose()
  @IsString({ message: "Введите пароль" })
  @Length(6, 32, { message: 'Пароль должен быть от 6 до 32 символов' })
  public password: string;
}
