import { Injectable } from '@angular/core';
import { UserFormDto } from '@car-mkd-systems/shared/dtos/user/user.form.dto';
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

  public login(body: UserFormDto): Observable<any> {
    return this.userService.login(body);
  }
}
