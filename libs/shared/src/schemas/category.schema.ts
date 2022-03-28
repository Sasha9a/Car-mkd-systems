import { Characteristic, CharacteristicSchema } from '@car-mkd-systems/shared/schemas/characteristic.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Category extends Document {

  @Prop({ required: true })
  public name: string;

  @Prop()
  public parentId: string;

  @Prop()
  public isVaried: boolean;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "Category", autopopulate: true })
  public children: Category[];

  @Prop({ type: [CharacteristicSchema], autopopulate: true })
  public characteristics: Characteristic[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
