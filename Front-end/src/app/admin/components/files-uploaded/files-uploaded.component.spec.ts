import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesUploadedComponent } from './files-uploaded.component';

describe('FilesUploadedComponent', () => {
  let component: FilesUploadedComponent;
  let fixture: ComponentFixture<FilesUploadedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesUploadedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesUploadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
