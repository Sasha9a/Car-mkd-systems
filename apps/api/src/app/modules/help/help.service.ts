import { BaseService } from "@car-mkd-systems/api/core/services/base.service";
import { Help } from "@car-mkd-systems/shared/schemas/help.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class HelpService extends BaseService<Help> {

  public constructor(@InjectModel(Help.name) private readonly categoryModel: Model<Help>) {
    super(categoryModel);
  }

}
