import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsDto } from "@car-mkd-systems/shared/dtos/settings/settings.dto";
import { WatermarkTypeEnum } from "@car-mkd-systems/shared/enums/watermark.type.enum";
import { ConfirmDialogService } from "@car-mkd-systems/web/core/services/confirm-dialog.service";
import { ErrorService } from "@car-mkd-systems/web/core/services/error.service";
import { FileService } from "@car-mkd-systems/web/core/services/file.service";
import { SettingsStateService } from "@car-mkd-systems/web/core/services/settings/settings-state.service";
import { FileUpload } from "primeng/fileupload";

@Component({
  selector: 'car-settings-card',
  templateUrl: './settings-card.component.html',
  styleUrls: []
})
export class SettingsCardComponent implements OnInit {

  public settings: SettingsDto;
  public loading = true;
  public uploadingFiles = false;

  public watermarkTypes = [
    { label: 'Текст', value: WatermarkTypeEnum.TEXT },
    { label: 'Картинка', value: WatermarkTypeEnum.IMAGE }
  ];

  public selectWatermarkType;

  @ViewChild('fileUploadFont') public fileUploadFont: FileUpload;
  @ViewChild('fileUploadImage') public fileUploadImage: FileUpload;

  public get WatermarkTypeEnum() {
    return WatermarkTypeEnum;
  }

  public constructor(private readonly settingsStateService: SettingsStateService,
                     private readonly errorService: ErrorService,
                     private readonly fileService: FileService,
                     private readonly confirmDialogService: ConfirmDialogService) { }

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

  public addFilesFont(data: { files: FileList }) {
    if (data.files.length === 2) {
      if (data.files[0].type.includes("image/") && data.files[1].name.endsWith('.fnt')
      || data.files[1].type.includes("image/") && data.files[0].name.endsWith('.fnt')) {
        this.uploadingFiles = true;
        this.fileService.upload(data.files, '/file/font').subscribe((files) => {
          if (this.settings.watermark.font?.length) {
            this.fileService.deleteFiles(this.settings.watermark?.font).subscribe(() => {
              this.settings.watermark.font = files;
            });
          } else {
            this.settings.watermark.font = files;
          }
          this.fileUploadFont.clear();
          this.uploadingFiles = false;
        }, () => this.uploadingFiles = false);
      } else {
        this.errorService.addCustomError('Ошибка', 'Нужны файлы формата картинки и .fnt');
        this.fileUploadFont.clear();
      }
    } else {
      this.errorService.addCustomError('Ошибка', 'Нужно залить сразу 2 файла');
      this.fileUploadFont.clear();
    }
  }

  public deleteFont() {
    this.confirmDialogService.confirm({
      message: `Вы действительно хотите удалить шрифты?`,
      accept: () => {
        this.uploadingFiles = true;
        this.fileService.deleteFiles(this.settings.watermark?.font).subscribe(() => {
          this.settings.watermark.font = [];
          this.uploadingFiles = false;
        }, () => this.uploadingFiles = false);
      }
    });
  }

  public addImage(data: { files: FileList }) {
    this.uploadingFiles = true;
    this.fileService.upload(data.files, '/file/no-watermark').subscribe((files) => {
      if (this.settings.watermark?.image) {
        this.fileService.deleteFile(this.settings.watermark.image.path).subscribe(() => {
          this.settings.watermark.image = files[0];
        });
      } else {
        this.settings.watermark.image = files[0];
      }
      this.fileUploadImage.clear();
      this.uploadingFiles = false;
    }, () => this.uploadingFiles = false);
  }

  public deleteImage() {
    this.confirmDialogService.confirm({
      message: `Вы действительно хотите удалить картинку?`,
      accept: () => {
        this.uploadingFiles = true;
        this.fileService.deleteFile(this.settings.watermark?.image?.path).subscribe(() => {
          this.settings.watermark.image = null;
          this.uploadingFiles = false;
        }, () => this.uploadingFiles = false);
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
