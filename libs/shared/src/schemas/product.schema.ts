import { ModificationDto } from '@car-mkd-systems/shared/dtos/product/modification.dto';
import { Category } from '@car-mkd-systems/shared/schemas/category.schema';
import { ModelCar } from '@car-mkd-systems/shared/schemas/model.car.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

  @Prop({ default: [] })
  public images: string[];

  @Prop({ default: false })
  public isPublic: boolean;

  @Prop({ type: [{type: [mongoose.Schema.Types.ObjectId], ref: "ModelCar"}], default: []})
  public modelsCar: ModelCar[];

  @Prop({ type: [ModificationDto], default: [] })
  public modifications: ModificationDto[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);