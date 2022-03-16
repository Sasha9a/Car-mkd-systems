import { BaseService } from "@car-mkd-systems/api/core/services/base.service";
import { queryParamParser } from "@car-mkd-systems/api/core/services/query-param-parser.service";
import { ProductQueryDto } from '@car-mkd-systems/shared/dtos/product/product.query.dto';
import { UserDto } from "@car-mkd-systems/shared/dtos/user/user.dto";
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { Product } from '@car-mkd-systems/shared/schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService extends BaseService<Product> {

  public constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {
    super(productModel);
  }

  public async find(queryParams: ProductQueryDto, user: UserDto): Promise<Product[]> {
    let params = {};
    if (queryParams.categories) {
      params['category'] = {
        $in: Array.isArray(queryParams.categories) ? queryParams.categories : [queryParams.categories]
      };
    }
    if (queryParams.models) {
      params['modelCars._id'] = {
        $in: Array.isArray(queryParams.models) ? queryParams.models : [queryParams.models]
      };
    }
    if (queryParams.categories || queryParams.models) {
      params = {
        filter: JSON.stringify(params)
      };
    }
    const filter = queryParamParser(params);
    if (!user || !user.roles?.includes(RoleEnum.ADMIN)) {
      filter.filter.isPublic = true;
    }
    return await this.productModel.find(filter.filter)
                     .skip(filter.skip)
                     .limit(filter.limit).exec();
  }

  public async countFindAll(queryParams: ProductQueryDto, user: UserDto) {
    let params = {};
    if (queryParams.categories) {
      params['category'] = {
        $in: Array.isArray(queryParams.categories) ? queryParams.categories : [queryParams.categories]
      };
    }
    if (queryParams.models) {
      params['modelCars._id'] = {
        $in: Array.isArray(queryParams.models) ? queryParams.models : [queryParams.models]
      };
    }
    if (queryParams.categories || queryParams.models) {
      params = {
        filter: JSON.stringify(params)
      };
    }
    const filter = queryParamParser(params);
    if (!user || !user.roles?.includes(RoleEnum.ADMIN)) {
      filter.filter.isPublic = true;
    }
    return await this.productModel.count(filter.filter).exec();
  }

}
