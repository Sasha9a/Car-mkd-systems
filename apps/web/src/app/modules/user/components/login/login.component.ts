import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoginFormDto } from '@car-mkd-systems/shared/dtos/user/user.login.form.dto';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { RoutingService } from '@car-mkd-systems/web/core/services/routing.service';
import { AuthService } from '@car-mkd-systems/web/core/services/user/auth.service';
import { LoginFormComponent } from '@car-mkd-systems/web/modules/user/dumbs/login-form/login-form.component';

@Component({
  selector: 'car-login',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public loading = false;

  private url: string;
  private queryParams: any;

  public constructor(
    private readonly authService: AuthService,
    private readonly errorService: ErrorService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cdRef: ChangeDetectorRef,
    private readonly routingService: RoutingService
  ) {}

  public ngOnInit() {
    this.url = this.route.snapshot.queryParams['url'] || '/';
    this.queryParams = this.url.split('?')[1] || '';

    this.url = this.url.split('?')[0] || this.url;
    this.queryParams = this.queryParams
      ? JSON.parse('{"' + decodeURI(this.queryParams.replace(/&/g, '","').replace(/=/g, '":"')) + '"}')
      : {};

    if (this.authService.currentUser) {
      this.router.navigate([this.url], { queryParams: this.queryParams }).catch(console.error);
    }
  }

  public login(user: UserLoginFormDto) {
    this.loading = true;
    this.cdRef.markForCheck();

    this.authService.login(user).subscribe({
      next: () => {
        this.errorService.addSuccessMessage('Вы авторизовались!');
        if (this.url === '/') {
          this.routingService.redirectToLk();
        } else {
          this.router.navigate([this.url], { queryParams: this.queryParams }).catch(console.error);
        }
      },
      error: () => {
        this.loading = false;
        this.cdRef.markForCheck();
      }
    });
  }
}
