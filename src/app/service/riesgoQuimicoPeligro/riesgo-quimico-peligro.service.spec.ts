import { TestBed } from '@angular/core/testing';

import { RiesgoQuimicoPeligroService } from './riesgo-quimico-peligro.service';

describe('RiesgoQuimicoPeligroService', () => {
  let service: RiesgoQuimicoPeligroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiesgoQuimicoPeligroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
