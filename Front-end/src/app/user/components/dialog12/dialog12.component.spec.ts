import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog12Component } from './dialog12.component';

describe('Dialog12Component', () => {
  let component: Dialog12Component;
  let fixture: ComponentFixture<Dialog12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dialog12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Dialog12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
