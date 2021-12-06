import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class User extends Document {
  @Prop({ required: true })
  public login: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ required: true })
  public roles: RoleEnum[];
}

export const UserSchema = SchemaFactory.createForClass(User);
