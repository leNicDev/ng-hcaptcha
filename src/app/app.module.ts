import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgHcaptchaModule } from 'ng-hcaptcha'; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgHcaptchaModule.forRoot({
      siteKey: 'YOUR_SITEKEY'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
