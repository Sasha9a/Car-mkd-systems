import { ProductFormDto } from '@car-mkd-systems/shared/dtos/product/product.form.dto';
import { ProductQueryDto } from '@car-mkd-systems/shared/dtos/product/product.query.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Product } from '@car-mkd-systems/shared/schemas/product.schema';
import { User } from '@car-mkd-systems/shared/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseQueryParser } from 'mongoose-query-parser';

@Injectable()
export class ProductService {
  public constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {
  }

  public async findAll(queryParams: ProductQueryDto, user: User): Promise<Product[]> {
    const parser = new MongooseQueryParser({
      skipKey: 'offset',
      limitKey: 'limit'
    });
    const filter = parser.parse(queryParams);
    if (!user || !user.roles?.includes(RoleEnum.ADMIN)) {
      filter.filter.isPublic = true;
    }
    return await this.productModel.find(filter.filter)
                     .skip(filter.skip)
                     .limit(filter.limit)
                     .populate('images').exec();
  }

  public async countFindAll(queryParams: ProductQueryDto, user: User) {
    const parser = new MongooseQueryParser({
      skipKey: 'offset',
      limitKey: 'limit'
    });
    const filter = parser.parse(queryParams);
    if (!user || !user.roles?.includes(RoleEnum.ADMIN)) {
      filter.filter.isPublic = true;
    }
    return await this.productModel.count(filter.filter).exec();
  }

  public async findById(id: string): Promise<Product> {
    return await this.productModel.findById(id)
                     .populate('category')
                     .populate('images')
                     .populate({ path: 'modelsCar', populate: { path: 'brand' } }).exec();
  }

  public async createProduct(product: ProductFormDto): Promise<Product> {
    try {
      const createdProduct = new this.productModel(product);
      return await createdProduct.save();
    } catch {
      return null;
    }
  }

  public async updateProduct(id: string, product: ProductFormDto): Promise<Product> {
    return await this.productModel.findOneAndUpdate({ _id: id }, { $set: product }, { new: true }).exec();
  }

  public async deleteProduct(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id).exec();
  }

}
