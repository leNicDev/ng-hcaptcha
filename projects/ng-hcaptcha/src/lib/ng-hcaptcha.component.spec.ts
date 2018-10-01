import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgHcaptchaComponent } from './ng-hcaptcha.component';

describe('NgHcaptchaComponent', () => {
  let component: NgHcaptchaComponent;
  let fixture: ComponentFixture<NgHcaptchaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgHcaptchaComponent ]
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
