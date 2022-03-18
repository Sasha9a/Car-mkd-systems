import { BaseService } from "@car-mkd-systems/api/core/services/base.service";
import { Settings } from "@car-mkd-systems/shared/schemas/settings.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class SettingsService extends BaseService<Settings> {

  public constructor(@InjectModel(Settings.name) private readonly settingsModel: Model<Settings>) {
    super(settingsModel);
  }

}
