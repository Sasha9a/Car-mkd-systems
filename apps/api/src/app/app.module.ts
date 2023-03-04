import { LoggerMiddleware } from '@car-mkd-systems/api/core/middlewares/logger.middleware';
import { UserModule } from '@car-mkd-systems/api/modules/user/user.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: environment.connection.type,
      host: environment.connection.host,
      port: environment.connection.port,
      username: environment.connection.username,
      password: environment.connection.password,
      database: environment.connection.database,
      synchronize: environment.connection.synchronize,
      autoLoadEntities: true
    }),
    UserModule
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
