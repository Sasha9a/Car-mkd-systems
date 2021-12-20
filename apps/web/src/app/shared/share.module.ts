import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AvatarModule} from "primeng/avatar";
import { ButtonModule } from 'primeng/button';
import {DividerModule} from "primeng/divider";
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from "primeng/overlaypanel";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { JoinPipe } from './pipes/join.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SpinnerComponent } from './dumbs/spinner/spinner.component';
import { CategorySingleSelectComponent } from './dumbs/dropdowns/category-single-select/category-single-select.component';
import { SingleSelectComponent } from './dumbs/dropdowns/single-select/single-select.component';
import { DropdownModule } from 'primeng/dropdown';
import { NestedPropertyPipe } from './pipes/nested-property.pipe';
import { MultiSelectComponent } from './dumbs/dropdowns/multi-select/multi-select.component';
import { ModelCarMultiSelectComponent } from './dumbs/dropdowns/model-car-multi-select/model-car-multi-select.component';
import { FileComponent } from './dumbs/file/file.component';
import { ImageModule } from 'primeng/image';
import { ApiUrlPipe } from './pipes/api-url.pipe';
import { FileTypePipe } from './pipes/file-type.pipe';
import { GoBackButtonComponent } from './dumbs/go-back-button/go-back-button.component';
import { BrandCarMultiSelectComponent } from './dumbs/dropdowns/brand-car-multi-select/brand-car-multi-select.component';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { KeyValueFilterPipe } from './pipes/key-value-filter.pipe';
import { ObjectKeyValuePipe } from './pipes/object-key-value.pipe';
import { CategoryMultiSelectComponent } from './dumbs/dropdowns/category-multi-select/category-multi-select.component';

@NgModule({
	declarations: [
		CommonLayoutComponent,
		JoinPipe,
    OrderByPipe,
    SpinnerComponent,
    CategorySingleSelectComponent,
    SingleSelectComponent,
    NestedPropertyPipe,
    MultiSelectComponent,
    ModelCarMultiSelectComponent,
    FileComponent,
    ApiUrlPipe,
    FileTypePipe,
    GoBackButtonComponent,
    BrandCarMultiSelectComponent,
    FilterByPipe,
    KeyValueFilterPipe,
    ObjectKeyValuePipe,
    CategoryMultiSelectComponent
	],
	exports: [
		JoinPipe,
		OrderByPipe,
		SpinnerComponent,
		CategorySingleSelectComponent,
		ModelCarMultiSelectComponent,
		FileComponent,
		GoBackButtonComponent,
		ApiUrlPipe,
		KeyValueFilterPipe,
		ObjectKeyValuePipe,
		BrandCarMultiSelectComponent,
		CategoryMultiSelectComponent
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
    ProgressSpinnerModule,
    DropdownModule,
    MultiSelectModule,
    FormsModule,
    ImageModule,
    ButtonModule
  ]
})
export class ShareModule { }
