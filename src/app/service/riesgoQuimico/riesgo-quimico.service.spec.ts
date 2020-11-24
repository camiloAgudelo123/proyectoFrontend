import { TestBed } from '@angular/core/testing';

import { RiesgoQuimicoService } from './riesgo-quimico.service';

describe('RiesgoQuimicoService', () => {
  let service: RiesgoQuimicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiesgoQuimicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
