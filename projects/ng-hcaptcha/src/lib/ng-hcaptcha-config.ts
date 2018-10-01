import { InjectionToken } from "@angular/core";

export interface CaptchaConfig {
    /**
     * The sitekey to use when no sitekey has been
     * specified on the hcaptcha element.
     */
    siteKey?: string;
}

export const CAPTCHA_CONFIG = new InjectionToken<CaptchaConfig>('CAPTCHA_CONFIG');