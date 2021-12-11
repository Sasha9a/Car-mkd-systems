import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'car-go-back-button',
  template: `
    <button pButton [label]="label" [icon]="icon" [class]="buttonClass" (click)="btnClick()"></button>
  `
})
export class GoBackButtonComponent {

  @Input() public label = 'Отмена';
  @Input() public icon = 'pi pi-times';
  @Input() public buttonClass = 'p-button-secondary p-button-text';

  @Input() public route = '/';

  public constructor(private readonly router: Router) {
  }

  public btnClick() {
    this.router.navigate([this.route]).catch(console.error);
  }


}
