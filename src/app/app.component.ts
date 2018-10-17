import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../environments/environment';

@Component({
  selector: 'hc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  appVersion = environment.version;

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
