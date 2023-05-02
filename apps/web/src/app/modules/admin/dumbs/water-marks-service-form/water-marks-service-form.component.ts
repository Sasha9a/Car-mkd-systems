import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WatermarkFormDto } from '@car-mkd-systems/shared/dtos/admin-services/watermark.form.dto';
import { FileDto } from '@car-mkd-systems/shared/dtos/file.dto';
import { WatermarkTypeEnum } from '@car-mkd-systems/shared/enums/watermark.type.enum';
import { ConfirmDialogService } from '@car-mkd-systems/web/core/services/confirm-dialog.service';
import { ErrorService } from '@car-mkd-systems/web/core/services/error.service';
import { FileService } from '@car-mkd-systems/web/core/services/file.service';
import { BaseFormComponent } from '@car-mkd-systems/web/shared/dumbs/base-form/base-form.component';
import { WaterMarksFontSingleSelectComponent } from '@car-mkd-systems/web/shared/dumbs/dropdowns/water-marks-font-single-select/water-marks-font-single-select.component';
import { FileComponent } from '@car-mkd-systems/web/shared/dumbs/file/file.component';
import { GoBackButtonComponent } from '@car-mkd-systems/web/shared/dumbs/go-back-button/go-back-button.component';
import { JoinPipe } from '@car-mkd-systems/web/shared/pipes/join.pipe';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'car-water-marks-service-form',
  standalone: true,
  imports: [
    CommonModule,
    SelectButtonModule,
    FormsModule,
    InputTextModule,
    ColorPickerModule,
    FileUploadModule,
    InputNumberModule,
    FileComponent,
    JoinPipe,
    GoBackButtonComponent,
    WaterMarksFontSingleSelectComponent
  ],
  templateUrl: './water-marks-service-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaterMarksServiceFormComponent extends BaseFormComponent<WatermarkFormDto> {
  @Input() public form = new WatermarkFormDto();
  public dto = WatermarkFormDto;

  public uploadingFiles = false;

  @ViewChild('fileUploadImage') public fileUploadImage: FileUpload;
  @ViewChild('fileUploadFont') public fileUploadFont: FileUpload;
  @ViewChild('fileUploadImageWatermark') public fileUploadImageWatermark: FileUpload;

  public watermarkTypes: { label: string; value: WatermarkTypeEnum }[] = [
    { label: 'Текст', value: WatermarkTypeEnum.TEXT },
    { label: 'Картинка', value: WatermarkTypeEnum.IMAGE }
  ];

  public get WatermarkTypeEnum() {
    return WatermarkTypeEnum;
  }

  public constructor(
    private readonly fileService: FileService,
    public override readonly errorService: ErrorService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly confirmDialogService: ConfirmDialogService
  ) {
    super(errorService);
  }

  public addImageWatermark(data: { files: FileList }) {
    this.uploadingFiles = true;
    this.cdRef.markForCheck();

    this.fileService.upload(data.files).subscribe({
      next: (files) => {
        if (this.form?.imageWatermark) {
          this.fileService.deleteFile(this.form.imageWatermark.path).subscribe(() => {
            this.form.imageWatermark = files[0];
          });
        } else {
          this.form.imageWatermark = files[0];
        }
        this.fileUploadImageWatermark.clear();
        this.uploadingFiles = false;
        this.cdRef.markForCheck();
      },
      error: () => {
        this.uploadingFiles = false;
        this.cdRef.markForCheck();
      }
    });
  }

  public deleteImageWatermark() {
    this.confirmDialogService.confirm({
      message: `Вы действительно хотите удалить картинку?`,
      accept: () => {
        this.uploadingFiles = true;
        this.cdRef.markForCheck();

        this.fileService.deleteFile(this.form?.imageWatermark?.path).subscribe({
          next: () => {
            this.form.imageWatermark = null;
            this.uploadingFiles = false;
            this.cdRef.markForCheck();
          },
          error: () => {
            this.uploadingFiles = false;
            this.cdRef.markForCheck();
          }
        });
      }
    });
  }

  public addImages(data: { files: FileList }) {
    this.uploadingFiles = true;
    this.cdRef.markForCheck();

    this.fileService.upload(data.files).subscribe({
      next: (files) => {
        if (this.form?.images?.length) {
          this.fileService.deleteFiles(this.form.images).subscribe(() => {
            this.form.images = files;
          });
        } else {
          this.form.images = files;
        }
        this.fileUploadImage.clear();
        this.uploadingFiles = false;
        this.cdRef.markForCheck();
      },
      error: () => {
        this.uploadingFiles = false;
        this.cdRef.markForCheck();
      }
    });
  }

  public deleteImages() {
    this.confirmDialogService.confirm({
      message: `Вы действительно хотите удалить картинки?`,
      accept: () => {
        this.uploadingFiles = true;
        this.cdRef.markForCheck();

        this.fileService.deleteFiles(this.form?.images).subscribe({
          next: () => {
            this.form.images = null;
            this.uploadingFiles = false;
            this.cdRef.markForCheck();
          },
          error: () => {
            this.uploadingFiles = false;
            this.cdRef.markForCheck();
          }
        });
      }
    });
  }

  public deleteImage(filesArray: FileDto[], file: FileDto) {
    this.confirmDialogService.confirm({
      message: `Вы действительно хотите удалить файл "${file.name}"?`,
      accept: () => {
        filesArray.splice(filesArray.indexOf(file), 1);
        this.fileService.deleteFile(file.path).subscribe();
        this.cdRef.markForCheck();
      }
    });
  }
}
