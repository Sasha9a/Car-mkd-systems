import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from "@car-mkd-systems/web/shared/shared.module";
import { CategoryComponent } from './components/category/category.component';
import { CategoryFormComponent } from './dumbs/category-form/category-form.component';
import { CategoryAddComponent } from './components/add/category-add.component';
import { CategoryEditComponent } from './components/edit/category-edit.component';

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
    CategoryComponent,
    CategoryFormComponent,
    CategoryAddComponent,
    CategoryEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(categoryRoutes),
    SharedModule,
    FormsModule
  ]
})
export class CategoryModule { }
