import { TestBed } from '@angular/core/testing';

import { CalentadrioPracticaService } from './calentadrio-practica.service';

describe('CalentadrioPracticaService', () => {
  let service: CalentadrioPracticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalentadrioPracticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
