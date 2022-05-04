import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUGComponent } from './dialog-ug.component';

describe('DialogUGComponent', () => {
  let component: DialogUGComponent;
  let fixture: ComponentFixture<DialogUGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
