import { BaseService } from "@car-mkd-systems/api/core/services/base.service";
import { BrandCar } from '@car-mkd-systems/shared/schemas/brand.car.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ModelCarService extends BaseService<BrandCar> {

  public constructor(@InjectModel(BrandCar.name) private readonly brandCarModel: Model<BrandCar>) {
    super(brandCarModel);
  }

}
