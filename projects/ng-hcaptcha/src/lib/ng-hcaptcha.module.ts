import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgHcaptchaComponent } from './ng-hcaptcha.component';
import { CAPTCHA_CONFIG, CaptchaConfig } from './ng-hcaptcha-config';

@NgModule({
  imports: [
  ],
  declarations: [NgHcaptchaComponent],
  exports: [NgHcaptchaComponent]
})
export class NgHcaptchaModule {

  static forRoot(config?: CaptchaConfig): ModuleWithProviders {
    return {
      ngModule: NgHcaptchaModule,
      providers: [
        {
          provide: CAPTCHA_CONFIG,
          useValue: config || []
        }
      ]
    };
  }

}
