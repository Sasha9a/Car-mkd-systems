import { BrandCarDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.dto';
import { BrandCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/brand.car.form.dto';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';
import { ModelCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.form.dto';
import { BrandCar } from '@car-mkd-systems/shared/schemas/brand.car.schema';
import { ModelCar } from '@car-mkd-systems/shared/schemas/model.car.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ModelCarService {
  public constructor(@InjectModel(ModelCar.name) private readonly modelCarModel: Model<ModelCar>,
                     @InjectModel(BrandCar.name) private readonly brandCarModel: Model<BrandCar>) {
  }

  public async findAll(): Promise<BrandCarDto[]> {
    return await this.brandCarModel.find().sort({ brand: 1 }).populate('models').exec();
  }

  public async checkBrand(id: string): Promise<boolean> {
    return await this.brandCarModel.exists({ _id: id });
  }

  public async createBrand(brand: BrandCarFormDto): Promise<BrandCarDto> {
    const createdBrand = await new this.brandCarModel(brand);
    return await createdBrand.save();
  }

  public async createModel(model: ModelCarFormDto): Promise<ModelCarDto> {
    const createdModel = await new this.modelCarModel(model);
    return await createdModel.save();
  }

  public async addModelToBrand(model: ModelCarDto): Promise<any> {
    return await this.brandCarModel.updateOne({ _id: model.brand._id }, { $push: { models: model._id } }).exec();
  }

  public async updateBrand(id: string, brand: BrandCarFormDto): Promise<BrandCarDto> {
    return await this.brandCarModel.findOneAndUpdate({ _id: id }, { $set: brand }, {new: true}).exec();
  }

  public async updateModel(id: string, model: ModelCarFormDto): Promise<ModelCarDto> {
    return await this.modelCarModel.findOneAndUpdate({ _id: id }, { $set: model }, {new: true}).exec();
  }

  public async deleteBrand(id: string): Promise<any> {
    const brand: BrandCarDto = await this.brandCarModel.findById(id);
    if (!brand) {
      return null;
    }
    await this.modelCarModel.deleteMany({ _id: { $in: brand.models } });
    return await this.brandCarModel.deleteOne({ _id: id }).exec();
  }

  public async deleteModel(id: string): Promise<any> {
    return await this.modelCarModel.findByIdAndDelete(id).exec();
  }

}
