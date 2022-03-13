import { Category } from '@car-mkd-systems/shared/schemas/category.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Characteristic extends Document {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public order: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Category", autopopulate: true })
  public category: Category;
}

export const CharacteristicSchema = SchemaFactory.createForClass(Characteristic);
