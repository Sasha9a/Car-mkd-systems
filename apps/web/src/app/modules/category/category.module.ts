import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from "@car-mkd-systems/web/shared/shared.module";
import { CategoryComponent } from './components/category/category.component';

const categoryRoutes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    data: {
      title: 'Категории - CMS'
    }
  }
];

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(categoryRoutes),
    SharedModule,
    FormsModule
  ]
})
export class CategoryModule { }
