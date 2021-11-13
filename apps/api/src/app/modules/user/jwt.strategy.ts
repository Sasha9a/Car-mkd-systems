import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '@car-mkd-systems/modules/user/user.service';

export interface JwtPayload { username: string; }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'd2103dfe7288ccb50a4a7af9ff90ec52'
    });
  }

  async validate(payload: JwtPayload) {

  }
}
