import { ROLE_KEY } from '@car-mkd-systems/api/core/decorators/role.decorator';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {
  }

  public canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { headers } = context.switchToHttp().getRequest();
    if (!headers.authorization) {
      return false;
    }
    headers.authorization = headers.authorization.replace("Bearer ", "");
    return true;
  }
}
