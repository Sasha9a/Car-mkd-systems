import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@car-mkd-systems/web/shared/shared.module';
import { CarModelsComponent } from './components/car-models/car-models.component';

const carModelsRoutes: Routes = [
  {
    path: '',
    component: CarModelsComponent,
    data: {
      title: 'Панель автотранспорта - CMS'
    }
  }
];

@NgModule({
  declarations: [
    CarModelsComponent
  ],
	imports: [
		CommonModule,
		RouterModule.forChild(carModelsRoutes),
		FormsModule,
		SharedModule
	]
})
export class CarModelsModule { }
