import { ProductDto } from '@car-mkd-systems/shared/dtos/product/product.dto';
import { ProductFormDto } from '@car-mkd-systems/shared/dtos/product/product.form.dto';
import { ProductQueryDto } from '@car-mkd-systems/shared/dtos/product/product.query.dto';
import { UserSessionDto } from '@car-mkd-systems/shared/dtos/user/user.session.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Product } from '@car-mkd-systems/shared/schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  public constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {
  }

  // public async findAll(queryParams: ProductQueryDto, user: UserSessionDto): Promise<Product[]> {
  //   if (!user) {
  //     return await this.productModel.find({ isPublic: true }).exec();
  //   }
  //   if (user.roles.includes(RoleEnum.PARTNER)) {
  //     return await this.productModel.find().exec();
  //   }
  //   return await this.productModel.find().exec();
  // }

  public async findById(id: string): Promise<Product> {
    return await this.productModel.findById(id).populate('category').populate('images').populate('modelsCar').exec();
  }

  public async createProduct(product: ProductFormDto): Promise<Product> {
    const createdProduct = await new this.productModel(product);
    return await createdProduct.save();
  }

  public async deleteProduct(id: string): Promise<any> {
    return await this.productModel.findByIdAndDelete(id).exec();
  }

}
