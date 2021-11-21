import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '@car-mkd-systems/web/core/app.component';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule, Routes } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ConfirmationService, MessageService } from 'primeng/api';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [

    ]
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    MenubarModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'ignore',
      scrollPositionRestoration: 'enabled'
    }),
    ToastModule,
    ConfirmDialogModule,
    ScrollTopModule
  ],
  providers: [MessageService, ConfirmationService],
  exports: [RouterModule]
})
export class CoreModule { }
