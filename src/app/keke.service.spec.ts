import { TestBed } from '@angular/core/testing';

import { KekeService } from './keke.service';

describe('KekeService', () => {
  let service: KekeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KekeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
