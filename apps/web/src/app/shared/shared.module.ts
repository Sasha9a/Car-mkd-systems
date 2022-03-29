import { ScrollingModule } from "@angular/cdk/scrolling";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import {AvatarModule} from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { BadgeModule } from "primeng/badge";
import { BlockUIModule } from "primeng/blockui";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { CarouselModule } from "primeng/carousel";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { ChipModule } from "primeng/chip";
import { ChipsModule } from "primeng/chips";
import { ColorPickerModule } from "primeng/colorpicker";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ContextMenuModule } from "primeng/contextmenu";
import { DataViewModule } from "primeng/dataview";
import { DeferModule } from "primeng/defer";
import { DialogModule } from "primeng/dialog";
import {DividerModule} from "primeng/divider";
import { DockModule } from "primeng/dock";
import { DragDropModule } from "primeng/dragdrop";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { EditorModule } from "primeng/editor";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { FocusTrapModule } from "primeng/focustrap";
import { GalleriaModule } from "primeng/galleria";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { KeyFilterModule } from "primeng/keyfilter";
import { KnobModule } from "primeng/knob";
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from "primeng/megamenu";
import { MenuModule } from 'primeng/menu';
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from "primeng/orderlist";
import { OrganizationChartModule } from "primeng/organizationchart";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PaginatorModule } from "primeng/paginator";
import { PanelModule } from "primeng/panel";
import { PanelMenuModule } from "primeng/panelmenu";
import { PasswordModule } from "primeng/password";
import { PickListModule } from "primeng/picklist";
import { ProgressBarModule } from "primeng/progressbar";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { ScrollTopModule } from "primeng/scrolltop";
import { SelectButtonModule } from "primeng/selectbutton";
import { SidebarModule } from "primeng/sidebar";
import { SkeletonModule } from "primeng/skeleton";
import { SlideMenuModule } from "primeng/slidemenu";
import { SliderModule } from "primeng/slider";
import { SpeedDialModule } from "primeng/speeddial";
import { SplitButtonModule } from "primeng/splitbutton";
import { SplitterModule } from "primeng/splitter";
import { StepsModule } from "primeng/steps";
import { StyleClassModule } from "primeng/styleclass";
import { TableModule } from "primeng/table";
import { TabMenuModule } from "primeng/tabmenu";
import { TabViewModule } from "primeng/tabview";
import { TagModule } from "primeng/tag";
import { TerminalModule } from "primeng/terminal";
import { TieredMenuModule } from "primeng/tieredmenu";
import { TimelineModule } from "primeng/timeline";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";
import { TreeModule } from "primeng/tree";
import { TreeSelectModule } from "primeng/treeselect";
import { TreeTableModule } from "primeng/treetable";
import { TriStateCheckboxModule } from "primeng/tristatecheckbox";
import { VirtualScrollerModule } from "primeng/virtualscroller";
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { MenubarModule } from 'primeng/menubar';
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
import { FilterByPipe } from './pipes/filter-by.pipe';
import { KeyValueFilterPipe } from './pipes/key-value-filter.pipe';
import { ObjectKeyValuePipe } from './pipes/object-key-value.pipe';
import { CategoryMultiSelectComponent } from './dumbs/dropdowns/category-multi-select/category-multi-select.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { RoleNamePipe } from './pipes/role-name.pipe';
import { TableComponent } from './dumbs/table/table.component';

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
    FilterByPipe,
    KeyValueFilterPipe,
    ObjectKeyValuePipe,
    CategoryMultiSelectComponent,
    SafeHtmlPipe,
    RoleNamePipe,
    TableComponent
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
    CategoryMultiSelectComponent,
    AutoCompleteModule,
    CalendarModule,
    CascadeSelectModule,
    CheckboxModule,
    ChipsModule,
    ColorPickerModule,
    ScrollingModule,
    DropdownModule,
    EditorModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    KnobModule,
    KeyFilterModule,
    ListboxModule,
    MultiSelectModule,
    PasswordModule,
    RadioButtonModule,
    RatingModule,
    SliderModule,
    SelectButtonModule,
    ToggleButtonModule,
    TreeSelectModule,
    TriStateCheckboxModule,
    ButtonModule,
    SplitButtonModule,
    SpeedDialModule,
    DataViewModule,
    OrderListModule,
    OrganizationChartModule,
    PaginatorModule,
    PickListModule,
    TableModule,
    TimelineModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,
    AccordionModule,
    CardModule,
    DividerModule,
    FieldsetModule,
    PanelModule,
    SplitterModule,
    ScrollPanelModule,
    TabViewModule,
    ToolbarModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    DynamicDialogModule,
    OverlayPanelModule,
    SidebarModule,
    TooltipModule,
    FileUploadModule,
    MenuModule,
    BreadcrumbModule,
    ContextMenuModule,
    DockModule,
    MegaMenuModule,
    MenubarModule,
    PanelMenuModule,
    SlideMenuModule,
    StepsModule,
    TabMenuModule,
    TieredMenuModule,
    ChartModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    CarouselModule,
    GalleriaModule,
    ImageModule,
    DragDropModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    BlockUIModule,
    ChipModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    ScrollTopModule,
    SkeletonModule,
    TagModule,
    TerminalModule,
    DeferModule,
    FocusTrapModule,
    StyleClassModule,
    RippleModule,
    SafeHtmlPipe,
    MultiSelectComponent,
    TableComponent,
    RoleNamePipe
  ],
  imports: [
    CommonModule,
    AutoCompleteModule,
    CalendarModule,
    CascadeSelectModule,
    CheckboxModule,
    ChipsModule,
    ColorPickerModule,
    ScrollingModule,
    DropdownModule,
    EditorModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    KnobModule,
    KeyFilterModule,
    ListboxModule,
    MultiSelectModule,
    PasswordModule,
    RadioButtonModule,
    RatingModule,
    SliderModule,
    SelectButtonModule,
    ToggleButtonModule,
    TreeSelectModule,
    TriStateCheckboxModule,
    ButtonModule,
    SplitButtonModule,
    SpeedDialModule,
    DataViewModule,
    OrderListModule,
    OrganizationChartModule,
    PaginatorModule,
    PickListModule,
    TableModule,
    TimelineModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,
    AccordionModule,
    CardModule,
    DividerModule,
    FieldsetModule,
    PanelModule,
    SplitterModule,
    ScrollPanelModule,
    TabViewModule,
    ToolbarModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    DynamicDialogModule,
    OverlayPanelModule,
    SidebarModule,
    TooltipModule,
    FileUploadModule,
    MenuModule,
    BreadcrumbModule,
    ContextMenuModule,
    DockModule,
    MegaMenuModule,
    MenubarModule,
    PanelMenuModule,
    SlideMenuModule,
    StepsModule,
    TabMenuModule,
    TieredMenuModule,
    ChartModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    CarouselModule,
    GalleriaModule,
    ImageModule,
    DragDropModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    BlockUIModule,
    ChipModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    ScrollTopModule,
    SkeletonModule,
    TagModule,
    TerminalModule,
    DeferModule,
    FocusTrapModule,
    StyleClassModule,
    RippleModule
  ],
  providers: [CommonLayoutComponent, RoleNamePipe]
})
export class SharedModule { }
