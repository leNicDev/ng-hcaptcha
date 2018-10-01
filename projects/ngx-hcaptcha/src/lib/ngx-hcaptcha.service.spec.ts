import { TestBed } from '@angular/core/testing';

import { NgxHcaptchaService } from './ngx-hcaptcha.service';

describe('NgxHcaptchaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxHcaptchaService = TestBed.get(NgxHcaptchaService);
    expect(service).toBeTruthy();
  });
});
