import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { AppComponent } from '@car-mkd-systems/web/core/app.component';
import { appRoutes } from '@car-mkd-systems/web/core/app.routes';
import { ErrorInterceptor } from '@car-mkd-systems/web/core/interceptors/error.interceptor';
import { TokenInterceptor } from '@car-mkd-systems/web/core/interceptors/token.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import 'reflect-metadata';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withRouterConfig({ onSameUrlNavigation: 'ignore' }),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    MessageService,
    ConfirmationService
  ]
}).catch((err) => console.error(err));
