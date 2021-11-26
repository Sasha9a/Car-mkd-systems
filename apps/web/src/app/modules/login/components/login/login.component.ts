import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserFormDto } from '@car-mkd-systems/shared/dtos/user/user.form.dto';
import { AuthService } from '@car-mkd-systems/web/core/services/user/auth.service';
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

  public constructor(private readonly authService: AuthService,
                     private readonly router: Router) {
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
      this.authService.login(this.user).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['']).catch(console.error);
        },
        error: (err) => {
          this.loading = false;
          this.errors = err.error;
        }
      });
    }
  }

  public setFocus(elem: any) {
    elem.input?.nativeElement?.focus();
  }

}
