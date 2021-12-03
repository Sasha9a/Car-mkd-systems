import { Component, Input } from '@angular/core';

@Component({
  selector: 'car-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: []
})
export class SpinnerComponent {

  @Input() public text = 'Загрузка...';

}
