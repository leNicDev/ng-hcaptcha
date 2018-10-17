import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgHcaptchaComponent } from './ng-hcaptcha.component';
import { CAPTCHA_CONFIG } from './ng-hcaptcha-config';

describe('NgHcaptchaComponent', () => {
  let component: NgHcaptchaComponent;
  let fixture: ComponentFixture<NgHcaptchaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgHcaptchaComponent ],
      providers: [
        { provide: CAPTCHA_CONFIG, useValue: { siteKey: '6de09d9c-8f26-4501-8141-49f4fa644d38' } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgHcaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
