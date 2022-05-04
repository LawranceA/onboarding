import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrgComponent } from './dialog-org.component';

describe('DialogOrgComponent', () => {
  let component: DialogOrgComponent;
  let fixture: ComponentFixture<DialogOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
