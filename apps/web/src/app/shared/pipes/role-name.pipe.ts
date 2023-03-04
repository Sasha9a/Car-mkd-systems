import { Pipe, PipeTransform } from '@angular/core';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';

const roleName = {
  [RoleEnum.SUPERADMIN]: 'Суперадмин',
  [RoleEnum.ADMIN]: 'Админ',
  [RoleEnum.PARTNER]: 'Партнер'
};

@Pipe({
  name: 'roleName',
  standalone: true
})
export class RoleNamePipe implements PipeTransform {
  public transform(value: RoleEnum): string {
    return roleName[value] || '';
  }
}
