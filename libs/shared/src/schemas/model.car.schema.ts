import { BrandCar } from '@car-mkd-systems/shared/schemas/brand.car.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class ModelCar extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "BrandCar", autopopulate: true })
  public brand: BrandCar;

  @Prop({ required: true })
  public model: string;
}

export const ModelCarSchema = SchemaFactory.createForClass(ModelCar);
