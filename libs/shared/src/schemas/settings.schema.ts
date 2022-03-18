import { SettingsWatermarkDto } from "@car-mkd-systems/shared/dtos/settings/settings.watermark.dto";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";

@Schema({ versionKey: false })
export class Settings extends Document {

  @Prop()
  public headerText: string;

  @Prop()
  public footerText: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  public watermark: SettingsWatermarkDto;

}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
