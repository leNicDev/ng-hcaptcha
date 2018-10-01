import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxHcaptchaComponent } from './ngx-hcaptcha.component';

describe('NgxHcaptchaComponent', () => {
  let component: NgxHcaptchaComponent;
  let fixture: ComponentFixture<NgxHcaptchaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxHcaptchaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxHcaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
