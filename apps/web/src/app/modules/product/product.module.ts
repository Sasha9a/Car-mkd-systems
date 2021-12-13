import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RoleEnum } from '@car-mkd-systems/shared/enums/role.enum';
import { AuthGuard } from '@car-mkd-systems/web/core/guards/auth.guard';
import { RoleGuard } from '@car-mkd-systems/web/core/guards/role.guard';
import { ShareModule } from '@car-mkd-systems/web/shared/share.module';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ProductAddComponent } from './components/add/product-add.component';
import { ProductFormComponent } from './dumbs/product-form/product-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ProductCardComponent } from './components/card/product-card.component';
import { GalleriaModule } from 'primeng/galleria';
import { StyleClassModule } from 'primeng/styleclass';

const productRoutes: Routes = [
  {
    path: 'add',
    canActivate: [AuthGuard, RoleGuard],
    component: ProductAddComponent,
    data: {
      roles: [RoleEnum.ADMIN],
      included: true
    }
  },
  {
    path: 'card/:id',
    component: ProductCardComponent
  }
];

@NgModule({
  declarations: [
    ProductAddComponent,
    ProductFormComponent,
    ProductCardComponent
  ],
	imports: [
		CommonModule,
		ShareModule,
		RouterModule.forChild(productRoutes),
		InputTextModule,
		FormsModule,
		InputNumberModule,
		FileUploadModule,
		TableModule,
		RippleModule,
		ScrollPanelModule,
		CardModule,
		AccordionModule,
		GalleriaModule,
		StyleClassModule
	]
})
export class ProductModule { }
