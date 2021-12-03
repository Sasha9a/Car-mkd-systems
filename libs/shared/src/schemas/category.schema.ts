import { Characteristic } from '@car-mkd-systems/shared/schemas/characteristic.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Category extends Document {
  @Prop({ required: true })
  public name: string;

  @Prop({ type: [{type: [mongoose.Schema.Types.ObjectId], ref: "Characteristic"}] })
  public characteristics: Characteristic[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
