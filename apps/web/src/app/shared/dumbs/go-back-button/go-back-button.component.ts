import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from '@car-mkd-systems/web/core/services/routing.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'car-go-back-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `<button pButton [label]="label" [icon]="icon" [class]="buttonClass" (click)="btnClick()"></button>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoBackButtonComponent {
  @Input() public label = 'Отмена';
  @Input() public icon = 'pi pi-times';
  @Input() public buttonClass = 'p-button-secondary p-button-text';

  @Input() public route = '/';

  public constructor(private readonly router: Router, public readonly routingService: RoutingService) {}

  public btnClick() {
    if (this.routingService.previousUrl === '/') {
      this.router.navigate([this.route]).catch(console.error);
    } else {
      this.routingService.goToPreviousUrl();
    }
  }
}
