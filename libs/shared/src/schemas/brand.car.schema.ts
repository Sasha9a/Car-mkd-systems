import { ModelCar, ModelCarSchema } from '@car-mkd-systems/shared/schemas/model.car.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class BrandCar extends Document {
  @Prop({ required: true })
  public name: string;

  @Prop({ type: [ModelCarSchema], autopopulate: true })
  public models: ModelCar[];
}

export const BrandCarSchema = SchemaFactory.createForClass(BrandCar);
