import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class ModelCar extends Document {

  @Prop({ required: true })
  public name: string;
}

export const ModelCarSchema = SchemaFactory.createForClass(ModelCar);
