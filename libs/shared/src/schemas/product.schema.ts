import { ModificationDto } from '@car-mkd-systems/shared/dtos/product/modification.dto';
import { Category } from '@car-mkd-systems/shared/schemas/category.schema';
import { File } from '@car-mkd-systems/shared/schemas/file.schema';
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

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Category", autopopulate: true })
  public category: Category;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: File.name, default: [], autopopulate: true })
  public images: File[];

  @Prop({ default: false })
  public isPublic: boolean;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: ModelCar.name, default: [], autopopulate: true })
  public modelsCar: ModelCar[];

  @Prop({ type: [mongoose.Schema.Types.Mixed], default: [] })
  public modifications: ModificationDto[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
