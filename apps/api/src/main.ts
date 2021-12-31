/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: '/etc/letsencrypt/live/car-mkd-systems.ru/privkey.pem',
      cert: '/etc/letsencrypt/live/car-mkd-systems.ru/fullchain.pem',
      ca: '/etc/letsencrypt/live/car-mkd-systems.ru/chain.pem'
    }
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  const port = process.env['PORT'] || 3000;
  await app.listen(port, () => {
    console.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  });
}

bootstrap().catch(console.error);
