import { SettingsController } from "@car-mkd-systems/api/modules/settings/settings.controller";
import { SettingsService } from "@car-mkd-systems/api/modules/settings/settings.service";
import { UserModule } from "@car-mkd-systems/api/modules/user/user.module";
import { Settings, SettingsSchema } from "@car-mkd-systems/shared/schemas/settings.schema";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Settings.name, schema: SettingsSchema }]),
    UserModule
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService]
})
export class SettingsModule {}
