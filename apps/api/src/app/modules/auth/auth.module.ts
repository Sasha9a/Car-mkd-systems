import { AuthService } from '@car-mkd-systems/api/modules/auth/auth.service';
import { JwtStrategy } from '@car-mkd-systems/api/modules/auth/jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {environment} from "../../../environments/environment";

@Module({
  imports: [
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
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
