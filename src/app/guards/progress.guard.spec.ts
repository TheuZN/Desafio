import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { progressGuard } from './progress.guard';

describe('progressGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => progressGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
