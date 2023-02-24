import { BaseEntity } from "@car-mkd-systems/shared/entities/base.entity";
import { RoleEnum } from "@car-mkd-systems/shared/enums/role.enum";
import { Column, Entity } from "typeorm";

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  public login: string;

  @Column()
  public password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum
  })
  public roles: RoleEnum[];

  @Column({ nullable: true })
  public token: string;
}
