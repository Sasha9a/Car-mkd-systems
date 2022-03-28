import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { HelpDto } from "@car-mkd-systems/shared/dtos/help/help.dto";
import { HelpFormDto } from "@car-mkd-systems/shared/dtos/help/help.form.dto";
import { ErrorService } from "@car-mkd-systems/web/core/services/error.service";
import { HelpStateService } from "@car-mkd-systems/web/core/services/help/help-state.service";

@Component({
  selector: 'car-help-add',
  templateUrl: './help-add.component.html',
  styleUrls: []
})
export class HelpAddComponent {

  public saving = false;

  public constructor(private readonly helpStateService: HelpStateService,
                     private readonly errorService: ErrorService,
                     private readonly router: Router) { }

  public create(body: HelpFormDto) {
    this.saving = true;

    this.helpStateService.create<HelpFormDto, HelpDto>(body).subscribe(() => {
      this.saving = false;
      this.errorService.addSuccessMessage("Раздел помощи успешно создан");
      this.router.navigate(['/help']).catch(console.error);
    }, () => this.saving = false);
  }

}
