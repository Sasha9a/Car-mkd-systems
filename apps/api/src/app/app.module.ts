import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/car')
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
