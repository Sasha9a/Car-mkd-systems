import { LoggingInterceptor } from '@car-mkd-systems/api/core/interceptors/logging.interceptor';
import { UserModule } from '@car-mkd-systems/api/modules/user/user.module';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { MongooseModule } from '@nestjs/mongoose';
import { environment } from "../environments/environment";

@Module({
  imports: [
    MongooseModule.forRoot(environment.connection.db),
    UserModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})
export class AppModule {}
