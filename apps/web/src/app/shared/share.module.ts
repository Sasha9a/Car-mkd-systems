import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AvatarModule} from "primeng/avatar";
import {DividerModule} from "primeng/divider";
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from "primeng/overlaypanel";
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
    DividerModule,
    OverlayPanelModule,
    ListboxModule,
    MenuModule
  ]
})
export class ShareModule { }
