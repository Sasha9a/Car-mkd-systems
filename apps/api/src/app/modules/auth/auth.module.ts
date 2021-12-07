import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { RoleGuard } from '@car-mkd-systems/api/core/guards/role.guard';
import { AuthService } from '@car-mkd-systems/api/modules/auth/auth.service';
import { JwtStrategy } from '@car-mkd-systems/api/modules/auth/jwt.strategy';
import { UserModule } from '@car-mkd-systems/api/modules/user/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {environment} from "../../../environments/environment";

@Module({
  imports: [
    forwardRef(() => UserModule),
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
  providers: [AuthService, JwtStrategy, JwtAuthGuard, RoleGuard],
  exports: [AuthService]
})
export class AuthModule {}
