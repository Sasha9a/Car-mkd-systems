import { CategoryController } from '@car-mkd-systems/api/modules/category/category.controller';
import { CategoryService } from '@car-mkd-systems/api/modules/category/category.service';
import { Category, CategorySchema } from '@car-mkd-systems/shared/schemas/category.schema';
import { Characteristic, CharacteristicSchema } from '@car-mkd-systems/shared/schemas/characteristic.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }, { name: Characteristic.name, schema: CharacteristicSchema }])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
