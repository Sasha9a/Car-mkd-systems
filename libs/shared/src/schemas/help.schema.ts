import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ versionKey: false })
export class Help extends Document {

  @Prop({ required: true })
  public title: string;

  @Prop({ required: true })
  public text: string;

}

export const HelpSchema = SchemaFactory.createForClass(Help);
