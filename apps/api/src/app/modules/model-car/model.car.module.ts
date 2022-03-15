import { ModelCarController } from '@car-mkd-systems/api/modules/model-car/model.car.controller';
import { ModelCarService } from '@car-mkd-systems/api/modules/model-car/model.car.service';
import { UserModule } from '@car-mkd-systems/api/modules/user/user.module';
import { BrandCar, BrandCarSchema } from '@car-mkd-systems/shared/schemas/brand.car.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{name: BrandCar.name, schema: BrandCarSchema}]),
    UserModule
  ],
  controllers: [ModelCarController],
  providers: [ModelCarService]
})
export class ModelCarModule {}
