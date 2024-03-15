import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkingGuard } from './checking.guard';

describe('checkingGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
