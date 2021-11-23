import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AvatarModule} from "primeng/avatar";
import {DividerModule} from "primeng/divider";
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { JoinPipe } from './pipes/join.pipe';

@NgModule({
	declarations: [
		CommonLayoutComponent,
		JoinPipe
	],
	exports: [
		JoinPipe
	],
	imports: [
		CommonModule,
		MenubarModule,
		SharedModule,
		CardModule,
		AvatarModule,
		DividerModule
	]
})
export class ShareModule { }
