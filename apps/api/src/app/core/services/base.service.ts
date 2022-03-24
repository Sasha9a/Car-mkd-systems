import { Injectable } from "@nestjs/common";
import { Model, FilterQuery } from "mongoose";

@Injectable()
export class BaseService<T> {

  public constructor(private readonly model: Model<T>) {
  }

  public async create(entity: any): Promise<T> {
    const createEntity = await new this.model(entity);
    return await createEntity.save() as T;
  }

  public async findAll(filter?: FilterQuery<T>, projection?: any, populate?: string | string[]): Promise<T[]> {
    if (populate) {
      return await this.model.find(filter, projection).populate(populate).exec();
    }
    return await this.model.find(filter, projection).exec();
  }

  public async findById(id: string, projection?: any, populate?: string | string[]): Promise<T> {
    if (populate) {
      return await this.model.findById(id, projection).populate(populate).exec() as T;
    }
    return await this.model.findById(id, projection).exec();
  }

  public async update(id: string, entity: any, populate?: string | string[]): Promise<T> {
    if (populate) {
      return await this.model.findOneAndUpdate({ _id: id }, { $set: entity }, { new: true }).populate(populate).exec() as T;
    }
    return await this.model.findOneAndUpdate({ _id: id }, { $set: entity }, { new: true }).exec();
  }

  public async delete(id: string, populate?: string | string[]): Promise<T> {
    if (populate) {
      return await this.model.findByIdAndDelete(id).populate(populate).exec() as T;
    }
    return await this.model.findByIdAndDelete(id).exec();
  }

}
