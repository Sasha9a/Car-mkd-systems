import { Injectable } from '@angular/core';
import { BaseStateService } from "@car-mkd-systems/web/core/services/base-state.service";
import { HelpService } from "@car-mkd-systems/web/core/services/help/help.service";

@Injectable({
  providedIn: 'root'
})
export class HelpStateService extends BaseStateService {

  public constructor(private readonly helpService: HelpService) {
    super();
    this.baseService = helpService;
  }

}
