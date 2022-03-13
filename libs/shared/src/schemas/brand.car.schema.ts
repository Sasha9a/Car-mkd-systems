import { ModelCar } from '@car-mkd-systems/shared/schemas/model.car.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class BrandCar extends Document {
  @Prop({ required: true })
  public brand: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "ModelCar", autopopulate: true })
  public models: ModelCar[];
}

export const BrandCarSchema = SchemaFactory.createForClass(BrandCar);
