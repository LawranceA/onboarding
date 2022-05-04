import { TestBed } from '@angular/core/testing';

import { Dialog10serviceService } from './dialog10service.service';

describe('Dialog10serviceService', () => {
  let service: Dialog10serviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dialog10serviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
