import { LoggerMiddleware } from '@car-mkd-systems/api/core/middlewares/logger.middleware';
import { AuthModule } from '@car-mkd-systems/api/modules/auth/auth.module';
import { CategoryModule } from '@car-mkd-systems/api/modules/category/category.module';
import { ModelCarModule } from '@car-mkd-systems/api/modules/model-car/model.car.module';
import { ProductModule } from '@car-mkd-systems/api/modules/product/product.module';
import { UserModule } from '@car-mkd-systems/api/modules/user/user.module';
import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment';

@Module({
  imports: [
    MongooseModule.forRoot(environment.connection.db),
    forwardRef(() => AuthModule),
    UserModule,
    ModelCarModule,
    CategoryModule,
    ProductModule
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    });
  }
}
