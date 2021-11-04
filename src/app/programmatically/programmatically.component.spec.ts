import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammaticallyComponent } from './programmatically.component';

describe('ProgrammaticallyComponent', () => {
  let component: ProgrammaticallyComponent;
  let fixture: ComponentFixture<ProgrammaticallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammaticallyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammaticallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
