import { ModificationDto } from '@car-mkd-systems/shared/dtos/product/modification.dto';
import { Category } from '@car-mkd-systems/shared/schemas/category.schema';
import { ModelCar } from '@car-mkd-systems/shared/schemas/model.car.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Product extends Document {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public amount: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Category" })
  public category: Category;

  @Prop({ type: [{type: [mongoose.Schema.Types.ObjectId], ref: "File"}], default: [] })
  public images: File[];

  @Prop({ default: false })
  public isPublic: boolean;

  @Prop({ type: [{type: [mongoose.Schema.Types.ObjectId], ref: "ModelCar"}], default: []})
  public modelsCar: ModelCar[];

  @Prop({ type: [mongoose.Schema.Types.Mixed], default: [] })
  @Type(() => ModificationDto)
  public modifications: ModificationDto[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
