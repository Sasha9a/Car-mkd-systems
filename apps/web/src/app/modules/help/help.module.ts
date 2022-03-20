import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "@car-mkd-systems/web/shared/shared.module";
import { HelpCardComponent } from './components/card/help-card.component';

const helpRoutes: Routes = [
  {
    path: '',
    component: HelpCardComponent,
    data: {
      title: 'Помощь - CMS'
    }
  }
];

@NgModule({
  declarations: [
    HelpCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(helpRoutes)
  ]
})
export class HelpModule { }
