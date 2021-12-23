import { FileModule } from '@car-mkd-systems/api/modules/file/file.module';
import { ProductController } from '@car-mkd-systems/api/modules/product/product.controller';
import { ProductService } from '@car-mkd-systems/api/modules/product/product.service';
import { UserModule } from '@car-mkd-systems/api/modules/user/user.module';
import { Product, ProductSchema } from '@car-mkd-systems/shared/schemas/product.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    UserModule,
    FileModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
