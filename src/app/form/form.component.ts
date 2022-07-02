import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { HcaptchaFormModel } from "./HcaptchaFormModel";

@Component({
  selector: "hc-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent {
  signUpForm: FormGroup<HcaptchaFormModel>;

  constructor(fb: FormBuilder) {
    this.signUpForm = fb.group<HcaptchaFormModel>({
      email: new FormControl<string>("", {
        nonNullable: true,
        validators: Validators.compose([Validators.email, Validators.required]),
      }),
      password: new FormControl<string>("", { nonNullable: true }),
      confirmPassword: new FormControl<string>("", { nonNullable: true }),
      captcha: new FormControl<string>("", { nonNullable: true }),
    });
  }

  onSubmit() {
    this.signUpForm.reset();
  }
}
