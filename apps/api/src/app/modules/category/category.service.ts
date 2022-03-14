import { BaseService } from "@car-mkd-systems/api/core/services/base.service";
import { Category } from '@car-mkd-systems/shared/schemas/category.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService extends BaseService<Category> {

  public constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {
    super(categoryModel);
  }

}
