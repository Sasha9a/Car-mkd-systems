import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoginFormDto } from '@car-mkd-systems/shared/dtos/user/user.login.form.dto';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { AuthService } from '@car-mkd-systems/web/core/services/user/auth.service';
import { validate } from '@car-mkd-systems/web/core/services/validation/validate.service';
import { CommonLayoutComponent } from '@car-mkd-systems/web/shared/layouts/common-layout/common-layout.component';

@Component({
  selector: 'car-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  public user = new UserLoginFormDto();
  public errors: Record<keyof UserLoginFormDto, any[]>;
  public loading = false;

  private url: string;
  private queryParams: any;

  public constructor(private readonly authService: AuthService,
                     private readonly errorService: ErrorService,
                     private readonly router: Router,
                     private readonly route: ActivatedRoute,
                     private readonly commonLayoutComponent: CommonLayoutComponent) {
  }

  public ngOnInit() {
    this.url = this.route.snapshot.queryParams['url'] || '/';
    this.queryParams = this.url.split('?')[1] || '';

    this.url = this.url.split('?')[0] || this.url;
    this.queryParams = this.queryParams ? JSON.parse('{"' + decodeURI(this.queryParams.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}') : {};

    if (this.authService.currentUser) {
      this.router.navigate([this.url], { queryParams: this.queryParams }).catch(console.error);
    }
  }

  public clickLogin() {
    this.loading = true;

    const { valid, errors } = validate(this.user, UserLoginFormDto);
    if (!valid) {
      console.error(errors);
      this.errors = errors;
      this.loading = false;
    } else {
      this.errors = null;
      this.authService.login(this.user).subscribe({
        next: () => {
          this.loading = false;
          this.errorService.addSuccessMessage("Вы авторизовались!");
          this.router.navigate([this.url], { queryParams: this.queryParams }).catch(console.error);
          this.commonLayoutComponent.loadMenu();
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
