import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPGComponent } from './dialog-pg.component';

describe('DialogPGComponent', () => {
  let component: DialogPGComponent;
  let fixture: ComponentFixture<DialogPGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
