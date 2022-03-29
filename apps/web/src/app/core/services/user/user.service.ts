import { Injectable } from '@angular/core';
import { UserLoginFormDto } from '@car-mkd-systems/shared/dtos/user/user.login.form.dto';
import { UserSessionDto } from '@car-mkd-systems/shared/dtos/user/user.session.dto';
import { BaseService } from '@car-mkd-systems/web/core/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  protected override baseUrl = '/user';

  public login(body: UserLoginFormDto): Observable<UserSessionDto> {
    return this.http.post<UserSessionDto>(`${this.baseUrl}/login`, body);
  }

  public check(): Observable<null> {
    return this.http.get<null>(`${this.baseUrl}/check`);
  }

  public logout(body: UserSessionDto): Observable<null> {
    return this.http.post<null>(`${this.baseUrl}/logout`, body);
  }

}
