import { TestBed } from '@angular/core/testing';

import { ScientifiqueService } from './scientifique.service';

describe('ScientifiqueService', () => {
  let service: ScientifiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScientifiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
