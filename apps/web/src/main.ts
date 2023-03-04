import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { AppComponent } from '@car-mkd-systems/web/core/app.component';
import { appRoutes } from '@car-mkd-systems/web/core/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withRouterConfig({ onSameUrlNavigation: 'ignore' }),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    )
  ]
}).catch((err) => console.error(err));
