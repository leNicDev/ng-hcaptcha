import { InjectionToken } from '@angular/core';

export interface CaptchaConfig {
    /**
     * The sitekey to use when no sitekey has been
     * specified on the hcaptcha element.
     */
    siteKey?: string;
    /**
     * The language code to use instead of the
     * language automatically detected by hCaptcha.
     * @see {@link https://docs.hcaptcha.com/languages}
     */
    languageCode?: string;
}

export const CAPTCHA_CONFIG = new InjectionToken<CaptchaConfig>('CAPTCHA_CONFIG');
