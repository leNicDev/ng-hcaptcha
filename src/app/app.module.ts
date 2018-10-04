import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgHcaptchaModule.forRoot({
      siteKey: environment.siteKey
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
