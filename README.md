[![GitHub license](https://img.shields.io/github/license/leNicDev/ng-hcaptcha.svg)](https://github.com/leNicDev/ng-hcaptcha/blob/master/LICENSE)&nbsp;
[![GitHub issues](https://img.shields.io/github/issues/leNicDev/ng-hcaptcha.svg)](https://GitHub.com/leNicDev/ng-hcaptcha/issues/)&nbsp;
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/leNicDev/ng-hcaptcha.svg)](https://GitHub.com/leNicDev/ng-hcaptcha/pull/)

# ng-hcaptcha - hCaptcha Component for Angular

ng-hcaptcha provides an easy to use component for [hCaptcha](https://hcaptcha.com).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Execute hCaptcha programmatically](#execute-hcaptcha-programmatically)
- [Bugs? Ideas?](#bugs-ideas)
- [Support me](#support-me)

## Installation

### Step 1 - Install the ng-hcaptcha dependency

```shell
# NPM
npm install --save ng-hcaptcha

# Yarn
yarn add ng-hcaptcha
```

> You can use the tag 'next' to get the latest beta version.

### Step 2 - Import  the NgHcaptchaModule
```ts
import { NgHcaptchaModule } from 'ng-hcaptcha';

@NgModule({
    imports: [
        // Option #1
        // Set the sitekey globally for every hCaptcha component
        NgHcaptchaModule.forRoot({
            siteKey: 'YOUR_SITEKEY',
            languageCode: 'de' // optional, will default to browser language
        }),

        // Option #2
        // This option requires you to set the [siteKey] property for every hCaptcha component
        NgHcaptchaModule.forRoot()
    ]
})
```

## Usage

Template:
```html
<!-- Regular usage -->
<ng-hcaptcha (verify)="onVerify($event)"
              (expired)="onExpired($event)"
              (error)="onError($event)">
</ng-hcaptcha>

<!-- Usage in forms -->
<!-- The value of the form control will be the verification token -->
<form [formGroup]="formGroup" (submit)="onSubmit()">
    <ng-hcaptcha formControlName="captcha"></ng-hcaptcha>
</form>

<!-- Invisible captcha -->
<button ngHcaptchaInvisibleButton
        (verify)="onVerify($event)"
        (expired)="onExpired($event)"
        (error)="onError($event)">Click me</button>
```

TS:
```ts
onVerify(token: string) {
    // The verification process was successful.
    // You can verify the token on your server now.
}

onExpired(response: any) {
    // The verification expired.
}

onError(error: any) {
    // An error occured during the verification process.
}
```

## Execute hCaptcha programmatically

The hCaptcha verification process can also be executed programmatically:
```ts
@Component({
  selector: 'hc-programmatically',
  templateUrl: './programmatically.component.html',
  styleUrls: ['./programmatically.component.scss']
})
export class ProgrammaticallyComponent {

  constructor(private hcaptchaService: NgHcaptchaService) { }

  verify() {
    this.hcaptchaService.verify().subscribe(
      (result) => {
        console.log('SUCCESS', result);
      },
      (err) => {
        console.log('FAILED', err);
      },
      () => {
        console.log('COMPLETE');
      }
    );
  }

}
```

## Properties
The properties below exist for all captcha components.

`siteKey` Allows you to set the site key per captcha instance.

`languageCode` Allows you to force a specific language. See https://docs.hcaptcha.com/languages

## Bugs? Ideas?

If you found a bug or something you don't like, feel free to [open an issue](https://github.com/leNicDev/ng-hcaptcha/issues/new). If you have any ideas for new features or improvements, feel free to contribute or [open an issue](https://github.com/leNicDev/ng-hcaptcha/issues/new) :wink:

## Support me

If you would like to support me for free, just create your hCaptcha account using my referral link :relaxed:
[https://hCaptcha.com/?r=4afcb2d42338](https://hCaptcha.com/?r=4afcb2d42338)
