import { Component } from '@angular/core';
import { UserFormDto } from '@car-mkd-systems/shared/dtos/user/user.form.dto';
import { UserStateService } from '@car-mkd-systems/web/core/services/user/user-state.service';
import { validate } from '@car-mkd-systems/web/core/services/validation/validate.service';

@Component({
  selector: 'car-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {

  public user = new UserFormDto();
  public errors: Record<keyof UserFormDto, any[]>;
  public loading = false;

  public constructor(private readonly userStateService: UserStateService) {
  }

  public clickLogin() {
    this.loading = true;

    const { valid, errors } = validate(this.user, UserFormDto);
    if (!valid) {
      console.error(errors);
      this.errors = errors;
      this.loading = false;
    } else {
      this.errors = null;
      this.userStateService.login(this.user).subscribe((result) => {
        console.log(result);
        this.loading = false;
      }, () => this.loading = false);
    }
  }

}
