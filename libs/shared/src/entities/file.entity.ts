import { BaseEntity } from "@car-mkd-systems/shared/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class FileEntity extends BaseEntity {
  @Column()
  public path: string;

  @Column({ nullable: true })
  public name: string;

  @Column({ nullable: true })
  public mime: string;

  @Column({ nullable: true })
  public size: number;
}
