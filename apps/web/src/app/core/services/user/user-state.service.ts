import { Injectable } from '@angular/core';
import { UserLoginFormDto } from '@car-mkd-systems/shared/dtos/user/user.login.form.dto';
import { UserSessionDto } from '@car-mkd-systems/shared/dtos/user/user.session.dto';
import { BaseStateService } from '@car-mkd-systems/web/core/services/base-state.service';
import { UserService } from '@car-mkd-systems/web/core/services/user/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService extends BaseStateService {

  public constructor(private readonly userService: UserService) {
    super();
    this.baseService = userService;
  }

  public login(body: UserLoginFormDto): Observable<UserSessionDto> {
    return this.userService.login(body);
  }

  public check(): Observable<null> {
    return this.userService.check();
  }

  public logout(body: UserSessionDto): Observable<null> {
    return this.userService.logout(body);
  }
}
