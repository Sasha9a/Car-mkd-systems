import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { WatermarkFontEnum } from '@car-mkd-systems/shared/enums/watermark.font.enum';
import { SingleSelectComponent } from '@car-mkd-systems/web/shared/dumbs/dropdowns/single-select/single-select.component';

@Component({
  selector: 'car-water-marks-font-single-select',
  standalone: true,
  imports: [CommonModule, SingleSelectComponent],
  templateUrl: './water-marks-font-single-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaterMarksFontSingleSelectComponent {
  @Input() public font: WatermarkFontEnum;
  @Output() public fontChange = new EventEmitter<WatermarkFontEnum>();

  @Input() public text: string;
  @Input() public class: string;
  @Input() public styleClass: string;

  public options = Object.values(WatermarkFontEnum);
}
