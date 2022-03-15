import { BaseService } from "@car-mkd-systems/api/core/services/base.service";
import { queryParamParser } from "@car-mkd-systems/api/core/services/query-param-parser.service";
import { ProductQueryDto } from '@car-mkd-systems/shared/dtos/product/product.query.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Product } from '@car-mkd-systems/shared/schemas/product.schema';
import { User } from '@car-mkd-systems/shared/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService extends BaseService<Product> {

  public constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {
    super(productModel);
  }

  public async find(queryParams: ProductQueryDto, user: User): Promise<Product[]> {
    const filter = queryParamParser(queryParams);
    if (!user || !user.roles?.includes(RoleEnum.ADMIN)) {
      filter.filter.isPublic = true;
    }
    return await this.productModel.find(filter.filter)
                     .skip(filter.skip)
                     .limit(filter.limit).exec();
  }

  public async countFindAll(queryParams: ProductQueryDto, user: User) {
    const filter = queryParamParser(queryParams);
    if (!user || !user.roles?.includes(RoleEnum.ADMIN)) {
      filter.filter.isPublic = true;
    }
    return await this.productModel.count(filter.filter).exec();
  }

}
