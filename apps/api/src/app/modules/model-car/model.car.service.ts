import { BrandCarDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.dto';
import { BrandCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.form.dto';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';
import { ModelCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.form.dto';
import { BrandCar } from '@car-mkd-systems/shared/schemas/brand.car.schema';
import { ModelCar } from '@car-mkd-systems/shared/schemas/model.car.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ModelCarService {
  public constructor(@InjectModel(ModelCar.name) private readonly modelCarModel: Model<ModelCar>,
                     @InjectModel(BrandCar.name) private readonly brandCarModel: Model<BrandCar>) {
  }

  public async findAll(): Promise<BrandCarDto[]> {
    return await this.brandCarModel.find().sort({ brand: 1 }).populate('models').exec();
  }

  public async checkFirm(id: string): Promise<boolean> {
    return await this.brandCarModel.exists({ _id: id });
  }

  public async createBrand(brand: BrandCarFormDto): Promise<BrandCarDto> {
    const createdBrand = await new this.brandCarModel(brand);
    return createdBrand.save();
  }

  public async createModel(model: ModelCarFormDto): Promise<ModelCarDto> {
    const createdModel = await new this.modelCarModel(model);
    return createdModel.save();
  }

  public async addModelToBrand(model: ModelCarDto) {
    return this.brandCarModel.updateOne({ _id: model.brand._id }, { $push: { models: new mongoose.Types.ObjectId(model._id) } });
  }

}
