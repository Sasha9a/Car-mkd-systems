import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@car-mkd-systems/web/shared/shared.module';
import { CarModelFormComponent } from './dumbs/car-model-form/car-model-form.component';
import { CarModelAddComponent } from './components/add/car-model-add.component';
import { CarModelEditComponent } from './components/edit/car-model-edit.component';
import { CarModelListComponent } from './components/list/car-model-list.component';

const carModelsRoutes: Routes = [
  {
    path: '',
    component: CarModelListComponent,
    data: {
      title: 'Марки автотранспорта - CMS'
    }
  },
  {
    path: 'add',
    component: CarModelAddComponent,
    data: {
      title: 'Добавить марку - CMS'
    }
  },
  {
    path: 'edit/:id',
    component: CarModelEditComponent
  }
];

@NgModule({
  declarations: [
    CarModelFormComponent,
    CarModelAddComponent,
    CarModelEditComponent,
    CarModelListComponent
  ],
	imports: [
		CommonModule,
		RouterModule.forChild(carModelsRoutes),
		FormsModule,
		SharedModule
	]
})
export class CarModelsModule { }
