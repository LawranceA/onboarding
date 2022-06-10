import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPrevOrgComponent } from './dialog-prev-org.component';

describe('DialogPrevOrgComponent', () => {
  let component: DialogPrevOrgComponent;
  let fixture: ComponentFixture<DialogPrevOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPrevOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPrevOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
