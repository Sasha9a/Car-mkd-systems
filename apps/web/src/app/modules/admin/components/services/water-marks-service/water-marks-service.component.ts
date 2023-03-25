import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { WatermarkFormDto } from '@car-mkd-systems/shared/dtos/admin-services/watermark.form.dto';
import { AdminServiceService } from '@car-mkd-systems/web/core/services/admin/admin-service.service';
import { WaterMarksServiceFormComponent } from '@car-mkd-systems/web/modules/admin/dumbs/water-marks-service-form/water-marks-service-form.component';
import { SpinnerComponent } from '@car-mkd-systems/web/shared/dumbs/spinner/spinner.component';

@Component({
  selector: 'car-water-marks-service',
  standalone: true,
  imports: [CommonModule, WaterMarksServiceFormComponent, SpinnerComponent],
  templateUrl: './water-marks-service.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaterMarksServiceComponent {
  public loading = false;

  public constructor(private readonly adminServiceService: AdminServiceService, private readonly cdRef: ChangeDetectorRef) {}

  public waterMarks(form: WatermarkFormDto) {
    this.loading = true;
    this.cdRef.markForCheck();

    this.adminServiceService.waterMarks(form).subscribe({
      next: (file: Blob) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([file], { type: file.type }));
        if (form.nameArchive) {
          downloadLink.download = form.nameArchive + '.zip';
        }
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        this.loading = false;
        this.cdRef.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.cdRef.markForCheck();
      }
    });
  }
}
