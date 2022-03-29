import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { UserCreateFormDto } from "@car-mkd-systems/shared/dtos/user/user.create.form.dto";
import { UserDto } from "@car-mkd-systems/shared/dtos/user/user.dto";
import { ErrorService } from "@car-mkd-systems/web/core/services/error.service";
import { UserStateService } from "@car-mkd-systems/web/core/services/user/user-state.service";

@Component({
  selector: 'car-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: []
})
export class UserAddComponent {

  public loading = false;

  public constructor(private readonly userStateService: UserStateService,
                     private readonly errorService: ErrorService,
                     private readonly router: Router) { }

  public create(body: UserCreateFormDto) {
    this.loading = true;

    this.userStateService.create<UserCreateFormDto, UserDto>(body).subscribe(() => {
      this.loading = false;
      this.errorService.addSuccessMessage("Пользователь успешно создан");
      this.router.navigate(['/user']).catch(console.error);
    }, () => this.loading = false);
  }

}
