import { TestBed } from '@angular/core/testing';

import { FindByIdService } from './find-by-id.service';

describe('FindByIdService', () => {
  let service: FindByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
