import { TestBed } from '@angular/core/testing';

import { ProductoPracticaService } from './producto-practica.service';

describe('ProductoPracticaService', () => {
  let service: ProductoPracticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoPracticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
