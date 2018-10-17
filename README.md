[![Build status](https://api.travis-ci.org/hCaptcha/ng-hcaptcha.svg?branch=master)](https://travis-ci.org/leNicDev/ng-hcaptcha)&nbsp;
[![GitHub license](https://img.shields.io/github/license/hCaptcha/ng-hcaptcha.svg)](https://github.com/hCaptcha/ng-hcaptcha/blob/master/LICENSE)&nbsp;
[![GitHub issues](https://img.shields.io/github/issues/hCaptchhCaptcha/ng-hcaptcha.svg)](https://GitHub.com/hCaptcha/ng-hcaptcha/issues/)&nbsp;
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/hCaptcha/ng-hcaptcha.svg)](https://GitHub.com/hCaptcha/ng-hcaptcha/pull/)

# ng-hcaptcha - hCaptcha Component for Angular 6+

ng-hcaptcha provides an easy to use component for [hCaptcha](https://hcaptcha.com). 

This component is contributed and maintained by the hCaptcha community. You can find the upstream repo [here](https://github.com/leNicDev/ng-hcaptcha).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
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

### Step 2 - Import the NgHcaptchaModule
```ts
import { NgHcaptchaModule } from 'ng-hcaptcha';

@NgModule({
    imports: [
        // Option #1
        // Set the sitekey globally for every hCaptcha component
        NgHcaptchaModule.forRoot({
            siteKey: 'YOUR_SITEKEY'
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

## Bugs? Ideas?

If you found a bug or something you don't like, feel free to [open an issue](https://github.com/leNicDev/ng-hcaptcha/issues/new). If you have any ideas for new features or improvements, feel free to contribute or [open an issue](https://github.com/leNicDev/ng-hcaptcha/issues/new) :wink:

## Contribute
You can reach out to us on [telegram](https://t.me/hcaptchachat) 

## Support me (note from the original author)

If you would like to support me for free, just create your hCaptcha account using my referral link :relaxed:
[https://hCaptcha.com/?r=4afcb2d42338](https://hCaptcha.com/?r=4afcb2d42338)
