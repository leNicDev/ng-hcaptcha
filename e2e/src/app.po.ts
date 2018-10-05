import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getCaptchaContainer() {
    return element(by.css('div.hcaptcha'));
  }
}
