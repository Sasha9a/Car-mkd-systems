import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'car-water-marks-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './water-marks-service.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaterMarksServiceComponent {}
