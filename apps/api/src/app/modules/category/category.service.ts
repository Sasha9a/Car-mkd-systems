import { CategoryDto } from '@car-mkd-systems/shared/dtos/category/category.dto';
import { CategoryFormDto } from '@car-mkd-systems/shared/dtos/category/category.form.dto';
import { CharacteristicDto } from '@car-mkd-systems/shared/dtos/category/characteristic.dto';
import { CharacteristicFormDto } from '@car-mkd-systems/shared/dtos/category/characteristic.form.dto';
import { Category } from '@car-mkd-systems/shared/schemas/category.schema';
import { Characteristic } from '@car-mkd-systems/shared/schemas/characteristic.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  public constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>,
                     @InjectModel(Characteristic.name) private readonly characteristicModel: Model<Characteristic>) {
  }

  public async findAll(): Promise<CategoryDto[]> {
    return await this.categoryModel.find().sort({ name: 1 }).populate('characteristics').exec();
  }

  public async findAllDropdown(): Promise<CategoryDto[]> {
    return await this.categoryModel.find({}, 'name').sort({ name: 1 }).exec();
  }

  public async findCategory(id: string): Promise<CategoryDto> {
    return await this.categoryModel.findById(id).populate('characteristics').exec();
  }

  public async checkCategory(id: string): Promise<boolean> {
    return await this.categoryModel.exists({ _id: id });
  }

  public async createCategory(category: CategoryFormDto): Promise<CategoryDto> {
    const createdCategory = await new this.categoryModel(category);
    return await createdCategory.save();
  }

  public async createCharacteristic(characteristic: CharacteristicFormDto): Promise<CharacteristicDto> {
    const createdCharacteristic = await new this.characteristicModel(characteristic);
    return await createdCharacteristic.save();
  }

  public async addCharacteristicToCategory(characteristic: CharacteristicDto): Promise<any> {
    return await this.categoryModel.updateOne({ _id: characteristic.category._id }, { $push: { characteristics: characteristic._id } }).exec();
  }

  public async updateCategory(id: string, category: CategoryFormDto): Promise<CategoryDto> {
    return await this.categoryModel.findOneAndUpdate({ _id: id }, { $set: category }, {new: true}).exec();
  }

  public async updateCharacteristic(id: string, characteristic: CharacteristicFormDto): Promise<CharacteristicDto> {
    return await this.characteristicModel.findOneAndUpdate({ _id: id }, { $set: characteristic }, {new: true}).exec();
  }

  public async updateOrderCharacteristics(characteristics: CharacteristicDto[]) {
    for (const characteristic of characteristics) {
      await this.characteristicModel.updateOne({ _id: characteristic._id }, { order: characteristic.order });
    }
  }

  public async deleteCategory(id: string): Promise<Category> {
    const category: CategoryDto = await this.categoryModel.findById(id);
    if (!category) {
      return null;
    }
    await this.characteristicModel.deleteMany({ _id: { $in: category.characteristics } });
    return await this.categoryModel.findByIdAndDelete(id).exec();
  }

  public async deleteCharacteristic(id: string): Promise<any> {
    return await this.characteristicModel.findByIdAndDelete(id).exec();
  }
}
