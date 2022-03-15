import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from "@car-mkd-systems/web/shared/shared.module";
import { CategoryFormComponent } from './dumbs/category-form/category-form.component';
import { CategoryAddComponent } from './components/add/category-add.component';
import { CategoryEditComponent } from './components/edit/category-edit.component';
import { CategoryListComponent } from './components/list/category-list.component';

const categoryRoutes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
    data: {
      title: 'Категории - CMS'
    }
  },
  {
    path: 'add',
    component: CategoryAddComponent,
    data: {
      title: 'Добавить категорию - CMS'
    }
  },
  {
    path: 'edit/:id',
    component: CategoryEditComponent
  }
];

@NgModule({
  declarations: [
    CategoryFormComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(categoryRoutes),
    SharedModule,
    FormsModule
  ]
})
export class CategoryModule { }
