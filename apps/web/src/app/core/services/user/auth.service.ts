import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from '@car-mkd-systems/shared/dtos/user/user.dto';
import { UserLoginFormDto } from '@car-mkd-systems/shared/dtos/user/user.login.form.dto';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { UserService } from '@car-mkd-systems/web/core/services/user/user.service';
import { lastValueFrom, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: UserDto;

  public constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly userService: UserService) {
    if (localStorage.getItem('JWT_USER')) {
      this.user = JSON.parse(localStorage.getItem('JWT_USER'));
    }
  }

  public login(user: UserLoginFormDto): Observable<UserDto> {
    return this.userService.login(user).pipe(
      tap((response) => {
        this.user = response;

        localStorage.setItem('JWT_TOKEN', response.token);
        localStorage.setItem('JWT_USER', JSON.stringify(response));
      })
    );
  }

  public logout(url?: string) {
    localStorage.removeItem('JWT_TOKEN');
    localStorage.removeItem('JWT_USER');

    this.userService.logout(this.user).subscribe();

    this.user = undefined;
    this.router.navigate(['/login'], { queryParams: { url } }).catch(console.error);
  }

  public get currentUser() {
    return this.user;
  }

  public getToken() {
    return localStorage.getItem('JWT_TOKEN');
  }

  public isAuthenticated(): Promise<any> {
    if (!this.getToken()) {
      return Promise.reject(false);
    }
    return lastValueFrom(this.userService.check());
  }

  public checkRoles(roles: RoleEnum[]): boolean {
    return !!this.currentUser?.roles?.some((role) => roles.includes(role));
  }
}
