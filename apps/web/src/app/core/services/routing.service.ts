import { Injectable } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { TitleService } from '@car-mkd-systems/web/core/services/title.service';
import { AuthService } from '@car-mkd-systems/web/core/services/user/auth.service';
import { filter, map } from 'rxjs';

const roleRoutes: Record<RoleEnum, string> = {
  [RoleEnum.SUPERADMIN]: '/admin',
  [RoleEnum.ADMIN]: '/admin',
  [RoleEnum.PARTNER]: '/'
};

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  public currentUrl = '/';
  public previousUrl = '/';

  public constructor(
    private readonly router: Router,
    private readonly titleService: TitleService,
    private readonly authService: AuthService
  ) {}

  public subscribeRoutes() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd && event.url !== '/notfound'))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      });

    this.router.events
      .pipe(
        filter(
          (event) => event instanceof ActivationEnd && !event.snapshot.routeConfig.children && !event.snapshot.routeConfig.loadChildren
        ),
        map((event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe((routeData) => {
        this.titleService.setTitle(routeData.title);
      });
  }

  public redirectToLk() {
    const path = roleRoutes[this.authService.currentUser.roles[0]] || '/login';
    this.router.navigate([path]).catch(console.error);
  }

  public goToPreviousUrl() {
    this.router.navigateByUrl(this.previousUrl).catch(console.error);
  }
}
