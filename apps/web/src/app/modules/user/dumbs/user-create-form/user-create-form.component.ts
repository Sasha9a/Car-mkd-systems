import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserCreateFormDto } from "@car-mkd-systems/shared/dtos/user/user.create.form.dto";
import { RoleEnum } from "@car-mkd-systems/shared/enums/role.enum";
import { ErrorService } from "@car-mkd-systems/web/core/services/error.service";
import { UserPasswordService } from "@car-mkd-systems/web/core/services/user/user-password.service";
import { BaseFormComponent } from "@car-mkd-systems/web/shared/dumbs/base-form/base-form.component";
import { RoleNamePipe } from "@car-mkd-systems/web/shared/pipes/role-name.pipe";

@Component({
  selector: 'car-user-create-form',
  templateUrl: './user-create-form.component.html',
  styleUrls: []
})
export class UserCreateFormComponent extends BaseFormComponent<UserCreateFormDto> implements OnChanges {

  @Input() public user = new UserCreateFormDto();
  public dto = UserCreateFormDto;

  public roles: any[] = [];
  public selectedRoles: any[] = [];

  public showPassword = false;

  @Input() public route: string;

  public constructor(public override readonly errorService: ErrorService,
                     private readonly roleNamePipe: RoleNamePipe,
                     public readonly userPasswordService: UserPasswordService) {
    super(errorService);

    Object.keys(RoleEnum).forEach((role) => {
      this.roles.push({
        name: this.roleNamePipe.transform(RoleEnum[role]),
        role: RoleEnum[role]
      });
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['user']?.currentValue) {
      this.selectedRoles = [];
      changes['user'].currentValue.roles?.forEach((role) => {
        this.selectedRoles.push({
          name: this.roleNamePipe.transform(RoleEnum[role]),
          role: RoleEnum[role]
        });
      });
    }
  }

  public setRole(roles: any) {
    this.user.roles = roles.map((role) => role.role);
  }

}
