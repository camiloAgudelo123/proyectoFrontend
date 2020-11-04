import { TestBed } from '@angular/core/testing';

import { SgaService } from './sga.service';

describe('SgaAmbientalService', () => {
  let service: SgaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SgaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
