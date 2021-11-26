import { Injectable } from '@angular/core';
import { UserFormDto } from '@car-mkd-systems/shared/dtos/user/user.form.dto';
import { UserSessionDto } from '@car-mkd-systems/shared/dtos/user/user.session.dto';
import { BaseService } from '@car-mkd-systems/web/core/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  protected baseUrl = '/user';

  public login(body: UserFormDto): Observable<UserSessionDto> {
    return this.http.post<UserSessionDto>(`${this.baseUrl}/login`, body);
  }

  public check(): Observable<null> {
    return this.http.get<null>(`${this.baseUrl}/check`);
  }

}
