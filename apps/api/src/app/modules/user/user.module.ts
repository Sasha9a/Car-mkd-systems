import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from '@car-mkd-systems/shared/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@car-mkd-systems/modules/user/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: true
    }),
    JwtModule.register({
      secret: 'd2103dfe7288ccb50a4a7af9ff90ec52',
      signOptions: {
        expiresIn: 3600 * 24 * 30
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [
    PassportModule,
    JwtModule
  ]
})
export class UserModule {}
