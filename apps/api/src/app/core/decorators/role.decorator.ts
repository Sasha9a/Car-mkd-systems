import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role';
export const Role = (...roles: RoleEnum[]) => SetMetadata(ROLE_KEY, roles);
