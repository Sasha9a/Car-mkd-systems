import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
export class WaterMarksServiceComponent implements OnInit {
  public loading = false;
  public form = new WatermarkFormDto();

  public constructor(private readonly adminServiceService: AdminServiceService, private readonly cdRef: ChangeDetectorRef) {}

  public ngOnInit() {
    this.form.opacityDest = 1;
    this.form.opacitySource = 0.3;
    this.form.scale = 75;
    this.form.rotate = 0;
    this.form.color = '#ffffff';
  }

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
