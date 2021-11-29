import { ModelCarController } from '@car-mkd-systems/api/modules/model-car/model.car.controller';
import { ModelCarService } from '@car-mkd-systems/api/modules/model-car/model.car.service';
import { BrandCar, BrandCarSchema } from '@car-mkd-systems/shared/schemas/brand.car.schema';
import { ModelCar, ModelCarSchema } from '@car-mkd-systems/shared/schemas/model.car.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{name: ModelCar.name, schema: ModelCarSchema}, {name: BrandCar.name, schema: BrandCarSchema}])
  ],
  controllers: [ModelCarController],
  providers: [ModelCarService]
})
export class ModelCarModule {}
