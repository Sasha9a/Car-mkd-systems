import { Component, OnInit } from '@angular/core';
import { UserDto } from "@car-mkd-systems/shared/dtos/user/user.dto";
import { CrmTableColumn } from "@car-mkd-systems/web/core/models/crm-table-column";
import { UserStateService } from "@car-mkd-systems/web/core/services/user/user-state.service";

@Component({
  selector: 'car-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: []
})
export class UserListComponent implements OnInit {

  public users: UserDto[];
  public loading = true;

  public itemColumns: CrmTableColumn[] = [
    { label: 'Логин', name: 'login', sort: 'login:string' },
    { label: 'Роль(и)' }
  ];

  public constructor(private readonly userStateService: UserStateService) { }

  public ngOnInit(): void {
    this.userStateService.find<UserDto>().subscribe((data) => {
      this.users = data;
      this.loading = false;
    }, () => this.loading = false);
  }

  public toUser(user: any): UserDto {
    return user as UserDto;
  }

}
