import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Characteristic extends Document {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public order: number;
}

export const CharacteristicSchema = SchemaFactory.createForClass(Characteristic);
