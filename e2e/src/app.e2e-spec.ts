import { AppPage } from './app.po';

describe('ng-hcaptcha component', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display captcha container', () => {
    page.navigateTo();
    expect(page.getCaptchaContainer()).toBeDefined();
  });
});
