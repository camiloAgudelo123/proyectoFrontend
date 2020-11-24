import { TestBed } from '@angular/core/testing';

import { PeligrosidadNtcService } from './peligrosidad-ntc.service';

describe('PeligrosidadNtcService', () => {
  let service: PeligrosidadNtcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeligrosidadNtcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
