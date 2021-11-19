import { Module } from '@nestjs/common';
import { AuthService } from '@car-mkd-systems/modules/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@car-mkd-systems/modules/auth/jwt.strategy';
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
