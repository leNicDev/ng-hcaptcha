import { AbstractControl } from "@angular/forms";

export interface HcaptchaFormModel {
  email: AbstractControl<string, string>;
  password: AbstractControl<string, string>;
  confirmPassword: AbstractControl<string, string>;
  captcha: AbstractControl<string, string>;
}
