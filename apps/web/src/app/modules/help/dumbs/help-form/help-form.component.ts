import { Component, Input } from '@angular/core';
import { HelpFormDto } from "@car-mkd-systems/shared/dtos/help/help.form.dto";
import { ErrorService } from "@car-mkd-systems/web/core/services/error.service";
import { BaseFormComponent } from "@car-mkd-systems/web/shared/dumbs/base-form/base-form.component";

@Component({
  selector: 'car-help-form',
  templateUrl: './help-form.component.html',
  styleUrls: []
})
export class HelpFormComponent extends BaseFormComponent<HelpFormDto> {

  @Input() public help = new HelpFormDto();
  public dto = HelpFormDto;

  @Input() public route: string;

  public constructor(public override readonly errorService: ErrorService) {
    super(errorService);
  }

}
