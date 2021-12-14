import { Component } from '@angular/core';
import { RoutingService } from '@car-mkd-systems/web/core/services/routing.service';

@Component({
  selector: 'car-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent {
  public constructor(public readonly routingService: RoutingService) {
  }
}
