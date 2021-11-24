import { Injectable } from '@angular/core';
import { UserFormDto } from '@car-mkd-systems/shared/dtos/user/user.form.dto';
import { BaseService } from '@car-mkd-systems/web/core/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  protected baseUrl = 'http://localhost:3333/api/user';

  public login(body: UserFormDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, body);
  }
}
