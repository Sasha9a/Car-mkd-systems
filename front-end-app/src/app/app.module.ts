import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EditModelsComponent } from './edit-models/edit-models.component';

import { RouterModule, Routes } from "@angular/router";
import { FlashMessagesModule } from "angular2-flash-messages";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AuthService } from "./auth.service";
import { IsAuth } from "./isAuth.guard";

const appRoute: Routes = [
	{path: '', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: 'edit-models', component: EditModelsComponent, canActivate: [IsAuth]}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    EditModelsComponent
  ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot(appRoute),
		FormsModule,
		FlashMessagesModule.forRoot(),
		HttpClientModule
	],
  providers: [AuthService, IsAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }