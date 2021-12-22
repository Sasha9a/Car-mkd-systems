import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '@car-mkd-systems/web/shared/share.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from "primeng/card";
import { ImageModule } from 'primeng/image';
import { SkeletonModule } from 'primeng/skeleton';
import { MainComponent } from './components/main/main.component';
import { PaginatorModule } from 'primeng/paginator';

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
    ButtonModule,
    PaginatorModule,
    CardModule,
    ImageModule,
    SkeletonModule
  ]
})
export class MainModule { }
