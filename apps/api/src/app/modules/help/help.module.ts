import { HelpController } from "@car-mkd-systems/api/modules/help/help.controller";
import { HelpService } from "@car-mkd-systems/api/modules/help/help.service";
import { UserModule } from "@car-mkd-systems/api/modules/user/user.module";
import { Help, HelpSchema } from "@car-mkd-systems/shared/schemas/help.schema";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Help.name, schema: HelpSchema }]),
    UserModule
  ],
  controllers: [HelpController],
  providers: [HelpService]
})
export class HelpModule {}
