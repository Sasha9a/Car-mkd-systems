import { JwtAuthGuard } from "@car-mkd-systems/api/core/guards/jwt-auth.guard";
import { RoleGuard } from "@car-mkd-systems/api/core/guards/role.guard";
import { AuthService } from "@car-mkd-systems/api/modules/user/auth.service";
import { JwtStrategy } from "@car-mkd-systems/api/modules/user/jwt.strategy";
import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from "@nestjs/passport";
import { environment } from "../../../environments/environment";
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from '@car-mkd-systems/shared/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: true
    }),
    JwtModule.register({
      secret: environment.connection.secret,
      signOptions: {
        expiresIn: environment.connection.expiresIn
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy, JwtAuthGuard, RoleGuard],
  exports: [UserService, AuthService]
})
export class UserModule {}
