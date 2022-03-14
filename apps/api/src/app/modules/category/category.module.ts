import { CategoryController } from '@car-mkd-systems/api/modules/category/category.controller';
import { CategoryService } from '@car-mkd-systems/api/modules/category/category.service';
import { ProductModule } from '@car-mkd-systems/api/modules/product/product.module';
import { UserModule } from '@car-mkd-systems/api/modules/user/user.module';
import { Category, CategorySchema } from '@car-mkd-systems/shared/schemas/category.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    UserModule,
    ProductModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
