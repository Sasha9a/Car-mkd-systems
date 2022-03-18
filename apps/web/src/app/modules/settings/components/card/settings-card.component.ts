import { Component, OnInit } from '@angular/core';
import { SettingsDto } from "@car-mkd-systems/shared/dtos/settings/settings.dto";
import { WatermarkTypeEnum } from "@car-mkd-systems/shared/enums/watermark.type.enum";
import { ErrorService } from "@car-mkd-systems/web/core/services/error.service";
import { FileService } from "@car-mkd-systems/web/core/services/file.service";
import { SettingsStateService } from "@car-mkd-systems/web/core/services/settings/settings-state.service";

@Component({
  selector: 'car-settings-card',
  templateUrl: './settings-card.component.html',
  styleUrls: []
})
export class SettingsCardComponent implements OnInit {

  public settings: SettingsDto;
  public loading = true;

  public watermarkTypes = [
    { label: 'Текст', value: WatermarkTypeEnum.TEXT },
    { label: 'Картинка', value: WatermarkTypeEnum.IMAGE }
  ];

  public selectWatermarkType;

  public get WatermarkTypeEnum() {
    return WatermarkTypeEnum;
  }

  public constructor(private readonly settingsStateService: SettingsStateService,
                     private readonly errorService: ErrorService,
                     private readonly fileService: FileService) { }

  public ngOnInit(): void {
    this.settingsStateService.find<SettingsDto>().subscribe((settings) => {
      if (settings.length) {
        this.settings = settings[0];
        if (this.settings.watermark?.type) {
          this.selectWatermarkType = this.watermarkTypes.find((type) => type.value === this.settings.watermark?.type)?.value;
        }
        this.loading = false;
      } else {
        const newSettings: SettingsDto = {
          headerText: '',
          footerText: '',
          watermark: {
            enableWatermark: false
          }
        };
        this.settingsStateService.create<SettingsDto, SettingsDto>(newSettings).subscribe((setting) => {
          this.settings = setting;
          this.loading = false;
        });
      }
    });
  }

  public save() {
    if (this.settings) {
      this.loading = true;

      this.settingsStateService.update<SettingsDto>(this.settings._id, this.settings).subscribe(() => {
        this.loading = false;
        this.errorService.addSuccessMessage('Изменения сохранены');
      }, () => this.loading = false);
    }
  }

}
