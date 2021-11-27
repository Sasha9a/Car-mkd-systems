import { FirmCarDto } from '@car-mkd-systems/shared/dtos/modelCar/firm.car.dto';
import { FirmCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/firm.car.form.dto';
import { ModelCarDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.dto';
import { ModelCarFormDto } from '@car-mkd-systems/shared/dtos/modelCar/model.car.form.dto';
import { FirmCar } from '@car-mkd-systems/shared/schemas/firm.car.schema';
import { ModelCar } from '@car-mkd-systems/shared/schemas/model.car.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ModelCarService {
  public constructor(@InjectModel(ModelCar.name) private readonly modelCarModel: Model<ModelCar>,
                     @InjectModel(FirmCar.name) private readonly firmCarModel: Model<FirmCar>) {
  }

  public async findAll(): Promise<FirmCarDto[]> {
    return await this.firmCarModel.find().sort({ "firm": 1 }).populate('models').exec();
  }

  public async checkFirm(id: string): Promise<boolean> {
    return await this.firmCarModel.exists({ _id: id });
  }

  public async createFirm(firm: FirmCarFormDto): Promise<FirmCarDto> {
    const createdFirm = await new this.firmCarModel(firm);
    return createdFirm.save();
  }

  public async createModel(model: ModelCarFormDto): Promise<ModelCarDto> {
    const createdModel = await new this.modelCarModel(model);
    return createdModel.save();
  }

  public async addModelToFirm(model: ModelCarDto) {
    return this.firmCarModel.updateOne({ _id: model.firm._id }, { $push: { models: new mongoose.Types.ObjectId(model._id) } });
  }

}
