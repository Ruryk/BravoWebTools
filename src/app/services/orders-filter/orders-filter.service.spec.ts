import { TestBed } from '@angular/core/testing';

import { OrdersFilterService } from './orders-filter.service';

describe('OrdersFilterService', () => {
  let service: OrdersFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
