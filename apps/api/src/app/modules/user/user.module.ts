import { JwtAuthGuard } from '@car-mkd-systems/api/core/guards/jwt-auth.guard';
import { RoleGuard } from '@car-mkd-systems/api/core/guards/role.guard';
import { AuthService } from '@car-mkd-systems/api/modules/user/auth.service';
import { JwtStrategy } from '@car-mkd-systems/api/modules/user/jwt.strategy';
import { UserEntity } from '@car-mkd-systems/shared/entities/user.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../../../environments/environment';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: true
    }),
    JwtModule.register({
      secret: environment.secret,
      signOptions: {
        expiresIn: environment.expiresIn
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy, JwtAuthGuard, RoleGuard],
  exports: [UserService, AuthService]
})
export class UserModule {}
