import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorInterceptor } from '@car-mkd-systems/web/core/interceptors/error.interceptor';
import { TokenInterceptor } from '@car-mkd-systems/web/core/interceptors/token.interceptor';
import { RoutingService } from '@car-mkd-systems/web/core/services/routing.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule, ToastModule, ConfirmDialogModule, ScrollTopModule],
  selector: 'car-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
    [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
    MessageService,
    ConfirmationService
  ]
})
export class AppComponent {
  public constructor(public readonly routingService: RoutingService) {}
}
