import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxHcaptchaComponent } from './ngx-hcaptcha.component';
import { CAPTCHA_CONFIG, CaptchaConfig } from './ngx-hcaptcha-config';

@NgModule({
  imports: [
  ],
  declarations: [NgxHcaptchaComponent],
  exports: [NgxHcaptchaComponent]
})
export class NgxHcaptchaModule {
  
  static forRoot(config?: CaptchaConfig): ModuleWithProviders {
    const providers = config ? [{ provide: CAPTCHA_CONFIG, useValue: config }] : [];

    return {
      ngModule: NgxHcaptchaModule,
      providers
    };
  }

}
