import { Inject, Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { loadHCaptcha } from "./hcaptcha-utils";
import { CaptchaConfig, CAPTCHA_CONFIG } from "./ng-hcaptcha-config";

declare const window: any;

@Injectable()
export class NgHcaptchaService {

    private hCaptchaElement: HTMLElement;
    private hCaptchaWidgetId: string;

    constructor(@Inject(CAPTCHA_CONFIG) private captchaConfig: CaptchaConfig) { }

    verify(): Observable<any> {
        return new Observable((subscriber: Subscriber<any>) => {
            loadHCaptcha(this.captchaConfig.languageCode).subscribe(() => {
                setTimeout((context) => {    
                    // Create hCaptcha element
                    if (!this.hCaptchaElement) {
                        this.hCaptchaElement = document.createElement('div')
                        document.body.appendChild(this.hCaptchaElement);
                    }

                    // Render hCaptcha using the defined options
                    if (!this.hCaptchaWidgetId) {
                        // Configure hCaptcha
                        const options = {
                            sitekey: this.captchaConfig.siteKey,
                            size: 'invisible',
                            callback: (res) => {
                                subscriber.next(res);
                                subscriber.complete();
                                this.resetHcaptcha();
                            },
                            'expired-callback': (res) => {
                                subscriber.error(res);
                                this.resetHcaptcha();
                            },
                            'error-callback': (err) => {
                                subscriber.error(err);
                                this.resetHcaptcha();
                            },
                        };
                        this.hCaptchaWidgetId = window.hcaptcha.render(this.hCaptchaElement, options);
                    }

                    // Immediately execute hCaptcha
                    window.hcaptcha.execute(this.hCaptchaWidgetId);
                }, 50, this);
            });
        });
    }

    private resetHcaptcha() {
        window.hcaptcha.remove(this.hCaptchaWidgetId);
        this.hCaptchaElement = null;
        this.hCaptchaWidgetId = null;
    }

}