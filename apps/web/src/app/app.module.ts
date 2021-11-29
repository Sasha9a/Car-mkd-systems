import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorInterceptor } from '@car-mkd-systems/web/core/interceptors/error.interceptor';
import { TokenInterceptor } from '@car-mkd-systems/web/core/interceptors/token.interceptor';

import { AppComponent } from './core/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@car-mkd-systems/web/core/core.module';
import { ShareModule } from '@car-mkd-systems/web/shared/share.module';
import * as moment from 'moment-timezone';

moment.locale('ru');

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ShareModule
  ],
  bootstrap: [AppComponent],
  providers: [
    [
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ],
    [
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ]
  ]
})
export class AppModule {}
