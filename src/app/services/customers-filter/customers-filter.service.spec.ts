import { TestBed } from '@angular/core/testing';

import { CustomersFilterService } from './customers-filter.service';

describe('CustomersFilterService', () => {
  let service: CustomersFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
