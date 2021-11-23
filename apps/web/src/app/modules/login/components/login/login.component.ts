import { Component } from '@angular/core';
import { UserFormDto } from '@car-mkd-systems/shared/dtos/user/user.form.dto';
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

  public clickLogin() {
    this.loading = true;

    const { valid, errors } = validate(this.user, UserFormDto);
    if (!valid) {
      console.error(errors);
      this.errors = errors;
      this.loading = false;
    } else {
      this.errors = null;
      this.loading = false;
    }
  }

}
