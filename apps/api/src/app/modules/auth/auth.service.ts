import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@car-mkd-systems/shared/schemas/user.schema';

@Injectable()
export class AuthService {
  public constructor(private readonly jwtService: JwtService) {
  }

  public async login(user: User) {
    const payload = { username: user.login, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
