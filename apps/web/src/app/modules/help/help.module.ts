import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { RoleEnum } from "@car-mkd-systems/shared/enums/role.enum";
import { RoleGuard } from "@car-mkd-systems/web/core/guards/role.guard";
import { SharedModule } from "@car-mkd-systems/web/shared/shared.module";
import { HelpCardComponent } from './components/card/help-card.component';
import { HelpFormComponent } from './dumbs/help-form/help-form.component';
import { HelpAddComponent } from './components/add/help-add.component';
import { HelpEditComponent } from './components/edit/help-edit.component';

const helpRoutes: Routes = [
  {
    path: '',
    component: HelpCardComponent,
    data: {
      title: 'Помощь - CMS'
    }
  },
  {
    path: 'add',
    canActivate: [RoleGuard],
    component: HelpAddComponent,
    data: {
      title: 'Создание раздела помощи - CMS',
      roles: [RoleEnum.SUPERADMIN],
      included: true
    }
  },
  {
    path: 'edit/:id',
    canActivate: [RoleGuard],
    component: HelpEditComponent,
    data: {
      roles: [RoleEnum.SUPERADMIN],
      included: true
    }
  }
];

@NgModule({
  declarations: [
    HelpCardComponent,
    HelpFormComponent,
    HelpAddComponent,
    HelpEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(helpRoutes)
  ]
})
export class HelpModule { }
