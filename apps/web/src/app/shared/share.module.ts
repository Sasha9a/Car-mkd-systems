import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AvatarModule} from "primeng/avatar";
import {DividerModule} from "primeng/divider";
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from "primeng/overlaypanel";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { JoinPipe } from './pipes/join.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SpinnerComponent } from './dumbs/spinner/spinner.component';

@NgModule({
	declarations: [
		CommonLayoutComponent,
		JoinPipe,
  OrderByPipe,
  SpinnerComponent
	],
  exports: [
    JoinPipe,
    OrderByPipe,
    SpinnerComponent
  ],
	imports: [
		CommonModule,
		MenubarModule,
		SharedModule,
		CardModule,
		AvatarModule,
		DividerModule,
		OverlayPanelModule,
		ListboxModule,
		MenuModule,
		ProgressSpinnerModule
	]
})
export class ShareModule { }
