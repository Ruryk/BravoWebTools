import { TestBed } from '@angular/core/testing';

import { CsvCheckService } from './csv-check.service';

describe('CsvCheckService', () => {
  let service: CsvCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
