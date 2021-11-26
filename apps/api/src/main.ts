/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { LoggingInterceptor } from '@car-mkd-systems/api/core/interceptors/logging.interceptor';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.useGlobalInterceptors(new LoggingInterceptor());
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap().catch(Logger.error);
