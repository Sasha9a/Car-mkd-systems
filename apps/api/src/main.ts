/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port).then(() => {
    console.log(`🚀 Сервер запущен по адресу: http://localhost:${port}/${globalPrefix}`);
  }).catch((err) => {
    console.error(`Сервер не запустился по ошибке: ${err}`);
  });
}

bootstrap().catch(console.error);
