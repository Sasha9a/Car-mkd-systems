import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@car-mkd-systems/web/core/services/user/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  public constructor(private readonly router: Router,
                     private readonly authService: AuthService) {
  }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let canActivate = true;

    await this.authService.isAuthenticated().catch(() => {
      canActivate = false;
    });

    if (canActivate) {
      return true;
    }

    if (state.url !== '/') {
      this.router.navigate(['login'], { queryParams: { url: state.url } }).catch(console.error);
    } else {
      this.router.navigate(['login']).catch(console.error);
    }
    return false;
  }
}
