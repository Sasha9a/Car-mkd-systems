import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { HelpDto } from "@car-mkd-systems/shared/dtos/help/help.dto";
import { HelpFormDto } from "@car-mkd-systems/shared/dtos/help/help.form.dto";
import { ConfirmDialogService } from "@car-mkd-systems/web/core/services/confirm-dialog.service";
import { ErrorService } from "@car-mkd-systems/web/core/services/error.service";
import { HelpStateService } from "@car-mkd-systems/web/core/services/help/help-state.service";

@Component({
  selector: 'car-help-edit',
  templateUrl: './help-edit.component.html',
  styleUrls: []
})
export class HelpEditComponent implements OnInit {

  public helpId: string;
  public help: HelpDto;
  public saving = false;

  public constructor(private readonly helpStateService: HelpStateService,
                     private readonly errorService: ErrorService,
                     private readonly confirmDialogService: ConfirmDialogService,
                     private readonly router: Router,
                     private readonly route: ActivatedRoute,
                     private readonly title: Title) { }

  public ngOnInit(): void {
    this.helpId = this.route.snapshot.params['id'];

    if (!this.helpId) {
      return this.errorService.addCustomError('Ошибка', 'Произошла ошибка, вернитесь на главную и попробуйте снова.');
    }

    this.helpStateService.findById<HelpDto>(this.helpId).subscribe((help) => {
      this.help = help;
      this.title.setTitle(`${this.help.title} - CMS`);
    });
  }

  public edit(body: HelpFormDto) {
    this.saving = true;

    this.helpStateService.update<HelpFormDto>(this.helpId, body).subscribe(() => {
      this.saving = false;
      this.errorService.addSuccessMessage("Раздел помощи изменен");
      this.router.navigate(['/help']).catch(console.error);
    }, () => this.saving = false);
  }

  public delete() {
    this.confirmDialogService.confirm({
      message: `Вы действительно хотите удалить раздел "${this.help.title}"?`,
      accept: () => {
        this.saving = true;

        this.helpStateService.deleteById(this.help._id).subscribe(() => {
          this.saving = false;
          this.errorService.addSuccessMessage(`Успешно`, `Раздел "${this.help.title}" удален`);
          this.router.navigate(['/help']).catch(console.error);
        });
      }
    });
  }

}
