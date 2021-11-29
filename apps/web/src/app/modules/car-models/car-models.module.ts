import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '@car-mkd-systems/web/shared/share.module';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from "primeng/table";
import { CarModelsComponent } from './components/car-models/car-models.component';
import { CheckboxModule } from 'primeng/checkbox';

const carModelsRoutes: Routes = [
  {
    path: '',
    component: CarModelsComponent
  }
];

@NgModule({
  declarations: [
    CarModelsComponent
  ],
	imports: [
		CommonModule,
		RouterModule.forChild(carModelsRoutes),
		PanelModule,
		InputTextModule,
		FormsModule,
		ButtonModule,
		ShareModule,
		AccordionModule,
		RippleModule,
		CheckboxModule,
		TableModule
	]
})
export class CarModelsModule { }
