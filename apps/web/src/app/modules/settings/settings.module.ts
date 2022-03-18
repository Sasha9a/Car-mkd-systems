import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "@car-mkd-systems/web/shared/shared.module";
import { SettingsCardComponent } from './components/card/settings-card.component';

const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsCardComponent,
    data: {
      title: 'Настройки сайта - CMS'
    }
  }
];

@NgModule({
  declarations: [
    SettingsCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(settingsRoutes)
  ]
})
export class SettingsModule { }
