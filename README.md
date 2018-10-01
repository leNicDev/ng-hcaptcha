# ng-hcaptcha - hCaptcha Component for Angular 6+

ng-hcaptcha provides an easy to use component for [hCaptcha](https://hcaptcha.com).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Bugs? Ideas?](#bugs-ideas)
- [Support me](#support-me)

## Installation

### Step 1 - Install the ng-hcaptcha dependency
NPM:
```shell
npm install --save ng-hcaptcha
```

Yarn:
```
yarn add ng-hcaptcha
```

### Step 2 - Import  the NgHcaptchaModule
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
<ng-hcaptcha (verify)="onVerify($event)"
              (expired)="onExpired($event)"
              (error)="onError($event)">
</ng-hcaptcha>
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

## Support me

If you would like to support me for free, just create your hCaptcha account using my referral link :relaxed:
[https://hCaptcha.com/?r=4afcb2d42338](https://hCaptcha.com/?r=4afcb2d42338)