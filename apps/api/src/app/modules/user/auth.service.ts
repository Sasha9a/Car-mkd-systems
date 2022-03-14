import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@car-mkd-systems/shared/schemas/user.schema';

@Injectable()
export class AuthService {
  public constructor(private readonly jwtService: JwtService) {
  }

  public async login(user: User) {
    const payload = { user: { _id: user._id, login: user.login, roles: user.roles } };
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
