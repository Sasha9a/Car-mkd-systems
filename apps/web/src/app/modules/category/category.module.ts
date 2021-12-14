import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from "@car-mkd-systems/web/shared/share.module";
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
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
    ShareModule,
    PanelModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    AccordionModule,
    RippleModule,
    TableModule
  ]
})
export class CategoryModule { }
