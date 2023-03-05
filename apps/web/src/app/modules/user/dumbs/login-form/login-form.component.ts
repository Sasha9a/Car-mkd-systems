import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserLoginFormDto } from '@car-mkd-systems/shared/dtos/user/user.login.form.dto';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { BaseFormComponent } from '@car-mkd-systems/web/shared/dumbs/base-form/base-form.component';
import { JoinPipe } from '@car-mkd-systems/web/shared/pipes/join.pipe';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'car-login-form',
  standalone: true,
  imports: [CommonModule, InputTextModule, JoinPipe, FormsModule, ButtonModule, PasswordModule],
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent extends BaseFormComponent<UserLoginFormDto> {
  @Input() public user = new UserLoginFormDto();
  public dto = UserLoginFormDto;

  @Input() public loading = false;

  public constructor(public override readonly errorService: ErrorService) {
    super(errorService);
  }

  public setFocus(elem: any) {
    elem.input?.nativeElement?.focus();
  }
}
