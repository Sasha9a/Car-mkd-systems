import { RoleEnum } from "@car-mkd-systems/shared/enums/role.enum";
import { Expose } from "class-transformer";
import { IsDefined, IsOptional, IsString } from "class-validator";

@Expose()
export class UserEditFormDto {

  @Expose()
  @IsString({ message: "Введите логин" })
  public login: string;

  @Expose()
  @IsOptional()
  public newPassword?: string;

  @Expose()
  @IsDefined({ message: "Выберите роль(и)" })
  public roles: RoleEnum[];

}
