import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgHcaptchaComponent } from './ng-hcaptcha.component';
import { CAPTCHA_CONFIG, CaptchaConfig } from './ng-hcaptcha-config';
import { NgHcaptchaInvisibleButtonDirective } from './ng-hcaptcha-invisible-button.directive';
import { NgHcaptchaService } from './ng-hcaptcha.service';

@NgModule({
  imports: [],
  declarations: [NgHcaptchaComponent, NgHcaptchaInvisibleButtonDirective],
  exports: [NgHcaptchaComponent, NgHcaptchaInvisibleButtonDirective],
})
export class NgHcaptchaModule {

  static forRoot(config?: CaptchaConfig): ModuleWithProviders<NgHcaptchaModule> {
    return {
      ngModule: NgHcaptchaModule,
      providers: [
        NgHcaptchaService,
        {
          provide: CAPTCHA_CONFIG,
          useValue: config || []
        },
      ]
    };
  }

}
