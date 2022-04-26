import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalQualificationComponent } from './educational-qualification.component';

describe('EducationalQualificationComponent', () => {
  let component: EducationalQualificationComponent;
  let fixture: ComponentFixture<EducationalQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationalQualificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
