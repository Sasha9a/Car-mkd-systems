import { RoleEnum } from "@car-mkd-systems/shared/enums/role.enum";
import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

@Expose()
export class UserCreateFormDto {

  @Expose()
  @IsString({ message: "Введите логин" })
  public login: string;

  @Expose()
  @IsString({ message: "Введите пароль" })
  public password: string;

  @Expose()
  @IsDefined({ message: "Выберите роль(и)" })
  public roles: RoleEnum[];

}
