import { ROLES_KEY } from '@car-mkd-systems/api/core/decorators/role.decorator';
import { UserService } from '@car-mkd-systems/api/modules/user/user.service';
import { UserDto } from '@car-mkd-systems/shared/dtos/user/user.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) {
      return true;
    }
    const { user }: { user: UserDto } = context.switchToHttp().getRequest();
    if (!user) {
      return false;
    }
    const verifyUser = await this.userService.findById(user.id);
    if (!verifyUser) {
      return false;
    }
    return requiredRoles.some((role) => verifyUser.roles?.includes(role));
  }
}
