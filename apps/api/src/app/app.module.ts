import { LoggerMiddleware } from '@car-mkd-systems/api/core/middlewares/logger.middleware';
import { CategoryModule } from '@car-mkd-systems/api/modules/category/category.module';
import { FileModule } from '@car-mkd-systems/api/modules/file/file.module';
import { ModelCarModule } from '@car-mkd-systems/api/modules/model-car/model.car.module';
import { ProductModule } from '@car-mkd-systems/api/modules/product/product.module';
import { SettingsModule } from "@car-mkd-systems/api/modules/settings/settings.module";
import { UserModule } from '@car-mkd-systems/api/modules/user/user.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment';

@Module({
  imports: [
    MongooseModule.forRoot(environment.connection.db, {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      }
    }),
    UserModule,
    ModelCarModule,
    CategoryModule,
    ProductModule,
    FileModule,
    SettingsModule
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
