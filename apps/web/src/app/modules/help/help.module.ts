import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '@car-mkd-systems/web/shared/share.module';
import { HelpComponent } from './components/help/help.component';

const helpRoutes: Routes = [
  {
    path: '',
    component: HelpComponent,
    data: {
      title: 'Помощь - CMS'
    }
  }
];

@NgModule({
  declarations: [
    HelpComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(helpRoutes)
  ]
})
export class HelpModule { }
