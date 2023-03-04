import { Injectable } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { TitleService } from '@car-mkd-systems/web/core/services/title.service';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  public currentUrl = '/';
  public previousUrl = '/';

  public constructor(private readonly router: Router, private readonly titleService: TitleService) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.url;

      if (event.url === '/') {
        this.router.navigate([event.url]).catch(console.error);
      }
    });

    this.router.events
      .pipe(
        filter(
          (event) => event instanceof ActivationEnd && !event.snapshot.routeConfig.children && !event.snapshot.routeConfig.loadChildren
        ),
        map((event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe((routeData) => {
        this.titleService.setTitle(routeData['title']);
      });
  }

  public goToPreviousUrl() {
    this.router.navigateByUrl(this.previousUrl).catch(console.error);
  }
}
