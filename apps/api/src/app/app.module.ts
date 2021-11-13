import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
