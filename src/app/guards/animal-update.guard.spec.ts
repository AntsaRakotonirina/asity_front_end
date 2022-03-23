import { TestBed } from '@angular/core/testing';

import { AnimalUpdateGuard } from './animal-update.guard';

describe('AnimalUpdateGuard', () => {
  let guard: AnimalUpdateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AnimalUpdateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
