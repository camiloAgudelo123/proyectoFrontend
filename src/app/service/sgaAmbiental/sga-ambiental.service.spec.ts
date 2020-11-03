import { TestBed } from '@angular/core/testing';

import { SgaAmbientalService } from './sga-ambiental.service';

describe('SgaAmbientalService', () => {
  let service: SgaAmbientalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SgaAmbientalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
