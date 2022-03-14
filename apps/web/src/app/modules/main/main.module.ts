import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@car-mkd-systems/web/shared/shared.module';
import { MainComponent } from './components/main/main.component';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {
      title: 'Главная - CMS'
    }
  }
];

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(mainRoutes)
  ]
})
export class MainModule { }
