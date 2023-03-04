import { Injectable } from '@angular/core';
import { UserDto } from '@car-mkd-systems/shared/dtos/user/user.dto';
import { UserLoginFormDto } from '@car-mkd-systems/shared/dtos/user/user.login.form.dto';
import { BaseService } from '@car-mkd-systems/web/core/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  protected override baseUrl = '/user';

  public login(body: UserLoginFormDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/login`, body);
  }

  public check(): Observable<null> {
    return this.http.get<null>(`${this.baseUrl}/check`);
  }

  public logout(body: UserDto): Observable<null> {
    return this.http.post<null>(`${this.baseUrl}/logout`, body);
  }
}
