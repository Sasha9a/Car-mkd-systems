import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { UserDto } from "@car-mkd-systems/shared/dtos/user/user.dto";
import { UserEditFormDto } from "@car-mkd-systems/shared/dtos/user/user.edit.form.dto";
import { ConfirmDialogService } from "@car-mkd-systems/web/core/services/confirm-dialog.service";
import { ErrorService } from "@car-mkd-systems/web/core/services/error.service";
import { UserStateService } from "@car-mkd-systems/web/core/services/user/user-state.service";

@Component({
  selector: 'car-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: []
})
export class UserEditComponent implements OnInit {

  public userId: string;
  public user: UserDto;
  public loading = true;

  public constructor(private readonly userStateService: UserStateService,
                     private readonly errorService: ErrorService,
                     private readonly route: ActivatedRoute,
                     private readonly confirmDialogService: ConfirmDialogService,
                     private readonly router: Router,
                     private readonly title: Title) { }

  public ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];

    if (!this.userId) {
      return this.errorService.addCustomError('Ошибка', 'Произошла ошибка, вернитесь на главную и попробуйте снова.');
    }

    this.userStateService.findById<UserDto>(this.userId).subscribe((data) => {
      this.user = data;
      this.title.setTitle(`${this.user.login} - CRM`);
      this.loading = false;
    });
  }

  public update(body: UserEditFormDto) {
    this.loading = true;

    this.userStateService.update<UserEditFormDto>(this.userId, body).subscribe(() => {
      this.loading = false;
      this.errorService.addSuccessMessage("Пользователь изменен");
      this.router.navigate(['/user']).catch(console.error);
    }, () => this.loading = false);
  }

  public delete() {
    this.confirmDialogService.confirm({
      message: `Вы действительно хотите удалить пользователя "${this.user.login}"?`,
      accept: () => {
        this.loading = true;

        this.userStateService.deleteById(this.user._id).subscribe(() => {
          this.loading = false;
          this.errorService.addSuccessMessage(`Успешно`, `Пользователь "${this.user.login}" удален`);
          this.router.navigate(['/user']).catch(console.error);
        });
      }
    });
  }

}
