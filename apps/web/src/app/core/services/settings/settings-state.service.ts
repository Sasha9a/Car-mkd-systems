import { Injectable } from '@angular/core';
import { BaseStateService } from "@car-mkd-systems/web/core/services/base-state.service";
import { SettingsService } from "@car-mkd-systems/web/core/services/settings/settings.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsStateService extends BaseStateService {

  public constructor(private readonly settingsService: SettingsService) {
    super();
    this.baseService = settingsService;
  }

}
