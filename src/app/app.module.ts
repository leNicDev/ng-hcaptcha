import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxHcaptchaModule } from 'ngx-hcaptcha';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxHcaptchaModule.forRoot({
      siteKey: 'YOUR_SITEKEY'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
