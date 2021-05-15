import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EditModelsComponent } from './edit-models/edit-models.component';
import { EditParamsComponent } from './edit-params/edit-params.component';

import { RouterModule, Routes } from "@angular/router";
import { FlashMessagesModule } from "angular2-flash-messages";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AuthService } from "./auth.service";
import { UtilsService } from "./utils.service";
import { IsAuth } from "./isAuth.guard";
import { CreateProductComponent } from './create-product/create-product.component';

const appRoute: Routes = [
	{path: '', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: 'edit-models', component: EditModelsComponent, canActivate: [IsAuth]},
	{path: 'edit-params', component: EditParamsComponent, canActivate: [IsAuth]}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    EditModelsComponent,
    EditParamsComponent,
    CreateProductComponent
  ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot(appRoute),
		FormsModule,
		FlashMessagesModule.forRoot(),
		HttpClientModule
	],
  providers: [AuthService, IsAuth, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
