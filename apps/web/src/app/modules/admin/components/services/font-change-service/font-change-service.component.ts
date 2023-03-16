import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

export type FontChangeServiceType = {
  text: string;
  resText: string;
  withNumbers: boolean;
  withRusLetters: boolean;
  withEngLetters: boolean;
  withOtherSymbols: boolean;
};

@Component({
  selector: 'car-font-change-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './font-change-service.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FontChangeServiceComponent {
  public form: FontChangeServiceType = {
    text: '',
    resText: '',
    withNumbers: false,
    withRusLetters: false,
    withEngLetters: false,
    withOtherSymbols: false
  };
}
