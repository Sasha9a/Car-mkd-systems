import { ModelCar } from '@car-mkd-systems/shared/schemas/model.car.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class FirmCar extends Document {
  @Prop({ required: true })
  public firm: string;

  @Prop({ type: [{type: [mongoose.Schema.Types.ObjectId], ref: "ModelCar"}]})
  public models: ModelCar[];
}

export const FirmCarSchema = SchemaFactory.createForClass(FirmCar);
