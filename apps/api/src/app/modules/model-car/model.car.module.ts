import { ModelCarController } from '@car-mkd-systems/api/modules/model-car/model.car.controller';
import { ModelCarService } from '@car-mkd-systems/api/modules/model-car/model.car.service';
import { FirmCar, FirmCarSchema } from '@car-mkd-systems/shared/schemas/firm.car.schema';
import { ModelCar, ModelCarSchema } from '@car-mkd-systems/shared/schemas/model.car.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{name: ModelCar.name, schema: ModelCarSchema}, {name: FirmCar.name, schema: FirmCarSchema}])
  ],
  controllers: [ModelCarController],
  providers: [ModelCarService]
})
export class ModelCarModule {}
