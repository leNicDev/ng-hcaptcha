# ngx-hcaptcha - hCaptcha Component for Angular 6+

ngx-hcaptcha provides an easy to use component for [hCaptcha](https://hcaptcha.com).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Bugs? Ideas?](#bugs-ideas)

## Installation

### Step 1 - Install the ngx-hcaptcha dependency
NPM:
```shell
npm install --save ngx-hcaptcha
```

Yarn:
```
yarn add ngx-hcaptcha
```

### Step 2 - Import  the NgxHcaptchaModule
```ts
import { NgxHcaptchaModule } from 'ngx-hcaptcha';

@NgModule({
    imports: [
        // Option #1
        // Set the sitekey globally for every hCaptcha component
        NgxHcaptchaModule.forRoot({
            siteKey: 'YOUR_SITEKEY'
        }),

        // Option #2
        // This option requires you to set the [siteKey] property for every hCaptcha component
        NgxHcaptchaModule.forRoot()
    ]
})
```

## Usage

Template:
```html
<ngx-hcaptcha (verify)="onVerify($event)"
              (expired)="onExpired($event)"
              (error)="onError($event)">
</ngx-hcaptcha>
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

If you found a bug or something you don't like, feel free to [open an issue](https://github.com/leNicDev/ngx-hcaptcha/issues/new). If you have any ideas for new features or improvements, feel free to contribute or [open an issue](https://github.com/leNicDev/ngx-hcaptcha/issues/new) :wink: