import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '@car-mkd-systems/web/core/services/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  public constructor(private readonly router: Router, private readonly authService: AuthService) {}

  public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const roles = Array.isArray(this.authService.currentUser?.roles)
      ? this.authService.currentUser?.roles
      : [this.authService.currentUser?.roles];

    if (route.data?.included === true && roles?.some((role) => route.data?.roles.includes(role))) {
      return true;
    }

    if (route.data?.included === false && roles?.every((role) => !route.data?.roles.includes(role))) {
      return true;
    }

    this.router.navigate(['/']).catch(console.error);
    return false;
  }
}
