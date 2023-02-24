import { UserDto } from '@car-mkd-systems/shared/dtos/user/user.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  public constructor(private readonly jwtService: JwtService) {}

  public login(user: UserDto) {
    const payload = { user: { id: user.id, login: user.login, roles: user.roles } };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}
