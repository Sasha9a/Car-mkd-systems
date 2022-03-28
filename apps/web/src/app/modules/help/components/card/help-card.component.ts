import { Component, OnInit } from '@angular/core';
import { HelpDto } from "@car-mkd-systems/shared/dtos/help/help.dto";
import { RoleEnum } from "@car-mkd-systems/shared/enums/role.enum";
import { HelpStateService } from "@car-mkd-systems/web/core/services/help/help-state.service";
import { AuthService } from "@car-mkd-systems/web/core/services/user/auth.service";

@Component({
  selector: 'car-help-card',
  templateUrl: './help-card.component.html',
  styleUrls: []
})
export class HelpCardComponent implements OnInit {

  public helpList: HelpDto[];
  public loading = true;

  public get RoleEnum() {
    return RoleEnum;
  }

  public constructor(private readonly helpStateService: HelpStateService,
                     public readonly authService: AuthService) {
  }

  public ngOnInit() {
    this.helpStateService.find<HelpDto>().subscribe((helpList) => {
      this.helpList = helpList;
      this.loading = false;
    }, () => this.loading = false);
  }

}
