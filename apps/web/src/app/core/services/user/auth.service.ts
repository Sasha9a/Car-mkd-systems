import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFormDto } from '@car-mkd-systems/shared/dtos/user/user.form.dto';
import { UserSessionDto } from '@car-mkd-systems/shared/dtos/user/user.session.dto';
import { RoleEnum } from "@car-mkd-systems/shared/enums/role.enum";
import { UserStateService } from '@car-mkd-systems/web/core/services/user/user-state.service';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: UserSessionDto;

  public logoutSubject$: Subject<any> = new Subject();

  public constructor(private readonly route: ActivatedRoute,
                     private readonly router: Router,
                     private readonly userStateService: UserStateService) {
    if (localStorage.getItem('JWT_USER')) {
      this.user = JSON.parse(localStorage.getItem('JWT_USER'));
    }
  }

  public login(user: UserFormDto): Observable<UserSessionDto> {
    return this.userStateService.login(user).pipe(tap((response) => {
      this.user = response;

      localStorage.setItem('JWT_TOKEN', response.token);
      localStorage.setItem('JWT_USER', JSON.stringify(response));
    }));
  }

  public logout() {
    localStorage.removeItem('JWT_TOKEN');
    localStorage.removeItem('JWT_USER');

    this.userStateService.logout(this.user).subscribe();

    this.user = undefined;

    this.logoutSubject$.next(null);
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
    return this.userStateService.check().toPromise();
  }

  public checkRoles(roles: RoleEnum[]): boolean {
    return !!this.currentUser?.roles?.some((role) => roles.includes(role));
  }

}
