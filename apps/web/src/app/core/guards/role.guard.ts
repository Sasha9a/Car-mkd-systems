import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '@car-mkd-systems/web/core/services/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  public constructor(private router: Router,
                     private authService: AuthService) {
  }

  public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

    if (route.data?.included === true && this.authService.currentUser?.roles.some((role) => route.data?.roles.includes(role))) {
      return true;
    }

    if (route.data?.included === false && this.authService.currentUser?.roles.every((role) => !route.data?.roles.includes(role))) {
      return true;
    }

    this.router.navigate(['/']).catch(console.error);
    return false;
  }


}