import { TestBed } from '@angular/core/testing';

import { LoaderAdminDataService } from './loader-admin-data.service';

describe('LoaderAdminDataService', () => {
  let service: LoaderAdminDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderAdminDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
