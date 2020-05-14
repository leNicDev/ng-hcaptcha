import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'hc-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  signUpForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.signUpForm = fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }

  onSubmit() {
    this.signUpForm.reset();
  }

}
