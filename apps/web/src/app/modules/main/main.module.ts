import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '@car-mkd-systems/web/shared/share.module';
import { ButtonModule } from 'primeng/button';
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
    ShareModule,
    RouterModule.forChild(mainRoutes),
    ButtonModule
  ]
})
export class MainModule { }
